import { useState } from 'react';
import styles from './NotificationBar.module.css';

export type NotificationBarProps = {
  message: string;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  link?: { label: string; href: string };
};

const variantClassMap = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  info: styles.variantInfo,
  error: styles.variantError,
} as const;

export const NotificationBar = ({
  message,
  variant = 'primary',
  dismissible = false,
  onDismiss,
  action,
  link,
}: NotificationBarProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const rootClass = [styles.root, variantClassMap[variant]].join(' ');

  return (
    <div className={rootClass} role="status">
      <div className={styles.inner}>
        <span className={styles.message}>{message}</span>
        {action != null ? (
          <button
            type="button"
            className={styles.inlineAction}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ) : null}
        {link != null ? (
          <a className={styles.inlineLink} href={link.href}>
            {link.label}
          </a>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          className={styles.dismiss}
          aria-label="Dismiss announcement"
          onClick={handleDismiss}
        >
          ×
        </button>
      ) : null}
    </div>
  );
};
