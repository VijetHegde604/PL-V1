/**
 * Custom Hooks for Data Fetching
 * ==============================
 * Reusable hooks for fetching and managing appointments, bookings, and events.
 */

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  ApiAppointment,
  ApiBooking,
  ApiEvent,
  ApiService,
  AppointmentFilters,
  BookingFilters,
  EventFilters,
  ServiceFilters,
} from "../types/api";
import apiService from "../utils/apiService";

// ============================================================================
// USE APPOINTMENTS HOOK
// ============================================================================

interface UseAppointmentsReturn {
  appointments: ApiAppointment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAppointments(filters?: AppointmentFilters): UseAppointmentsReturn {
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getAppointments(filters);
      setAppointments(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load appointments";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
  };
}

// ============================================================================
// USE BOOKINGS HOOK
// ============================================================================

interface UseBookingsReturn {
  bookings: ApiBooking[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBookings(filters?: BookingFilters): UseBookingsReturn {
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBookings(filters);
      setBookings(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load bookings";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
  };
}

// ============================================================================
// USE EVENTS HOOK
// ============================================================================

interface UseEventsReturn {
  events: ApiEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEvents(filters?: EventFilters): UseEventsReturn {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getEvents(filters);
      setEvents(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load events";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };
}

// ============================================================================
// USE SERVICES HOOK
// ============================================================================

interface UseServicesReturn {
  services: ApiService[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useServices(filters?: ServiceFilters): UseServicesReturn {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getServices(filters);
      setServices(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load services";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
  };
}
