import { useState, useEffect, useMemo } from 'react';

interface DeviceInfo {
  width: number;
  height: number;
  pixelRatio: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  scaleFactor: number;
  fontScale: number;
  spacingScale: number;
}

// Standard device widths for reference
const DEVICE_BREAKPOINTS = {
  xs: 0,    // < 480px (small phones)
  sm: 480,  // 480px - 640px (phones)
  md: 640,  // 640px - 768px (large phones, small tablets)
  lg: 768,  // 768px - 1024px (tablets, small laptops)
  xl: 1024, // 1024px - 1280px (laptops)
  '2xl': 1280 // > 1280px (large screens)
} as const;

export const useResponsiveLayout = (): DeviceInfo => {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 375,
    height: typeof window !== 'undefined' ? window.innerHeight : 667,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 2
  }));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDimensions = () => {
      // Debounce resize events for performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: window.devicePixelRatio
        });
      }, 100);
    };

    const handleResize = () => updateDimensions();
    const handleOrientationChange = () => {
      // Delay orientation change handling to get accurate dimensions
      setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const deviceInfo = useMemo((): DeviceInfo => {
    const { width, height, pixelRatio } = dimensions;

    // Determine breakpoint
    let breakpoint: DeviceInfo['breakpoint'] = 'xs';
    if (width >= DEVICE_BREAKPOINTS['2xl']) breakpoint = '2xl';
    else if (width >= DEVICE_BREAKPOINTS.xl) breakpoint = 'xl';
    else if (width >= DEVICE_BREAKPOINTS.lg) breakpoint = 'lg';
    else if (width >= DEVICE_BREAKPOINTS.md) breakpoint = 'md';
    else if (width >= DEVICE_BREAKPOINTS.sm) breakpoint = 'sm';

    // Device type detection
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // Calculate dynamic scales based on screen size and pixel ratio
    // Base scale factors for different screen sizes
    const baseScaleFactor = (() => {
      if (width <= 320) return 0.85;      // Very small phones (iPhone SE)
      if (width <= 375) return 0.90;      // Small phones (iPhone 12 mini)
      if (width <= 390) return 0.95;      // Medium phones (iPhone 13/14)
      if (width <= 414) return 1.0;       // Large phones (iPhone Pro Max)
      if (width <= 480) return 1.05;      // Extra large phones
      if (width <= 640) return 1.1;       // Small tablets
      if (width <= 768) return 1.15;      // Medium tablets
      if (width <= 1024) return 1.2;      // Large tablets/small laptops
      return 1.25;                        // Desktop
    })();

    // Adjust for pixel density (Retina displays)
    const pixelRatioAdjustment = Math.min(pixelRatio / 2, 1.2);
    const scaleFactor = baseScaleFactor * pixelRatioAdjustment;

    // Font scaling - more aggressive on smaller screens
    const fontScale = (() => {
      if (width <= 320) return 0.8;       // iPhone SE
      if (width <= 375) return 0.85;      // iPhone 12 mini, 13 mini
      if (width <= 390) return 0.9;       // iPhone 13, 14
      if (width <= 414) return 0.95;      // iPhone Pro Max
      if (width <= 480) return 1.0;       // Large phones
      return 1.0;                         // Tablet and desktop
    })();

    // Spacing scaling - tighter on smaller screens
    const spacingScale = (() => {
      if (width <= 320) return 0.75;      // Very tight spacing
      if (width <= 375) return 0.8;       // Tight spacing
      if (width <= 390) return 0.85;      // Slightly tight
      if (width <= 414) return 0.9;       // Normal-ish
      if (width <= 480) return 0.95;      // Nearly normal
      return 1.0;                         // Normal spacing
    })();

    return {
      width,
      height,
      pixelRatio,
      isMobile,
      isTablet,
      isDesktop,
      breakpoint,
      scaleFactor,
      fontScale,
      spacingScale
    };
  }, [dimensions]);

  return deviceInfo;
};

// Utility function to get responsive values
export const getResponsiveValue = <T>(
  values: Partial<Record<DeviceInfo['breakpoint'], T>>,
  currentBreakpoint: DeviceInfo['breakpoint'],
  fallback: T
): T => {
  const orderedBreakpoints: DeviceInfo['breakpoint'][] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  
  // Try current breakpoint first
  if (values[currentBreakpoint] !== undefined) {
    return values[currentBreakpoint] as T;
  }
  
  // Find the nearest smaller breakpoint with a value
  const currentIndex = orderedBreakpoints.indexOf(currentBreakpoint);
  for (let i = currentIndex; i < orderedBreakpoints.length; i++) {
    const bp = orderedBreakpoints[i];
    if (values[bp] !== undefined) {
      return values[bp] as T;
    }
  }
  
  return fallback;
};

// CSS-in-JS helper for responsive styles
export const responsiveStyles = (device: DeviceInfo) => ({
  // Dynamic font sizes
  fontSize: {
    xs: `${10 * device.fontScale}px`,
    sm: `${12 * device.fontScale}px`,
    base: `${14 * device.fontScale}px`,
    lg: `${16 * device.fontScale}px`,
    xl: `${18 * device.fontScale}px`,
    '2xl': `${20 * device.fontScale}px`,
    '3xl': `${24 * device.fontScale}px`,
    '4xl': `${32 * device.fontScale}px`,
  },
  
  // Dynamic spacing
  spacing: {
    xs: `${4 * device.spacingScale}px`,
    sm: `${8 * device.spacingScale}px`,
    md: `${12 * device.spacingScale}px`,
    lg: `${16 * device.spacingScale}px`,
    xl: `${20 * device.spacingScale}px`,
    '2xl': `${24 * device.spacingScale}px`,
    '3xl': `${32 * device.spacingScale}px`,
  },
  
  // Container widths
  container: {
    padding: device.isMobile ? `${12 * device.spacingScale}px` : '16px',
    maxWidth: device.isDesktop ? '1200px' : '100%',
  }
});