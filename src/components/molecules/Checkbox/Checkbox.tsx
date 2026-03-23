import { useId, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  hint?: string;
  error?: string;
  defaultChecked?: boolean;
};

export const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  hint,
  error,
  defaultChecked = false,
}: CheckboxProps) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    () => defaultChecked ?? false,
  );
  const isChecked = isControlled ? checked : internalChecked;

  const hintId = useId();
  const errorId = useId();

  const errorMessage = error?.trim() ?? '';
  const showError = Boolean(errorMessage);
  const showHint = Boolean(hint) && !showError;

  const describedBy =
    showError ? errorId : showHint ? hintId : undefined;

  const handleNativeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = e.target.checked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const wrapperClass = [
    styles.wrapper,
    disabled ? styles.disabled : '',
    isChecked ? styles.checked : '',
    showError ? styles.error : '',
  ]
    .filter(Boolean)
    .join(' ');

  const rootClass = [styles.root, disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  const boxClass = [styles.box, isChecked ? styles.checked : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      <label className={rootClass}>
        <span className={styles.boxWrap}>
          <input
            type="checkbox"
            className={styles.native}
            checked={isChecked}
            onChange={handleNativeChange}
            disabled={disabled}
            aria-invalid={showError || undefined}
            aria-describedby={describedBy}
          />
          <span className={boxClass} aria-hidden="true">
            {isChecked ? <span className={styles.check} /> : null}
          </span>
        </span>
        <span className={styles.labelText}>{label}</span>
      </label>
      {showHint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {showError ? (
        <p id={errorId} className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
