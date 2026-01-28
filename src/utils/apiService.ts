/**
 * API Service Module
 * ==================
 * Centralized API client for all backend communications.
 * Handles request/response handling, error management, and type safety.
 */

import {
  PaginatedResponse,
  ApiAppointment,
  ApiBooking,
  ApiEvent,
  ApiService,
  ApiPartner,
  AuthResponse,
  ApiErrorResponse,
  RegisterPayload,
  LoginPayload,
  RescheduleAppointmentPayload,
  CancelAppointmentPayload,
  CreateBookingPayload,
  UpdateBookingStatusPayload,
  RegisterEventPayload,
  CreateEventPayload,
  UpdateEventPayload,
  CreateServicePayload,
  UpdateServicePayload,
  AppointmentFilters,
  BookingFilters,
  EventFilters,
  ServiceFilters,
} from "../types/api";

// Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Fetch with timeout and proper error handling
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Parse API response and handle errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiErrorResponse(response.status, data.errors || []);
  }

  return data.data || data;
}

/**
 * Build query string from filters
 */
function buildQueryString(filters: Record<string, any>): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

/**
 * API Service Class
 */
export const apiService = {
  // ========================================================================
  // AUTHENTICATION
  // ========================================================================

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response);
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response);
  },

  async logout(): Promise<void> {
    await fetchWithTimeout(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },

  // ========================================================================
  // APPOINTMENTS
  // ========================================================================

  async getAppointments(
    filters?: AppointmentFilters,
  ): Promise<PaginatedResponse<ApiAppointment>> {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await fetchWithTimeout(`${API_BASE_URL}/appointments${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<PaginatedResponse<ApiAppointment>>(response);
  },

  async getAppointment(id: string): Promise<ApiAppointment> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/appointments/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiAppointment>(response);
  },

  async rescheduleAppointment(
    payload: RescheduleAppointmentPayload,
  ): Promise<ApiAppointment> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/appointments/${payload.appointmentId}/reschedule`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      },
    );
    return handleResponse<ApiAppointment>(response);
  },

  async cancelAppointment(
    payload: CancelAppointmentPayload,
  ): Promise<ApiAppointment> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/appointments/${payload.appointmentId}/cancel`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      },
    );
    return handleResponse<ApiAppointment>(response);
  },

  // ========================================================================
  // BOOKINGS
  // ========================================================================

  async getBookings(filters?: BookingFilters): Promise<PaginatedResponse<ApiBooking>> {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await fetchWithTimeout(`${API_BASE_URL}/bookings${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<PaginatedResponse<ApiBooking>>(response);
  },

  async getBooking(id: string): Promise<ApiBooking> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/bookings/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiBooking>(response);
  },

  async createBooking(payload: CreateBookingPayload): Promise<ApiBooking> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<ApiBooking>(response);
  },

  async updateBookingStatus(
    payload: UpdateBookingStatusPayload,
  ): Promise<ApiBooking> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/bookings/${payload.bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      },
    );
    return handleResponse<ApiBooking>(response);
  },

  // ========================================================================
  // EVENTS
  // ========================================================================

  async getEvents(filters?: EventFilters): Promise<PaginatedResponse<ApiEvent>> {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await fetchWithTimeout(`${API_BASE_URL}/events${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<PaginatedResponse<ApiEvent>>(response);
  },

  async getEvent(id: string): Promise<ApiEvent> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/events/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiEvent>(response);
  },

  async createEvent(payload: CreateEventPayload): Promise<ApiEvent> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<ApiEvent>(response);
  },

  async updateEvent(payload: UpdateEventPayload): Promise<ApiEvent> {
    const { eventId, ...data } = payload;
    const response = await fetchWithTimeout(`${API_BASE_URL}/events/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse<ApiEvent>(response);
  },

  async deleteEvent(id: string): Promise<void> {
    await fetchWithTimeout(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },

  async registerEvent(payload: RegisterEventPayload): Promise<ApiEvent> {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/events/${payload.eventId}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return handleResponse<ApiEvent>(response);
  },

  // ========================================================================
  // SERVICES
  // ========================================================================

  async getServices(filters?: ServiceFilters): Promise<ApiService[]> {
    const query = filters ? `?${buildQueryString(filters)}` : "";
    const response = await fetchWithTimeout(`${API_BASE_URL}/services${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiService[]>(response);
  },

  async getService(id: string): Promise<ApiService> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/services/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiService>(response);
  },

  async createService(payload: CreateServicePayload): Promise<ApiService> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    return handleResponse<ApiService>(response);
  },

  async updateService(payload: UpdateServicePayload): Promise<ApiService> {
    const { serviceId, ...data } = payload;
    const response = await fetchWithTimeout(`${API_BASE_URL}/services/${serviceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return handleResponse<ApiService>(response);
  },

  // ========================================================================
  // PARTNERS
  // ========================================================================

  async getPartners(): Promise<ApiPartner[]> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/partners`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiPartner[]>(response);
  },

  async getPartner(id: string): Promise<ApiPartner> {
    const response = await fetchWithTimeout(`${API_BASE_URL}/partners/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return handleResponse<ApiPartner>(response);
  },
};

export default apiService;
