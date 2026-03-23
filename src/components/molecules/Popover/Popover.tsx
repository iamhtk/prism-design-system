import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import styles from './Popover.module.css';

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  width?: string;
  closeOnClickOutside?: boolean;
};

const anchorClassMap = {
  top: styles.anchorTop,
  bottom: styles.anchorBottom,
  left: styles.anchorLeft,
  right: styles.anchorRight,
} as const;

export const Popover = ({
  trigger,
  children,
  title,
  position = 'bottom',
  width,
  closeOnClickOutside = true,
}: PopoverProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || !closeOnClickOutside) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open, closeOnClickOutside]);

  const surfaceStyle: CSSProperties =
    width !== undefined ? { width } : {};

  const anchorClass = [styles.anchor, anchorClassMap[position]].join(' ');
  const surfaceClass = [styles.surface, open ? styles.surfaceOpen : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={rootRef} className={styles.root}>
      <div
        className={styles.trigger}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        {trigger}
      </div>
      <div className={anchorClass}>
        <div className={surfaceClass} style={surfaceStyle}>
          {title != null ? <p className={styles.title}>{title}</p> : null}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};
