import { useState, useEffect, useMemo } from 'react';

interface DeviceInfo {
  width: number;
  height: number;
  pixelRatio: number;
  isHighDensity: boolean;
  deviceType: 'small' | 'medium' | 'large' | 'xlarge';
  scaleFactor: number;
}

interface ResponsiveConfig {
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  buttonPadding: {
    x: number;
    y: number;
  };
  gap: number;
}

export const useResponsiveLayout = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 375,
        height: 667,
        pixelRatio: 2,
        isHighDensity: true,
        deviceType: 'medium',
        scaleFactor: 1
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    const isHighDensity = pixelRatio >= 2;
    
    let deviceType: DeviceInfo['deviceType'] = 'medium';
    if (width < 360) deviceType = 'small';
    else if (width < 400) deviceType = 'medium';
    else if (width < 450) deviceType = 'large';
    else deviceType = 'xlarge';

    // Calculate scale factor based on screen density and size
    let scaleFactor = 1;
    if (isHighDensity && width < 390) scaleFactor = 0.9;
    else if (isHighDensity && width < 420) scaleFactor = 0.95;
    else if (!isHighDensity && width < 380) scaleFactor = 0.85;

    return {
      width,
      height,
      pixelRatio,
      isHighDensity,
      deviceType,
      scaleFactor
    };
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      const isHighDensity = pixelRatio >= 2;
      
      let deviceType: DeviceInfo['deviceType'] = 'medium';
      if (width < 360) deviceType = 'small';
      else if (width < 400) deviceType = 'medium';
      else if (width < 450) deviceType = 'large';
      else deviceType = 'xlarge';

      // Enhanced scale factor calculation for different device types
      let scaleFactor = 1;
      if (isHighDensity && width < 390) scaleFactor = 0.9;
      else if (isHighDensity && width < 420) scaleFactor = 0.95;
      else if (!isHighDensity && width < 380) scaleFactor = 0.85;

      setDeviceInfo({
        width,
        height,
        pixelRatio,
        isHighDensity,
        deviceType,
        scaleFactor
      });
    };

    // Debounced update function
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 100);
    };

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', debouncedUpdate);
    };
  }, []);

  const responsiveConfig = useMemo((): ResponsiveConfig => {
    const { deviceType, scaleFactor, isHighDensity, width } = deviceInfo;

    // Base configurations for different device types
    const configs = {
      small: {
        fontSize: {
          xs: isHighDensity ? '0.65rem' : '0.7rem',
          sm: isHighDensity ? '0.75rem' : '0.8rem',
          base: isHighDensity ? '0.85rem' : '0.9rem',
          lg: isHighDensity ? '0.95rem' : '1rem',
        },
        spacing: { xs: 1, sm: 2, md: 3, lg: 4 },
        buttonPadding: { x: isHighDensity ? 8 : 10, y: isHighDensity ? 4 : 6 },
        gap: isHighDensity ? 2 : 3,
      },
      medium: {
        fontSize: {
          xs: isHighDensity ? '0.7rem' : '0.75rem',
          sm: isHighDensity ? '0.8rem' : '0.875rem',
          base: isHighDensity ? '0.9rem' : '1rem',
          lg: isHighDensity ? '1rem' : '1.125rem',
        },
        spacing: { xs: 2, sm: 3, md: 4, lg: 6 },
        buttonPadding: { x: isHighDensity ? 10 : 12, y: isHighDensity ? 5 : 6 },
        gap: isHighDensity ? 3 : 4,
      },
      large: {
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
        },
        spacing: { xs: 2, sm: 4, md: 6, lg: 8 },
        buttonPadding: { x: 12, y: 6 },
        gap: 4,
      },
      xlarge: {
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
        },
        spacing: { xs: 3, sm: 4, md: 6, lg: 8 },
        buttonPadding: { x: 12, y: 6 },
        gap: 4,
      },
    };

    const baseConfig = configs[deviceType];
    
    // Apply scale factor to spacing and padding
    return {
      ...baseConfig,
      spacing: {
        xs: Math.round(baseConfig.spacing.xs * scaleFactor),
        sm: Math.round(baseConfig.spacing.sm * scaleFactor),
        md: Math.round(baseConfig.spacing.md * scaleFactor),
        lg: Math.round(baseConfig.spacing.lg * scaleFactor),
      },
      buttonPadding: {
        x: Math.round(baseConfig.buttonPadding.x * scaleFactor),
        y: Math.round(baseConfig.buttonPadding.y * scaleFactor),
      },
      gap: Math.round(baseConfig.gap * scaleFactor),
    };
  }, [deviceInfo]);

  // Helper functions for specific responsive behaviors
  const getControlsSpacing = useMemo(() => {
    const { width, isHighDensity } = deviceInfo;
    
    // For the controls row (newest/popular/top-rated vs pagination)
    if (width < 375) return isHighDensity ? 'gap-1' : 'gap-2';
    if (width < 400) return isHighDensity ? 'gap-2' : 'gap-3';
    return 'gap-4';
  }, [deviceInfo]);

  const getButtonScale = useMemo(() => {
    const { scaleFactor, isHighDensity, width } = deviceInfo;
    
    // More aggressive scaling for very small or high-density screens
    if (isHighDensity && width < 380) return 0.85;
    if (width < 360) return 0.8;
    return scaleFactor;
  }, [deviceInfo]);

  return {
    deviceInfo,
    responsiveConfig,
    getControlsSpacing,
    getButtonScale,
    
    // Utility classes
    getTextSize: (size: keyof ResponsiveConfig['fontSize']) => responsiveConfig.fontSize[size],
    getSpacing: (size: keyof ResponsiveConfig['spacing']) => responsiveConfig.spacing[size],
    getButtonPadding: () => responsiveConfig.buttonPadding,
    getGap: () => responsiveConfig.gap,
  };
};