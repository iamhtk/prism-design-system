import { useState } from 'react'
import { RadioButton } from '../../../components/molecules/RadioButton/RadioButton'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const groupName = 'pilot-region'

export function RadioButtonPage() {
  const [labelPrefix, setLabelPrefix] = useState('Pilot region')
  const [selected, setSelected] = useState('sw')
  const [disabledMid, setDisabledMid] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'labelPrefix') setLabelPrefix(String(val))
    if (key === 'disabledMid') setDisabledMid(Boolean(val))
  }

  const values = { labelPrefix, disabledMid }

  const interactiveCode = `const [value, setValue] = useState('sw')

<RadioButton name="${groupName}" label="${labelPrefix} — Southwest" value="sw" checked={value === 'sw'} onChange={setValue} />
<RadioButton name="${groupName}" label="${labelPrefix} — Pacific" value="pac" checked={value === 'pac'} onChange={setValue} disabled={${disabledMid}} />
<RadioButton name="${groupName}" label="${labelPrefix} — Rockies" value="rock" checked={value === 'rock'} onChange={setValue} />`

  const col = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--space-400)', alignItems: 'flex-start' }

  return (
    <DocsPage
      title="RadioButton"
      description="Single selection within a named group for mutually exclusive choices."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4103"
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
                    <div style={col}>
                      <RadioButton
                        name={groupName}
                        label={`${labelPrefix} — Southwest`}
                        value="sw"
                        checked={selected === 'sw'}
                        onChange={setSelected}
                      />
                      <RadioButton
                        name={groupName}
                        label={`${labelPrefix} — Pacific`}
                        value="pac"
                        checked={selected === 'pac'}
                        onChange={setSelected}
                        disabled={disabledMid}
                      />
                      <RadioButton
                        name={groupName}
                        label={`${labelPrefix} — Rockies`}
                        value="rock"
                        checked={selected === 'rock'}
                        onChange={setSelected}
                      />
                    </div>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'labelPrefix', label: 'label prefix', default: 'Pilot region' },
                      { type: 'boolean', key: 'disabledMid', label: 'disable middle option', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Group',
              background: 'grid',
              center: true,
              code: `<RadioButton name="tier" label="Starter" value="s" checked={v === 's'} onChange={setV} />
<RadioButton name="tier" label="Growth" value="g" checked={v === 'g'} onChange={setV} />
<RadioButton name="tier" label="Enterprise" value="e" checked={v === 'e'} onChange={setV} />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <RadioGroupDemo />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled option',
              background: 'grid',
              center: true,
              code: `<RadioButton name="plan" label="Available" value="a" defaultChecked />
<RadioButton name="plan" label="Sunset" value="b" disabled />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={col}>
                    <RadioButton name="plan-doc" label="Standard" value="a" defaultChecked />
                    <RadioButton name="plan-doc" label="Legacy (retired)" value="b" disabled />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With hint',
              background: 'grid',
              center: true,
              code: '<RadioButton name="r" label="Public data" value="p" hint="Visible on the open scorecard." defaultChecked />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <RadioButton
                    name="hint-doc"
                    label="Public data"
                    value="p"
                    hint="Visible on the open scorecard."
                    defaultChecked
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
          code={`import { RadioButton } from './components/molecules/RadioButton/RadioButton'

<RadioButton name="fuel" label="Mechanical" value="m" checked={v === 'm'} onChange={setV} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Option label.', required: true },
            { name: 'value', type: 'string', description: 'Value emitted on change.', required: true },
            { name: 'checked', type: 'boolean', description: 'Controlled selected state.', required: false },
            { name: 'onChange', type: '(value: string) => void', description: 'Called when this option becomes selected.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the option.', required: false },
            { name: 'hint', type: 'string', description: 'Supporting copy under the option.', required: false },
            { name: 'name', type: 'string', description: 'Groups radios in the DOM.', required: false },
            { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial selection when uncontrolled.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Share the same name across every option in the set so only one can be active.',
              children: <RadioGroupDemo />,
            },
            {
              type: 'dont',
              description: "Don't use radio lists longer than ~6 options — prefer Dropdown.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Long enumerations belong in a select.</span>
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
              label: 'Group navigation',
              description: 'Arrow keys move between radios with the same name in most browsers.',
            },
            {
              type: 'aria',
              label: 'Selection',
              description: 'Native radio inputs expose the selected state to assistive technologies.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function RadioGroupDemo() {
  const [v, setV] = useState('g')
  const n = 'tier-demo'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-400)', alignItems: 'flex-start' }}>
      <RadioButton name={n} label="Starter" value="s" checked={v === 's'} onChange={setV} />
      <RadioButton name={n} label="Growth" value="g" checked={v === 'g'} onChange={setV} />
      <RadioButton name={n} label="Enterprise" value="e" checked={v === 'e'} onChange={setV} />
    </div>
  )
}
