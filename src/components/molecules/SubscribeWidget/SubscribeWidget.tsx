import { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Field } from '../../atoms/Field/Field';
import styles from './SubscribeWidget.module.css';

export type SubscribeWidgetProps = {
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubscribe?: (email: string) => void;
  successMessage?: string;
  variant?: 'dark' | 'light';
  layout?: 'row' | 'column';
};

function isValidEmail(value: string): boolean {
  const t = value.trim();
  return t.includes('@') && t.includes('.');
}

export const SubscribeWidget = ({
  label,
  placeholder = 'Email address',
  buttonLabel = 'Subscribe',
  onSubscribe,
  successMessage = 'Thanks — you are subscribed.',
  variant = 'dark',
  layout = 'row',
}: SubscribeWidgetProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rootClass = [
    styles.root,
    variant === 'light' ? styles.variantLight : styles.variantDark,
    layout === 'column' ? styles.layoutColumn : styles.layoutRow,
  ].join(' ');

  const handleSubmit = () => {
    setError(null);
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    onSubscribe?.(email.trim());
    setSubmitted(true);
  };

  if (submitted) {
    const successClass = [
      styles.successRoot,
      variant === 'light' ? styles.variantLight : styles.variantDark,
      layout === 'column' ? styles.successRootColumn : '',
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div className={successClass} role="status">
        <span className={styles.successIcon} aria-hidden>
          ✓
        </span>
        <p className={styles.successText}>{successMessage}</p>
      </div>
    );
  }

  const emailControl =
    variant === 'dark' ? (
      <Field
        type="email"
        name="subscribe-email"
        placeholder={placeholder}
        value={email}
        onChange={setEmail}
        autoComplete="email"
        aria-invalid={error != null || undefined}
      />
    ) : (
      <input
        className={styles.inputLight}
        type="email"
        name="subscribe-email"
        placeholder={placeholder}
        value={email}
        autoComplete="email"
        aria-invalid={error != null || undefined}
        onChange={(e) => setEmail(e.target.value)}
      />
    );

  return (
    <div className={rootClass}>
      {label != null && label.length > 0 ? (
        <span className={styles.fieldLabel}>{label}</span>
      ) : null}
      <div className={styles.controls}>
        {emailControl}
        <Button label={buttonLabel} type="default" onClick={handleSubmit} />
      </div>
      {error != null ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};
