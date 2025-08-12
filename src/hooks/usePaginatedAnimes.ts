import { useState, useMemo } from 'react';
import { LatestEpisodeAnime } from '@/data/animeData';

interface UsePaginatedAnimesProps {
  animes: LatestEpisodeAnime[];
  itemsPerPage?: number;
}

interface UsePaginatedAnimesReturn {
  currentPage: number;
  totalPages: number;
  currentAnimes: LatestEpisodeAnime[];
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const usePaginatedAnimes = ({ 
  animes, 
  itemsPerPage = 15 
}: UsePaginatedAnimesProps): UsePaginatedAnimesReturn => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(animes.length / itemsPerPage);

  const currentAnimes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return animes.slice(startIndex, endIndex);
  }, [animes, currentPage, itemsPerPage]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const nextPage = () => {
    if (canGoNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (canGoPrev) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleSetCurrentPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    currentAnimes,
    setCurrentPage: handleSetCurrentPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev
  };
};