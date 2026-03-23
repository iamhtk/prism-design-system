import type { CSSProperties } from 'react'
import { DocsPage, DocsSection } from '../helpers/DocsPage'
import styles from './TokensPage.module.css'

const ORANGE: string[] = [
  '--color-orange-50',
  '--color-orange-100',
  '--color-orange-200',
  '--color-orange-300',
  '--color-orange-400',
  '--color-orange-default',
  '--color-orange-600',
  '--color-orange-700',
  '--color-orange-800',
  '--color-orange-900',
]

const YELLOW: string[] = [
  '--color-yellow-50',
  '--color-yellow-100',
  '--color-yellow-200',
  '--color-yellow-300',
  '--color-yellow-400',
  '--color-yellow-default',
  '--color-yellow-600',
  '--color-yellow-700',
  '--color-yellow-800',
  '--color-yellow-900',
]

const PRIMARY_ALIAS: string[] = [
  '--color-primary-50',
  '--color-primary-100',
  '--color-primary-200',
  '--color-primary-300',
  '--color-primary-400',
  '--color-primary-default',
  '--color-primary-600',
  '--color-primary-700',
  '--color-primary-800',
  '--color-primary-900',
]

const SECONDARY_BLUE: string[] = [
  '--color-secondary-blue-50',
  '--color-secondary-blue-100',
  '--color-secondary-blue-200',
  '--color-secondary-blue-300',
  '--color-secondary-blue-400',
  '--color-secondary-blue-default',
  '--color-secondary-blue-600',
  '--color-secondary-blue-700',
  '--color-secondary-blue-800',
  '--color-secondary-blue-900',
]

const NEUTRAL: string[] = [
  '--color-neutral-white',
  '--color-neutral-black',
  '--color-neutral-50',
  '--color-neutral-60',
  '--color-neutral-90',
  '--color-neutral-100',
  '--color-neutral-200',
  '--color-neutral-450',
  '--color-neutral-925',
  '--color-neutral-900',
]

const INTERACTIVE: string[] = [
  '--color-interactive-primary',
  '--color-interactive-primary-hover',
  '--color-interactive-primary-active',
  '--color-interactive-primary-subtle',
  '--color-interactive-secondary',
  '--color-interactive-secondary-hover',
]

const SUCCESS: string[] = ['--color-success-default', '--color-success-hover', '--color-success-subtle']

const WARNING: string[] = [
  '--color-warning-default',
  '--color-warning-hover',
  '--color-warning-subtle',
  '--color-warning-600',
]

const ERROR: string[] = [
  '--color-error-default',
  '--color-error-hover',
  '--color-error-focus',
  '--color-error-on-color',
  '--color-error-on-color-hover',
]

const INFORMATION: string[] = [
  '--color-information-default',
  '--color-information-hover',
  '--color-information-subtle',
]

const TERTIARY: string[] = ['--color-tertiary-default', '--color-tertiary-hover']

const DISABLED: string[] = [
  '--color-disabled-default',
  '--color-disabled-subtle',
  '--color-disabled-strong',
  '--color-disabled-heavy',
  '--color-disabled-surface',
]

