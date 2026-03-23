import type { ReactNode } from 'react'
import styles from './DocsPage.module.css'

export type DocsPageProps = {
  title: string
  description: string
  category?: string
  children: ReactNode
  status?: 'stable' | 'beta' | 'deprecated' | 'new'
  figmaNodeId?: string
  since?: string
  githubPath?: string
}

export type DocsSectionProps = {
  title?: string
  children: ReactNode
  description?: string
}

const statusLabels: Record<NonNullable<DocsPageProps['status']>, string> = {
  stable: 'Stable',
  beta: 'Beta',
  deprecated: 'Deprecated',
  new: 'New',
}

const FIGMA_FILE = '2bE1dja5Ul5JrXGhvBgE23'

export function slugifySectionId(title: string): string {
  const s = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  return s || 'section'
}

function FigmaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path
        fill="#a259ff"
        d="M3 1h3v4H3V1zm3 0h3a2 2 0 0 1 0 4H6V1zm0 4h3a2 2 0 1 1 0 4H6V5zm0 4h3v3H6V9z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={styles.githubGlyph}>
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        fill="currentColor"
        d="M6 3.2C4.2 3.2 3 4.5 3 6.1c0 1.1.65 2 1.5 2.3.1 0 .15-.05.15-.1v-.4c-.6.12-.73-.26-.78-.35-.03-.08-.12-.2-.2-.25-.1-.05-.22-.18 0-.28.2-.12.42.12.7.4.2.25.58.2.75.15.04-.18.12-.33.22-.45-1-.12-2-.5-2-2.15 0-.45.15-.8.42-1.08-.04-.12-.18-.6.04-1.25 0 0 .35-.12 1.15.42.35-.1.7-.14 1.05-.14s.72.05 1.05.14c.8-.55 1.15-.42 1.15-.42.22.65.08 1.13.04 1.25.26.28.42.63.42 1.08 0 1.65-1.02 2.03-2 2.15.16.14.3.4.3.8v1.2c0 .05.05.1.12.08.88-.3 1.5-1.15 1.5-2.2 0-1.6-1.2-2.9-3-2.9z"
      />
    </svg>
  )
}

function githubHref(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `https://github.com/${path}`
}

export function DocsPage({
  title,
  description,
  category,
  children,
  status,
  figmaNodeId,
  since,
  githubPath,
}: DocsPageProps) {
  const hasMeta = Boolean(figmaNodeId || since || githubPath)
  const figmaUrl = figmaNodeId
    ? `https://www.figma.com/design/${FIGMA_FILE}/Design-system_temp?node-id=${figmaNodeId.replace(/:/g, '-')}`
    : ''

  return (
    <article className={styles.page}>
      <p className={styles.breadcrumb}>
        {category ? (
          <>
            <span>{category}</span>
            <span className={styles.breadcrumbSep} aria-hidden>
              /
            </span>
          </>
        ) : null}
        <span>{title}</span>
      </p>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>{title}</h1>
        {status ? (
          <span className={[styles.statusBadge, styles[status]].join(' ')}>
            {statusLabels[status]}
          </span>
        ) : null}
      </div>
      <p className={[styles.description, hasMeta ? styles.descriptionWithMeta : ''].filter(Boolean).join(' ')}>
        {description}
      </p>
      {hasMeta ? (
        <div className={styles.metaBar}>
          {figmaNodeId ? (
            <a
              className={styles.metaButton}
              href={figmaUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <FigmaIcon />
              View in Figma
            </a>
          ) : null}
          {since ? <span className={styles.metaPill}>Since {since}</span> : null}
          {githubPath ? (
            <a
              className={styles.metaButton}
              href={githubHref(githubPath)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon />
              GitHub
            </a>
          ) : null}
        </div>
      ) : null}
      {children}
    </article>
  )
}

export function DocsSection({ title, children, description }: DocsSectionProps) {
  const sectionId = title ? slugifySectionId(title) : undefined

  return (
    <section
      className={styles.section}
      {...(sectionId
        ? { 'aria-labelledby': sectionId }
        : { 'aria-label': 'Documentation section' })}
    >
      {title ? (
        <h2 id={sectionId} className={styles.sectionTitle}>
          {title}
        </h2>
      ) : null}
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
      {children}
    </section>
  )
}
