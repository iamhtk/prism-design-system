import { useState } from 'react'
import { Switch } from '../../../components/molecules/Switch/Switch'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function SwitchPage() {
  const [label, setLabel] = useState('Enable treatment alerts')
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [hint, setHint] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setLabel(String(val))
    if (key === 'checked') setChecked(Boolean(val))
    if (key === 'disabled') setDisabled(Boolean(val))
    if (key === 'hint') setHint(String(val))
  }

  const values = { label, checked, disabled, hint }
  const hintLine = hint.trim() ? `\n  hint="${hint.replace(/"/g, '\\"')}"` : ''
  const disLine = disabled ? '\n  disabled' : ''

  const interactiveCode = `<Switch
  label="${label.replace(/"/g, '\\"')}"
  checked={${checked}}
  onChange={setChecked}${disLine}${hintLine}
/>`

  return (
    <DocsPage
      title="Switch"
      description="Immediate on/off control for settings that apply as soon as they are toggled."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4104"
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
                    <Switch
                      label={label}
                      checked={checked}
                      onChange={setChecked}
                      disabled={disabled}
                      hint={hint.trim() || undefined}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Enable treatment alerts' },
                      { type: 'boolean', key: 'checked', label: 'checked', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                      { type: 'text', key: 'hint', label: 'hint', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Off',
              background: 'grid',
              center: true,
              code: '<Switch label="Weekly digest" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Switch label="Weekly digest" />
                </ComponentDemo>
              ),
            },
            {
              label: 'On',
              background: 'grid',
              center: true,
              code: '<Switch label="Auto-save drafts" defaultChecked />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Switch label="Auto-save drafts" defaultChecked />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled off',
              background: 'grid',
              center: true,
              code: '<Switch label="Locked by admin" disabled />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Switch label="Locked by admin" disabled />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled on',
              background: 'grid',
              center: true,
              code: '<Switch label="Compliance logging" disabled defaultChecked />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Switch label="Compliance logging" disabled defaultChecked />
                </ComponentDemo>
              ),
            },
            {
              label: 'With hint',
              background: 'grid',
              center: true,
              code: '<Switch label="Share telemetry" hint="Helps CWPC improve map accuracy." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Switch label="Share telemetry" hint="Helps CWPC improve map accuracy." />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Switch } from './components/molecules/Switch/Switch'

<Switch label="Dark mode preview" checked={on} onChange={setOn} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Visible label.', required: true },
            { name: 'checked', type: 'boolean', description: 'Controlled on state.', required: false },
            { name: 'onChange', type: '(checked: boolean) => void', description: 'Toggle handler.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch.', required: false },
            { name: 'hint', type: 'string', description: 'Supporting text.', required: false },
            { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial on state when uncontrolled.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use when the effect should feel immediate, like feature flags or notification streams.',
              children: <Switch label="Live incident feed" defaultChecked />,
            },
            {
              type: 'dont',
              description: "Don't use switches for values that only apply after an explicit Save — use Checkbox instead.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Pair deferred changes with submit buttons.</span>
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
              description: 'Space toggles the switch; role="switch" exposes on/off semantics.',
            },
            {
              type: 'aria',
              label: 'State',
              description: 'aria-checked mirrors the visual thumb position.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
