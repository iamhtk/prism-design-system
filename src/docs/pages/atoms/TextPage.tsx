import { useState } from 'react'
import { Text } from '../../../components/atoms/Text/Text'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const textVariants = [
  'body-xl',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',
  'caption',
  'label',
] as const

const textColors = [
  'default',
  'caption',
  'placeholder',
  'primary',
  'success',
  'error',
  'warning',
  'info',
  'disabled',
] as const

const weights = ['regular', 'medium', 'semibold', 'bold'] as const
const elements = ['p', 'span', 'div', 'label'] as const

const colStyle = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--space-300)', width: '100%' }

export function TextPage() {
  const [ctrlVariant, setCtrlVariant] = useState<(typeof textVariants)[number]>('body-md')
  const [ctrlColor, setCtrlColor] = useState<(typeof textColors)[number]>('default')
  const [ctrlWeight, setCtrlWeight] = useState<(typeof weights)[number]>('regular')
  const [ctrlTruncate, setCtrlTruncate] = useState(false)
  const [ctrlAs, setCtrlAs] = useState<(typeof elements)[number]>('p')

  const patch = (key: string, val: unknown) => {
    if (key === 'variant') setCtrlVariant(val as (typeof textVariants)[number])
    if (key === 'color') setCtrlColor(val as (typeof textColors)[number])
    if (key === 'weight') setCtrlWeight(val as (typeof weights)[number])
    if (key === 'truncate') setCtrlTruncate(Boolean(val))
    if (key === 'as') setCtrlAs(val as (typeof elements)[number])
  }

  const values = {
    variant: ctrlVariant,
    color: ctrlColor,
    weight: ctrlWeight,
    truncate: ctrlTruncate,
    as: ctrlAs,
  }

  const interactiveCode = `<Text
  variant="${ctrlVariant}"
  color="${ctrlColor}"
  weight="${ctrlWeight}"
  truncate={${ctrlTruncate}}
  as="${ctrlAs}"
>
  CWPC partners with communities to reduce catastrophic wildfire risk.
</Text>`

  return (
    <DocsPage
      title="Text"
      description="Body, caption, and label styles with semantic color and truncation."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3012"
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
                    <Text
                      variant={ctrlVariant}
                      color={ctrlColor}
                      weight={ctrlWeight}
                      truncate={ctrlTruncate}
                      as={ctrlAs}
                    >
                      CWPC partners with communities to reduce catastrophic wildfire risk.
                    </Text>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...textVariants],
                        default: 'body-md',
                      },
                      {
                        type: 'select',
                        key: 'color',
                        label: 'color',
                        options: [...textColors],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'weight',
                        label: 'weight',
                        options: [...weights],
                        default: 'regular',
                      },
                      { type: 'boolean', key: 'truncate', label: 'truncate', default: false },
                      {
                        type: 'select',
                        key: 'as',
                        label: 'as',
                        options: [...elements],
                        default: 'p',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'All variants',
              background: 'grid',
              center: true,
              code: `<Text variant="body-xl">Body XL</Text>
<Text variant="body-lg">Body LG</Text>
<Text variant="body-md">Body MD</Text>
<Text variant="body-sm">Body SM</Text>
<Text variant="body-xs">Body XS</Text>
<Text variant="caption">Caption</Text>
<Text variant="label">Label</Text>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={colStyle}>
                    <Text variant="body-xl">Body XL</Text>
                    <Text variant="body-lg">Body LG</Text>
                    <Text variant="body-md">Body MD</Text>
                    <Text variant="body-sm">Body SM</Text>
                    <Text variant="body-xs">Body XS</Text>
                    <Text variant="caption">Caption</Text>
                    <Text variant="label">Label</Text>
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'All colors',
              background: 'grid',
              center: true,
              code: `<Text color="default">Default</Text>
<Text color="primary">Primary</Text>
<Text color="success">Success</Text>
<Text color="error">Error</Text>
<Text color="warning">Warning</Text>
<Text color="info">Info</Text>
<Text color="disabled">Disabled</Text>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={colStyle}>
                    <Text color="default">Default</Text>
                    <Text color="primary">Primary</Text>
                    <Text color="success">Success</Text>
                    <Text color="error">Error</Text>
                    <Text color="warning">Warning</Text>
                    <Text color="info">Info</Text>
                    <Text color="disabled">Disabled</Text>
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Truncate',
              background: 'grid',
              center: true,
              code: `<div style={{ maxWidth: 'var(--space-1800)' }}>
  <Text truncate>
    Long CWPC description that should ellipsize when space is tight.
  </Text>
</div>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={{ maxWidth: 'var(--space-1800)' }}>
                    <Text truncate>
                      Long CWPC description that should ellipsize when space is tight.
                    </Text>
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Elements',
              background: 'grid',
              center: true,
              code: `<Text as="p">Paragraph</Text>
<Text as="span">Inline span</Text>
<Text as="div">Block div</Text>
<Text as="label" htmlFor="docs-text-sample">Label</Text>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={colStyle}>
                    <Text as="p">Paragraph</Text>
                    <div>
                      <Text as="span">Inline span</Text>
                    </div>
                    <Text as="div">Block div</Text>
                    <Text as="label" htmlFor="docs-text-sample">
                      Label for a control
                    </Text>
                    <input
                      id="docs-text-sample"
                      type="text"
                      readOnly
                      defaultValue=""
                      placeholder="Linked via htmlFor"
                      style={{
                        width: '100%',
                        maxWidth: 'var(--space-1800)',
                        padding: 'var(--space-300)',
                        borderRadius: 'var(--border-radius-md)',
                        border: 'var(--border-width-xs) solid var(--color-disabled-subtle)',
                        backgroundColor: 'var(--color-neutral-white)',
                        color: 'var(--text-on-color-body)',
                      }}
                    />
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
          code={`import { Text } from './components/atoms/Text/Text'

<Text variant="body-sm" color="caption">
  Supporting copy beneath the scorecard chart.
</Text>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            {
              name: 'variant',
              type: 'body-xl | body-lg | body-md | body-sm | body-xs | caption | label',
              default: 'body-md',
              description: 'Typography scale.',
              required: false,
            },
            {
              name: 'color',
              type: 'default | caption | placeholder | primary | success | error | warning | info | disabled',
              default: 'default',
              description: 'Semantic color.',
              required: false,
            },
            {
              name: 'weight',
              type: 'regular | medium | semibold | bold',
              description: 'Overrides automatic weight (labels default to medium).',
              required: false,
            },
            { name: 'align', type: 'left | center | right', default: 'left', description: 'Text alignment.', required: false },
            { name: 'truncate', type: 'boolean', default: 'false', description: 'Single-line ellipsis.', required: false },
            { name: 'as', type: 'p | span | div | label', default: 'p', description: 'Polymorphic element.', required: false },
            { name: 'id', type: 'string', description: 'Forwarded to the underlying element.', required: false },
            { name: 'htmlFor', type: 'string', description: 'Use with as="label" to associate a control.', required: false },
            { name: 'className', type: 'string', description: 'Extra classes.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use caption or disabled colors for supporting metadata, not body default.',
              children: <Text variant="caption">Last updated 12 Mar 2025</Text>,
            },
            {
              type: 'dont',
              description: "Don't rely on truncation alone to hide critical compliance text.",
              children: (
                <div style={{ maxWidth: 'var(--space-800)' }}>
                  <Text truncate>
                    Mandatory disclosure text must remain discoverable — truncation is for layout, not hiding.
                  </Text>
                </div>
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
              label: 'Labels',
              description: 'When rendered as a label with htmlFor, focus moves to the associated control from the accessibility tree.',
            },
            {
              type: 'color',
              label: 'Semantic colors',
              description: 'Pair error, warning, and success colors with explicit wording, not color alone.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
