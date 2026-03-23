import { useState } from 'react'
import { TextArea } from '../../../components/molecules/TextArea/TextArea'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function TextAreaPage() {
  const [label, setLabel] = useState('Pilot notes')
  const [placeholder, setPlaceholder] = useState('Describe conditions on the ground…')
  const [rows, setRows] = useState(4)
  const [maxLength, setMaxLength] = useState(200)
  const [showCount, setShowCount] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [required, setRequired] = useState(false)
  const [error, setError] = useState('')
  const [value, setValue] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setLabel(String(val))
    if (key === 'placeholder') setPlaceholder(String(val))
    if (key === 'rows') setRows(Number(val))
    if (key === 'maxLength') setMaxLength(Number(val))
    if (key === 'showCount') setShowCount(Boolean(val))
    if (key === 'disabled') setDisabled(Boolean(val))
    if (key === 'required') setRequired(Boolean(val))
    if (key === 'error') setError(String(val))
  }

  const values = {
    label,
    placeholder,
    rows,
    maxLength,
    showCount,
    disabled,
    required,
    error,
  }

  const errLine = error.trim() ? `\n  error="${error.replace(/"/g, '\\"')}"` : ''
  const disAttr = disabled ? '\n  disabled' : ''
  const reqAttr = required ? '\n  required' : ''
  const countLine = showCount ? `\n  showCount\n  maxLength={${maxLength}}` : maxLength ? `\n  maxLength={${maxLength}}` : ''

  const interactiveCode = `<TextArea
  label="${label.replace(/"/g, '\\"')}"
  placeholder="${placeholder.replace(/"/g, '\\"')}"
  rows={${rows}}${countLine}${reqAttr}${disAttr}${errLine}
  value={value}
  onChange={setValue}
/>`

  return (
    <DocsPage
      title="TextArea"
      description="Multi-line text entry with optional character count and validation messaging."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4105"
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
                    <TextArea
                      label={label}
                      placeholder={placeholder}
                      rows={rows}
                      maxLength={maxLength > 0 ? maxLength : undefined}
                      showCount={showCount && maxLength > 0}
                      disabled={disabled}
                      required={required}
                      error={error.trim() || undefined}
                      value={value}
                      onChange={setValue}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Pilot notes' },
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'Describe conditions…' },
                      { type: 'number', key: 'rows', label: 'rows', default: 4, min: 2, max: 12, step: 1 },
                      { type: 'number', key: 'maxLength', label: 'maxLength', default: 200, min: 0, max: 2000, step: 10 },
                      { type: 'boolean', key: 'showCount', label: 'showCount', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                      { type: 'boolean', key: 'required', label: 'required', default: false },
                      { type: 'text', key: 'error', label: 'error', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<TextArea label="Summary" placeholder="What changed this sprint?" rows={3} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TextArea label="Summary" placeholder="What changed this sprint?" rows={3} />
                </ComponentDemo>
              ),
            },
            {
              label: 'With count',
              background: 'grid',
              center: true,
              code: '<TextArea label="Public comment" maxLength={200} showCount rows={4} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TextArea label="Public comment" maxLength={200} showCount rows={4} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: true,
              code: '<TextArea label="Justification" error="Please add at least two sentences." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TextArea label="Justification" error="Please add at least two sentences." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: '<TextArea label="Locked narrative" disabled defaultValue="Approved copy." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TextArea label="Locked narrative" disabled defaultValue="Approved copy." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Required',
              background: 'grid',
              center: true,
              code: '<TextArea label="Safety briefing" required placeholder="List hazards crews should know." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TextArea label="Safety briefing" required placeholder="List hazards crews should know." />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { TextArea } from './components/molecules/TextArea/TextArea'

<TextArea label="Notes" maxLength={500} showCount value={v} onChange={setV} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Field label.', required: true },
            { name: 'placeholder', type: 'string', description: 'Placeholder text.', required: false },
            { name: 'value', type: 'string', description: 'Controlled value.', required: false },
            { name: 'onChange', type: '(value: string) => void', description: 'Change handler.', required: false },
            { name: 'rows', type: 'number', default: '4', description: 'Visible row count.', required: false },
            { name: 'maxLength', type: 'number', description: 'Native max length.', required: false },
            { name: 'showCount', type: 'boolean', default: 'false', description: 'Shows current/max count.', required: false },
            { name: 'hint', type: 'string', description: 'Supporting hint.', required: false },
            { name: 'error', type: 'string', description: 'Error message.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing.', required: false },
            { name: 'required', type: 'boolean', default: 'false', description: 'Required marker.', required: false },
            {
              name: 'status',
              type: "'default' | 'hover' | 'focus' | 'error' | 'disabled'",
              default: "'default'",
              description: 'Forced visual state for docs.',
              required: false,
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Set maxLength when comments feed downstream systems with hard limits.',
              children: <TextArea label="Tweet-length update" maxLength={280} showCount rows={3} />,
            },
            {
              type: 'dont',
              description: "Don't use a textarea for single-line values like zip codes — use Input.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Reserve TextArea for paragraphs.</span>
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
              label: 'Character count',
              description: 'When showCount is on, the count updates with aria-live polite.',
            },
            {
              type: 'aria',
              label: 'Errors',
              description: 'Errors set aria-invalid and aria-describedby on the textarea.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
