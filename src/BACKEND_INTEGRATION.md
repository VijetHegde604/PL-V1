# Backend Integration Guide
# =========================
# This guide helps you set up and integrate with a backend API.

## Environment Variables

Create a `.env.local` file in your project root with:

```
REACT_APP_API_URL=http://localhost:3000/api
```

For production:
```
REACT_APP_API_URL=https://api.example.com/api
```

## API Configuration

The API service is configured in `src/utils/apiService.ts`:
- Base URL: Read from `REACT_APP_API_URL` environment variable
- Timeout: 10 seconds for all requests
- Authentication: Bearer token from localStorage

## Authentication Flow

1. **Login**: `apiService.login(credentials)` returns token
2. **Store Token**: Token stored in localStorage automatically
3. **Authenticated Requests**: All requests include `Authorization: Bearer {token}` header
4. **Logout**: `apiService.logout()` clears session

Example:
```typescript
// Login
const { token, user } = await apiService.login({
  email: "user@example.com",
  password: "password123"
});

// Token is automatically included in all subsequent requests
const appointments = await apiService.getAppointments();

// Logout
await apiService.logout();
```

## Using Data Hooks

Instead of manually managing state, use the provided hooks:

```typescript
import { useAppointments, useBookings, useEvents } from "../hooks/useData";

export function MyComponent() {
  const { appointments, loading, error, refetch } = useAppointments({
    status: "upcoming"
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {appointments.map(apt => (
        <div key={apt.id}>{apt.service}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## API Types

All API responses are typed using interfaces from `src/types/api.ts`:

- `ApiAppointment`: Appointment data structure
- `ApiBooking`: Booking data structure
- `ApiEvent`: Event data structure
- `ApiService`: Service data structure
- `ApiError`: Error response structure

## Error Handling

Errors are automatically handled and displayed as toast notifications:

```typescript
try {
  const result = await apiService.rescheduleAppointment(payload);
} catch (err) {
  // Error is automatically shown as toast
  // err is an instance of ApiErrorResponse
  if (err instanceof ApiErrorResponse) {
    console.log(err.statusCode, err.errors);
  }
}
```

## Common API Endpoints

### Appointments
- `GET /appointments` - List appointments (with filters)
- `GET /appointments/:id` - Get single appointment
- `PATCH /appointments/:id/reschedule` - Reschedule appointment
- `PATCH /appointments/:id/cancel` - Cancel appointment

### Bookings
- `GET /bookings` - List bookings (with filters)
- `GET /bookings/:id` - Get single booking
- `POST /bookings` - Create booking
- `PATCH /bookings/:id/status` - Update booking status

### Events
- `GET /events` - List events (with filters)
- `GET /events/:id` - Get single event
- `POST /events` - Create event
- `PATCH /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /events/:id/register` - Register for event

### Services
- `GET /services` - List services (with filters)
- `GET /services/:id` - Get single service
- `POST /services` - Create service (admin only)
- `PATCH /services/:id` - Update service (admin only)

### Authentication
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/logout` - Logout

## Response Format

All API responses follow a consistent format:

```typescript
{
  status: "success" | "error" | "pending",
  data: T,
  message?: string,
  errors?: Record<string, string[]>
}
```

Paginated responses:
```typescript
{
  data: T[],
  total: number,
  page: number,
  pageSize: number,
  hasMore: boolean
}
```

## Next Steps

1. Update `REACT_APP_API_URL` with your backend URL
2. Update backend to match the API types in `src/types/api.ts`
3. Test authentication flow
4. Test data fetching with each endpoint
5. Update components to use the API service
