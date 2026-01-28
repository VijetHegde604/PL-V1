import { useState, useEffect, lazy, Suspense } from "react";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { useAuth } from "./hooks/useAuth";
import {
  useBookings,
  usePartnerBookings,
} from "./hooks/useBookings";
import { ROUTES, type Route } from "./constants/routes";
import { SERVICE_IDS } from "./constants/services";

// ============================================
// COMPONENT IMPORTS
// ============================================

// Eager load critical components (loaded immediately)
// These are shown on initial page load for better UX
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";

// Lazy load route components for code splitting (loaded on-demand)
// This reduces initial bundle size and improves performance
const UserDashboard = lazy(() =>
  import("./components/UserDashboard").then((m) => ({
    default: m.UserDashboard,
  })),
);
const PartnerDashboard = lazy(() =>
  import("./components/PartnerDashboard").then((m) => ({
    default: m.PartnerDashboard,
  })),
);
const AdminDashboard = lazy(() =>
  import("./components/AdminDashboard").then((m) => ({
    default: m.AdminDashboard,
  })),
);
const ServiceListPage = lazy(() =>
  import("./components/ServiceListPage").then((m) => ({
    default: m.ServiceListPage,
  })),
);
const BookingFlow = lazy(() =>
  import("./components/BookingFlow").then((m) => ({
    default: m.BookingFlow,
  })),
);
const BookingSuccessPage = lazy(() =>
  import("./components/BookingSuccessPage").then((m) => ({
    default: m.BookingSuccessPage,
  })),
);
const AppointmentsPage = lazy(() =>
  import("./components/AppointmentsPage").then((m) => ({
    default: m.AppointmentsPage,
  })),
);
const HealthReportsPage = lazy(() =>
  import("./components/HealthReportsPage").then((m) => ({
    default: m.HealthReportsPage,
  })),
);
const EventsPage = lazy(() =>
  import("./components/EventsPage").then((m) => ({
    default: m.EventsPage,
  })),
);
const ProfilePage = lazy(() =>
  import("./components/ProfilePage").then((m) => ({
    default: m.ProfilePage,
  })),
);
const AboutUsPage = lazy(() =>
  import("./components/AboutUsPage").then((m) => ({
    default: m.AboutUsPage,
  })),
);
const OurServicesPage = lazy(() =>
  import("./components/OurServicesPage").then((m) => ({
    default: m.OurServicesPage,
  })),
);
const ContactPage = lazy(() =>
  import("./components/ContactPage").then((m) => ({
    default: m.ContactPage,
  })),
);
const PrivacyPolicyPage = lazy(() =>
  import("./components/PrivacyPolicyPage").then((m) => ({
    default: m.PrivacyPolicyPage,
  })),
);
const TermsOfServicePage = lazy(() =>
  import("./components/TermsOfServicePage").then((m) => ({
    default: m.TermsOfServicePage,
  })),
);
const RefundPolicyPage = lazy(() =>
  import("./components/RefundPolicyPage").then((m) => ({
    default: m.RefundPolicyPage,
  })),
);

// ============================================
// LOADING COMPONENT
// ============================================

