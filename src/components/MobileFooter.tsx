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
    <footer className="mt-8 border-t border-anime-border bg-anime-dark-bg" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top area: brand + links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-foreground hover:text-anime-primary transition-colors">
              <span className="text-lg font-bold">AnimeFlow</span>
            </a>
            <p className="mt-3 text-sm text-anime-text-muted">
              Watch and explore anime in a fast, elegant experience. Stay tuned for updates and new features.
            </p>
          </div>

          <nav aria-label="Footer links" className="lg:flex lg:items-start lg:justify-end">
            <ul className="grid grid-cols-2 gap-3 text-sm text-anime-text-muted lg:text-right">
              <li>
                <a href="/about" className="hover:text-foreground transition-colors">About</a>
              </li>
              <li>
                <a href="/domains" className="hover:text-foreground transition-colors">Domains</a>
              </li>
              <li>
                <a href="/donate" className="hover:text-foreground transition-colors">Donate</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </li>
              <li className="col-span-2 lg:col-span-1">
                <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-6 border-t border-anime-border/70" />

        {/* Bottom area: copyright + icon pill */}
        <div className="mt-4 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <p className="text-xs text-anime-text-muted">© {new Date().getFullYear()} AnimeFlow. All rights reserved.</p>

          {/* Icon pill - visual only */}
          <div className="inline-flex rounded-xl bg-anime-card-bg border border-anime-border p-1 backdrop-blur-sm">
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

export default MobileFooter;
