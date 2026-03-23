import type { ReactNode } from 'react';
import styles from './List.module.css';

export type ListItem = {
  label: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
};

export type ListProps = {
  items: ListItem[];
  variant?: 'default' | 'bordered' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export const List = ({
  items,
  variant = 'default',
  size = 'md',
  interactive = false,
}: ListProps) => {
  const variantClass =
    variant === 'bordered'
      ? styles.variantBordered
      : variant === 'striped'
        ? styles.variantStriped
        : '';

  const listClass = [styles.list, variantClass].filter(Boolean).join(' ');

  const renderItem = (item: ListItem, index: number) => {
    const itemClass = [
      styles.item,
      sizeClassMap[size],
      interactive && !item.disabled ? styles.interactive : '',
      item.disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const labelClass = [
      styles.label,
      item.active ? styles.labelActive : '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {item.icon != null ? (
          <span className={styles.iconSlot} aria-hidden>
            {item.icon}
          </span>
        ) : null}
        <div className={styles.body}>
          <p className={labelClass}>{item.label}</p>
          {item.description != null ? (
            <p className={styles.description}>{item.description}</p>
          ) : null}
        </div>
        {item.action != null ? (
          <div className={styles.action}>{item.action}</div>
        ) : null}
      </>
    );

    if (item.href != null && !item.disabled) {
      return (
        <li key={`${item.label}-${index}`}>
          <a className={itemClass} href={item.href}>
            {content}
          </a>
        </li>
      );
    }

    if (interactive && !item.disabled) {
      return (
        <li key={`${item.label}-${index}`}>
          <div className={itemClass}>{content}</div>
        </li>
      );
    }

    return (
      <li key={`${item.label}-${index}`}>
        <div className={itemClass}>{content}</div>
      </li>
    );
  };

  return <ul className={listClass}>{items.map(renderItem)}</ul>;
};
