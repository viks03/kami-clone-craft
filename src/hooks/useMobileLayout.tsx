import { useState, useEffect, useCallback } from 'react';

interface MobileLayoutState {
  bottomNavHeight: number;
  isMobile: boolean;
  contentPadding: number;
}

export const useMobileLayout = () => {
  const [layoutState, setLayoutState] = useState<MobileLayoutState>({
    bottomNavHeight: 0,
    isMobile: false,
    contentPadding: 0,
  });

  const updateLayout = useCallback(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (!isMobile) {
      setLayoutState({
        bottomNavHeight: 0,
        isMobile: false,
        contentPadding: 0,
      });
      return;
    }

    // Get bottom navigation height dynamically
    const bottomNav = document.querySelector('[data-bottom-nav]') as HTMLElement;
    const bottomNavHeight = bottomNav?.offsetHeight || 0;
    
    // Add extra padding to ensure footer never overlaps (16px buffer)
    const contentPadding = bottomNavHeight + 16;

    setLayoutState({
      bottomNavHeight,
      isMobile: true,
      contentPadding,
    });
  }, []);

  useEffect(() => {
    // Initial setup
    updateLayout();
    
    // Update on resize
    window.addEventListener('resize', updateLayout);
    
    // Update when DOM changes (in case bottom nav loads later)
    const observer = new MutationObserver(updateLayout);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['data-bottom-nav']
    });

    return () => {
      window.removeEventListener('resize', updateLayout);
      observer.disconnect();
    };
  }, [updateLayout]);

  return layoutState;
};