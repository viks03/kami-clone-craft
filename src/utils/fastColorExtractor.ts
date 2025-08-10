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
 * Create a proxy image URL to bypass CORS
 */
function createProxyUrl(imageUrl: string): string {
  // Try multiple proxy services
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`,
    `https://cors-proxy.htmldriven.com/?url=${encodeURIComponent(imageUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`
  ];
  
  // Return the first proxy (we'll try others if this fails)
  return proxies[0];
}

/**
 * Load image with multiple fallback strategies
 */
async function loadImageWithFallback(imageUrl: string): Promise<HTMLImageElement> {
  const strategies = [
    // Strategy 1: Direct load (might work for some images)
    () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      return { img, src: imageUrl };
    },
    
    // Strategy 2: Proxy with crossOrigin
    () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      return { img, src: createProxyUrl(imageUrl) };
    },
    
    // Strategy 3: Proxy without crossOrigin
    () => {
      const img = new Image();
      return { img, src: createProxyUrl(imageUrl) };
    },
    
    // Strategy 4: Different proxy
    () => {
      const img = new Image();
      const proxyUrl = `https://cors-proxy.htmldriven.com/?url=${encodeURIComponent(imageUrl)}`;
      return { img, src: proxyUrl };
    }
  ];
  
  for (let i = 0; i < strategies.length; i++) {
    try {
      const { img, src } = strategies[i]();
      
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`Strategy ${i + 1} timeout`));
        }, 5000);
        
        img.onload = () => {
          clearTimeout(timeout);
          console.log(`✅ Strategy ${i + 1} worked for:`, imageUrl);
          resolve();
        };
        
        img.onerror = () => {
          clearTimeout(timeout);
          reject(new Error(`Strategy ${i + 1} failed`));
        };
        
        img.src = src;
      });
      
      return img;
    } catch (error) {
      console.warn(`❌ Strategy ${i + 1} failed:`, error);
      if (i === strategies.length - 1) {
        throw new Error('All loading strategies failed');
      }
    }
  }
  
  throw new Error('All loading strategies exhausted');
}

/**
 * Extract dominant color using ColorThief with robust error handling
 */
export async function extractDominantColor(imageUrl: string): Promise<string> {
  console.log('🎨 Extracting color from:', imageUrl);
  
  const colorThief = new ColorThief();
  
  try {
    const img = await loadImageWithFallback(imageUrl);
    
    // Wait for image to be fully loaded
    if (!img.complete) {
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
    }
    
    const result = colorThief.getColor(img);
    
    // Convert to HSL for better theming
    const hslColor = rgbToHsl(result[0], result[1], result[2]);
    const finalColor = `hsl(${hslColor})`;
    
    console.log('✅ Color extracted successfully:', finalColor);
    return finalColor;
    
  } catch (error) {
    console.warn('❌ Color extraction failed:', error);
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