import { useState } from 'react';

interface BottomNavigationProps {
  className?: string;
}

const mainNavItems = [
  { icon: 'fas fa-home', label: 'Home' },
  { icon: 'fas fa-plus', label: 'Newest' },
  { icon: 'fas fa-fire', label: 'Trending' },
  { icon: 'fas fa-cog', label: 'Settings' },
  { icon: 'fas fa-chevron-right', label: 'More' },
] as const;

const moreMenuItems = [
  { icon: 'fas fa-history', label: 'History' },
  { icon: 'fas fa-user', label: 'Profile' },
  { icon: 'fas fa-random', label: 'Random' },
  { icon: 'fas fa-star', label: 'Favorites' },
] as const;

export const BottomNavigation = ({ className, id, ...props }: BottomNavigationProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const handleItemClick = (label: string) => {
    if (label === 'More') {
      setIsMoreMenuOpen(true);
    } else {
      setActiveItem(label);
      setIsMoreMenuOpen(false);
    }
  };

  const handleMoreMenuItemClick = (label: string) => {
    if (label === 'Back') {
      setIsMoreMenuOpen(false);
    } else {
      setActiveItem(label);
      // Don't close the more menu when selecting items
    }
  };

  const handleBackClick = () => {
    setIsMoreMenuOpen(false);
  };

  return (
    <div {...props} id={id} className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 overflow-hidden ${className || ''}`}>
      <div className="relative w-full h-full">
        {/* Main Navigation */}
        <div 
          className={`flex justify-between items-center px-3 py-3 transition-transform duration-300 ease-in-out ${
            isMoreMenuOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {mainNavItems.map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg transition-all duration-300 relative ${
                activeItem === item.label 
                  ? 'text-anime-primary bg-anime-primary/10 shadow-md' 
                  : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => handleItemClick(item.label)}
            >
              {/* Active indicator */}
              {activeItem === item.label && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-anime-primary rounded-full"></div>
              )}
              
              <i className={`${item.icon} text-[15px] mb-1`} />
              <span className="text-[10px] font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* More Menu */}
        <div 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${
            isMoreMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center px-3 py-3">
            {/* Back Button */}
            <button
              className="flex flex-col items-center justify-center flex-1 py-2.5 px-1 text-anime-text-muted hover:text-foreground hover:bg-muted/50 transition-all duration-300 rounded-lg"
              onClick={() => handleMoreMenuItemClick('Back')}
            >
              <i className="fas fa-chevron-left text-[15px] mb-1" />
              <span className="text-[10px] font-medium leading-tight">Back</span>
            </button>

            {/* More Menu Items */}
            {moreMenuItems.map((item) => (
              <button
                key={item.label}
                className={`flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg transition-all duration-300 relative ${
                  activeItem === item.label 
                    ? 'text-anime-primary bg-anime-primary/10 shadow-md' 
                    : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50'
                }`}
                onClick={() => handleMoreMenuItemClick(item.label)}
              >
                {/* Active indicator */}
                {activeItem === item.label && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-anime-primary rounded-full"></div>
                )}
                
                <i className={`${item.icon} text-[15px] mb-1`} />
                <span className="text-[10px] font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};