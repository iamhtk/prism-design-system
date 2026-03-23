import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CodeBlock } from './CodeBlock'
import { ComponentDemo } from './ComponentDemo'
import styles from './StoryTabs.module.css'

export type Story = {
  label: string
  children: ReactNode
  code: string
  language?: string
  description?: string
  background?: 'dark' | 'light' | 'transparent' | 'gradient' | 'grid' | 'canvas'
  center?: boolean
  fullWidth?: boolean
}

export type StoryTabsProps = {
  stories: Story[]
  defaultStory?: number
}

export function StoryTabs({ stories, defaultStory = 0 }: StoryTabsProps) {
  const safeDefault = Math.max(0, Math.min(defaultStory, Math.max(0, stories.length - 1)))
  const [activeTab, setActiveTab] = useState(safeDefault)
  const [showCode, setShowCode] = useState(false)

  const active = Math.max(0, Math.min(activeTab, Math.max(0, stories.length - 1)))

  useEffect(() => {
    setShowCode(false)
  }, [active])

  if (stories.length === 0) {
    return null
  }

  const story = stories[active]

  return (
    <div className={styles.root}>
      <div className={styles.tabBar} role="tablist" aria-label="Component variants">
        <div className={styles.tabGroup}>
          {stories.map((s, index) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              id={`story-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`story-panel-${index}`}
              className={[styles.tab, index === active ? styles.tabActive : ''].filter(Boolean).join(' ')}
              onClick={() => setActiveTab(index)}
            >
              {s.label}
            </button>
          ))}
        </div>
        {story.code ? (
          <button type="button" className={styles.codeToggle} onClick={() => setShowCode((v) => !v)}>
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        ) : null}
      </div>
      <div
        className={styles.content}
        role="tabpanel"
        id={`story-panel-${active}`}
        aria-labelledby={`story-tab-${active}`}
      >
        <ComponentDemo
          attachedTop
          description={story.description}
          background={story.background ?? 'dark'}
          center={story.center}
          fullWidth={story.fullWidth}
        >
          {story.children}
        </ComponentDemo>
        {showCode && story.code ? (
          <div className={styles.codeArea}>
            <CodeBlock code={story.code} language={story.language ?? 'tsx'} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
