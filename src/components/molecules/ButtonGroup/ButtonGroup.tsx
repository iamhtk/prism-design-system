import { useMemo, useState } from 'react';
import styles from './ButtonGroup.module.css';

export type ButtonGroupItemProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export type ButtonGroupProps = {
  items: ButtonGroupItemProps[];
  connected?: boolean;
};

export const ButtonGroup = ({
  items,
  connected = false,
}: ButtonGroupProps) => {
  const hasControlledActive = useMemo(
    () => items.some((item) => item.active === true),
    [items],
  );

  const controlledIndex = items.findIndex((item) => item.active === true);

  const [internalIndex, setInternalIndex] = useState(() => {
    const i = items.findIndex((item) => item.active === true);
    return i >= 0 ? i : 0;
  });

  const activeIndex = hasControlledActive
    ? Math.max(0, controlledIndex)
    : internalIndex;

  const rootClass = [
    styles.root,
    connected ? styles.connected : styles.separated,
  ].join(' ');

  return (
    <div className={rootClass} role="group">
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const handleClick = () => {
          item.onClick?.();
          if (!hasControlledActive) {
            setInternalIndex(index);
          }
        };

        const itemClass = [
          styles.item,
          isActive ? styles.active : styles.inactive,
          item.disabled ? styles.disabled : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={`${item.label}-${index}`}
            type="button"
            className={itemClass}
            onClick={handleClick}
            disabled={item.disabled}
            aria-pressed={isActive}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
