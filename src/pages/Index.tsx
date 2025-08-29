
import { useState, useCallback, useMemo, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimePagination } from '../components/AnimePagination';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { BottomNavigation } from '../components/BottomNavigation';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { animeData } from '../data/animeData';
import { usePaginatedAnimes } from '../hooks/usePaginatedAnimes';
import { useScrollPosition } from '../hooks/useScrollPosition';

const Index = () => {
  // Initialize scroll position preservation
  useScrollPosition();

  // Initialize state from cookies with fallbacks
  const [activeSection, setActiveSection] = useState(() => {
    return Cookies.get('animeflow-filter') || 'newest';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cookie persistence functions
  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    Cookies.set('animeflow-filter', section, { expires: 365 }); // Remember for 1 year
  }, []);

  const handleSearch = useCallback((query: string) => {
    console.log(`Searching for: ${query}`);
  }, []);

  // Memoize static data slices to prevent unnecessary recalculations
  const carouselData = useMemo(() => animeData.spotlightAnimes, []);
  const allLatestAnimes = useMemo(() => animeData.latestEpisodeAnimes, []);
  const completedAnimes = useMemo(() => animeData.latestCompletedAnimes, []);
  const popularAnimes = useMemo(() => animeData.mostPopularAnimes.slice(0, 2), []);

  // Use pagination hook for anime cards
  const {
    currentPage,
    totalPages,
    currentAnimes,
    setCurrentPage,
  } = usePaginatedAnimes({ animes: allLatestAnimes, itemsPerPage: 15 });

  // Dynamically calculate bottom navigation height and update content padding
  useEffect(() => {
    const root = document.documentElement;
    const setVar = (px: number) => {
      root.style.setProperty('--bottom-nav-h', `${px}px`);
    };

    const update = () => {
      const bottomNav = document.querySelector('#bottom-navigation') as HTMLElement | null;
      if (bottomNav && window.innerWidth < 1024) {
        const height = bottomNav.getBoundingClientRect().height || 0;
        setVar(height + 16); // buffer for visual spacing
      } else {
        setVar(0);
      }
    };

    // Initial measurement
    update();

    // Observe nav size only (more performant than body-wide MutationObserver)
    const bottomNavEl = document.querySelector('#bottom-navigation') as HTMLElement | null;
    const ro = bottomNavEl ? new ResizeObserver(() => update()) : null;
    if (bottomNavEl && ro) ro.observe(bottomNavEl);

    // Update on viewport resize
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      if (bottomNavEl && ro) ro.disconnect();
    };
  }, []);

  // Smart shadow visibility for filter buttons
  useEffect(() => {
    const checkScrollability = () => {
      const container = document.getElementById('filter-buttons-container');
      const buttons = document.getElementById('filter-buttons');
      const shadow = document.getElementById('filter-fade-shadow');
      const scrollIndicator = document.getElementById('scroll-indicator');
      
      if (container && buttons && shadow && window.innerWidth < 640) {
        const containerWidth = container.offsetWidth;
        const buttonsWidth = buttons.scrollWidth;
        const isScrollable = buttonsWidth > containerWidth;
        
        // Show shadow only if content is scrollable
        shadow.style.opacity = isScrollable ? '1' : '0';
        if (scrollIndicator) {
          scrollIndicator.style.opacity = isScrollable ? '1' : '0';
        }
      } else if (shadow) {
        shadow.style.opacity = '0';
        if (scrollIndicator) {
          scrollIndicator.style.opacity = '0';
        }
      }
    };

    // Check on mount and resize
    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    return () => {
      window.removeEventListener('resize', checkScrollability);
    };
  }, [activeSection]);

  return (
    <div className="flex min-h-screen font-karla">
      <Sidebar />
      
      <main className="flex-1 flex flex-col w-full" style={{ paddingBottom: 'calc(var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex flex-col lg:flex-row flex-1 max-w-full">
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-anime-dark-bg border-b border-anime-border" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>
            <div className="text-xl font-bold text-anime-primary">
              AnimeFlow
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-foreground hover:text-anime-primary transition-colors"
              >
                <i className="fas fa-search text-sm" />
              </button>
              <div className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center">
                <NotificationDrawer>
                  <i className="fas fa-bell text-sm cursor-pointer hover:text-anime-primary transition-colors text-foreground" />
                </NotificationDrawer>
              </div>
              <button className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-foreground hover:text-anime-primary transition-colors">
                <i className="fas fa-user-circle text-sm" />
              </button>
            </div>
          </div>

          {/* Left Section */}
          <div className="w-full lg:w-3/4 lg:pr-4 px-4 lg:px-0 lg:pt-0 pt-20" style={{ paddingLeft: 'max(0.25rem, env(safe-area-inset-left))', paddingRight: 'max(0.25rem, env(safe-area-inset-right))' }}>
            <div className="hidden lg:block">
              <Header onSearch={handleSearch} />
            </div>
            
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
            </div>
            
            <Carousel animes={carouselData} />
            
            <section className="recently-updated mb-8">
              {/* Redesigned Filter and Pagination Section */}
              <div className="mb-6">
                <div className="flex items-center bg-anime-card-bg/80 border border-anime-border rounded-xl p-2 backdrop-blur-sm shadow-sm">
                  {/* Filter Buttons - Scrollable Section */}
                  <div className="flex-1 overflow-x-auto scrollbar-hide relative" id="filter-buttons-container">
                    <div className="flex bg-transparent rounded-lg p-0 gap-1" id="filter-buttons">
                      <button
                        onClick={() => handleSectionChange('newest')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                          activeSection === 'newest'
                            ? 'bg-anime-primary text-white shadow-md'
                            : 'text-anime-text-muted hover:text-foreground hover:bg-anime-primary/10'
                        }`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => handleSectionChange('popular')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                          activeSection === 'popular'
                            ? 'bg-anime-primary text-white shadow-md'
                            : 'text-anime-text-muted hover:text-foreground hover:bg-anime-primary/10'
                        }`}
                      >
                        Trending
                      </button>
                      <button
                        onClick={() => handleSectionChange('top-rated')}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                          activeSection === 'top-rated'
                            ? 'bg-anime-primary text-white shadow-md'
                            : 'text-anime-text-muted hover:text-foreground hover:bg-anime-primary/10'
                        }`}
                      >
                        Top Rated
                      </button>
                    </div>
                  </div>
                  
                  {/* Smart Fade Shadow - only shows when scrollable and positioned fixed */}
                  <div 
                    id="filter-fade-shadow"
                    className="absolute top-2 right-20 w-8 h-[calc(100%-16px)] bg-gradient-to-l from-anime-card-bg/80 via-anime-card-bg/60 to-transparent pointer-events-none rounded-r-xl opacity-0 transition-opacity duration-300 sm:hidden" 
                  />
                  
                  {/* Redesigned Pagination - Unified Element */}
                  <div className="flex items-center flex-shrink-0 ml-4">
                    <AnimePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
               
              {/* Classic Layout Only */}
              <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 min-h-[600px] transition-all duration-300">
                {currentAnimes.map((anime, index) => (
                  <div
                    key={`${anime.id}-${currentPage}`}
                    className="animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <AnimeCard
                      name={anime.name}
                      poster={anime.poster}
                      episodes={anime.episodes}
                      type={anime.type}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/4 px-4 lg:px-0 lg:pl-4 lg:border-l border-anime-border" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>

            {/* Top Airing Section */}
            <section className="top-airing mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-anime-primary rounded-full"></div>
                  Top Airing
                </h2>
                <button className="text-anime-primary hover:text-anime-secondary transition-colors text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-anime-card-bg to-anime-card-bg/50 border border-anime-border/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-4">
                  {completedAnimes.slice(0, 5).map((anime, index) => {
                    const animeTypes = ['TV', 'ONA', 'OVA', 'Movie', 'Special'];
                    const years = ['2024', '2023', '2025', '2022', '2021'];
                    const randomType = animeTypes[index % animeTypes.length];
                    const randomYear = years[index % years.length];
                    const currentEp = Math.floor(Math.random() * 12) + 1;
                    const totalEp = Math.floor(Math.random() * 12) + 12;
                    
                    return (
                      <div key={anime.id} className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-anime-dark-bg/30 border border-anime-border/30 hover:border-anime-primary/30 transition-all duration-300 hover:bg-anime-primary/5">
                          <div className="relative">
                            <img 
                              src={anime.poster} 
                              alt={anime.name}
                              className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-anime-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-anime-primary transition-colors">{anime.name}</p>
                            <div className="flex items-center gap-1.5 mt-1 flex-nowrap overflow-x-auto scrollbar-hide">
                              <span className="inline-flex items-center gap-1 text-xs text-anime-primary bg-anime-primary/15 px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-primary/20">
                                <div className="w-1.5 h-1.5 bg-anime-primary rounded-full animate-pulse"></div>
                                Airing
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-anime-text-muted bg-anime-card-bg px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-border">
                                <i className="fas fa-tv text-[8px]"></i>
                                {randomType}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-anime-text-muted bg-anime-card-bg px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-border">
                                <i className="fas fa-calendar text-[8px]"></i>
                                {randomYear}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-anime-text-muted bg-anime-card-bg px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-border">
                                <i className="fas fa-closed-captioning text-[8px]"></i>
                                {currentEp}/{totalEp}
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-anime-primary hover:text-purple-400">
                            <i className="fas fa-play text-sm"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="upcoming mb-6 lg:mb-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-anime-secondary rounded-full"></div>
                  Upcoming
                </h2>
                <button className="text-anime-secondary hover:text-anime-primary transition-colors text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-anime-card-bg to-anime-card-bg/50 border border-anime-border/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-4">
                  {[...popularAnimes, ...allLatestAnimes.slice(0, 3)].slice(0, 5).map((anime, index) => {
                    const animeTypes = ['TV', 'ONA', 'OVA', 'Movie', 'Special'];
                    const years = ['2025', '2026', '2024', '2027', '2025'];
                    const randomType = animeTypes[index % animeTypes.length];
                    const randomYear = years[index % years.length];
                    
                    return (
                      <div key={anime.id} className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-anime-dark-bg/30 border border-anime-border/30 hover:border-anime-secondary/30 transition-all duration-300 hover:bg-anime-secondary/5">
                          <div className="relative">
                            <img 
                              src={anime.poster} 
                              alt={anime.name}
                              className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-anime-secondary text-white text-xs font-bold rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-anime-secondary transition-colors">{anime.name}</p>
                            <div className="flex items-center gap-1.5 mt-1 flex-nowrap overflow-x-auto scrollbar-hide">
                              <span className="inline-flex items-center gap-1 text-xs text-anime-secondary bg-anime-secondary/15 px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-secondary/20">
                                <div className="w-1.5 h-1.5 bg-anime-secondary rounded-full animate-pulse"></div>
                                Upcoming
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-anime-text-muted bg-anime-card-bg px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-border">
                                <i className="fas fa-tv text-[8px]"></i>
                                {randomType}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-anime-text-muted bg-anime-card-bg px-2.5 py-1 rounded-full flex-shrink-0 font-medium border border-anime-border">
                                <i className="fas fa-calendar text-[8px]"></i>
                                {randomYear}
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-anime-secondary hover:text-anime-primary">
                            <i className="fas fa-play text-sm"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
        
        {/* Footer spans full width */}
        <Footer />
        
      </main>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation id="bottom-navigation" />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
