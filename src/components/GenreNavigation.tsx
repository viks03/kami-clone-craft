import { useState, memo } from 'react';

const genres = [
  'All', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 
  'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports'
];

export const GenreNavigation = memo(() => {
  const [activeGenre, setActiveGenre] = useState('All');

  return (
    <div className="hidden lg:block py-4 px-6 bg-anime-dark-bg border-b border-anime-border/20">
      <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-lg ${
              activeGenre === genre
                ? 'text-anime-primary bg-anime-primary/10 border border-anime-primary/30'
                : 'text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/50'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
});