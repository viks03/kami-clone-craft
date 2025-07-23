import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Carousel } from '../components/Carousel';
import { AnimeCard } from '../components/AnimeCard';
import { AnimeListItem } from '../components/AnimeListItem';
import { animeData } from '../data/animeData';

const Index = () => {
  const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
  };

  return (
    <div className="flex min-h-screen font-karla">
      <Sidebar />
      
      <main className="flex-1">
        <div className="flex h-full pl-4">
          {/* Left Section */}
          <div className="w-3/4 pr-4">
            <Header onSearch={handleSearch} />
            <Carousel animes={animeData.spotlightAnimes} />
            
            <section className="recently-updated">
              <h2 className="text-2xl mb-4">Recently Updated</h2>
              <div className="flex flex-wrap gap-4">
                {animeData.latestEpisodeAnimes.slice(0, 8).map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    episodes={anime.episodes}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Section */}
          <div className="w-1/4 pl-4 border-l border-anime-border">
            <section className="latest-completed mb-8">
              <h2 className="text-lg mb-4">Latest Completed</h2>
              <div>
                {animeData.latestCompletedAnimes.map((anime) => (
                  <AnimeListItem
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    status="Completed"
                  />
                ))}
              </div>
              <a href="#" className="block text-right text-anime-primary text-sm mt-2">
                View All
              </a>
            </section>

            <section className="trending-now">
              <h2 className="text-lg mb-4">Trending Now</h2>
              <div>
                {animeData.mostPopularAnimes.slice(0, 2).map((anime) => (
                  <AnimeListItem
                    key={anime.id}
                    name={anime.name}
                    poster={anime.poster}
                    rating={9.5}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
