import { memo } from 'react';
import { Play, Star, Clock } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface Anime {
  id: string;
  name: string;
  poster: string;
  episodes?: string | { sub: number | null; dub: number | null };
  type?: string;
  rating?: string;
}

interface ModernAnimeGridProps {
  animes: Anime[];
  title?: string;
}

export const ModernAnimeGrid = memo(({ animes, title }: ModernAnimeGridProps) => {
  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold font-outfit text-foreground">{title}</h2>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animes.map((anime, index) => (
          <div
            key={anime.id}
            className="group cursor-pointer animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-anime-card-bg">
              {/* Poster Image */}
              <LazyImage
                src={anime.poster}
                alt={anime.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play className="h-6 w-6 text-white fill-current ml-1" />
                  </button>
                </div>
                
                {/* Quick Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-anime-primary/80 text-white text-xs font-medium rounded-full">
                      {anime.type || 'TV'}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-medium">{anime.rating || '8.5'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-300 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{typeof anime.episodes === 'object' ? `EP ${anime.episodes.sub || anime.episodes.dub || '??'}` : anime.episodes || 'EP ??'}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                  HD
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-full">
                  {typeof anime.episodes === 'object' ? `EP ${anime.episodes.sub || anime.episodes.dub || '??'}` : anime.episodes || 'EP ??'}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="mt-3 space-y-1">
              <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-anime-primary transition-colors duration-200">
                {anime.name}
              </h3>
              <p className="text-anime-text-muted text-xs">
                {anime.type || 'TV Series'} • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});