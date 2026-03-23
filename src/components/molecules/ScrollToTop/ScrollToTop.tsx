import { useEffect, useState } from 'react';
import styles from './ScrollToTop.module.css';

export type ScrollToTopProps = {
  threshold?: number;
  position?: 'bottom-right' | 'bottom-left';
};

export const ScrollToTop = ({
  threshold,
  position = 'bottom-right',
}: ScrollToTopProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const defaultThreshold = (() => {
      const raw = getComputedStyle(root)
        .getPropertyValue('--threshold-scroll-to-top')
        .trim();
      const n = parseInt(raw, 10);
      return Number.isFinite(n) ? n : 300;
    })();
    const limit = threshold ?? defaultThreshold;

    const onScroll = () => {
      setVisible(window.scrollY > limit);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const rootClass = [
    styles.root,
    position === 'bottom-right'
      ? styles.positionBottomRight
      : styles.positionBottomLeft,
    visible ? styles.visible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      aria-label="Scroll to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      ↑
    </button>
  );
};
