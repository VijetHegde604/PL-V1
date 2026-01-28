import { useState, useCallback } from "react";
import { toast } from "sonner@2.0.3";
import type { User, UserRole, ServiceType } from "../types";
import { PARTNER_EMAIL_PATTERNS } from "../constants/services";
import { ROUTES } from "../constants/routes";

/**
 * Custom Authentication Hook
 *
 * Manages user authentication state and provides login/register/logout functions.
 *
 * TODO: API Integration Points
 * =============================
 * 1. POST /api/auth/login - Authenticate user credentials
 * 2. POST /api/auth/register - Create new user account
 * 3. POST /api/auth/logout - Invalidate user session
 * 4. GET /api/auth/me - Retrieve current user profile
 * 5. Store JWT tokens in httpOnly cookies or secure storage
 *
 * HARDCODED DATA
 * ==============
 * - Currently using email pattern matching instead of real authentication
 * - Mock user data (name, phone, address) generated on login
 * - No password validation or encryption
 * - No session persistence (lost on page refresh)
 *
 * @returns {Object} Authentication state and methods
 */
export function useAuth() {
  // Local state to store current authenticated user
  // TODO: Replace with context/Redux for global state management
  const [user, setUser] = useState<User | null>(null);

  /**
   * Login Function
   *
   * Authenticates user based on email and password.
   * Currently uses pattern matching for demo purposes.
   *
   * TODO: API Integration
   * =====================
   * Replace this with actual API call:
   * ```
   * const response = await fetch('/api/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ email, password })
   * });
   * const { user, token } = await response.json();
   * localStorage.setItem('token', token); // or use httpOnly cookie
   * setUser(user);
   * ```
   *
   * @param {string} email - User's email address
   * @param {string} password - User's password (currently not validated)
   * @returns {Object} User object and redirect route
   */
  const login = useCallback(
    (email: string, password: string) => {
      // HARDCODED DATA: Determine service type from email pattern
      // TODO: Service type should come from backend user profile
      let serviceType: ServiceType | undefined;

      if (email.includes(PARTNER_EMAIL_PATTERNS.CARENEST)) {
        serviceType = "CareNest";
      } else if (
        email.includes(PARTNER_EMAIL_PATTERNS.NUTRISCAN)
      ) {
        serviceType = "NutriScan";
      } else if (
        email.includes(PARTNER_EMAIL_PATTERNS.MEALAURA)
      ) {
        serviceType = "MealAura";
      } else if (
        email.includes(PARTNER_EMAIL_PATTERNS.REJUVAFIT)
      ) {
        serviceType = "RejuvaFit";
      } else if (
        email.includes(PARTNER_EMAIL_PATTERNS.BLISSTOUCH)
      ) {
        serviceType = "BlissTouch";
      } else if (email.includes("partner")) {
        serviceType = "CareNest"; // Default for generic partner
      }

      // HARDCODED DATA: Determine role from email pattern
      // TODO: Role should be returned from backend authentication
      const role: UserRole = email.includes(
        PARTNER_EMAIL_PATTERNS.ADMIN,
      )
        ? "admin"
        : email.includes("partner")
          ? "partner"
          : "parent";

      // HARDCODED DATA: Mock user object with static data
      // TODO: Replace with actual user data from API response
      const newUser: User = {
        name:
          role === "admin"
            ? "Administrator"
            : role === "partner"
              ? "Service Provider"
              : "Rajesh Kumar", // HARDCODED: Should come from database
        email,
        role,
        phone: "+91 9876543210", // HARDCODED: Should come from user profile
        address: "A-123, Green Park, New Delhi - 110016", // HARDCODED: Should come from user profile
        serviceType,
      };

      // Set user in local state
      // TODO: Store authentication token securely
      setUser(newUser);

      // Show success notification
      toast.success(`Welcome back, ${newUser.name}!`);

      // Return user and redirect route
      return {
        user: newUser,
        redirectTo:
          role === "admin" ? ROUTES.ADMIN : ROUTES.DASHBOARD,
      };
    },
    [],
  );

  /**
   * Register Function
   *
   * Creates a new user account.
   *
   * TODO: API Integration
   * =====================
   * Replace this with actual API call:
   * ```
   * const response = await fetch('/api/auth/register', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ name, email, password, role })
   * });
   * const { user, token } = await response.json();
   * localStorage.setItem('token', token);
   * setUser(user);
   * ```
   *
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's password (currently not hashed)
   * @param {string} role - User role (parent or partner)
   * @returns {Object} User object and redirect route
   */
  const register = useCallback(
    (
      name: string,
      email: string,
      password: string,
      role: "parent" | "partner",
    ) => {
      // HARDCODED DATA: Creating user without backend validation
      // TODO: Send to backend for validation, password hashing, and database storage
      const newUser: User = {
        name,
        email,
        role,
      };

      // Set user in local state
      setUser(newUser);

      // Show success notification
      toast.success(
        `Account created successfully! Welcome, ${name}!`,
      );

      return { user: newUser, redirectTo: ROUTES.DASHBOARD };
    },
    [],
  );

  /**
   * Logout Function
   *
   * Logs out the current user and clears session.
   *
   * TODO: API Integration
   * =====================
   * Replace this with actual API call:
   * ```
   * await fetch('/api/auth/logout', {
   *   method: 'POST',
   *   headers: { 'Authorization': `Bearer ${token}` }
   * });
   * localStorage.removeItem('token');
   * setUser(null);
   * ```
   */
  const logout = useCallback(() => {
    // Clear user from local state
    // TODO: Clear authentication token and invalidate session on backend
    setUser(null);

    // Show info notification
    toast.info("You have been logged out.");
  }, []);

  // Return authentication state and methods
  return {
    user, // Current authenticated user or null
    login, // Function to log in
    register, // Function to register new user
    logout, // Function to log out
    isLoggedIn: !!user, // Boolean indicating if user is logged in
  };
}