interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = ({ name, poster, episodes, className }: AnimeCardProps) => {
  const episodeCount = episodes?.sub || episodes?.dub || 'N/A';
  
  return (
    <div className={`relative w-full ${className || ''}`}>
      <img 
        src={poster} 
        alt={name}
        className="w-full aspect-[3/4] object-cover rounded-lg"
      />
      <p className="mt-2 text-sm text-white line-clamp-2">{name}</p>
      {episodes && (
        <span className="absolute top-2 left-2 px-2 py-1 bg-anime-primary rounded text-xs font-medium">
          EP {episodeCount}
        </span>
      )}
    </div>
  );
};