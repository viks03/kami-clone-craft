
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  return (
    <div className={cn(
      "flex items-center bg-anime-primary/10 backdrop-blur-sm rounded-lg border border-anime-primary/20",
      "h-10 flex-shrink-0 overflow-hidden",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-10 h-10 transition-all duration-200",
          "hover:bg-anime-primary/20",
          currentPage <= 1 
            ? "text-anime-text-muted/50 cursor-not-allowed" 
            : "text-anime-primary hover:text-anime-primary"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Current Page */}
      <div className="flex items-center justify-center px-3 h-10 text-anime-primary font-bold text-sm min-w-[40px] bg-anime-primary/10 border-x border-anime-primary/20">
        {currentPage}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-10 h-10 transition-all duration-200",
          "hover:bg-anime-primary/20",
          currentPage >= totalPages 
            ? "text-anime-text-muted/50 cursor-not-allowed" 
            : "text-anime-primary hover:text-anime-primary"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
