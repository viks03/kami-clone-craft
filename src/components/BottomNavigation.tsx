import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import useDeviceScale from '../hooks/useDeviceScale';

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

// Enhanced resolution detection hook
const useDeviceResolution = () => {
  const [resolution, setResolution] = useState(() => ({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 375, 
    height: typeof window !== 'undefined' ? window.innerHeight : 667 
  }));
  
  useEffect(() => {
    const updateResolution = () => {
      setResolution({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', updateResolution);
    window.addEventListener('orientationchange', updateResolution);
    
    return () => {
      window.removeEventListener('resize', updateResolution);
      window.removeEventListener('orientationchange', updateResolution);
    };
  }, []);
  
  return resolution;
};

export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const resolution = useDeviceResolution();
  const { scaleSpacing, scaleFontSize, width } = useDeviceScale();

  // Calculate scroll progress and scrollability
  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const hasScrollableContent = maxScroll > 0;
      
      setHasScroll(hasScrollableContent);
      
      if (hasScrollableContent) {
        const progress = (scrollLeft / maxScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollState);
      return () => scrollElement.removeEventListener('scroll', updateScrollState);
    }
  }, [resolution.width]);

  // Perfect spacing for exactly 5 visible buttons with device scaling
  const spacing = useMemo(() => {
    const deviceWidth = width;
    const visibleItems = 5; // Always show exactly 5 items
    const containerPadding = scaleSpacing(12);
    const availableWidth = deviceWidth - (containerPadding * 2);
    const itemWidth = Math.floor(availableWidth / visibleItems);
    const gap = Math.max(scaleSpacing(2), Math.floor(itemWidth * 0.05));
    
    return {
      itemWidth: itemWidth - gap,
      gap: gap,
      containerPadding: containerPadding
    };
  }, [width, scaleSpacing]);

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}>
      <div className="relative">
        {/* More visible scroll progress indicator */}
        {hasScroll && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-anime-primary/15 z-10">
            <div 
              className="h-full bg-anime-primary/40 transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingTop: `${scaleSpacing(12)}px`,
            paddingBottom: `${scaleSpacing(12)}px`,
            paddingLeft: `${spacing.containerPadding}px`,
            paddingRight: `${spacing.containerPadding}px`,
            gap: `${spacing.gap}px`
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
                  ? 'text-anime-primary bg-anime-primary/10 shadow-md' 
                  : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50'
              }`}
              style={{ 
                width: `${spacing.itemWidth}px`,
                minWidth: `${spacing.itemWidth}px`,
                maxWidth: `${spacing.itemWidth}px`,
                padding: `${scaleSpacing(8)}px ${scaleSpacing(4)}px`
              }}
              onClick={() => setActiveItem(item.label)}
            >
              {/* Active indicator - rounded square */}
              {activeItem === item.label && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 bg-anime-primary rounded-full"
                  style={{
                    top: `-${scaleSpacing(2)}px`,
                    width: `${scaleSpacing(32)}px`,
                    height: `${scaleSpacing(4)}px`
                  }}
                ></div>
              )}
              
              <i 
                className={`${item.icon} mb-1`} 
                style={{ fontSize: `${scaleFontSize(14)}px` }}
              />
              <span 
                className="font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontSize: `${scaleFontSize(9)}px` }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};