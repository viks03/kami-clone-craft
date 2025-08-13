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
      "flex items-center bg-anime-card-bg border border-anime-border rounded-lg overflow-hidden",
      "shadow-sm hover:shadow-md transition-all duration-200",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center px-3 py-2 text-sm font-medium transition-all duration-200",
          "border-r border-anime-border/50",
          currentPage <= 1 
            ? "text-anime-text-muted cursor-not-allowed opacity-50" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/5"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden xs:inline ml-1">Prev</span>
      </button>

      {/* Current Page Info */}
      <div className="flex items-center justify-center px-4 py-2 bg-anime-primary/10 text-anime-primary font-medium text-sm min-w-[80px]">
        <span className="hidden xs:inline">Page </span>
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center px-3 py-2 text-sm font-medium transition-all duration-200",
          "border-l border-anime-border/50",
          currentPage >= totalPages 
            ? "text-anime-text-muted cursor-not-allowed opacity-50" 
            : "text-anime-text hover:text-anime-primary hover:bg-anime-primary/5"
        )}
      >
        <span className="hidden xs:inline mr-1">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};