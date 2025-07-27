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

// Resolution detection hook
const useDeviceResolution = () => {
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateResolution = () => {
      setResolution({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateResolution();
    window.addEventListener('resize', updateResolution);
    return () => window.removeEventListener('resize', updateResolution);
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
      setCanScrollLeft(scrollLeft > 0);
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

  // Calculate button width based on resolution
  const getButtonWidth = () => {
    if (resolution.width <= 320) return 'min-w-[56px]'; // Very small devices
    if (resolution.width <= 375) return 'min-w-[64px]'; // iPhone SE, smaller phones
    if (resolution.width <= 414) return 'min-w-[70px]'; // Standard phones
    return 'min-w-[75px]'; // Larger phones
  };

  const buttonWidth = getButtonWidth();
  const maxVisibleItems = 5;

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}>
      <div className="relative">
        {/* Scroll indicators */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-anime-dark-bg to-transparent z-10 flex items-center justify-start pl-1">
            <div className="w-1 h-1 bg-anime-primary rounded-full animate-pulse"></div>
          </div>
        )}
        
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-anime-dark-bg to-transparent z-10 flex items-center justify-end pr-1">
            <div className="w-1 h-1 bg-anime-primary rounded-full animate-pulse"></div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto px-2 py-3 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
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
              className={`flex flex-col items-center justify-center ${buttonWidth} px-1 py-2 mx-0.5 rounded-lg transition-all duration-300 relative ${
                activeItem === item.label 
                  ? 'text-anime-primary bg-anime-primary/10 shadow-md scale-105' 
                  : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => setActiveItem(item.label)}
            >
              {/* Active indicator square */}
              {activeItem === item.label && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-anime-primary rounded-full"></div>
              )}
              
              <i className={`${item.icon} text-base mb-1`} />
              <span className="text-[10px] font-medium leading-tight text-center">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};