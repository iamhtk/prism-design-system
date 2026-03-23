import { useCallback, useState } from 'react';
import styles from './FilterBar.module.css';

export type FilterOption = {
  label: string;
  value: string;
  count?: number;
};

export type FilterBarProps = {
  filters: FilterOption[];
  activeFilters?: string[];
  onChange?: (activeFilters: string[]) => void;
  multiSelect?: boolean;
};

export const FilterBar = ({
  filters,
  activeFilters: activeProp,
  onChange,
  multiSelect = true,
}: FilterBarProps) => {
  const [internal, setInternal] = useState<string[]>([]);
  const isControlled = activeProp !== undefined;
  const active = isControlled ? activeProp : internal;

  const setActive = useCallback(
    (next: string[]) => {
      if (!isControlled) {
        setInternal(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const toggle = (value: string) => {
    const isOn = active.includes(value);
    if (multiSelect) {
      setActive(isOn ? active.filter((v) => v !== value) : [...active, value]);
      return;
    }
    if (isOn) {
      setActive([]);
      return;
    }
    setActive([value]);
  };

  return (
    <div className={styles.root} role="group" aria-label="Filters">
      {filters.map((f) => {
        const isActive = active.includes(f.value);
        const chipClass = [
          styles.chip,
          isActive ? styles.chipActive : styles.chipInactive,
        ].join(' ');

        return (
          <button
            key={f.value}
            type="button"
            className={chipClass}
            aria-pressed={isActive}
            onClick={() => toggle(f.value)}
          >
            <span>{f.label}</span>
            {f.count != null ? (
              <span className={styles.count} aria-label={`${f.count} results`}>
                ({f.count})
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
