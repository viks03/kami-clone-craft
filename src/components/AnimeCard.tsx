interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = ({ name, poster, episodes, className }: AnimeCardProps) => {
  const episodeCount = episodes?.sub || episodes?.dub || 'N/A';
  
  return (
    <div className={`w-full ${className || ''}`}>
      <img 
        src={poster} 
        alt={name}
        className="w-full aspect-[3/4] object-cover rounded"
      />
      <div className="mt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <p className="text-xs text-white truncate flex-1">{name}</p>
        </div>
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-anime-text-muted gap-1">
          <span className="bg-anime-card-bg border border-anime-border px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px]">TV</span>
          <span className="bg-anime-card-bg border border-anime-border px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px]">2025</span>
          {episodes && (
            <span className="bg-anime-card-bg border border-anime-border px-1 py-0.5 rounded text-green-500 flex items-center gap-0.5 sm:gap-1">
              <i className="fas fa-closed-captioning text-[7px] sm:text-[8px]"></i>
              <span className="text-[8px] sm:text-[9px]">{episodeCount}/12</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};