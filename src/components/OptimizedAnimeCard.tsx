import { OptimizedLazyImage } from './OptimizedLazyImage';
import { memo, useMemo, useState, useEffect, useRef, useCallback } from 'react';

interface OptimizedAnimeCardProps {
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

// Global state to manage hover interactions efficiently
let globalActiveCard: { cardId: string; element: string } | null = null;
const cardHoverCallbacks = new Map<string, (shouldClear: boolean) => void>();

export const OptimizedAnimeCard = memo(({ name, poster, episodes, className, type }: OptimizedAnimeCardProps) => {
  const [hoverState, setHoverState] = useState<HoverState>({
    thumbnail: false,
    title: false,
    badges: {}
  });
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Use refs for stable references
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const cardId = useRef(Math.random().toString(36).substr(2, 9)).current;
  
  // Memoize expensive calculations
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
    [episodes?.sub, episodes?.dub]
  );

  // Optimized hover state management
  const clearOtherCards = useCallback((currentElement: string) => {
    if (globalActiveCard && (globalActiveCard.cardId !== cardId || globalActiveCard.element !== currentElement)) {
      cardHoverCallbacks.forEach((callback, id) => {
        if (id !== cardId) {
          callback(true);
        }
      });
    }
    globalActiveCard = { cardId, element: currentElement };
  }, [cardId]);

  // Register hover callback with cleanup
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

  // Optimized scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleGlobalTouch = () => {
      if (!isScrolling) {
        cardHoverCallbacks.forEach((callback) => callback(true));
        globalActiveCard = null;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouch, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleGlobalTouch);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  // Event handlers
  const handleThumbnailTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    clearOtherCards('thumbnail');
    setHoverState({
      thumbnail: true,
      title: true,
      badges: {}
    });
  }, [clearOtherCards]);

  const handleTitleTouch = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    clearOtherCards('title');
    setHoverState({
      thumbnail: false,
      title: true,
      badges: {}
    });
  }, [clearOtherCards]);

  const handleBadgeTouch = useCallback((e: React.TouchEvent, badgeKey: string) => {
    e.stopPropagation();
    clearOtherCards(badgeKey);
    setHoverState({
      thumbnail: false,
      title: false,
      badges: { [badgeKey]: true }
    });
  }, [clearOtherCards]);

  const handleMouseEnter = useCallback((element: 'thumbnail' | 'title' | string) => {
    if (element === 'thumbnail') {
      setHoverState(prev => ({ ...prev, thumbnail: true, title: true }));
    } else if (element === 'title') {
      setHoverState(prev => ({ ...prev, title: true }));
    } else {
      setHoverState(prev => ({ ...prev, badges: { [element]: true } }));
    }
  }, []);

  const handleMouseLeave = useCallback((element: 'thumbnail' | 'title' | string) => {
    if (element === 'thumbnail') {
      setHoverState(prev => ({ ...prev, thumbnail: false, title: false }));
    } else if (element === 'title') {
      setHoverState(prev => ({ ...prev, title: false }));
    } else {
      setHoverState(prev => ({ ...prev, badges: { ...prev.badges, [element]: false } }));
    }
  }, []);

  return (
    <div className={`w-full ${className || ''}`}>
      {/* Thumbnail with play button overlay */}
      <div 
        className="relative w-full aspect-[3/4] rounded overflow-hidden group cursor-pointer anime-card"
        onMouseEnter={() => handleMouseEnter('thumbnail')}
        onMouseLeave={() => handleMouseLeave('thumbnail')}
        onTouchStart={handleThumbnailTouch}
      >
        <OptimizedLazyImage
          src={poster}
          alt={name}
          className="w-full h-full rounded"
          placeholder="Loading..."
        />
        
        {/* Play button overlay */}
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
              hoverState.title ? 'text-anime-primary' : 'text-foreground hover:text-anime-primary'
            }`}
            title={name}
            onMouseEnter={() => handleMouseEnter('title')}
            onMouseLeave={() => handleMouseLeave('title')}
            onTouchStart={handleTitleTouch}
          >
            {name}
          </p>
        </div>
        
        {/* Badges */}
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

OptimizedAnimeCard.displayName = 'OptimizedAnimeCard';