import { useState } from 'react'
import { Field } from '../../../components/atoms/Field/Field'
import { DocIconSearch } from '../../helpers/docsIcons'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const statuses = ['default', 'hover', 'focus', 'error', 'disabled'] as const

function fieldCode(
  placeholder: string,
  status: (typeof statuses)[number],
  iconLeft: boolean,
  iconRight: boolean,
) {
  const lines = [`<Field`, `  placeholder="${placeholder.replace(/"/g, '\\"')}"`, `  status="${status}"`]
  if (iconLeft) lines.push('  iconLeft={<SearchIcon />}')
  if (iconRight) lines.push('  iconRight={<SearchIcon />}')
  lines.push('/>')
  return lines.join('\n')
}

export function FieldPage() {
  const [placeholder, setPlaceholder] = useState('Enter text...')
  const [status, setStatus] = useState<(typeof statuses)[number]>('default')
  const [iconLeft, setIconLeft] = useState(false)
  const [iconRight, setIconRight] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'placeholder') setPlaceholder(String(val))
    if (key === 'status') setStatus(val as (typeof statuses)[number])
    if (key === 'iconLeft') setIconLeft(Boolean(val))
    if (key === 'iconRight') setIconRight(Boolean(val))
  }

  const values = { placeholder, status, iconLeft, iconRight }
  const interactiveCode = fieldCode(placeholder, status, iconLeft, iconRight)

  return (
    <DocsPage
      title="Field"
      description="Single-line input shell with icons and documented interaction states for forms."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3003"
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
                    <Field
                      placeholder={placeholder}
                      status={status}
                      iconLeft={iconLeft ? <DocIconSearch /> : undefined}
                      iconRight={iconRight ? <DocIconSearch /> : undefined}
                      aria-label="Demo field"
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'Enter text...' },
                      {
                        type: 'select',
                        key: 'status',
                        label: 'status',
                        options: [...statuses],
                        default: 'default',
                      },
                      { type: 'boolean', key: 'iconLeft', label: 'iconLeft', default: false },
                      { type: 'boolean', key: 'iconRight', label: 'iconRight', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: fieldCode('Search…', 'default', false, false),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Field placeholder="Search…" status="default" aria-label="Default" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Hover',
              background: 'grid',
              center: true,
              code: fieldCode('Search…', 'hover', false, false),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Field placeholder="Search…" status="hover" aria-label="Hover" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Focus',
              background: 'grid',
              center: true,
              code: fieldCode('Search…', 'focus', false, false),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Field placeholder="Search…" status="focus" aria-label="Focus" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: true,
              code: fieldCode('Email', 'error', false, false),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Field placeholder="Email" status="error" aria-label="Error" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: fieldCode('Locked', 'disabled', false, false),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Field placeholder="Locked" status="disabled" aria-label="Disabled" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Field } from './components/atoms/Field/Field'

<Field placeholder="Name" value={v} onChange={setV} status="default" />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'placeholder', type: 'string', description: 'Placeholder text.', required: false },
            { name: 'value', type: 'string', description: 'Controlled value.', required: false },
            { name: 'onChange', type: '(value: string) => void', description: 'Value change callback.', required: false },
            {
              name: 'status',
              type: "'default' | 'hover' | 'focus' | 'error' | 'disabled'",
              default: "'default'",
              description: 'Visual and interaction state.',
              required: false,
            },
            { name: 'iconLeft', type: 'ReactNode', description: 'Leading icon slot.', required: false },
            { name: 'iconRight', type: 'ReactNode', description: 'Trailing icon slot.', required: false },
            { name: 'className', type: 'string', description: 'Class on the outer wrapper.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use hover and focus states so users get clear affordance.',
              children: <Field placeholder="Hover / focus demo" status="hover" aria-label="do" />,
            },
            {
              type: 'do',
              description: 'Pair with Label and error text at the molecule level when validating.',
              children: <Field placeholder="Validated field" status="error" aria-label="err" />,
            },
            {
              type: 'dont',
              description: "Don't remove borders entirely for a minimal look—contrast suffers.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>
                  Avoid borderless inputs on dark surfaces
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
              type: 'focus',
              label: 'Focus',
              description: 'Focus state shows a visible ring; use status="focus" in docs snapshots.',
            },
            {
              type: 'keyboard',
              label: 'Keyboard',
              description: 'Native text input is keyboard navigable and editable.',
            },
            {
              type: 'aria',
              label: 'Invalid',
              description: 'aria-invalid is set when status is error.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
