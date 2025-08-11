import { useState, useEffect, useCallback } from 'react';
import { getCarouselColor, getCarouselColors } from '@/utils/carouselColor';

/**
 * Hook API remains identical: { colors, getColor, loading }
 * Internally uses a deterministic, precise extractor dedicated to the Carousel.
 */
export function useCarouselColors(imageUrls: string[]) {
  const [colors, setColors] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);

  const extractColor = useCallback(async (url: string): Promise<string> => {
    return getCarouselColor(url);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!imageUrls || imageUrls.length === 0) return;
    setLoading(true);
    (async () => {
      const map = await getCarouselColors(imageUrls);
      if (!cancelled) {
        setColors(map);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [imageUrls]);

  const getColor = useCallback((url: string): string => {
    return colors.get(url) || 'hsl(0, 0%, 62%)';
  }, [colors]);

  return { colors, getColor, loading };
}
