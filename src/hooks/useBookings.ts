import { useState, useCallback } from "react";
import { toast } from "sonner@2.0.3";
import type { Appointment, Booking } from "../types";

/**
 * HARDCODED DATA: Initial mock appointments for demo purposes
 * ============================================================
 * This array contains sample appointment data to populate the user dashboard.
 *
 * TODO: API Integration
 * =====================
 * Replace this with API call to fetch user's actual appointments:
 * GET /api/appointments?userId={userId}
 *
 * Response should include:
 * - service: Service name
 * - date: Appointment date (ISO format)
 * - time: Appointment time
 * - price: Service price
 * - status: 'upcoming' | 'completed' | 'cancelled'
 * - module: Service module (CareNest, NutriScan, etc.)
 * - partner: Service provider name
 */
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    service: "Yoga Session (Single)",
    date: "2025-11-12",
    time: "10:00 AM",
    price: "₹800",
    status: "upcoming",
    module: "RejuvaFit",
    partner: "Yoga Studio Plus",
  },
  {
    service: "Full Body Checkup",
    date: "2025-11-15",
    time: "9:00 AM",
    price: "₹3,999",
    status: "upcoming",
    module: "NutriScan",
    partner: "HealthCare Diagnostics",
  },
  {
    service: "Home Nursing (8 hours)",
    date: "2025-10-20",
    time: "8:00 AM",
    price: "₹2,500",
    status: "completed",
    module: "CareNest",
    partner: "CareNest Services",
  },
  {
    service: "Weekly Meal Plan - Diabetic Friendly",
    date: "2025-11-18",
    time: "11:00 AM",
    price: "₹1,500",
    status: "upcoming",
    module: "MealAura",
    partner: "MealAura Chef Services",
  },
  {
    service: "Head & Shoulder Massage",
    date: "2025-11-20",
    time: "2:00 PM",
    price: "₹1,200",
    status: "upcoming",
    module: "BlissTouch",
    partner: "Serenity Spa & Wellness",
  },
  {
    service: "Physiotherapy Session",
    date: "2025-10-15",
    time: "3:00 PM",
    price: "₹1,200",
    status: "completed",
    module: "RejuvaFit",
    partner: "RejuvaFit Clinic",
  },
];

/**
 * HARDCODED DATA: Mock booking requests for service partners
 * ===========================================================
 * This array simulates pending booking requests that partners need to review.
 *
 * TODO: API Integration
 * =====================
 * Replace with API call to fetch partner's pending booking requests:
 * GET /api/bookings/requests?partnerId={partnerId}&status=pending
 */
const MOCK_BOOKING_REQUESTS: Booking[] = [
  {
    id: 1,
    service: "Yoga Session (Single)",
    clientName: "Rajesh Kumar",
    date: "2025-11-10",
    time: "10:00 AM",
    address: "A-123, Green Park, New Delhi",
    phone: "+91 9876543210",
    price: "₹800",
  },
  {
    id: 2,
    service: "Physiotherapy Session",
    clientName: "Meera Sharma",
    date: "2025-11-12",
    time: "3:00 PM",
    address: "B-456, South Extension, Delhi",
    phone: "+91 9876543211",
    price: "₹1,200",
  },
];

/**
 * HARDCODED DATA: Mock accepted bookings for service partners
 * ============================================================
 * This array simulates bookings that partners have already accepted.
 *
 * TODO: API Integration
 * =====================
 * Replace with API call to fetch partner's accepted bookings:
 * GET /api/bookings/accepted?partnerId={partnerId}&status=accepted
 */
const MOCK_ACCEPTED_BOOKINGS: Booking[] = [
  {
    id: 3,
    service: "Home Nursing (8 hours)",
    clientName: "Anita Patel",
    date: "2025-11-08",
    time: "9:00 AM",
    address: "C-789, Vasant Vihar, Delhi",
    phone: "+91 9876543210",
    price: "₹2,500",
  },
];

/**
 * Custom Hook: useBookings
 * =========================
 * Manages user bookings and appointments state.
 * Used by parents/families to view and track their service appointments.
 *
 * TODO: API Integration Points
 * =============================
 * 1. GET /api/appointments - Fetch user's appointments
 * 2. POST /api/appointments - Create new appointment
 * 3. PUT /api/appointments/:id - Update appointment
 * 4. DELETE /api/appointments/:id - Cancel appointment
 *
 * @returns {Object} Appointments state and management functions
 */
