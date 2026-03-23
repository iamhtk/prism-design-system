import { useState } from 'react'
import { Input } from '../../../components/molecules/Input/Input'
import { DocIconEye, DocIconMail } from '../../helpers/docsIcons'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const inputTypes = ['text', 'email', 'password'] as const

export function InputPage() {
  const [ctrlLabel, setCtrlLabel] = useState('Field label')
  const [ctrlPlaceholder, setCtrlPlaceholder] = useState('Type here…')
  const [ctrlType, setCtrlType] = useState<(typeof inputTypes)[number]>('text')
  const [ctrlRequired, setCtrlRequired] = useState(false)
  const [ctrlDisabled, setCtrlDisabled] = useState(false)
  const [ctrlHint, setCtrlHint] = useState('')
  const [ctrlError, setCtrlError] = useState('')
  const [ctrlValue, setCtrlValue] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setCtrlLabel(String(val))
    if (key === 'placeholder') setCtrlPlaceholder(String(val))
    if (key === 'type') setCtrlType(val as (typeof inputTypes)[number])
    if (key === 'required') setCtrlRequired(Boolean(val))
    if (key === 'disabled') setCtrlDisabled(Boolean(val))
    if (key === 'hint') setCtrlHint(String(val))
    if (key === 'error') setCtrlError(String(val))
  }

  const values = {
    label: ctrlLabel,
    placeholder: ctrlPlaceholder,
    type: ctrlType,
    required: ctrlRequired,
    disabled: ctrlDisabled,
    hint: ctrlHint,
    error: ctrlError,
  }

  const hintLine = ctrlHint.trim() ? `\n  hint="${ctrlHint.replace(/"/g, '\\"')}"` : ''
  const errLine = ctrlError.trim() ? `\n  error="${ctrlError.replace(/"/g, '\\"')}"` : ''
  const reqLine = ctrlRequired ? '\n  required' : ''
  const disLine = ctrlDisabled ? '\n  status="disabled"' : ''
  const iconLeftLine = ctrlType === 'email' ? '\n  iconLeft={<DocIconMail />}' : ''
  const iconRightLine = ctrlType === 'password' ? '\n  iconRight={<DocIconEye />}' : ''

  const interactiveCode = `<Input
  label="${ctrlLabel.replace(/"/g, '\\"')}"
  placeholder="${ctrlPlaceholder.replace(/"/g, '\\"')}"
  type="${ctrlType}"${reqLine}${disLine}${hintLine}${errLine}${iconLeftLine}${iconRightLine}
  value={value}
  onChange={setValue}
/>`

  return (
    <DocsPage
      title="Input"
      description="Label, field, and hint or error messaging composed for forms and modals."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4101"
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
                    <Input
                      label={ctrlLabel}
                      placeholder={ctrlPlaceholder}
                      type={ctrlType}
                      required={ctrlRequired}
                      status={ctrlDisabled ? 'disabled' : 'default'}
                      hint={ctrlHint.trim() || undefined}
                      error={ctrlError.trim() || undefined}
                      value={ctrlValue}
                      onChange={setCtrlValue}
                      iconLeft={ctrlType === 'email' ? <DocIconMail /> : undefined}
                      iconRight={ctrlType === 'password' ? <DocIconEye /> : undefined}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Field label' },
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'Type here…' },
                      {
                        type: 'select',
                        key: 'type',
                        label: 'type',
                        options: [...inputTypes],
                        default: 'text',
                      },
                      { type: 'boolean', key: 'required', label: 'required', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                      { type: 'text', key: 'hint', label: 'hint', default: '' },
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
              code: `<Input
  label="Full name"
  placeholder="Jane Doe"
  hint="Use the name on your pilot agreement."
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Input
                    label="Full name"
                    placeholder="Jane Doe"
                    hint="Use the name on your pilot agreement."
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Email',
              background: 'grid',
              center: true,
              code: `<Input
  label="Work email"
  type="email"
  placeholder="you@agency.gov"
  iconLeft={<DocIconMail />}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Input
                    label="Work email"
                    type="email"
                    placeholder="you@agency.gov"
                    iconLeft={<DocIconMail />}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Password',
              background: 'grid',
              center: true,
              code: `<Input
  label="Password"
  type="password"
  required
  iconRight={<DocIconEye />}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Input label="Password" type="password" required iconRight={<DocIconEye />} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: true,
              code: '<Input label="Email" error="Please enter a valid email address" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Input label="Email" error="Please enter a valid email address" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: '<Input label="Username" status="disabled" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Input label="Username" status="disabled" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Input } from './components/molecules/Input/Input'

<Input label="Email" type="email" value={v} onChange={setV} required hint="We never share this." />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Forwarded to Label.', required: true },
            { name: 'placeholder', type: 'string', description: 'Input placeholder.', required: false },
            { name: 'value', type: 'string', description: 'Controlled value.', required: false },
            { name: 'onChange', type: '(value: string) => void', description: 'Value updates.', required: false },
            { name: 'hint', type: 'string', description: 'Hint row (hidden when error).', required: false },
            { name: 'error', type: 'string', description: 'Error message; forces error styling.', required: false },
            { name: 'required', type: 'boolean', default: 'false', description: 'Required marker on label.', required: false },
            { name: 'showHintIcon', type: 'boolean', default: 'false', description: 'Help icon on label.', required: false },
            { name: 'iconLeft', type: 'ReactNode', description: 'Leading icon in field.', required: false },
            { name: 'iconRight', type: 'ReactNode', description: 'Trailing icon in field.', required: false },
            { name: 'type', type: "'text' | 'email' | 'password'", default: "'text'", description: 'Native input type.', required: false },
            {
              name: 'status',
              type: "'default' | 'hover' | 'focus' | 'error' | 'disabled'",
              default: "'default'",
              description: 'Visual state for Field.',
              required: false,
            },
            { name: 'width', type: 'string', description: 'CSS width on root.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Always show a visible label; it is wired to the control with htmlFor.',
              children: <Input label="County" placeholder="Select county" />,
            },
            {
              type: 'do',
              description: 'Show validation errors inline directly under the field.',
              children: <Input label="Email" error="That domain is not allowlisted yet." />,
            },
            {
              type: 'dont',
              description: "Don't use placeholder copy as the only label.",
              children: <Input label="" placeholder="Email address" />,
            },
            {
              type: 'dont',
              description: "Don't surface errors before the user has finished or submitted the field.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>
                  Validate on blur or submit, not on first keystroke.
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
              type: 'aria',
              label: 'Label association',
              description: 'Label htmlFor matches the Field input id so screen readers announce the name.',
            },
            {
              type: 'aria',
              label: 'Descriptions',
              description: 'Hint and error rows are referenced with aria-describedby on the input.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
