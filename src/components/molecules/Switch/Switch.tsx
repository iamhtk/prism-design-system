import { useId, useState } from 'react';
import type { ChangeEvent } from 'react';
import styles from './Switch.module.css';

export type SwitchProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  hint?: string;
  defaultChecked?: boolean;
};

export const Switch = ({
  label,
  checked,
  onChange,
  disabled = false,
  hint,
  defaultChecked = false,
}: SwitchProps) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    () => defaultChecked ?? false,
  );
  const isChecked = isControlled ? checked : internalChecked;

  const hintId = useId();
  const switchId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = e.target.checked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const wrapperClass = [styles.wrapper, disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  const rootClass = [styles.root, disabled ? styles.disabled : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      <label className={rootClass} htmlFor={switchId}>
        <span className={styles.trackWrap}>
          <input
            id={switchId}
            type="checkbox"
            role="switch"
            className={styles.native}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            aria-checked={isChecked}
            aria-describedby={hint ? hintId : undefined}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
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
