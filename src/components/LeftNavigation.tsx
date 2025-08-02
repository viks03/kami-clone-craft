import { useState } from 'react';

interface LeftNavigationProps {
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
  { icon: 'fas fa-bookmark', label: 'Saved' },
  { icon: 'fas fa-heart', label: 'Favorites' },
];

export const LeftNavigation = ({ className }: LeftNavigationProps) => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <div className={`lg:hidden fixed left-0 top-0 bottom-0 w-16 bg-anime-dark-bg border-r border-anime-border z-40 ${className || ''}`}>
      {/* Logo area - spacing from top */}
      <div className="h-20 flex items-center justify-center border-b border-anime-border">
        <div className="text-anime-primary font-bold text-lg">A</div>
      </div>
      
      {/* Navigation items - fill remaining space */}
      <div className="flex flex-col gap-1 p-2 h-[calc(100vh-5rem)] overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 relative group ${
              activeItem === item.label 
                ? 'text-anime-primary bg-anime-primary/10' 
                : 'text-anime-text-muted hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => setActiveItem(item.label)}
            title={item.label}
          >
            {/* Active indicator */}
            {activeItem === item.label && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-anime-primary rounded-r-full"></div>
            )}
            
            <i className={`${item.icon} text-sm mb-1`} />
            <span className="text-[8px] font-medium leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {item.label}
            </span>
            
            {/* Tooltip on hover */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-anime-card-bg border border-anime-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};