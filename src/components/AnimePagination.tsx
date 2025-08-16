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
  return (
    <div className={cn(
      "flex items-center bg-anime-card-bg/80 backdrop-blur-sm rounded-lg border border-anime-border/40",
      "h-10 flex-shrink-0",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-l-lg",
          "hover:bg-anime-primary/10",
          currentPage <= 1 
            ? "text-anime-text-muted cursor-not-allowed" 
            : "text-anime-primary hover:text-anime-primary font-bold"
        )}
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Current Page */}
      <div className="flex items-center justify-center px-4 h-10 text-anime-primary font-bold text-sm min-w-[40px] bg-anime-primary/10 border-x border-anime-border/20">
        {currentPage}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-10 h-10 transition-all duration-200 rounded-r-lg",
          "hover:bg-anime-primary/10",
          currentPage >= totalPages 
            ? "text-anime-text-muted cursor-not-allowed" 
            : "text-anime-primary hover:text-anime-primary font-bold"
        )}
      >
        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};