/**
 * Page Loader Component
 *
 * Displayed while lazy-loaded components are being fetched.
 * Shows a spinner animation for better UX during page transitions.
 */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2C3E50] border-t-[#F39C12] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#34495E]">Loading...</p>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP COMPONENT
// ============================================

/**
 * App Component - Main Application Entry Point
 *
 * Manages the entire application state and routing using local state.
 * In production, this should be replaced with proper routing library (React Router).
 *
 * State Management:
 * - currentPage: Tracks which page/component to display
 * - selectedModule: Stores selected service module for booking flow
 * - selectedService: Stores selected service details for booking
 * - user: Authentication state (from useAuth hook)
 * - appointments: User bookings (from useBookings hook)
 * - bookingRequests: Partner booking requests (from usePartnerBookings hook)
 *
 * TODO: Production Improvements
 * ==============================
 * 1. Replace useState routing with React Router or similar
 * 2. Add URL persistence for browser back/forward navigation
 * 3. Implement protected routes for authenticated pages
 * 4. Add global error boundary
 * 5. Implement proper state management (Context API/Redux)
 * 6. Add route-based code splitting
 * 7. Implement authentication persistence with localStorage/cookies
 */
export default function App() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  // Page routing state (client-side navigation)
  // TODO: Replace with React Router for proper URL-based routing
  const [currentPage, setCurrentPage] = useState<Route>(
    ROUTES.LANDING,
  );

  // Service booking flow state
  // Stores which service module user is browsing (CareNest, NutriScan, etc.)
  const [selectedModule, setSelectedModule] =
    useState<string>("");

  // Stores the specific service selected for booking
  // TODO: Should be stored in booking context for persistence across pages
  const [selectedService, setSelectedService] =
    useState<any>(null);

  // ============================================
  // CUSTOM HOOKS (State & Business Logic)
  // ============================================

  // Authentication hook - manages user login/logout state
  // TODO: Add token refresh, session timeout, and persistence
  const { user, login, register, logout, isLoggedIn } =
    useAuth();

  // User bookings hook - manages parent/family appointments
  // TODO: Fetch from API on mount, sync with backend
  const { appointments, lastBooking, addBooking } =
    useBookings();

  // Partner bookings hook - manages service provider bookings
  // TODO: Implement real-time updates with WebSockets
  const {
    bookingRequests,
    acceptedBookings,
    acceptBooking,
    declineBooking,
  } = usePartnerBookings();

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Login Handler
   *
   * Authenticates user and redirects to appropriate dashboard.
   *
   * TODO: API Integration
   * =====================
   * Add loading state, error handling, and API call:
   * ```
   * try {
   *   setLoading(true);
   *   const { user, token, redirectTo } = await apiLogin(email, password);
   *   localStorage.setItem('token', token);
   *   setUser(user);
   *   setCurrentPage(redirectTo);
   * } catch (error) {
   *   setError(error.message);
   * } finally {
   *   setLoading(false);
   * }
   * ```
   */
  const handleLogin = (email: string, password: string) => {
    const { redirectTo } = login(email, password);
    setCurrentPage(redirectTo);
  };

  /**
   * Registration Handler
   *
   * Creates new user account and logs them in.
   *
   * TODO: API Integration
   * =====================
   * Add email verification, password strength validation, and API call
   */
  const handleRegister = (
    name: string,
    email: string,
    password: string,
    role: "parent" | "partner",
  ) => {
    const { redirectTo } = register(
      name,
      email,
      password,
      role,
    );
    setCurrentPage(redirectTo);
  };

  /**
   * Logout Handler
   *
   * Logs out user and clears all session data.
   *
   * TODO: API Integration
   * =====================
   * Call backend logout endpoint, clear tokens, and reset state
   */
  const handleLogout = () => {
    logout();
    setCurrentPage(ROUTES.LANDING);
    setSelectedModule("");
    setSelectedService(null);
  };

  /**
   * Service Selection Handler
   *
   * Handles when user clicks on a service module card.
   * Routes to appropriate page based on service type.
   *
   * @param {string} serviceId - ID of selected service module
   */
  const handleServiceClick = (serviceId: string) => {
    // SilverCircle is events module, not a bookable service
    if (serviceId === SERVICE_IDS.SILVERCIRCLE) {
      setCurrentPage(ROUTES.EVENTS);
    } else {
      // Other modules show list of available services
      setSelectedModule(serviceId);
      setCurrentPage(ROUTES.SERVICE_LIST);
    }
  };

  /**
   * Service Booking Handler
   *
   * Stores selected service and navigates to booking flow.
   *
   * @param {any} service - Selected service object with details
   */
  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentPage(ROUTES.BOOKING);
  };

  /**
   * Booking Completion Handler
   *
   * Called when user completes the booking process.
   * Saves booking and shows success page.
   *
   * TODO: API Integration
   * =====================
   * This should call backend API to create booking:
   * ```
   * const createdBooking = await fetch('/api/bookings', {
   *   method: 'POST',
   *   body: JSON.stringify(booking)
   * });
   * ```
   *
   * @param {any} booking - Completed booking details
   */
  const handleBookingComplete = (booking: any) => {
    addBooking(booking);
    setCurrentPage(ROUTES.BOOKING_SUCCESS);
  };

  /**
   * Profile Update Handler
   *
   * Handles user profile updates.
   *
   * TODO: API Integration
   * =====================
   * Call backend to update user profile:
   * ```
   * await fetch(`/api/users/${user.id}`, {
   *   method: 'PUT',
   *   body: JSON.stringify(userData)
   * });
   * ```
   *
   * @param {any} userData - Updated user profile data
   */
  const handleProfileUpdate = (userData: any) => {
    // Profile update would be handled by auth hook in production
    // Data would be persisted via API call in production
  };

  /**
   * Navigation Handler
   *
   * Handles navigation between pages.
   *
   * TODO: Replace with React Router navigation
   *
   * @param {string} page - Page route to navigate to
   */
  const handleNavigate = (page: string) => {
    setCurrentPage(page as Route);
  };

  // ============================================
  // SIDE EFFECTS
  // ============================================

  /**
   * Scroll to Top Effect
   *
   * Automatically scrolls to top when page changes for better UX.
   * This simulates traditional page navigation behavior.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar - Hidden on admin page */}
      <NavBar
        isLoggedIn={isLoggedIn}
        userRole={user?.role}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Suspense wrapper for lazy-loaded components */}
        {/* Shows PageLoader while component is being fetched */}
        <Suspense fallback={<PageLoader />}>
          {currentPage === ROUTES.LANDING && (
            <LandingPage
              onNavigate={handleNavigate}
              onServiceClick={handleServiceClick}
              isLoggedIn={isLoggedIn}
            />
          )}

          {currentPage === ROUTES.LOGIN && (
            <LoginPage
              onLogin={handleLogin}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === ROUTES.REGISTER && (
            <RegisterPage
              onRegister={handleRegister}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === ROUTES.FORGOT_PASSWORD && (
            <ForgotPasswordPage onNavigate={handleNavigate} />
          )}

          {currentPage === ROUTES.DASHBOARD &&
            user?.role === "parent" && (
              <UserDashboard
                userName={user.name}
                onServiceClick={handleServiceClick}
                onNavigate={handleNavigate}
                appointments={appointments}
              />
            )}

          {currentPage === ROUTES.DASHBOARD &&
            user?.role === "partner" && (
              <PartnerDashboard
                partnerName={user.name}
                serviceType={user.serviceType as any}
                bookingRequests={bookingRequests}
                acceptedBookings={acceptedBookings}
                onAcceptBooking={acceptBooking}
                onDeclineBooking={declineBooking}
              />
            )}

          {currentPage === ROUTES.ADMIN &&
            user?.role === "admin" && (
              <AdminDashboard
                onBack={() => setCurrentPage(ROUTES.LANDING)}
                onLogout={handleLogout}
              />
            )}

          {currentPage === ROUTES.SERVICE_LIST && (
            <ServiceListPage
              module={selectedModule}
              onBack={() => setCurrentPage(ROUTES.DASHBOARD)}
              onServiceSelect={handleServiceSelect}
            />
          )}

          {currentPage === ROUTES.BOOKING &&
            selectedService && (
              <BookingFlow
                service={selectedService}
                onBack={() =>
                  setCurrentPage(ROUTES.SERVICE_LIST)
                }
                onComplete={handleBookingComplete}
              />
            )}

          {currentPage === ROUTES.BOOKING_SUCCESS &&
            lastBooking && (
              <BookingSuccessPage
                booking={lastBooking}
                onNavigate={handleNavigate}
              />
            )}

          {currentPage === ROUTES.APPOINTMENTS &&
            user?.role === "parent" && (
              <AppointmentsPage
                appointments={appointments}
                onBack={() => setCurrentPage(ROUTES.DASHBOARD)}
              />
            )}

          {currentPage === ROUTES.REPORTS && (
            <HealthReportsPage
              onBack={() => setCurrentPage(ROUTES.DASHBOARD)}
            />
          )}

          {currentPage === ROUTES.EVENTS && (
            <EventsPage
              onBack={() => setCurrentPage(ROUTES.DASHBOARD)}
            />
          )}

          {currentPage === ROUTES.PROFILE && user && (
            <ProfilePage
              user={user}
              onBack={() => setCurrentPage(ROUTES.DASHBOARD)}
              onUpdate={handleProfileUpdate}
            />
          )}

          {currentPage === ROUTES.ABOUT && <AboutUsPage />}

          {currentPage === ROUTES.SERVICES && (
            <OurServicesPage onNavigate={handleNavigate} />
          )}

          {currentPage === ROUTES.CONTACT && <ContactPage />}

          {currentPage === ROUTES.PRIVACY && (
            <PrivacyPolicyPage />
          )}

          {currentPage === ROUTES.TERMS && (
            <TermsOfServicePage />
          )}

          {currentPage === ROUTES.REFUND && (
            <RefundPolicyPage />
          )}
        </Suspense>
      </main>

      {user?.role !== "admin" && (
        <Footer onNavigate={handleNavigate} />
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
}