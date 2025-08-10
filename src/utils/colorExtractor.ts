/**
 * Color extraction utility that analyzes images and extracts dominant colors
 */

interface ColorAnalysis {
  dominant: string;
  vibrant: string;
  muted: string;
  brightness: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
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

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Calculate color brightness (perceived luminance)
 */
function getBrightness(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/**
 * Calculate color saturation
 */
function getSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  if (max === 0) return 0;
  return (max - min) / max;
}

/**
 * Check if color is suitable for text (not too light, has good saturation)
 */
function isGoodTextColor(rgb: RGB): boolean {
  const brightness = getBrightness(rgb.r, rgb.g, rgb.b);
  const saturation = getSaturation(rgb.r, rgb.g, rgb.b);
  
  // Avoid very light colors and very desaturated colors
  return brightness < 0.85 && saturation > 0.2;
}

/**
 * Extract color palette from image using canvas sampling
 */
function extractColorsFromImage(imageElement: HTMLImageElement): Promise<RGB[]> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Resize canvas for performance (smaller sampling)
      const maxDimension = 150;
      const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
      
      if (aspectRatio > 1) {
        canvas.width = maxDimension;
        canvas.height = maxDimension / aspectRatio;
      } else {
        canvas.width = maxDimension * aspectRatio;
        canvas.height = maxDimension;
      }

      ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colors: RGB[] = [];
      const colorMap = new Map<string, number>();

      // Sample every 4th pixel to reduce processing
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        // Skip transparent pixels and very dark/light pixels
        if (alpha < 125 || (r < 30 && g < 30 && b < 30) || (r > 240 && g > 240 && b > 240)) {
          continue;
        }

        // Group similar colors to reduce noise
        const colorKey = `${Math.floor(r / 10) * 10}-${Math.floor(g / 10) * 10}-${Math.floor(b / 10) * 10}`;
        colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
      }

      // Convert to RGB array with frequency weights
      colorMap.forEach((count, colorKey) => {
        const [r, g, b] = colorKey.split('-').map(Number);
        colors.push({ r, g, b });
      });

      resolve(colors);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Find the most dominant color from a palette
 */
function findDominantColor(colors: RGB[]): RGB | null {
  if (colors.length === 0) return null;

  // Score colors based on saturation and avoid extremes
  const scoredColors = colors
    .filter(isGoodTextColor)
    .map(color => ({
      ...color,
      score: getSaturation(color.r, color.g, color.b) * (1 - Math.abs(getBrightness(color.r, color.g, color.b) - 0.5))
    }))
    .sort((a, b) => b.score - a.score);

  return scoredColors.length > 0 ? scoredColors[0] : colors[0];
}

/**
 * Convert RGB to CSS HSL string
 */
function rgbToHslString(rgb: RGB): string {
  const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return `${h} ${s}% ${Math.max(45, Math.min(75, l))}%`; // Ensure good readability
}

/**
 * Main function to analyze image and extract the best color for text
 */
export async function extractImageColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    
    // Try to enable CORS for external images
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      try {
        const colors = await extractColorsFromImage(img);
        const dominantColor = findDominantColor(colors);
        
        if (dominantColor) {
          const hslColor = rgbToHslString(dominantColor);
          resolve(`hsl(${hslColor})`);
        } else {
          // Fallback to anime-primary color from design system
          resolve('hsl(var(--anime-primary))');
        }
      } catch (error) {
        console.warn('Color extraction failed (likely CORS issue):', error);
        // Fallback to anime-primary color from design system
        resolve('hsl(var(--anime-primary))');
      }
    };
    
    img.onerror = () => {
      console.warn('Failed to load image for color extraction');
      // Fallback to anime-primary color from design system
      resolve('hsl(var(--anime-primary))');
    };
    
    // Load the image
    img.src = imageUrl;
    
    // Timeout fallback for slow loading images
    setTimeout(() => {
      resolve('hsl(var(--anime-primary))');
    }, 3000);
  });
}

/**
 * Cache for extracted colors to avoid re-processing
 */
const colorCache = new Map<string, string>();

/**
 * Cached version of color extraction with proper fallback handling
 */
export async function extractImageColorCached(imageUrl: string): Promise<string> {
  if (colorCache.has(imageUrl)) {
    return colorCache.get(imageUrl)!;
  }
  
  try {
    const color = await extractImageColor(imageUrl);
    colorCache.set(imageUrl, color);
    return color;
  } catch (error) {
    console.warn('Color extraction completely failed, using design system fallback');
    const fallbackColor = 'hsl(var(--anime-primary))';
    colorCache.set(imageUrl, fallbackColor);
    return fallbackColor;
  }
}