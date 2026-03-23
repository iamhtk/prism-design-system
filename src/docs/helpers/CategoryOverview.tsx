import { Fragment, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CategoryOverview.module.css'

export type CategoryPill = 'ATOM' | 'MOLECULE' | 'ORGANISM'

export type StatSegment = { strong: string; rest?: string }

export function CategoryStatBar({ segments }: { segments: StatSegment[] }) {
  return (
    <div className={styles.statBar}>
      {segments.map((seg, i) => (
        <Fragment key={`${seg.strong}-${i}`}>
          {i > 0 ? <span className={styles.statSep} aria-hidden /> : null}
          <div className={styles.statItem}>
            <span className={styles.statStrong}>{seg.strong}</span>
            {seg.rest ? <span>{seg.rest}</span> : null}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export type CategoryOverviewCardProps = {
  title: string
  description: string
  to: string
  categoryLabel: CategoryPill
  preview: ReactNode
}

export function CategoryOverviewCard({
  title,
  description,
  to,
  categoryLabel,
  preview,
}: CategoryOverviewCardProps) {
  const navigate = useNavigate()
  return (
    <div className={styles.card}>
      <div
        className={styles.preview}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className={styles.previewInner}>{preview}</div>
      </div>
      <button type="button" className={styles.cardInfo} onClick={() => navigate(to)}>
        <div className={styles.cardName}>{title}</div>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardRow}>
          <span className={styles.pill}>{categoryLabel}</span>
          <span className={styles.arrow} aria-hidden>
            →
          </span>
        </div>
      </button>
    </div>
  )
}
