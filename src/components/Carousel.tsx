import { useState, useEffect, useRef } from 'react';
import { SpotlightAnime } from '../data/animeData';

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

  const intervalTime = 6000;

  const showSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const totalSlides = animes.length;
    const newIndex = (index + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    
    // Reset and start progress bar
    setProgressWidth(0);
    setTimeout(() => {
      setProgressWidth(100);
    }, 50);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const startCarousel = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    
    autoSlideRef.current = setInterval(() => {
      if (!isTransitioning) {
        showSlide(currentIndex + 1);
      }
    }, intervalTime);
  };

  const navigateToSlide = (index: number) => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    showSlide(index);
    startCarousel();
  };

  useEffect(() => {
    showSlide(0);
    startCarousel();
    
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      if (progressRef.current) {
        clearTimeout(progressRef.current);
      }
    };
  }, []);

  const getIconClass = (index: number) => {
    const icons = ['fas fa-play', 'fas fa-clock', 'fas fa-calendar', 'fas fa-star'];
    return icons[index] || 'fas fa-info';
  };

  if (!animes || animes.length === 0) return null;

  const currentAnime = animes[currentIndex];

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
            
            <div className={`relative p-4 sm:p-6 lg:p-8 max-w-[600px] h-full flex flex-col justify-start transition-all duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              {/* Banner Info */}
              <div className="inline-flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 bg-black bg-opacity-70 px-2 sm:px-4 py-1 sm:py-2 rounded-[30px] border border-anime-secondary text-xs sm:text-base w-fit overflow-hidden">
                {anime.otherInfo.slice(0, 3).map((info, infoIndex) => (
                  <span key={infoIndex} className="flex items-center gap-1 text-white whitespace-nowrap">
                    <i className={`${getIconClass(infoIndex)} text-anime-secondary text-xs sm:text-sm`} />
                    <span className="hidden sm:inline">{info}</span>
                    <span className="sm:hidden">{info.split(' ')[0]}</span>
                    {infoIndex < Math.min(anime.otherInfo.length - 1, 2) && (
                      <span className="text-anime-secondary ml-1 sm:ml-2 text-xs sm:text-sm font-bold">•</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 cursor-default line-clamp-2">
                {anime.name}
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm mb-4 leading-5 sm:leading-6 line-clamp-2 lg:line-clamp-3 cursor-text">
                {anime.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8">
                <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-[30px] bg-black bg-opacity-50 border border-transparent transition-all duration-500 ease-in-out hover:border-white text-white cursor-pointer">
                  <i className="fas fa-play text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Watch Now</span>
                  <span className="sm:hidden">Watch</span>
                </button>
                <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-[30px] bg-black bg-opacity-50 border border-transparent transition-all duration-500 ease-in-out hover:border-white text-white cursor-pointer">
                  <i className="fas fa-info-circle text-xs sm:text-sm" />
                  <span className="hidden sm:inline">Detail</span>
                  <span className="sm:hidden">Info</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        className="absolute top-2 sm:top-[10px] right-12 sm:right-[60px] w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 text-white text-sm leading-6 sm:leading-[30px] text-center rounded-md transition-colors duration-300 hover:bg-black hover:bg-opacity-80 cursor-pointer z-[3]"
        onClick={() => navigateToSlide(currentIndex - 1)}
      >
        <i className="fas fa-chevron-left text-xs sm:text-sm" />
      </button>
      
      <button
        className="absolute top-2 sm:top-[10px] right-2 sm:right-[10px] w-8 h-8 sm:w-10 sm:h-10 bg-black bg-opacity-50 text-white text-sm leading-6 sm:leading-[30px] text-center rounded-md transition-colors duration-300 hover:bg-black hover:bg-opacity-80 cursor-pointer z-[3]"
        onClick={() => navigateToSlide(currentIndex + 1)}
      >
        <i className="fas fa-chevron-right text-xs sm:text-sm" />
      </button>

      {/* Progress Bar */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-white bg-opacity-50 transition-opacity duration-700 ease-in-out z-[3] ${
        progressVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div 
          className="h-full bg-anime-primary transition-all duration-linear"
          style={{ 
            width: `${progressWidth}%`,
            transitionDuration: progressWidth === 0 ? '0ms' : `${intervalTime}ms`
          }}
        />
      </div>
    </section>
  );
};