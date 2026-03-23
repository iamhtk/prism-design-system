import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import styles from './Tooltip.module.css';

export type TooltipProps = {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
};

const positionClassMap = {
  top: styles.posTop,
  bottom: styles.posBottom,
  left: styles.posLeft,
  right: styles.posRight,
} as const;

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 200,
}: TooltipProps) => {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearShowTimeout = useCallback(() => {
    if (showTimeoutRef.current != null) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
  }, []);

  const scheduleShow = useCallback(() => {
    clearShowTimeout();
    showTimeoutRef.current = setTimeout(() => {
      setVisible(true);
      showTimeoutRef.current = null;
    }, delay);
  }, [clearShowTimeout, delay]);

  const hide = useCallback(() => {
    clearShowTimeout();
    setVisible(false);
  }, [clearShowTimeout]);

  useEffect(() => () => clearShowTimeout(), [clearShowTimeout]);

  const bubbleClass = [
    styles.bubble,
    positionClassMap[position],
    visible ? styles.bubbleVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={styles.wrap}
      onMouseEnter={scheduleShow}
      onMouseLeave={hide}
      onFocusCapture={scheduleShow}
      onBlurCapture={hide}
    >
      {children}
      <span
        id={tooltipId}
        className={bubbleClass}
        role="tooltip"
        aria-hidden={!visible}
      >
        {content}
      </span>
    </span>
  );
};
