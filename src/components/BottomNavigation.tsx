import { useState, useRef, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}>
        <div className="relative">
          {/* Smooth horizontal scroll progress indicator at top */}
          {hasScroll && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-anime-primary/20 z-10">
              <div 
                className="h-full bg-gradient-to-r from-anime-primary to-anime-primary/60 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}

          <div className="flex items-center">
            {/* Navigation items */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto py-3 scroll-smooth flex-1"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                paddingLeft: `${spacing.containerPadding}px`,
                paddingRight: `${spacing.containerPadding / 2}px`,
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
              
              {navItems.slice(0, 4).map((item) => (
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
                  {/* Active indicator */}
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

            {/* Hamburger menu button */}
            <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DrawerTrigger asChild>
                <button 
                  className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 text-anime-text-muted hover:text-foreground hover:bg-muted/50 mr-3"
                >
                  <div className="flex flex-col space-y-1">
                    <div className="w-4 h-0.5 bg-current rounded-full transition-all duration-300"></div>
                    <div className="w-4 h-0.5 bg-current rounded-full transition-all duration-300"></div>
                    <div className="w-4 h-0.5 bg-current rounded-full transition-all duration-300"></div>
                  </div>
                  <span className="text-[9px] font-medium leading-tight mt-1">Menu</span>
                </button>
              </DrawerTrigger>
              
              <DrawerContent className="bg-anime-dark-bg border-anime-border">
                <div className="p-6 pb-8">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground mb-2">Navigation</h2>
                    <p className="text-anime-text-muted text-sm">Choose where you want to go</p>
                  </div>
                  
                  {/* Grid layout for all navigation items */}
                  <div className="grid grid-cols-3 gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 relative group ${
                          activeItem === item.label 
                            ? 'text-anime-primary bg-anime-primary/10 shadow-lg border border-anime-primary/20' 
                            : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50 border border-anime-border/50'
                        }`}
                        onClick={() => {
                          setActiveItem(item.label);
                          setIsMenuOpen(false);
                        }}
                      >
                        {/* Active indicator for grid items */}
                        {activeItem === item.label && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-anime-primary rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                        
                        <i className={`${item.icon} text-2xl mb-3 transition-all duration-300 group-hover:scale-110`} />
                        <span className="text-sm font-medium text-center">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};