/**
 * Style Utility Functions
 * Helper functions for dynamic styling and class composition
 * Optimized for React.js + Vite + Tailwind CSS
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with proper Tailwind CSS merging
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a variant class name based on a variant object
 * @param base - Base classes always applied
 * @param variants - Object of variant options
 * @param selected - Selected variant key
 * @returns Combined class string
 */
export function createVariant<T extends Record<string, string>>(
  base: string,
  variants: T,
  selected: keyof T,
): string {
  return cn(base, variants[selected]);
}

/**
 * Conditionally applies classes based on state
 * @param condition - Boolean condition
 * @param truthyClass - Class to apply when true
 * @param falsyClass - Class to apply when false (optional)
 * @returns Class string based on condition
 */
export function conditionalClass(
  condition: boolean,
  truthyClass: string,
  falsyClass: string = "",
): string {
  return condition ? truthyClass : falsyClass;
}

/**
 * Generates responsive class names
 * @param base - Base class
 * @param sm - Small breakpoint class (optional)
 * @param md - Medium breakpoint class (optional)
 * @param lg - Large breakpoint class (optional)
 * @param xl - Extra large breakpoint class (optional)
 * @returns Responsive class string
 */
export function responsive(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
): string {
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`,
  );
}

/**
 * Creates a focus ring utility class
 * @param color - Ring color (optional, defaults to accent)
 * @returns Focus ring classes
 */
export function focusRing(
  color: string = "ring-accent",
): string {
  return `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:${color}`;
}

/**
 * Creates hover transition classes
 * @param transition - Type of transition (default: 'all')
 * @param duration - Duration class (default: 'duration-200')
 * @returns Transition classes
 */
export function hoverTransition(
  transition: string = "all",
  duration: string = "duration-200",
): string {
  return `transition-${transition} ${duration} ease-in-out`;
}

/**
 * Truncates text with ellipsis
 * @param lines - Number of lines before truncation (default: 1)
 * @returns Truncation classes
 */
export function truncate(lines: number = 1): string {
  if (lines === 1) {
    return "truncate";
  }
  return `line-clamp-${lines}`;
}

/**
 * Creates gradient background classes
 * @param from - Starting color
 * @param to - Ending color
 * @param direction - Gradient direction (default: 'to-r')
 * @returns Gradient classes
 */
export function gradient(
  from: string,
  to: string,
  direction: string = "to-r",
): string {
  return `bg-gradient-${direction} from-${from} to-${to}`;
}

/**
 * Applies shadow elevation
 * @param level - Shadow size (sm, md, lg, xl, 2xl)
 * @returns Shadow class
 */
export function shadow(
  level: "sm" | "md" | "lg" | "xl" | "2xl" = "md",
): string {
  return `shadow-${level}`;
}

/**
 * Creates rounded corner classes
 * @param size - Border radius size
 * @returns Rounded classes
 */
export function rounded(
  size:
    | "none"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "full" = "md",
): string {
  return `rounded-${size}`;
}

/**
 * Applies flexbox utilities
 * @param direction - Flex direction
 * @param align - Align items
 * @param justify - Justify content
 * @param gap - Gap between items (optional)
 * @returns Flex utility classes
 */
export function flex(
  direction: "row" | "col" = "row",
  align: "start" | "center" | "end" | "stretch" = "center",
  justify:
    | "start"
    | "center"
    | "end"
    | "between"
    | "around" = "start",
  gap?: string,
): string {
  return cn(
    "flex",
    `flex-${direction}`,
    `items-${align}`,
    `justify-${justify}`,
    gap && `gap-${gap}`,
  );
}

/**
 * Applies grid utilities
 * @param cols - Number of columns
 * @param gap - Gap between items (optional)
 * @param rows - Number of rows (optional)
 * @returns Grid utility classes
 */
export function grid(
  cols: number,
  gap?: string,
  rows?: number,
): string {
  return cn(
    "grid",
    `grid-cols-${cols}`,
    gap && `gap-${gap}`,
    rows && `grid-rows-${rows}`,
  );
}

/**
 * Creates accessible button classes
 * @param variant - Button variant
 * @param size - Button size
 * @returns Button classes
 */
export function button(
  variant:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost" = "primary",
  size: "sm" | "md" | "lg" | "xl" = "md",
): string {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent:
      "bg-accent text-accent-foreground hover:bg-accent/90",
    outline:
      "border-2 border-border bg-transparent hover:bg-muted",
    ghost: "bg-transparent hover:bg-muted",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-4 text-base rounded-lg",
    lg: "h-12 px-6 text-lg rounded-lg",
    xl: "h-14 px-8 text-xl rounded-xl",
  };

  return cn(baseClasses, variants[variant], sizes[size]);
}

/**
 * Creates accessible input classes
 * @param size - Input size
 * @param hasError - Error state
 * @returns Input classes
 */
export function input(
  size: "sm" | "md" | "lg" = "md",
  hasError: boolean = false,
): string {
  const baseClasses =
    "flex w-full bg-input-background border border-input-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

  const sizes = {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  };

  const errorClass = hasError
    ? "border-destructive focus-visible:ring-destructive"
    : "";

  return cn(baseClasses, sizes[size], errorClass);
}

/**
 * Creates card classes
 * @param variant - Card variant
 * @param interactive - Whether card is interactive
 * @returns Card classes
 */
export function card(
  variant:
    | "default"
    | "elevated"
    | "outline"
    | "ghost" = "default",
  interactive: boolean = false,
): string {
  const baseClasses = "rounded-lg p-6";

  const variants = {
    default: "bg-card border border-border shadow-sm",
    elevated: "bg-card border border-border shadow-lg",
    outline: "bg-transparent border-2 border-border",
    ghost: "bg-muted/50 border-0",
  };

  const interactiveClasses = interactive
    ? "cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    : "";

  return cn(baseClasses, variants[variant], interactiveClasses);
}

/**
 * Creates badge classes
 * @param variant - Badge variant
 * @param size - Badge size
 * @returns Badge classes
 */
export function badge(
  variant:
    | "default"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "outline" = "default",
  size: "sm" | "md" | "lg" = "md",
): string {
  const baseClasses =
    "inline-flex items-center font-medium rounded-full";

  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    error: "bg-destructive text-destructive-foreground",
    outline:
      "border border-border text-foreground bg-transparent",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return cn(baseClasses, variants[variant], sizes[size]);
}

/**
 * Screen reader only (accessible but hidden)
 * @returns SR-only classes
 */
export function srOnly(): string {
  return "sr-only";
}

/**
 * Creates container classes with responsive padding
 * @param size - Container max-width
 * @returns Container classes
 */
export function container(
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "full" = "2xl",
): string {
  return cn(
    "mx-auto w-full px-4 sm:px-6 lg:px-8",
    size !== "full" && `max-w-${size}`,
  );
}

/**
 * Applies aspect ratio
 * @param ratio - Aspect ratio (e.g., '16/9', '4/3', 'square')
 * @returns Aspect ratio classes
 */
export function aspectRatio(ratio: string): string {
  return `aspect-${ratio}`;
}

/**
 * Creates loading skeleton classes
 * @returns Skeleton animation classes
 */
export function skeleton(): string {
  return "animate-pulse bg-muted rounded-md";
}

/**
 * Type-safe status color mapping
 * @param status - Status value
 * @returns Tailwind color class
 */
export function statusColor(
  status:
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled"
    | "inProgress",
): string {
  const colors = {
    pending: "bg-warning text-warning-foreground",
    confirmed: "bg-info text-info-foreground",
    completed: "bg-success text-success-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
    inProgress: "bg-info text-info-foreground",
  };

  return colors[status];
}

/**
 * Service color mapping
 * @param service - Service name
 * @returns Tailwind color class
 */
export function serviceColor(
  service:
    | "CareNest"
    | "NutriScan"
    | "MealAura"
    | "RejuvaFit"
    | "BlissTouch"
    | "SilverCircle",
): string {
  const colors = {
    CareNest: "bg-[#2C3E50] text-white",
    NutriScan: "bg-[#2ECC71] text-white",
    MealAura: "bg-[#F39C12] text-white",
    RejuvaFit: "bg-[#3498db] text-white",
    BlissTouch: "bg-[#9b59b6] text-white",
    SilverCircle: "bg-[#e74c3c] text-white",
  };

  return colors[service];
}