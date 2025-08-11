import { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';

export type ColorMap = Record<string, string>;

// Shared instances across the app for caching and performance
const fac = new FastAverageColor();
const colorCache = new Map<string, string>();

/**
 * Batch extract average HEX colors for a list of image URLs.
 * - CORS-safe via crossOrigin: 'anonymous'
 * - In-memory caching for consistency and zero duplicate work
 * - Concurrency-limited batching to keep UI responsive
 */
export function useAverageColors(
  imageUrls: string[],
  fallbackColor: string = '#000000',
  concurrency: number = 5
): ColorMap {
  const [colors, setColors] = useState<ColorMap>({});
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const urls = Array.from(new Set(imageUrls.filter(Boolean)));
    if (urls.length === 0) {
      if (mountedRef.current) setColors({});
      return;
    }

    async function extractColor(url: string): Promise<string> {
      if (colorCache.has(url)) return colorCache.get(url)!;
      try {
        const result = await fac.getColorAsync(url, {
          mode: 'speed',
          crossOrigin: 'anonymous'
        });
        const hex = (result?.hex || fallbackColor).toLowerCase();
        colorCache.set(url, hex);
        return hex;
      } catch (err) {
        console.error(`FAC color extraction failed for ${url}:`, err);
        colorCache.set(url, fallbackColor);
        return fallbackColor;
      }
    }

    let cancelled = false;

    async function processInBatches() {
      let index = 0;
      const batchSize = Math.max(1, Math.floor(concurrency));
      const progressive: ColorMap = {};

      while (index < urls.length && !cancelled) {
        const slice = urls.slice(index, index + batchSize);
        const results = await Promise.allSettled(slice.map(extractColor));

        slice.forEach((url, i) => {
          const r = results[i];
          progressive[url] = r.status === 'fulfilled' ? r.value : fallbackColor;
        });

        index += batchSize;

        // Progressive updates to avoid long delays for large lists
        if (!cancelled && mountedRef.current) {
          setColors(prev => ({ ...prev, ...progressive }));
        }
      }
    }

    processInBatches();

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [imageUrls, fallbackColor, concurrency]);

  return colors;
}

export function clearAverageColorCache() {
  colorCache.clear();
}
