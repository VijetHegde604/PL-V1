# Architecture: Mock Data → API-Driven

## The Evolution

### Architecture 1: Mock Data (Original)
```
┌─────────────────────────────────────┐
│     React Component                 │
│  - Local state with hardcoded data  │
│  - No API calls                     │
│  - No loading states                │
│  - No error handling                │
└─────────────────────────────────────┘
         ↓ (Props)
┌─────────────────────────────────────┐
│     Mock Data Objects               │
│  - Arrays of hardcoded values       │
│  - Never updated                    │
│  - No type safety                   │
└─────────────────────────────────────┘

Issues:
❌ Data never syncs with backend
❌ No way to test real scenarios
❌ Components tightly coupled to data shape
❌ Difficult to add new features
```

### Architecture 2: Props-Driven (Middle Stage)
```
┌─────────────────────────────────────┐
│     Parent Component                │
│  - Manages all state                │
│  - Passes via props                 │
└──────────────┬──────────────────────┘
               │ (Props)
┌──────────────▼──────────────────────┐
│     Child Component                 │
│  - Receives typed data              │
│  - Minimal logic                    │
└─────────────────────────────────────┘

Issues:
❌ Prop drilling
❌ Parent manages too much
❌ Hard to reuse components
❌ Still no real API integration
```

### Architecture 3: Hook-Based API-Driven (Current)
```
┌─────────────────────────────────────────────────────┐
│     React Component                                 │
│  - Uses custom hook                                 │
│  - Handles loading/error states                     │
│  - Manages mutations                                │
│  - UI rendering only                                │
└───────────────────────┬─────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌──────────────────┐          ┌──────────────────┐
│  useAppointments │          │  API Service     │
│  (Custom Hook)   │          │  - Centralized   │
│  - Fetching      │          │  - Typed         │
│  - Loading state │          │  - Errors        │
│  - Error state   │          └────────┬─────────┘
│  - Refetch       │                   │
└──────────────────┘                   │
                                       ▼
                            ┌──────────────────┐
                            │  Backend API     │
                            │  - Real data     │
                            │  - Persistence   │
                            └──────────────────┘

Benefits:
✅ Self-contained components
✅ Real API integration
✅ Type-safe end-to-end
✅ Easy to test
✅ Reusable across app
✅ Proper error handling
```

---

## Data Flow Comparison

### Old Flow (Mock)
```
Component renders
    ↓
Uses hardcoded mockAppointments
    ↓
Shows static data
    ↓
User clicks button
    ↓
Updates local state
    ↓
Never reaches backend
```

### New Flow (API)
```
Component mounts
    ↓
Hook calls apiService.getAppointments()
    ↓
Shows loading state
    ↓
Backend responds
    ↓
Updates state with real data
    ↓
Shows appointments
    ↓
User clicks button
    ↓
Hook calls apiService.cancelAppointment()
    ↓
Backend processes
    ↓
Hook calls refetch()
    ↓
Data updates automatically
    ↓
UI re-renders with new data
```

---

## Type Evolution

### Stage 1: No Types
```typescript
// ❌ No type safety
const handleClick = (item: any) => {
  // What properties does item have?
  // No IDE help
  // Runtime errors possible
};
```

### Stage 2: Interface Types
```typescript
// ✅ Some type safety
interface Appointment {
  id: number;
  service: string;
  date: string;
}

const handleClick = (item: Appointment) => {
  // IDE shows: id, service, date
  // Type errors caught early
  // Runtime safe
};
```

### Stage 3: API Types (Current)
```typescript
// ✅✅ Full type safety
import { ApiAppointment } from "../types/api";

const handleClick = async (item: ApiAppointment) => {
  // IDE shows all properties
  // Matches backend exactly
  // Request types also typed
  // Response types also typed
  
  await apiService.cancelAppointment({
    appointmentId: item.id,
    reason: "User cancelled"
  });
  // RescheduleAppointmentPayload is typed
  // Response is ApiAppointment (typed)
};
```

---

## State Management Evolution

### Old: Local State Only
```typescript
const [appointments, setAppointments] = useState([]);

// Manually manage everything
// Manual loading states
// Manual error handling
```

### New: Hook-Based
```typescript
const {
  appointments,      // The data
  loading,          // Loading state (automatic)
  error,            // Error state (automatic)
  refetch           // Refresh function (automatic)
} = useAppointments();

// Hook handles everything
// Less boilerplate
// Consistent patterns
```

---

## Error Handling Evolution

### Old: Silent Failures
```typescript
const handleCancel = (item: any) => {
  // No try/catch
  // No error state
  // Shows success even if it fails
  setAppointments(appointments.filter(a => a.id !== item.id));
  toast.success("Cancelled!");  // ❌ Always shown
};
```

### New: Proper Error Handling
```typescript
const handleCancel = async (item: ApiAppointment) => {
  try {
    await apiService.cancelAppointment({
      appointmentId: item.id
    });
    toast.success("Cancelled!");
    await refetch();  // ✅ Only if successful
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    toast.error(message);  // ✅ Shows real error
  }
};
```

---

## Component Coupling

