import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { ToastView, type ToastItemData, type ToastVariant } from './Toast';
import styles from './Toast.module.css';

export type ToastProviderProps = {
  children: ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

export type ToastContextValue = {
  addToast: (
    message: string,
    variant?: ToastVariant,
    title?: string,
    duration?: number,
  ) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

const containerClassMap = {
  'top-right': styles.posTopRight,
  'top-left': styles.posTopLeft,
  'bottom-right': styles.posBottomRight,
  'bottom-left': styles.posBottomLeft,
} as const;

export function ToastProvider({
  children,
  position = 'top-right',
}: ToastProviderProps) {
  const [items, setItems] = useState<ToastItemData[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (
      message: string,
      variant: ToastVariant = 'info',
      title?: string,
      duration?: number,
    ) => {
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setItems((prev) => [
        ...prev,
        { id, message, variant, title, duration },
      ]);
    },
    [],
  );

  const slideFrom =
    position === 'top-right' || position === 'bottom-right'
      ? 'right'
      : 'left';

  const containerClass = [styles.container, containerClassMap[position]].join(
    ' ',
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className={containerClass}>
          {items.map((item) => (
            <ToastView
              key={item.id}
              item={item}
              slideFrom={slideFrom}
              onDismissed={remove}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
