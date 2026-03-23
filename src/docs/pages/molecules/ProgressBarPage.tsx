import { useState } from 'react'
import { ProgressBar } from '../../../components/molecules/ProgressBar/ProgressBar'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['primary', 'success', 'warning', 'error', 'info'] as const
const sizes = ['sm', 'md', 'lg'] as const

const col = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--space-500)', width: '100%', maxWidth: 'var(--space-1900)' }

export function ProgressBarPage() {
  const [value, setValue] = useState(60)
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [label, setLabel] = useState('')
  const [showValue, setShowValue] = useState(false)
  const [animated, setAnimated] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'value') setValue(Number(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'label') setLabel(String(val))
    if (key === 'showValue') setShowValue(Boolean(val))
    if (key === 'animated') setAnimated(Boolean(val))
  }

  const values = { value, variant, size, label, showValue, animated }
  const labelLine = label.trim() ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''
  const showVal = showValue ? '\n  showValue' : ''
  const anim = animated ? '\n  animated' : ''

  const interactiveCode = `<ProgressBar
  value={${value}}
  variant="${variant}"
  size="${size}"${labelLine}${showVal}${anim}
/>`

  return (
    <DocsPage
      title="ProgressBar"
      description="Linear meter for determinate tasks such as uploads and multi-step saves."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4110"
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
                  <ComponentDemo center padding="sm" background="transparent" fullWidth>
                    <div style={col}>
                      <ProgressBar
                        value={value}
                        variant={variant}
                        size={size}
                        label={label.trim() || undefined}
                        showValue={showValue}
                        animated={animated}
                      />
                    </div>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'number', key: 'value', label: 'value', default: 60, min: 0, max: 100, step: 5 },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'primary',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      { type: 'text', key: 'label', label: 'label', default: '' },
                      { type: 'boolean', key: 'showValue', label: 'showValue', default: false },
                      { type: 'boolean', key: 'animated', label: 'animated', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Variants',
              background: 'grid',
              center: true,
              code: `<ProgressBar value={60} variant="primary" />
<ProgressBar value={60} variant="success" />
<ProgressBar value={60} variant="warning" />
<ProgressBar value={60} variant="error" />
<ProgressBar value={60} variant="info" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={col}>
                    {variants.map((v) => (
                      <ProgressBar key={v} value={60} variant={v} />
                    ))}
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Sizes',
              background: 'grid',
              center: true,
              code: `<ProgressBar value={55} size="sm" />
<ProgressBar value={55} size="md" />
<ProgressBar value={55} size="lg" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={col}>
                    <ProgressBar value={55} size="sm" variant="primary" />
                    <ProgressBar value={55} size="md" variant="primary" />
                    <ProgressBar value={55} size="lg" variant="primary" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With label',
              background: 'grid',
              center: true,
              code: '<ProgressBar value={42} label="Uploading scorecard export" variant="info" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ProgressBar value={42} label="Uploading scorecard export" variant="info" />
                </ComponentDemo>
              ),
            },
            {
              label: 'With value',
              background: 'grid',
              center: true,
              code: '<ProgressBar value={78} showValue variant="success" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ProgressBar value={78} showValue variant="success" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Animated',
              background: 'grid',
              center: true,
              code: '<ProgressBar value={65} animated variant="primary" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ProgressBar value={65} animated variant="primary" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { ProgressBar } from './components/molecules/ProgressBar/ProgressBar'

<ProgressBar value={pct} showValue label="Syncing treatments" variant="success" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'number', description: '0–100 completion.', required: true },
            { name: 'label', type: 'string', description: 'Optional title above the track.', required: false },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Shows percent text.', required: false },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height scale.', required: false },
            {
              name: 'variant',
              type: "'primary' | 'success' | 'warning' | 'error' | 'info'",
              default: "'primary'",
              description: 'Semantic fill color.',
              required: false,
            },
            { name: 'animated', type: 'boolean', default: 'false', description: 'Subtle shimmer on the fill.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Expose the numeric percent via showValue or adjacent text for screen readers.',
              children: <ProgressBar value={64} showValue label="Indexing attachments" />,
            },
            {
              type: 'dont',
              description: "Don't loop infinite animation for determinate jobs that eventually finish.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Reserve looping motion for indeterminate states.</span>
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
              label: 'Progressbar',
              description: 'Fill exposes role progressbar with aria-valuenow/min/max.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
