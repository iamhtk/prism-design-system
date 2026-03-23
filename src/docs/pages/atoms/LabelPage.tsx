import { useState } from 'react'
import { Label } from '../../../components/atoms/Label/Label'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function LabelPage() {
  const [text, setText] = useState('Email address')
  const [required, setRequired] = useState(false)
  const [hint, setHint] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'text') setText(String(val))
    if (key === 'required') setRequired(Boolean(val))
    if (key === 'hint') setHint(Boolean(val))
  }

  const values = { text, required, hint }

  const interactiveCode = `<Label
  htmlFor="field-id"
  text="${text.replace(/"/g, '\\"')}"
  required={${required}}
  hint={${hint}}
/>`

  return (
    <DocsPage
      title="Label"
      description="Accessible text for form fields with optional required marker and help affordance."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3002"
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
                    <Label htmlFor="label-interactive" text={text} required={required} hint={hint} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'text', label: 'text', default: 'Email address' },
                      { type: 'boolean', key: 'required', label: 'required', default: false },
                      { type: 'boolean', key: 'hint', label: 'hint', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<Label htmlFor="email" text="Work email" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Label htmlFor="email" text="Work email" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Required',
              background: 'grid',
              center: true,
              code: '<Label htmlFor="password" text="Password" required />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Label htmlFor="password" text="Password" required />
                </ComponentDemo>
              ),
            },
            {
              label: 'With Hint',
              background: 'grid',
              center: true,
              code: '<Label htmlFor="org" text="Organization" hint />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Label htmlFor="org" text="Organization" hint />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Label } from './components/atoms/Label/Label'

<Label htmlFor="email" text="Email" required hint />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'text', type: 'string', description: 'Visible label copy.', required: true },
            { name: 'required', type: 'boolean', default: 'false', description: 'Shows a red asterisk before the text.', required: false },
            { name: 'hint', type: 'boolean', default: 'false', description: 'Shows a help marker after the text.', required: false },
            { name: 'htmlFor', type: 'string', description: 'Associates the label with a control id.', required: false },
            { name: 'className', type: 'string', description: 'Extra class on the label element.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Always pair a label with its form field via htmlFor.',
              children: <Label htmlFor="pilot" text="Pilot region" />,
            },
            {
              type: 'do',
              description: 'Use the required marker only when the field is truly required.',
              children: <Label htmlFor="terms" text="Accept terms" required />,
            },
            {
              type: 'dont',
              description: "Don't use vague placeholder-style text like “Input 1”.",
              children: <Label htmlFor="a" text="Input 1" />,
            },
            {
              type: 'dont',
              description: "Don't omit labels to save space—use hint for secondary guidance instead.",
              children: <span style={{ color: 'var(--text-default-caption)' }}>(Unlabeled field — avoid)</span>,
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
              label: 'Screen readers',
              description: 'Label text is announced when focus moves to the associated control.',
            },
            {
              type: 'aria',
              label: 'Association',
              description: 'Use htmlFor matching the input id so the relationship is exposed to AT.',
            },
            {
              type: 'focus',
              label: 'Focus',
              description: 'Focus remains on the control; the label is referenced programmatically.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
