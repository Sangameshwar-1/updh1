import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reveals every [data-reveal] element as it scrolls into view, re-arming on
 * each route change. Elements start hidden in CSS, so when a visitor has asked
 * for reduced motion we must still mark them visible or the page stays blank.
 */
export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );

    nodes.forEach((n) => {
      n.classList.remove('is-visible');
      io.observe(n);
    });

    return () => io.disconnect();
  }, [pathname]);
}

/** Percentage of the page scrolled, for the header progress bar. */
export function useScrollProgress(onChange: (pct: number) => void) {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      onChange(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onChange]);
}

/** Jump to the top when the route changes, without fighting smooth scrolling. */
export function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
}
