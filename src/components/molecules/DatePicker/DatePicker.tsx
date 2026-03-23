import { useEffect, useId, useRef, useState } from 'react';
import { Field } from '../../atoms/Field/Field';
import { Label } from '../../atoms/Label/Label';
import styles from './DatePicker.module.css';

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

function beforeDay(a: Date, b: Date): boolean {
  return startOfDay(a) < startOfDay(b);
}

function afterDay(a: Date, b: Date): boolean {
  return startOfDay(a) > startOfDay(b);
}

function formatDisplay(d: Date): string {
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function calendarCells(year: number, month: number): { date: Date; inMonth: boolean }[] {
  const first = new Date(year, month, 1);
  const mondayIndex = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - mondayIndex);
  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push({
      date: d,
      inMonth: d.getMonth() === month,
    });
  }
  return cells;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  hint,
  disabled = false,
  minDate,
  maxDate,
}: DatePickerProps) => {
  const baseId = useId();
  const fieldId = `datepicker-${baseId}`;
  const hintId = `${fieldId}-hint`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const initialMonth = value ?? new Date();
  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth());

  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const today = startOfDay(new Date());
  const cells = calendarCells(viewYear, viewMonth);
  const monthTitle = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    undefined,
    { month: 'long', year: 'numeric' },
  );

  const minD = minDate ? startOfDay(minDate) : null;
  const maxD = maxDate ? startOfDay(maxDate) : null;

  const dayDisabled = (d: Date) => {
    const sd = startOfDay(d);
    if (minD && beforeDay(sd, minD)) return true;
    if (maxD && afterDay(sd, maxD)) return true;
    return false;
  };

  const prevMonth = () => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const fieldStatus = disabled ? 'disabled' : 'default';

  return (
    <div ref={wrapRef} className={styles.root}>
      <div className={styles.stack}>
        {label != null ? (
          <Label htmlFor={fieldId} text={label} required={false} hint={false} />
        ) : null}
        <div
          onClick={() => {
            if (!disabled) setOpen((o) => !o);
          }}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((o) => !o);
            }
          }}
          role="presentation"
        >
          <Field
            id={fieldId}
            placeholder={placeholder}
            value={value != null ? formatDisplay(value) : ''}
            onChange={() => {}}
            readOnly
            status={fieldStatus}
            iconRight={<span className={styles.calIcon} aria-hidden />}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-describedby={hint != null ? hintId : undefined}
          />
        </div>
        {hint != null ? (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        ) : null}
      </div>

      {open && !disabled ? (
        <div className={styles.popover} role="dialog" aria-label="Choose date">
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Previous month"
              onClick={(e) => {
                e.stopPropagation();
                prevMonth();
              }}
            >
              ←
            </button>
            <p className={styles.monthLabel}>{monthTitle}</p>
            <button
              type="button"
              className={styles.navBtn}
              aria-label="Next month"
              onClick={(e) => {
                e.stopPropagation();
                nextMonth();
              }}
            >
              →
            </button>
          </div>
          <div className={styles.weekdays}>
            {WEEKDAYS.map((w) => (
              <span key={w} className={styles.weekday}>
                {w}
              </span>
            ))}
          </div>
          <div className={styles.grid}>
            {cells.map(({ date: d, inMonth }) => {
              const dis = dayDisabled(d);
              const sel = value != null && sameDay(d, value);
              const isToday = sameDay(d, today);
              const dayClass = [
                styles.dayBtn,
                !inMonth ? styles.dayOtherMonth : '',
                isToday ? styles.dayToday : '',
                sel ? styles.daySelected : '',
                dis ? styles.dayDisabled : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`}
                  type="button"
                  className={dayClass}
                  disabled={dis}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dis) return;
                    onChange?.(startOfDay(d));
                    setOpen(false);
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
