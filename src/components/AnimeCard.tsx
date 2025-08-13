import { LazyImage } from './LazyImage';
import { memo, useMemo, useState, useEffect, useRef } from 'react';

interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
  type?: string;
}

type HoverState = {
  thumbnail: boolean;
  title: boolean;
  badges: { [key: string]: boolean };
};

// Global state to track which card element is currently active
let globalActiveCard: { cardId: string; element: string } | null = null;
const cardHoverCallbacks = new Map<string, (shouldClear: boolean) => void>();

export const AnimeCard = memo(({ name, poster, episodes, className, type }: AnimeCardProps) => {
  const [hoverState, setHoverState] = useState<HoverState>({
    thumbnail: false,
    title: false,
    badges: {}
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const cardId = useRef(Math.random().toString(36).substr(2, 9)).current;
  
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
  [episodes]);

  // Clear all other cards when this card gets a hover state
  const clearOtherCards = (currentElement: string) => {
    // Clear global active card if it's different
    if (globalActiveCard && (globalActiveCard.cardId !== cardId || globalActiveCard.element !== currentElement)) {
      cardHoverCallbacks.forEach((callback, id) => {
        if (id !== cardId) {
          callback(true);
        }
      });
    }
    globalActiveCard = { cardId, element: currentElement };
  };

  // Register this card's clear callback
  useEffect(() => {
    const clearCallback = (shouldClear: boolean) => {
      if (shouldClear) {
        setHoverState({
          thumbnail: false,
          title: false,
          badges: {}
        });
      }
    };
    
    cardHoverCallbacks.set(cardId, clearCallback);
    
    return () => {
      cardHoverCallbacks.delete(cardId);
      if (globalActiveCard?.cardId === cardId) {
        globalActiveCard = null;
      }
    };
  }, [cardId]);

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

    const handleGlobalTouchStart = () => {
      // Clear all hover states when touching somewhere else
      if (!isScrolling) {
        cardHoverCallbacks.forEach((callback) => callback(true));
        globalActiveCard = null;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleGlobalTouchStart);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  const handleThumbnailTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    clearOtherCards('thumbnail');
    setHoverState({
      thumbnail: true,
      title: true, // Title also gets hover when thumbnail is touched
      badges: {}
    });
  };

  const handleTitleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    clearOtherCards('title');
    setHoverState({
      thumbnail: false,
      title: true,
      badges: {}
    });
  };

  const handleBadgeTouch = (e: React.TouchEvent, badgeKey: string) => {
    e.stopPropagation();
    clearOtherCards(badgeKey);
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
        className="relative w-full aspect-[3/4] rounded overflow-hidden group cursor-pointer anime-card"
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
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white ml-1" aria-hidden="true" focusable="false">
              <path d="M8 5v14l11-7L8 5z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <p 
            className={`text-xs font-extrabold truncate flex-1 cursor-pointer transition-colors duration-200 ${
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
        <div className="flex items-center gap-1 text-[10px] text-anime-text-muted overflow-x-auto scrollbar-hide">
          {type && (
            <span 
              className={`bg-anime-card-bg px-1.5 py-0.5 rounded text-[11px] flex-shrink-0 inline-flex items-center font-extrabold cursor-pointer transition-colors ${
                hoverState.badges['type'] ? 'text-anime-primary' : 'hover:text-anime-primary'
              }`}
              onMouseEnter={() => handleMouseEnter('type')}
              onMouseLeave={() => handleMouseLeave('type')}
              onTouchStart={(e) => handleBadgeTouch(e, 'type')}
            >
              {type}
            </span>
          )}
          <span 
            className={`bg-anime-card-bg px-1.5 py-0.5 rounded text-[11px] flex-shrink-0 inline-flex items-center font-extrabold cursor-pointer transition-colors ${
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
              className={`bg-anime-card-bg px-1.5 py-0.5 rounded text-anime-text-muted inline-flex items-center gap-1 font-extrabold flex-shrink-0 cursor-pointer transition-colors ${
                hoverState.badges['episodes'] ? 'text-anime-primary' : 'hover:text-anime-primary'
              }`}
              onMouseEnter={() => handleMouseEnter('episodes')}
              onMouseLeave={() => handleMouseLeave('episodes')}
              onTouchStart={(e) => handleBadgeTouch(e, 'episodes')}
            >
              <i className="fas fa-closed-captioning text-[9px]"></i>
              <span className="text-[11px]">{episodeCount}/12</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});