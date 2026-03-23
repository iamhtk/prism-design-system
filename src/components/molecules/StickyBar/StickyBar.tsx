import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import styles from './StickyBar.module.css';

const FOOTER_NEAR_PX = 100;

export type StickyBarProps = {
  children: ReactNode;
  visible?: boolean;
  background?: string;
};

export const StickyBar = ({
  children,
  visible = true,
  background,
}: StickyBarProps) => {
  const [nearPageBottom, setNearPageBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        el.scrollHeight,
      );
      const viewBottom = window.scrollY + window.innerHeight;
      setNearPageBottom(viewBottom >= scrollHeight - FOOTER_NEAR_PX);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!visible || nearPageBottom) {
    return null;
  }

  const rootClass = [styles.root, styles.visible].join(' ');

  const style: CSSProperties | undefined =
    background !== undefined ? { background } : undefined;

  return (
    <div className={rootClass} style={style} role="region" aria-label="Sticky actions">
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
