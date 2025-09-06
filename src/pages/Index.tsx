import { useState, useCallback, useMemo, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DesktopHeader } from '../components/DesktopHeader';
import { GenreNavigation } from '../components/GenreNavigation';
import { Carousel } from '../components/Carousel';
import { EnhancedCarousel } from '../components/EnhancedCarousel';
import { AnimeCard } from '../components/AnimeCard';
import { ModernAnimeGrid } from '../components/ModernAnimeGrid';
import { AnimePagination } from '../components/AnimePagination';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { BottomNavigation } from '../components/BottomNavigation';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { TopAiringSidebar } from '../components/TopAiringSidebar';
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
  // bottom nav height handled via CSS var --bottom-nav-h

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

  // Dynamically calculate bottom navigation height and mobile header height
  useEffect(() => {
    const root = document.documentElement;
    const setBottomNavVar = (px: number) => {
      root.style.setProperty('--bottom-nav-h', `${px}px`);
    };
    const setMobileHeaderVar = (px: number) => {
      root.style.setProperty('--mobile-header-h', `${px}px`);
    };

    const updateBottomNav = () => {
      const bottomNav = document.querySelector('#bottom-navigation') as HTMLElement | null;
      if (bottomNav && window.innerWidth < 1024) {
        const height = bottomNav.getBoundingClientRect().height || 0;
        setBottomNavVar(height + 16); // buffer for visual spacing
      } else {
        setBottomNavVar(0);
      }
    };

    const updateMobileHeader = () => {
      const mobileHeader = document.querySelector('#mobile-header') as HTMLElement | null;
      if (mobileHeader) {
        const height = mobileHeader.getBoundingClientRect().height || 56;
        setMobileHeaderVar(height);
      } else {
        setMobileHeaderVar(56); // fallback
      }
    };

    const updateAll = () => {
      updateBottomNav();
      updateMobileHeader();
    };

    // Initial measurements
    updateAll();

    // Observe both elements for size changes
    const bottomNavEl = document.querySelector('#bottom-navigation') as HTMLElement | null;
    const mobileHeaderEl = document.querySelector('#mobile-header') as HTMLElement | null;
    
    const roBottomNav = bottomNavEl ? new ResizeObserver(() => updateBottomNav()) : null;
    const roMobileHeader = mobileHeaderEl ? new ResizeObserver(() => updateMobileHeader()) : null;
    
    if (bottomNavEl && roBottomNav) roBottomNav.observe(bottomNavEl);
    if (mobileHeaderEl && roMobileHeader) roMobileHeader.observe(mobileHeaderEl);

    // Update on viewport resize
    window.addEventListener('resize', updateAll);

    return () => {
      window.removeEventListener('resize', updateAll);
      if (bottomNavEl && roBottomNav) roBottomNav.disconnect();
      if (mobileHeaderEl && roMobileHeader) roMobileHeader.disconnect();
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

  // Header shadow effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('mobile-header');
      if (header) {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        } else {
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen font-karla">
      {/* Desktop Sidebar - Only show on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full" style={{ paddingBottom: 'calc(var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px))' }}>
        
        {/* Desktop Header */}
        <DesktopHeader onSearch={handleSearch} />
        
        {/* Desktop Genre Navigation */}
        <GenreNavigation />

        {/* Mobile Layout (< 768px) - Keep existing design */}
        <div className="lg:hidden">
          <div className="flex flex-col lg:flex-row flex-1 max-w-full">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-3 bg-anime-dark-bg transition-shadow duration-200" id="mobile-header">
              <div className="text-xl font-bold text-anime-primary">
                AnimeFlow
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-anime-text hover:text-anime-primary transition-colors"
                >
                  <i className="fas fa-search text-sm" />
                </button>
                <div className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center">
                  <NotificationDrawer>
                    <i className="fas fa-bell text-sm cursor-pointer hover:text-anime-primary transition-colors text-anime-text" />
                  </NotificationDrawer>
                </div>
                <button className="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-anime-text hover:text-anime-primary transition-colors">
                  <i className="fas fa-user-circle text-sm" />
                </button>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="w-full px-2.5" style={{ paddingTop: 'var(--mobile-header-h, 56px)' }}>
              {/* Mobile Search */}
              <div className="mb-0">
                <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
              </div>
              
              <div className="mt-[1px]">
                <Carousel animes={carouselData} />
              </div>
              
              <div className="mt-4">
                <section className="recently-updated mb-8">
                  {/* Mobile Filter Buttons and Pagination - Keep existing design */}
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
                   
                   {/* Mobile Grid Layout */}
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
                 </section>
               </div>
            </div>
          </div>
        </div>

        {/* Desktop & Tablet Layout (≥ 768px) */}
        <div className="hidden lg:block flex-1">
          <div className="flex">
            {/* Main Content Area */}
            <div className="flex-1 px-6 py-6 space-y-8">
              {/* Enhanced Hero Carousel for Desktop */}
              <EnhancedCarousel animes={carouselData} />
              
              {/* Desktop Filter Tabs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 bg-anime-card-bg/50 p-1 rounded-xl border border-anime-border/30">
                  <button
                    onClick={() => handleSectionChange('newest')}
                    className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      activeSection === 'newest'
                        ? 'bg-anime-primary text-white shadow-lg'
                        : 'text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/50'
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => handleSectionChange('popular')}
                    className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      activeSection === 'popular'
                        ? 'bg-anime-primary text-white shadow-lg'
                        : 'text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/50'
                    }`}
                  >
                    Trending
                  </button>
                  <button
                    onClick={() => handleSectionChange('top-rated')}
                    className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      activeSection === 'top-rated'
                        ? 'bg-anime-primary text-white shadow-lg'
                        : 'text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/50'
                    }`}
                  >
                    Top Rated
                  </button>
                </div>
                
                {/* Desktop Pagination */}
                <AnimePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
              
              {/* Modern Anime Grid for Desktop */}
              <ModernAnimeGrid animes={currentAnimes} />
            </div>
            
            {/* Top Airing Sidebar */}
            <TopAiringSidebar animes={[...popularAnimes, ...allLatestAnimes.slice(0, 6)]} />
          </div>
        </div>
        
        {/* Footer spans full width */}
        <div className="px-2.5">
          <Footer />
        </div>
        
      </main>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation id="bottom-navigation" />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
