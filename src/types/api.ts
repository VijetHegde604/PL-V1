/**
 * API Response Types and DTOs
 * ============================
 * Define all types that match backend API responses.
 * These ensure type safety when handling server data.
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export type ApiStatus = "success" | "error" | "pending";

export interface ApiResponse<T> {
  status: ApiStatus;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "parent" | "partner" | "admin";
  phone?: string;
  address?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "parent" | "partner";
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ============================================================================
// APPOINTMENTS
// ============================================================================

export interface ApiAppointment {
  id: string;
  userId: string;
  service: string;
  module: "CareNest" | "NutriScan" | "MealAura" | "RejuvaFit" | "BlissTouch";
  partnerId: string;
  partnerName: string;
  date: string; // ISO 8601 format
  time: string; // HH:mm format
  price: string;
  status: "upcoming" | "completed" | "cancelled" | "rescheduled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RescheduleAppointmentPayload {
  appointmentId: string;
  newDate: string;
  newTime: string;
  reason?: string;
}

export interface CancelAppointmentPayload {
  appointmentId: string;
  reason?: string;
}

// ============================================================================
// BOOKINGS
// ============================================================================

export interface ApiBooking {
  id: string;
  userId: string;
  clientName: string;
  service: string;
  module: string;
  partnerId: string;
  partnerName: string;
  date: string; // ISO 8601 format
  time: string;
  address: string;
  phone: string;
  price: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  clientName: string;
  service: string;
  date: string;
  time: string;
  address: string;
  phone: string;
  notes?: string;
}

export interface UpdateBookingStatusPayload {
  bookingId: string;
  status: "confirmed" | "cancelled" | "completed";
  notes?: string;
}

// ============================================================================
// EVENTS
// ============================================================================

export interface ApiEvent {
  id: string;
  name: string;
  description: string;
  date: string; // ISO 8601 format
  time: string; // HH:mm format
  location: string;
  category: "Music" | "Art" | "Literature" | "Gardening" | "Sports" | "Wellness";
  imageUrl: string;
  registeredUsers: number;
  maxAttendees: number;
  status: "active" | "cancelled" | "completed";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterEventPayload {
  eventId: string;
}

export interface CreateEventPayload {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  maxAttendees: number;
}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {
  eventId: string;
}

// ============================================================================
// SERVICES
// ============================================================================

export interface ApiService {
  id: string;
  name: string;
  description: string;
  module: "CareNest" | "NutriScan" | "MealAura" | "RejuvaFit" | "BlissTouch";
  price: string;
  duration: string; // e.g., "60 minutes"
  category: string;
  active: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServicePayload {
  name: string;
  description: string;
  module: string;
  price: string;
  duration: string;
  category: string;
}

export interface UpdateServicePayload extends Partial<CreateServicePayload> {
  serviceId: string;
}

// ============================================================================
// PARTNERS/PROVIDERS
// ============================================================================

export interface ApiPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  services: ApiService[];
  rating?: number;
  reviews?: number;
  verified: boolean;
  status: "active" | "inactive" | "pending";
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ADMIN DATA
// ============================================================================

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}

export interface AdminStats {
  totalUsers: number;
  totalBookings: number;
  totalEvents: number;
  totalRevenue: number;
  bookingsTrend: Array<{
    date: string;
    count: number;
  }>;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export class ApiErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public errors: ApiError[],
  ) {
    super(errors[0]?.message || "An error occurred");
  }
}

// ============================================================================
// FILTERS & SEARCH
// ============================================================================

export interface AppointmentFilters {
  status?: "upcoming" | "completed" | "cancelled";
  module?: string;
  startDate?: string;
  endDate?: string;
  partnerId?: string;
}

export interface BookingFilters {
  status?: string;
  module?: string;
  startDate?: string;
  endDate?: string;
}

export interface EventFilters {
  category?: string;
  status?: "active" | "completed" | "cancelled";
  startDate?: string;
  endDate?: string;
}

export interface ServiceFilters {
  module?: string;
  active?: boolean;
  category?: string;
}
