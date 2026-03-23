import type { ReactNode } from 'react'
import styles from './DosAndDonts.module.css'

export type DosAndDontsItem = {
  type: 'do' | 'dont'
  description: string
  children: ReactNode
}

export type DosAndDontsProps = {
  items: DosAndDontsItem[]
}

export function DosAndDonts({ items }: DosAndDontsProps) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => {
        const isDo = item.type === 'do'
        return (
          <article
            key={index}
            className={[styles.item, isDo ? styles.itemDo : styles.itemDont].join(' ')}
          >
            <div className={[styles.header, isDo ? styles.headerDo : styles.headerDont].join(' ')}>
              <span className={isDo ? styles.iconDo : styles.iconDont} aria-hidden>
                {isDo ? '✓' : '✗'}
              </span>
              <span className={isDo ? styles.titleDo : styles.titleDont}>{isDo ? 'Do' : "Don't"}</span>
            </div>
            <div className={styles.demo}>{item.children}</div>
            <p className={styles.description}>{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}
