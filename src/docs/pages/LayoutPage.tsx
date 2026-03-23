import { CodeBlock } from '../helpers/CodeBlock'
import { DocsPage, DocsSection } from '../helpers/DocsPage'
import styles from './LayoutPage.module.css'

const SPACING_ROWS: { token: string; px: number }[] = [
  { token: '--space-0', px: 0 },
  { token: '--space-25', px: 1 },
  { token: '--space-50', px: 2 },
  { token: '--space-100', px: 4 },
  { token: '--space-200', px: 8 },
  { token: '--space-300', px: 12 },
  { token: '--space-400', px: 16 },
  { token: '--space-500', px: 20 },
  { token: '--space-600', px: 24 },
  { token: '--space-700', px: 28 },
  { token: '--space-800', px: 32 },
  { token: '--space-900', px: 36 },
  { token: '--space-1000', px: 40 },
  { token: '--space-1100', px: 44 },
  { token: '--space-1200', px: 48 },
  { token: '--space-1300', px: 56 },
  { token: '--space-1400', px: 64 },
  { token: '--space-1500', px: 72 },
  { token: '--space-1600', px: 96 },
  { token: '--space-1700', px: 128 },
]

const LAYOUT_CODE = `/* Correct — use tokens */
.card { padding: var(--space-800); gap: var(--space-400); }

/* Wrong — never hardcode */
.card { padding: 32px; gap: 16px; }`

export function LayoutPage() {
  return (
    <DocsPage
      category="Foundation"
      title="Layout & Spacing"
      description="The CWPC design system uses an 8px base grid. All spacing values are multiples of 4px. Use tokens from cwpc-tokens.css — never hardcode spacing values."
    >
      <DocsSection title="Spacing Scale">
        {SPACING_ROWS.map((row) => {
          const barPx = row.px === 0 ? 2 : row.px
          return (
            <div key={row.token} className={styles.spacingRow}>
              <span className={styles.spacingToken}>{row.token}</span>
              <div
                className={styles.spacingBar}
                style={{ width: `${barPx}px`, maxWidth: '100%' }}
              />
              <span className={styles.spacingPx}>{row.px}px</span>
            </div>
          )
        })}
      </DocsSection>

      <DocsSection title="Grid System">
        <div className={styles.gridExamples}>
          <div>
            <p className={styles.gridExampleLabel}>Mobile — 4 Columns</p>
            <div className={styles.gridExampleContainer}>
              <div className={[styles.gridCols, styles.gridColsMobile].join(' ')}>
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className={styles.gridCell} />
                ))}
              </div>
            </div>
            <p className={styles.gridMeta}>Breakpoint: 320-480px · Margin: 16px · Gutter: 16px</p>
          </div>
          <div>
            <p className={styles.gridExampleLabel}>Tablet — 8 Columns</p>
            <div className={styles.gridExampleContainer}>
              <div className={[styles.gridCols, styles.gridColsTablet].join(' ')}>
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className={styles.gridCell} />
                ))}
              </div>
            </div>
            <p className={styles.gridMeta}>Breakpoint: 481-768px · Margin: 16px · Gutter: 16px</p>
          </div>
          <div>
            <p className={styles.gridExampleLabel}>Desktop — 12 Columns</p>
            <div className={styles.gridExampleContainer}>
              <div className={[styles.gridCols, styles.gridColsDesktop].join(' ')}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className={styles.gridCell} />
                ))}
              </div>
            </div>
            <p className={styles.gridMeta}>Breakpoint: 1281px+ · Max-width: 1152px · Gutter: 18px</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="8px Grid Principle">
        <div className={styles.principleBlock}>
          <h3 className={styles.principleTitle}>Always use spacing tokens</h3>
          <p className={styles.principleBody}>
            All spacing in the CWPC design system is based on a 4px unit. The base spacing unit is
            8px (--space-200). Never use arbitrary values like margin: 13px or padding: 7px. Always
            pick the nearest token.
          </p>
          <CodeBlock code={LAYOUT_CODE} language="css" />
        </div>
      </DocsSection>
    </DocsPage>
  )
}
