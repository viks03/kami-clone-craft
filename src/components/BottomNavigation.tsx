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
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateResolution = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setResolution({ width, height });
    };
    
    updateResolution();
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const resolution = useDeviceResolution();

  // Check scroll state
  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollState();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollState);
      return () => scrollElement.removeEventListener('scroll', checkScrollState);
    }
  }, []);

  // Dynamic spacing calculation based on resolution
  const getOptimalSpacing = () => {
    const width = resolution.width || 375;
    const availableWidth = width - 24; // Account for container padding
    const itemWidth = Math.floor(availableWidth / 5);
    const gap = Math.max(2, Math.floor(itemWidth * 0.05)); // Dynamic gap based on item width
    
    return {
      itemWidth: itemWidth - gap,
      gap: gap,
      containerPadding: 12
    };
  };

  const spacing = getOptimalSpacing();

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}>
      <div className="relative">
        {/* Scroll indicators - smooth horizontal lines */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-anime-dark-bg via-anime-dark-bg/80 to-transparent z-10 flex items-center justify-center">
            <div className="w-4 h-0.5 bg-anime-primary/40 rounded-full animate-pulse"></div>
          </div>
        )}
        
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-anime-dark-bg via-anime-dark-bg/80 to-transparent z-10 flex items-center justify-center">
            <div className="w-4 h-0.5 bg-anime-primary/40 rounded-full animate-pulse"></div>
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