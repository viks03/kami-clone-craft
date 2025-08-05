import { LazyImage } from './LazyImage';
import { memo, useMemo } from 'react';
import { useResponsiveLayout, responsiveStyles } from '../hooks/useResponsiveLayout';

interface AnimeCardProps {
  name: string;
  poster: string;
  episodes?: { sub: number | null; dub: number | null };
  className?: string;
}

export const AnimeCard = memo(({ name, poster, episodes, className }: AnimeCardProps) => {
  const device = useResponsiveLayout();
  const styles = responsiveStyles(device);
  
  const episodeCount = useMemo(() => 
    episodes?.sub || episodes?.dub || 'N/A', 
  [episodes]);
  
  const cardSpacing = useMemo(() => ({
    indicatorSize: `${6 * device.scaleFactor}px`,
    gap: styles.spacing.sm,
    marginTop: styles.spacing.sm,
    marginBottom: `${4 * device.spacingScale}px`,
    badgePadding: `${2 * device.spacingScale}px ${6 * device.spacingScale}px`,
    iconGap: `${4 * device.spacingScale}px`
  }), [device.scaleFactor, device.spacingScale, styles.spacing]);
  
  return (
    <div className={`w-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${className || ''}`}>
      <LazyImage
        src={poster}
        alt={name}
        className="w-full aspect-[3/4] rounded"
        placeholder="Loading..."
      />
      <div style={{ marginTop: cardSpacing.marginTop }}>
        <div 
          className="flex items-center"
          style={{ 
            gap: cardSpacing.gap,
            marginBottom: cardSpacing.marginBottom
          }}
        >
          <div 
            className="bg-green-500 rounded-full flex-shrink-0"
            style={{ 
              width: cardSpacing.indicatorSize,
              height: cardSpacing.indicatorSize,
              minWidth: '4px',
              minHeight: '4px'
            }}
          />
          <p 
            className="text-white truncate flex-1"
            style={{ 
              fontSize: styles.fontSize.xs,
              lineHeight: '1.2'
            }}
          >
            {name}
          </p>
        </div>
        <div 
          className="flex items-center justify-between text-anime-text-muted"
          style={{ fontSize: styles.fontSize.xs }}
        >
          <span 
            className="bg-anime-card-bg border border-anime-border rounded"
            style={{ padding: cardSpacing.badgePadding }}
          >
            TV
          </span>
          <span 
            className="bg-anime-card-bg border border-anime-border rounded"
            style={{ padding: cardSpacing.badgePadding }}
          >
            2025
          </span>
          {episodes && (
            <span 
              className="bg-anime-card-bg border border-anime-border rounded text-green-500 flex items-center"
              style={{ 
                padding: cardSpacing.badgePadding,
                gap: cardSpacing.iconGap
              }}
            >
              <i 
                className="fas fa-closed-captioning"
                style={{ fontSize: `${8 * device.fontScale}px` }}
              />
              <span style={{ fontSize: styles.fontSize.xs }}>
                {episodeCount}/12
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});