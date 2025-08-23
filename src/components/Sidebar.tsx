import { useState, useMemo } from 'react';

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: 'fas fa-home', label: 'Home', active: true },
  { icon: 'fas fa-fire', label: 'Latest' },
  { icon: 'fas fa-star', label: 'Trending' },
  { icon: 'fas fa-history', label: 'History' },
  { icon: 'fas fa-user', label: 'Profile' },
  { icon: 'fas fa-cog', label: 'Settings' },
  { icon: 'fas fa-random', label: 'Random Anime' },
] as const;

export const Sidebar = ({ className }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block w-[250px] bg-anime-dark-bg p-5 border-r border-anime-border transition-transform duration-300 ease-in-out ${className || ''}`}>
        <div className="px-4 text-2xl font-bold text-anime-primary mb-6">
          AnimeFlow
        </div>
        
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li 
                key={item.label}
                className={`flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer transition-colors duration-300 ${
                  activeItem === item.label 
                    ? 'bg-anime-secondary' 
                    : 'hover:bg-anime-secondary'
                }`}
                onClick={() => setActiveItem(item.label)}
              >
                <i className={`${item.icon} text-lg`} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};