import { useState, useEffect, useRef } from 'react';
import { getDominantColorWithCORSFallback } from '../utils/colorExtractor';

interface UseDominantColorOptions {
  /** Whether to extract color immediately or wait for manual trigger */
  immediate?: boolean;
  /** Fallback color to use while loading or on error */
  fallbackColor?: string;
  /** Delay before starting color extraction (useful for performance) */
  delay?: number;
}

interface UseDominantColorReturn {
  /** Extracted dominant color as HEX string */
  color: string;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Manual trigger function for color extraction */
  extractColor: () => Promise<void>;
}

/**
 * React hook for extracting dominant colors from images
 * @param imageUrl - The URL of the image to analyze
 * @param options - Configuration options
 * @returns Object with color, loading state, error, and manual trigger
 */
export function useDominantColor(
  imageUrl: string | null | undefined,
  options: UseDominantColorOptions = {}
): UseDominantColorReturn {
  const {
    immediate = true,
    fallbackColor = '#ffffff',
    delay = 0
  } = options;

  const [color, setColor] = useState<string>(fallbackColor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  const extractColor = async (): Promise<void> => {
    if (!imageUrl) {
      setColor(fallbackColor);
      return;
    }

    // Cancel any pending extraction
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const extractedColor = await getDominantColorWithCORSFallback(imageUrl);
      
      // Check if this request was aborted
      if (!abortControllerRef.current.signal.aborted) {
        setColor(extractedColor);
      }
    } catch (err) {
      if (!abortControllerRef.current.signal.aborted) {
        const error = err instanceof Error ? err : new Error('Failed to extract color');
        setError(error);
        setColor(fallbackColor);
      }
    } finally {
      if (!abortControllerRef.current.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (immediate && imageUrl) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (delay > 0) {
        timeoutRef.current = setTimeout(extractColor, delay);
      } else {
        extractColor();
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [imageUrl, immediate, delay]);

  return {
    color,
    isLoading,
    error,
    extractColor
  };
}

/**
 * Hook for batch processing multiple images with better performance control
 * @param imageUrls - Array of image URLs to process
 * @param options - Configuration options
 * @returns Object with colors map, loading state, and progress
 */
export function useBatchDominantColors(
  imageUrls: string[],
  options: UseDominantColorOptions = {}
): {
  colors: Map<string, string>;
  isLoading: boolean;
  progress: number;
  error: Error | null;
} {
  const { fallbackColor = '#ffffff' } = options;
  const [colors, setColors] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (imageUrls.length === 0) return;

    const processImages = async () => {
      setIsLoading(true);
      setError(null);
      setProgress(0);
      
      const newColors = new Map<string, string>();
      
      try {
        // Process images in small batches for better performance
        const batchSize = 3;
        for (let i = 0; i < imageUrls.length; i += batchSize) {
          const batch = imageUrls.slice(i, i + batchSize);
          
          const batchPromises = batch.map(async (url) => {
            try {
              const color = await getDominantColorWithCORSFallback(url);
              return { url, color };
            } catch {
              return { url, color: fallbackColor };
            }
          });
          
          const batchResults = await Promise.all(batchPromises);
          
          batchResults.forEach(({ url, color }) => {
            newColors.set(url, color);
          });
          
          setColors(new Map(newColors));
          setProgress((i + batch.length) / imageUrls.length * 100);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Batch processing failed'));
      } finally {
        setIsLoading(false);
        setProgress(100);
      }
    };

    processImages();
  }, [imageUrls, fallbackColor]);

  return {
    colors,
    isLoading,
    progress,
    error
  };
}