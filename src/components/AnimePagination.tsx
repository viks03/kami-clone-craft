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
      "flex items-center bg-transparent border-0 rounded-lg overflow-hidden",
      "flex-shrink-0",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-8 h-8 text-sm transition-all duration-200 rounded-l-md",
          "bg-anime-card-bg/50 border border-anime-border border-r-0",
          currentPage <= 1 
            ? "text-anime-text-muted cursor-not-allowed opacity-50" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/10"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Current Page */}
      <div className="flex items-center justify-center px-3 py-2 bg-anime-primary/20 text-anime-primary font-medium text-sm min-w-[40px] border border-anime-border border-x-0">
        {currentPage}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-8 h-8 text-sm transition-all duration-200 rounded-r-md",
          "bg-anime-card-bg/50 border border-anime-border border-l-0",
          currentPage >= totalPages 
            ? "text-anime-text-muted cursor-not-allowed opacity-50" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/10"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};