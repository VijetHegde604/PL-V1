# Backend Integration Setup Guide

## Overview

Your Senior Wellness Web App is now refactored to support backend integration with proper TypeScript typing. This guide explains the new architecture and how to use it.

## New Files Created

### 1. **API Types** (`src/types/api.ts`)
Complete type definitions for all API requests and responses:
- `ApiAppointment`: Typed appointment data
- `ApiBooking`: Typed booking data
- `ApiEvent`: Typed event data
- `ApiService`: Typed service data
- `ApiError`: Typed error responses
- `AuthResponse`, `AuthUser`: Authentication types
- `PaginatedResponse<T>`: Generic paginated response type
- Filter types: `AppointmentFilters`, `BookingFilters`, etc.

### 2. **API Service** (`src/utils/apiService.ts`)
Centralized API client with methods for:
- **Authentication**: `login()`, `register()`, `logout()`
- **Appointments**: `getAppointments()`, `rescheduleAppointment()`, `cancelAppointment()`
- **Bookings**: `getBookings()`, `createBooking()`, `updateBookingStatus()`
- **Events**: `getEvents()`, `createEvent()`, `updateEvent()`, `registerEvent()`
- **Services**: `getServices()`, `createService()`, `updateService()`
- **Partners**: `getPartners()`, `getPartner()`

Features:
- Automatic request timeout (10 seconds)
- Bearer token authentication
- Consistent error handling
- Type-safe responses

### 3. **Custom Hooks** (`src/hooks/useData.ts`)
Reusable React hooks for data fetching:
- `useAppointments()`: Fetch appointments with filters
- `useBookings()`: Fetch bookings with filters
- `useEvents()`: Fetch events with filters
- `useServices()`: Fetch services with filters

Each hook provides:
- `data`: Fetched items
- `loading`: Loading state
- `error`: Error message (if any)
- `refetch()`: Manual refresh function

### 4. **Refactored AppointmentsPage** (`src/components/AppointmentsPage.tsx`)
Now implements:
- ✅ Proper API type usage (`ApiAppointment`)
- ✅ Real data fetching on mount
- ✅ Loading state UI
- ✅ Error handling and retry
- ✅ Actual API calls for reschedule and cancel
- ✅ Automatic refetch after mutations
- ✅ Proper null safety and type checking

## How to Use

### Environment Setup

Create `.env.local` in your project root:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

For production:
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### Example 1: Using the Hook (Recommended)

```typescript
import { useAppointments } from "../hooks/useData";

export function MyAppointments() {
  const { appointments, loading, error, refetch } = useAppointments({
    status: "upcoming"
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {appointments.map(apt => (
        <div key={apt.id}>
          <h3>{apt.service}</h3>
          <p>{apt.date} at {apt.time}</p>
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Example 2: Direct API Service Usage

```typescript
import apiService from "../utils/apiService";
import { RescheduleAppointmentPayload } from "../types/api";

async function rescheduleAppointment() {
  try {
    const payload: RescheduleAppointmentPayload = {
      appointmentId: "apt-123",
      newDate: "2025-12-25",
      newTime: "14:00"
    };
    const result = await apiService.rescheduleAppointment(payload);
    console.log("Rescheduled:", result);
  } catch (error) {
    console.error("Failed to reschedule:", error);
  }
}
```

### Example 3: Authentication

```typescript
import apiService from "../utils/apiService";
import { LoginPayload } from "../types/api";

