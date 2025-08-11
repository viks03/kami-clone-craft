import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { animeData } from "@/data/animeData";

// SEO helper: set or update meta tags safely
function setMeta(name: string, content: string) {
  const existing = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (existing) {
    existing.setAttribute("content", content);
  } else {
    const meta = document.createElement("meta");
    meta.name = name;
    meta.content = content;
    document.head.appendChild(meta);
  }
}

export default function AnimeInfo() {
  const { id } = useParams<{ id: string }>();

  const anime = useMemo(() => {
    const found = animeData.spotlightAnimes.find((a) => String(a.id) === String(id));
    return found || animeData.spotlightAnimes[0];
  }, [id]);

  // Basic derived info for badges/labels
  const type = anime.type || "TV";
  const year = new Date().getFullYear();
  const episodesLabel = `${anime.episodes.sub ?? 0}/${Math.max(12, (anime.episodes.sub ?? 0) + 7)}`;

  useEffect(() => {
    const title = `${anime.name} – Info | Miruro`;
    document.title = title.slice(0, 60);
    setMeta("description", anime.description.slice(0, 155));

    // Canonical
    const href = window.location.href;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);

    // JSON-LD (TVSeries)
    const ld = {
      "@context": "https://schema.org",
      "@type": "TVSeries",
      name: anime.name,
      description: anime.description,
      image: anime.poster,
      numberOfEpisodes: anime.episodes.sub ?? undefined,
      genre: type,
    } as const;

    // Replace previous ld+json for this page
    const prev = document.getElementById("ld-anime-info");
    if (prev) prev.remove();
    const script = document.createElement("script");
    script.id = "ld-anime-info";
    script.type = "application/ld+json";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
  }, [anime]);

  return (
    <div className="flex min-h-screen font-karla">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Top header for desktop */}
        <div className="hidden lg:block px-4 pt-4">
          <Header onSearch={(q) => console.log("search:", q)} />
        </div>

        {/* HERO SECTION */}
        <section className="relative rounded-xl overflow-hidden m-4 lg:m-6">
          <div
            className="h-[280px] sm:h-[360px] lg:h-[460px] w-full bg-center bg-cover"
            style={{ backgroundImage: `url('${anime.poster}')` }}
            aria-label={`${anime.name} poster background`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-anime-dark-bg/90" />

          <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Poster */}
            <div className="w-28 sm:w-36 lg:w-48 flex-shrink-0">
              <img
                src={anime.poster}
                alt={`${anime.name} poster`}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover rounded-lg shadow-card border border-anime-border"
              />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="px-3 py-2 text-sm rounded-md bg-anime-card-bg/80 border border-anime-border text-white hover:bg-anime-card-bg">
                  <i className="fas fa-play mr-2" /> Watch
                </button>
                <button className="px-3 py-2 text-sm rounded-md bg-anime-card-bg/80 border border-anime-border text-white hover:bg-anime-card-bg">
                  <i className="fas fa-plus mr-2" /> List
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                <a
                  href="#"
                  className="px-3 py-2 text-sm rounded-md bg-anime-card-bg/80 border border-anime-border text-white hover:bg-anime-card-bg"
                  aria-label="AniList"
                >
                  AL
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm rounded-md bg-anime-card-bg/80 border border-anime-border text-white hover:bg-anime-card-bg"
                  aria-label="MyAnimeList"
                >
                  MAL
                </a>
              </div>
              <Link to="/" className="inline-block mt-3 text-sm text-anime-primary hover:underline">
                ← Back to Home
              </Link>
            </div>

            {/* Content */}
            <article className="flex-1 flex flex-col">
              <header>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {anime.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-anime-card-bg border border-anime-border text-white">
                    {type}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-anime-card-bg border border-anime-border text-white">
                    {year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-anime-card-bg border border-anime-border text-white">
                    {episodesLabel}
                  </span>
                </div>
              </header>

              <p className="mt-4 text-sm sm:text-base leading-6 text-white/90 max-w-3xl">
                {anime.description}
              </p>

              {/* Info grid */}
              <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-anime-card-bg/60 border border-anime-border rounded-lg p-3">
                  <p className="text-xs text-anime-text-muted">Official Site</p>
                  <a href="#" className="text-sm font-semibold text-white hover:text-anime-primary">Link</a>
                </div>
                <div className="bg-anime-card-bg/60 border border-anime-border rounded-lg p-3">
                  <p className="text-xs text-anime-text-muted">Episodes</p>
                  <p className="text-sm font-semibold text-white">{episodesLabel}</p>
                </div>
                <div className="bg-anime-card-bg/60 border border-anime-border rounded-lg p-3">
                  <p className="text-xs text-anime-text-muted">Duration</p>
                  <p className="text-sm font-semibold text-white">24 min</p>
                </div>
                <div className="bg-anime-card-bg/60 border border-anime-border rounded-lg p-3">
                  <p className="text-xs text-anime-text-muted">Season</p>
                  <p className="text-sm font-semibold text-white">Summer</p>
                </div>
                <div className="bg-anime-card-bg/60 border border-anime-border rounded-lg p-3">
                  <p className="text-xs text-anime-text-muted">Status</p>
                  <p className="text-sm font-semibold text-white">Airing</p>
                </div>
                <div className="bg-anime-card-bg/60 border border-anime-border rounded-lg p-3">
                  <p className="text-xs text-anime-text-muted">Country</p>
                  <p className="text-sm font-semibold text-white">JP</p>
                </div>
              </section>
            </article>
          </div>
        </section>

        {/* Additional sections could go here */}
        <Footer />
      </main>
    </div>
  );
}
