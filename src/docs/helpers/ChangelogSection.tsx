import styles from './ChangelogSection.module.css'

export type ChangelogEntry = {
  version: string
  date: string
  type: 'added' | 'changed' | 'fixed' | 'deprecated'
  description: string
}

export type ChangelogSectionProps = {
  entries: ChangelogEntry[]
}

const TYPE_LABEL: Record<ChangelogEntry['type'], string> = {
  added: 'added',
  changed: 'changed',
  fixed: 'fixed',
  deprecated: 'deprecated',
}

const DOT_CLASS: Record<ChangelogEntry['type'], string> = {
  added: styles.dotAdded,
  changed: styles.dotChanged,
  fixed: styles.dotFixed,
  deprecated: styles.dotDeprecated,
}

const TYPE_BADGE_CLASS: Record<ChangelogEntry['type'], string> = {
  added: styles.typeAdded,
  changed: styles.typeChanged,
  fixed: styles.typeFixed,
  deprecated: styles.typeDeprecated,
}

export function ChangelogSection({ entries }: ChangelogSectionProps) {
  return (
    <ul className={styles.list}>
      {entries.map((entry, index) => (
        <li key={`${entry.version}-${entry.date}-${index}`} className={styles.entry}>
          <div className={styles.track}>
            {index < entries.length - 1 ? <div className={styles.connector} aria-hidden /> : null}
            <span className={[styles.dot, DOT_CLASS[entry.type]].join(' ')} aria-hidden />
          </div>
          <div className={styles.body}>
            <div className={styles.metaRow}>
              <span className={styles.versionBadge}>{entry.version}</span>
              <span className={[styles.typeBadge, TYPE_BADGE_CLASS[entry.type]].join(' ')}>
                {TYPE_LABEL[entry.type]}
              </span>
              <span className={styles.date}>{entry.date}</span>
            </div>
            <p className={styles.description}>{entry.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
