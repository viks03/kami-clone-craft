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
        
        // Higher resolution for better color detection
        canvas.width = 150;
        canvas.height = 150;
        
        ctx.drawImage(img, 0, 0, 150, 150);
        const imageData = ctx.getImageData(0, 0, 150, 150);
        const data = imageData.data;
        
        // Analyze colors with precise algorithm
        const colorFreq: { [key: string]: number } = {};
        const pixelWeights: { [key: string]: number } = {};
        
        // Sample every pixel for maximum precision
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Skip transparent or very dark/bright colors
          if (a < 200 || (r + g + b) < 150 || (r + g + b) > 650) continue;
          
          // Calculate luminance for weighting
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          
          // Group similar colors with smaller grouping for precision
          const rGroup = Math.floor(r / 15) * 15;
          const gGroup = Math.floor(g / 15) * 15;
          const bGroup = Math.floor(b / 15) * 15;
          
          const colorKey = `${rGroup},${gGroup},${bGroup}`;
          
          // Weight colors based on position and luminance
          const pixelIndex = i / 4;
          const totalPixels = data.length / 4;
          const row = Math.floor(pixelIndex / 150);
          const col = pixelIndex % 150;
          
          // Give more weight to center pixels and vibrant colors
          const centerWeight = 1 + Math.max(0, 1 - Math.sqrt(Math.pow(col - 75, 2) + Math.pow(row - 75, 2)) / 75);
          const vibrancyWeight = 1 + (Math.abs(r - g) + Math.abs(g - b) + Math.abs(b - r)) / 255;
          const finalWeight = centerWeight * vibrancyWeight;
          
          colorFreq[colorKey] = (colorFreq[colorKey] || 0) + finalWeight;
          pixelWeights[colorKey] = finalWeight;
        }
        
        // Find most weighted color
        let dominantColor = '128,128,128';
        let maxWeight = 0;
        
        for (const [color, weight] of Object.entries(colorFreq)) {
          if (weight > maxWeight) {
            maxWeight = weight;
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
  // Make colors smoother and more pleasing with better ranges
  const saturation = Math.max(25, Math.min(45, s * 70)); // Even smoother saturation
  const lightness = Math.max(55, Math.min(70, l * 90 + 25)); // Better lightness range
  
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