import { Link } from "react-router-dom";
import { Sun, Moon, Cat, Smile, User } from "lucide-react";

interface FooterProps {
  isMobile?: boolean;
}

export const Footer = ({ isMobile = false }: FooterProps) => {
  return (
    <footer className={`px-4 lg:px-4 ${isMobile ? 'mt-4 mb-4' : 'mt-8 mb-4'}`}>
      <div className="bg-anime-card-bg/60 border border-anime-border rounded-xl p-5 lg:p-6 shadow-card">
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {/* Left: Logo / Site name */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-anime-primary transition-colors">
              <span className="text-lg font-bold leading-none">AnimeFlow</span>
            </Link>

            <p className="text-sm text-anime-text-muted">
              This website does not retain any files on its server. Rather, it solely provides links to media content hosted by third-party services.
            </p>
          </div>

          {/* Center: Links + copyright */}
          <div className="flex flex-col items-start md:items-center gap-3">
            <nav aria-label="Footer links" className="w-full">
              <ul className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 justify-center text-sm">
                <li><a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors">About</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors">Domains</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors">Donate &lt;3</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors">Terms of Service</a></li>
              </ul>
            </nav>

            <div className="w-full h-px bg-anime-border/60 my-1" aria-hidden="true" />

            <p className="text-xs text-anime-text-muted text-left md:text-center">
              © 2025 <Link to="/" className="hover:text-anime-primary underline-offset-4 hover:underline">AnimeFlow</Link> | Website Made by <strong className="font-semibold text-foreground">Miruro no Kuon</strong> v0.9.9.3
            </p>
          </div>

          {/* Right: Theme icons (visual only) */}
          <div className="flex md:justify-end justify-start items-center gap-2">
            <button aria-label="Light theme" className="w-10 h-10 rounded-md bg-anime-dark-bg/30 border border-anime-border text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/70 transition-colors flex items-center justify-center">
              <Sun size={18} />
            </button>
            <button aria-label="Dark theme" className="w-10 h-10 rounded-md bg-anime-dark-bg/30 border border-anime-border text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/70 transition-colors flex items-center justify-center">
              <Moon size={18} />
            </button>
            <button aria-label="Anime icon 1" className="w-10 h-10 rounded-md bg-anime-dark-bg/30 border border-anime-border text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/70 transition-colors flex items-center justify-center">
              <Cat size={18} />
            </button>
            <button aria-label="Anime icon 2" className="w-10 h-10 rounded-md bg-anime-dark-bg/30 border border-anime-border text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/70 transition-colors flex items-center justify-center">
              <Smile size={18} />
            </button>
            <button aria-label="Anime icon 3" className="w-10 h-10 rounded-md bg-anime-dark-bg/30 border border-anime-border text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/70 transition-colors flex items-center justify-center">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
