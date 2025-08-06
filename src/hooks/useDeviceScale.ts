import { useState, useEffect, useMemo } from 'react';

interface DeviceInfo {
  width: number;
  height: number;
  devicePixelRatio: number;
  isMobile: boolean;
  scale: number;
  spacingScale: number;
  fontScale: number;
}

const useDeviceScale = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 375,
        height: 667,
        devicePixelRatio: 2,
        isMobile: true,
        scale: 1,
        spacingScale: 1,
        fontScale: 1,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    return {
      width,
      height,
      devicePixelRatio,
      isMobile: width < 1024,
      scale: 1,
      spacingScale: 1,
      fontScale: 1,
    };
  });

  const calculateScales = useMemo(() => {
    const { width, height, devicePixelRatio, isMobile } = deviceInfo;
    
    if (!isMobile) {
      return { scale: 1, spacingScale: 1, fontScale: 1 };
    }

    // Base iPhone 15 Pro Max dimensions (2796 x 1290 logical pixels)
    const baseWidth = 430; // Logical width for iPhone 15 Pro Max
    const baseHeight = 932; // Logical height for iPhone 15 Pro Max
    
    // Calculate device characteristics
    const logicalWidth = width;
    const logicalHeight = height;
    
    // Device-specific scaling based on screen dimensions
    let scale = 1;
    let spacingScale = 1;
    let fontScale = 1;

    // iPhone 16 Pro (2622 x 1206 -> ~393 x 852 logical)
    if (logicalWidth <= 393 && logicalHeight <= 852) {
      scale = 0.92;
      spacingScale = 0.85;
      fontScale = 0.95;
    }
    // iPhone 15 Pro (2556 x 1179 -> ~393 x 852 logical)
    else if (logicalWidth <= 393 && logicalHeight <= 853) {
      scale = 0.92;
      spacingScale = 0.85;
      fontScale = 0.95;
    }
    // iPhone 14 Pro (2556 x 1179 -> ~393 x 852 logical)
    else if (logicalWidth <= 393 && logicalHeight <= 853) {
      scale = 0.92;
      spacingScale = 0.85;
      fontScale = 0.95;
    }
    // Smaller devices (iPhone SE, etc.)
    else if (logicalWidth <= 375) {
      scale = 0.88;
      spacingScale = 0.8;
      fontScale = 0.9;
    }
    // Very small devices
    else if (logicalWidth <= 360) {
      scale = 0.85;
      spacingScale = 0.75;
      fontScale = 0.85;
    }
    // iPhone 15 Pro Max and similar large devices
    else if (logicalWidth >= 430) {
      scale = 1;
      spacingScale = 1;
      fontScale = 1;
    }
    // Medium devices
    else {
      const widthRatio = logicalWidth / baseWidth;
      scale = Math.max(0.85, Math.min(1, widthRatio));
      spacingScale = Math.max(0.75, Math.min(1, widthRatio * 0.9));
      fontScale = Math.max(0.85, Math.min(1, widthRatio * 0.95));
    }

    return { scale, spacingScale, fontScale };
  }, [deviceInfo]);

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const isMobile = width < 1024;
      
      const { scale, spacingScale, fontScale } = calculateScales;
      
      setDeviceInfo({
        width,
        height,
        devicePixelRatio,
        isMobile,
        scale,
        spacingScale,
        fontScale,
      });
    };

    // Debounce resize events
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);
    
    // Initial calculation
    updateDeviceInfo();
    
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, [calculateScales]);

  return {
    ...deviceInfo,
    ...calculateScales,
    // Helper functions for consistent scaling
    scaleValue: (value: number) => Math.round(value * deviceInfo.scale),
    scaleSpacing: (value: number) => Math.round(value * calculateScales.spacingScale),
    scaleFontSize: (value: number) => Math.round(value * calculateScales.fontScale),
  };
};

export default useDeviceScale;