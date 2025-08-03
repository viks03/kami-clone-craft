import { useState, useCallback, memo } from 'react';
import { NotificationDrawer } from './NotificationDrawer';

interface HeaderProps {
  onSearch?: (query: string) => void;
  isSearchOpen?: boolean;
}

export const Header = memo(({ onSearch, isSearchOpen = false }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (searchQuery && onSearch) {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

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
            className="flex-1 bg-transparent text-anime-text-muted text-base outline-none placeholder:text-anime-text-muted"
            style={{ fontSize: '16px' }}
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
      <div className={`lg:hidden fixed top-[73px] left-0 right-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
        isSearchOpen ? 'max-h-[80px] opacity-100 bg-anime-dark-bg' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex items-center h-[45px] px-4 bg-anime-card-bg border border-anime-border rounded-[10px] mx-4 mt-4 mb-4">
          <input
            type="text"
            placeholder="Search Anime"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-anime-text-muted text-base outline-none placeholder:text-anime-text-muted"
            style={{ fontSize: '16px' }}
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
});