import React from 'react';
import { Sun, Moon, Cat, Sparkles, UserRound } from 'lucide-react';

export const Footer: React.FC<{ className?: string }>= ({ className }) => {
  const icons = [
    { Comp: Sun, label: 'Light theme' },
    { Comp: Moon, label: 'Dark theme' },
    { Comp: Cat, label: 'Anime cat' },
    { Comp: Sparkles, label: 'Shimmer' },
    { Comp: UserRound, label: 'Character' },
  ];

  return (
    <footer className={`mt-6 ${className || ''}`} role="contentinfo">
      <div className="bg-anime-card-bg/60 border border-anime-border/70 rounded-xl p-4">
        {/* Logo / Brand */}
        <a href="/" className="inline-flex items-center gap-2 text-foreground hover:text-anime-primary transition-colors">
          <span className="text-base font-bold">AnimeFlow</span>
        </a>

        {/* Disclaimer */}
        <p className="mt-2 text-xs text-anime-text-muted">
          This website does not retain any files on its server. Rather, it solely provides links to media content hosted by third-party services.
        </p>

        {/* Links */}
        <nav aria-label="Footer links" className="mt-4">
          <ul className="flex flex-col gap-2 text-sm text-anime-text-muted">
            <li><a href="/about" className="hover:text-foreground story-link">About</a></li>
            <li><a href="/domains" className="hover:text-foreground story-link">Domains</a></li>
            <li><a href="/donate" className="hover:text-foreground story-link">Donate &lt;3</a></li>
            <li><a href="/privacy" className="hover:text-foreground story-link">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-foreground story-link">Terms of Service</a></li>
          </ul>
        </nav>

        <div className="mt-4 border-t border-anime-border/70" />

        {/* Bottom row */}
        <div className="mt-3 flex flex-col items-center gap-3">
          <p className="text-[11px] text-anime-text-muted text-center">
            © {new Date().getFullYear()} <a href="/" className="font-medium hover:text-foreground story-link">AnimeFlow</a> | Website Made by <strong>Miruro no Kuon</strong> v0.9.9.3
          </p>

          <div className="inline-flex rounded-xl bg-anime-dark-bg/60 border border-anime-border p-1">
            {icons.map(({ Comp, label }, idx) => (
              <button
                key={label}
                type="button"
                className={`px-3 py-2 rounded-lg transition-colors text-anime-text-muted hover:text-foreground hover:bg-anime-primary/10 ${idx !== icons.length - 1 ? 'mr-0.5' : ''}`}
                aria-label={label}
              >
                <Comp size={16} aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
