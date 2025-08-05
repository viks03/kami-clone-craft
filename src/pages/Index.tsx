import { useState, useCallback, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeListItem } from '../components/AnimeListItem';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { BottomNavigation } from '../components/BottomNavigation';
import { animeData } from '../data/animeData';
import { useResponsiveLayout, responsiveStyles } from '../hooks/useResponsiveLayout';

const Index = () => {
  const [activeSection, setActiveSection] = useState('newest');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const device = useResponsiveLayout();
  const styles = responsiveStyles(device);

  const handleSearch = useCallback((query: string) => {
    console.log(`Searching for: ${query}`);
  }, []);

  // Memoize static data slices to prevent unnecessary recalculations
  const carouselData = useMemo(() => animeData.spotlightAnimes, []);
  const latestAnimes = useMemo(() => animeData.latestEpisodeAnimes.slice(0, 9), []);
  const completedAnimes = useMemo(() => animeData.latestCompletedAnimes, []);
  const popularAnimes = useMemo(() => animeData.mostPopularAnimes.slice(0, 2), []);

  // Dynamic grid columns based on screen size
  const gridCols = useMemo(() => {
    if (device.width <= 320) return 'grid-cols-2';  // Very small phones
    if (device.width <= 480) return 'grid-cols-3';  // Small phones
    if (device.width <= 768) return 'grid-cols-3';  // Large phones/small tablets
    return 'grid-cols-3';  // Tablets and desktop
  }, [device.width]);

  // Dynamic button spacing
  const buttonSpacing = useMemo(() => {
    return device.width <= 390 ? 'gap-1' : 'gap-2';
  }, [device.width]);

  // Dynamic padding
  const containerPadding = useMemo(() => {
    if (device.width <= 375) return 'px-3';
    if (device.width <= 414) return 'px-4';
    return 'px-4';
  }, [device.width]);

  return (
    <div className="flex min-h-screen font-karla" style={{ fontSize: styles.fontSize.base }}>
      <Sidebar />
      
      <main className="flex-1 lg:ml-0">
        <div className="flex flex-col lg:flex-row h-full lg:pl-4">
          {/* Mobile Header */}
          <div 
            className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-anime-dark-bg border-b border-anime-border"
            style={{ 
              padding: styles.container.padding,
              height: `${48 * device.scaleFactor}px`,
              minHeight: '48px'
            }}
          >
            <div 
              className="font-bold text-anime-primary"
              style={{ fontSize: styles.fontSize.xl }}
            >
              AnimeFlow
            </div>
            <div className={`flex items-center ${buttonSpacing}`}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-white hover:text-anime-primary transition-colors"
                style={{ 
                  width: `${40 * device.scaleFactor}px`,
                  height: `${40 * device.scaleFactor}px`,
                  minWidth: '36px',
                  minHeight: '36px'
                }}
              >
                <i className="fas fa-search" style={{ fontSize: styles.fontSize.sm }} />
              </button>
              <div 
                className="bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center"
                style={{ 
                  width: `${40 * device.scaleFactor}px`,
                  height: `${40 * device.scaleFactor}px`,
                  minWidth: '36px',
                  minHeight: '36px'
                }}
              >
                <NotificationDrawer>
                  <i 
                    className="fas fa-bell cursor-pointer hover:text-anime-primary transition-colors text-white" 
                    style={{ fontSize: styles.fontSize.sm }}
                  />
                </NotificationDrawer>
              </div>
              <button 
                className="bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-white hover:text-anime-primary transition-colors"
                style={{ 
                  width: `${40 * device.scaleFactor}px`,
                  height: `${40 * device.scaleFactor}px`,
                  minWidth: '36px',
                  minHeight: '36px'
                }}
              >
                <i className="fas fa-user-circle" style={{ fontSize: styles.fontSize.sm }} />
              </button>
            </div>
          </div>

          {/* Left Section */}
          <div 
            className={`w-full lg:w-3/4 lg:pr-4 lg:px-0 lg:pt-0 lg:pb-0 ${containerPadding}`}
            style={{ 
              paddingTop: device.isMobile ? `${Math.max(56, 56 * device.scaleFactor)}px` : '0',
              paddingBottom: device.isMobile ? `${Math.max(76, 76 * device.scaleFactor)}px` : '0'
            }}
          >
            <div className="hidden lg:block">
              <Header onSearch={handleSearch} />
            </div>
            
            {/* Mobile Search */}
            <div className="lg:hidden" style={{ marginBottom: styles.spacing.lg }}>
              <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
            </div>
            
            <Carousel animes={carouselData} />
            
            <section className="recently-updated" style={{ marginBottom: styles.spacing['2xl'] }}>
              <div 
                className="flex items-center justify-between"
                style={{ 
                  marginBottom: styles.spacing.lg,
                  gap: styles.spacing.sm
                }}
              >
                <div 
                  className="flex bg-anime-card-bg border border-anime-border rounded-lg"
                  style={{ padding: `${4 * device.spacingScale}px` }}
                >
                  <button
                    onClick={() => setActiveSection('newest')}
                    className={`font-medium rounded-md transition-all ${
                      activeSection === 'newest'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                    style={{
                      padding: `${Math.max(4, 6 * device.spacingScale)}px ${Math.max(8, 10 * device.spacingScale)}px`,
                      fontSize: styles.fontSize.sm
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
                      padding: `${Math.max(4, 6 * device.spacingScale)}px ${Math.max(8, 10 * device.spacingScale)}px`,
                      fontSize: styles.fontSize.sm
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
                      padding: `${Math.max(4, 6 * device.spacingScale)}px ${Math.max(8, 10 * device.spacingScale)}px`,
                      fontSize: styles.fontSize.sm
                    }}
                  >
                    TOP RATED
                  </button>
                </div>
                
                {/* Pagination Controls */}
                <div 
                  className="flex bg-anime-card-bg border border-anime-border rounded-lg"
                  style={{ padding: `${4 * device.spacingScale}px` }}
                >
                  <button 
                    onClick={() => console.log('Previous page')}
                    className="font-medium text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80 transition-all rounded-md cursor-pointer"
                    style={{
                      padding: `${Math.max(4, 6 * device.spacingScale)}px ${Math.max(8, 10 * device.spacingScale)}px`,
                      fontSize: styles.fontSize.sm
                    }}
                  >
                    <i className="fas fa-chevron-left" style={{ fontSize: styles.fontSize.xs }} />
                  </button>
                  <div 
                    className="font-medium text-white bg-anime-primary rounded-md flex items-center justify-center"
                    style={{
                      padding: `${Math.max(4, 6 * device.spacingScale)}px ${Math.max(8, 10 * device.spacingScale)}px`,
                      fontSize: styles.fontSize.sm,
                      minWidth: `${Math.max(24, 32 * device.scaleFactor)}px`
                    }}
                  >
                    1
                  </div>
                  <button 
                    onClick={() => console.log('Next page')}
                    className="font-medium text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80 transition-all rounded-md cursor-pointer"
                    style={{
                      padding: `${Math.max(4, 6 * device.spacingScale)}px ${Math.max(8, 10 * device.spacingScale)}px`,
                      fontSize: styles.fontSize.sm
                    }}
                  >
                    <i className="fas fa-chevron-right" style={{ fontSize: styles.fontSize.xs }} />
                  </button>
                </div>
              </div>
              <div 
                className={`grid ${gridCols}`}
                style={{ gap: styles.spacing.lg }}
              >
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
          <div 
            className={`w-full lg:w-1/4 lg:px-0 lg:pl-4 lg:border-l border-anime-border ${containerPadding}`}
            style={{ paddingLeft: device.isDesktop ? styles.spacing.lg : undefined }}
          >
            <section style={{ marginBottom: styles.spacing['2xl'] }}>
              <h2 
                className="text-anime-primary" 
                style={{ 
                  fontSize: styles.fontSize.lg,
                  marginBottom: styles.spacing.lg,
                  fontWeight: '600'
                }}
              >
                Latest Completed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1" style={{ gap: device.isDesktop ? '0' : styles.spacing.lg }}>
                {completedAnimes.map((anime) => (
                  <AnimeListItem
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    status="Completed"
                  />
                ))}
              </div>
              <a 
                href="#" 
                className="block text-right text-anime-primary"
                style={{ 
                  fontSize: styles.fontSize.sm,
                  marginTop: styles.spacing.sm
                }}
              >
                View All
              </a>
            </section>

            <section style={{ marginBottom: device.isDesktop ? '0' : styles.spacing['2xl'] }}>
              <h2 
                className="text-anime-primary" 
                style={{ 
                  fontSize: styles.fontSize.lg,
                  marginBottom: styles.spacing.lg,
                  fontWeight: '600'
                }}
              >
                Trending Now
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1" style={{ gap: device.isDesktop ? '0' : styles.spacing.lg }}>
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
