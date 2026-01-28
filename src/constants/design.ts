/**
 * Design System Constants - Parents Luxuria
 * Centralized design tokens for consistent styling
 * Optimized for React.js + Vite + Tailwind CSS
 */

/**
 * BRAND COLORS
 * Official Parents Luxuria color palette
 */
export const BRAND_COLORS = {
  primary: "#2C3E50", // Dark Slate
  secondary: "#2ECC71", // Emerald Green
  accent: "#F39C12", // Orange
  neutral: "#ECF0F1", // Light Gray
  text: "#34495E", // Charcoal
} as const;

/**
 * SEMANTIC COLORS
 * Context-based color tokens
 */
export const SEMANTIC_COLORS = {
  success: "#2ECC71",
  warning: "#F39C12",
  error: "#e74c3c",
  info: "#3498db",
} as const;

/**
 * SPACING SCALE
 * Consistent spacing system (in rem)
 */
export const SPACING = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  "4xl": "6rem", // 96px
  "5xl": "8rem", // 128px
} as const;

/**
 * BORDER RADIUS
 * Consistent rounding scale
 */
export const RADIUS = {
  none: "0",
  sm: "0.225rem", // ~4px
  md: "0.425rem", // ~7px
  lg: "0.625rem", // 10px
  xl: "0.825rem", // ~13px
  "2xl": "1.225rem", // ~20px
  full: "9999px",
} as const;

/**
 * SHADOWS
 * Elevation system for depth
 */
export const SHADOWS = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
} as const;

/**
 * TYPOGRAPHY
 * Font sizes optimized for seniors (18px base)
 */
export const FONT_SIZES = {
  xs: "0.75rem", // 13.5px
  sm: "0.875rem", // 15.75px
  base: "1rem", // 18px
  lg: "1.125rem", // 20.25px
  xl: "1.25rem", // 22.5px
  "2xl": "1.5rem", // 27px
  "3xl": "1.875rem", // 33.75px
  "4xl": "2.25rem", // 40.5px
  "5xl": "3rem", // 54px
} as const;

/**
 * FONT WEIGHTS
 */
export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * LINE HEIGHTS
 * Optimized for readability
 */
export const LINE_HEIGHTS = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

/**
 * BREAKPOINTS
 * Mobile-first responsive design
 */
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Z-INDEX LAYERS
 * Stacking context management
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * TRANSITIONS
 * Animation timing functions
 */
export const TRANSITIONS = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

/**
 * GRADIENTS
 * Reusable gradient patterns
 */
export const GRADIENTS = {
  primary: "linear-gradient(135deg, #2C3E50 0%, #2ECC71 100%)",
  accent: "linear-gradient(135deg, #F39C12 0%, #2ECC71 100%)",
  muted: "linear-gradient(180deg, #ECF0F1 0%, #ffffff 100%)",
  hero: "linear-gradient(to right, #2C3E50, #2ECC71)",
} as const;

/**
 * CONTAINER WIDTHS
 * Max-width constraints for content
 */
export const CONTAINER = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  full: "100%",
} as const;

/**
 * ICON SIZES
 * Standard icon dimensions
 */
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

/**
 * BUTTON SIZES
 * Predefined button dimensions
 */
export const BUTTON_SIZES = {
  sm: {
    height: "2rem",
    padding: "0.5rem 1rem",
    fontSize: FONT_SIZES.sm,
  },
  md: {
    height: "2.5rem",
    padding: "0.625rem 1.25rem",
    fontSize: FONT_SIZES.base,
  },
  lg: {
    height: "3rem",
    padding: "0.75rem 1.5rem",
    fontSize: FONT_SIZES.lg,
  },
  xl: {
    height: "3.5rem",
    padding: "1rem 2rem",
    fontSize: FONT_SIZES.xl,
  },
} as const;

/**
 * INPUT SIZES
 * Form element dimensions
 */
export const INPUT_SIZES = {
  sm: {
    height: "2rem",
    padding: "0.5rem 0.75rem",
    fontSize: FONT_SIZES.sm,
  },
  md: {
    height: "2.5rem",
    padding: "0.625rem 1rem",
    fontSize: FONT_SIZES.base,
  },
  lg: {
    height: "3rem",
    padding: "0.75rem 1.25rem",
    fontSize: FONT_SIZES.lg,
  },
} as const;

/**
 * CARD VARIANTS
 * Pre-configured card styles
 */
export const CARD_VARIANTS = {
  default: "bg-card border border-border shadow-sm",
  elevated: "bg-card border border-border shadow-lg",
  outline: "bg-transparent border-2 border-border",
  ghost: "bg-muted/50 border-0",
} as const;

/**
 * BADGE VARIANTS
 * Status and category indicators
 */
export const BADGE_VARIANTS = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-destructive text-destructive-foreground",
  outline:
    "border border-border text-foreground bg-transparent",
} as const;

/**
 * ACCESSIBILITY
 * WCAG 2.1 AA compliance helpers
 */
export const ACCESSIBILITY = {
  minContrastRatio: 4.5,
  largeTextContrastRatio: 3,
  focusRingWidth: "2px",
  focusRingOffset: "2px",
  minTouchTarget: "44px",
} as const;

/**
 * ANIMATION PRESETS
 * Common animation configurations
 */
export const ANIMATIONS = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scaleIn: "animate-scale-in",
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
} as const;

/**
 * SERVICE CATEGORIES
 * Color coding for different services
 */
export const SERVICE_COLORS = {
  CareNest: BRAND_COLORS.primary,
  NutriScan: BRAND_COLORS.secondary,
  MealAura: BRAND_COLORS.accent,
  RejuvaFit: "#3498db",
  BlissTouch: "#9b59b6",
  SilverCircle: "#e74c3c",
} as const;

/**
 * STATUS COLORS
 * Booking and appointment states
 */
export const STATUS_COLORS = {
  pending: SEMANTIC_COLORS.warning,
  confirmed: SEMANTIC_COLORS.info,
  completed: SEMANTIC_COLORS.success,
  cancelled: SEMANTIC_COLORS.error,
  inProgress: "#3498db",
} as const;

/**
 * TYPE EXPORTS
 * TypeScript type helpers
 */
export type BrandColor =
  (typeof BRAND_COLORS)[keyof typeof BRAND_COLORS];
export type SemanticColor =
  (typeof SEMANTIC_COLORS)[keyof typeof SEMANTIC_COLORS];
export type Spacing = (typeof SPACING)[keyof typeof SPACING];
export type Radius = (typeof RADIUS)[keyof typeof RADIUS];
export type Shadow = (typeof SHADOWS)[keyof typeof SHADOWS];
export type FontSize =
  (typeof FONT_SIZES)[keyof typeof FONT_SIZES];
export type FontWeight =
  (typeof FONT_WEIGHTS)[keyof typeof FONT_WEIGHTS];
export type LineHeight =
  (typeof LINE_HEIGHTS)[keyof typeof LINE_HEIGHTS];
export type Breakpoint =
  (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
export type ZIndex = (typeof Z_INDEX)[keyof typeof Z_INDEX];
export type Transition =
  (typeof TRANSITIONS)[keyof typeof TRANSITIONS];
export type ServiceColor =
  (typeof SERVICE_COLORS)[keyof typeof SERVICE_COLORS];
export type StatusColor =
  (typeof STATUS_COLORS)[keyof typeof STATUS_COLORS];