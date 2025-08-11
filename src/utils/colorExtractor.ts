// Cache for storing extracted colors to ensure consistency
const colorCache = new Map<string, string>();

interface ColorData {
  hex: string;
  population: number;
  rgb: [number, number, number];
}

/**
 * Extract the most representative dominant color from an image URL
 * Uses advanced color quantization to find the most vibrant/prominent color
 * @param imageUrl - The URL of the image to analyze
 * @returns Promise<string> - HEX color string (e.g., #a83279)
 */
export async function getDominantColor(imageUrl: string): Promise<string> {
  // Check cache first for consistency
  if (colorCache.has(imageUrl)) {
    return colorCache.get(imageUrl)!;
  }

  try {
    const color = await extractDominantColorFromImage(imageUrl);
    colorCache.set(imageUrl, color);
    return color;
  } catch (error) {
    console.warn('Failed to extract color from:', imageUrl, error);
    
    // Fallback color for errors (CORS, network issues, etc.)
    const fallbackColor = '#ffffff';
    colorCache.set(imageUrl, fallbackColor);
    return fallbackColor;
  }
}

/**
 * Extract dominant color with CORS handling and fallback strategies
 * @param imageUrl - The URL of the image to analyze
 * @returns Promise<string> - HEX color string
 */
export async function getDominantColorWithCORSFallback(imageUrl: string): Promise<string> {
  return getDominantColor(imageUrl);
}

/**
 * Advanced color extraction using Canvas and color quantization
 * @param imageUrl - The URL of the image to analyze
 * @returns Promise<string> - HEX color string
 */
async function extractDominantColorFromImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Try different CORS approaches
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // Optimize canvas size for performance while maintaining quality
        const maxSize = 150;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = Math.floor(img.width * scale);
        canvas.height = Math.floor(img.height * scale);
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dominantColor = findDominantColor(imageData.data);
        resolve(dominantColor);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      // If CORS fails, try without crossOrigin (for same-origin images)
      if (img.crossOrigin) {
        img.crossOrigin = '';
        img.src = imageUrl; // Retry
      } else {
        reject(new Error('Failed to load image'));
      }
    };
    
    img.src = imageUrl;
  });
}

/**
 * Find the most dominant color using advanced color quantization
 * @param data - ImageData array
 * @returns string - HEX color string
 */
function findDominantColor(data: Uint8ClampedArray): string {
  const colorMap = new Map<string, ColorData>();
  const pixelStep = 8; // Sample every 8th pixel for performance
  
  // Extract colors and build frequency map
  for (let i = 0; i < data.length; i += 4 * pixelStep) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3];
    
    // Skip transparent pixels
    if (alpha < 128) continue;
    
    // Reduce color precision for better grouping (divide by 8, multiply by 8)
    const rQuant = Math.floor(r / 8) * 8;
    const gQuant = Math.floor(g / 8) * 8;
    const bQuant = Math.floor(b / 8) * 8;
    
    const key = `${rQuant},${gQuant},${bQuant}`;
    
    if (colorMap.has(key)) {
      const existing = colorMap.get(key)!;
      existing.population++;
    } else {
      colorMap.set(key, {
        hex: rgbToHex(rQuant, gQuant, bQuant),
        population: 1,
        rgb: [rQuant, gQuant, bQuant]
      });
    }
  }
  
  if (colorMap.size === 0) {
    return '#ffffff';
  }
  
  // Find the most vibrant color among the most frequent ones
  const sortedColors = Array.from(colorMap.values())
    .sort((a, b) => b.population - a.population)
    .slice(0, 10); // Top 10 most frequent colors
  
  // Calculate vibrancy score for each color
  const vibrantColor = sortedColors.reduce((best, current) => {
    const currentVibrancy = calculateVibrancy(current.rgb);
    const bestVibrancy = best ? calculateVibrancy(best.rgb) : -1;
    
    // Prefer more vibrant colors, but also consider popularity
    const currentScore = currentVibrancy * Math.log(current.population + 1);
    const bestScore = best ? bestVibrancy * Math.log(best.population + 1) : -1;
    
    return currentScore > bestScore ? current : best;
  }, null as ColorData | null);
  
  return vibrantColor?.hex || '#ffffff';
}

/**
 * Calculate color vibrancy (saturation-like metric)
 * @param rgb - RGB values [r, g, b]
 * @returns number - Vibrancy score
 */
function calculateVibrancy([r, g, b]: [number, number, number]): number {
  // Convert to HSV to get saturation
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  if (max === 0) return 0;
  
  const saturation = delta / max;
  const brightness = max / 255;
  
  // Avoid very dark or very light colors
  const brightnessPenalty = brightness < 0.3 || brightness > 0.9 ? 0.5 : 1;
  
  return saturation * brightness * brightnessPenalty;
}

/**
 * Convert RGB values to HEX string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns string - HEX color string
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Batch extract colors for multiple images efficiently
 * @param imageUrls - Array of image URLs
 * @returns Promise<Map<string, string>> - Map of URL to HEX color
 */
export async function batchGetDominantColors(imageUrls: string[]): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  
  // Process in chunks to avoid overwhelming the system
  const chunkSize = 5;
  for (let i = 0; i < imageUrls.length; i += chunkSize) {
    const chunk = imageUrls.slice(i, i + chunkSize);
    
    const promises = chunk.map(async (url) => {
      const color = await getDominantColorWithCORSFallback(url);
      return { url, color };
    });
    
    const chunkResults = await Promise.all(promises);
    chunkResults.forEach(({ url, color }) => {
      results.set(url, color);
    });
  }
  
  return results;
}

/**
 * Clear the color cache (useful for memory management)
 */
export function clearColorCache(): void {
  colorCache.clear();
}

/**
 * Get cache size for monitoring
 */
export function getColorCacheSize(): number {
  return colorCache.size;
}