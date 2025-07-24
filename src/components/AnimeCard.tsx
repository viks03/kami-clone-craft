interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = ({ name, poster, episodes, className }: AnimeCardProps) => {
  const episodeCount = episodes?.sub || episodes?.dub || 'N/A';
  
  return (
    <div className={`relative w-full lg:w-[150px] ${className || ''}`}>
      <img 
        src={poster} 
        alt={name}
        className="w-full aspect-[3/4] lg:h-[200px] object-cover rounded-md"
      />
      <p className="mt-1 text-xs lg:text-sm text-white line-clamp-2 lg:line-clamp-none">{name}</p>
      {episodes && (
        <span className="absolute top-1 left-1 px-1.5 lg:px-2 py-0.5 lg:py-1 bg-anime-primary rounded text-xs">
          EP {episodeCount}
        </span>
      )}
    </div>
  );
};