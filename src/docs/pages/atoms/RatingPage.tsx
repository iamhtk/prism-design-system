import { useState } from 'react'
import { Rating } from '../../../components/atoms/Rating/Rating'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const ratingSizes = ['sm', 'md', 'lg'] as const

const rowStyle = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--space-500)', alignItems: 'flex-start' }

export function RatingPage() {
  const [ctrlValue, setCtrlValue] = useState(3.5)
  const [ctrlMax, setCtrlMax] = useState(5)
  const [ctrlReadonly, setCtrlReadonly] = useState(false)
  const [ctrlSize, setCtrlSize] = useState<(typeof ratingSizes)[number]>('md')
  const [ctrlShowValue, setCtrlShowValue] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'value') setCtrlValue(Number(val))
    if (key === 'max') setCtrlMax(Number(val))
    if (key === 'readonly') setCtrlReadonly(Boolean(val))
    if (key === 'size') setCtrlSize(val as (typeof ratingSizes)[number])
    if (key === 'showValue') setCtrlShowValue(Boolean(val))
  }

  const values = {
    value: ctrlValue,
    max: ctrlMax,
    readonly: ctrlReadonly,
    size: ctrlSize,
    showValue: ctrlShowValue,
  }

  const interactiveCode = ctrlReadonly
    ? `<Rating
  value={${ctrlValue}}
  max={${ctrlMax}}
  readonly
  size="${ctrlSize}"
  showValue={${ctrlShowValue}}
/>`
    : `const [value, setValue] = useState(${ctrlValue})

<Rating
  value={value}
  max={${ctrlMax}}
  onChange={setValue}
  size="${ctrlSize}"
  showValue={${ctrlShowValue}}
/>`

  return (
    <DocsPage
      title="Rating"
      description="Star rating for reviews and readiness scores with optional value readout."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3017"
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
                    {ctrlReadonly ? (
                      <Rating
                        value={ctrlValue}
                        max={ctrlMax}
                        readonly
                        size={ctrlSize}
                        showValue={ctrlShowValue}
                      />
                    ) : (
                      <Rating
                        value={ctrlValue}
                        max={ctrlMax}
                        onChange={setCtrlValue}
                        size={ctrlSize}
                        showValue={ctrlShowValue}
                      />
                    )}
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'number',
                        key: 'value',
                        label: 'value',
                        default: 3.5,
                        min: 0,
                        max: 5,
                        step: 0.5,
                      },
                      {
                        type: 'number',
                        key: 'max',
                        label: 'max',
                        default: 5,
                        min: 1,
                        max: 10,
                        step: 1,
                      },
                      { type: 'boolean', key: 'readonly', label: 'readonly', default: false },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...ratingSizes],
                        default: 'md',
                      },
                      { type: 'boolean', key: 'showValue', label: 'showValue', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Readonly',
              background: 'grid',
              center: true,
              code: '<Rating value={4.3} max={5} readonly showValue />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Rating value={4.3} max={5} readonly showValue />
                </ComponentDemo>
              ),
            },
            {
              label: 'Controlled',
              background: 'grid',
              center: true,
              code: `const [value, setValue] = useState(2)

<Rating value={value} max={5} onChange={setValue} />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <RatingDemoInteractive />
                </ComponentDemo>
              ),
            },
            {
              label: 'All sizes',
              background: 'grid',
              center: true,
              code: `<Rating value={3} max={5} readonly size="sm" />
<Rating value={3} max={5} readonly size="md" />
<Rating value={3} max={5} readonly size="lg" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={rowStyle}>
                    <Rating value={3} max={5} readonly size="sm" />
                    <Rating value={3} max={5} readonly size="md" />
                    <Rating value={3} max={5} readonly size="lg" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Show value',
              background: 'grid',
              center: true,
              code: '<Rating value={3.5} max={5} readonly showValue />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Rating value={3.5} max={5} readonly showValue />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Rating } from './components/atoms/Rating/Rating'

<Rating value={score} max={5} onChange={setScore} showValue />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'number', default: '0', description: 'Current rating (supports halves visually via hover when interactive).', required: false },
            { name: 'max', type: 'number', default: '5', description: 'Number of stars.', required: false },
            { name: 'onChange', type: '(value: number) => void', description: 'Makes the component controlled when provided.', required: false },
            { name: 'readonly', type: 'boolean', default: 'false', description: 'Disables interaction.', required: false },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star scale.', required: false },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Shows numeric readout.', required: false },
            { name: 'className', type: 'string', description: 'Extra classes on the root.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use readonly mode for aggregate scores; use onChange when users set their own rating.',
              children: <Rating value={4.2} max={5} readonly showValue />,
            },
            {
              type: 'dont',
              description: "Don't nest ratings inside other focusable controls without managing focus order.",
              children: <Rating value={3} max={5} readonly size="sm" />,
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
              label: 'Interactive stars',
              description: 'Each star is a button with an explicit aria-label for its value.',
            },
            {
              type: 'aria',
              label: 'Readonly summary',
              description: 'Readonly mode announces the rounded star count via the group aria-label.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function RatingDemoInteractive() {
  const [value, setValue] = useState(2)
  return <Rating value={value} max={5} onChange={setValue} />
}
