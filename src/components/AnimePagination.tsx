import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const AnimePagination: React.FC<AnimePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
          "bg-anime-card-bg border border-anime-border hover:border-anime-primary/30",
          currentPage <= 1 
            ? "text-anime-text-muted cursor-not-allowed opacity-50" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/5 hover:scale-105 active:scale-95"
        )}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className="flex items-center justify-center w-8 h-8 text-anime-text-muted">
                <MoreHorizontal className="w-4 h-4" />
              </div>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "min-w-[32px] h-8 px-2 text-sm font-medium rounded-md transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  page === currentPage
                    ? "bg-anime-primary text-white shadow-lg shadow-anime-primary/20 border border-anime-primary"
                    : "bg-anime-card-bg border border-anime-border text-anime-text hover:text-anime-primary hover:bg-anime-primary/5 hover:border-anime-primary/30"
                )}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
          "bg-anime-card-bg border border-anime-border hover:border-anime-primary/30",
          currentPage >= totalPages 
            ? "text-anime-text-muted cursor-not-allowed opacity-50" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/5 hover:scale-105 active:scale-95"
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};