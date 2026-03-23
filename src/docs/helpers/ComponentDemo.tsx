import type { ReactNode } from 'react'
import styles from './ComponentDemo.module.css'

export type ComponentDemoProps = {
  children: ReactNode
  title?: string
  description?: string
  background?: 'dark' | 'light' | 'transparent' | 'gradient' | 'grid' | 'canvas'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  center?: boolean
  fullWidth?: boolean
  /** Flatten top corners and drop top border — use under StoryTabs tab bar */
  attachedTop?: boolean
}

export function ComponentDemo({
  children,
  title,
  description,
  background = 'dark',
  padding = 'md',
  center = false,
  fullWidth = false,
  attachedTop = false,
}: ComponentDemoProps) {
  return (
    <div className={[styles.wrapper, attachedTop ? styles.wrapperAttachedTop : ''].filter(Boolean).join(' ')}>
      {title ? <p className={styles.demoLabel}>{title}</p> : null}
      {description ? <p className={styles.demoDescription}>{description}</p> : null}
      <div
        className={[
          styles.demo,
          attachedTop ? styles.demoAttachedTop : '',
          styles[background],
          styles[`padding${padding.charAt(0).toUpperCase()}${padding.slice(1)}`],
          center ? styles.centered : '',
          fullWidth ? styles.fullWidth : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
