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
        
        // Ultra high resolution for maximum accuracy
        canvas.width = 200;
        canvas.height = 200;
        
        ctx.drawImage(img, 0, 0, 200, 200);
        const imageData = ctx.getImageData(0, 0, 200, 200);
        const data = imageData.data;
        
        // Advanced color clustering algorithm
        const colorBuckets: { [key: string]: { count: number; totalR: number; totalG: number; totalB: number; weight: number } } = {};
        
        // Sample strategically - focus on center and avoid edges
        const centerX = 100;
        const centerY = 100;
        const maxDistance = 60; // Focus on center area
        
        for (let y = centerY - maxDistance; y <= centerY + maxDistance; y += 2) {
          for (let x = centerX - maxDistance; x <= centerX + maxDistance; x += 2) {
            if (x < 0 || x >= 200 || y < 0 || y >= 200) continue;
            
            const i = (y * 200 + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            // Skip transparent, very dark, or very bright pixels
            if (a < 200 || (r + g + b) < 100 || (r + g + b) > 700) continue;
            
            // Calculate color vibrancy (saturation)
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;
            
            // Skip very desaturated colors (grays)
            if (saturation < 0.15) continue;
            
            // Distance from center for weighting
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const centerWeight = 1 + (1 - distance / maxDistance);
            
            // Vibrancy weight - prefer more colorful pixels
            const vibrancyWeight = 1 + saturation * 2;
            
            // Luminance weight - avoid too dark/bright
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            const luminanceWeight = luminance > 50 && luminance < 200 ? 1.5 : 1;
            
            const totalWeight = centerWeight * vibrancyWeight * luminanceWeight;
            
            // Group into color buckets with tighter grouping
            const rBucket = Math.floor(r / 12) * 12;
            const gBucket = Math.floor(g / 12) * 12;
            const bBucket = Math.floor(b / 12) * 12;
            
            const bucketKey = `${rBucket},${gBucket},${bBucket}`;
            
            if (!colorBuckets[bucketKey]) {
              colorBuckets[bucketKey] = { count: 0, totalR: 0, totalG: 0, totalB: 0, weight: 0 };
            }
            
            colorBuckets[bucketKey].count++;
            colorBuckets[bucketKey].totalR += r;
            colorBuckets[bucketKey].totalG += g;
            colorBuckets[bucketKey].totalB += b;
            colorBuckets[bucketKey].weight += totalWeight;
          }
        }
        
        // Find the most significant color bucket
        let bestBucket: { r: number; g: number; b: number } = { r: 128, g: 128, b: 128 };
        let maxScore = 0;
        
        for (const [bucketKey, bucket] of Object.entries(colorBuckets)) {
          // Score combines frequency and weight
          const score = bucket.weight * Math.log(bucket.count + 1);
          
          if (score > maxScore) {
            maxScore = score;
            // Average the colors in this bucket for smoother result
            bestBucket = {
              r: Math.round(bucket.totalR / bucket.count),
              g: Math.round(bucket.totalG / bucket.count),
              b: Math.round(bucket.totalB / bucket.count)
            };
          }
        }
        
        // Convert to HSL with enhanced smoothing
        const hsl = rgbToSmoothHsl(bestBucket.r, bestBucket.g, bestBucket.b);
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