const MISC_COLOR_GROUPS: { title: string; tokens: string[] }[] = [
  {
    title: 'Tables, progress & dividers',
    tokens: [
      '--color-surface-progress-track',
      '--color-table-row-divider',
      '--color-table-row-hover',
      '--color-table-row-striped',
      '--color-divider-default',
      '--color-divider-subtle',
      '--color-divider-strong',
      '--color-footer-divider',
    ],
  },
  {
    title: 'Shell, backdrop & marketing',
    tokens: [
      '--color-banner-wildfire-start',
      '--color-banner-wildfire-mid',
      '--color-backdrop-overlay',
      '--color-backdrop-panel',
    ],
  },
  {
    title: 'Tooltips, dropdowns & options',
    tokens: [
      '--color-tooltip-surface',
      '--color-tooltip-border',
      '--color-dropdown-surface',
      '--color-option-hover-overlay',
      '--color-option-selected-overlay',
    ],
  },
  {
    title: 'Alerts',
    tokens: [
      '--color-alert-surface-success',
      '--color-alert-surface-error',
      '--color-alert-surface-warning',
      '--color-alert-surface-info',
    ],
  },
  {
    title: 'Skeleton, code & rating',
    tokens: [
      '--color-skeleton-base',
      '--color-skeleton-shimmer-mid',
      '--color-code-block-surface',
      '--color-code-inline-bg',
      '--color-rating-star-empty',
    ],
  },
  {
    title: 'Forms, uploads & marketing inputs',
    tokens: [
      '--color-file-upload-row-bg',
      '--color-empty-state-icon-tint',
      '--color-surface-subscribe-input-light',
      '--color-border-input-light',
      '--color-modal-light-close',
    ],
  },
  {
    title: 'Filter, calendar, list & context',
    tokens: [
      '--color-filter-chip-border',
      '--color-calendar-day-hover',
      '--color-list-row-hover',
      '--color-context-menu-item-hover',
      '--color-context-menu-destructive-hover',
    ],
  },
  {
    title: 'Map, image, sticky bar & video',
    tokens: [
      '--color-mappin-label-bg',
      '--color-image-error-surface',
      '--color-sticky-bar-bg',
      '--color-video-play-surface',
      '--color-video-play-overlay',
      '--color-duration-badge-bg',
      '--color-notification-error-text',
    ],
  },
]

const TEXT_TOKENS: { name: string; value: string }[] = [
  { name: '--text-default-headings', value: '#FFFFFF' },
  { name: '--text-default-body', value: '#FFFFFF' },
  { name: '--text-default-caption', value: '#B6B6B6' },
  { name: '--text-default-placeholder', value: '#C4C4C4' },
  { name: '--text-on-color-headings', value: '#000000' },
  { name: '--text-on-color-body', value: '#000000' },
  { name: '--text-on-color-caption', value: '#B6B6B6' },
  { name: '--text-on-color-placeholder', value: '#C4C4C4' },
  { name: '--text-primary-default', value: '#FF6701' },
  { name: '--text-primary-hover', value: '#FF8534' },
  { name: '--text-disabled-default', value: '#8D8D8D' },
]

const TEXT_VIA_COLOR: { name: string; token: string; value: string; note: string }[] = [
  {
    name: '(semantic) error text',
    token: '--color-error-default',
    value: '#FF270D',
    note: 'No --text-error token; use color-error-* with context.',
  },
]

