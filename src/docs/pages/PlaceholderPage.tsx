import styles from './PlaceholderPage.module.css'

type PlaceholderPageProps = {
  name: string
  category?: string
}

export function PlaceholderPage({ name, category }: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        {category && <span>{category} /</span>} {name}
      </div>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.coming}>
        <div className={styles.comingIcon} aria-hidden>
          ⚡
        </div>
        <p className={styles.comingText}>Documentation coming soon</p>
        <p className={styles.comingHint}>
          The <code>{name}</code> component is built and working. Its docs page is
          being written.
        </p>
      </div>
    </div>
  )
}
