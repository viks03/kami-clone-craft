import { useState, useEffect, useCallback } from 'react';

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
 * Advanced color extraction with canvas for better accuracy
 */
async function extractImageColor(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    const timeout = setTimeout(() => {
      reject(new Error('Timeout'));
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Canvas not supported');
        }
        
        // Fixed size for consistent results
        canvas.width = 64;
        canvas.height = 64;
        
        ctx.drawImage(img, 0, 0, 64, 64);
        const imageData = ctx.getImageData(0, 0, 64, 64);
        const data = imageData.data;
        
        // Analyze colors with better algorithm
        const colorFreq: { [key: string]: number } = {};
        
        // Sample every 4th pixel for efficiency
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Skip transparent or extreme colors
          if (a < 128 || (r + g + b) < 100 || (r + g + b) > 600) continue;
          
          // Group similar colors
          const rGroup = Math.floor(r / 20) * 20;
          const gGroup = Math.floor(g / 20) * 20;
          const bGroup = Math.floor(b / 20) * 20;
          
          const colorKey = `${rGroup},${gGroup},${bGroup}`;
          colorFreq[colorKey] = (colorFreq[colorKey] || 0) + 1;
        }
        
        // Find most frequent color
        let dominantColor = '128,128,128';
        let maxCount = 0;
        
        for (const [color, count] of Object.entries(colorFreq)) {
          if (count > maxCount) {
            maxCount = count;
            dominantColor = color;
          }
        }
        
        const [r, g, b] = dominantColor.split(',').map(Number);
        
        // Convert to HSL with smoother saturation
        const hsl = rgbToSmoothHsl(r, g, b);
        resolve(hsl);
        
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Image load failed'));
    };
    
    img.src = imageUrl;
  });
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
  // Make colors smoother and more pleasing
  const saturation = Math.max(30, Math.min(55, s * 80)); // Reduce harsh saturation
  const lightness = Math.max(60, Math.min(75, l * 100 + 20)); // Lighter, more pleasant
  
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
      // Try to extract from image
      const extractedColor = await extractImageColor(url);
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