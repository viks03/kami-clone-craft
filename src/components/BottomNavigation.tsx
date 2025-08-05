import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';

interface BottomNavigationProps {
  className?: string;
}

const navItems = [
  { icon: 'fas fa-home', label: 'Home', active: true },
  { icon: 'fas fa-fire', label: 'Latest' },
  { icon: 'fas fa-star', label: 'Trending' },
  { icon: 'fas fa-history', label: 'History' },
  { icon: 'fas fa-user', label: 'Profile' },
  { icon: 'fas fa-cog', label: 'Settings' },
  { icon: 'fas fa-random', label: 'Random' },
] as const;


export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [activeItem, setActiveItem] = useState('Home');
  const device = useResponsiveLayout();

  // Optimized spacing calculation with better responsive logic
  const spacing = useMemo(() => {
    const width = device.width;
    const baseContainerPadding = 12 * device.spacingScale;
    const visibleItems = navItems.length;
    const availableWidth = width - (baseContainerPadding * 2);
    const itemWidth = Math.floor(availableWidth / visibleItems);
    const gap = Math.max(1, Math.floor(itemWidth * 0.02)); // Reduced gap
    
    return {
      itemWidth: Math.max(50, itemWidth - gap), // Minimum width
      gap: gap,
      containerPadding: baseContainerPadding,
      fontSize: device.width <= 375 ? '8px' : '9px',
      iconSize: device.width <= 375 ? '12px' : '14px',
      padding: device.width <= 375 ? '8px 6px' : '10px 8px'
    };
  }, [device.width, device.spacingScale]);

  return (
    <div 
      className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}
      style={{ 
        height: `${64 * device.scaleFactor}px`,
        minHeight: '56px',
        maxHeight: '80px'
      }}
    >
      <div 
        className="flex justify-center items-center h-full overflow-x-auto"
        style={{ 
          paddingLeft: `${spacing.containerPadding}px`,
          paddingRight: `${spacing.containerPadding}px`,
          gap: `${spacing.gap}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center justify-center flex-shrink-0 rounded-lg transition-all duration-300 relative ${
              activeItem === item.label 
                ? 'text-anime-primary bg-anime-primary/10' 
                : 'text-anime-text-muted hover:text-white hover:bg-anime-card-bg/50'
            }`}
            style={{ 
              width: `${spacing.itemWidth}px`,
              minWidth: `${Math.max(48, spacing.itemWidth)}px`,
              maxWidth: `${spacing.itemWidth}px`,
              padding: spacing.padding,
              fontSize: spacing.fontSize
            }}
            onClick={() => setActiveItem(item.label)}
          >
            {/* Active indicator */}
            {activeItem === item.label && (
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-anime-primary rounded-full"
                style={{ 
                  width: `${24 * device.scaleFactor}px`,
                  height: `${3 * device.scaleFactor}px`,
                  minWidth: '20px',
                  minHeight: '2px'
                }}
              />
            )}
            
            <i 
              className={`${item.icon} mb-1`}
              style={{ fontSize: spacing.iconSize }}
            />
            <span 
              className="font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ 
                fontSize: spacing.fontSize,
                lineHeight: '1.2',
                maxWidth: '100%'
              }}
            >
              {device.width <= 360 && item.label.length > 6 
                ? item.label.substring(0, 5) + '...' 
                : item.label
              }
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};