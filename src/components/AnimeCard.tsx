import { LazyImage } from './LazyImage';
import { memo, useMemo, useState } from 'react';

interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = memo(({ name, poster, episodes, className }: AnimeCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [titleClicked, setTitleClicked] = useState(false);
  
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
  [episodes]);

  const handleTitleClick = () => {
    setTitleClicked(true);
    setTimeout(() => setTitleClicked(false), 300);
  };
  
  return (
    <div className={`w-full ${className || ''}`}>
      {/* Thumbnail with play button overlay */}
      <div 
        className="relative w-full aspect-[3/4] rounded overflow-hidden group cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleTitleClick}
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
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
            <i className="fas fa-play text-white text-xl ml-1" />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <p 
            className={`text-xs truncate flex-1 cursor-pointer transition-all duration-200 ${
              titleClicked 
                ? 'text-anime-primary' 
                : 'text-white hover:text-anime-primary hover:bg-anime-primary/10 hover:px-2 hover:py-1 hover:rounded-md hover:-mx-2 hover:-my-1'
            }`}
            title={name}
            onClick={handleTitleClick}
          >
            {name}
          </p>
        </div>
        
        {/* Badges with consistent spacing and scrolling */}
        <div className="flex items-center gap-2 text-[10px] text-anime-text-muted overflow-x-auto scrollbar-hide">
          <span className="bg-anime-card-bg border border-anime-border px-1.5 py-0.5 rounded flex-shrink-0 cursor-pointer hover:text-anime-primary hover:border-anime-primary/50 transition-colors">
            TV
          </span>
          <span className="bg-anime-card-bg border border-anime-border px-1.5 py-0.5 rounded flex-shrink-0 cursor-pointer hover:text-anime-primary hover:border-anime-primary/50 transition-colors">
            2025
          </span>
          {episodes && (
            <span className="bg-anime-card-bg border border-anime-border px-1.5 py-0.5 rounded text-green-500 flex items-center gap-1 flex-shrink-0 cursor-pointer hover:text-anime-primary hover:border-anime-primary/50 transition-colors">
              <i className="fas fa-closed-captioning text-[8px]"></i>
              <span className="text-[10px]">{episodeCount}/12</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});