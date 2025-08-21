import React, { useState, useEffect } from 'react';
import { Sun, Moon, Cat, Sparkles, Monitor } from 'lucide-react';
import Cookies from 'js-cookie';

export const Footer: React.FC<{ className?: string }>= ({ className }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('user');

  const icons = [
    { Comp: Moon, label: 'AnimeFlow Theme', theme: 'user' },
    { Comp: Sun, label: 'Sun Theme', theme: 'sun' },
    { Comp: Sparkles, label: 'Mystical Theme', theme: 'moon' },
    { Comp: Cat, label: 'Anime Theme', theme: 'cat' },
    { Comp: Monitor, label: 'System Theme', theme: 'system' },
  ];

  // Load theme from cookie on mount and listen to system changes
  useEffect(() => {
    const savedTheme = Cookies.get('animeflow-theme') || 'user';
    setSelectedTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (savedTheme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (theme: string) => {
    const body = document.body;
    // Remove all theme classes
    body.classList.remove('sun-theme', 'moon-theme', 'cat-theme', 'dark');
    
    // Apply the selected theme
    switch (theme) {
      case 'sun':
        body.classList.add('sun-theme');
        break;
      case 'moon':
        body.classList.add('moon-theme');
        break;
      case 'cat':
        body.classList.add('cat-theme');
        break;
      case 'system':
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          // Use default dark theme (no additional class)
        } else {
          body.classList.add('sun-theme'); // Use sun theme for light system preference
        }
        break;
      case 'user':
      default:
        // Default AnimeFlow theme (no additional class needed)
        break;
    }
  };

  const handleThemeChange = (theme: string) => {
    if (['user', 'sun', 'moon', 'cat', 'system'].includes(theme)) {
      setSelectedTheme(theme);
      Cookies.set('animeflow-theme', theme, { expires: 365 });
      applyTheme(theme);
    }
  };

  return (
    <footer className={`mt-6 px-2 sm:px-4 lg:px-0 ${className || ''}`} role="contentinfo">
      <div className="bg-anime-card-bg/60 border border-anime-border/70 rounded-xl py-4 px-4 sm:px-6">
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
            {icons.map(({ Comp, label, theme }, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => handleThemeChange(theme)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  selectedTheme === theme
                    ? 'text-foreground bg-anime-primary/20 shadow-glow'
                    : 'text-anime-text-muted hover:text-foreground hover:bg-anime-primary/10'
                } ${idx !== icons.length - 1 ? 'mr-0.5' : ''}`}
                aria-label={label}
                aria-pressed={selectedTheme === theme}
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
