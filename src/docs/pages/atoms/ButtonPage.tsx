import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { DocIconChevron, DocIconSearch } from '../../helpers/docsIcons'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const btnTypes = ['default', 'outlined', 'transparent'] as const
const schemes = ['primary', 'success', 'information'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-400)', alignItems: 'center' }

export function ButtonPage() {
  const [ctrlLabel, setCtrlLabel] = useState('Button Text')
  const [ctrlType, setCtrlType] = useState<(typeof btnTypes)[number]>('default')
  const [ctrlColorScheme, setCtrlColorScheme] = useState<(typeof schemes)[number]>('primary')
  const [ctrlDisabled, setCtrlDisabled] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'label') setCtrlLabel(String(val))
    if (key === 'type') setCtrlType(val as (typeof btnTypes)[number])
    if (key === 'colorScheme') setCtrlColorScheme(val as (typeof schemes)[number])
    if (key === 'disabled') setCtrlDisabled(Boolean(val))
  }

  const interactiveValues = {
    label: ctrlLabel,
    type: ctrlType,
    colorScheme: ctrlColorScheme,
    disabled: ctrlDisabled,
  }

  const interactiveCode = `<Button
  label="${ctrlLabel.replace(/"/g, '\\"')}"
  type="${ctrlType}"
  colorScheme="${ctrlColorScheme}"
  disabled={${ctrlDisabled}}
/>`

  return (
    <DocsPage
      title="Button"
      description="Primary action control for forms and marketing surfaces. Use one clear primary action per section."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3001"
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
                    <Button
                      label={ctrlLabel}
                      type={ctrlType}
                      colorScheme={ctrlColorScheme}
                      disabled={ctrlDisabled}
                    />
                  </ComponentDemo>
                  <Controls
                    values={interactiveValues}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Button Text' },
                      {
                        type: 'select',
                        key: 'type',
                        label: 'type',
                        options: [...btnTypes],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'colorScheme',
                        label: 'colorScheme',
                        options: [...schemes],
                        default: 'primary',
                      },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<Button type="default" label="Click me" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Button type="default" label="Click me" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Outlined',
              background: 'grid',
              center: true,
              code: '<Button type="outlined" label="Click me" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Button type="outlined" label="Click me" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Transparent',
              background: 'grid',
              center: true,
              code: '<Button type="transparent" label="Click me" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Button type="transparent" label="Click me" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Color Schemes',
              background: 'grid',
              center: true,
              code: `<div style={{ display: 'flex', gap: 'var(--space-400)', flexWrap: 'wrap' }}>
  <Button colorScheme="primary" label="Primary" type="default" />
  <Button colorScheme="success" label="Success" type="default" />
  <Button colorScheme="information" label="Information" type="default" />
</div>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Button colorScheme="primary" label="Primary" type="default" />
                    <Button colorScheme="success" label="Success" type="default" />
                    <Button colorScheme="information" label="Information" type="default" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'States',
              background: 'grid',
              center: true,
              code: '<Button label="Disabled" type="default" disabled />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Button label="Disabled" type="default" disabled />
                </ComponentDemo>
              ),
            },
            {
              label: 'With Icons',
              background: 'grid',
              center: true,
              code: `<Button
  label="Search"
  type="default"
  iconLeft={<SearchIcon />}
  iconRight={<ChevronIcon />}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Button
                    label="Search"
                    type="default"
                    iconLeft={<DocIconSearch />}
                    iconRight={<DocIconChevron />}
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
          code={`import { Button } from './components/atoms/Button/Button'

<Button label="Submit" type="default" onClick={() => {}} />
<Button label="Cancel" type="outlined" colorScheme="information" />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Visible button text.', required: false },
            {
              name: 'type',
              type: "'default' | 'outlined' | 'transparent'",
              default: "'default'",
              description: 'Visual style variant.',
              required: false,
            },
            {
              name: 'status',
              type: "'default' | 'hover' | 'pressed' | 'focus' | 'disabled'",
              default: "'default'",
              description: 'Forced presentation state for docs and snapshots.',
              required: false,
            },
            {
              name: 'colorScheme',
              type: "'primary' | 'success' | 'information'",
              default: "'primary'",
              description: 'Brand palette for fills and borders.',
              required: false,
            },
            { name: 'iconLeft', type: 'ReactNode', description: 'Optional icon before label.', required: false },
            { name: 'iconRight', type: 'ReactNode', description: 'Optional icon after label.', required: false },
            {
              name: 'onClick',
              type: '() => void',
              description: 'Click handler (ignored when disabled).',
              required: false,
            },
            { name: 'disabled', type: 'boolean', description: 'Disables the button.', required: false },
            { name: 'className', type: 'string', description: 'Additional class on the root element.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use one primary button per section for the main action.',
              children: <Button type="default" label="Download Scorecard" />,
            },
            {
              type: 'do',
              description: 'Match button color to semantic meaning (e.g. success for confirmations).',
              children: <Button colorScheme="success" type="default" label="Confirm" />,
            },
            {
              type: 'dont',
              description: "Don't stack multiple default primary buttons side by side without hierarchy.",
              children: (
                <div style={row}>
                  <Button type="default" label="One" />
                  <Button type="default" label="Two" />
                  <Button type="default" label="Three" />
                </div>
              ),
            },
            {
              type: 'dont',
              description: "Don't use overly long labels—keep copy concise.",
              children: (
                <Button label="Click here to download the scorecard now" type="default" />
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
              label: 'Keyboard',
              description: 'Activatable with Enter and Space when focused.',
            },
            {
              type: 'aria',
              label: 'Semantics',
              description: "Uses a native <button> with implicit role and disabled state.",
            },
            {
              type: 'focus',
              label: 'Focus',
              description: 'Visible focus ring using a 2px outline offset from the pill bounds.',
            },
            {
              type: 'wcag',
              label: 'Contrast',
              description: 'Default and hover treatments target WCAG AA text contrast on fills.',
            },
            {
              type: 'color',
              label: 'Color',
              description: 'Never rely on color alone—always include a visible text label.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
