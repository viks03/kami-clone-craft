import { LazyImage } from './LazyImage';
import { memo, useMemo } from 'react';

interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = memo(({ name, poster, episodes, className }: AnimeCardProps) => {
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
  [episodes]);
  
  return (
    <div className={`w-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${className || ''}`}>
      <LazyImage
        src={poster}
        alt={name}
        className="w-full aspect-[3/4] rounded"
        placeholder="Loading..."
      />
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <p className="text-xs text-white truncate flex-1" title={name}>{name}</p>
        </div>
        <div className="flex items-center justify-between text-[10px] text-anime-text-muted">
          <span className="bg-anime-card-bg border border-anime-border px-1.5 py-0.5 rounded">TV</span>
          <span className="bg-anime-card-bg border border-anime-border px-1.5 py-0.5 rounded">2025</span>
          {episodes && (
            <span className="bg-anime-card-bg border border-anime-border px-1.5 py-0.5 rounded text-green-500 flex items-center gap-1">
              <i className="fas fa-closed-captioning text-[8px]"></i>
              <span className="text-[10px]">{episodeCount}/12</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});