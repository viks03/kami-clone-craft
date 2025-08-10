/**
 * Color extraction using fast-average-color library - much simpler and more reliable
 */

import { FastAverageColor } from 'fast-average-color';

const fac = new FastAverageColor();

/**
 * Convert RGB string to optimal HSL for text readability
 */
function optimizeColorForText(rgbString: string): string {
  // Extract RGB values from string like "rgb(255, 0, 0)"
  const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return 'hsl(var(--anime-primary))';
  
  const r = parseInt(match[1]) / 255;
  const g = parseInt(match[2]) / 255;
  const b = parseInt(match[3]) / 255;
  
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

  // Optimize for text readability on dark backgrounds
  const hue = Math.round(h * 360);
  const saturation = Math.max(65, Math.min(90, s * 100)); // Ensure vibrant
  const lightness = Math.max(55, Math.min(75, l * 100)); // Ensure readable
  
  return `${hue} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
}

/**
 * Extract dominant color from image URL
 */
export async function extractDominantColor(imageUrl: string): Promise<string> {
  try {
    console.log('Extracting color from:', imageUrl);
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Create a promise to handle image loading
    const imageLoaded = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      
      // Timeout after 3 seconds
      setTimeout(() => reject(new Error('Image load timeout')), 3000);
    });
    
    img.src = imageUrl;
    await imageLoaded;
    
    // Get the dominant color
    const color = fac.getColor(img);
    console.log('Fast-average-color result:', color);
    
    if (color && color.rgb) {
      const hslColor = optimizeColorForText(color.rgb);
      console.log('Optimized HSL color:', hslColor);
      return `hsl(${hslColor})`;
    }
    
    console.log('No color found, using fallback');
    return 'hsl(var(--anime-primary))';
    
  } catch (error) {
    console.error('Color extraction failed:', error);
    return 'hsl(var(--anime-primary))';
  }
}

/**
 * Cache for extracted colors
 */
const colorCache = new Map<string, string>();

/**
 * Cached color extraction with memory management
 */
export async function extractDominantColorCached(imageUrl: string): Promise<string> {
  if (colorCache.has(imageUrl)) {
    return colorCache.get(imageUrl)!;
  }
  
  const color = await extractDominantColor(imageUrl);
  
  // Manage cache size (keep only 100 most recent)
  if (colorCache.size >= 100) {
    const firstKey = colorCache.keys().next().value;
    colorCache.delete(firstKey);
  }
  
  colorCache.set(imageUrl, color);
  return color;
}

/**
 * Batch extract colors for multiple images (for carousel)
 */
export async function extractMultipleColors(imageUrls: string[]): Promise<Map<string, string>> {
  const colorMap = new Map<string, string>();
  
  // Process in batches of 3 for optimal performance
  const batchSize = 3;
  for (let i = 0; i < imageUrls.length; i += batchSize) {
    const batch = imageUrls.slice(i, i + batchSize);
    const promises = batch.map(async (url) => {
      const color = await extractDominantColorCached(url);
      return [url, color] as const;
    });
    
    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const [url, color] = result.value;
        colorMap.set(url, color);
      } else {
        // Fallback for failed extractions
        console.warn(`Failed to extract color for ${batch[index]}:`, result.reason);
        colorMap.set(batch[index], 'hsl(var(--anime-primary))');
      }
    });
  }
  
  return colorMap;
}