const SURFACE_TOKENS: { name: string; value: string }[] = [
  { name: '--color-surface-progress-track', value: 'rgba(255, 255, 255, 0.15)' },
  { name: '--color-table-row-divider', value: 'rgba(255, 255, 255, 0.08)' },
  { name: '--color-table-row-hover', value: 'rgba(255, 103, 1, 0.05)' },
  { name: '--color-table-row-striped', value: 'rgba(255, 255, 255, 0.03)' },
  { name: '--color-tooltip-surface', value: '#1a1a1a' },
  { name: '--color-dropdown-surface', value: '#1e1e1e' },
  { name: '--color-alert-surface-success', value: 'rgba(101, 166, 55, 0.1)' },
  { name: '--color-alert-surface-error', value: 'rgba(255, 39, 13, 0.1)' },
  { name: '--color-alert-surface-warning', value: 'rgba(255, 176, 32, 0.1)' },
  { name: '--color-alert-surface-info', value: 'rgba(13, 114, 255, 0.1)' },
  { name: '--color-skeleton-base', value: 'rgba(255, 255, 255, 0.08)' },
  { name: '--color-skeleton-shimmer-mid', value: 'rgba(255, 255, 255, 0.15)' },
  { name: '--color-code-block-surface', value: '#111111' },
  { name: '--color-code-inline-bg', value: 'rgba(255, 255, 255, 0.08)' },
  { name: '--color-disabled-surface', value: '#E0E0E0' },
  { name: '--color-surface-subscribe-input-light', value: '#f5f5f5' },
  { name: '--color-file-upload-row-bg', value: 'color-mix(in srgb, var(--color-neutral-white) 4%, transparent)' },
  { name: '--color-empty-state-icon-tint', value: 'color-mix(in srgb, var(--color-primary-default) 10%, transparent)' },
  { name: '--color-list-row-hover', value: 'color-mix(in srgb, var(--color-neutral-white) 4%, transparent)' },
  { name: '--color-context-menu-item-hover', value: 'color-mix(in srgb, var(--color-neutral-white) 6%, transparent)' },
  { name: '--color-context-menu-destructive-hover', value: 'rgba(255, 39, 13, 0.08)' },
  { name: '--color-option-hover-overlay', value: 'rgba(255, 103, 1, 0.08)' },
  { name: '--color-option-selected-overlay', value: 'rgba(255, 103, 1, 0.12)' },
  { name: '--color-calendar-day-hover', value: 'color-mix(in srgb, var(--color-primary-default) 10%, transparent)' },
  { name: '--color-image-error-surface', value: 'var(--color-neutral-450) → #484848' },
  { name: '--color-mappin-label-bg', value: 'rgba(0, 0, 0, 0.7)' },
  { name: '--color-duration-badge-bg', value: 'var(--color-mappin-label-bg)' },
  { name: '--color-video-play-surface', value: 'color-mix(in srgb, var(--color-primary-default) 90%, transparent)' },
  { name: '--color-video-play-overlay', value: 'color-mix(in srgb, var(--color-primary-default) 90%, transparent)' },
  {
    name: '--color-sticky-bar-bg',
    value: 'color-mix(in srgb, var(--color-neutral-black) 90%, transparent)',
  },
]

const BORDER_TOKENS: { name: string; cssVar: string; value: string }[] = [
  { name: '--color-divider-default', cssVar: '--color-divider-default', value: 'rgba(255, 255, 255, 0.1)' },
  { name: '--color-divider-subtle', cssVar: '--color-divider-subtle', value: 'rgba(255, 255, 255, 0.05)' },
  { name: '--color-divider-strong', cssVar: '--color-divider-strong', value: 'rgba(255, 255, 255, 0.2)' },
  { name: '--color-tooltip-border', cssVar: '--color-tooltip-border', value: 'rgba(255, 255, 255, 0.12)' },
  { name: '--color-footer-divider', cssVar: '--color-footer-divider', value: 'rgba(255, 255, 255, 0.1)' },
  { name: '--color-table-row-divider', cssVar: '--color-table-row-divider', value: 'rgba(255, 255, 255, 0.08)' },
  { name: '--color-border-input-light', cssVar: '--color-border-input-light', value: '#cccccc' },
  {
    name: '--color-filter-chip-border',
    cssVar: '--color-filter-chip-border',
    value: 'var(--color-surface-progress-track)',
  },
]

const BORDER_WIDTHS: { name: string; token: string }[] = [
  { name: '--border-width-none', token: '--border-width-none' },
  { name: '--border-width-xs', token: '--border-width-xs' },
  { name: '--border-width-sm', token: '--border-width-sm' },
  { name: '--border-width-md', token: '--border-width-md' },
  { name: '--border-width-lg', token: '--border-width-lg' },
  { name: '--border-width-loader-sm', token: '--border-width-loader-sm' },
  { name: '--border-width-loader-lg', token: '--border-width-loader-lg' },
  { name: '--border-width-menu-active', token: '--border-width-menu-active' },
  { name: '--border-width-marketing-accent', token: '--border-width-marketing-accent' },
]

/** Ordered by pixel value so bar lengths match scale; --space-450 is 10px per cwpc-tokens.css */
const SPACING_SCALE: { token: string; px: number }[] = [
  { token: '--space-0', px: 0 },
  { token: '--space-25', px: 1 },
  { token: '--space-50', px: 2 },
  { token: '--space-100', px: 4 },
  { token: '--space-200', px: 8 },
  { token: '--space-450', px: 10 },
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
  { token: '--space-1800', px: 256 },
  { token: '--space-1900', px: 512 },
]

