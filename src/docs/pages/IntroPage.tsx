import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/atoms/Button/Button'
import { Card } from '../../components/organisms/Card/Card'
import { Input } from '../../components/molecules/Input/Input'
import { ChangelogSection } from '../helpers/ChangelogSection'
import { CodeBlock } from '../helpers/CodeBlock'
import styles from './IntroPage.module.css'

type DocComponentCategory = 'atom' | 'molecule' | 'organism'

const DOC_COMPONENTS: { name: string; path: string; category: DocComponentCategory }[] = [
  { name: 'Button', path: '/docs/atoms/button', category: 'atom' },
  { name: 'Label', path: '/docs/atoms/label', category: 'atom' },
  { name: 'Field', path: '/docs/atoms/field', category: 'atom' },
  { name: 'Link', path: '/docs/atoms/link', category: 'atom' },
  { name: 'Badge', path: '/docs/atoms/badge', category: 'atom' },
  { name: 'Tag', path: '/docs/atoms/tag', category: 'atom' },
  { name: 'Loader', path: '/docs/atoms/loader', category: 'atom' },
  { name: 'Divider', path: '/docs/atoms/divider', category: 'atom' },
  { name: 'Avatar', path: '/docs/atoms/avatar', category: 'atom' },
  { name: 'Skeleton', path: '/docs/atoms/skeleton', category: 'atom' },
  { name: 'Heading', path: '/docs/atoms/heading', category: 'atom' },
  { name: 'Text', path: '/docs/atoms/text', category: 'atom' },
  { name: 'Blockquote', path: '/docs/atoms/blockquote', category: 'atom' },
  { name: 'Code', path: '/docs/atoms/code', category: 'atom' },
  { name: 'Image', path: '/docs/atoms/image', category: 'atom' },
  { name: 'MapPin', path: '/docs/atoms/mappin', category: 'atom' },
  { name: 'Rating', path: '/docs/atoms/rating', category: 'atom' },
  { name: 'Input', path: '/docs/molecules/input', category: 'molecule' },
  { name: 'Checkbox', path: '/docs/molecules/checkbox', category: 'molecule' },
  { name: 'RadioButton', path: '/docs/molecules/radiobutton', category: 'molecule' },
  { name: 'Switch', path: '/docs/molecules/switch', category: 'molecule' },
  { name: 'TextArea', path: '/docs/molecules/textarea', category: 'molecule' },
  { name: 'Dropdown', path: '/docs/molecules/dropdown', category: 'molecule' },
  { name: 'SearchBar', path: '/docs/molecules/searchbar', category: 'molecule' },
  { name: 'Breadcrumb', path: '/docs/molecules/breadcrumb', category: 'molecule' },
  { name: 'Tooltip', path: '/docs/molecules/tooltip', category: 'molecule' },
  { name: 'ProgressBar', path: '/docs/molecules/progressbar', category: 'molecule' },
  { name: 'ProgressCircle', path: '/docs/molecules/progresscircle', category: 'molecule' },
  { name: 'TabBar', path: '/docs/molecules/tabbar', category: 'molecule' },
  { name: 'ButtonGroup', path: '/docs/molecules/buttongroup', category: 'molecule' },
  { name: 'SocialButton', path: '/docs/molecules/socialbutton', category: 'molecule' },
  { name: 'Pagination', path: '/docs/molecules/pagination', category: 'molecule' },
  { name: 'StatCard', path: '/docs/molecules/statcard', category: 'molecule' },
  { name: 'EmptyState', path: '/docs/molecules/emptystate', category: 'molecule' },
  { name: 'Stepper', path: '/docs/molecules/stepper', category: 'molecule' },
  { name: 'FileUpload', path: '/docs/molecules/fileupload', category: 'molecule' },
  { name: 'List', path: '/docs/molecules/list', category: 'molecule' },
  { name: 'FilterBar', path: '/docs/molecules/filterbar', category: 'molecule' },
  { name: 'DatePicker', path: '/docs/molecules/datepicker', category: 'molecule' },
  { name: 'ContextMenu', path: '/docs/molecules/contextmenu', category: 'molecule' },
  { name: 'Popover', path: '/docs/molecules/popover', category: 'molecule' },
  { name: 'NotificationBar', path: '/docs/molecules/notificationbar', category: 'molecule' },
  { name: 'SubscribeWidget', path: '/docs/molecules/subscribewidget', category: 'molecule' },
  { name: 'Accordion', path: '/docs/organisms/accordion', category: 'organism' },
  { name: 'Card', path: '/docs/organisms/card', category: 'organism' },
  { name: 'Forms', path: '/docs/organisms/forms', category: 'organism' },
  { name: 'ProfileCard', path: '/docs/organisms/profilecard', category: 'organism' },
  { name: 'VideoCard', path: '/docs/organisms/videocard', category: 'organism' },
  { name: 'RegistrationModal', path: '/docs/organisms/registrationmodal', category: 'organism' },
  { name: 'Navbar', path: '/docs/organisms/navbar', category: 'organism' },
  { name: 'SecondaryNav', path: '/docs/organisms/secondarynav', category: 'organism' },
  { name: 'Footer', path: '/docs/organisms/footer', category: 'organism' },
  { name: 'Alert', path: '/docs/organisms/alert', category: 'organism' },
  { name: 'Toast', path: '/docs/organisms/toast', category: 'organism' },
  { name: 'Modal', path: '/docs/organisms/modal', category: 'organism' },
  { name: 'Menu', path: '/docs/organisms/menu', category: 'organism' },
  { name: 'Table', path: '/docs/organisms/table', category: 'organism' },
  { name: 'Banner', path: '/docs/organisms/banner', category: 'organism' },
  { name: 'Panel', path: '/docs/organisms/panel', category: 'organism' },
  { name: 'VideoPlayer', path: '/docs/organisms/videoplayer', category: 'organism' },
  { name: 'GridLayout', path: '/docs/organisms/gridlayout', category: 'organism' },
  { name: 'ErrorPage', path: '/docs/organisms/errorpage', category: 'organism' },
  { name: 'SuccessScreen', path: '/docs/organisms/successscreen', category: 'organism' },
]

