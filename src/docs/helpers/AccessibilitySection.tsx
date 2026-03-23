import styles from './AccessibilitySection.module.css'

export type AccessibilityItem = {
  type: 'keyboard' | 'aria' | 'wcag' | 'focus' | 'color'
  label: string
  description: string
}

export type AccessibilitySectionProps = {
  items: AccessibilityItem[]
  wcagLevel?: 'A' | 'AA' | 'AAA'
}

const ICON_CHAR: Record<AccessibilityItem['type'], string> = {
  keyboard: '⌨',
  aria: 'A',
  wcag: '✓',
  focus: '⊡',
  color: '◉',
}

const ICON_CLASS: Record<AccessibilityItem['type'], string> = {
  keyboard: styles.iconKeyboard,
  aria: styles.iconAria,
  wcag: styles.iconWcag,
  focus: styles.iconFocus,
  color: styles.iconColor,
}

export function AccessibilitySection({ items, wcagLevel }: AccessibilitySectionProps) {
  const n = items.length

  return (
    <div>
      {wcagLevel ? (
        <div className={styles.wcagBadge}>WCAG {wcagLevel} Compliant</div>
      ) : null}
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li
            key={index}
            className={[
              styles.item,
              n === 1 ? styles.itemOnly : '',
              n > 1 && index === 0 ? styles.itemFirst : '',
              n > 1 && index === n - 1 ? styles.itemLast : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={[styles.iconWrap, ICON_CLASS[item.type]].join(' ')} aria-hidden>
              {ICON_CHAR[item.type]}
            </span>
            <div className={styles.body}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
