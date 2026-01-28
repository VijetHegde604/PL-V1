import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  optimizeImageUrl,
  generateSrcSet,
} from "../../constants/images";
import { memo } from "react";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Optimized Image Component
 *
 * Features:
 * - Automatic WebP conversion for Unsplash images
 * - Responsive srcset generation
 * - Lazy loading by default
 * - Fallback handling
 * - Memoized for performance
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) {
  // Handle undefined or empty src
  if (!src) {
    return (
      <ImageWithFallback
        src=""
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  const optimizedSrc = optimizeImageUrl(src, width, height);
  const srcSet = generateSrcSet(src);

  return (
    <ImageWithFallback
      src={optimizedSrc || src}
      alt={alt}
      srcSet={srcSet || undefined}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={className}
      {...props}
    />
  );
});