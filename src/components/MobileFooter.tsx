import { Link } from "react-router-dom";
import React from "react";

interface MobileFooterProps {
  // Height of the bottom navigation so we can avoid overlap
  bottomOffset?: number;
  className?: string;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ bottomOffset = 0, className }) => {
  // Ensure footer content is not hidden behind the fixed bottom nav and respects safe areas
  const paddingBottom = `calc(${bottomOffset}px + max(16px, env(safe-area-inset-bottom, 0px)))`;

  return (
    <footer
      role="contentinfo"
      className={`lg:hidden w-full border-t border-anime-border bg-anime-dark-bg ${className || ""}`}
      style={{ paddingBottom }}
    >
      <div className="px-4 pt-4">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Go to homepage" className="inline-flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-anime-primary/15 border border-anime-border flex items-center justify-center">
              <span className="text-[10px] font-bold text-anime-primary">AF</span>
            </div>
            <span className="text-base font-semibold text-foreground tracking-tight">AnimeFlow</span>
          </Link>

          {/* Optional theme icons (visual only) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Light theme"
              className="w-9 h-9 rounded-md bg-anime-card-bg border border-anime-border text-anime-text-muted hover:text-foreground transition-colors"
            >
              <i className="fas fa-sun text-sm" />
            </button>
            <button
              type="button"
              aria-label="Dark theme"
              className="w-9 h-9 rounded-md bg-anime-card-bg border border-anime-border text-anime-text-muted hover:text-foreground transition-colors"
            >
              <i className="fas fa-moon text-sm" />
            </button>
          </div>
        </div>

        {/* Info text */}
        <p className="mt-3 text-[12px] leading-relaxed text-anime-text-muted">
          Stream and track your favorite anime with a clean, fast experience. Stay updated with the latest episodes and top airing shows.
        </p>

        {/* Quick Links */}
        <nav aria-label="Footer links" className="mt-4">
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
            <li>
              <Link to="/about" className="text-anime-text-muted hover:text-foreground transition-colors">About</Link>
            </li>
            <li>
              <Link to="/domains" className="text-anime-text-muted hover:text-foreground transition-colors">Domains</Link>
            </li>
            <li>
              <Link to="/donate" className="text-anime-text-muted hover:text-foreground transition-colors">Donate</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-anime-text-muted hover:text-foreground transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="text-anime-text-muted hover:text-foreground transition-colors">Terms of Service</Link>
            </li>
          </ul>
        </nav>

        {/* Subtle divider */}
        <div className="mt-4 h-px bg-anime-border/60" />

        {/* Copyright */}
        <div className="py-3">
          <p className="text-[11px] text-anime-text-muted">© {new Date().getFullYear()} AnimeFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
