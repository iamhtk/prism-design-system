import { DocsPage, DocsSection } from '../helpers/DocsPage'
import { CodeBlock } from '../helpers/CodeBlock'
import styles from './ElevationPage.module.css'

export function ElevationPage() {
  const elevations = [
    { label: 'Elevation 1', sublabel: 'Subtle — cards at rest', shadow: '0 1px 2px rgba(0,0,0,0.3)' },
    { label: 'Elevation 2', sublabel: 'Low — dropdowns', shadow: '0 2px 8px rgba(0,0,0,0.4)' },
    { label: 'Elevation 3', sublabel: 'Medium — popovers', shadow: '0 4px 16px rgba(0,0,0,0.5)' },
    { label: 'Elevation 4', sublabel: 'High — modals', shadow: '0 8px 24px rgba(0,0,0,0.6)' },
    { label: 'Elevation 5', sublabel: 'Glow — CWPC cards', shadow: '0 0 10px rgba(255,255,255,0.33)' },
  ]

  const blurs = [
    { label: 'blur-xs', value: 'blur(4px)' },
    { label: 'blur-sm', value: 'blur(8px)' },
    { label: 'blur-md', value: 'blur(16px)' },
    { label: 'blur-lg', value: 'blur(24px)' },
    { label: 'blur-xl', value: 'blur(40px)' },
  ]

  return (
    <DocsPage
      title="Elevation & Background Blur"
      description="Box shadows create depth and hierarchy. Background blur creates frosted glass effects. Use both consistently to signal visual stacking order."
      category="Foundation"
      status="stable"
    >
      <DocsSection title="Elevation Levels">
        <div className={styles.elevationRow}>
          {elevations.map((e) => (
            <div key={e.label} className={styles.elevationItem}>
              <div className={styles.elevationCard} style={{ boxShadow: e.shadow }} />
              <p className={styles.elevationLabel}>{e.label}</p>
              <p className={styles.elevationSub}>{e.sublabel}</p>
              <code className={styles.elevationCode}>{e.shadow}</code>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Background Blur">
        <div className={styles.blurRow}>
          {blurs.map((b) => (
            <div key={b.label} className={styles.blurItem}>
              <div className={styles.blurOuter}>
                <div
                  className={styles.blurCard}
                  style={{
                    backdropFilter: b.value,
                    WebkitBackdropFilter: b.value,
                  }}
                />
              </div>
              <p className={styles.blurLabel}>{b.label}</p>
              <code className={styles.blurCode}>{b.value}</code>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="css"
          code={`/* Elevation */
.card         { box-shadow: 0 1px 2px rgba(0,0,0,0.3); }
.dropdown     { box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
.popover      { box-shadow: 0 4px 16px rgba(0,0,0,0.5); }
.modal        { box-shadow: 0 8px 24px rgba(0,0,0,0.6); }
.cwpc-card    { box-shadow: 0 0 10px rgba(255,255,255,0.33); }

/* Background Blur */
.blur-xs { backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
.blur-sm { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.blur-md { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
.blur-lg { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
.blur-xl { backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); }`}
        />
      </DocsSection>
    </DocsPage>
  )
}
