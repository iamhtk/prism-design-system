import { useState } from 'react'
import { Checkbox } from '../../../components/molecules/Checkbox/Checkbox'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function CheckboxPage() {
  const [label, setLabel] = useState('Email me scorecard updates')
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [hint, setHint] = useState('')
  const [error, setError] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setLabel(String(val))
    if (key === 'checked') setChecked(Boolean(val))
    if (key === 'disabled') setDisabled(Boolean(val))
    if (key === 'hint') setHint(String(val))
    if (key === 'error') setError(String(val))
  }

  const values = { label, checked, disabled, hint, error }
  const hintLine = hint.trim() ? `\n  hint="${hint.replace(/"/g, '\\"')}"` : ''
  const errLine = error.trim() ? `\n  error="${error.replace(/"/g, '\\"')}"` : ''
  const disLine = disabled ? '\n  disabled' : ''

  const interactiveCode = `<Checkbox
  label="${label.replace(/"/g, '\\"')}"
  checked={${checked}}
  onChange={setChecked}${disLine}${hintLine}${errLine}
/>`

  return (
    <DocsPage
      title="Checkbox"
      description="Binary choice with optional hint or error messaging for form agreements and feature toggles."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4102"
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
                    <Checkbox
                      label={label}
                      checked={checked}
                      onChange={setChecked}
                      disabled={disabled}
                      hint={hint.trim() || undefined}
                      error={error.trim() || undefined}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Email me scorecard updates' },
                      { type: 'boolean', key: 'checked', label: 'checked', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                      { type: 'text', key: 'hint', label: 'hint', default: '' },
                      { type: 'text', key: 'error', label: 'error', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Unchecked',
              background: 'grid',
              center: true,
              code: '<Checkbox label="I agree to the data use policy" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Checkbox label="I agree to the data use policy" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Checked',
              background: 'grid',
              center: true,
              code: '<Checkbox label="Share anonymized metrics" defaultChecked />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Checkbox label="Share anonymized metrics" defaultChecked />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled off',
              background: 'grid',
              center: true,
              code: '<Checkbox label="Unavailable option" disabled />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Checkbox label="Unavailable option" disabled />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled on',
              background: 'grid',
              center: true,
              code: '<Checkbox label="Locked in by policy" disabled defaultChecked />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Checkbox label="Locked in by policy" disabled defaultChecked />
                </ComponentDemo>
              ),
            },
            {
              label: 'With hint',
              background: 'grid',
              center: true,
              code: '<Checkbox label="SMS alerts" hint="Rates may apply depending on carrier." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Checkbox label="SMS alerts" hint="Rates may apply depending on carrier." />
                </ComponentDemo>
              ),
            },
            {
              label: 'With error',
              background: 'grid',
              center: true,
              code: '<Checkbox label="Confirm export" error="You must acknowledge before continuing." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Checkbox label="Confirm export" error="You must acknowledge before continuing." />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Checkbox } from './components/molecules/Checkbox/Checkbox'

<Checkbox label="Join pilot newsletter" checked={on} onChange={setOn} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Visible label text.', required: true },
            { name: 'checked', type: 'boolean', description: 'Controlled checked state.', required: false },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Toggle handler.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.', required: false },
            { name: 'hint', type: 'string', description: 'Supporting text below the control.', required: false },
            { name: 'error', type: 'string', description: 'Error text; hides hint when set.', required: false },
            { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state when uncontrolled.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use when several independent options can be selected together.',
              children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>
                  <Checkbox label="Fuel treatments" defaultChecked />
                  <Checkbox label="Workforce grants" />
                </div>
              ),
            },
            {
              type: 'dont',
              description: "Don't use checkboxes when only one option in a set may be active — use radio buttons.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Use RadioButton with shared name</span>
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
              label: 'Toggle',
              description: 'Space toggles the native checkbox when focus is on the control.',
            },
            {
              type: 'aria',
              label: 'State',
              description: 'Checked state is exposed to assistive tech via the native input.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
