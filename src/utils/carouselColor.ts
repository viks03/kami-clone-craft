// Deterministic, precise dominant color extraction for Carousel only
// No external libraries. Exact-color histogram on a nearest-neighbor reduced canvas.

const CACHE_KEY = 'carousel-colors-cache-v2';
const CACHE_VERSION = 1;

type CacheRecord = {
  color: string; // HSL string
  ts: number;
  v: number;
};

type CacheMap = Record<string, CacheRecord>;

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    u.hash = '';
    u.search = '';
    return u.toString();
  } catch {
    return url.split('#')[0].split('?')[0];
  }
}

function hashColorFromUrl(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  const sat = 36 + (Math.abs(hash >> 7) % 18); // 36-54
  const light = 58 + (Math.abs(hash >> 11) % 10); // 58-68
  return `hsl(${hue}, ${sat}%, ${light}%)`;
}

function rgbToPleasantHsl(r: number, g: number, b: number): string {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0; let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  const hue = Math.round(h * 360);
  const saturation = Math.max(22, Math.min(42, s * 62 + 12));
  const lightness = Math.max(52, Math.min(66, l * 80 + 18));
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getCache(): CacheMap {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setCache(map: CacheMap) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch { }
}

function getFromCache(url: string): string | null {
  const n = normalizeUrl(url);
  const map = getCache();
  const rec = map[n];
  if (rec && rec.v === CACHE_VERSION && Date.now() - rec.ts < 1000 * 60 * 60 * 24) {
    return rec.color;
  }
  return null;
}

function saveToCache(url: string, color: string) {
  const n = normalizeUrl(url);
  const map = getCache();
  map[n] = { color, ts: Date.now(), v: CACHE_VERSION };
  const entries = Object.entries(map);
  if (entries.length > 80) {
    const trimmed = Object.fromEntries(
      entries
        .sort((a, b) => (b[1] as CacheRecord).ts - (a[1] as CacheRecord).ts)
        .slice(0, 80)
    ) as CacheMap;
    setCache(trimmed);
  } else {
    setCache(map);
  }
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    (img as any).decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    const to = setTimeout(() => reject(new Error('Image load timeout')), 8000);
    img.onload = () => { clearTimeout(to); resolve(img); };
    img.onerror = () => { clearTimeout(to); reject(new Error('Image load error')); };
    img.src = url;
  });
}

function shouldIgnorePixel(r: number, g: number, b: number, a: number): boolean {
  if (a < 240) return true; // ignore near transparent
  const sum = r + g + b;
  if (sum < 60 || sum > 720) return true; // too dark/bright
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min; // saturation proxy
  return delta < 12; // ignore near-gray
}

function nearestNeighborDraw(ctx: CanvasRenderingContext2D, img: HTMLImageElement, targetW: number, targetH: number) {
  // Disable smoothing to avoid invented colors from interpolation
  // @ts-ignore
  ctx.imageSmoothingEnabled = false;
  // @ts-ignore
  ctx.imageSmoothingQuality = 'low';
  ctx.drawImage(img, 0, 0, targetW, targetH);
}

function extractDominantFromCanvas(ctx: CanvasRenderingContext2D, w: number, h: number): string | null {
  const data = ctx.getImageData(0, 0, w, h).data;
  const counts = new Map<string, number>();
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (shouldIgnorePixel(r, g, b, a)) continue;
    const key = `${r},${g},${b}`; // exact color, no grouping
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  if (counts.size === 0) return null;
  let bestKey = '';
  let bestCount = -1;
  for (const [k, c] of counts) {
    if (c > bestCount) { bestCount = c; bestKey = k; }
  }
  const [r, g, b] = bestKey.split(',').map(Number);
  return rgbToPleasantHsl(r, g, b);
}

export async function getCarouselColor(url: string): Promise<string> {
  const cached = getFromCache(url);
  if (cached) return cached;
  try {
    const img = await loadImage(url);
    // Scale bounding box to max 256 while keeping aspect ratio
    const maxDim = 256;
    const ratio = Math.min(1, maxDim / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
    const w = Math.max(1, Math.floor((img.naturalWidth || img.width) * ratio));
    const h = Math.max(1, Math.floor((img.naturalHeight || img.height) * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unsupported');

    nearestNeighborDraw(ctx, img, w, h);
    const color = extractDominantFromCanvas(ctx, w, h) || hashColorFromUrl(normalizeUrl(url));
    saveToCache(url, color);
    return color;
  } catch {
    const color = hashColorFromUrl(normalizeUrl(url));
    saveToCache(url, color);
    return color;
  }
}

export async function getCarouselColors(urls: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  const toProcess: string[] = [];
  for (const u of urls) {
    const cached = getFromCache(u);
    if (cached) out.set(u, cached); else toProcess.push(u);
  }
  const concurrency = 3;
  let idx = 0;
  async function worker() {
    while (idx < toProcess.length) {
      const my = idx++;
      const url = toProcess[my];
      const color = await getCarouselColor(url);
      out.set(url, color);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, toProcess.length) }, worker));
  return out;
}

export function clearCarouselColorCache() {
  try { localStorage.removeItem(CACHE_KEY); } catch { }
}
