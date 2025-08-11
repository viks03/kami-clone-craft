import { useState, useEffect, useCallback } from 'react';
import { extractColors } from 'extract-colors';

interface CarouselColorCache {
  [url: string]: {
    color: string;
    timestamp: number;
  };
}

const CACHE_KEY = 'carousel-colors-cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Simple deterministic color generator based on URL hash
 * This ensures consistent colors across refreshes
 */
function generateStableColor(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Generate pleasing pastel colors
  const hue = Math.abs(hash) % 360;
  const saturation = 35 + (Math.abs(hash >> 8) % 25); // 35-60%
  const lightness = 65 + (Math.abs(hash >> 16) % 15); // 65-80%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Pixel-perfect color extraction using extract-colors library
 */
async function extractPreciseDominantColor(imageUrl: string): Promise<string> {
  try {
    const colors = await extractColors(imageUrl, {
      crossOrigin: 'anonymous',  // Needed for CORS images
      pixels: 0,                  // 0 = process *all* pixels (maximum accuracy)
      distance: 0,                // 0 = treat each unique RGB as separate (no grouping)
      saturationDistance: 0,      // 0 = no grouping by saturation
      lightnessDistance: 0,       // 0 = no grouping by brightness
      hueDistance: 0,             // 0 = no grouping by hue
      colorValidator: (red, green, blue, alpha = 255) => {
        // Only opaque pixels with good color range
        if (alpha < 250) return false;
        
        // Skip very dark or very bright pixels
        const total = red + green + blue;
        if (total < 100 || total > 700) return false;
        
        // Skip very desaturated colors (grays)
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const saturation = max === 0 ? 0 : (max - min) / max;
        return saturation > 0.15;
      }
    });

    if (!colors || colors.length === 0) {
      throw new Error('No colors extracted');
    }

    // Sort by area (count) so the most frequent color is first
    const dominant = colors.sort((a, b) => b.area - a.area)[0];
    
    // Convert to smooth HSL for better visual appeal
    const hex = dominant.hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return rgbToSmoothHsl(r, g, b);
    
  } catch (error) {
    throw new Error(`Color extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert RGB to smooth HSL for better visual appeal
 */
function rgbToSmoothHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  
  const hue = Math.round(h * 360);
  // Create beautiful, smooth colors that match the image better
  const saturation = Math.max(20, Math.min(40, s * 60 + 15)); // Smoother, more natural
  const lightness = Math.max(50, Math.min(65, l * 85 + 20)); // Perfect readability range
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Cache management
 */
function getFromCache(url: string): string | null {
  try {
    const cache: CarouselColorCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const cached = cache[url];
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.color;
    }
  } catch (error) {
    console.warn('Cache read error:', error);
  }
  return null;
}

function saveToCache(url: string, color: string): void {
  try {
    const cache: CarouselColorCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[url] = {
      color,
      timestamp: Date.now()
    };
    
    // Limit cache size
    const entries = Object.entries(cache);
    if (entries.length > 50) {
      const recent = entries
        .sort((a, b) => b[1].timestamp - a[1].timestamp)
        .slice(0, 50);
      const trimmedCache = Object.fromEntries(recent);
      localStorage.setItem(CACHE_KEY, JSON.stringify(trimmedCache));
    } else {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  } catch (error) {
    console.warn('Cache write error:', error);
  }
}

/**
 * Custom hook for carousel color extraction
 */
export function useCarouselColors(imageUrls: string[]) {
  const [colors, setColors] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(false);
  
  const extractColor = useCallback(async (url: string): Promise<string> => {
    // Check cache first
    const cached = getFromCache(url);
    if (cached) {
      return cached;
    }
    
    try {
      // Try to extract using precise method
      const extractedColor = await extractPreciseDominantColor(url);
      saveToCache(url, extractedColor);
      return extractedColor;
    } catch (error) {
      // Fallback to stable generated color
      const stableColor = generateStableColor(url);
      saveToCache(url, stableColor);
      return stableColor;
    }
  }, []);
  
  useEffect(() => {
    if (imageUrls.length === 0) return;
    
    setLoading(true);
    
    const processColors = async () => {
      const newColors = new Map<string, string>();
      
      // Process each URL
      for (const url of imageUrls) {
        try {
          const color = await extractColor(url);
          newColors.set(url, color);
        } catch (error) {
          // Fallback to stable color
          const fallbackColor = generateStableColor(url);
          newColors.set(url, fallbackColor);
        }
      }
      
      setColors(newColors);
      setLoading(false);
    };
    
    processColors();
  }, [imageUrls, extractColor]);
  
  const getColor = useCallback((url: string): string => {
    return colors.get(url) || generateStableColor(url);
  }, [colors]);
  
  return { colors, getColor, loading };
}