/**
 * Services Configuration - Parents Luxuria
 * ==========================================
 *
 * This file contains static configuration for the 6 core service modules.
 *
 * HARDCODED DATA
 * ==============
 * All service information in this file is hardcoded and static.
 *
 * TODO: API Integration
 * =====================
 * In production, service information should be fetched from backend:
 * GET /api/services - Fetch all available service modules
 *
 * This allows for:
 * - Dynamic service addition/removal
 * - Service availability management
 * - Regional service variations
 * - A/B testing of service descriptions
 * - Multi-language support
 */

import {
  Home,
  Stethoscope,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  Users,
} from "lucide-react";

/**
 * Service Module IDs
 * ==================
 * Unique identifiers for each service module (lowercase for routing).
 * Used throughout the application for navigation and logic.
 */
export const SERVICE_IDS = {
  CARENEST: "carenest", // Home Nursing Services
  NUTRISCAN: "nutriscan", // Health Checkups & Diagnostics
  MEALAURA: "mealaura", // Meal Planning & Nutrition
  REJUVAFIT: "rejuvafit", // Fitness & Physical Therapy
  BLISSTOUCH: "blisstouch", // Grooming & Personal Care
  SILVERCIRCLE: "silvercircle", // Community Events (not a partner service)
} as const;

/**
 * HARDCODED DATA: Service Configuration Array
 * ============================================
 * Contains display information for all service modules shown on landing page.
 *
 * Each service has:
 * - id: Unique identifier (from SERVICE_IDS)
 * - title: Display name
 * - description: Brief description for users
 * - icon: Lucide icon component
 *
 * TODO: API Integration
 * =====================
 * Replace with dynamic data from backend:
 * ```
 * const services = await fetch('/api/services');
 * ```
 *
 * Backend should return array with same structure plus:
 * - availability: boolean (is service active?)
 * - pricing: base pricing information
 * - regions: array of supported regions
 * - imageUrl: service card image
 * - features: array of key features
 */
export const SERVICES = [
  {
    id: SERVICE_IDS.CARENEST,
    title: "CareNest",
    description:
      "Home nursing, elder care, and comprehensive medical support",
    icon: Home,
  },
  {
    id: SERVICE_IDS.NUTRISCAN,
    title: "NutriScan",
    description:
      "Health checkups, doctor consultation, and report management",
    icon: Stethoscope,
  },
  {
    id: SERVICE_IDS.MEALAURA,
    title: "MealAura",
    description:
      "Customized meal planning and healthy food delivery",
    icon: UtensilsCrossed,
  },
  {
    id: SERVICE_IDS.REJUVAFIT,
    title: "RejuvaFit",
    description:
      "Yoga, physiotherapy, and at-home fitness programs",
    icon: Dumbbell,
  },
  {
    id: SERVICE_IDS.BLISSTOUCH,
    title: "BlissTouch",
    description:
      "Professional salon, grooming, and massage services",
    icon: Sparkles,
  },
  {
    id: SERVICE_IDS.SILVERCIRCLE,
    title: "SilverCircle",
    description:
      "Community events, social clubs, and activities for seniors",
    icon: Users,
  },
] as const;

/**
 * HARDCODED DATA: Partner Email Patterns
 * =======================================
 * Used for demo authentication to determine user type from email.
 *
 * Example:
 * - carenest@partner.com → CareNest partner
 * - admin@demo.com → Admin user
 *
 * TODO: Remove in Production
 * ==========================
 * This is only for demo purposes. In production:
 * 1. Remove email pattern matching
 * 2. Use proper authentication with backend
 * 3. Store user type in database
 * 4. Return user role from login API
 */
export const PARTNER_EMAIL_PATTERNS = {
  CARENEST: "carenest",
  NUTRISCAN: "nutriscan",
  MEALAURA: "mealaura",
  REJUVAFIT: "rejuvafit",
  BLISSTOUCH: "blisstouch",
  ADMIN: "admin",
} as const;