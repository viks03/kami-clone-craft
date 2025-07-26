import { useState, useRef } from 'react';

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

export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [activeItem, setActiveItem] = useState('Home');
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50 ${className || ''}`}>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto px-2 py-3"
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
            className={`flex flex-col items-center justify-center min-w-[60px] px-2 py-2 rounded-lg transition-colors duration-300 ${
              activeItem === item.label 
                ? 'text-anime-primary' 
                : 'text-anime-text-muted hover:text-anime-text'
            }`}
            onClick={() => setActiveItem(item.label)}
          >
            <i className={`${item.icon} text-lg mb-1`} />
            <span className="text-xs font-medium leading-tight text-center">
              {item.label}
            </span>
          </button>
        ))}
        
        {/* Scroll indicator - shows when there are more items */}
        {navItems.length > 6 && (
          <div className="flex items-center justify-center min-w-[20px] px-1">
            <div className="w-1 h-1 bg-anime-text-muted rounded-full opacity-50"></div>
          </div>
        )}
      </div>
    </div>
  );
};