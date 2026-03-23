import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Panel.module.css';

export type PanelProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  side?: 'left' | 'right';
  width?: string;
  showOverlay?: boolean;
};

export const Panel = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  width,
  showOverlay = true,
}: PanelProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const panelClass = [
    styles.panel,
    isOpen ? styles.panelOpen : '',
    side === 'left' ? styles.sideLeft : styles.sideRight,
    isOpen && side === 'left' ? styles.sideLeftOpen : '',
    isOpen && side === 'right' ? styles.sideRightOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  const node = (
    <>
      {showOverlay ? (
        <div
          className={[styles.backdrop, isOpen ? styles.backdropVisible : '']
            .filter(Boolean)
            .join(' ')}
          aria-hidden={!isOpen}
          onClick={() => isOpen && onClose()}
        />
      ) : null}
      <aside
        className={panelClass}
        style={width !== undefined ? { width } : undefined}
        aria-hidden={!isOpen}
        aria-modal={isOpen}
        role="dialog"
      >
        <div className={styles.header}>
          {title != null ? <h2 className={styles.title}>{title}</h2> : <span />}
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close panel"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </aside>
    </>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(node, document.body);
};
