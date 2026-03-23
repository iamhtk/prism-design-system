import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DocsSidebar } from './DocsSidebar'
import styles from './DocsLayout.module.css'

function shortcutLabel(): string {
  if (typeof navigator === 'undefined') return '⌘K'
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform) ? '⌘K' : 'Ctrl+K'
}

export function DocsLayout() {
  const location = useLocation()
  const contentRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const pathParts = location.pathname.split('/')
    const pageName = pathParts[pathParts.length - 1] ?? ''
    const formatted = pageName
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
    document.title = pageName
      ? `${formatted} — CWPC Design System`
      : 'CWPC Design System'
  }, [location.pathname])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = '0'
      contentRef.current.style.transform = 'translateY(8px)'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.transition = 'opacity 0.2s ease, transform 0.2s ease'
            contentRef.current.style.opacity = '1'
            contentRef.current.style.transform = 'translateY(0)'
          }
        })
      })
    }
  }, [location.pathname])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 150)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname])

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>CWPC</span>
          <span className={styles.divider} aria-hidden />
          <span className={styles.logoSub}>Design System</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.shortcutBadge} title="Focus search">
            {shortcutLabel()}
          </span>
          <span className={styles.version}>v1.0.0</span>
          <span className={styles.badge}>68 Components</span>
        </div>
      </header>
      <div className={styles.body}>
        <DocsSidebar />
        <main ref={contentRef} className={styles.content} data-docs-scroll-root>
          {loading ? (
            <div className={styles.skeleton}>
              <div className={styles.skeletonBreadcrumb} />
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonDesc} />
              <div className={`${styles.skeletonDesc} ${styles.skeletonDescNarrow}`} />
              <div className={styles.skeletonSection} />
              <div className={`${styles.skeletonSection} ${styles.skeletonSectionTall}`} />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  )
}
