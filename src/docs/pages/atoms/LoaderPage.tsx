import { useState } from 'react'
import { Loader } from '../../../components/atoms/Loader/Loader'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['primary', 'success', 'info'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-600)', alignItems: 'center' }

export function LoaderPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary')
  const [label, setLabel] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'label') setLabel(String(val))
  }

  const values = { size, variant, label }
  const labelLine = label.trim() ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''
  const interactiveCode = `<Loader size="${size}" variant="${variant}"${labelLine} />`

  return (
    <DocsPage
      title="Loader"
      description="Inline spinner for short waits while data or actions resolve."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3007"
      since="v1.0.0"
    >
      <DocsSection title="Preview">
        <StoryTabs
          defaultStory={0}
          stories={[
            {
              label: 'Interactive',
              background: 'grid',
              center: true,
              code: interactiveCode,
              children: (
                <>
                  <ComponentDemo center padding="sm" background="transparent">
                    <Loader size={size} variant={variant} label={label.trim() || undefined} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'primary',
                      },
                      { type: 'text', key: 'label', label: 'label (a11y)', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'All sizes',
              background: 'grid',
              center: true,
              code: `<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Loader size="sm" label="Small" />
                    <Loader size="md" label="Medium" />
                    <Loader size="lg" label="Large" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'All variants',
              background: 'grid',
              center: true,
              code: `<Loader variant="primary" />
<Loader variant="success" />
<Loader variant="info" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Loader variant="primary" label="Primary" />
                    <Loader variant="success" label="Success" />
                    <Loader variant="info" label="Info" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With label',
              background: 'grid',
              center: true,
              code: '<Loader label="Loading pilots" size="md" variant="primary" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Loader label="Loading pilots" size="md" variant="primary" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Loader } from './components/atoms/Loader/Loader'

{busy ? <Loader label="Saving scorecard" /> : null}`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner scale.', required: false },
            {
              name: 'variant',
              type: "'primary' | 'success' | 'info'",
              default: "'primary'",
              description: 'Stroke color.',
              required: false,
            },
            { name: 'label', type: 'string', description: 'Visually hidden text for screen readers.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Show a loader as soon as an action exceeds a perceptible delay.',
              children: <Loader label="Submitting" />,
            },
            {
              type: 'dont',
              description: "Don't flash a loader for work that finishes in under ~200ms.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Skip spinner for instant feedback</span>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Accessibility">
        <AccessibilitySection
          wcagLevel="AA"
          items={[
            {
              type: 'aria',
              label: 'Live region',
              description: 'Uses role="status" and aria-live="polite" on the root.',
            },
            {
              type: 'keyboard',
              label: 'Label',
              description: 'Provide a label prop so screen readers announce progress.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
