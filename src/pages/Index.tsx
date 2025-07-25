import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeListItem } from '../components/AnimeListItem';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { animeData } from '../data/animeData';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('newest');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Prevent scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen font-karla">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* Mobile overlay with blur effect */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="flex-1 lg:ml-0">
        <div className="flex flex-col lg:flex-row h-full lg:pl-4">
          {/* Mobile Header with Hamburger */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-anime-dark-bg border-b border-anime-border">
            <button 
              onClick={toggleSidebar}
              className="text-anime-primary text-xl"
            >
              <i className="fas fa-bars" />
            </button>
            <div className="text-xl font-bold text-anime-primary">
              AnimeFlow
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-lg cursor-pointer hover:text-anime-primary transition-colors"
              >
                <i className="fas fa-search" />
              </button>
              <NotificationDrawer>
                <i className="fas fa-bell text-lg cursor-pointer hover:text-anime-primary transition-colors" />
              </NotificationDrawer>
              <i className="fas fa-user-circle text-lg cursor-pointer hover:text-anime-primary transition-colors" />
            </div>
          </div>

          {/* Left Section */}
          <div className="w-full lg:w-3/4 lg:pr-4 px-4 lg:px-0">
            <div className="hidden lg:block">
              <Header onSearch={handleSearch} />
            </div>
            
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
            </div>
            
            <Carousel animes={animeData.spotlightAnimes} />
            
            <section className="recently-updated mb-8">
              <div className="flex items-center mb-4">
                <div className="flex bg-anime-card-bg border border-anime-border rounded-lg p-1">
                  <button
                    onClick={() => setActiveSection('newest')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeSection === 'newest'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                  >
                    NEWEST
                  </button>
                  <button
                    onClick={() => setActiveSection('popular')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeSection === 'popular'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                  >
                    POPULAR
                  </button>
                  <button
                    onClick={() => setActiveSection('top-rated')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeSection === 'top-rated'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                  >
                    TOP RATED
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-3 lg:gap-4">
                {animeData.latestEpisodeAnimes.slice(0, 8).map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    episodes={anime.episodes}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/4 px-4 lg:px-0 lg:pl-4 lg:border-l border-anime-border">
            <section className="latest-completed mb-8">
              <h2 className="text-lg mb-4">Latest Completed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
                {animeData.latestCompletedAnimes.map((anime) => (
                  <AnimeListItem
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    status="Completed"
                  />
                ))}
              </div>
              <a href="#" className="block text-right text-anime-primary text-sm mt-2">
                View All
              </a>
            </section>

            <section className="trending-now mb-8 lg:mb-0">
              <h2 className="text-lg mb-4">Trending Now</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
                {animeData.mostPopularAnimes.slice(0, 2).map((anime) => (
                  <AnimeListItem
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    rating={9.5}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
