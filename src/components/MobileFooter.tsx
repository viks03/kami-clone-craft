import React from 'react';
import { Sun, Moon, Wand2, Flame, Gamepad2 } from 'lucide-react';

export const MobileFooter: React.FC = () => {
  const icons = [
    { Comp: Sun, label: 'Light theme' },
    { Comp: Moon, label: 'Dark theme' },
    { Comp: Wand2, label: 'Magic' },
    { Comp: Flame, label: 'Power' },
    { Comp: Gamepad2, label: 'Games' },
  ];

  return (
    <footer className="lg:hidden mt-8 border-t border-anime-border bg-anime-dark-bg" role="contentinfo">
      <div className="px-4 py-6">
        <a href="/" className="inline-flex items-center gap-2 text-foreground hover:text-anime-primary transition-colors">
          <span className="text-lg font-bold">AnimeFlow</span>
        </a>

        <p className="mt-2 text-xs text-anime-text-muted">
          Watch and explore anime in a fast, elegant mobile experience. Stay tuned for updates and new features.
        </p>

        <nav aria-label="Footer links" className="mt-4">
          <ul className="flex flex-wrap gap-3 text-xs text-anime-text-muted">
            <li>
              <a href="/about" className="hover:text-foreground transition-colors story-link">About</a>
            </li>
            <li>
              <a href="/domains" className="hover:text-foreground transition-colors story-link">Domains</a>
            </li>
            <li>
              <a href="/donate" className="hover:text-foreground transition-colors story-link">Donate</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-foreground transition-colors story-link">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-foreground transition-colors story-link">Terms of Service</a>
            </li>
          </ul>
        </nav>

        <div className="mt-5 flex items-center justify-between">
          {icons.map(({ Comp, label }) => (
            <div
              key={label}
              className="size-10 rounded-full bg-anime-card-bg border border-anime-border text-anime-text-muted flex items-center justify-center hover:text-foreground hover:border-anime-primary hover:bg-anime-primary/10 transition-all hover-scale"
              aria-label={label}
              role="img"
            >
              <Comp size={18} aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
