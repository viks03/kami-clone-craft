/**
 * Deterministic and reliable color extraction system
 * 
 * WHY COLORS WERE CHANGING ON REFRESH:
 * 1. Canvas sampling was inconsistent - different browsers/loads could sample differently
 * 2. URL normalization wasn't robust enough
 * 3. Color quantization was too aggressive, losing important color information
 * 4. No proper deterministic fallback for failed extractions
 * 
 * NEW APPROACH:
 * - Deterministic pixel sampling with fixed coordinates
 * - More robust URL normalization with hash-based consistency
 * - Better color analysis with perceptual weighting
 * - Immediate cache hits with deterministic hash fallbacks
 */

interface ColorData {
  color: string;
  timestamp: number;
  version: string; // Version to invalidate old cached colors if algorithm changes
}

const CACHE_VERSION = 'v2.0';

/**
 * Convert RGB to perceptually-weighted HSL for better color representation
 */
function rgbToPerceptualHsl(r: number, g: number, b: number): string {
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
  
  // Perceptual adjustments for better visual results
  // Reduce saturation for more pleasing, less harsh colors
  const saturation = Math.max(25, Math.min(65, s * 100));
  
  // Adjust lightness based on perceptual brightness
  const perceivedBrightness = 0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b);
  const lightness = Math.max(45, Math.min(75, l * 100 + (perceivedBrightness * 10)));
  
  return `${hue} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
}

/**
 * Deterministic color extraction that always produces the same result
 */
function extractDeterministicColor(img: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Fixed canvas size for consistency
  const size = 100;
  canvas.width = size;
  canvas.height = size;
  
  // Disable anti-aliasing for consistent pixel values
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, 0, 0, size, size);
  
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  
  // Use fixed, deterministic sampling points (no random sampling)
  const fixedSamplePoints: [number, number][] = [];
  
  // Create a deterministic grid of sample points
  for (let y = 10; y < size - 10; y += 15) {
    for (let x = 10; x < size - 10; x += 15) {
      fixedSamplePoints.push([x, y]);
    }
  }
  
  // Color analysis with perceptual weighting
  const colorStats: { [key: string]: { count: number; r: number; g: number; b: number; weight: number } } = {};
  
  fixedSamplePoints.forEach(([x, y]) => {
    const index = (y * size + x) * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];
    
    // Skip transparent or extreme colors
    if (a < 200) return;
    if (r + g + b < 50 || r + g + b > 650) return;
    
    // Perceptual color grouping - more precise than before
    const rGroup = Math.floor(r / 15) * 15;
    const gGroup = Math.floor(g / 15) * 15;
    const bGroup = Math.floor(b / 15) * 15;
    
    const colorKey = `${rGroup},${gGroup},${bGroup}`;
    
    // Calculate perceptual importance/weight of this color
    const saturation = Math.abs(Math.max(r, g, b) - Math.min(r, g, b)) / 255;
    const brightness = (r + g + b) / (3 * 255);
    const weight = saturation * (1 - Math.abs(brightness - 0.5)) + 0.5; // Prefer saturated, mid-brightness colors
    
    if (!colorStats[colorKey]) {
      colorStats[colorKey] = { count: 0, r: rGroup, g: gGroup, b: bGroup, weight: 0 };
    }
    
    colorStats[colorKey].count++;
    colorStats[colorKey].weight += weight;
  });
  
  // Find the most significant color (highest weighted score)
  let bestColor = { r: 128, g: 128, b: 128 };
  let maxScore = 0;
  
  for (const stats of Object.values(colorStats)) {
    const score = stats.count * (stats.weight / stats.count); // Average weight * frequency
    if (score > maxScore) {
      maxScore = score;
      bestColor = { r: stats.r, g: stats.g, b: stats.b };
    }
  }
  
  return rgbToPerceptualHsl(bestColor.r, bestColor.g, bestColor.b);
}

/**
 * Robust URL normalization for consistent caching
 */
function normalizeImageUrl(url: string): string {
  try {
    // Remove all query parameters and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    
    // Handle relative URLs
    const fullUrl = new URL(cleanUrl, window.location.href);
    
    // Normalize the path (remove double slashes, etc.)
    const normalizedPath = fullUrl.pathname.replace(/\/+/g, '/');
    
    return `${fullUrl.protocol}//${fullUrl.host}${normalizedPath}`.toLowerCase();
  } catch {
    // Fallback for malformed URLs
    return url.split('?')[0].split('#')[0].toLowerCase().replace(/\/+/g, '/');
  }
}

