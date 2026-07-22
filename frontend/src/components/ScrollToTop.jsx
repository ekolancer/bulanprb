import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Resets scroll position to top on every route change.
// react-router-dom v7 (non-data mode) does not auto-restore scroll,
// browsers also try to restore previous scroll on back/forward —
// disable that so our reset is authoritative.
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
