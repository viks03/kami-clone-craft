import { Link } from "react-router-dom";
import { Sun, Moon, Cat, Smile, User } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-6 mb-4 px-4 lg:px-4">
      <div className="bg-anime-card-bg/60 border border-anime-border rounded-xl p-5 lg:p-6 shadow-card backdrop-blur-sm">
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* Left: Logo & Disclaimer */}
          <div className="flex flex-col gap-3">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-foreground hover:text-anime-primary transition-colors group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-anime-primary to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              <span className="text-lg font-bold leading-none">AnimeFlow</span>
            </Link>

            <p className="text-sm text-anime-text-muted leading-relaxed">
              This website does not retain any files on its server. Rather, it solely provides links to media content hosted by third-party services.
            </p>
          </div>

          {/* Center: Links & Copyright */}
          <div className="flex flex-col items-start lg:items-center gap-4">
            <nav aria-label="Footer links" className="w-full">
              <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-center text-sm">
                <li>
                  <a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors hover:underline underline-offset-4">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors hover:underline underline-offset-4">
                    Domains
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors hover:underline underline-offset-4">
                    Donate ❤️
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors hover:underline underline-offset-4">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 hover:text-anime-primary transition-colors hover:underline underline-offset-4">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </nav>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-anime-border to-transparent" />

            <div className="text-center lg:text-center">
              <p className="text-xs text-anime-text-muted">
                © 2025{" "}
                <Link 
                  to="/" 
                  className="hover:text-anime-primary underline-offset-4 hover:underline font-medium"
                >
                  AnimeFlow
                </Link>
                {" "}| Website Made by{" "}
                <strong className="font-semibold text-foreground bg-gradient-to-r from-anime-primary to-purple-500 bg-clip-text text-transparent">
                  Miruro no Kuon
                </strong>
                {" "}v0.9.9.3
              </p>
            </div>
          </div>

          {/* Right: Theme Switcher Icons */}
          <div className="flex lg:justify-end justify-start items-center gap-2 flex-wrap">
            {[
              { icon: Sun, label: "Light theme", color: "hover:text-yellow-400" },
              { icon: Moon, label: "Dark theme", color: "hover:text-blue-400" },
              { icon: Cat, label: "Anime theme 1", color: "hover:text-pink-400" },
              { icon: Smile, label: "Anime theme 2", color: "hover:text-green-400" },
              { icon: User, label: "Profile theme", color: "hover:text-purple-400" }
            ].map(({ icon: Icon, label, color }, index) => (
              <button
                key={index}
                aria-label={label}
                className={`w-10 h-10 rounded-lg bg-anime-dark-bg/40 border border-anime-border text-anime-text-muted hover:text-foreground hover:bg-anime-card-bg/70 hover:border-anime-primary/30 transition-all duration-300 flex items-center justify-center group ${color}`}
              >
                <Icon size={16} className="group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};