/**
 * Generate deterministic hash-based color for consistent fallbacks
 */
function generateHashColor(normalizedUrl: string): string {
  let hash = 0;
  for (let i = 0; i < normalizedUrl.length; i++) {
    const char = normalizedUrl.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Generate pleasing color from hash
  const hue = Math.abs(hash) % 360;
  const saturation = 40 + (Math.abs(hash >> 8) % 30); // 40-70%
  const lightness = 50 + (Math.abs(hash >> 16) % 20); // 50-70%
  
  return `${hue} ${saturation}% ${lightness}%`;
}

/**
 * Enhanced color storage with versioning
 */
class ColorStorage {
  private static readonly STORAGE_KEY = 'anime-colors-v2';
  
  static get(url: string): string | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const data: { [key: string]: ColorData } = JSON.parse(stored);
      const normalizedUrl = normalizeImageUrl(url);
      const colorData = data[normalizedUrl];
      
      // Check version compatibility
      if (!colorData || colorData.version !== CACHE_VERSION) {
        return null;
      }
      
      return colorData.color;
    } catch {
      return null;
    }
  }
  
  static set(url: string, color: string): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const data: { [key: string]: ColorData } = stored ? JSON.parse(stored) : {};
      
      const normalizedUrl = normalizeImageUrl(url);
      
      data[normalizedUrl] = {
        color,
        timestamp: Date.now(),
        version: CACHE_VERSION
      };
      
      // Maintain cache size
      const entries = Object.entries(data);
      if (entries.length > 150) {
        const sortedEntries = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        const trimmed = Object.fromEntries(sortedEntries.slice(0, 150));
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
 * Load image with optimized settings for color extraction
 */
async function loadImageForExtraction(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 8000);
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Image load failed'));
    };
    
    // Optimized loading for color extraction
    img.crossOrigin = 'anonymous';
    img.decoding = 'sync';
    img.src = url;
  });
}

/**
 * Main color extraction function with deterministic results
 */
export async function extractDominantColor(imageUrl: string): Promise<string> {
  const normalizedUrl = normalizeImageUrl(imageUrl);
  
  // Check cache first (instant return for consistent colors)
  const cachedColor = ColorStorage.get(imageUrl);
  if (cachedColor) {
    return `hsl(${cachedColor})`;
  }

  // Generate deterministic hash color as immediate fallback
  const hashColor = generateHashColor(normalizedUrl);
  
  try {
    const img = await loadImageForExtraction(imageUrl);
    const extractedColor = extractDeterministicColor(img);
    const finalColor = `hsl(${extractedColor})`;
    
    // Cache the successful extraction
    ColorStorage.set(imageUrl, extractedColor);
    
    return finalColor;
  } catch (error) {
    console.warn('Color extraction failed for:', imageUrl, error);
    
    // Cache the hash color to ensure consistency on future loads
    ColorStorage.set(imageUrl, hashColor);
    
    return `hsl(${hashColor})`;
  }
}

/**
 * Batch color extraction with improved performance
 */
export async function extractMultipleColors(imageUrls: string[]): Promise<Map<string, string>> {
  const colorMap = new Map<string, string>();
  
  // Process all cached colors first (instant)
  const urlsToProcess: string[] = [];
  
  for (const url of imageUrls) {
    const cachedColor = ColorStorage.get(url);
    if (cachedColor) {
      colorMap.set(url, `hsl(${cachedColor})`);
    } else {
      urlsToProcess.push(url);
    }
  }
  
  // Process uncached URLs with controlled concurrency
  const batchSize = 2; // Reduced for more reliable processing
  for (let i = 0; i < urlsToProcess.length; i += batchSize) {
    const batch = urlsToProcess.slice(i, i + batchSize);
    
    const promises = batch.map(async (url) => {
      try {
        const color = await extractDominantColor(url);
        return { url, color };
      } catch {
        const hashColor = generateHashColor(normalizeImageUrl(url));
        return { url, color: `hsl(${hashColor})` };
      }
    });
    
    const results = await Promise.allSettled(promises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        colorMap.set(result.value.url, result.value.color);
      }
    });
    
    // Brief pause between batches for stability
    if (i + batchSize < urlsToProcess.length) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  return colorMap;
}

/**
 * Clear color cache (for debugging/testing)
 */
export function clearColorCache(): void {
  localStorage.removeItem('anime-colors-v2');
  localStorage.removeItem('anime-colors'); // Clear old cache too
}