const INSTALL_CODE = `npm install react react-dom

# In your app entry (e.g. main.tsx), load design tokens once:
import './tokens/cwpc-tokens.css'`

const CODE_ATOMS = `import { Button } from './components/atoms/Button/Button'

export function Example() {
  return <Button type="default" label="Download Scorecard" />
}`

const CODE_MOLECULES = `import { Input } from './components/molecules/Input/Input'

export function Example() {
  return (
    <Input
      label="Email address"
      type="email"
      placeholder="you@example.org"
      required
    />
  )
}`

const CODE_ORGANISMS = `import { Card } from './components/organisms/Card/Card'

export function Example() {
  return (
    <Card
      title="Wildfire Innovator Showcase"
      titleColor="primary"
    >
      <p>Card body content goes here.</p>
    </Card>
  )
}`

const INTRO_CHANGELOG = [
  {
    version: 'v1.0.0',
    date: 'March 2026',
    type: 'added' as const,
    description:
      'Initial release of the CWPC Design System with 68 components across 3 atomic layers.',
  },
  {
    version: 'v1.0.0',
    date: 'March 2026',
    type: 'added' as const,
    description: 'Full Storybook-style interactive documentation site.',
  },
  {
    version: 'v1.0.0',
    date: 'March 2026',
    type: 'added' as const,
    description: 'Complete token system including color, spacing, typography, and elevation.',
  },
  {
    version: 'v1.0.0',
    date: 'March 2026',
    type: 'added' as const,
    description: 'Atomic Design structure: 17 Atoms, 26 Molecules, 20 Organisms.',
  },
]

type QuickLayer = 'atoms' | 'molecules' | 'organisms'
type GridFilter = 'all' | DocComponentCategory

const LAYER_CODE: Record<QuickLayer, string> = {
  atoms: CODE_ATOMS,
  molecules: CODE_MOLECULES,
  organisms: CODE_ORGANISMS,
}

function levelLabel(c: DocComponentCategory): string {
  if (c === 'atom') return 'Atom'
  if (c === 'molecule') return 'Molecule'
  return 'Organism'
}

