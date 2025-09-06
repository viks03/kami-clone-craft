import { useState, useCallback, memo } from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

interface DesktopHeaderProps {
  onSearch?: (query: string) => void;
}

export const DesktopHeader = memo(({ onSearch }: DesktopHeaderProps) => {
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
    <header className="hidden lg:flex items-center justify-between h-16 px-6 bg-anime-dark-bg border-b border-anime-border/30 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold font-outfit text-foreground">
          ANIMEFLOW
        </h1>
      </div>

      {/* Search Bar - Center */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-anime-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search Anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-12 pl-12 pr-4 bg-anime-card-bg/50 border border-anime-border/50 rounded-xl text-foreground placeholder:text-anime-text-muted focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* User Controls */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-anime-card-bg rounded-lg transition-colors duration-200">
          <Settings className="h-5 w-5 text-anime-text-muted hover:text-foreground" />
        </button>
        
        <NotificationDrawer>
          <button className="p-2 hover:bg-anime-card-bg rounded-lg transition-colors duration-200 relative">
            <Bell className="h-5 w-5 text-anime-text-muted hover:text-foreground" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-anime-primary rounded-full"></span>
          </button>
        </NotificationDrawer>

        <div className="flex items-center gap-2 p-2 hover:bg-anime-card-bg rounded-lg transition-colors duration-200 cursor-pointer">
          <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Profile</span>
        </div>
      </div>
    </header>
  );
});