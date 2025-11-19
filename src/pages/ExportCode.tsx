import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { animeData } from '@/data/animeData';

const ExportCode = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Generate complete standalone HTML
  const generateHTML = () => {
    const spotlightAnimes = animeData.spotlightAnimes.slice(0, 5);
    const latestAnimes = animeData.latestEpisodeAnimes.slice(0, 15);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AnimeFlow</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- FontAwesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* Custom CSS Variables - AnimeFlow Design System */
    :root {
      --anime-primary: 258 73% 62%;
      --anime-secondary: 254 45% 69%;
      --anime-dark-bg: 240 6% 5.5%;
      --anime-card-bg: 240 6% 8%;
      --anime-border: 0 0% 15%;
      --anime-text-muted: 0 0% 46%;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Karla', sans-serif;
      background-color: hsl(var(--anime-dark-bg));
      color: white;
      overflow-x: hidden;
    }
    
    /* Tailwind Config */
    .bg-anime-dark-bg { background-color: hsl(var(--anime-dark-bg)); }
    .bg-anime-card-bg { background-color: hsl(var(--anime-card-bg)); }
    .border-anime-border { border-color: hsl(var(--anime-border)); }
    .text-anime-primary { color: hsl(var(--anime-primary)); }
    .text-anime-secondary { color: hsl(var(--anime-secondary)); }
    .text-anime-text-muted { color: hsl(var(--anime-text-muted)); }
    .bg-anime-primary { background-color: hsl(var(--anime-primary)); }
    .bg-anime-secondary { background-color: hsl(var(--anime-secondary)); }
    .hover\\:bg-anime-secondary:hover { background-color: hsl(var(--anime-secondary)); }
    .hover\\:text-anime-primary:hover { color: hsl(var(--anime-primary)); }
    
    /* Hide scrollbar */
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    /* Carousel styles */
    .carousel-slide {
      transition: opacity 0.5s ease-in-out;
    }
    
    /* Mobile responsive */
    @media (max-width: 1024px) {
      .sidebar { display: none; }
      .mobile-header { display: flex; }
      .bottom-nav { display: flex; }
      .desktop-header { display: none !important; }
    }
    
    @media (min-width: 1024px) {
      .sidebar { display: block; }
      .mobile-header { display: none !important; }
      .bottom-nav { display: none !important; }
      .desktop-header { display: flex; }
    }
  </style>
</head>
<body>
  <div class="flex min-h-screen">
    <!-- Sidebar (Desktop) -->
    <aside class="sidebar w-[250px] bg-anime-dark-bg p-5 border-r border-anime-border">
      <div class="px-4 text-2xl font-bold text-anime-primary mb-6">AnimeFlow</div>
      <nav>
        <ul class="space-y-2">
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer bg-anime-secondary">
            <i class="fas fa-home text-lg"></i>
            <span>Home</span>
          </li>
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer hover:bg-anime-secondary transition-colors">
            <i class="fas fa-fire text-lg"></i>
            <span>Latest</span>
          </li>
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer hover:bg-anime-secondary transition-colors">
            <i class="fas fa-star text-lg"></i>
            <span>Trending</span>
          </li>
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer hover:bg-anime-secondary transition-colors">
            <i class="fas fa-history text-lg"></i>
            <span>History</span>
          </li>
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer hover:bg-anime-secondary transition-colors">
            <i class="fas fa-user text-lg"></i>
            <span>Profile</span>
          </li>
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer hover:bg-anime-secondary transition-colors">
            <i class="fas fa-cog text-lg"></i>
            <span>Settings</span>
          </li>
          <li class="flex items-center gap-2 px-4 py-4 rounded-[10px] text-base cursor-pointer hover:bg-anime-secondary transition-colors">
            <i class="fas fa-random text-lg"></i>
            <span>Random Anime</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col w-full" style="padding-bottom: 80px;">
      <!-- Mobile Header -->
      <div class="mobile-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 py-3 bg-anime-dark-bg" id="mobile-header">
        <div class="text-xl font-bold text-anime-primary">AnimeFlow</div>
        <div class="flex items-center gap-1.5">
          <button class="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-white hover:text-anime-primary transition-colors">
            <i class="fas fa-search text-sm"></i>
          </button>
          <div class="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center">
            <i class="fas fa-bell text-sm cursor-pointer hover:text-anime-primary transition-colors"></i>
          </div>
          <button class="w-10 h-10 bg-anime-card-bg border border-anime-border rounded-md flex items-center justify-center text-white hover:text-anime-primary transition-colors">
            <i class="fas fa-user-circle text-sm"></i>
          </button>
        </div>
      </div>

      <div class="w-full px-2.5 pt-14" style="padding-top: 56px;">
        <!-- Desktop Header -->
        <header class="desktop-header justify-between items-center my-4">
          <div class="flex items-center w-full max-w-[350px] h-[45px] px-4 bg-anime-card-bg border border-anime-border rounded-[10px] mr-4">
            <input type="text" placeholder="Search Anime" class="flex-1 bg-transparent text-anime-text-muted text-base outline-none" style="font-size: 16px;">
            <button class="text-white hover:text-anime-primary transition-colors text-base">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div class="flex items-center gap-4">
            <i class="fas fa-bell text-2xl cursor-pointer text-white hover:text-anime-primary transition-colors"></i>
            <i class="fas fa-user-circle text-2xl cursor-pointer text-white hover:text-anime-primary transition-colors"></i>
          </div>
        </header>

        <!-- Carousel -->
        <section class="relative h-[250px] sm:h-[350px] lg:h-[450px] mb-4 lg:mb-6 rounded-[10px] overflow-hidden" id="carousel">
          <div class="w-full h-full relative">
            <div class="absolute inset-0 bg-cover bg-center carousel-slide opacity-100 z-[2]" style="background-image: url('${spotlightAnimes[0]?.poster}');">
              <div class="absolute inset-0 bg-black bg-opacity-50"></div>
              <div class="relative p-4 sm:p-6 lg:p-8 max-w-[600px] h-full flex flex-col justify-start">
                <div class="mt-2 sm:mt-4">
                  <span class="inline-block bg-anime-primary text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-2">#${spotlightAnimes[0]?.rank} Spotlight</span>
                  <h2 class="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 line-clamp-2">${spotlightAnimes[0]?.name}</h2>
                  <p class="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">${spotlightAnimes[0]?.description}</p>
                  <div class="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    ${spotlightAnimes[0]?.otherInfo.map(info => '<span class="flex items-center gap-1 text-xs sm:text-sm bg-black bg-opacity-50 px-2 sm:px-3 py-1 rounded-full"><i class="fas fa-play"></i>' + info + '</span>').join('')}
                  </div>
                  <button class="bg-anime-primary hover:bg-opacity-90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all inline-flex items-center gap-2">
                    <i class="fas fa-play"></i>
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Carousel Dots -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            ${spotlightAnimes.map((_, i) => '<button class="w-2 h-2 rounded-full ' + (i === 0 ? 'bg-anime-primary' : 'bg-gray-400') + ' transition-all duration-300"></button>').join('')}
          </div>
        </section>

        <!-- Recently Updated Section -->
        <section class="recently-updated mb-8">
          <!-- Filter Buttons and Pagination -->
          <div class="relative mb-4">
            <div class="flex items-center bg-anime-card-bg border border-anime-border rounded-lg p-1 relative">
              <div class="flex-1 overflow-x-auto scrollbar-hide relative">
                <div class="flex bg-transparent rounded-lg p-0 gap-0">
                  <button class="px-3 py-1.5 text-sm font-bold rounded-md bg-anime-primary text-white whitespace-nowrap">Newest</button>
                  <button class="px-3 py-1.5 text-sm font-bold rounded-md text-anime-text-muted hover:text-white hover:bg-anime-card-bg/80 whitespace-nowrap transition-all">Trending</button>
                  <button class="px-3 py-1.5 text-sm font-bold rounded-md text-anime-text-muted hover:text-white hover:bg-anime-card-bg/80 whitespace-nowrap transition-all">Top Rated</button>
                </div>
              </div>
              
              <!-- Pagination -->
              <div class="flex items-center flex-shrink-0 ml-4 gap-1">
                <button class="w-8 h-8 flex items-center justify-center rounded-md bg-anime-card-bg border border-anime-border text-anime-text-muted hover:text-anime-primary hover:border-anime-primary transition-all">
                  <i class="fas fa-chevron-left text-xs"></i>
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded-md bg-anime-card-bg border border-anime-border text-anime-text-muted hover:text-anime-primary hover:border-anime-primary transition-all">
                  <i class="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Anime Grid -->
          <div class="grid grid-cols-3 lg:grid-cols-3 gap-4 min-h-[600px]">
            ${latestAnimes.map((anime, index) => `
            <div class="animate-fade-in" style="animation-delay: ${index * 50}ms; animation-fill-mode: both;">
              <div class="relative group cursor-pointer rounded-[10px] overflow-hidden bg-anime-card-bg border border-anime-border">
                <div class="relative aspect-[2/3] overflow-hidden">
                  <img src="${anime.poster}" alt="${anime.name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy">
                  <div class="absolute top-2 left-2 flex flex-col gap-1">
                    <span class="bg-anime-primary text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">SUB</span>
                    <span class="bg-green-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded">DUB</span>
                  </div>
                  <div class="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-[10px] sm:text-xs px-2 py-1 rounded flex items-center gap-1">
                    <i class="fas fa-closed-captioning text-[10px]"></i>
                    <span>${anime.episodes?.sub || 'N/A'}</span>
                  </div>
                </div>
                <div class="p-2 sm:p-3">
                  <h3 class="text-white text-xs sm:text-sm font-semibold line-clamp-2 mb-1 group-hover:text-anime-primary transition-colors">${anime.name}</h3>
                  <div class="flex items-center gap-2 text-[10px] sm:text-xs text-anime-text-muted">
                    <span class="flex items-center gap-1">
                      <i class="fas fa-tv"></i>
                      ${anime.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            `).join('')}
          </div>
        </section>

        <!-- Footer -->
        <footer class="mt-6 px-2.5">
          <div class="bg-anime-card-bg/60 border border-anime-border rounded-xl py-4 px-4 sm:px-6">
            <a href="/" class="inline-flex items-center gap-2 text-white hover:text-anime-primary transition-colors">
              <span class="text-base font-bold">AnimeFlow</span>
            </a>
            <p class="mt-2 text-xs text-anime-text-muted">
              This website does not retain any files on its server. Rather, it solely provides links to media content hosted by third-party services.
            </p>
            <div class="mt-4 flex flex-wrap gap-3 text-xs text-anime-text-muted">
              <a href="#" class="hover:text-anime-primary transition-colors">Terms of Service</a>
              <a href="#" class="hover:text-anime-primary transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-anime-primary transition-colors">Contact</a>
              <a href="#" class="hover:text-anime-primary transition-colors">About</a>
            </div>
            <div class="mt-4 pt-4 border-t border-anime-border text-xs text-anime-text-muted text-center">
              © 2024 AnimeFlow. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </main>

    <!-- Bottom Navigation (Mobile) -->
    <div class="bottom-nav fixed bottom-0 left-0 right-0 bg-anime-dark-bg border-t border-anime-border z-50">
      <div class="flex justify-between items-center px-3 py-3">
        <button class="flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg text-anime-primary bg-anime-primary/10">
          <div class="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-anime-primary rounded-full"></div>
          <i class="fas fa-home text-[15px] mb-1"></i>
          <span class="text-[10px] font-medium">Home</span>
        </button>
        <button class="flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg text-anime-text-muted hover:text-white">
          <i class="fas fa-plus text-[15px] mb-1"></i>
          <span class="text-[10px] font-medium">Newest</span>
        </button>
        <button class="flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg text-anime-text-muted hover:text-white">
          <i class="fas fa-fire text-[15px] mb-1"></i>
          <span class="text-[10px] font-medium">Trending</span>
        </button>
        <button class="flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg text-anime-text-muted hover:text-white">
          <i class="fas fa-cog text-[15px] mb-1"></i>
          <span class="text-[10px] font-medium">Settings</span>
        </button>
        <button class="flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-lg text-anime-text-muted hover:text-white">
          <i class="fas fa-chevron-right text-[15px] mb-1"></i>
          <span class="text-[10px] font-medium">More</span>
        </button>
      </div>
    </div>
  </div>

  <script>
    // Carousel Auto-play
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('#carousel button');
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
        slide.style.zIndex = i === index ? '2' : '1';
      });
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('bg-anime-primary');
          dot.classList.remove('bg-gray-400');
        } else {
          dot.classList.remove('bg-anime-primary');
          dot.classList.add('bg-gray-400');
        }
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Auto-advance every 6 seconds
    setInterval(nextSlide, 6000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    // Smooth scroll to top
    window.addEventListener('scroll', function() {
      const header = document.getElementById('mobile-header');
      if (header) {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        } else {
          header.style.boxShadow = 'none';
        }
      }
    });
  </script>
