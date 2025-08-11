/**
 * Optimized color extraction system with persistence and reliability
 */

interface ColorData {
  color: string;
  timestamp: number;
}

/**
 * Simple color-to-HSL conversion from RGB values
 */
function rgbToHsl(r: number, g: number, b: number): string {
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
  const saturation = Math.max(35, Math.min(75, s * 100)); // Reduced saturation for smoother colors
  const lightness = Math.max(50, Math.min(70, l * 100)); // Adjusted lightness range
  
  return `${hue} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
}

/**
 * Extract dominant color using enhanced canvas sampling for better accuracy
 */
function extractColorFromCanvas(img: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Use larger canvas for better accuracy
  const size = 150;
  canvas.width = size;
  canvas.height = size;
  
  // Draw image with anti-aliasing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, size, size);
  
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  
  // Enhanced sampling strategy - more points for better accuracy
  const samplePoints: number[][] = [];
  
  // Grid sampling for comprehensive coverage
  for (let y = 0.2; y <= 0.8; y += 0.15) {
    for (let x = 0.2; x <= 0.8; x += 0.15) {
      samplePoints.push([x * size, y * size]);
    }
  }
  
  // Add key focal points
  samplePoints.push(
    [size * 0.5, size * 0.5], // center
    [size * 0.33, size * 0.33], // rule of thirds
    [size * 0.67, size * 0.33],
    [size * 0.33, size * 0.67],
    [size * 0.67, size * 0.67]
  );
  
  const colorCounts: { [key: string]: { count: number; r: number; g: number; b: number } } = {};
  
  samplePoints.forEach(([x, y]) => {
    const index = (Math.floor(y) * size + Math.floor(x)) * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];
    
    // Skip transparent or very dark/light pixels
    if (a < 200 || (r + g + b) < 30 || (r + g + b) > 720) return;
    
    // More precise color grouping for better accuracy
    const rBucket = Math.floor(r / 20) * 20;
    const gBucket = Math.floor(g / 20) * 20;
    const bBucket = Math.floor(b / 20) * 20;
    
    const colorKey = `${rBucket},${gBucket},${bBucket}`;
    
    if (!colorCounts[colorKey]) {
      colorCounts[colorKey] = { count: 0, r: rBucket, g: gBucket, b: bBucket };
    }
    colorCounts[colorKey].count++;
  });
  
  // Find most prominent color with better heuristics
  let dominantColor = { r: 128, g: 128, b: 128 };
  let maxScore = 0;
  
  for (const colorData of Object.values(colorCounts)) {
    // Weight by frequency and vibrancy
    const vibrancy = Math.max(
      Math.abs(colorData.r - colorData.g),
      Math.abs(colorData.g - colorData.b),
      Math.abs(colorData.b - colorData.r)
    );
    const score = colorData.count * (1 + vibrancy / 255);
    
    if (score > maxScore) {
      maxScore = score;
      dominantColor = colorData;
    }
  }
  
  return rgbToHsl(dominantColor.r, dominantColor.g, dominantColor.b);
}

/**
 * Persistent storage for colors using localStorage
 */
class ColorStorage {
  private static readonly STORAGE_KEY = 'anime-colors';
  private static readonly MAX_AGE = 10 * 365 * 24 * 60 * 60 * 1000; // 10 years
  
  static get(url: string): string | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const data: { [key: string]: ColorData } = JSON.parse(stored);

  // More robust URL normalization for consistent caching
      const key = (() => {
        try {
          const cleanUrl = url.split('?')[0].split('#')[0];
          const u = new URL(cleanUrl, window.location.origin);
          // Include image dimensions or format in key for better cache consistency
          return `${u.origin}${u.pathname}`.toLowerCase().replace(/\/+/g, '/');
        } catch {
          return url.split('?')[0].split('#')[0].toLowerCase().replace(/\/+/g, '/');
        }
      })();
      
      const colorData = data[key];
      if (!colorData) return null;
      
      return colorData.color;
    } catch {
      return null;
    }
  }
  
  static set(url: string, color: string): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const data: { [key: string]: ColorData } = stored ? JSON.parse(stored) : {};
      
      // Normalize URL (strip query/hash, lowercase)
      const key = (() => {
        try {
          const u = new URL(url, window.location.origin);
          return `${u.origin}${u.pathname}`.toLowerCase();
        } catch {
          return url.split('?')[0].split('#')[0].toLowerCase();
        }
      })();
      
      data[key] = {
        color,
        timestamp: Date.now()
      };
      
      // Keep only recent colors (max 200 entries)
      const entries = Object.entries(data);
      if (entries.length > 200) {
        const sortedEntries = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        const trimmed = Object.fromEntries(sortedEntries.slice(0, 200));
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmed));
      } else {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      // Ignore storage errors
    }
  }
}

/**
 * Load image with optimized error handling
 */
async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 10000);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Image load failed'));
    };
    
    // Try direct load first
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
}

/**
 * Extract dominant color with caching and fallback
 */
export async function extractDominantColor(imageUrl: string): Promise<string> {
  const fallbackColor = 'hsl(var(--anime-primary))';
  
  // Check cache first (normalized URL)
  const cachedColor = ColorStorage.get(imageUrl);
  if (cachedColor) {
    return `hsl(${cachedColor})`;
  }

  // Deterministic hash-based color as a consistent, instant fallback
  const normalized = (() => {
    try {
      const u = new URL(imageUrl, window.location.origin);
      return `${u.origin}${u.pathname}`.toLowerCase();
    } catch {
      return imageUrl.split('?')[0].split('#')[0].toLowerCase();
    }
  })();

  const hashHsl = (() => {
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      hash = (hash << 5) - hash + normalized.charCodeAt(i);
      hash |= 0;
    }
    const hue = Math.abs(hash) % 360;
    const saturation = 60;
    const lightness = 55;
    return `${hue} ${saturation}% ${lightness}%`;
  })();
  
  try {
    const img = await loadImage(imageUrl);
    const hslColor = extractColorFromCanvas(img);
    const finalColor = `hsl(${hslColor})`;
    
    // Cache the result
    ColorStorage.set(imageUrl, hslColor);
    
    return finalColor;
  } catch (error) {
    console.warn('Color extraction failed for:', imageUrl, error);
    // Cache deterministic hash so future loads are instant and consistent
    ColorStorage.set(imageUrl, hashHsl);
    return `hsl(${hashHsl})`;
  }
}

/**
 * Batch extract colors with optimized performance
 */
export async function extractMultipleColors(imageUrls: string[]): Promise<Map<string, string>> {
  const colorMap = new Map<string, string>();
  const fallbackColor = 'hsl(var(--anime-primary))';
  
  // Check cache for all URLs first
  const urlsToProcess: string[] = [];
  
  for (const url of imageUrls) {
    const cachedColor = ColorStorage.get(url);
    if (cachedColor) {
      colorMap.set(url, `hsl(${cachedColor})`);
    } else {
      urlsToProcess.push(url);
    }
  }
  
  // Process uncached URLs in small batches
  const batchSize = 3;
  for (let i = 0; i < urlsToProcess.length; i += batchSize) {
    const batch = urlsToProcess.slice(i, i + batchSize);
    
    const promises = batch.map(async (url) => {
      try {
        const color = await extractDominantColor(url);
        return { url, color };
      } catch {
        return { url, color: fallbackColor };
      }
    });
    
    const results = await Promise.allSettled(promises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        colorMap.set(result.value.url, result.value.color);
      }
    });
    
    // Small delay between batches to prevent overwhelming
    if (i + batchSize < urlsToProcess.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return colorMap;
}

/**
 * Clear color cache (for debugging)
 */
export function clearColorCache(): void {
  localStorage.removeItem('anime-colors');
}
