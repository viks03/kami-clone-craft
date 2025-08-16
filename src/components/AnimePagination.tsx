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
      "flex items-center bg-black/40 backdrop-blur-sm rounded-lg border border-white/10",
      "h-8 flex-shrink-0",
      className
    )}>
      {/* Previous Button */}
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-l-lg",
          "hover:bg-white/10",
          currentPage <= 1 
            ? "text-white/40 cursor-not-allowed" 
            : "text-white/70 hover:text-white"
        )}
      >
        <ChevronLeft className="w-3 h-3" />
      </button>

      {/* Current Page */}
      <div className="flex items-center justify-center px-3 h-8 text-white/90 font-medium text-sm min-w-[32px] bg-white/5">
        {currentPage}
      </div>

      {/* Next Button */}
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-r-lg",
          "hover:bg-white/10",
          currentPage >= totalPages 
            ? "text-white/40 cursor-not-allowed" 
            : "text-white/70 hover:text-white"
        )}
      >
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};