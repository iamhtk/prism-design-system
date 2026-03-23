import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './CodeBlock.module.css'

export type CodeBlockProps = {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

const COPY_REVERT_MS = 2000

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const revertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (revertTimerRef.current) {
        clearTimeout(revertTimerRef.current)
      }
    }
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      if (revertTimerRef.current) {
        clearTimeout(revertTimerRef.current)
      }
      revertTimerRef.current = setTimeout(() => {
        setCopied(false)
        revertTimerRef.current = null
      }, COPY_REVERT_MS)
    } catch {
      /* clipboard unavailable or denied */
    }
  }, [code])

  const lines = code.split('\n')

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.language}>{title ?? language}</span>
        <button
          type="button"
          className={[styles.copyBtn, copied ? styles.copied : ''].filter(Boolean).join(' ')}
          onClick={handleCopy}
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      {showLineNumbers ? (
        <div className={styles.lineNumbers}>
          <div className={styles.lineNumCol}>
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <div className={styles.codeCol}>
            <pre className={styles.pre}>
              <code className={styles.code}>{code}</code>
            </pre>
          </div>
        </div>
      ) : (
        <pre className={styles.pre}>
          <code className={styles.code}>{code}</code>
        </pre>
      )}
    </div>
  )
}
