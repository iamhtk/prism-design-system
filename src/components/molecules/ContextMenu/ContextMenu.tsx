import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import styles from './ContextMenu.module.css';

export type ContextMenuItem = {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  trigger: ReactNode;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
};

const positionClassMap = {
  'bottom-left': styles.posBottomLeft,
  'bottom-right': styles.posBottomRight,
  'top-left': styles.posTopLeft,
  'top-right': styles.posTopRight,
} as const;

export const ContextMenu = ({
  items,
  trigger,
  position = 'bottom-left',
}: ContextMenuProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const menuClass = [
    styles.menu,
    positionClassMap[position],
    open ? styles.menuOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onContextMenu={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
    >
      <div
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>
      <ul className={menuClass} role="menu">
        {items.map((item, index) => {
          if (item.divider) {
            return (
              <li key={`div-${index}`} role="presentation">
                <div className={styles.divider} aria-hidden />
              </li>
            );
          }

          const itemClass = [
            styles.item,
            item.disabled ? styles.itemDisabled : '',
            item.destructive ? styles.itemDestructive : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li key={`${item.label ?? 'item'}-${index}`} role="none">
              <button
                type="button"
                role="menuitem"
                className={itemClass}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  item.onClick?.();
                  setOpen(false);
                }}
              >
                {item.icon != null ? (
                  <span className={styles.iconSlot} aria-hidden>
                    {item.icon}
                  </span>
                ) : null}
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
