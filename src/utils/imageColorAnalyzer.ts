/**
 * Advanced Image Color Analyzer - Works with external images using multiple techniques
 */

interface ColorPalette {
  dominant: string;
  vibrant: string;
  muted: string;
  lightVibrant: string;
  darkVibrant: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): HSL {
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

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Calculate color vibrancy score
 */
function getVibrancy(rgb: RGB): number {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hsl.s * (1 - Math.abs(hsl.l - 50) / 50);
}

/**
 * Check if color is suitable for text display
 */
function isSuitableForText(rgb: RGB): boolean {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Avoid very light, very dark, or very desaturated colors
  return hsl.l > 20 && hsl.l < 80 && hsl.s > 25;
}

/**
 * Create a proxy image that bypasses CORS
 */
function createProxyImageUrl(originalUrl: string): string {
  // Try multiple proxy services as fallbacks
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`,
    `https://cors-anywhere.herokuapp.com/${originalUrl}`
  ];
  
  return proxies[0]; // Start with the first proxy
}

/**
 * Extract colors using canvas with improved sampling
 */
async function extractColorsWithCanvas(imageUrl: string): Promise<RGB[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    const tryExtraction = (url: string, isProxy: boolean = false) => {
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // Optimize canvas size - smaller for better performance
          const maxSize = 64; // Reduced from 100 for faster processing
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          
          if (aspectRatio > 1) {
            canvas.width = maxSize;
            canvas.height = maxSize / aspectRatio;
          } else {
            canvas.width = maxSize * aspectRatio;
            canvas.height = maxSize;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          const colorFrequency = new Map<string, { rgb: RGB; count: number; positions: number[] }>();
          
          // Smart sampling - focus on center and avoid edges
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const maxDistance = Math.min(canvas.width, canvas.height) / 2;
          
          for (let y = 0; y < canvas.height; y += 2) { // Every 2nd pixel for performance
            for (let x = 0; x < canvas.width; x += 2) {
              const i = (y * canvas.width + x) * 4;
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const alpha = data[i + 3];

              // Skip transparent and extreme colors
              if (alpha < 120) continue;
              
              // Calculate distance from center for weighting
              const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
              const weight = Math.max(0.3, 1 - (distance / maxDistance)); // Center gets more weight
              
              // Skip very dark or very light colors (likely backgrounds)
              const brightness = (r + g + b) / 3;
              if (brightness < 25 || brightness > 230) continue;
              
              // Group similar colors more intelligently
              const colorKey = `${Math.floor(r / 12) * 12}-${Math.floor(g / 12) * 12}-${Math.floor(b / 12) * 12}`;
              
              if (!colorFrequency.has(colorKey)) {
                colorFrequency.set(colorKey, {
                  rgb: { r: Math.floor(r / 12) * 12, g: Math.floor(g / 12) * 12, b: Math.floor(b / 12) * 12 },
                  count: 0,
                  positions: []
                });
              }
              
              const entry = colorFrequency.get(colorKey)!;
              entry.count += weight; // Apply distance weighting
              entry.positions.push(distance);
            }
          }

          // Convert to RGB array, sorted by weighted frequency
          const colors: RGB[] = Array.from(colorFrequency.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 10) // Take top 10 colors only
            .map(entry => entry.rgb);

          resolve(colors);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        if (!isProxy) {
          // Try with proxy
          const proxyUrl = createProxyImageUrl(imageUrl);
          tryExtraction(proxyUrl, true);
        } else {
          reject(new Error('Failed to load image even with proxy'));
        }
      };

      img.src = url;
    };

    // Start with original URL
    tryExtraction(imageUrl);
    
    // Reduced timeout for better performance
    setTimeout(() => {
      reject(new Error('Image loading timeout'));
    }, 2000);
  });
}

/**
 * Analyze URL patterns to predict likely colors (fallback method)
 */
