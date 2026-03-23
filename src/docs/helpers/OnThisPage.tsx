import { useCallback, useEffect, useState } from 'react'
import styles from './OnThisPage.module.css'

export type OnThisPageItem = {
  id: string
  label: string
  level?: 1 | 2
}

export type OnThisPageProps = {
  items: OnThisPageItem[]
}

export function OnThisPage({ items }: OnThisPageProps) {
  const [activeId, setActiveId] = useState<string>(() => items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    const root = document.querySelector('[data-docs-scroll-root]')

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting)
        if (intersecting.length === 0) return

        intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        const fromTop = intersecting.filter((e) => e.boundingClientRect.top <= 160)
        const pick = fromTop.length > 0 ? fromTop[fromTop.length - 1] : intersecting[0]
        setActiveId(pick.target.id)
      },
      {
        root: root instanceof Element ? root : null,
        rootMargin: '-64px 0px -55% 0px',
        threshold: [0, 0.05, 0.1, 0.25, 0.5],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <nav className={styles.root} aria-label="On this page">
      <p className={styles.title}>On this page</p>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={[
            styles.link,
            item.level === 2 ? styles.level2 : '',
            activeId === item.id ? styles.linkActive : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => scrollTo(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
