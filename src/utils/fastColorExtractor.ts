/**
 * Fast color extraction optimized for carousel - pre-processes all images
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Simple RGB to HSL conversion
 */
function fastRgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
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
  return [h * 360, s * 100, l * 100];
}

/**
 * Ultra-fast dominant color extraction using tiny canvas
 */
function extractDominantColorFast(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // Extremely fast timeout
    const timeout = setTimeout(() => {
      resolve('hsl(var(--anime-primary))');
    }, 800);
    
    img.onload = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve('hsl(var(--anime-primary))');
          return;
        }

        // Tiny canvas for maximum speed
        canvas.width = 32;
        canvas.height = 32;
        
        ctx.drawImage(img, 0, 0, 32, 32);
        const data = ctx.getImageData(0, 0, 32, 32).data;
        
        // Count colors in center area only (avoid edges)
        const colorCounts = new Map<string, number>();
        const centerStart = 8, centerEnd = 24; // Focus on center 16x16 area
        
        for (let y = centerStart; y < centerEnd; y += 2) {
          for (let x = centerStart; x < centerEnd; x += 2) {
            const i = (y * 32 + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            
            if (a < 100) continue;
            
            // Skip very dark/light colors
            const brightness = (r + g + b) / 3;
            if (brightness < 40 || brightness > 215) continue;
            
            // Group colors loosely for speed
            const key = `${Math.floor(r/20)*20}_${Math.floor(g/20)*20}_${Math.floor(b/20)*20}`;
            colorCounts.set(key, (colorCounts.get(key) || 0) + 1);
          }
        }
        
        if (colorCounts.size === 0) {
          resolve('hsl(var(--anime-primary))');
          return;
        }
        
        // Get most frequent color
        const [dominantKey] = Array.from(colorCounts.entries())
          .sort(([,a], [,b]) => b - a)[0];
        
        const [r, g, b] = dominantKey.split('_').map(Number);
        const [h, s, l] = fastRgbToHsl(r, g, b);
        
        // Ensure good readability
        const adjustedS = Math.max(65, Math.min(90, s));
        const adjustedL = Math.max(55, Math.min(75, l));
        
        resolve(`hsl(${Math.round(h)} ${Math.round(adjustedS)}% ${Math.round(adjustedL)}%)`);
        
      } catch (error) {
        resolve('hsl(var(--anime-primary))');
      }
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve('hsl(var(--anime-primary))');
    };
    
    img.src = imageUrl;
  });
}

/**
 * Batch color extraction for carousel - processes all images upfront
 */
export async function extractCarouselColors(imageUrls: string[]): Promise<Map<string, string>> {
  const colorMap = new Map<string, string>();
  
  // Process up to 3 images simultaneously for speed
  const batchSize = 3;
  for (let i = 0; i < imageUrls.length; i += batchSize) {
    const batch = imageUrls.slice(i, i + batchSize);
    const promises = batch.map(async (url) => {
      const color = await extractDominantColorFast(url);
      return [url, color] as const;
    });
    
    const results = await Promise.all(promises);
    results.forEach(([url, color]) => {
      colorMap.set(url, color);
    });
  }
  
  return colorMap;
}

/**
 * Get cached color or fallback immediately
 */
export function getCarouselColor(colorMap: Map<string, string>, imageUrl: string): string {
  return colorMap.get(imageUrl) || 'hsl(var(--anime-primary))';
}