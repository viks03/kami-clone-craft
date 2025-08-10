import { LazyImage } from './LazyImage';
import { memo, useMemo, useState, useEffect } from 'react';

interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = memo(({ name, poster, episodes, className }: AnimeCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
  [episodes]);

  const cardId = useMemo(() => `${name}|${poster}`, [name, poster]);

  useEffect(() => {
    const onScroll = () => setIsHovering(false);
    const onActivate = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setIsHovering(id === cardId);
    };
    window.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('touchmove', onScroll, { passive: true } as AddEventListenerOptions);
    window.addEventListener('animecard:activate' as any, onActivate as EventListener);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
      window.removeEventListener('animecard:activate' as any, onActivate as EventListener);
    };
  }, [cardId]);
  
  return (
    <div className={`w-full ${className || ''}`}>
      {/* Thumbnail with play button overlay */}
      <div 
        className="relative w-full aspect-[3/4] rounded overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => {
          setIsHovering(true);
          window.dispatchEvent(new CustomEvent('animecard:activate', { detail: cardId }));
        }}
      >
        <LazyImage
          src={poster}
          alt={name}
          className="w-full h-full rounded"
          placeholder="Loading..."
        />
        
        {/* Play button overlay - shows on hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg shadow-black/40">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" aria-hidden="true" focusable="false">
              <path d="M8 5v14l11-7L8 5z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <p 
            className={`text-xs truncate flex-1 cursor-pointer transition-colors duration-200 ${
              isHovering ? 'text-anime-primary' : 'text-white hover:text-anime-primary'
            }`}
            title={name}
          >
            {name}
          </p>
        </div>
        
        {/* Badges with consistent spacing and scrolling */}
        <div className="flex items-center gap-1.5 text-[10px] text-anime-text-muted overflow-x-auto scrollbar-hide">
          <span className="bg-anime-card-bg px-2 py-1 rounded-lg flex-shrink-0 inline-flex items-center font-medium cursor-pointer hover:text-anime-primary transition-colors">
            TV
          </span>
          <span className="bg-anime-card-bg px-2 py-1 rounded-lg flex-shrink-0 inline-flex items-center font-medium cursor-pointer hover:text-anime-primary transition-colors">
            2025
          </span>
          {episodes && (
            <span className="bg-anime-card-bg px-2 py-1 rounded-lg text-anime-text-muted inline-flex items-center gap-1 font-medium flex-shrink-0 cursor-pointer hover:text-anime-primary transition-colors">
              <i className="fas fa-closed-captioning text-[8px]"></i>
              <span className="text-[10px]">{episodeCount}/12</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});