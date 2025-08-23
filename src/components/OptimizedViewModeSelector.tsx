import React, { memo, useMemo, useCallback } from 'react';
import { Grid3x3, List, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'classic' | 'card-list' | 'anichart';

interface OptimizedViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  className?: string;
}

export const OptimizedViewModeSelector = memo(({
  currentMode,
  onModeChange,
  className
}: OptimizedViewModeSelectorProps) => {
  const modes = useMemo(() => [
    {
      id: 'classic' as ViewMode,
      label: 'Classic',
      icon: Grid3x3,
    },
    {
      id: 'card-list' as ViewMode,
      label: 'Card List',
      icon: List,
    },
    {
      id: 'anichart' as ViewMode,
      label: 'AniChart',
      icon: BarChart3,
    },
  ], []);

  const handleModeChange = useCallback((mode: ViewMode) => {
    onModeChange(mode);
  }, [onModeChange]);

  return (
    <div className={cn(
      "flex items-center bg-anime-card-bg border border-anime-border rounded-lg p-1",
      className
    )}>
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded-md transition-all whitespace-nowrap",
              isActive
                ? "bg-anime-primary text-white"
                : "text-anime-text-muted hover:text-anime-text hover:bg-anime-card-bg/80"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="font-bold">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
});