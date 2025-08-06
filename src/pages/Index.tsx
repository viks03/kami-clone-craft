import { useState, useCallback, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeListItem } from '../components/AnimeListItem';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { BottomNavigation } from '../components/BottomNavigation';
import { animeData } from '../data/animeData';
import useDeviceScale from '../hooks/useDeviceScale';

const Index = () => {
  const [activeSection, setActiveSection] = useState('newest');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scaleSpacing, scaleFontSize, isMobile, scale } = useDeviceScale();

  const handleSearch = useCallback((query: string) => {
    console.log(`Searching for: ${query}`);
  }, []);

  // Memoize static data slices to prevent unnecessary recalculations
  const carouselData = useMemo(() => animeData.spotlightAnimes, []);
  const latestAnimes = useMemo(() => animeData.latestEpisodeAnimes.slice(0, 9), []);
  const completedAnimes = useMemo(() => animeData.latestCompletedAnimes, []);
  const popularAnimes = useMemo(() => animeData.mostPopularAnimes.slice(0, 2), []);

  return (
    <div className="flex min-h-screen font-karla">
      <Sidebar />
      
      <main className="flex-1 lg:ml-0">
        <div className="flex flex-col lg:flex-row h-full lg:pl-4">
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-anime-dark-bg border-b border-anime-border">
            <div className="text-xl font-bold text-anime-primary">
              AnimeFlow
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-white hover:text-anime-primary transition-colors"
              >
                <i className="fas fa-search text-sm" />
              </button>
              <div className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center">
                <NotificationDrawer>
                  <i className="fas fa-bell text-sm cursor-pointer hover:text-anime-primary transition-colors text-white" />
                </NotificationDrawer>
              </div>
              <button className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-white hover:text-anime-primary transition-colors">
                <i className="fas fa-user-circle text-sm" />
              </button>
            </div>
          </div>

          {/* Left Section */}
          <div className="w-full lg:w-3/4 lg:pr-4 px-4 lg:px-0 lg:pt-0 pt-20 pb-20 lg:pb-0">
            <div className="hidden lg:block">
              <Header onSearch={handleSearch} />
            </div>
            
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
            </div>
            
            <Carousel animes={carouselData} />
            
            <section className="recently-updated mb-8">
              <div 
                className="flex items-center justify-between mb-4"
                style={{ 
                  gap: isMobile ? `${scaleSpacing(8)}px` : '16px'
                }}
              >
                <div 
                  className="flex bg-anime-card-bg border border-anime-border rounded-lg"
                  style={{ 
                    padding: isMobile ? `${scaleSpacing(4)}px` : '4px'
                  }}
                >
                  <button
                    onClick={() => setActiveSection('newest')}
                    className={`font-medium rounded-md transition-all ${
                      activeSection === 'newest'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                    style={{
                      padding: isMobile ? `${scaleSpacing(6)}px ${scaleSpacing(12)}px` : '6px 12px',
                      fontSize: isMobile ? `${scaleFontSize(14)}px` : '14px'
                    }}
                  >
                    NEWEST
                  </button>
                  <button
                    onClick={() => setActiveSection('popular')}
                    className={`font-medium rounded-md transition-all ${
                      activeSection === 'popular'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                    style={{
                      padding: isMobile ? `${scaleSpacing(6)}px ${scaleSpacing(12)}px` : '6px 12px',
                      fontSize: isMobile ? `${scaleFontSize(14)}px` : '14px'
                    }}
                  >
                    POPULAR
                  </button>
                  <button
                    onClick={() => setActiveSection('top-rated')}
                    className={`font-medium rounded-md transition-all ${
                      activeSection === 'top-rated'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                    style={{
                      padding: isMobile ? `${scaleSpacing(6)}px ${scaleSpacing(12)}px` : '6px 12px',
                      fontSize: isMobile ? `${scaleFontSize(14)}px` : '14px'
                    }}
                  >
                    TOP RATED
                  </button>
                </div>
                
                {/* Pagination Controls */}
                <div 
                  className="flex bg-anime-card-bg border border-anime-border rounded-lg"
                  style={{ 
                    padding: isMobile ? `${scaleSpacing(4)}px` : '4px'
                  }}
                >
                  <button 
                    onClick={() => console.log('Previous page')}
                    className="font-medium text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80 transition-all rounded-md cursor-pointer"
                    style={{
                      padding: isMobile ? `${scaleSpacing(6)}px ${scaleSpacing(12)}px` : '6px 12px',
                      fontSize: isMobile ? `${scaleFontSize(14)}px` : '14px'
                    }}
                  >
                    <i className="fas fa-chevron-left" style={{ fontSize: isMobile ? `${scaleFontSize(12)}px` : '12px' }} />
                  </button>
                  <div 
                    className="font-medium text-white bg-anime-primary rounded-md flex items-center justify-center"
                    style={{
                      padding: isMobile ? `${scaleSpacing(6)}px ${scaleSpacing(12)}px` : '6px 12px',
                      fontSize: isMobile ? `${scaleFontSize(14)}px` : '14px',
                      minWidth: isMobile ? `${scaleSpacing(32)}px` : '32px'
                    }}
                  >
                    1
                  </div>
                  <button 
                    onClick={() => console.log('Next page')}
                    className="font-medium text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80 transition-all rounded-md cursor-pointer"
                    style={{
                      padding: isMobile ? `${scaleSpacing(6)}px ${scaleSpacing(12)}px` : '6px 12px',
                      fontSize: isMobile ? `${scaleFontSize(14)}px` : '14px'
                    }}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: isMobile ? `${scaleFontSize(12)}px` : '12px' }} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {latestAnimes.map((anime) => (
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
                {completedAnimes.map((anime) => (
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
                {popularAnimes.map((anime) => (
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
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