function predictColorFromUrl(imageUrl: string): string {
  const url = imageUrl.toLowerCase();
  
  // Common anime poster color patterns based on URL patterns
  if (url.includes('blue') || url.includes('cyan')) return 'hsl(200 80% 60%)';
  if (url.includes('red') || url.includes('crimson')) return 'hsl(0 75% 55%)';
  if (url.includes('green') || url.includes('emerald')) return 'hsl(120 70% 50%)';
  if (url.includes('purple') || url.includes('violet')) return 'hsl(270 80% 60%)';
  if (url.includes('orange') || url.includes('amber')) return 'hsl(35 85% 55%)';
  if (url.includes('pink') || url.includes('rose')) return 'hsl(330 75% 60%)';
  if (url.includes('gold') || url.includes('yellow')) return 'hsl(45 90% 60%)';
  
  // Default to a vibrant color based on URL hash
  const hash = url.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 70% 55%)`;
}

/**
 * Enhanced color selection with better image representation
 */
function findBestTextColor(colors: RGB[]): RGB | null {
  if (colors.length === 0) return null;

  // Enhanced scoring system that considers multiple factors
  const scoredColors = colors
    .filter(isSuitableForText)
    .map(color => {
      const hsl = rgbToHsl(color.r, color.g, color.b);
      const vibrancy = getVibrancy(color);
      
      // Prefer colors that are:
      // 1. Vibrant (high saturation)
      // 2. Not too dark or light
      // 3. Distinct from common background colors
      const lightnessScore = 1 - Math.abs(hsl.l - 60) / 60; // Prefer ~60% lightness
      const saturationScore = hsl.s / 100; // Higher saturation preferred
      const uniquenessScore = Math.min(hsl.s / 100, 1); // Avoid grayscale
      
      return {
        ...color,
        score: (vibrancy * 0.4) + (lightnessScore * 0.3) + (saturationScore * 0.2) + (uniquenessScore * 0.1)
      };
    })
    .sort((a, b) => b.score - a.score);

  return scoredColors.length > 0 ? scoredColors[0] : 
         colors.length > 0 ? colors[0] : null;
}

/**
 * Convert RGB to HSL string with optimal lightness for text
 */
function rgbToOptimalHslString(rgb: RGB): string {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Ensure good contrast for text on dark backgrounds
  const optimalLightness = Math.max(50, Math.min(75, hsl.l));
  const optimalSaturation = Math.max(60, Math.min(90, hsl.s));
  
  return `${Math.round(hsl.h)} ${Math.round(optimalSaturation)}% ${Math.round(optimalLightness)}%`;
}

/**
 * Main color analysis function with multiple fallback strategies
 */
export async function analyzeImageColor(imageUrl: string): Promise<string> {
  try {
    // Strategy 1: Canvas-based extraction with proxy fallbacks
    const colors = await extractColorsWithCanvas(imageUrl);
    const bestColor = findBestTextColor(colors);
    
    if (bestColor) {
      const hslColor = rgbToOptimalHslString(bestColor);
      return `hsl(${hslColor})`;
    }
  } catch (error) {
    console.warn('Canvas-based color extraction failed:', error);
  }

  try {
    // Strategy 2: URL pattern prediction
    const predictedColor = predictColorFromUrl(imageUrl);
    return predictedColor;
  } catch (error) {
    console.warn('URL pattern prediction failed:', error);
  }

  // Strategy 3: Fallback to design system color
  return 'hsl(var(--anime-primary))';
}

/**
 * Cache for analyzed colors
 */
const colorAnalysisCache = new Map<string, string>();

/**
 * Cached color analysis with memory management
 */
export async function analyzeImageColorCached(imageUrl: string): Promise<string> {
  // Check cache first
  if (colorAnalysisCache.has(imageUrl)) {
    return colorAnalysisCache.get(imageUrl)!;
  }
  
  try {
    const color = await analyzeImageColor(imageUrl);
    
    // Manage cache size (keep only 50 most recent)
    if (colorAnalysisCache.size >= 50) {
      const firstKey = colorAnalysisCache.keys().next().value;
      colorAnalysisCache.delete(firstKey);
    }
    
    colorAnalysisCache.set(imageUrl, color);
    return color;
  } catch (error) {
    console.error('Complete color analysis failure:', error);
    const fallbackColor = 'hsl(var(--anime-primary))';
    colorAnalysisCache.set(imageUrl, fallbackColor);
    return fallbackColor;
  }
}
