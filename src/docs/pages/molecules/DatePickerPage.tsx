import { useState } from 'react'
import { DatePicker } from '../../../components/molecules/DatePicker/DatePicker'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function DatePickerPage() {
  const [label, setLabel] = useState('Treatment date')
  const [placeholder, setPlaceholder] = useState('Pick a day')
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState<Date | undefined>(undefined)

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setLabel(String(val))
    if (key === 'placeholder') setPlaceholder(String(val))
    if (key === 'disabled') setDisabled(Boolean(val))
  }

  const values = { label, placeholder, disabled }
  const lab = label.trim() ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''
  const ph = `\n  placeholder="${placeholder.replace(/"/g, '\\"')}"`
  const dis = disabled ? '\n  disabled' : ''

  const interactiveCode = `<DatePicker${lab}${ph}${dis}
  value={value}
  onChange={setValue}
/>`

  const minDate = new Date(2025, 0, 1)
  const maxDate = new Date(2025, 11, 31)

  return (
    <DocsPage
      title="DatePicker"
      description="Calendar popover anchored to a read-only field for choosing a single day."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4122"
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
                    <DatePicker
                      label={label.trim() || undefined}
                      placeholder={placeholder}
                      disabled={disabled}
                      value={value}
                      onChange={setValue}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Treatment date' },
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'Pick a day' },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Empty',
              background: 'grid',
              center: true,
              code: '<DatePicker label="Start date" placeholder="Select date" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <DatePicker label="Start date" placeholder="Select date" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Selected',
              background: 'grid',
              center: true,
              code: '<DatePicker label="Briefing" value={new Date(2025, 5, 15)} onChange={() => {}} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <DatePicker label="Briefing" value={new Date(2025, 5, 15)} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Min / max',
              background: 'grid',
              center: true,
              code: `<DatePicker
  label="FY25 only"
  minDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <DatePicker label="FY25 only" minDate={minDate} maxDate={maxDate} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: '<DatePicker label="Locked" disabled value={new Date()} onChange={() => {}} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <DatePicker label="Locked" disabled value={new Date()} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Label + hint',
              background: 'grid',
              center: true,
              code: '<DatePicker label="Ignition window" hint="Used for risk scoring only." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <DatePicker label="Ignition window" hint="Used for risk scoring only." />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { DatePicker } from './components/molecules/DatePicker/DatePicker'

<DatePicker label="Due date" value={d} onChange={setD} minDate={start} maxDate={end} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'Date', description: 'Controlled date.', required: false },
            { name: 'onChange', type: '(date: Date) => void', description: 'Emits start-of-day selection.', required: false },
            { name: 'placeholder', type: 'string', default: "'Select date'", description: 'Empty state copy.', required: false },
            { name: 'label', type: 'string', description: 'Field label.', required: false },
            { name: 'hint', type: 'string', description: 'Helper under the field.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Locks the control.', required: false },
            { name: 'minDate', type: 'Date', description: 'Earliest selectable day.', required: false },
            { name: 'maxDate', type: 'Date', description: 'Latest selectable day.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Document timezone assumptions in hint text when scheduling matters.',
              children: <DatePicker label="Crew shift" hint="Times shown in pilot local time." />,
            },
            {
              type: 'dont',
              description: "Don't use for date ranges — compose two pickers or a dedicated range control.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Single-day selection only.</span>
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
              label: 'Grid',
              description: 'Day cells are buttons; month chevrons are labeled Previous/Next month.',
            },
            {
              type: 'aria',
              label: 'Dialog',
              description: 'Popover exposes role dialog with aria-label Choose date.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
