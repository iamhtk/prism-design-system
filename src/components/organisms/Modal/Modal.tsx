import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type TransitionEvent,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  /** Light surface for marketing / registration flows (default: dark dialog). */
  surface?: 'dark' | 'light';
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  surface = 'dark',
}: ModalProps) => {
  const titleId = useId();
  const [shouldRender, setShouldRender] = useState(false);
  const [active, setActive] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    closingRef.current = false;
    const id = requestAnimationFrame(() => {
      setShouldRender(true);
      requestAnimationFrame(() => setActive(true));
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    if (!shouldRender) return;
    closingRef.current = true;
    const id = requestAnimationFrame(() => setActive(false));
    return () => cancelAnimationFrame(id);
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldRender]);

  const handleDialogTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== 'opacity') return;
      if (closingRef.current && !active) {
        setShouldRender(false);
        closingRef.current = false;
      }
    },
    [active],
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!shouldRender) {
    return null;
  }

  const backdropClass = [styles.backdrop, active ? styles.backdropOpen : '']
    .filter(Boolean)
    .join(' ');

  const dialogClass = [
    styles.dialog,
    sizeClassMap[size],
    surface === 'light' ? styles.dialogLight : '',
    active ? styles.dialogOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className={backdropClass}
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        className={dialogClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title != null ? titleId : undefined}
        onMouseDown={(e) => e.stopPropagation()}
        onTransitionEnd={handleDialogTransitionEnd}
      >
        <div className={styles.header}>
          {title != null ? (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          ) : (
            <span />
          )}
          {showCloseButton ? (
            <button
              type="button"
              className={styles.close}
              aria-label="Close dialog"
              onClick={handleClose}
            >
              ×
            </button>
          ) : null}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
