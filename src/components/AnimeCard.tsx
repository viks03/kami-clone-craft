import { LazyImage } from './LazyImage';
import { memo, useMemo, useState, useEffect, useRef } from 'react';

interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

type HoverState = {
  thumbnail: boolean;
  title: boolean;
  badges: { [key: string]: boolean };
};

export const AnimeCard = memo(({ name, poster, episodes, className }: AnimeCardProps) => {
  const [hoverState, setHoverState] = useState<HoverState>({
    thumbnail: false,
    title: false,
    badges: {}
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
  [episodes]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleTouchStart = () => {
      // Clear hover states when touching somewhere else (not on this card)
      if (!isScrolling) {
        setHoverState({
          thumbnail: false,
          title: false,
          badges: {}
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  const handleThumbnailTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    setHoverState({
      thumbnail: true,
      title: true, // Title also gets hover when thumbnail is touched
      badges: {}
    });
  };

  const handleTitleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    setHoverState({
      thumbnail: false,
      title: true,
      badges: {}
    });
  };

  const handleBadgeTouch = (e: React.TouchEvent, badgeKey: string) => {
    e.stopPropagation();
    setHoverState({
      thumbnail: false,
      title: false,
      badges: { [badgeKey]: true }
    });
  };

  const handleMouseEnter = (element: 'thumbnail' | 'title' | string) => {
    if (element === 'thumbnail') {
      setHoverState(prev => ({ ...prev, thumbnail: true, title: true }));
    } else if (element === 'title') {
      setHoverState(prev => ({ ...prev, title: true }));
    } else {
      setHoverState(prev => ({ ...prev, badges: { [element]: true } }));
    }
  };

  const handleMouseLeave = (element: 'thumbnail' | 'title' | string) => {
    if (element === 'thumbnail') {
      setHoverState(prev => ({ ...prev, thumbnail: false, title: false }));
    } else if (element === 'title') {
      setHoverState(prev => ({ ...prev, title: false }));
    } else {
      setHoverState(prev => ({ ...prev, badges: { ...prev.badges, [element]: false } }));
    }
  };
  
  return (
    <div className={`w-full ${className || ''}`}>
      {/* Thumbnail with play button overlay */}
      <div 
        className="relative w-full aspect-[3/4] rounded overflow-hidden group cursor-pointer"
        onMouseEnter={() => handleMouseEnter('thumbnail')}
        onMouseLeave={() => handleMouseLeave('thumbnail')}
        onTouchStart={handleThumbnailTouch}
      >
        <LazyImage
          src={poster}
          alt={name}
          className="w-full h-full rounded"
          placeholder="Loading..."
        />
        
        {/* Play button overlay - shows on hover */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          hoverState.thumbnail ? 'opacity-100' : 'opacity-0'
        }`}>
          <svg viewBox="0 0 24 24" className="w-20 h-20 text-white rounded-full" aria-hidden="true" focusable="false">
            <path d="M8 5v14l11-7L8 5z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <p 
            className={`text-xs truncate flex-1 cursor-pointer transition-colors duration-200 ${
              hoverState.title ? 'text-anime-primary' : 'text-white hover:text-anime-primary'
            }`}
            title={name}
            onMouseEnter={() => handleMouseEnter('title')}
            onMouseLeave={() => handleMouseLeave('title')}
            onTouchStart={handleTitleTouch}
          >
            {name}
          </p>
        </div>
        
        {/* Badges with consistent spacing and scrolling */}
        <div className="flex items-center gap-1.5 text-[10px] text-anime-text-muted overflow-x-auto scrollbar-hide">
          <span 
            className={`bg-anime-card-bg px-2 py-1 rounded-lg flex-shrink-0 inline-flex items-center font-bold cursor-pointer transition-colors ${
              hoverState.badges['tv'] ? 'text-anime-primary' : 'hover:text-anime-primary'
            }`}
            onMouseEnter={() => handleMouseEnter('tv')}
            onMouseLeave={() => handleMouseLeave('tv')}
            onTouchStart={(e) => handleBadgeTouch(e, 'tv')}
          >
            TV
          </span>
          <span 
            className={`bg-anime-card-bg px-2 py-1 rounded-lg flex-shrink-0 inline-flex items-center font-bold cursor-pointer transition-colors ${
              hoverState.badges['year'] ? 'text-anime-primary' : 'hover:text-anime-primary'
            }`}
            onMouseEnter={() => handleMouseEnter('year')}
            onMouseLeave={() => handleMouseLeave('year')}
            onTouchStart={(e) => handleBadgeTouch(e, 'year')}
          >
            2025
          </span>
          {episodes && (
            <span 
              className={`bg-anime-card-bg px-2 py-1 rounded-lg text-anime-text-muted inline-flex items-center gap-1 font-bold flex-shrink-0 cursor-pointer transition-colors ${
                hoverState.badges['episodes'] ? 'text-anime-primary' : 'hover:text-anime-primary'
              }`}
              onMouseEnter={() => handleMouseEnter('episodes')}
              onMouseLeave={() => handleMouseLeave('episodes')}
              onTouchStart={(e) => handleBadgeTouch(e, 'episodes')}
            >
              <i className="fas fa-closed-captioning text-[8px]"></i>
              <span className="text-[10px]">{episodeCount}/12</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});