const MAX_BAR_PX = 300

const INTERACTIVE_COLOR_REFERENCE: {
  category: string
  rows: { token: string; hex: string; kind?: 'border-width' }[]
}[] = [
  {
    category: 'Primary Interactive',
    rows: [
      { token: '--color-interactive-primary-default', hex: '#FF6701' },
      { token: '--color-interactive-primary-hover', hex: '#FF8534' },
      { token: '--color-interactive-primary-subtle', hex: '#FFF0E6' },
    ],
  },
  {
    category: 'Text',
    rows: [
      { token: '--text-default-headings', hex: '#FFFFFF' },
      { token: '--text-default-body', hex: '#FFFFFF' },
      { token: '--text-default-caption', hex: '#B6B6B6' },
      { token: '--text-default-placeholder', hex: '#C4C4C4' },
      { token: '--text-primary-default', hex: '#FF6701' },
      { token: '--text-on-color-body', hex: '#000000' },
      { token: '--text-disabled-default', hex: '#8D8D8D' },
    ],
  },
  {
    category: 'Surface',
    rows: [
      { token: '--color-surface-page-dark', hex: '#1B1B1F' },
      { token: '--color-surface-page-light', hex: '#F6F6F6' },
    ],
  },
  {
    category: 'Border',
    rows: [
      { token: '--border-width-xs', hex: '1px', kind: 'border-width' },
      { token: '--border-width-sm', hex: '2px', kind: 'border-width' },
    ],
  },
]

const MOTION_ROWS: {
  label: string
  ms: string
  cssMs: string
  token: string
  usage: string
}[] = [
  {
    label: 'Fast',
    ms: '150ms',
    cssMs: '150ms',
    token: '--duration-link',
    usage: 'Used for hover states',
  },
  {
    label: 'Normal',
    ms: '200ms',
    cssMs: '200ms',
    token: '--duration-switch',
    usage: 'Used for toggle / switch',
  },
  {
    label: 'Slow',
    ms: '300ms',
    cssMs: '300ms',
    token: '--duration-panel-slide',
    usage: 'Used for open / close panels',
  },
  {
    label: 'Very Slow',
    ms: '600ms',
    cssMs: '600ms',
    token: '--duration-progress-bar-width',
    usage: 'Used for progress animations',
  },
]