async function loginUser() {
  try {
    const credentials: LoginPayload = {
      email: "user@example.com",
      password: "password123"
    };
    const { user, token } = await apiService.login(credentials);
    // Token is automatically stored and used in subsequent requests
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Login failed:", error);
  }
}
```

## API Endpoints Reference

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Appointments
- `GET /appointments?status=upcoming` - List appointments with filters
- `GET /appointments/:id` - Get single appointment
- `PATCH /appointments/:id/reschedule` - Reschedule
- `PATCH /appointments/:id/cancel` - Cancel

### Bookings
- `GET /bookings?status=pending` - List bookings with filters
- `GET /bookings/:id` - Get single booking
- `POST /bookings` - Create booking
- `PATCH /bookings/:id/status` - Update status

### Events
- `GET /events?category=Music` - List events with filters
- `GET /events/:id` - Get single event
- `POST /events` - Create event (admin)
- `PATCH /events/:id` - Update event (admin)
- `DELETE /events/:id` - Delete event (admin)
- `POST /events/:id/register` - Register for event

### Services
- `GET /services?module=CareNest` - List services
- `GET /services/:id` - Get single service
- `POST /services` - Create service
- `PATCH /services/:id` - Update service

## Response Format

All API responses follow this structure:

```typescript
{
  status: "success" | "error",
  data: T,           // Actual response data
  message?: string,
  errors?: Record<string, string[]>
}
```

Paginated responses:
```typescript
{
  data: T[],
  total: 100,
  page: 1,
  pageSize: 10,
  hasMore: true
}
```

## Backend Requirements

Your backend API must:

1. **Accept these request formats:**
   - `Content-Type: application/json`
   - `Authorization: Bearer {token}` header for authenticated endpoints

2. **Return these response formats:**
   - Success: `{ status: "success", data: {...} }`
   - Error: `{ status: "error", errors: [{code, message}] }`
   - Paginated: `{ data: [...], total, page, pageSize, hasMore }`

3. **Implement these endpoints:**
   - See "API Endpoints Reference" above

4. **Handle these filters:**
   - Appointments: `status`, `module`, `startDate`, `endDate`, `partnerId`
   - Bookings: `status`, `module`, `startDate`, `endDate`
   - Events: `category`, `status`, `startDate`, `endDate`
   - Services: `module`, `active`, `category`

## Error Handling

Errors are automatically caught and shown as toast notifications:

```typescript
try {
  await apiService.rescheduleAppointment(payload);
} catch (err) {
  if (err instanceof ApiErrorResponse) {
    console.log("Status:", err.statusCode);
    console.log("Errors:", err.errors);
  }
}
```

## Migration Guide: Updating Other Components

### Before (Mock Data)
```typescript
const [appointments, setAppointments] = useState([]);

// Uses static/mock data
```

### After (API Integration)
```typescript
import { useAppointments } from "../hooks/useData";

export function Component() {
  const { appointments, loading, error } = useAppointments();
  
  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  
  return <AppointmentList appointments={appointments} />;
}
```

## Components to Update Next

These components should be refactored similarly to AppointmentsPage:

1. **BookingFlow.tsx** - Use `useBookings()` hook
2. **EventsPage.tsx** - Use `useEvents()` hook
3. **ServiceListPage.tsx** - Use `useServices()` hook
4. **AdminDashboard.tsx** - Use multiple hooks for admin data
5. **UserDashboard.tsx** - Combine multiple data sources

## Testing the Integration

1. Start your backend server: `npm start` (backend)
2. Set `REACT_APP_API_URL` in `.env.local`
3. Start the frontend: `npm run dev`
4. Open DevTools and check Network tab for API calls
5. Verify data loads correctly

## Troubleshooting

### "Cannot find module" errors
- Ensure `.env.local` exists in project root
- Restart dev server after creating `.env.local`

### API calls fail with 401
- Check token is stored in localStorage
- Verify backend is validating tokens correctly

### CORS errors
- Backend must allow requests from your frontend URL
- Add appropriate CORS headers

### Type errors
- Import types from `src/types/api.ts`
- Check backend response matches expected types

## Next Steps

1. ✅ Update all components to use the new API service
2. ✅ Implement proper error boundaries
3. ✅ Add request caching/memoization
4. ✅ Implement pagination for large lists
5. ✅ Add offline support (optional)
6. ✅ Set up request logging/monitoring
