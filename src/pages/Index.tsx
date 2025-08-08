import { useState, useCallback, useMemo, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeListItem } from '../components/AnimeListItem';
import { NotificationDrawer } from '../components/NotificationDrawer';
import { BottomNavigation } from '../components/BottomNavigation';
import { MobileFooter } from '../components/MobileFooter';
import { animeData } from '../data/animeData';

const Index = () => {
  const [activeSection, setActiveSection] = useState('newest');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // bottom nav height handled via CSS var --bottom-nav-h

  const handleSearch = useCallback((query: string) => {
    console.log(`Searching for: ${query}`);
  }, []);

  // Memoize static data slices to prevent unnecessary recalculations
  const carouselData = useMemo(() => animeData.spotlightAnimes, []);
  const latestAnimes = useMemo(() => animeData.latestEpisodeAnimes.slice(0, 9), []);
  const completedAnimes = useMemo(() => animeData.latestCompletedAnimes, []);
  const popularAnimes = useMemo(() => animeData.mostPopularAnimes.slice(0, 2), []);

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

  return (
    <div className="flex min-h-screen font-karla">
      <Sidebar />
      
      <main className="flex-1 lg:ml-0 flex flex-col" style={{ paddingBottom: 'calc(var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex flex-col lg:flex-row lg:pl-4 flex-1">
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
          <div className="w-full lg:w-3/4 lg:pr-4 px-4 lg:px-0 lg:pt-0 pt-20 lg:pb-0">
            <div className="hidden lg:block">
              <Header onSearch={handleSearch} />
            </div>
            
            {/* Mobile Search */}
            <div className="lg:hidden mb-4">
              <Header onSearch={handleSearch} isSearchOpen={isSearchOpen} />
            </div>
            
            <Carousel animes={carouselData} />
            
            <section className="recently-updated mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex bg-anime-card-bg border border-anime-border rounded-lg p-1">
                  <button
                    onClick={() => setActiveSection('newest')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeSection === 'newest'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                  >
                    NEWEST
                  </button>
                  <button
                    onClick={() => setActiveSection('popular')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeSection === 'popular'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                  >
                    POPULAR
                  </button>
                  <button
                    onClick={() => setActiveSection('top-rated')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeSection === 'top-rated'
                        ? 'bg-anime-primary text-white'
                        : 'text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80'
                    }`}
                  >
                    TOP RATED
                  </button>
                </div>
                
                {/* Pagination Controls */}
                <div className="flex bg-anime-card-bg border border-anime-border rounded-lg p-1">
                  <button 
                    onClick={() => console.log('Previous page')}
                    className="px-3 py-1.5 text-sm font-medium text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80 transition-all rounded-md cursor-pointer"
                  >
                    <i className="fas fa-chevron-left text-xs" />
                  </button>
                  <div className="px-3 py-1.5 text-sm font-medium text-white bg-anime-primary rounded-md min-w-[32px] flex items-center justify-center">
                    1
                  </div>
                  <button 
                    onClick={() => console.log('Next page')}
                    className="px-3 py-1.5 text-sm font-medium text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80 transition-all rounded-md cursor-pointer"
                  >
                    <i className="fas fa-chevron-right text-xs" />
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
          <div className="w-full lg:w-1/4 px-4 lg:px-0 lg:pl-4 lg:pr-4 lg:border-l border-anime-border">

            {/* Top Airing Section */}
            <section className="top-airing mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
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
                            <p className="text-sm font-medium text-white truncate group-hover:text-anime-primary transition-colors">{anime.name}</p>
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
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                  Upcoming
                </h2>
                <button className="text-orange-500 hover:text-amber-400 transition-colors text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-anime-card-bg to-anime-card-bg/50 border border-anime-border/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-4">
                  {[...popularAnimes, ...latestAnimes.slice(0, 3)].slice(0, 5).map((anime, index) => {
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
                            <p className="text-sm font-medium text-white truncate group-hover:text-orange-500 transition-colors">{anime.name}</p>
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
        <MobileFooter />
      </main>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation id="bottom-navigation" />
    </div>
  );
};

export default Index;