const ELEVATION_SHADOW_ROWS: { level: string; usage: string; shadow: string; useToken?: boolean }[] = [
  {
    level: 'Elevation 1',
    usage: 'Subtle — cards at rest',
    shadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  {
    level: 'Elevation 2',
    usage: 'Low — dropdown menus',
    shadow: '0 2px 8px rgba(0,0,0,0.4)',
  },
  {
    level: 'Elevation 3',
    usage: 'Medium — popovers',
    shadow: '0 4px 16px rgba(0,0,0,0.5)',
  },
  {
    level: 'Elevation 4',
    usage: 'High — modals',
    shadow: '0 8px 24px rgba(0,0,0,0.6)',
  },
  {
    level: 'Elevation 5 (CWPC Glow)',
    usage: 'Glow — CWPC cards',
    shadow: 'var(--shadow-card-glow)',
    useToken: true,
  },
]

const LIGHT_SWATCH_TOKENS = new Set([
  '--text-default-headings',
  '--text-default-body',
  '--color-interactive-primary-subtle',
  '--color-surface-page-light',
])

function TokenRefColorRow({ token, hex }: { token: string; hex: string }) {
  const outline = LIGHT_SWATCH_TOKENS.has(token)
  return (
    <div className={styles.interactiveRefRow}>
      <code className={styles.interactiveRefName}>{token}</code>
      <div className={styles.interactiveRefMid}>
        <span
          className={[styles.interactiveRefSwatch, outline ? styles.swatchCircleOutlined : '']
            .filter(Boolean)
            .join(' ')}
          style={{ backgroundColor: `var(${token})` } as CSSProperties}
          role="img"
          aria-label={token}
        />
      </div>
      <span className={styles.interactiveRefHex}>{hex}</span>
    </div>
  )
}

function TokenRefBorderWidthRow({ token, hex }: { token: string; hex: string }) {
  return (
    <div className={styles.interactiveRefRow}>
      <code className={styles.interactiveRefName}>{token}</code>
      <div className={styles.interactiveRefMid}>
        <hr
          className={styles.interactiveRefWidthDemo}
          style={
            {
              borderTopWidth: `var(${token})`,
              borderTopStyle: 'solid',
            } as CSSProperties
          }
        />
      </div>
      <span className={styles.interactiveRefHex}>{hex}</span>
    </div>
  )
}

function InteractiveColorReference() {
  return (
    <>
      {INTERACTIVE_COLOR_REFERENCE.map((group) => (
        <div key={group.category} className={styles.interactiveRefCategory}>
          <h3 className={styles.interactiveRefCategoryTitle}>{group.category}</h3>
          {group.rows.map((row) =>
            row.kind === 'border-width' ? (
              <TokenRefBorderWidthRow key={row.token} token={row.token} hex={row.hex} />
            ) : (
              <TokenRefColorRow key={row.token} token={row.token} hex={row.hex} />
            ),
          )}
        </div>
      ))}
    </>
  )
}

function MotionDemonstrations() {
  return (
    <div className={styles.motionGrid}>
      {MOTION_ROWS.map((row) => (
        <div key={row.label} className={styles.motionRow}>
          <div className={styles.motionLabelRow}>
            <span className={styles.motionLabel}>
              {row.label}: {row.ms}
            </span>
            <span className={styles.motionMeta}>{row.token}</span>
          </div>
          <p className={styles.motionUsage}>{row.usage}</p>
          <div className={styles.motionBarTrack}>
            <div
              className={styles.motionBar}
              style={{ animationDuration: row.cssMs } as CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ShadowsReferenceTable() {
  return (
    <div className={styles.shadowsWrap}>
      <table className={styles.shadowsTable}>
        <thead>
          <tr>
            <th scope="col">Level</th>
            <th scope="col">Usage</th>
            <th scope="col">Preview</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {ELEVATION_SHADOW_ROWS.map((row) => (
            <tr key={row.level}>
              <td>{row.level}</td>
              <td>{row.usage}</td>
              <td className={styles.shadowSwatchCell}>
                <div
                  className={styles.shadowSwatch}
                  style={
                    {
                      boxShadow: row.useToken ? 'var(--shadow-card-glow)' : row.shadow,
                    } as CSSProperties
                  }
                />
              </td>
              <td>
                <code className={styles.shadowCode}>{row.shadow}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ColorSwatches({ title, tokens }: { title: string; tokens: string[] }) {
  return (
    <div>
      <h3 className={styles.subsectionTitle}>{title}</h3>
      <div className={styles.swatches}>
        {tokens.map((t) => {
          const outline =
            t.includes('neutral-white') ||
            t.includes('neutral-925') ||
            t.includes('success-subtle') ||
            t.includes('warning-subtle') ||
            t.includes('information-subtle') ||
            t.includes('primary-subtle') ||
            t.includes('orange-50')
          return (
            <div key={t} className={styles.swatch}>
              <div
                className={[styles.swatchCircle, outline ? styles.swatchCircleOutlined : '']
                  .filter(Boolean)
                  .join(' ')}
                style={{ backgroundColor: `var(${t})` }}
                role="img"
                aria-label={t}
              />
              <span className={styles.swatchToken}>{t}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TokensPage() {
  return (
    <DocsPage
      category="Foundation"
      title="Tokens"
      description="CSS custom properties defined in cwpc-tokens.css — the single source of truth for CWPC components."
      status="stable"
    >
      <DocsSection title="Color tokens">
        <div className={styles.colorGroups}>
          <ColorSwatches title="Orange (brand)" tokens={ORANGE} />
          <ColorSwatches title="Yellow (brand)" tokens={YELLOW} />
          <ColorSwatches title="Primary (alias → orange)" tokens={PRIMARY_ALIAS} />
          <ColorSwatches title="Secondary blue" tokens={SECONDARY_BLUE} />
          <ColorSwatches title="Neutral" tokens={NEUTRAL} />
          <ColorSwatches title="Interactive" tokens={INTERACTIVE} />
          <ColorSwatches title="Success" tokens={SUCCESS} />
          <ColorSwatches title="Warning" tokens={WARNING} />
          <ColorSwatches title="Error" tokens={ERROR} />
          <ColorSwatches title="Information" tokens={INFORMATION} />
          <ColorSwatches title="Tertiary" tokens={TERTIARY} />
          <ColorSwatches title="Disabled" tokens={DISABLED} />
          {MISC_COLOR_GROUPS.map((g) => (
            <ColorSwatches key={g.title} title={g.title} tokens={g.tokens} />
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Text tokens">
        <p className={styles.note}>
          All <code className={styles.textName} style={{ color: '#ff8c42' }}>--text-*</code> entries from
          cwpc-tokens.css. Error emphasis still often uses <code className={styles.textName}>--color-error-*</code>{' '}
          (see table below).
        </p>
        <table className={styles.tokenTable}>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Sample</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {TEXT_TOKENS.map((row) => (
              <tr key={row.name}>
                <td className={styles.textName}>{row.name}</td>
                <td className={styles.textSample} style={{ color: `var(${row.name})` }}>
                  Aa
                </td>
                <td className={styles.textValue}>{row.value}</td>
              </tr>
            ))}
            {TEXT_VIA_COLOR.map((row) => (
              <tr key={row.name}>
                <td className={styles.textName}>{row.name}</td>
                <td className={styles.textSample} style={{ color: `var(${row.token})` }}>
                  Aa
                </td>
                <td className={styles.textValue}>
                  {row.token} → {row.value}
                  <br />
                  <span style={{ color: '#71717a', fontSize: 12 }}>{row.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DocsSection>

      <DocsSection title="Surface tokens">
        <p className={styles.note}>
          Background and fill tokens (semi-transparent overlays, shells, and component surfaces). Swatches use
          live <code className={styles.textName}>var(--token)</code> where possible.
        </p>
        <div className={styles.surfaceGrid}>
          {SURFACE_TOKENS.map((row) => (
            <div key={row.name} className={styles.surfaceCard}>
              <div
                className={styles.surfaceSwatch}
                style={{ backgroundColor: `var(${row.name})` }}
                role="img"
                aria-label={row.name}
              />
              <span className={styles.surfaceName}>{row.name}</span>
              <span className={styles.surfaceHex}>{row.value}</span>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Border tokens">
        <p className={styles.note}>Semantic border colors and widths from cwpc-tokens.css.</p>
        {BORDER_TOKENS.map((row) => (
          <div key={row.name} className={styles.borderRow}>
            <hr
              className={styles.borderLine}
              style={{ borderTopColor: `var(${row.cssVar})` }}
              aria-hidden
            />
            <div className={styles.borderMeta}>
              <span className={styles.borderName}>{row.name}</span>
              <span className={styles.borderValue}>{row.value}</span>
            </div>
          </div>
        ))}
        {BORDER_WIDTHS.map((row) => (
          <div key={row.name} className={styles.borderRow}>
            <hr
              className={styles.borderLine}
              style={{
                borderTopWidth: `var(${row.token})`,
                borderTopColor: 'rgba(255, 255, 255, 0.35)',
              }}
              aria-hidden
            />
            <div className={styles.borderMeta}>
              <span className={styles.borderName}>{row.name}</span>
              <span className={styles.borderValue}>top border width = var({row.token})</span>
            </div>
          </div>
        ))}
      </DocsSection>

      <DocsSection title="Interactive tokens">
        <p className={styles.note}>Primary and secondary interactive colors (same tokens as the Interactive color group).</p>
        <div className={styles.interactiveRow}>
          {INTERACTIVE.map((t) => (
            <div key={t} className={styles.interactiveItem}>
              <div
                className={styles.interactiveSwatch}
                style={{ backgroundColor: `var(${t})` }}
                role="img"
                aria-label={t}
              />
              <span className={styles.interactiveLabel}>{t}</span>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Spacing scale">
        {SPACING_SCALE.map((row) => {
          const barWidth = Math.min(row.px, MAX_BAR_PX)
          return (
            <div key={row.token} className={styles.spacingRow}>
              <span className={styles.spacingToken}>{row.token}</span>
              <div className={styles.spacingBarWrap}>
                <div
                  className={styles.spacingBar}
                  style={{
                    width: barWidth > 0 ? `${barWidth}px` : 'var(--border-width-xs)',
                  }}
                />
              </div>
              <span className={styles.spacingPx}>{row.px}px</span>
            </div>
          )
        })}
      </DocsSection>

      <DocsSection title="Typography scale">
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H1 (47.8px)</span>
          <p className={[styles.typographySample, styles.h1].join(' ')}>The quick brown fox</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H2 (39.8px)</span>
          <p className={[styles.typographySample, styles.h2].join(' ')}>Wildfire Prevention</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H3 (33.2px)</span>
          <p className={[styles.typographySample, styles.h3].join(' ')}>Community Resilience</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H4 (27.6px)</span>
          <p className={[styles.typographySample, styles.h4].join(' ')}>Scorecard Overview</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H5 (23px)</span>
          <p className={[styles.typographySample, styles.h5].join(' ')}>Design System</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>H6 (19.2px)</span>
          <p className={[styles.typographySample, styles.h6].join(' ')}>Component Library</p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-xl (20px)</span>
          <p className={[styles.typographySample, styles.bodyXl].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-lg (18px)</span>
          <p className={[styles.typographySample, styles.bodyLg].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-md (16px)</span>
          <p className={[styles.typographySample, styles.bodyMd].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-sm (14px)</span>
          <p className={[styles.typographySample, styles.bodySm].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className={styles.typographyRow}>
          <span className={styles.typographyLabel}>body-xs (11.1px)</span>
          <p className={[styles.typographySample, styles.body2xs].join(' ')}>
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      </DocsSection>

      <DocsSection title="Font weights">
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>300 Light</span>
          <span className={[styles.weightSample, styles.w300].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>400 Regular</span>
          <span className={[styles.weightSample, styles.w400].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>500 Medium</span>
          <span className={[styles.weightSample, styles.w500].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>600 SemiBold</span>
          <span className={[styles.weightSample, styles.w600].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>700 Bold</span>
          <span className={[styles.weightSample, styles.w700].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>800 ExtraBold</span>
          <span className={[styles.weightSample, styles.w800].join(' ')}>Wildfire</span>
        </div>
        <div className={styles.weightRow}>
          <span className={styles.weightLabel}>900 Black</span>
          <span className={[styles.weightSample, styles.w900].join(' ')}>Wildfire</span>
        </div>
      </DocsSection>

      <DocsSection title="Border radius">
        <div className={styles.radiusRow}>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusNone].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-none
              <br />
              0px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusXs].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-xs
              <br />
              1px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusSm].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-sm
              <br />
              2px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusMd].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-md
              <br />
              4px
            </span>
          </div>
          <div className={styles.radiusItem}>
            <div className={[styles.radiusBox, styles.radiusLg].join(' ')} />
            <span className={styles.radiusLabel}>
              --border-radius-lg
              <br />
              8px
            </span>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Interactive Color Tokens">
        <p className={styles.note}>
          Visual reference by category: token name, swatch, variable, and resolved hex (or width for
          border tokens).
        </p>
        <InteractiveColorReference />
      </DocsSection>

      <DocsSection title="Motion / Transitions">
        <p className={styles.note}>
          Timing values from cwpc-tokens.css. Each bar pulses using{' '}
          <code className={styles.textName}>tokenMotionPulse</code> at the listed duration.
        </p>
        <MotionDemonstrations />
      </DocsSection>

      <DocsSection title="Shadows Reference">
        <p className={styles.note}>Five elevation levels used across the system (see also Elevation docs).</p>
        <ShadowsReferenceTable />
      </DocsSection>
    </DocsPage>
  )
}
