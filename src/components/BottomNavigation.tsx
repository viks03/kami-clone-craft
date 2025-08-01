import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BottomNavigationProps {
  className?: string;
}

const navItems = [
  { icon: 'fas fa-home', label: 'Home' },
  { icon: 'fas fa-fire', label: 'Latest' },
  { icon: 'fas fa-star', label: 'Trending' },
  { icon: 'fas fa-history', label: 'History' },
  { icon: 'fas fa-user', label: 'Profile' },
  { icon: 'fas fa-cog', label: 'Settings' },
  { icon: 'fas fa-random', label: 'Random' },
  { icon: 'fas fa-search', label: 'Search' },
  { icon: 'fas fa-bell', label: 'Notifications' },
];

export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`lg:hidden ${className || ''}`}>
      <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <PopoverTrigger asChild>
          <button 
            className="fixed bottom-6 right-6 w-14 h-14 bg-anime-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
          >
            {/* Hamburger Icon */}
            <div className={`transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}>
              {!isMenuOpen ? (
                <div className="flex flex-col space-y-1">
                  <div className="w-5 h-0.5 bg-white rounded-full transition-all duration-300"></div>
                  <div className="w-5 h-0.5 bg-white rounded-full transition-all duration-300"></div>
                  <div className="w-5 h-0.5 bg-white rounded-full transition-all duration-300"></div>
                </div>
              ) : (
                <div className="relative w-5 h-5">
                  <div className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                  <div className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                </div>
              )}
            </div>
          </button>
        </PopoverTrigger>
        
        <PopoverContent 
          side="top" 
          align="end"
          className="w-80 p-6 bg-anime-dark-bg border-anime-border shadow-xl mb-4 mr-6"
          sideOffset={10}
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-1">Navigation</h3>
            <p className="text-anime-text-muted text-sm">Choose where you want to go</p>
          </div>
          
          {/* Grid layout for navigation items */}
          <div className="grid grid-cols-3 gap-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 relative group hover:scale-105 ${
                  activeItem === item.label 
                    ? 'text-anime-primary bg-anime-primary/10 shadow-md border border-anime-primary/20' 
                    : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50 border border-anime-border/30'
                }`}
                onClick={() => {
                  setActiveItem(item.label);
                  setIsMenuOpen(false);
                }}
              >
                {/* Active indicator */}
                {activeItem === item.label && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-anime-primary rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                )}
                
                <i className={`${item.icon} text-xl mb-2 transition-all duration-300 group-hover:scale-110`} />
                <span className="text-xs font-medium text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};