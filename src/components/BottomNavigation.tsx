import { useState, useRef, useEffect } from 'react';

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
];

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

  // Calculate scroll progress and scrollability
  const updateScrollState = () => {
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
  };

  useEffect(() => {
    updateScrollState();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateScrollState);
      return () => scrollElement.removeEventListener('scroll', updateScrollState);
    }
  }, [resolution.width]);

  // Perfect symmetric spacing calculation
  const getOptimalSpacing = () => {
    const width = resolution.width;
    const totalItems = navItems.length;
    const minItemWidth = 60;
    const maxItemWidth = 80;
    
    // Calculate if items can fit without scrolling
    const idealItemWidth = Math.min(maxItemWidth, Math.max(minItemWidth, Math.floor(width / totalItems) - 8));
    const totalItemsWidth = idealItemWidth * totalItems;
    const totalGapWidth = (totalItems - 1) * 4; // 4px gap between items
    const contentWidth = totalItemsWidth + totalGapWidth;
    
    // Calculate symmetric padding
    const padding = Math.max(12, Math.floor((width - contentWidth) / 2));
    
    return {
      itemWidth: idealItemWidth,
      gap: 4,
      containerPadding: padding
    };
  };

  const spacing = getOptimalSpacing();

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}>
      <div className="relative">
        {/* Subtle horizontal scroll progress indicator */}
        {hasScroll && (
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-anime-primary/5 z-10">
            <div 
              className="h-full bg-anime-primary/15 transition-all duration-500 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto py-3 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
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
              className={`flex flex-col items-center justify-center flex-shrink-0 py-2 rounded-lg transition-all duration-300 relative ${
                activeItem === item.label 
                  ? 'text-anime-primary bg-anime-primary/10 shadow-md' 
                  : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50'
              }`}
              style={{ 
                width: `${spacing.itemWidth}px`,
                minWidth: `${spacing.itemWidth}px`,
                maxWidth: `${spacing.itemWidth}px`
              }}
              onClick={() => setActiveItem(item.label)}
            >
              {/* Active indicator - rounded square */}
              {activeItem === item.label && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-anime-primary rounded-full"></div>
              )}
              
              <i className={`${item.icon} text-sm mb-1`} />
              <span className="text-[9px] font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};