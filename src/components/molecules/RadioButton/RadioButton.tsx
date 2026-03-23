import { useId } from 'react';
import type { ChangeEvent } from 'react';
import styles from './RadioButton.module.css';

export type RadioButtonProps = {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  hint?: string;
  name?: string;
  defaultChecked?: boolean;
};

export const RadioButton = ({
  label,
  value,
  checked,
  onChange,
  disabled = false,
  hint,
  name,
  defaultChecked = false,
}: RadioButtonProps) => {
  const isControlled = checked !== undefined;
  const hintId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.checked) return;
    onChange?.(value);
  };

  const wrapperClass = [styles.wrapper, disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  const rootClass = [styles.root, disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      <label className={rootClass}>
        <span className={styles.circleWrap}>
          {isControlled ? (
            <input
              type="radio"
              className={styles.native}
              name={name}
              value={value}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              aria-describedby={hint ? hintId : undefined}
            />
          ) : (
            <input
              type="radio"
              className={styles.native}
              name={name}
              value={value}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
              aria-describedby={hint ? hintId : undefined}
            />
          )}
          <span className={styles.circle} aria-hidden="true">
            <span className={styles.dot} />
          </span>
        </span>
        <span className={styles.labelText}>{label}</span>
      </label>
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};
