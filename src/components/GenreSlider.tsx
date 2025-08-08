import { useState, useEffect, useRef } from 'react';

const genres = [
  'Action', 'Dementia', 'Fantasy', 'Isekai', 'Adventure', 'Demons', 'Game',
  'Josei', 'Kids', 'Cars', 'Drama', 'Comedy', 'Ecchi', 'Harem', 'Historical',
  'Horror', 'Mecha', 'Police', 'School', 'Military', 'Psychological', 'Sci-Fi',
  'Music', 'Seinen', 'Shounen', 'Shounen Ai', 'Sports', 'Vampire'
];

export const GenreSlider = () => {
  // Start from Historical (index 14) which is roughly in the middle
  const [currentIndex, setCurrentIndex] = useState(14);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % genres.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + genres.length) % genres.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(nextSlide, 3000); // Change every 3 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const getVisibleGenres = () => {
    const prevIndex = (currentIndex - 1 + genres.length) % genres.length;
    const nextIndex = (currentIndex + 1) % genres.length;
    
    return {
      prev: genres[prevIndex],
      current: genres[currentIndex],
      next: genres[nextIndex]
    };
  };

  const visibleGenres = getVisibleGenres();

  return (
    <div 
      className="lg:hidden mb-6"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={stopAutoSlide}
      onTouchEnd={startAutoSlide}
    >
      <div className="flex items-center justify-between bg-anime-card-bg border border-anime-border rounded-xl p-3 sm:p-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-anime-dark-bg border border-anime-border rounded-full flex items-center justify-center text-anime-text-muted hover:text-anime-primary hover:border-anime-primary transition-all duration-200 disabled:opacity-50 flex-shrink-0"
        >
          <i className="fas fa-chevron-left text-xs" />
        </button>

        {/* Genre Display */}
        <div className="flex-1 mx-2 sm:mx-4 overflow-hidden">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {/* Previous Genre */}
            <div className="text-xs sm:text-sm font-medium text-anime-text-muted bg-anime-dark-bg/50 border border-anime-border/50 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 opacity-60 flex-shrink-0 max-w-[25%] truncate">
              {visibleGenres.prev}
            </div>

            {/* Current Genre (Center/Featured) */}
            <div className="text-sm sm:text-base font-bold text-white bg-anime-primary border border-anime-primary rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg transform scale-105 flex-shrink-0 max-w-[40%] truncate text-center">
              {visibleGenres.current}
            </div>

            {/* Next Genre */}
            <div className="text-xs sm:text-sm font-medium text-anime-text-muted bg-anime-dark-bg/50 border border-anime-border/50 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 opacity-60 flex-shrink-0 max-w-[25%] truncate">
              {visibleGenres.next}
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-anime-dark-bg border border-anime-border rounded-full flex items-center justify-center text-anime-text-muted hover:text-anime-primary hover:border-anime-primary transition-all duration-200 disabled:opacity-50 flex-shrink-0"
        >
          <i className="fas fa-chevron-right text-xs" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-2">
        <div className="text-xs text-anime-text-muted">
          {currentIndex + 1} / {genres.length}
        </div>
      </div>
    </div>
  );
};