### Old: Tightly Coupled
```
ParentComponent
    ↓ passes mockAppointments
ChildComponent
    ↓ assumes specific shape
OtherChildComponent
    ↓ assumes specific shape

Problem: Change data shape → break multiple components
```

### New: Loosely Coupled
```
ChildComponent1
    ↓ uses useAppointments()
    ↓ gets ApiAppointment[] type
ChildComponent2
    ↓ uses useAppointments()
    ↓ gets ApiAppointment[] type
ChildComponent3
    ↓ uses useAppointments()
    ↓ gets ApiAppointment[] type

Benefit: Change data → types ensure everything updates
```

---

## Testing Evolution

### Old: Hard to Test
```typescript
// Must mock parent, props, data
// Can't easily test error states
// Can't easily test loading states
// Lots of setup required

<AppointmentsPage appointments={mockAppointments} />
```

### New: Easy to Test
```typescript
// Mock the hook
jest.mock("../hooks/useData", () => ({
  useAppointments: () => ({
    appointments: [],
    loading: true,
    error: null
  })
}));

// Test loading state
render(<AppointmentsPage />);
expect(screen.getByText("Loading")).toBeInTheDocument();

// Change mock for error test
jest.mock("../hooks/useData", () => ({
  useAppointments: () => ({
    appointments: [],
    loading: false,
    error: "Failed"
  })
}));

// Test error state
render(<AppointmentsPage />);
expect(screen.getByText("Failed")).toBeInTheDocument();
```

---

## Scalability

### Old: Doesn't Scale
```
MockAppointments
MockBookings
MockEvents
MockServices
MockPartners
MockUsers

└─ Each component has its own mock data
└─ Hard to keep consistent
└─ Can't test relationships
└─ Can't validate relationships
```

### New: Scales Well
```
apiService
├─ getAppointments()
├─ getBookings()
├─ getEvents()
├─ getServices()
├─ getPartners()
└─ getUsers()

└─ Single source of truth
└─ Consistent types everywhere
└─ Relationships validated on backend
└─ Easy to add features
```

---

## Performance

### Old: No Optimization
```
Always loads all data
Always shows all data
No pagination
No caching
No lazy loading
```

### New: Optimizable
```typescript
// Easy to add pagination
const { data } = useAppointments({
  page: 1,
  pageSize: 10
});

// Easy to add filters
const { data } = useAppointments({
  status: "upcoming",
  module: "RejuvaFit"
});

// Easy to add caching (with React Query)
const { data } = useQuery(
  "appointments",
  () => apiService.getAppointments()
);

// Easy to add lazy loading
const { data, refetch } = useAppointments();
useEffect(() => refetch(), [dependencies]);
```

---

## Maintenance

### Old: High Effort
```
Change data structure?
├─ Update mock data
├─ Update component props
├─ Update child components
├─ Fix type issues (if any)
└─ Manual testing

Result: Lots of work, error-prone
```

### New: Low Effort
```
Change data structure?
├─ Update api.ts types
├─ TypeScript errors appear everywhere
├─ Fix imports
├─ Type system prevents breaks
└─ Automatic validation

Result: Safe, fast, error-proof
```

---

## Summary Table

| Aspect | Mock Data | Props-Driven | API-Driven |
|--------|-----------|--------------|-----------|
| **Type Safety** | ❌ None | ⚠️ Partial | ✅ Full |
| **Real Data** | ❌ No | ❌ No | ✅ Yes |
| **Error Handling** | ❌ None | ❌ None | ✅ Full |
| **Loading States** | ❌ Manual | ❌ Manual | ✅ Automatic |
| **Reusability** | ❌ Low | ⚠️ Medium | ✅ High |
| **Testability** | ❌ Hard | ⚠️ Medium | ✅ Easy |
| **Scalability** | ❌ Poor | ⚠️ Fair | ✅ Excellent |
| **Maintenance** | ❌ High | ⚠️ Medium | ✅ Low |
| **Code Quality** | ❌ Low | ⚠️ Medium | ✅ High |
| **Production Ready** | ❌ No | ❌ No | ✅ Yes |

---

## Migration Timeline

```
WEEK 1: Foundation
├─ ✅ Create types/api.ts
├─ ✅ Create utils/apiService.ts
├─ ✅ Create hooks/useData.ts
└─ ✅ Refactor AppointmentsPage.tsx

WEEK 2: Components
├─ □ Update BookingFlow.tsx
├─ □ Update EventsPage.tsx
├─ □ Update ServiceListPage.tsx
└─ □ Update UserDashboard.tsx

WEEK 3: Admin
├─ □ Update AdminDashboard.tsx
├─ □ Add admin-specific hooks
└─ □ Test admin features

WEEK 4: Polish
├─ □ Add caching (React Query)
├─ □ Add error boundaries
├─ □ Optimize performance
└─ □ Final testing & deployment
```

---

## Conclusion

Your app has evolved from:
- **Mock data** (no backend integration)
- **Props-driven** (manual prop passing)

To:
- **API-driven** (real backend data)
- **Hook-based** (automatic state management)
- **Type-safe** (compile-time checking)
- **Production-ready** (error handling, loading states)

**Next Step**: Apply the same pattern to other components!
