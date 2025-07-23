interface AnimeListItemProps {
  name: string;
  poster: string;
  status?: string;
  rating?: number;
}

export const AnimeListItem = ({ name, poster, status, rating }: AnimeListItemProps) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <img 
        src={poster} 
        alt={name}
        className="w-[50px] h-[70px] rounded-md object-cover"
      />
      <div className="flex-1">
        <p className="text-sm text-white">{name}</p>
        {status && (
          <span className="text-green-500 text-xs">
            {status}
          </span>
        )}
        {rating && (
          <span className="text-yellow-400 text-xs">
            ★ {rating}
          </span>
        )}
      </div>
    </div>
  );
};