</body>
</html>`;
  };

  const htmlCode = generateHTML();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "HTML code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-anime-dark-bg p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-anime-primary mb-2">Export Code</h1>
            <p className="text-anime-text-muted">Copy the complete HTML code and save it as index.html on your desktop</p>
          </div>
          <a 
            href="/"
            className="text-anime-text-muted hover:text-anime-primary transition-colors flex items-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </a>
        </div>

        {/* Code Block Container */}
        <div className="relative bg-anime-card-bg border border-anime-border rounded-xl overflow-hidden">
          {/* Sticky Copy Button */}
          <div className="sticky top-0 z-10 bg-anime-card-bg border-b border-anime-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-anime-text-muted">
              <i className="fas fa-code"></i>
              <span className="text-sm font-medium">Standalone HTML</span>
            </div>
            <Button
              onClick={handleCopy}
              className="bg-anime-primary hover:bg-anime-primary/90 text-white font-semibold"
            >
              {copied ? (
                <>
                  <i className="fas fa-check mr-2"></i>
                  Copied!
                </>
              ) : (
                <>
                  <i className="fas fa-copy mr-2"></i>
                  Copy to Clipboard
                </>
              )}
            </Button>
          </div>

          {/* Code Display */}
          <div className="p-6">
            <Textarea
              value={htmlCode}
              readOnly
              className="font-mono text-sm bg-anime-dark-bg border-anime-border text-foreground min-h-[600px] resize-none focus-visible:ring-anime-primary"
              style={{ 
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto'
              }}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-anime-card-bg border border-anime-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-anime-primary mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle"></i>
            How to Use
          </h2>
          <ol className="space-y-3 text-anime-text-muted">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-anime-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Click the "Copy to Clipboard" button above</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-anime-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Create a new file called <code className="bg-anime-dark-bg px-2 py-1 rounded text-anime-primary">index.html</code> on your desktop</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-anime-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Paste the copied code into the file</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-anime-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Open the file in any web browser to see your AnimeFlow site!</span>
            </li>
          </ol>
          <div className="mt-4 p-4 bg-anime-dark-bg rounded-lg">
            <p className="text-sm text-anime-primary font-semibold mb-2">
              <i className="fas fa-check-circle mr-2"></i>
              Included Features:
            </p>
            <ul className="text-sm text-anime-text-muted space-y-1 ml-6">
              <li>• Tailwind CSS via CDN</li>
              <li>• FontAwesome icons</li>
              <li>• Google Fonts (Karla & Inter)</li>
              <li>• Responsive design (mobile & desktop)</li>
              <li>• Auto-playing carousel</li>
              <li>• Interactive navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportCode;
