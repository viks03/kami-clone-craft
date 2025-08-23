import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { imageCache } from '@/utils/imageCache';

interface OptimizedLazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const OptimizedLazyImage = memo(({ src, alt, className = '', placeholder }: OptimizedLazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(() => imageCache.isImageCached(src));
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadImage = useCallback(async () => {
    if (hasError) return;
    
    try {
      await imageCache.loadImage(src);
      setIsLoaded(true);
      setHasError(false);
    } catch {
      setHasError(true);
    }
  }, [src, hasError]);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          loadImage();
          observerRef.current?.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '100px' // Load images 100px before they come into view
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadImage]);

  // If image is already cached, show it immediately
  useEffect(() => {
    if (imageCache.isImageCached(src)) {
      setIsLoaded(true);
      setIsInView(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder */}
      <div
        className={`absolute inset-0 bg-anime-card-bg border border-anime-border transition-opacity duration-500 flex items-center justify-center ${
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {hasError ? (
          <div className="text-anime-text-muted text-sm">Failed to load</div>
        ) : placeholder ? (
          <div className="text-anime-text-muted text-sm">{placeholder}</div>
        ) : (
          <div className="w-8 h-8 border-2 border-anime-primary/30 border-t-anime-primary rounded-full animate-spin" />
        )}
      </div>
      
      {/* Actual Image */}
      {(isInView || isLoaded) && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
});

OptimizedLazyImage.displayName = 'OptimizedLazyImage';