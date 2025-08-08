import { useState, useEffect, useRef } from 'react';

const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Romance', 'Sci-Fi', 'Thriller', 'Isekai', 'Demons', 'Game',
  'Josei', 'Kids', 'Cars', 'Ecchi', 'Harem', 'Historical',
  'Mecha', 'Police', 'School', 'Military', 'Psychological',
  'Music', 'Seinen', 'Shounen', 'Shounen Ai', 'Sports', 'Vampire', 'Dementia'
];

export const GenreSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const visibleGenres = 3; // Show 3 genres at a time on mobile
  const totalSlides = Math.ceil(genres.length / visibleGenres);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(nextSlide, 4000); // Change every 4 seconds
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

  const getCurrentGenres = () => {
    const startIndex = currentIndex * visibleGenres;
    return genres.slice(startIndex, startIndex + visibleGenres);
  };

  return (
    <div 
      className="lg:hidden mb-6"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={stopAutoSlide}
      onTouchEnd={startAutoSlide}
    >
      <div className="flex items-center justify-between bg-anime-card-bg border border-anime-border rounded-xl p-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="w-8 h-8 bg-anime-dark-bg border border-anime-border rounded-full flex items-center justify-center text-anime-text-muted hover:text-anime-primary hover:border-anime-primary transition-all duration-200 disabled:opacity-50"
        >
          <i className="fas fa-chevron-left text-xs" />
        </button>

        {/* Genre Pills */}
        <div className="flex-1 mx-3 overflow-hidden">
          <div 
            className={`flex gap-2 transition-transform duration-300 ease-in-out ${
              isTransitioning ? 'transform' : ''
            }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="flex gap-2 flex-shrink-0 w-full justify-center">
                {genres.slice(slideIndex * visibleGenres, (slideIndex + 1) * visibleGenres).map((genre) => (
                  <button
                    key={genre}
                    className="px-3 py-1.5 text-sm font-medium text-anime-text-muted bg-anime-dark-bg border border-anime-border rounded-full hover:text-anime-primary hover:border-anime-primary transition-all duration-200 flex-shrink-0"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="w-8 h-8 bg-anime-dark-bg border border-anime-border rounded-full flex items-center justify-center text-anime-text-muted hover:text-anime-primary hover:border-anime-primary transition-all duration-200 disabled:opacity-50"
        >
          <i className="fas fa-chevron-right text-xs" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-3 gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 300);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-anime-primary'
                : 'bg-anime-border hover:bg-anime-text-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};