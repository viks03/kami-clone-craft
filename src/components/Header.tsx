import { useState } from 'react';
import { NotificationDrawer } from './NotificationDrawer';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
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
    <header className="flex justify-between items-center my-4">
      <div className="flex items-center w-full max-w-none lg:max-w-[350px] h-[45px] px-4 bg-anime-card-bg border border-anime-border rounded-[10px] mr-4 lg:mr-0">
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
      
      <div className="hidden lg:flex items-center gap-4">
        <NotificationDrawer>
          <i className="fas fa-bell text-2xl leading-10 cursor-pointer hover:text-anime-primary transition-colors" />
        </NotificationDrawer>
        <i className="fas fa-user-circle text-2xl leading-10 cursor-pointer hover:text-anime-primary transition-colors" />
      </div>
    </header>
  );
};