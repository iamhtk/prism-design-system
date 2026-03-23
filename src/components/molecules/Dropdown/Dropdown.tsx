import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Label } from '../../atoms/Label/Label';
import styles from './Dropdown.module.css';

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  width?: string;
};

export const Dropdown = ({
  options,
  value: valueProp,
  onChange,
  placeholder = 'Select…',
  label,
  hint,
  error,
  disabled = false,
  width,
}: DropdownProps) => {
  const baseId = useId();
  const triggerId = `dropdown-${baseId}`;
  const listId = `${triggerId}-list`;
  const hintId = `${triggerId}-hint`;
  const errorId = `${triggerId}-error`;

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const selectedValue = isControlled ? valueProp! : internalValue;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === selectedValue);
  const displayLabel = selectedOption?.label ?? '';
  const hasError = Boolean(error?.trim());
  const errorMessage = error?.trim() ?? '';

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const describedBy =
    hasError && errorMessage ? errorId : hint ? hintId : undefined;

  const triggerClass = [
    styles.trigger,
    hasError ? styles.triggerError : '',
    open && !hasError ? styles.triggerOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  const chevronClass = [styles.chevron, open ? styles.chevronOpen : '']
    .filter(Boolean)
    .join(' ');

  const listClass = [styles.list, open ? styles.listOpen : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={width !== undefined ? { width } : undefined}
    >
      {label != null ? (
        <Label htmlFor={triggerId} text={label} />
      ) : null}
      <button
        id={triggerId}
        type="button"
        className={triggerClass}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={describedBy}
        aria-label={label == null ? placeholder : undefined}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span
          className={[
            styles.triggerText,
            !displayLabel ? styles.placeholder : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {displayLabel || placeholder}
        </span>
        <span className={chevronClass} aria-hidden="true">
          ▼
        </span>
      </button>
      <ul
        id={listId}
        className={listClass}
        role="listbox"
        aria-labelledby={label != null ? triggerId : undefined}
        aria-hidden={!open}
      >
        {options.map((opt) => {
          const selected = opt.value === selectedValue;
          const optClass = [
            styles.option,
            selected ? styles.optionSelected : '',
            opt.disabled ? styles.optionDisabled : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={selected}
              aria-disabled={opt.disabled === true}
              className={optClass}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (opt.disabled) return;
                setValue(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          );
        })}
      </ul>
      {hint != null && !hasError ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {hasError && errorMessage ? (
        <p id={errorId} className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