export function IntroPage() {
  const navigate = useNavigate()
  const [quickLayer, setQuickLayer] = useState<QuickLayer>('atoms')
  const [gridFilter, setGridFilter] = useState<GridFilter>('all')

  const filteredComponents = useMemo(() => {
    if (gridFilter === 'all') return DOC_COMPONENTS
    return DOC_COMPONENTS.filter((c) => c.category === gridFilter)
  }, [gridFilter])

  return (
    <div className={styles.introRoot}>
      <header className={styles.hero}>
        <p className={styles.heroBreadcrumb}>CWPC / Design System / v1.0.0</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleAccent}>CWPC</span> Design System
        </h1>
        <p className={styles.heroSubtitle}>
          A complete, production-ready component library for the Catastrophic Wildfire Prevention
          Consortium. 68 components. 3 layers. One source of truth.
        </p>
        <div className={styles.statChips}>
          <span className={styles.statChip}>
            <span className={styles.statChipIcon} aria-hidden>
              ▦
            </span>
            68 Components
          </span>
          <span className={styles.statChip}>
            <span className={styles.statChipIcon} aria-hidden>
              ⬡
            </span>
            Atomic Design
          </span>
          <span className={styles.statChip}>
            <span className={styles.statChipIcon} aria-hidden>
              ⟨/⟩
            </span>
            React + TypeScript
          </span>
        </div>
      </header>

      <section aria-labelledby="intro-quick-start">
        <h2 id="intro-quick-start" className={styles.sectionTitle}>
          Quick Start
        </h2>
        <CodeBlock code={INSTALL_CODE} language="bash" />
        <div className={styles.quickTabs} role="tablist" aria-label="Import examples by layer">
          {(['atoms', 'molecules', 'organisms'] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={quickLayer === key}
              className={[styles.quickTab, quickLayer === key ? styles.quickTabActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setQuickLayer(key)}
            >
              {key === 'atoms' ? 'Atoms' : key === 'molecules' ? 'Molecules' : 'Organisms'}
            </button>
          ))}
        </div>
        <CodeBlock code={LAYER_CODE[quickLayer]} language="tsx" />
      </section>

      <section aria-labelledby="intro-layers">
        <h2 id="intro-layers" className={styles.sectionTitle}>
          Three layers
        </h2>
        <div className={styles.layersGrid}>
          <article className={styles.layerCard}>
            <div className={styles.layerCardIcon} aria-hidden>
              ⬡
            </div>
            <h3 className={styles.layerCardTitle}>Atoms</h3>
            <p className={styles.layerCardDesc}>
              Buttons, inputs, typography, and icons — the smallest UI primitives with no internal
              composition.
            </p>
            <p className={styles.layerCardCount}>17 components</p>
            <div className={[styles.layerPreview, styles.previewAtoms].join(' ')}>
              <div className={styles.previewAtomsInner}>
                <Button type="default" label="Primary" />
                <Button type="outlined" label="Outline" />
                <Button type="transparent" label="Ghost" />
              </div>
            </div>
          </article>

          <article className={styles.layerCard}>
            <div className={styles.layerCardIcon} aria-hidden>
              ⧉
            </div>
            <h3 className={styles.layerCardTitle}>Molecules</h3>
            <p className={styles.layerCardDesc}>
              Labels + fields, tooltips on controls, and other focused combinations of atoms.
            </p>
            <p className={styles.layerCardCount}>26 components</p>
            <div className={styles.layerPreview}>
              <div className={styles.previewMolecule}>
                <Input label="Email" type="email" placeholder="you@cwpc.org" status="default" />
              </div>
            </div>
          </article>

          <article className={styles.layerCard}>
            <div className={styles.layerCardIcon} aria-hidden>
              ▦
            </div>
            <h3 className={styles.layerCardTitle}>Organisms</h3>
            <p className={styles.layerCardDesc}>
              Navbars, cards, modals, and tables — full sections built from molecules and atoms.
            </p>
            <p className={styles.layerCardCount}>20 components</p>
            <div className={styles.layerPreview}>
              <div className={styles.previewOrganism}>
                <Card title="Innovator showcase" titleColor="primary" width="260px">
                  <p className={styles.organismPreviewBody}>Preview body</p>
                </Card>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="intro-all-components">
        <h2 id="intro-all-components" className={styles.gridSectionTitle}>
          All 68 Components
        </h2>
        <div className={styles.filterTabs} role="tablist" aria-label="Filter components">
          {(
            [
              ['all', 'All'],
              ['atom', 'Atoms'],
              ['molecule', 'Molecules'],
              ['organism', 'Organisms'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={gridFilter === key}
              className={[styles.filterTab, gridFilter === key ? styles.filterTabActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setGridFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={styles.componentGrid}>
          {filteredComponents.map((item) => (
            <button
              key={item.path}
              type="button"
              className={styles.compCard}
              onClick={() => navigate(item.path)}
            >
              <div className={styles.compCardTop}>
                <span
                  className={[
                    styles.categoryDot,
                    item.category === 'atom'
                      ? styles.dotAtom
                      : item.category === 'molecule'
                        ? styles.dotMolecule
                        : styles.dotOrganism,
                  ].join(' ')}
                  aria-hidden
                />
                <span className={styles.compName}>{item.name}</span>
              </div>
              <span className={styles.compLevel}>{levelLabel(item.category)}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="intro-changelog">
        <h2 id="intro-changelog" className={styles.changelogTitle}>
          What&apos;s New
        </h2>
        <ChangelogSection entries={INTRO_CHANGELOG} />
      </section>
    </div>
  )
}
