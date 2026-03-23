import { useId, useState } from 'react';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { Label } from '../../atoms/Label/Label';
import styles from './TextArea.module.css';

export type TextAreaProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  status?: 'default' | 'hover' | 'focus' | 'error' | 'disabled';
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'disabled'>;

export const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  maxLength,
  showCount = false,
  hint,
  error,
  disabled = false,
  required = false,
  status = 'default',
  ...textareaRest
}: TextAreaProps) => {
  const baseId = useId();
  const areaId = `textarea-${baseId}`;
  const hintId = `${areaId}-hint`;
  const errorId = `${areaId}-error`;

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState('');

  const currentValue = isValueControlled ? value : internalValue;

  const hasError = Boolean(error?.trim()) || status === 'error';
  const errorMessage = error?.trim() ?? '';
  const showHintRow = !hasError && Boolean(hint);
  const showErrorRow = hasError && Boolean(errorMessage);

  const isDisabled = disabled || status === 'disabled';
  const interactive = status === 'default';
  const forceHover = status === 'hover';
  const forceFocus = status === 'focus';
  const isErrorState = hasError;

  const fieldClass = [
    styles.field,
    interactive ? styles.interactive : '',
    forceHover ? styles.forceHover : '',
    forceFocus ? styles.forceFocus : '',
    isErrorState ? styles.statusError : '',
    isDisabled ? styles.statusDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const describedBy =
    showErrorRow ? errorId : showHintRow ? hintId : undefined;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (!isValueControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  return (
    <div className={styles.root}>
      <Label htmlFor={areaId} text={label} required={required} />
      <div className={fieldClass}>
        <textarea
          {...textareaRest}
          id={areaId}
          className={styles.textarea}
          placeholder={placeholder}
          value={currentValue}
          rows={rows}
          maxLength={maxLength}
          disabled={isDisabled}
          aria-invalid={isErrorState || undefined}
          aria-describedby={describedBy}
          onChange={handleChange}
        />
      </div>
      {showCount && maxLength != null ? (
        <p className={styles.count} aria-live="polite">
          {`${currentValue.length}/${maxLength}`}
        </p>
      ) : null}
      {showHintRow ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {showErrorRow ? (
        <p id={errorId} className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
