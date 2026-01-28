/**
 * Image URLs and Image Utilities - Parents Luxuria
 * =================================================
 *
 * Centralized image management for the application.
 *
 * HARDCODED DATA
 * ==============
 * - HERO_IMAGE: Static Figma import
 * - EVENT_IMAGES: Static Unsplash URLs (all currently point to same image)
 * - ERROR_IMAGE_SRC: Base64 encoded SVG placeholder
 *
 * TODO: API Integration & Production Updates
 * ===========================================
 * 1. Store image URLs in database or CMS
 * 2. Implement image upload functionality for events
 * 3. Use CDN for image delivery (Cloudinary, AWS S3, etc.)
 * 4. Add image compression pipeline
 * 5. Implement lazy loading for all images
 * 6. Add alt text management from CMS
 *
 * Example API Integration:
 * ```
 * // Fetch event images from backend
 * const eventImages = await fetch('/api/events/images');
 *
 * // Upload new image
 * const formData = new FormData();
 * formData.append('image', file);
 * await fetch('/api/events/upload', {
 *   method: 'POST',
 *   body: formData
 * });
 * ```
 */

/**
 * HARDCODED DATA: Hero Image
 * ===========================
 * Main landing page hero image imported from Figma.
 *
 * TODO: Make configurable
 * - Store in CMS for easy updates
 * - Support A/B testing different hero images
 * - Add seasonal variations
 */
export const HERO_IMAGE =
  "figma:asset/3be6acb430bf49414d5658f62c9a730f6b9c70f1.png";

/**
 * HARDCODED DATA: Event Category Images
 * ======================================
 * Static Unsplash URLs for different event categories.
 * Currently all point to the same image (needs updating).
 *
 * TODO: Replace with Dynamic Images
 * ==================================
 * 1. Fetch from backend API: GET /api/events/category-images
 * 2. Allow admin to upload custom images
 * 3. Use actual category-specific images
 * 4. Store images in CDN
 * 5. Add multiple images per category for variety
 */
export const EVENT_IMAGES = {
  DEFAULT:
    "https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjB5b2dhJTIwZml0bmVzc3xlbnwxfHx8fDE3NjIzNjAwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  YOGA: "https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjB5b2dhJTIwZml0bmVzc3xlbnwxfHx8fDE3NjIzNjAwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  MUSIC:
    "https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjB5b2dhJTIwZml0bmVzc3xlbnwxfHx8fDE3NjIzNjAwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ART: "https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjB5b2dhJTIwZml0bmVzc3xlbnwxfHx8fDE3NjIzNjAwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  LITERATURE:
    "https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjB5b2dhJTIwZml0bmVzc3xlbnwxfHx8fDE3NjIzNjAwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  GARDENING:
    "https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVsZGVybHklMjB5b2dhJTIwZml0bmVzc3xlbnwxfHx8fDE3NjIzNjAwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
} as const;

/**
 * HARDCODED DATA: Error Placeholder Image
 * ========================================
 * Base64 encoded SVG shown when image fails to load.
 * This is a simple icon representing a broken image.
 */
export const ERROR_IMAGE_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

/**
 * Utility: Get Event Image by Category
 * =====================================
 * Returns the appropriate image URL for an event category.
 * Falls back to DEFAULT if category not found.
 *
 * @param {string} category - Event category name
 * @returns {string} Image URL
 */
export function getEventImage(category: string): string {
  const categoryKey =
    category.toUpperCase() as keyof typeof EVENT_IMAGES;
  return EVENT_IMAGES[categoryKey] || EVENT_IMAGES.DEFAULT;
}

/**
 * Utility: Optimize Image URL
 * ============================
 * Optimizes Unsplash images by adding size and format parameters.
 * Automatically converts to WebP format for better performance.
 *
 * Features:
 * - Adds width/height parameters
 * - Converts to WebP format (smaller file size)
 * - Sets optimal quality (85)
 *
 * @param {string} url - Original image URL
 * @param {number} width - Target width in pixels (optional)
 * @param {number} height - Target height in pixels (optional)
 * @returns {string} Optimized image URL
 */
export function optimizeImageUrl(
  url: string,
  width?: number,
  height?: number,
): string {
  // Handle undefined, null, or empty URLs
  if (!url || typeof url !== "string") {
    return "";
  }

  // Only optimize Unsplash images
  if (!url.includes("unsplash.com")) {
    return url;
  }

  try {
    const urlObj = new URL(url);

    // Add width parameter if provided
    if (width) {
      urlObj.searchParams.set("w", width.toString());
    }

    // Add height parameter if provided
    if (height) {
      urlObj.searchParams.set("h", height.toString());
    }

    // Always use optimal format and quality
    urlObj.searchParams.set("fm", "webp"); // WebP format (smaller size)
    urlObj.searchParams.set("q", "85"); // 85% quality (good balance)

    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return original
    return url;
  }
}

/**
 * Utility: Generate Responsive Image Srcset
 * ==========================================
 * Creates a srcset string for responsive images.
 * Generates multiple image sizes for different screen densities.
 *
 * Sizes generated: 640w, 750w, 828w, 1080w, 1200w, 1920w
 *
 * Usage in img tag:
 * ```
 * <img
 *   src={optimizeImageUrl(url, 1080)}
 *   srcSet={generateSrcSet(url)}
 *   sizes="(max-width: 768px) 100vw, 1080px"
 * />
 * ```
 *
 * @param {string} baseUrl - Original image URL
 * @returns {string} Srcset string or empty if not Unsplash
 */
export function generateSrcSet(baseUrl: string): string {
  // Handle undefined, null, or empty URLs
  if (!baseUrl || typeof baseUrl !== "string") {
    return "";
  }

  // Only generate srcset for Unsplash images
  if (!baseUrl.includes("unsplash.com")) {
    return "";
  }

  try {
    // Common responsive breakpoint widths
    const sizes = [640, 750, 828, 1080, 1200, 1920];

    // Generate optimized URL for each size
    return sizes
      .map(
        (size) => `${optimizeImageUrl(baseUrl, size)} ${size}w`,
      )
      .join(", ");
  } catch (error) {
    return "";
  }
}