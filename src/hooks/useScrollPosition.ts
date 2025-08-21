import { useEffect, useRef } from 'react';

const SCROLL_POSITION_KEY = 'animeflow_scroll_position';

export const useScrollPosition = () => {
  const isRestoringRef = useRef(false);

  useEffect(() => {
    // Restore scroll position on mount
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition && !isRestoringRef.current) {
      isRestoringRef.current = true;
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
        isRestoringRef.current = false;
      });
    }

    // Save scroll position on scroll
    const handleScroll = () => {
      if (!isRestoringRef.current) {
        sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Clear scroll position on page unload if user navigates away
    const handleBeforeUnload = () => {
      // Only clear if it's a navigation, not a refresh
      if (performance.navigation.type !== 1) {
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};