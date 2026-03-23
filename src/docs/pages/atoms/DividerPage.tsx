import { useState } from 'react'
import { Text } from '../../../components/atoms/Text/Text'
import { Divider } from '../../../components/atoms/Divider/Divider'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const orientations = ['horizontal', 'vertical'] as const
const dividerVariants = ['default', 'subtle', 'strong'] as const
const spacings = ['sm', 'md', 'lg'] as const

const verticalRow = {
  display: 'flex',
  alignItems: 'stretch' as const,
  gap: 'var(--space-400)',
  minHeight: 'var(--space-800)',
}

export function DividerPage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>('horizontal')
  const [label, setLabel] = useState('')
  const [variant, setVariant] = useState<(typeof dividerVariants)[number]>('default')
  const [spacing, setSpacing] = useState<(typeof spacings)[number]>('md')

  const patch = (key: string, val: unknown) => {
    if (key === 'orientation') setOrientation(val as (typeof orientations)[number])
    if (key === 'label') setLabel(String(val))
    if (key === 'variant') setVariant(val as (typeof dividerVariants)[number])
    if (key === 'spacing') setSpacing(val as (typeof spacings)[number])
  }

  const values = { orientation, label, variant, spacing }
  const labelProp =
    label.trim() && orientation === 'horizontal' ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''

  const interactiveCode = `<Divider
  orientation="${orientation}"${labelProp}
  variant="${variant}"
  spacing="${spacing}"
/>`

  return (
    <DocsPage
      title="Divider"
      description="Separates sections horizontally or vertically with optional label."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3008"
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
                    <div style={orientation === 'vertical' ? verticalRow : undefined}>
                      {orientation === 'vertical' ? (
                        <>
                          <Text variant="body-sm">Left column</Text>
                          <Divider
                            orientation="vertical"
                            variant={variant}
                            spacing={spacing}
                          />
                          <Text variant="body-sm">Right column</Text>
                        </>
                      ) : (
                        <Divider
                          orientation="horizontal"
                          label={label.trim() || undefined}
                          variant={variant}
                          spacing={spacing}
                        />
                      )}
                    </div>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'orientation',
                        label: 'orientation',
                        options: [...orientations],
                        default: 'horizontal',
                      },
                      { type: 'text', key: 'label', label: 'label', default: '' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...dividerVariants],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'spacing',
                        label: 'spacing',
                        options: [...spacings],
                        default: 'md',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Horizontal default',
              background: 'grid',
              center: true,
              code: '<Divider orientation="horizontal" variant="default" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Divider orientation="horizontal" variant="default" />
                </ComponentDemo>
              ),
            },
            {
              label: 'With label',
              background: 'grid',
              center: true,
              code: '<Divider label="OR" variant="default" spacing="md" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Divider label="OR" variant="default" spacing="md" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Subtle',
              background: 'grid',
              center: true,
              code: '<Divider variant="subtle" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Divider variant="subtle" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Strong',
              background: 'grid',
              center: true,
              code: '<Divider variant="strong" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Divider variant="strong" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Vertical',
              background: 'grid',
              center: true,
              code: `<div style={{ display: 'flex', gap: 'var(--space-400)', minHeight: 120 }}>
  <Text>Section A</Text>
  <Divider orientation="vertical" />
  <Text>Section B</Text>
</div>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={verticalRow}>
                    <Text variant="body-md">Section A</Text>
                    <Divider orientation="vertical" variant="default" />
                    <Text variant="body-md">Section B</Text>
                  </div>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Divider } from './components/atoms/Divider/Divider'

<Divider label="Filters" variant="subtle" spacing="sm" />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            {
              name: 'orientation',
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: 'Axis of the rule.',
              required: false,
            },
            { name: 'label', type: 'string', description: 'Center label for horizontal dividers.', required: false },
            {
              name: 'variant',
              type: "'default' | 'subtle' | 'strong'",
              default: "'default'",
              description: 'Contrast of the rule.',
              required: false,
            },
            { name: 'spacing', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Vertical rhythm.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use between distinct content groups to improve scanability.',
              children: <Divider />,
            },
            {
              type: 'dont',
              description: "Don't use dividers purely as decoration without semantic separation.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Avoid divider spam</span>
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
              label: 'Separator',
              description: 'Horizontal rules expose role="separator" with optional aria-label from label text.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
