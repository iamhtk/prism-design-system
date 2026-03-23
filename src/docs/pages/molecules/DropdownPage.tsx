import { useState } from 'react'
import { Dropdown } from '../../../components/molecules/Dropdown/Dropdown'
import type { DropdownOption } from '../../../components/molecules/Dropdown/Dropdown'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sampleOptions: DropdownOption[] = [
  { label: 'Arizona pilot', value: 'az' },
  { label: 'California corridor', value: 'ca' },
  { label: 'New Mexico highlands', value: 'nm' },
  { label: 'Legacy program (disabled)', value: 'leg', disabled: true },
  { label: 'Utah basin', value: 'ut' },
  { label: 'Washington west slope', value: 'wa' },
]

export function DropdownPage() {
  const [placeholder, setPlaceholder] = useState('Choose a pilot region…')
  const [label, setLabel] = useState('')
  const [hint, setHint] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [value, setValue] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'placeholder') setPlaceholder(String(val))
    if (key === 'label') setLabel(String(val))
    if (key === 'hint') setHint(String(val))
    if (key === 'disabled') setDisabled(Boolean(val))
    if (key === 'error') setError(String(val))
  }

  const values = { placeholder, label, hint, disabled, error }
  const labelLine = label.trim() ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''
  const hintLine = hint.trim() ? `\n  hint="${hint.replace(/"/g, '\\"')}"` : ''
  const errLine = error.trim() ? `\n  error="${error.replace(/"/g, '\\"')}"` : ''
  const disLine = disabled ? '\n  disabled' : ''

  const interactiveCode = `<Dropdown
  options={options}
  value={value}
  onChange={setValue}
  placeholder="${placeholder.replace(/"/g, '\\"')}"${labelLine}${hintLine}${errLine}${disLine}
/>`

  return (
    <DocsPage
      title="Dropdown"
      description="Custom listbox for choosing one option from a longer enumerated set."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4106"
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
                    <Dropdown
                      options={sampleOptions}
                      value={value}
                      onChange={setValue}
                      placeholder={placeholder}
                      label={label.trim() || undefined}
                      hint={hint.trim() || undefined}
                      error={error.trim() || undefined}
                      disabled={disabled}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'Choose a pilot region…' },
                      { type: 'text', key: 'label', label: 'label', default: '' },
                      { type: 'text', key: 'hint', label: 'hint', default: '' },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                      { type: 'text', key: 'error', label: 'error', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Placeholder',
              background: 'grid',
              center: true,
              code: '<Dropdown options={opts} placeholder="Select county…" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Dropdown options={sampleOptions} placeholder="Select county…" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Selected',
              background: 'grid',
              center: true,
              code: '<Dropdown options={opts} value="ca" onChange={() => {}} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Dropdown options={sampleOptions} value="ca" onChange={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled option',
              background: 'grid',
              center: true,
              code: '<Dropdown options={withDisabled} placeholder="Pick an active site" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Dropdown options={sampleOptions} placeholder="Pick an active site" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Label + hint',
              background: 'grid',
              center: true,
              code: `<Dropdown
  label="Reporting unit"
  hint="Determines which scorecard template loads."
  options={opts}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Dropdown
                    label="Reporting unit"
                    hint="Determines which scorecard template loads."
                    options={sampleOptions}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: true,
              code: '<Dropdown label="Region" options={opts} error="Selection required before export." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Dropdown
                    label="Region"
                    options={sampleOptions}
                    error="Selection required before export."
                  />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Dropdown } from './components/molecules/Dropdown/Dropdown'

<Dropdown options={regions} value={id} onChange={setId} label="County" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'options', type: 'DropdownOption[]', description: 'Selectable rows with label/value.', required: true },
            { name: 'value', type: 'string', description: 'Controlled value.', required: false },
            { name: 'onChange', type: '(value: string) => void', description: 'Emits selected value.', required: false },
            { name: 'placeholder', type: 'string', default: "'Select…'", description: 'Copy when nothing selected.', required: false },
            { name: 'label', type: 'string', description: 'Optional field label.', required: false },
            { name: 'hint', type: 'string', description: 'Helper text under trigger.', required: false },
            { name: 'error', type: 'string', description: 'Error text and styling.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Locks the trigger.', required: false },
            { name: 'width', type: 'string', description: 'Optional CSS width.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use when more than a handful of discrete values exist.',
              children: <Dropdown options={sampleOptions} label="Jurisdiction" />,
            },
            {
              type: 'dont',
              description: "Don't use dropdowns for simple binary choices — prefer Switch or RadioButton.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Binary decisions need fewer affordances.</span>
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
              label: 'Listbox',
              description: 'Trigger toggles aria-expanded; options use role option with aria-selected.',
            },
            {
              type: 'aria',
              label: 'Descriptions',
              description: 'Hints and errors are linked to the trigger with aria-describedby.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
