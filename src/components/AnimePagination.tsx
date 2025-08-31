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
      "flex items-center bg-anime-primary/10 rounded-md border border-anime-primary/20",
      "h-8 flex-shrink-0",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-l-md",
          "hover:bg-anime-primary/20",
          currentPage <= 1 
            ? "text-anime-text-muted cursor-not-allowed" 
            : "text-anime-text hover:text-anime-primary"
        )}
      >
        <ChevronLeft className="w-3 h-3" />
      </button>

      {/* Current Page */}
      <div className="flex items-center justify-center px-3 h-8 text-anime-text font-medium text-sm min-w-[32px] bg-anime-primary/5">
        {currentPage}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-r-md",
          "hover:bg-anime-primary/20",
          currentPage >= totalPages 
            ? "text-anime-text-muted cursor-not-allowed" 
            : "text-anime-text hover:text-anime-primary"
        )}
      >
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};