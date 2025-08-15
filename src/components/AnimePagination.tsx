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
      "flex items-center gap-1 bg-anime-card-bg/80 backdrop-blur-sm rounded-xl p-1.5",
      "border border-anime-border/40 shadow-lg shadow-anime-primary/5",
      "flex-shrink-0",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-9 h-9 text-sm transition-all duration-300 rounded-lg",
          "bg-gradient-to-br from-anime-card-bg to-anime-card-bg/50",
          "border border-anime-border/30 hover:border-anime-primary/40",
          "shadow-sm hover:shadow-md hover:shadow-anime-primary/10",
          currentPage <= 1 
            ? "text-anime-text-muted cursor-not-allowed opacity-40" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/5 hover:scale-105"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Current Page */}
      <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-br from-anime-primary to-anime-primary/80 text-white font-semibold text-sm min-w-[44px] rounded-lg shadow-md shadow-anime-primary/20 border border-anime-primary/20">
        {currentPage}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-9 h-9 text-sm transition-all duration-300 rounded-lg",
          "bg-gradient-to-br from-anime-card-bg to-anime-card-bg/50",
          "border border-anime-border/30 hover:border-anime-primary/40",
          "shadow-sm hover:shadow-md hover:shadow-anime-primary/10",
          currentPage >= totalPages 
            ? "text-anime-text-muted cursor-not-allowed opacity-40" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/5 hover:scale-105"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};