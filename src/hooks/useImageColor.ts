import { useState, useEffect } from 'react';
import { extractDominantColorCached } from '../utils/dominantColorExtractor';

interface UseImageColorOptions {
  fallbackColor?: string;
  debounceMs?: number;
}

interface UseImageColorResult {
  color: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for extracting and managing image colors
 */
export function useImageColor(
  imageUrl: string | null,
  options: UseImageColorOptions = {}
): UseImageColorResult {
  const {
    fallbackColor = 'hsl(var(--anime-primary))',
    debounceMs = 100 // Reduced from 300 for faster response
  } = options;

  const [color, setColor] = useState<string>(fallbackColor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setColor(fallbackColor);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Debounce color analysis to avoid too many simultaneous requests
    const timeoutId = setTimeout(async () => {
      try {
        const extractedColor = await extractDominantColorCached(imageUrl);
        setColor(extractedColor);
        setError(null);
      } catch (err) {
        console.warn('Color extraction failed for image:', imageUrl, err);
        setColor(fallbackColor);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [imageUrl, fallbackColor, debounceMs]);

  return { color, isLoading, error };
}