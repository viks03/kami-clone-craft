import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { LatestEpisodeAnime } from '@/data/animeData';

interface UseOptimizedPaginationProps {
  animes: LatestEpisodeAnime[];
  itemsPerPage?: number;
}

interface UseOptimizedPaginationReturn {
  currentPage: number;
  totalPages: number;
  currentAnimes: LatestEpisodeAnime[];
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isTransitioning: boolean;
}

export const useOptimizedPagination = ({ 
  animes, 
  itemsPerPage = 15 
}: UseOptimizedPaginationProps): UseOptimizedPaginationReturn => {
  const [currentPage, setCurrentPageState] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const animesRef = useRef(animes);

  // Update animes ref when animes change
  useEffect(() => {
    animesRef.current = animes;
    // Reset to page 1 if current page exceeds available pages
    const maxPages = Math.ceil(animes.length / itemsPerPage);
    if (currentPage > maxPages && maxPages > 0) {
      setCurrentPageState(1);
    }
  }, [animes, itemsPerPage, currentPage]);

  const totalPages = useMemo(() => 
    Math.ceil(animesRef.current.length / itemsPerPage), 
    [animesRef.current.length, itemsPerPage]
  );

  const currentAnimes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return animesRef.current.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const setCurrentPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setIsTransitioning(true);
      
      // Clear existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      // Immediate page change for snappy response
      setCurrentPageState(page);
      
      // End transition after a short delay
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }
  }, [totalPages, currentPage]);

  const nextPage = useCallback(() => {
    if (canGoNext) {
      setCurrentPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, setCurrentPage]);

  const prevPage = useCallback(() => {
    if (canGoPrev) {
      setCurrentPage(currentPage - 1);
    }
  }, [canGoPrev, currentPage, setCurrentPage]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentPage,
    totalPages,
    currentAnimes,
    setCurrentPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    isTransitioning
  };
};