import ColorThief from 'colorthief';

/**
 * Convert RGB to HSL for better color harmony
 */
function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  
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
  const saturation = Math.max(50, Math.min(90, s * 100)); // Ensure good saturation
  const lightness = Math.max(50, Math.min(80, l * 100)); // Ensure good visibility
  
  return `${hue} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
}

/**
 * Simple and direct image loading with CORS support
 */
async function loadImageWithCORS(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Key for CORS images
    
    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 10000);
    
    img.onload = () => {
      clearTimeout(timeout);
      console.log('✅ Image loaded successfully:', imageUrl);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
}

/**
 * Fallback with proxy if direct loading fails
 */
async function loadImageWithProxy(imageUrl: string): Promise<HTMLImageElement> {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Don't set crossOrigin for proxy URLs
    
    const timeout = setTimeout(() => {
      reject(new Error('Proxy image load timeout'));
    }, 10000);
    
    img.onload = () => {
      clearTimeout(timeout);
      console.log('✅ Proxy image loaded successfully');
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Failed to load proxy image'));
    };
    
    img.src = proxyUrl;
  });
}

/**
 * Extract dominant color using ColorThief following ChatGPT's approach
 */
export async function extractDominantColor(imageUrl: string): Promise<string> {
  console.log('🎨 Extracting color from:', imageUrl);
  
  try {
    // First try direct loading with CORS
    let img: HTMLImageElement;
    try {
      img = await loadImageWithCORS(imageUrl);
    } catch (directError) {
      console.warn('❌ Direct loading failed, trying proxy...', directError);
      img = await loadImageWithProxy(imageUrl);
    }
    
    // Extract color using ColorThief
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(img);
    
    // Convert RGB to HSL for better theming
    const hslColor = rgbToHsl(dominantColor[0], dominantColor[1], dominantColor[2]);
    const finalColor = `hsl(${hslColor})`;
    
    console.log('✅ Color extracted successfully:', finalColor);
    return finalColor;
    
  } catch (error) {
    console.warn('❌ All color extraction methods failed:', error);
    return 'hsl(var(--anime-primary))';
  }
}

/**
 * Cache for extracted colors
 */
const colorCache = new Map<string, string>();

/**
 * Cached color extraction
 */
export async function extractDominantColorCached(imageUrl: string): Promise<string> {
  if (colorCache.has(imageUrl)) {
    console.log('📦 Using cached color for:', imageUrl);
    return colorCache.get(imageUrl)!;
  }
  
  const color = await extractDominantColor(imageUrl);
  
  // Manage cache size
  if (colorCache.size >= 50) {
    const firstKey = colorCache.keys().next().value;
    colorCache.delete(firstKey);
  }
  
  colorCache.set(imageUrl, color);
  return color;
}

/**
 * Batch extract colors for multiple images
 */
export async function extractMultipleColors(imageUrls: string[]): Promise<Map<string, string>> {
  console.log('🚀 Batch extracting colors for', imageUrls.length, 'images');
  
  const colorMap = new Map<string, string>();
  
  // Process in smaller batches to avoid overwhelming the browser
  const batchSize = 2;
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
        console.warn(`❌ Failed to extract color for ${batch[index]}:`, result.reason);
        colorMap.set(batch[index], 'hsl(var(--anime-primary))');
      }
    });
    
    // Small delay between batches
    if (i + batchSize < imageUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log('✅ Batch extraction complete');
  return colorMap;
}