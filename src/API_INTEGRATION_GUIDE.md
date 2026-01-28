# API Integration Guide - Parents Luxuria

**Complete guide for backend integration and removing hardcoded data**

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication APIs](#authentication-apis)
3. [User Management APIs](#user-management-apis)
4. [Service APIs](#service-apis)
5. [Booking APIs](#booking-apis)
6. [Admin APIs](#admin-apis)
7. [File Upload APIs](#file-upload-apis)
8. [Hardcoded Data Locations](#hardcoded-data-locations)
9. [Implementation Checklist](#implementation-checklist)

---

## Overview

This document outlines all API endpoints needed to replace hardcoded data in the Parents Luxuria application. Each section includes:

- **Endpoint**: The API route
- **Method**: HTTP method (GET, POST, PUT, DELETE)
- **Purpose**: What the endpoint does
- **Request**: Expected request body/params
- **Response**: Expected response format
- **File**: Where to implement in frontend code

---

## Authentication APIs

### 1. Login

**File**: `/hooks/useAuth.ts` (Line 56-113)

```
POST /api/auth/login

Request Body:
{
  "email": "user@example.com",
  "password": "hashedPassword123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "name": "Rajesh Kumar",
    "email": "user@example.com",
    "role": "parent" | "partner" | "admin",
    "phone": "+91 9876543210",
    "address": "A-123, Green Park, New Delhi",
    "serviceType": "CareNest" // only for partners
  },
  "redirectTo": "/dashboard"
}
```

### 2. Register

**File**: `/hooks/useAuth.ts` (Line 115-143)

```
POST /api/auth/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashedPassword123",
  "role": "parent" | "partner",
  "phone": "+91 9876543210",
  "serviceType": "CareNest" // only for partners
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { /* same as login response */ },
  "redirectTo": "/dashboard"
}
```

### 3. Logout

**File**: `/hooks/useAuth.ts` (Line 145-160)

```
POST /api/auth/logout

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 4. Get Current User

**File**: `/hooks/useAuth.ts` (Add new function)

```
GET /api/auth/me

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": { /* same user object */ }
}
```

### 5. Forgot Password - Send OTP

**File**: `/components/ForgotPasswordPage.tsx`

```
POST /api/auth/forgot-password

Request Body:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "OTP sent to email",
  "expiresIn": 600 // seconds
}
```

### 6. Verify OTP

**File**: `/components/ForgotPasswordPage.tsx`

```
POST /api/auth/verify-otp

Request Body:
{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "success": true,
  "resetToken": "temp_reset_token",
  "message": "OTP verified"
}
```

### 7. Reset Password

**File**: `/components/ForgotPasswordPage.tsx`

```
POST /api/auth/reset-password

Request Body:
{
  "resetToken": "temp_reset_token",
  "newPassword": "newHashedPassword123"
}

Response:
{
  "success": true,
  "message": "Password reset successful"
}
```

---

## User Management APIs

### 1. Get User Profile

**File**: `/components/ProfilePage.tsx`

```
GET /api/users/:userId

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": {
    "id": "user123",
    "name": "Rajesh Kumar",
    "email": "user@example.com",
    "phone": "+91 9876543210",
    "address": "A-123, Green Park, New Delhi",
    "role": "parent",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### 2. Update User Profile

**File**: `/components/ProfilePage.tsx`, `/App.tsx` (handleProfileUpdate)

```
PUT /api/users/:userId

Headers:
Authorization: Bearer {token}

Request Body:
{
  "name": "Rajesh Kumar",
  "phone": "+91 9876543210",
  "address": "A-123, Green Park, New Delhi"
}

Response:
{
  "success": true,
  "user": { /* updated user object */ }
}
```

---

## Service APIs

### 1. Get All Services

**File**: `/constants/services.ts` (Replace SERVICES array)

```
GET /api/services

Response:
{
  "success": true,
  "services": [
    {
      "id": "carenest",
      "title": "CareNest",
      "description": "Home nursing, elder care, and comprehensive medical support",
      "icon": "home",
      "isActive": true,
      "features": ["24/7 Support", "Certified Nurses", "Medical Equipment"],
      "imageUrl": "https://cdn.example.com/carenest.jpg"
    },
    // ... more services
  ]
}
```

### 2. Get Services by Module

**File**: `/components/ServiceListPage.tsx`

```
GET /api/services/:moduleId/offerings

Example: GET /api/services/carenest/offerings

Response:
{
  "success": true,
  "module": "CareNest",
  "services": [
    {
      "id": "srv_001",
      "name": "Home Nursing (8 hours)",
      "description": "Professional nursing care at home",
      "price": 2500,
      "duration": "8 hours",
      "category": "Nursing",
      "availability": true
    },
    // ... more services
  ]
}
```

---

## Booking APIs

### 1. Get User Appointments

**File**: `/hooks/useBookings.ts` (Line 21-75, Replace INITIAL_APPOINTMENTS)

```
GET /api/appointments?userId={userId}

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "appointments": [
    {
      "id": "apt_001",
      "service": "Yoga Session (Single)",
      "date": "2025-11-12",
      "time": "10:00 AM",
      "price": "₹800",
      "status": "upcoming",
      "module": "RejuvaFit",
      "partner": "Yoga Studio Plus",
      "address": "A-123, Green Park, New Delhi"
    },
    // ... more appointments
  ]
}
```

### 2. Create Booking

**File**: `/hooks/useBookings.ts` (Line 164-195, addBooking function)

```
POST /api/bookings

Headers:
Authorization: Bearer {token}

Request Body:
{
  "serviceId": "srv_001",
  "date": "2025-11-12",
  "time": "10:00 AM",
  "address": "A-123, Green Park, New Delhi",
  "phone": "+91 9876543210",
  "notes": "Please bring equipment"
}

Response:
{
  "success": true,
  "booking": {
    "id": "bkg_001",
    "service": "Yoga Session (Single)",
    "date": "2025-11-12",
    "time": "10:00 AM",
    "price": "₹800",
    "status": "pending",
    "module": "RejuvaFit"
  }
}
```

### 3. Get Partner Booking Requests

**File**: `/hooks/useBookings.ts` (Line 87-107, Replace MOCK_BOOKING_REQUESTS)

```
GET /api/bookings/requests?partnerId={partnerId}&status=pending

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "requests": [
    {
      "id": 1,
      "service": "Yoga Session (Single)",
      "clientName": "Rajesh Kumar",
      "clientId": "user123",
      "date": "2025-11-10",
      "time": "10:00 AM",
      "address": "A-123, Green Park, New Delhi",
      "phone": "+91 9876543210",
      "price": "₹800",
      "notes": "First time booking"
    }
  ]
}
```

### 4. Get Partner Accepted Bookings

**File**: `/hooks/useBookings.ts` (Line 119-138, Replace MOCK_ACCEPTED_BOOKINGS)

```
GET /api/bookings/accepted?partnerId={partnerId}&status=accepted

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "bookings": [
    {
      "id": 3,
      "service": "Home Nursing (8 hours)",
      "clientName": "Anita Patel",
      "date": "2025-11-08",
      "time": "9:00 AM",
      "address": "C-789, Vasant Vihar, Delhi",
      "phone": "+91 9876543210",
      "price": "₹2,500"
    }
  ]
}
```

### 5. Accept Booking Request

**File**: `/hooks/useBookings.ts` (Line 238-268, acceptBooking function)

```
PUT /api/bookings/:bookingId/accept

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "booking": { /* updated booking with status: "accepted" */ },
  "message": "Booking accepted successfully"
}
```

### 6. Decline Booking Request

**File**: `/hooks/useBookings.ts` (Line 270-296, declineBooking function)

```
PUT /api/bookings/:bookingId/decline

Headers:
Authorization: Bearer {token}

Request Body (optional):
{
  "reason": "Not available at that time"
}

Response:
{
  "success": true,
  "message": "Booking declined"
}
```

### 7. Cancel Booking

**File**: Add to `/hooks/useBookings.ts`

```
DELETE /api/bookings/:bookingId

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Admin APIs

### 1. Get Platform Statistics

**File**: `/components/AdminDashboard.tsx` (Dashboard stats section)

```
GET /api/admin/statistics

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "stats": {
    "totalUsers": 1250,
    "totalPartners": 48,
    "totalBookings": 3847,
    "revenue": 2847500,
    "activeUsers": 890,
    "pendingBookings": 125
  }
}
```

### 2. Get All Users (Parents & Partners)

**File**: `/components/AdminDashboard.tsx` (Users tab)

```
GET /api/admin/users?role={role}&page={page}&limit={limit}

Headers:
Authorization: Bearer {token}

Query Params:
- role: "parent" | "partner" | "all"
- page: number (default: 1)
- limit: number (default: 10)

Response:
{
  "success": true,
  "users": [ /* array of user objects */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### 3. Get All Services (CRUD)

**File**: `/components/AdminDashboard.tsx` (Services tab)

```
GET /api/admin/services

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "services": [ /* array of service objects with full details */ ]
}
```

### 4. Create Service

**File**: `/components/AdminDashboard.tsx`

```
POST /api/admin/services

Headers:
Authorization: Bearer {token}

Request Body:
{
  "name": "Premium Massage",
  "description": "Relaxing full body massage",
  "price": 2500,
  "module": "BlissTouch",
  "duration": "60 minutes",
  "isActive": true
}

Response:
{
  "success": true,
  "service": { /* created service object */ }
}
```

### 5. Update Service

**File**: `/components/AdminDashboard.tsx`

```
PUT /api/admin/services/:serviceId

Headers:
Authorization: Bearer {token}

Request Body:
{
  "price": 2800,
  "isActive": false
}

Response:
{
  "success": true,
  "service": { /* updated service object */ }
}
```

### 6. Delete Service

**File**: `/components/AdminDashboard.tsx`

```
DELETE /api/admin/services/:serviceId

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Service deleted successfully"
}
```

### 7. Get All Bookings

**File**: `/components/AdminDashboard.tsx` (Bookings tab)

```
GET /api/admin/bookings?status={status}&page={page}

Headers:
Authorization: Bearer {token}

Response:
{
  "success": true,
  "bookings": [ /* array of all bookings */ ],
  "pagination": { /* pagination info */ }
}
```

---

## File Upload APIs

### 1. Upload Event Image

**File**: `/components/AdminDashboard.tsx` or Events management

```
POST /api/upload/event-image

Headers:
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body (FormData):
{
  "image": File,
  "eventId": "evt_001"
}

Response:
{
  "success": true,
  "imageUrl": "https://cdn.example.com/events/evt_001.jpg"
}
```

### 2. Upload Profile Picture

**File**: `/components/ProfilePage.tsx`

```
POST /api/upload/profile-picture

Headers:
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body (FormData):
{
  "image": File,
  "userId": "user123"
}

Response:
{
  "success": true,
  "imageUrl": "https://cdn.example.com/profiles/user123.jpg"
}
```

---

## Hardcoded Data Locations

### Files Containing Hardcoded Data:

1. **`/hooks/useAuth.ts`**
   - Lines 56-113: Mock login logic with email pattern matching
   - Lines 90-95: Hardcoded user data (name, phone, address)
   - Lines 115-143: Mock registration logic

2. **`/hooks/useBookings.ts`**
   - Lines 21-75: `INITIAL_APPOINTMENTS` - Mock appointment data
   - Lines 87-107: `MOCK_BOOKING_REQUESTS` - Mock pending requests
   - Lines 119-138: `MOCK_ACCEPTED_BOOKINGS` - Mock accepted bookings

3. **`/constants/services.ts`**
   - Lines 28-99: `SERVICES` array - Service module configuration
   - Lines 121-129: `PARTNER_EMAIL_PATTERNS` - Email patterns for demo auth

4. **`/constants/images.ts`**
   - Line 46: `HERO_IMAGE` - Static hero image
   - Lines 58-77: `EVENT_IMAGES` - Static event category images

5. **`/components/AdminDashboard.tsx`**
   - All dashboard statistics are hardcoded
   - User lists are mock data
   - Service CRUD operations use local state only

6. **`/components/PartnerDashboard.tsx`**
   - Uses mock data from usePartnerBookings hook

7. **`/components/ServiceListPage.tsx`**
   - Service offerings are generated based on module ID (hardcoded logic)

8. **`/components/EventsPage.tsx`**
   - Event data is hardcoded in component

---

## Implementation Checklist

### Phase 1: Authentication & Users

- [ ] Implement login API
- [ ] Implement registration API
- [ ] Implement logout API
- [ ] Add token storage (localStorage or httpOnly cookies)
- [ ] Implement authentication persistence
- [ ] Add protected route logic
- [ ] Implement password reset flow
- [ ] Add user profile APIs

### Phase 2: Services & Bookings

- [ ] Create services database schema
- [ ] Implement get all services API
- [ ] Implement service offerings API
- [ ] Create bookings database schema
- [ ] Implement create booking API
- [ ] Implement get user appointments API
- [ ] Implement partner booking requests API
- [ ] Add booking status management

### Phase 3: Partner Features

- [ ] Implement partner booking acceptance API
- [ ] Implement partner booking decline API
- [ ] Add real-time notifications (WebSocket/Polling)
- [ ] Create partner analytics APIs

### Phase 4: Admin Panel

- [ ] Implement admin statistics API
- [ ] Create user management APIs (CRUD)
- [ ] Create service management APIs (CRUD)
- [ ] Implement booking management APIs
- [ ] Add reporting and analytics

### Phase 5: File Upload & Media

- [ ] Set up CDN (AWS S3, Cloudinary, etc.)
- [ ] Implement image upload API
- [ ] Add image compression pipeline
- [ ] Migrate static images to CDN

### Phase 6: Additional Features

- [ ] Implement search and filtering
- [ ] Add pagination to all list endpoints
- [ ] Implement email notifications
- [ ] Add SMS notifications
- [ ] Create payment integration
- [ ] Add review and rating system

---

## Notes

1. **Authentication**: Use JWT tokens with httpOnly cookies for security
2. **Validation**: Add input validation on both frontend and backend
3. **Error Handling**: Return consistent error formats
4. **Rate Limiting**: Implement rate limiting on authentication endpoints
5. **Database**: Use PostgreSQL or MongoDB for data persistence
6. **Caching**: Implement Redis caching for frequently accessed data
7. **Testing**: Write unit and integration tests for all APIs
8. **Documentation**: Use Swagger/OpenAPI for API documentation

---

**Last Updated**: January 2025