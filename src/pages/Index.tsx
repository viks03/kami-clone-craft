import { useState, useCallback, useMemo, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimePagination } from '../components/AnimePagination';
import { ViewModeSelector } from '../components/ViewModeSelector';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { BottomNavigation } from '../components/BottomNavigation';
import { Footer } from '../components/Footer';
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
  const [viewMode, setViewMode] = useState<'classic' | 'card-list' | 'anichart'>(() => {
    return (Cookies.get('animeflow-viewmode') as 'classic' | 'card-list' | 'anichart') || 'classic';
  });
  // bottom nav height handled via CSS var --bottom-nav-h

  // Cookie persistence functions
  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    Cookies.set('animeflow-filter', section, { expires: 365 }); // Remember for 1 year
  }, []);

  const handleViewModeChange = useCallback((mode: 'classic' | 'card-list' | 'anichart') => {
    setViewMode(mode);
    Cookies.set('animeflow-viewmode', mode, { expires: 365 }); // Remember for 1 year
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
      {/* DESKTOP REDESIGN - Top Navigation Bar */}
      <div className="hidden lg:flex fixed top-0 left-0 right-0 z-50 h-16 bg-anime-dark-bg/95 backdrop-blur-xl border-b border-anime-border">
        <div className="flex items-center justify-between w-full px-6">
          {/* Left: Logo + Main Nav */}
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-anime-primary">
              AnimeFlow
            </div>
            <nav className="flex items-center gap-6">
              <button className="text-foreground hover:text-anime-primary transition-colors font-medium">Home</button>
              <button className="text-anime-text-muted hover:text-anime-primary transition-colors font-medium">Trending</button>
              <button className="text-anime-text-muted hover:text-anime-primary transition-colors font-medium">Latest</button>
              <button className="text-anime-text-muted hover:text-anime-primary transition-colors font-medium">Movies</button>
              <button className="text-anime-text-muted hover:text-anime-primary transition-colors font-medium">Random</button>
            </nav>
          </div>
          
          {/* Center: Search */}
          <div className="flex items-center w-full max-w-md h-10 px-4 bg-anime-card-bg border border-anime-border rounded-lg">
            <input
              type="text"
              placeholder="Search thousands of anime..."
              value=""
              className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-anime-text-muted"
            />
            <button className="text-anime-text-muted hover:text-anime-primary transition-colors">
              <i className="fas fa-search text-sm" />
            </button>
          </div>
          
          {/* Right: User Actions */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-lg flex items-center justify-center text-anime-text-muted hover:text-anime-primary transition-colors">
              <i className="fas fa-bell text-sm" />
            </button>
            <button className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-lg flex items-center justify-center text-anime-text-muted hover:text-anime-primary transition-colors">
              <i className="fas fa-bookmark text-sm" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-anime-primary hover:bg-anime-primary/90 text-white rounded-lg transition-colors">
              <i className="fas fa-user-circle text-sm" />
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>

      <Sidebar />
      
      <main className="flex-1 flex flex-col w-full lg:w-full" style={{ paddingBottom: 'calc(var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px))' }}>
        {/* DESKTOP REDESIGN - New Layout Structure */}
        <div className="flex flex-col lg:block flex-1 max-w-full lg:pt-16">
          {/* Mobile Header */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-1 py-4 bg-anime-dark-bg border-b border-anime-border">
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

          {/* DESKTOP HERO SECTION */}
          <div className="hidden lg:block w-full px-8 py-8">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-anime-primary/20 to-anime-secondary/20 border border-anime-border">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
              <div className="relative z-20 p-12">
                <div className="max-w-2xl">
                  <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                    Discover Your Next
                    <span className="block text-anime-primary">Favorite Anime</span>
                  </h1>
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    Stream thousands of anime episodes and movies. From the latest releases to classic series, find your perfect match.
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="px-8 py-3 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg transition-colors">
                      <i className="fas fa-play mr-2" />
                      Start Watching
                    </button>
                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur transition-colors">
                      <i className="fas fa-info-circle mr-2" />
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP MAIN CONTENT GRID */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              {/* Featured Carousel for Desktop */}
              <div className="mb-8">
                <Carousel animes={carouselData} />
              </div>
              
              {/* DESKTOP CONTENT SECTIONS */}
              <div className="space-y-8">
                {/* Filter Tabs for Desktop */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-foreground">Latest Episodes</h2>
                    <div className="w-2 h-2 bg-anime-primary rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex bg-anime-card-bg border border-anime-border rounded-lg p-1">
                      <button
                        onClick={() => handleSectionChange('newest')}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                          activeSection === 'newest'
                            ? 'bg-anime-primary text-white'
                            : 'text-anime-text-muted hover:text-foreground'
                        }`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => handleSectionChange('popular')}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                          activeSection === 'popular'
                            ? 'bg-anime-primary text-white'
                            : 'text-anime-text-muted hover:text-foreground'
                        }`}
                      >
                        Trending
                      </button>
                      <button
                        onClick={() => handleSectionChange('top-rated')}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                          activeSection === 'top-rated'
                            ? 'bg-anime-primary text-white'
                            : 'text-anime-text-muted hover:text-foreground'
                        }`}
                      >
                        Top Rated
                      </button>
                    </div>
                    <ViewModeSelector
                      currentMode={viewMode}
                      onModeChange={handleViewModeChange}
                    />
                    <AnimePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>

                {/* Desktop Anime Grid */}
                {viewMode === 'classic' && (
                  <div className="grid grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                    {currentAnimes.map((anime, index) => (
                      <div
                        key={`${anime.id}-${currentPage}`}
                        className="group cursor-pointer"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: 'both'
                        }}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-anime-card-bg border border-anime-border hover:border-anime-primary/50 transition-all duration-300 hover:shadow-glow">
                          <div className="aspect-[3/4] relative">
                            <img 
                              src={anime.poster} 
                              alt={anime.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button className="w-full py-2 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg text-sm transition-colors">
                                <i className="fas fa-play mr-2" />
                                Watch Now
                              </button>
                            </div>
                            {anime.type && (
                              <div className="absolute top-2 left-2 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                                {anime.type}
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-foreground font-bold text-sm group-hover:text-anime-primary transition-colors line-clamp-2 mb-2">
                              {anime.name}
                            </h3>
                            {anime.episodes && (
                              <div className="flex items-center gap-2 text-xs text-anime-text-muted">
                                <i className="fas fa-closed-captioning" />
                                <span>{String(anime.episodes.sub || anime.episodes.dub || 0)} episodes</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === 'card-list' && (
                  <div className="space-y-4 mb-8">
                    {currentAnimes.map((anime, index) => (
                      <div
                        key={`${anime.id}-${currentPage}`}
                        className="bg-anime-card-bg border border-anime-border rounded-xl p-6 hover:border-anime-primary/30 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex items-center gap-6">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={anime.poster} 
                              alt={anime.name}
                              className="w-24 h-32 rounded-lg object-cover"
                            />
                            {anime.type && (
                              <div className="absolute top-2 left-2 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                                {anime.type}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-anime-primary transition-colors">
                              {anime.name}
                            </h3>
                            <div className="flex items-center gap-4 mb-4">
                              {anime.episodes && (
                                <span className="inline-flex items-center gap-1 text-sm bg-anime-primary/15 text-anime-primary px-3 py-1 rounded-lg">
                                  <i className="fas fa-closed-captioning text-xs" />
                                  {String(anime.episodes.sub || anime.episodes.dub || 0)} episodes
                                </span>
                              )}
                              <div className="flex items-center gap-1 text-sm text-anime-text-muted">
                                <i className="fas fa-star text-yellow-400" />
                                <span>{(Math.random() * 2 + 7).toFixed(1)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="px-6 py-2 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg text-sm transition-colors">
                                <i className="fas fa-play mr-2" />
                                Watch Now
                              </button>
                              <button className="px-6 py-2 bg-anime-card-bg hover:bg-anime-dark-bg text-foreground font-semibold rounded-lg text-sm border border-anime-border transition-colors">
                                <i className="fas fa-plus mr-2" />
                                Add to List
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === 'anichart' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                    {currentAnimes.map((anime, index) => (
                      <div
                        key={`${anime.id}-${currentPage}`}
                        className="bg-anime-card-bg border border-anime-border rounded-2xl overflow-hidden hover:border-anime-primary/30 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex gap-6 p-6">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={anime.poster} 
                              alt={anime.name}
                              className="w-32 h-44 rounded-xl object-cover shadow-lg"
                            />
                            {anime.type && (
                              <div className="absolute top-3 left-3 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
                                {anime.type}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-foreground font-bold text-lg mb-3 group-hover:text-anime-primary transition-colors line-clamp-2">
                              {anime.name}
                            </h3>
                            <div className="space-y-3">
                              {anime.episodes && (
                                <div className="flex items-center gap-2">
                                  <i className="fas fa-closed-captioning text-anime-primary" />
                                  <span className="text-sm text-anime-text-muted">
                                    {String(anime.episodes.sub || anime.episodes.dub || 0)} episodes
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <i className="fas fa-star text-yellow-400" />
                                <span className="text-sm text-anime-text-muted">
                                  {(Math.random() * 2 + 7).toFixed(1)} rating
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-4">
                                <button className="flex-1 py-2 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg text-sm transition-colors">
                                  <i className="fas fa-play mr-2" />
                                  Watch
                                </button>
                                <button className="w-10 h-8 bg-anime-dark-bg hover:bg-anime-dark-bg/80 text-foreground rounded-lg border border-anime-border transition-colors flex items-center justify-center">
                                  <i className="fas fa-plus text-xs" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="lg:col-span-4 lg:space-y-6">
              {/* Quick Stats Card */}
              <div className="bg-gradient-to-br from-anime-primary/10 to-anime-secondary/10 border border-anime-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Your Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-anime-primary">127</div>
                    <div className="text-sm text-anime-text-muted">Watched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-anime-secondary">43</div>
                    <div className="text-sm text-anime-text-muted">Favorites</div>
                  </div>
                </div>
              </div>

              {/* Top Airing Section */}
              <div className="bg-anime-card-bg border border-anime-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-anime-primary to-anime-secondary rounded-full"></div>
                    Top Airing
                  </h3>
                  <button className="text-anime-primary hover:text-anime-secondary transition-colors text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {completedAnimes.slice(0, 4).map((anime, index) => (
                    <div key={anime.id} className="flex items-center gap-3 p-3 bg-anime-dark-bg rounded-lg hover:bg-anime-dark-bg/80 transition-colors cursor-pointer">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={anime.poster} 
                          alt={anime.name}
                          className="w-16 h-20 rounded-md object-cover"
                        />
                        <div className="absolute -top-1 -left-1 w-6 h-6 bg-anime-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-foreground font-semibold text-sm truncate">{anime.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-anime-primary/20 text-anime-primary px-2 py-0.5 rounded">
                            Episode {Math.floor(Math.random() * 12) + 1}
                          </span>
                          <span className="text-xs text-anime-text-muted">
                            {Math.floor(Math.random() * 5) + 1}h ago
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Section */}
              <div className="bg-anime-card-bg border border-anime-border rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-anime-secondary to-anime-primary rounded-full"></div>
                  Coming Soon
                </h3>
                <div className="space-y-3">
                  {popularAnimes.map((anime, index) => (
                    <div key={anime.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-anime-dark-bg/50 transition-colors">
                      <img 
                        src={anime.poster} 
                        alt={anime.name}
                        className="w-12 h-16 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-foreground font-medium text-sm truncate">{anime.name}</h4>
                        <p className="text-xs text-anime-text-muted">
                          Releases in {Math.floor(Math.random() * 7) + 1} days
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE CONTENT - Original Layout */}
          <div className="w-full lg:hidden px-1 pt-20">
            <div className="mb-4">
              <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
            </div>
            
            <Carousel animes={carouselData} />
            
            <section className="recently-updated mb-8">
              {/* Combined Filter Buttons and Pagination */}
              <div className="relative mb-4">
                 <div className="flex items-center bg-anime-card-bg border border-anime-border rounded-lg p-1 relative">
                  {/* Filter Buttons - Scrollable Section */}
                  <div className="flex-1 overflow-x-auto scrollbar-hide relative" id="filter-buttons-container">
                    <div className="flex bg-transparent rounded-lg p-0 gap-0" id="filter-buttons">
                      <button
                        onClick={() => handleSectionChange('newest')}
                        className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all whitespace-nowrap ${
                          activeSection === 'newest'
                            ? 'bg-anime-primary text-white'
                            : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                        }`}
                      >
                        Newest
                      </button>
                      <button
                        onClick={() => handleSectionChange('popular')}
                        className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all whitespace-nowrap ${
                          activeSection === 'popular'
                            ? 'bg-anime-primary text-white'
                            : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                        }`}
                      >
                        Trending
                      </button>
                      <button
                        onClick={() => handleSectionChange('top-rated')}
                        className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all whitespace-nowrap ${
                          activeSection === 'top-rated'
                            ? 'bg-anime-primary text-white'
                            : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                        }`}
                      >
                        Top Rated
                      </button>
                    </div>
                  </div>
                  
                  {/* Smart Fade Shadow - only shows when scrollable and positioned fixed */}
                  <div 
                    id="filter-fade-shadow"
                    className="absolute top-1 right-16 w-8 h-[calc(100%-8px)] bg-gradient-to-l from-anime-card-bg via-anime-card-bg/70 to-transparent pointer-events-none rounded-r-lg opacity-0 transition-opacity duration-300 sm:hidden" 
                  />
                  
                  {/* Subtle scroll indicator when scrollable */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-anime-primary/10 to-transparent rounded-full opacity-0 transition-opacity duration-300" id="scroll-indicator" />
                  
                  {/* Pagination Controls - Fixed */}
                  <div className="flex items-center flex-shrink-0 ml-4">
                    <AnimePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                 </div>
               </div>
               
              {/* View Mode Selector */}
              <div className="mb-4">
                <ViewModeSelector
                  currentMode={viewMode}
                  onModeChange={handleViewModeChange}
                />
              </div>
               
               {/* Render different layouts based on view mode - MOBILE ONLY */}
               {viewMode === 'classic' && (
                 <div className="grid grid-cols-3 gap-4 min-h-[600px] transition-all duration-300">
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
               )}

               {viewMode === 'card-list' && (
                 <div className="space-y-2.5 min-h-[600px] transition-all duration-300">
                   {currentAnimes.map((anime, index) => (
                     <div
                       key={`${anime.id}-${currentPage}`}
                       className="animate-fade-in bg-anime-card-bg border border-anime-border rounded-lg p-3 hover:border-anime-primary/30 transition-all duration-300 group"
                       style={{ 
                         animationDelay: `${index * 50}ms`,
                         animationFillMode: 'both'
                       }}
                     >
                       <div className="flex items-center gap-3">
                         <div className="relative flex-shrink-0">
                           <img 
                             src={anime.poster} 
                             alt={anime.name}
                             className="w-20 h-24 rounded-md object-cover"
                           />
                         </div>
                         
                          <div className="flex-1 min-w-0">
                            <h3 className="text-foreground font-bold text-base sm:text-lg truncate group-hover:text-anime-primary transition-colors">
                              {anime.name}
                            </h3>
                           
                           <div className="flex items-center gap-2 mt-1 text-sm">
                             {anime.type && (
                               <span className="inline-flex items-center px-2 py-0.5 text-xs bg-anime-primary/15 text-anime-primary rounded-md">
                                 {anime.type}
                               </span>
                             )}
                             {anime.episodes && (
                               <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-anime-card-bg/80 rounded-md">
                                 <i className="fas fa-closed-captioning text-[9px]"></i>
                                 <span className="text-anime-text-muted">
                                   {String(anime.episodes.sub || anime.episodes.dub || 0)}
                                 </span>
                               </span>
                             )}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}

               {viewMode === 'anichart' && (
                 <div className="space-y-4 min-h-[600px] transition-all duration-300">
                   {currentAnimes.map((anime, index) => (
                     <div
                       key={`${anime.id}-${currentPage}`}
                       className="animate-fade-in bg-anime-card-bg border border-anime-border rounded-xl overflow-hidden hover:border-anime-primary/30 transition-all duration-300 group"
                       style={{ 
                         animationDelay: `${index * 50}ms`,
                         animationFillMode: 'both'
                       }}
                     >
                       <div className="flex gap-4 p-4">
                         <div className="relative flex-shrink-0">
                           <img 
                             src={anime.poster} 
                             alt={anime.name}
                             className="w-36 h-52 rounded-lg object-cover shadow-lg"
                           />
                           {anime.type && (
                             <div className="absolute top-2 left-2 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                               {anime.type}
                             </div>
                           )}
                         </div>
                         
                          <div className="flex-1 min-w-0">
                            <h3 className="text-foreground font-bold text-xl sm:text-2xl mb-2 group-hover:text-anime-primary transition-colors">
                              {anime.name}
                            </h3>
                           
                           <div className="flex items-center gap-3 flex-wrap text-sm">
                             {anime.episodes && (
                               <span className="inline-flex items-center gap-1 text-anime-text-muted bg-anime-card-bg/80 px-3 py-1 rounded-md">
                                 <i className="fas fa-closed-captioning text-[10px]"></i>
                                 {String(anime.episodes.sub || anime.episodes.dub || 0)} episodes
                               </span>
                             )}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </section>
          </div>

          {/* DESKTOP MAIN CONTENT CONTINUATION */}
          <div className="hidden lg:block lg:col-span-8 px-8">
            {/* Desktop Anime Grid */}
            {viewMode === 'classic' && (
              <div className="grid grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {currentAnimes.map((anime, index) => (
                  <div
                    key={`${anime.id}-${currentPage}`}
                    className="group cursor-pointer"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-anime-card-bg border border-anime-border hover:border-anime-primary/50 transition-all duration-300 hover:shadow-glow">
                      <div className="aspect-[3/4] relative">
                        <img 
                          src={anime.poster} 
                          alt={anime.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="w-full py-2 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg text-sm transition-colors">
                            <i className="fas fa-play mr-2" />
                            Watch Now
                          </button>
                        </div>
                        {anime.type && (
                          <div className="absolute top-2 left-2 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                            {anime.type}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-foreground font-bold text-sm group-hover:text-anime-primary transition-colors line-clamp-2 mb-2">
                          {anime.name}
                        </h3>
                        {anime.episodes && (
                          <div className="flex items-center gap-2 text-xs text-anime-text-muted">
                            <i className="fas fa-closed-captioning" />
                            <span>{String(anime.episodes.sub || anime.episodes.dub || 0)} episodes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'card-list' && (
              <div className="space-y-4 mb-8">
                {currentAnimes.map((anime, index) => (
                  <div
                    key={`${anime.id}-${currentPage}`}
                    className="bg-anime-card-bg border border-anime-border rounded-xl p-6 hover:border-anime-primary/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={anime.poster} 
                          alt={anime.name}
                          className="w-24 h-32 rounded-lg object-cover"
                        />
                        {anime.type && (
                          <div className="absolute top-2 left-2 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-md">
                            {anime.type}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-bold text-xl mb-2 group-hover:text-anime-primary transition-colors">
                          {anime.name}
                        </h3>
                        <div className="flex items-center gap-4 mb-4">
                          {anime.episodes && (
                            <span className="inline-flex items-center gap-1 text-sm bg-anime-primary/15 text-anime-primary px-3 py-1 rounded-lg">
                              <i className="fas fa-closed-captioning text-xs" />
                              {String(anime.episodes.sub || anime.episodes.dub || 0)} episodes
                            </span>
                          )}
                          <div className="flex items-center gap-1 text-sm text-anime-text-muted">
                            <i className="fas fa-star text-yellow-400" />
                            <span>{(Math.random() * 2 + 7).toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="px-6 py-2 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg text-sm transition-colors">
                            <i className="fas fa-play mr-2" />
                            Watch Now
                          </button>
                          <button className="px-6 py-2 bg-anime-card-bg hover:bg-anime-dark-bg text-foreground font-semibold rounded-lg text-sm border border-anime-border transition-colors">
                            <i className="fas fa-plus mr-2" />
                            Add to List
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'anichart' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {currentAnimes.map((anime, index) => (
                  <div
                    key={`${anime.id}-${currentPage}`}
                    className="bg-anime-card-bg border border-anime-border rounded-2xl overflow-hidden hover:border-anime-primary/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex gap-6 p-6">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={anime.poster} 
                          alt={anime.name}
                          className="w-32 h-44 rounded-xl object-cover shadow-lg"
                        />
                        {anime.type && (
                          <div className="absolute top-3 left-3 bg-anime-primary text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {anime.type}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-bold text-lg mb-3 group-hover:text-anime-primary transition-colors line-clamp-2">
                          {anime.name}
                        </h3>
                        <div className="space-y-3">
                          {anime.episodes && (
                            <div className="flex items-center gap-2">
                              <i className="fas fa-closed-captioning text-anime-primary" />
                              <span className="text-sm text-anime-text-muted">
                                {String(anime.episodes.sub || anime.episodes.dub || 0)} episodes
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <i className="fas fa-star text-yellow-400" />
                            <span className="text-sm text-anime-text-muted">
                              {(Math.random() * 2 + 7).toFixed(1)} rating
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-4">
                            <button className="flex-1 py-2 bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold rounded-lg text-sm transition-colors">
                              <i className="fas fa-play mr-2" />
                              Watch
                            </button>
                            <button className="w-10 h-8 bg-anime-dark-bg hover:bg-anime-dark-bg/80 text-foreground rounded-lg border border-anime-border transition-colors flex items-center justify-center">
                              <i className="fas fa-plus text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MOBILE RIGHT SECTION - Original */}
          <div className="w-full lg:hidden px-1">

            {/* Top Airing Section - MOBILE ONLY */}
            <section className="top-airing mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-anime-primary to-purple-500 rounded-full"></div>
                  Top Airing
                </h2>
                <button className="text-anime-primary hover:text-purple-400 transition-colors text-sm font-medium">
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
                              <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                Airing
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <i className="fas fa-tv text-[8px]"></i>
                                {randomType}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <i className="fas fa-calendar text-[8px]"></i>
                                {randomYear}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
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
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Upcoming
                </h2>
                <button className="text-orange-500 hover:text-amber-400 transition-colors text-sm font-medium">
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
                    const totalEp = Math.floor(Math.random() * 12) + 12;
                    
                    return (
                      <div key={anime.id} className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-anime-dark-bg/30 border border-anime-border/30 hover:border-orange-500/30 transition-all duration-300 hover:bg-orange-500/5">
                          <div className="relative">
                            <img 
                              src={anime.poster} 
                              alt={anime.name}
                              className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-orange-500 transition-colors">{anime.name}</p>
                            <div className="flex items-center gap-1.5 mt-1 flex-nowrap overflow-x-auto scrollbar-hide">
                              <span className="inline-flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                                Upcoming
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <i className="fas fa-tv text-[8px]"></i>
                                {randomType}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                <i className="fas fa-calendar text-[8px]"></i>
                                {randomYear}
                              </span>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 hover:text-amber-400">
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
    </div>
  );
};

export default Index;
