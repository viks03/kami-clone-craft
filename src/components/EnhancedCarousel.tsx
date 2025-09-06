import React, { useState, useEffect, memo } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Star, Calendar, Clock } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface Anime {
  id: string;
  name: string;
  poster: string;
  episodes?: string | { sub: number | null; dub: number | null };
  type?: string;
  description?: string;
  rating?: string;
  year?: string;
  duration?: string;
}

interface EnhancedCarouselProps {
  animes: Anime[];
}

export const EnhancedCarousel = memo(({ animes }: EnhancedCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || animes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % animes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [animes.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % animes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + animes.length) % animes.length);
  };

  const currentAnime = animes[currentSlide];

  if (!currentAnime) return null;

  return (
    <div 
      className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-anime-card-bg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <LazyImage
          src={currentAnime.poster}
          alt={currentAnime.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="px-6 lg:px-12 py-8 max-w-2xl">
          {/* Anime Type Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-anime-primary/20 text-anime-primary text-sm font-medium rounded-full border border-anime-primary/30">
              {currentAnime.type || 'TV Series'}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{currentAnime.rating || '8.5'}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold font-outfit text-white mb-4 leading-tight">
            {currentAnime.name}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{currentAnime.year || '2024'}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-300 text-xs">
              <Clock className="h-4 w-4" />
              <span>{currentAnime.duration || '24 mins'}</span>
            </div>
            <span className="text-anime-primary">{typeof currentAnime.episodes === 'object' ? `${currentAnime.episodes.sub || currentAnime.episodes.dub || '??'} Episodes` : currentAnime.episodes || '24 Episodes'}</span>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl line-clamp-3">
            {currentAnime.description || 
             "This is a world where heroes are created by people's trust, and the hero who gains the most trust is known as X. In this world, people's trust can be quantified through data, and these values are reflected on everyone's wrist."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
              <Play className="h-5 w-5 fill-current" />
              WATCH NOW
            </button>
            <button className="flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200">
              <Info className="h-5 w-5" />
              DETAILS
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {animes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
});