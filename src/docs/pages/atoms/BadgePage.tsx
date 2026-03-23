import { useState } from 'react'
import { Badge } from '../../../components/atoms/Badge/Badge'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const badgeVariants = ['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const
const sizes = ['sm', 'md'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-400)', alignItems: 'center' }

export function BadgePage() {
  const [label, setLabel] = useState('Badge')
  const [variant, setVariant] = useState<(typeof badgeVariants)[number]>('primary')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [dot, setDot] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setLabel(String(val))
    if (key === 'variant') setVariant(val as (typeof badgeVariants)[number])
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'dot') setDot(Boolean(val))
  }

  const values = { label, variant, size, dot }
  const interactiveCode = `<Badge
  label="${label.replace(/"/g, '\\"')}"
  variant="${variant}"
  size="${size}"
  dot={${dot}}
/>`

  return (
    <DocsPage
      title="Badge"
      description="Compact status chip for metadata and live indicators."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3005"
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
                    <Badge label={label} variant={variant} size={size} dot={dot} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Badge' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...badgeVariants],
                        default: 'primary',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      { type: 'boolean', key: 'dot', label: 'dot', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'All variants',
              background: 'grid',
              center: true,
              code: `<div style={{ display: 'flex', gap: 'var(--space-400)', flexWrap: 'wrap' }}>
  <Badge label="Primary" variant="primary" />
  <Badge label="Success" variant="success" />
  <Badge label="Warning" variant="warning" />
  <Badge label="Error" variant="error" />
  <Badge label="Info" variant="info" />
  <Badge label="Neutral" variant="neutral" />
</div>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Badge label="Primary" variant="primary" />
                    <Badge label="Success" variant="success" />
                    <Badge label="Warning" variant="warning" />
                    <Badge label="Error" variant="error" />
                    <Badge label="Info" variant="info" />
                    <Badge label="Neutral" variant="neutral" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Sizes',
              background: 'grid',
              center: true,
              code: `<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Badge label="Small" size="sm" />
                    <Badge label="Medium" size="md" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With dot',
              background: 'grid',
              center: true,
              code: '<Badge label="Live" variant="success" dot />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Badge label="Live" variant="success" dot />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Badge } from './components/atoms/Badge/Badge'

<Badge label="Pilot" variant="success" size="sm" dot />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Badge text.', required: true },
            {
              name: 'variant',
              type: "'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'",
              default: "'primary'",
              description: 'Semantic color.',
              required: false,
            },
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Scale.', required: false },
            { name: 'dot', type: 'boolean', default: 'false', description: 'Leading status dot.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use semantic colors (success for positive, error for problems).',
              children: (
                <div style={row}>
                  <Badge label="Synced" variant="success" />
                  <Badge label="Failed" variant="error" />
                </div>
              ),
            },
            {
              type: 'dont',
              description: "Don't use badges as clickable controls—use Button or Tag with actions.",
              children: <Badge label="Not a button" variant="primary" />,
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Accessibility">
        <AccessibilitySection
          wcagLevel="AA"
          items={[
            {
              type: 'color',
              label: 'Color',
              description: 'Pair color with text; the dot supplements but does not replace the label.',
            },
            {
              type: 'wcag',
              label: 'Contrast',
              description: 'Badge fills and text use token pairs intended for small type.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
