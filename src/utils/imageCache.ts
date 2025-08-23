// Image cache utility for better performance and preventing re-loading
class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();
  
  private createImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async loadImage(src: string): Promise<HTMLImageElement> {
    // Return cached image if available
    const cached = this.cache.get(src);
    if (cached) {
      return cached;
    }

    // Return existing loading promise if in progress
    const loadingPromise = this.loadingPromises.get(src);
    if (loadingPromise) {
      return loadingPromise;
    }

    // Create new loading promise
    const promise = this.createImage(src).then(img => {
      this.cache.set(src, img);
      this.loadingPromises.delete(src);
      return img;
    }).catch(error => {
      this.loadingPromises.delete(src);
      throw error;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  isImageCached(src: string): boolean {
    return this.cache.has(src);
  }

  preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(sources.map(src => this.loadImage(src)));
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  clearCache(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }

  // Remove old entries to prevent memory leaks
  cleanupCache(maxSize: number = 100): void {
    if (this.cache.size > maxSize) {
      const entries = Array.from(this.cache.entries());
      const toRemove = entries.slice(0, entries.length - maxSize);
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }
}

export const imageCache = new ImageCache();