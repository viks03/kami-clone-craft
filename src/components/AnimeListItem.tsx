import { LazyImage } from './LazyImage';

interface AnimeListItemProps {
  name: string;
  poster: string;
  status?: string;
  rating?: number;
}

export const AnimeListItem = ({ name, poster, status, rating }: AnimeListItemProps) => {
  return (
    <div className="flex items-center gap-3 mb-3 lg:mb-4">
      <img 
        src={poster} 
        alt={name}
        className="w-[60px] h-[80px] lg:w-[50px] lg:h-[70px] rounded-md object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm lg:text-sm text-white line-clamp-2">{name}</p>
        {status && (
          <span className="text-green-500 text-xs block mt-1">
            {status}
          </span>
        )}
        {rating && (
          <span className="text-yellow-400 text-xs block mt-1">
            ★ {rating}
          </span>
        )}
      </div>
    </div>
  );
};