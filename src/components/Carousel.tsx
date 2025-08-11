import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SpotlightAnime } from '../data/animeData';
import { useCarouselColors } from '../hooks/useCarouselColors';

interface CarouselProps {
  animes: SpotlightAnime[];
}

export const Carousel = ({ animes }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use new carousel-specific color extraction
  const imageUrls = useMemo(() => animes.map(anime => anime.poster), [animes]);
  const { getColor } = useCarouselColors(imageUrls);

  const intervalTime = useMemo(() => 6000, []);

  const showSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const totalSlides = animes.length;
    const newIndex = (index + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    
    // Reset and start progress bar
    setProgressWidth(0);
    const progressTimeout = setTimeout(() => {
      setProgressWidth(100);
    }, 50);

    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(transitionTimeout);
    };
  }, [isTransitioning, animes.length]);

  const startCarousel = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % animes.length);
    }, intervalTime);
  }, [animes.length, intervalTime]);

  const navigateToSlide = useCallback((index: number) => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    showSlide(index);
    startCarousel();
  }, [showSlide, startCarousel]);

  // Derived values
  const currentAnime = useMemo(() => 
    animes?.[currentIndex], 
  [animes, currentIndex]);

  // Get smooth color with transparency
  const dynamicColor = useMemo(() => {
    if (!currentAnime) return 'rgba(255, 255, 255, 0.9)';
    const baseColor = getColor(currentAnime.poster);
    // Add transparency to make it smoother
    return baseColor.replace('hsl(', 'hsla(').replace(')', ', 0.85)');
  }, [currentAnime, getColor]);

  // Start carousel and progress on mount
  useEffect(() => {
    setCurrentIndex(0);
    setProgressWidth(0);

    // Start progress bar and carousel
    setTimeout(() => {
      setProgressWidth(100);
    }, 50);
    startCarousel();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      if (progressRef.current) {
        clearTimeout(progressRef.current);
      }
    };
  }, [startCarousel, animes]);

  // Handle progress bar and transitions when currentIndex changes
  useEffect(() => {
    setProgressWidth(0);
    setTimeout(() => {
      setProgressWidth(100);
    }, 50);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [currentIndex]);

  const iconClasses = useMemo(() => 
    ['fas fa-play', 'fas fa-clock', 'fas fa-calendar', 'fas fa-star'], 
  []);
  
  const getIconClass = useCallback((index: number) => 
    iconClasses[index] || 'fas fa-info',
  [iconClasses]);

  // moved to top for TDZ safety

  if (!animes || animes.length === 0) return null;

  return (
    <section 
      className="relative h-[250px] sm:h-[350px] lg:h-[450px] mb-4 lg:mb-6 rounded-[10px] overflow-hidden"
      onMouseEnter={() => setProgressVisible(true)}
      onMouseLeave={() => setProgressVisible(false)}
    >
      <div className="w-full h-full relative">
        {animes.map((anime, index) => (
          <div
            key={anime.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out cursor-grab active:cursor-grabbing ${
              index === currentIndex ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'
            }`}
            style={{ backgroundImage: `url('${anime.poster}')` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            
            <div className={`relative p-4 sm:p-6 lg:p-8 max-w-[600px] h-full flex flex-col justify-start transition-all duration-200 ease-out ${
              index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              {/* Banner Info */}
              <div 
                className="inline-flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 bg-black/60 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-[30px] border text-xs sm:text-base w-fit max-w-[280px] sm:max-w-fit transition-all duration-500"
                style={{ 
                  borderColor: index === currentIndex ? dynamicColor.replace('0.85', '0.6') : 'rgba(255, 255, 255, 0.2)'
                }}
              >
                {anime.otherInfo.slice(0, 3).map((info, infoIndex) => (
                  <span key={infoIndex} className="flex items-center gap-1 text-white">
                    <i 
                      className={`${getIconClass(infoIndex)} text-xs sm:text-sm flex-shrink-0 transition-colors duration-500`}
                      style={{ 
                        color: index === currentIndex ? dynamicColor : 'rgba(255, 255, 255, 0.7)'
                      }}
                    />
                    <span className="text-xs sm:text-base whitespace-nowrap">{info}</span>
                    {infoIndex < Math.min(anime.otherInfo.length - 1, 2) && (
                      <span 
                        className="ml-1 sm:ml-2 text-xs sm:text-sm font-bold transition-colors duration-500"
                        style={{ 
                          color: index === currentIndex ? dynamicColor : 'rgba(255, 255, 255, 0.7)'
                        }}
                      >•</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Title with smooth transparent color */}
              <h1 
                className="text-xl sm:text-2xl lg:text-4xl font-extrabold mb-2 cursor-default truncate sm:line-clamp-2 transition-all duration-500 ease-out"
                style={{ 
                  color: index === currentIndex ? dynamicColor : 'rgba(255, 255, 255, 0.9)',
                }}
              >
                {anime.name}
              </h1>

              {/* Description */}
              <div className="mb-4 sm:mb-4 max-w-[200px] sm:max-w-none">
                <div className="relative bg-anime-secondary/15 rounded-xl px-3 py-2 border border-anime-secondary/25">
                  <div 
                    className="text-xs sm:text-sm leading-5 sm:leading-6 text-white"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {anime.description}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8">
                <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm rounded-[30px] bg-black bg-opacity-50 border border-transparent transition-all duration-500 ease-in-out hover:border-white text-white cursor-pointer">
                  <i className="fas fa-info-circle text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Detail</span>
                  <span className="sm:hidden">Info</span>
                </button>
                <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-sm rounded-[30px] bg-black bg-opacity-50 border border-transparent transition-all duration-500 ease-in-out hover:border-white text-white cursor-pointer">
                  <i className="fas fa-play text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Watch Now</span>
                  <span className="sm:hidden">Watch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        className="absolute top-2 sm:top-[10px] right-14 sm:right-[70px] w-9 h-9 sm:w-11 sm:h-11 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-sm leading-6 sm:leading-[30px] text-center rounded-md transition-all duration-300 hover:bg-black/80 hover:border-white/40 hover:shadow-lg cursor-pointer z-[3]"
        onClick={() => navigateToSlide(currentIndex - 1)}
      >
        <i className="fas fa-chevron-left text-sm sm:text-base" />
      </button>
      
      <button
        className="absolute top-2 sm:top-[10px] right-2 sm:right-[10px] w-9 h-9 sm:w-11 sm:h-11 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-sm leading-6 sm:leading-[30px] text-center rounded-md transition-all duration-300 hover:bg-black/80 hover:border-white/40 hover:shadow-lg cursor-pointer z-[3]"
        onClick={() => navigateToSlide(currentIndex + 1)}
      >
        <i className="fas fa-chevron-right text-sm sm:text-base" />
      </button>

      {/* Progress Indicator Bar */}
      <div className={`absolute left-0 w-full h-1 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-[3] 
        bottom-0 lg:bottom-0
        opacity-100 ${progressVisible ? 'lg:opacity-100' : 'lg:opacity-0'}
      `}>
        <div 
          className="h-full transition-all ease-linear"
          style={{ 
            width: `${progressWidth}%`,
            background: currentAnime ? getColor(currentAnime.poster) : 'rgba(255, 255, 255, 0.7)',
            transitionDuration: progressWidth === 0 ? '0ms' : `${intervalTime}ms`
          }}
        />
      </div>
    </section>
  );
};