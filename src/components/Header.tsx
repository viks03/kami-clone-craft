import { useState } from 'react';
import { NotificationDrawer } from './NotificationDrawer';

interface HeaderProps {
  onSearch?: (query: string) => void;
  isSearchOpen?: boolean;
}

export const Header = ({ onSearch, isSearchOpen = false }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="relative">
      {/* Desktop Search Bar */}
      <div className="hidden lg:flex justify-between items-center my-4">
        <div className="flex items-center w-full max-w-[350px] h-[45px] px-4 bg-anime-card-bg border border-anime-border rounded-[10px] mr-4">
          <input
            type="text"
            placeholder="Search Anime"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-anime-text-muted text-sm outline-none placeholder:text-anime-text-muted"
          />
          <button 
            onClick={handleSearch}
            className="text-anime-primary text-base hover:text-purple-400 transition-colors"
          >
            <i className="fas fa-search" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationDrawer>
            <i className="fas fa-bell text-2xl leading-10 cursor-pointer hover:text-anime-primary transition-colors" />
          </NotificationDrawer>
          <i className="fas fa-user-circle text-2xl leading-10 cursor-pointer hover:text-anime-primary transition-colors" />
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isSearchOpen ? 'max-h-[60px] opacity-100 mb-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex items-center w-full h-[45px] px-4 bg-anime-card-bg border border-anime-border rounded-[10px] mx-4 mb-4">
          <input
            type="text"
            placeholder="Search Anime"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-anime-text-muted text-sm outline-none placeholder:text-anime-text-muted"
          />
          <button 
            onClick={handleSearch}
            className="text-anime-primary text-base hover:text-purple-400 transition-colors"
          >
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </header>
  );
};