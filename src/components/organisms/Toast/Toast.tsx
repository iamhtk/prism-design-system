import {
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from 'react';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastItemData = {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  title?: string;
};

type ToastViewProps = {
  item: ToastItemData;
  slideFrom: 'left' | 'right';
  onDismissed: (id: string) => void;
};

const railClassMap = {
  success: styles.railSuccess,
  error: styles.railError,
  warning: styles.railWarning,
  info: styles.railInfo,
} as const;

function motionClass(
  slide: 'left' | 'right',
  phase: 'enter' | 'idle' | 'exit',
): string {
  if (slide === 'right') {
    if (phase === 'enter') return styles.motionRightEnter;
    if (phase === 'idle') return styles.motionRightIdle;
    return styles.motionRightExit;
  }
  if (phase === 'enter') return styles.motionLeftEnter;
  if (phase === 'idle') return styles.motionLeftIdle;
  return styles.motionLeftExit;
}

export function ToastView({ item, slideFrom, onDismissed }: ToastViewProps) {
  const variant = item.variant ?? 'info';
  const [phase, setPhase] = useState<'enter' | 'idle' | 'exit'>('enter');
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const exitingRef = useRef(false);
  const removedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissRef = useRef<() => void>(() => {});

  dismissRef.current = () => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPhase('exit');
  };

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'opacity') return;
    if (phaseRef.current !== 'exit' || removedRef.current) return;
    removedRef.current = true;
    onDismissed(item.id);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('idle'));
    });
    timeoutRef.current = setTimeout(
      () => dismissRef.current(),
      item.duration ?? 4000,
    );
    return () => {
      cancelAnimationFrame(raf);
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [item.duration]);

  const rootClass = [styles.root, motionClass(slideFrom, phase)].join(' ');
  const railClass = [styles.rail, railClassMap[variant]].join(' ');

  return (
    <div
      className={rootClass}
      role="status"
      aria-live="polite"
      onTransitionEnd={handleTransitionEnd}
    >
      <span className={railClass} aria-hidden="true" />
      <div className={styles.body}>
        {item.title != null ? (
          <p className={styles.title}>{item.title}</p>
        ) : null}
        <p className={styles.message}>{item.message}</p>
      </div>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss notification"
        onClick={() => dismissRef.current()}
      >
        ×
      </button>
    </div>
  );
}
