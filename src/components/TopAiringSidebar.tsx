import { memo } from 'react';
import { ChevronRight, Play, Star } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface Anime {
  id: string;
  name: string;
  poster: string;
  episodes?: string | { sub: number | null; dub: number | null };
  type?: string;
  rating?: string;
}

interface TopAiringSidebarProps {
  animes: Anime[];
}

export const TopAiringSidebar = memo(({ animes }: TopAiringSidebarProps) => {
  const topAnimes = animes.slice(0, 8);

  return (
    <div className="hidden xl:block w-80 p-6 bg-anime-card-bg/30 border-l border-anime-border/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-outfit text-foreground">TOP AIRING</h2>
        <ChevronRight className="h-5 w-5 text-anime-text-muted" />
      </div>

      <div className="space-y-4">
        {topAnimes.map((anime, index) => (
          <div key={anime.id} className="group cursor-pointer">
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-anime-card-bg/60 transition-all duration-200">
              {/* Rank Number */}
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">{index + 1}</span>
              </div>

              {/* Poster */}
              <div className="relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden">
                <LazyImage
                  src={anime.poster}
                  alt={anime.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                  <Play className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-anime-primary transition-colors duration-200">
                  {anime.name}
                </h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-anime-text-muted">
                    {anime.type || 'TV'} •</span>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-anime-text-muted">
                    {anime.rating || '8.5'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-3 px-4 bg-anime-primary/10 hover:bg-anime-primary/20 border border-anime-primary/30 rounded-lg text-anime-primary font-medium transition-all duration-200">
        View All Airing
      </button>
    </div>
  );
});