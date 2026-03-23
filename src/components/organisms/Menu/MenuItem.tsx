import { createContext, useContext, type ReactNode } from 'react';
import styles from './Menu.module.css';

export const MenuVariantContext = createContext<'default' | 'compact'>(
  'default',
);

export type MenuItemProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  iconLeft?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
};

export const MenuItem = ({
  label,
  href,
  onClick,
  iconLeft,
  active = false,
  disabled = false,
  badge,
}: MenuItemProps) => {
  const variant = useContext(MenuVariantContext);

  const rootClass = [
    styles.item,
    variant === 'compact' ? styles.itemCompact : styles.itemDefault,
    active ? styles.active : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = [styles.label, active ? styles.labelActive : ''].join(' ');

  const content = (
    <>
      {iconLeft != null ? (
        <span className={styles.iconWrap} aria-hidden={true}>
          {iconLeft}
        </span>
      ) : null}
      <span className={labelClass}>{label}</span>
      {badge != null ? (
        <span className={styles.badge}>{badge}</span>
      ) : null}
    </>
  );

  if (disabled) {
    return (
      <span className={rootClass} aria-disabled="true">
        {content}
      </span>
    );
  }

  if (href != null) {
    return (
      <a
        className={rootClass}
        href={href}
        aria-current={active ? 'page' : undefined}
      >
        {content}
      </a>
    );
  }

  if (onClick != null) {
    return (
      <button
        type="button"
        className={rootClass}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <span className={rootClass} aria-current={active ? 'page' : undefined}>
      {content}
    </span>
  );
};
