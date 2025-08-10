/**
 * Simple color extraction using Canvas API with proper CORS handling
 */

/**
 * Convert RGB to HSL with optimization for text readability
 */
function rgbToOptimalHsl(r: number, g: number, b: number): string {
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

  // Optimize for text readability
  const hue = Math.round(h * 360);
  const saturation = Math.max(60, Math.min(85, s * 100));
  const lightness = Math.max(55, Math.min(75, l * 100));
  
  return `${hue} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
}

/**
 * Extract dominant color from image using Canvas
 */
async function extractColorFromCanvas(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    const timeout = setTimeout(() => {
      reject(new Error('Image load timeout'));
    }, 5000);

    img.onload = () => {
      clearTimeout(timeout);
      
      try {
        // Use small canvas for performance
        canvas.width = 50;
        canvas.height = 50;
        
        // Draw and analyze
        ctx.drawImage(img, 0, 0, 50, 50);
        const imageData = ctx.getImageData(0, 0, 50, 50);
        const data = imageData.data;
        
        let r = 0, g = 0, b = 0;
        let pixelCount = 0;
        
        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          pixelCount++;
        }
        
        // Calculate average
        r = Math.round(r / pixelCount);
        g = Math.round(g / pixelCount);
        b = Math.round(b / pixelCount);
        
        const hslColor = rgbToOptimalHsl(r, g, b);
        resolve(`hsl(${hslColor})`);
        
      } catch (error) {
        console.warn('Canvas analysis failed:', error);
        resolve('hsl(var(--anime-primary))');
      }
    };

    img.onerror = () => {
      clearTimeout(timeout);
      console.warn('Failed to load image:', imageUrl);
      resolve('hsl(var(--anime-primary))');
    };

    // Set crossOrigin before setting src
    img.crossOrigin = 'anonymous';
    
    // Add additional headers for better CORS support
    if (imageUrl.includes('cors') || imageUrl.includes('proxy')) {
      // For proxy URLs, don't set crossOrigin
      img.removeAttribute('crossOrigin');
    }
    
    img.src = imageUrl;
  });
}

/**
 * Extract color using a more reliable CORS proxy
 */
export async function extractDominantColor(imageUrl: string): Promise<string> {
  console.log('Extracting color from:', imageUrl);
  
  // Try multiple proxy services for better reliability
  const proxyServices = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`,
    `https://cors-proxy.htmldriven.com/?url=${encodeURIComponent(imageUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`
  ];
  
  // First try direct approach (might work for some images)
  try {
    const color = await extractColorFromCanvas(imageUrl);
    console.log('Direct extraction successful:', color);
    return color;
  } catch (directError) {
    console.warn('Direct extraction failed, trying proxy services...', directError);
  }
  
  // Try each proxy service
  for (const proxyUrl of proxyServices) {
    try {
      const color = await extractColorFromCanvas(proxyUrl);
      console.log('Proxy extraction successful with:', proxyUrl);
      return color;
    } catch (proxyError) {
      console.warn('Proxy failed:', proxyUrl, proxyError);
    }
  }
  
  console.warn('All extraction methods failed, using fallback color');
  return 'hsl(var(--anime-primary))';
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
        console.warn(`Failed to extract color for ${batch[index]}:`, result.reason);
        colorMap.set(batch[index], 'hsl(var(--anime-primary))');
      }
    });
    
    // Small delay between batches
    if (i + batchSize < imageUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return colorMap;
}