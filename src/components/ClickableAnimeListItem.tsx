import { useState } from 'react';

interface ClickableAnimeListItemProps {
  anime: {
    id: string;
    name: string;
    poster: string;
  };
  index: number;
  type: 'airing' | 'upcoming';
  randomType: string;
  randomYear: string;
  currentEp?: number;
  totalEp?: number;
  onAnimeClick: (animeId: string) => void;
}

export const ClickableAnimeListItem = ({
  anime,
  index,
  type,
  randomType,
  randomYear,
  currentEp,
  totalEp,
  onAnimeClick
}: ClickableAnimeListItemProps) => {
  const [showMobilePlayOverlay, setShowMobilePlayOverlay] = useState(false);

  const isAiring = type === 'airing';
  const primaryColor = isAiring ? 'anime-primary' : 'orange-500';
  const hoverColor = isAiring ? 'purple-400' : 'amber-400';
  const statusColor = isAiring ? 'green-400' : 'orange-400';
  const statusText = isAiring ? 'Airing' : 'Upcoming';

  const handleCardClick = () => {
    // On mobile, show overlay first
    if (window.innerWidth < 1024) {
      setShowMobilePlayOverlay(true);
      setTimeout(() => {
        setShowMobilePlayOverlay(false);
        onAnimeClick(anime.id);
      }, 300);
    } else {
      onAnimeClick(anime.id);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAnimeClick(anime.id);
  };

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      <div className={`flex items-center gap-3 p-3 rounded-lg bg-anime-dark-bg/30 border border-anime-border/30 hover:border-${primaryColor}/30 transition-all duration-300 hover:bg-${primaryColor}/5`}>
        <div className="relative">
          <img 
            src={anime.poster} 
            alt={anime.name}
            className="w-12 h-16 rounded-md object-cover flex-shrink-0"
          />
          <div className={`absolute -top-1 -left-1 w-5 h-5 bg-${primaryColor} text-white text-xs font-bold rounded-full flex items-center justify-center`}>
            {index + 1}
          </div>
          
          {/* Mobile Play Overlay */}
          {showMobilePlayOverlay && (
            <div className="absolute inset-0 bg-black/60 rounded-md flex items-center justify-center lg:hidden animate-fade-in">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <i className="fas fa-play text-white text-sm"></i>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium text-white truncate group-hover:text-${primaryColor} transition-colors`}>
            {anime.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1 flex-nowrap overflow-x-auto scrollbar-hide">
            <span className={`inline-flex items-center gap-1 text-xs text-${statusColor} bg-${statusColor}/10 px-2 py-0.5 rounded-full flex-shrink-0`}>
              <div className={`w-1.5 h-1.5 bg-${statusColor} rounded-full animate-pulse`}></div>
              {statusText}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
              <i className="fas fa-tv text-[8px]"></i>
              {randomType}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
              <i className="fas fa-calendar text-[8px]"></i>
              {randomYear}
            </span>
            {currentEp && totalEp && (
              <span className="inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                <i className="fas fa-closed-captioning text-[8px]"></i>
                {currentEp}/{totalEp}
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={handlePlayClick}
          className={`opacity-0 group-hover:opacity-100 transition-opacity text-${primaryColor} hover:text-${hoverColor}`}
        >
          <i className="fas fa-play text-sm"></i>
        </button>
      </div>
    </div>
  );
};