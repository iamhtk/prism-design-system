import { useState } from 'react'
import { ButtonGroup } from '../../../components/molecules/ButtonGroup/ButtonGroup'
import type { ButtonGroupItemProps } from '../../../components/molecules/ButtonGroup/ButtonGroup'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const threeItems: ButtonGroupItemProps[] = [
  { label: 'Pilot' },
  { label: 'County' },
  { label: 'National' },
]

export function ButtonGroupPage() {
  const [connected, setConnected] = useState(true)

  const patch = (key: string, val: unknown) => {
    if (key === 'connected') setConnected(Boolean(val))
  }

  const values = { connected }
  const interactiveCode = `<ButtonGroup
  connected={${connected}}
  items={[
    { label: 'Pilot' },
    { label: 'County' },
    { label: 'National' },
  ]}
/>`

  return (
    <DocsPage
      title="ButtonGroup"
      description="Segmented control for choosing one related option from a short inline list."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4113"
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
                    <ButtonGroup connected={connected} items={threeItems} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[{ type: 'boolean', key: 'connected', label: 'connected', default: true }]}
                  />
                </>
              ),
            },
            {
              label: 'Connected',
              background: 'grid',
              center: true,
              code: `<ButtonGroup
  connected
  items={[
    { label: 'List' },
    { label: 'Map' },
    { label: 'Timeline' },
  ]}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ButtonGroup
                    connected
                    items={[{ label: 'List' }, { label: 'Map' }, { label: 'Timeline' }]}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Separated',
              background: 'grid',
              center: true,
              code: `<ButtonGroup
  connected={false}
  items={[
    { label: '7d' },
    { label: '30d' },
    { label: 'YTD' },
  ]}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ButtonGroup
                    connected={false}
                    items={[{ label: '7d' }, { label: '30d' }, { label: 'YTD' }]}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'All disabled',
              background: 'grid',
              center: true,
              code: `<ButtonGroup
  items={[
    { label: 'A', disabled: true },
    { label: 'B', disabled: true },
    { label: 'C', disabled: true },
  ]}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ButtonGroup
                    items={[
                      { label: 'A', disabled: true },
                      { label: 'B', disabled: true },
                      { label: 'C', disabled: true },
                    ]}
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
          code={`import { ButtonGroup } from './components/molecules/ButtonGroup/ButtonGroup'

<ButtonGroup connected items={[{ label: 'Q1' }, { label: 'Q2' }, { label: 'Q3' }]} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            {
              name: 'items',
              type: 'ButtonGroupItemProps[]',
              description: 'label, optional active, disabled, onClick.',
              required: true,
            },
            { name: 'connected', type: 'boolean', default: 'false', description: 'Shared border vs spaced chips.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use connected mode when options are mutually exclusive views of the same data.',
              children: <ButtonGroup connected items={threeItems} />,
            },
            {
              type: 'dont',
              description: "Don't mix connected and separated groups on the same screen without a strong reason.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Pick one visual language per flow.</span>
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
              label: 'Buttons',
              description: 'Each segment is a native button with aria-pressed for the active item.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
