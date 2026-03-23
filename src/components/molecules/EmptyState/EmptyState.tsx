import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'search' | 'error' | 'success';
};

const fallbackClassMap = {
  default: styles.fallbackDefault,
  search: styles.fallbackSearch,
  error: styles.fallbackError,
  success: styles.fallbackSuccess,
} as const;

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  variant = 'default',
}: EmptyStateProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.iconWrap}>
        {icon != null ? (
          icon
        ) : (
          <span
            className={[styles.fallbackIcon, fallbackClassMap[variant]].join(
              ' ',
            )}
            aria-hidden
          />
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {description != null ? (
        <p className={styles.description}>{description}</p>
      ) : null}
      {action != null ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
};
