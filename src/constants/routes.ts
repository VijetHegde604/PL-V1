/**
 * Route Constants - Application Navigation
 * =========================================
 *
 * Defines all application routes for type-safe navigation.
 * Currently used with client-side state-based routing in App.tsx.
 *
 * TODO: API Integration & Production Updates
 * ===========================================
 * 1. Replace with React Router for proper URL-based routing
 * 2. Add route guards for authentication (protected routes)
 * 3. Implement dynamic routes (e.g., /booking/:serviceId)
 * 4. Add query parameter support
 * 5. Implement route-based code splitting
 *
 * Example with React Router:
 * ```
 * const router = createBrowserRouter([
 *   { path: '/', element: <LandingPage /> },
 *   { path: '/login', element: <LoginPage /> },
 *   {
 *     path: '/dashboard',
 *     element: <ProtectedRoute><Dashboard /></ProtectedRoute>
 *   },
 * ]);
 * ```
 */

/**
 * Application Routes Object
 * ==========================
 * String constants for all application pages/screens.
 *
 * Routes are organized by category:
 * - Public: landing, login, register, etc.
 * - Authenticated: dashboard, profile, appointments, etc.
 * - Service Flow: service-list, booking, booking-success
 * - Admin: admin dashboard
 * - Static: about, services, contact, legal pages
 */
export const ROUTES = {
  // Public Routes (No authentication required)
  LANDING: "landing", // Homepage with service cards
  LOGIN: "login", // User/Partner/Admin login
  REGISTER: "register", // New user registration
  FORGOT_PASSWORD: "forgot-password", // Password reset flow

  // Authenticated Routes (Require login)
  DASHBOARD: "dashboard", // User/Partner dashboard (role-based)
  ADMIN: "admin", // Admin dashboard (admin only)
  APPOINTMENTS: "appointments", // User's booking history
  REPORTS: "reports", // Health reports page
  EVENTS: "events", // SilverCircle community events
  PROFILE: "profile", // User profile management

  // Service Booking Flow
  SERVICE_LIST: "service-list", // List of services in a module
  BOOKING: "booking", // Multi-step booking form
  BOOKING_SUCCESS: "booking-success", // Booking confirmation page

  // Static/Informational Routes
  ABOUT: "about", // About Us page
  SERVICES: "services", // Our Services overview
  CONTACT: "contact", // Contact form
  PRIVACY: "privacy", // Privacy Policy
  TERMS: "terms", // Terms of Service
  REFUND: "refund", // Refund Policy
} as const;

/**
 * Route Type Export
 * =================
 * TypeScript type derived from ROUTES object.
 * Ensures type safety when using route strings.
 */
export type Route = (typeof ROUTES)[keyof typeof ROUTES];