export function useBookings() {
  // Local state for user appointments
  // TODO: Fetch from API on component mount using useEffect
  const [appointments, setAppointments] = useState<
    Appointment[]
  >(INITIAL_APPOINTMENTS);

  // Track the most recently created booking for success page display
  const [lastBooking, setLastBooking] =
    useState<Appointment | null>(null);

  /**
   * Add Booking Function
   *
   * Creates a new appointment/booking for the user.
   *
   * TODO: API Integration
   * =====================
   * Replace with actual API call:
   * ```
   * const response = await fetch('/api/appointments', {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   },
   *   body: JSON.stringify(booking)
   * });
   * const newAppointment = await response.json();
   * setAppointments(prev => [newAppointment, ...prev]);
   * ```
   *
   * @param {Appointment} booking - New appointment details
   */
  const addBooking = useCallback((booking: Appointment) => {
    // Add new booking to the beginning of appointments list
    setAppointments((prev) => [booking, ...prev]);

    // Store for success page display
    setLastBooking(booking);

    // Show success notification
    toast.success("Booking confirmed successfully!");
  }, []);

  return {
    appointments, // List of all user appointments
    lastBooking, // Most recent booking (for confirmation page)
    addBooking, // Function to add new booking
  };
}

/**
 * Custom Hook: usePartnerBookings
 * ================================
 * Manages booking requests for service partners (CareNest, NutriScan, etc.)
 * Partners can accept or decline incoming booking requests.
 *
 * TODO: API Integration Points
 * =============================
 * 1. GET /api/bookings/requests - Fetch pending booking requests
 * 2. GET /api/bookings/accepted - Fetch accepted bookings
 * 3. PUT /api/bookings/:id/accept - Accept a booking request
 * 4. PUT /api/bookings/:id/decline - Decline a booking request
 * 5. WebSocket or polling for real-time booking notifications
 *
 * @returns {Object} Booking requests state and management functions
 */
export function usePartnerBookings() {
  // Local state for pending booking requests
  // TODO: Fetch from API and implement real-time updates
  const [bookingRequests, setBookingRequests] = useState<
    Booking[]
  >(MOCK_BOOKING_REQUESTS);

  // Local state for accepted bookings
  // TODO: Fetch from API on component mount
  const [acceptedBookings, setAcceptedBookings] = useState<
    Booking[]
  >(MOCK_ACCEPTED_BOOKINGS);

  /**
   * Accept Booking Function
   *
   * Moves a booking from pending requests to accepted bookings.
   *
   * TODO: API Integration
   * =====================
   * Replace with actual API call:
   * ```
   * const response = await fetch(`/api/bookings/${bookingId}/accept`, {
   *   method: 'PUT',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   }
   * });
   * const updatedBooking = await response.json();
   * // Update local state with response
   * ```
   *
   * @param {number} bookingId - ID of booking to accept
   */
  const acceptBooking = useCallback(
    (bookingId: number) => {
      // Find the booking in pending requests
      const booking = bookingRequests.find(
        (b) => b.id === bookingId,
      );

      if (booking) {
        // Move to accepted bookings
        setAcceptedBookings((prev) => [...prev, booking]);

        // Remove from pending requests
        setBookingRequests((prev) =>
          prev.filter((b) => b.id !== bookingId),
        );

        // Show success notification
        toast.success("Booking request accepted!");

        // TODO: Send notification to customer about acceptance
      }
    },
    [bookingRequests],
  );

  /**
   * Decline Booking Function
   *
   * Removes a booking from pending requests (declines it).
   *
   * TODO: API Integration
   * =====================
   * Replace with actual API call:
   * ```
   * const response = await fetch(`/api/bookings/${bookingId}/decline`, {
   *   method: 'PUT',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`
   *   },
   *   body: JSON.stringify({ reason: declineReason })
   * });
   * ```
   *
   * @param {number} bookingId - ID of booking to decline
   */
  const declineBooking = useCallback((bookingId: number) => {
    // Remove from pending requests
    setBookingRequests((prev) =>
      prev.filter((b) => b.id !== bookingId),
    );

    // Show info notification
    toast.info("Booking request declined.");

    // TODO: Send notification to customer about decline
    // TODO: Consider adding decline reason parameter
  }, []);

  return {
    bookingRequests, // List of pending booking requests
    acceptedBookings, // List of accepted bookings
    acceptBooking, // Function to accept a booking
    declineBooking, // Function to decline a booking
  };
}