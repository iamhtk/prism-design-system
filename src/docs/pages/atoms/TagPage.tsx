import { useState } from 'react'
import { Tag } from '../../../components/atoms/Tag/Tag'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const tagVariants = ['default', 'primary', 'success'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-400)', alignItems: 'center' }

export function TagPage() {
  const [label, setLabel] = useState('California')
  const [variant, setVariant] = useState<(typeof tagVariants)[number]>('default')
  const [disabled, setDisabled] = useState(false)
  const [showRemove, setShowRemove] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setLabel(String(val))
    if (key === 'variant') setVariant(val as (typeof tagVariants)[number])
    if (key === 'disabled') setDisabled(Boolean(val))
    if (key === 'onRemove') setShowRemove(Boolean(val))
  }

  const values = { label, variant, disabled, onRemove: showRemove }

  const interactiveCode = `<Tag
  label="${label.replace(/"/g, '\\"')}"
  variant="${variant}"
  disabled={${disabled}}${showRemove ? '\n  onRemove={() => {}}' : ''}
/>`

  return (
    <DocsPage
      title="Tag"
      description="Filter and selection chip with optional remove control."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3006"
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
                    <Tag
                      label={label}
                      variant={variant}
                      disabled={disabled}
                      onRemove={showRemove ? () => {} : undefined}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'California' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...tagVariants],
                        default: 'default',
                      },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                      { type: 'boolean', key: 'onRemove', label: 'onRemove', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<Tag label="Showcase" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tag label="Showcase" />
                </ComponentDemo>
              ),
            },
            {
              label: 'With remove',
              background: 'grid',
              center: true,
              code: '<Tag label="Pilots" onRemove={() => {}} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tag label="Pilots" onRemove={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'All variants',
              background: 'grid',
              center: true,
              code: `<Tag label="Default" />
<Tag label="Primary" variant="primary" />
<Tag label="Success" variant="success" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Tag label="Default" />
                    <Tag label="Primary" variant="primary" />
                    <Tag label="Success" variant="success" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: '<Tag label="Locked" onRemove={() => {}} disabled />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tag label="Locked" onRemove={() => {}} disabled />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Tag } from './components/atoms/Tag/Tag'

<Tag label="Scorecard" variant="primary" onRemove={() => removeFilter('scorecard')} />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Tag text.', required: true },
            {
              name: 'variant',
              type: "'default' | 'primary' | 'success'",
              default: "'default'",
              description: 'Color treatment.',
              required: false,
            },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables remove.', required: false },
            { name: 'onRemove', type: '() => void', description: 'Shows remove control when set.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use for active filters and removable tokens.',
              children: <Tag label="Community" onRemove={() => {}} variant="primary" />,
            },
            {
              type: 'dont',
              description: "Don't replace checkbox groups—use Checkbox for form commitments.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>
                  Use Checkbox for “I agree to terms”
                </span>
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
              type: 'keyboard',
              label: 'Remove',
              description: 'Remove control is a button with an accessible name derived from the label.',
            },
            {
              type: 'aria',
              label: 'State',
              description: 'Disabled state prevents activation and is exposed to assistive tech.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
