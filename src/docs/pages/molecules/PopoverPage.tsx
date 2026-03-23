import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { Text } from '../../../components/atoms/Text/Text'
import { Popover } from '../../../components/molecules/Popover/Popover'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const positions = ['top', 'bottom', 'left', 'right'] as const

export function PopoverPage() {
  const [position, setPosition] = useState<(typeof positions)[number]>('bottom')
  const [title, setTitle] = useState('')
  const [closeOnClickOutside, setCloseOnClickOutside] = useState(true)

  const patch = (key: string, val: unknown) => {
    if (key === 'position') setPosition(val as (typeof positions)[number])
    if (key === 'title') setTitle(String(val))
    if (key === 'closeOnClickOutside') setCloseOnClickOutside(Boolean(val))
  }

  const values = { position, title, closeOnClickOutside }
  const titleLine = title.trim() ? `\n  title="${title.replace(/"/g, '\\"')}"` : ''
  const closeLine = closeOnClickOutside ? '' : '\n  closeOnClickOutside={false}'

  const interactiveCode = `<Popover
  position="${position}"${titleLine}${closeLine}
  trigger={<Button type="outlined" label="Toggle" />}
>
  <Text variant="body-sm">Rich content goes here.</Text>
</Popover>`

  return (
    <DocsPage
      title="Popover"
      description="Floating surface for lightweight forms, filters, or explanations tied to a trigger."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4124"
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
                    <Popover
                      position={position}
                      title={title.trim() || undefined}
                      closeOnClickOutside={closeOnClickOutside}
                      trigger={<Button type="outlined" label="Toggle popover" />}
                    >
                      <Text variant="body-sm">Adjust filters or confirm details inside this surface.</Text>
                    </Popover>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'position',
                        label: 'position',
                        options: [...positions],
                        default: 'bottom',
                      },
                      { type: 'text', key: 'title', label: 'title', default: '' },
                      {
                        type: 'boolean',
                        key: 'closeOnClickOutside',
                        label: 'closeOnClickOutside',
                        default: true,
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Bottom',
              background: 'grid',
              center: true,
              code: '<Popover position="bottom" trigger={<Button type="outlined" label="Open" />}>…</Popover>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Popover position="bottom" trigger={<Button type="outlined" label="Open" />}>
                    <Text variant="body-sm">Default placement below the trigger.</Text>
                  </Popover>
                </ComponentDemo>
              ),
            },
            {
              label: 'Top',
              background: 'grid',
              center: true,
              code: '<Popover position="top" trigger={<Button type="outlined" label="Open" />}>…</Popover>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Popover position="top" trigger={<Button type="outlined" label="Open" />}>
                    <Text variant="body-sm">Opens above.</Text>
                  </Popover>
                </ComponentDemo>
              ),
            },
            {
              label: 'Left',
              background: 'grid',
              center: true,
              code: '<Popover position="left" trigger={<Button type="outlined" label="Open" />}>…</Popover>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Popover position="left" trigger={<Button type="outlined" label="Open" />}>
                    <Text variant="body-sm">Anchored to the left.</Text>
                  </Popover>
                </ComponentDemo>
              ),
            },
            {
              label: 'Right',
              background: 'grid',
              center: true,
              code: '<Popover position="right" trigger={<Button type="outlined" label="Open" />}>…</Popover>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Popover position="right" trigger={<Button type="outlined" label="Open" />}>
                    <Text variant="body-sm">Anchored to the right.</Text>
                  </Popover>
                </ComponentDemo>
              ),
            },
            {
              label: 'With title',
              background: 'grid',
              center: true,
              code: '<Popover title="Share settings" trigger={<Button label="Share" type="outlined" />}>…</Popover>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Popover title="Share settings" trigger={<Button label="Share" type="outlined" />}>
                    <Text variant="body-sm">Choose visibility and copy the invite link.</Text>
                  </Popover>
                </ComponentDemo>
              ),
            },
            {
              label: 'Rich content',
              background: 'grid',
              center: true,
              code: '<Popover trigger={<Button type="outlined" label="Details" />}><Stack>…</Stack></Popover>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Popover trigger={<Button type="outlined" label="Details" />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>
                      <Text variant="body-sm">Last synced 12 minutes ago.</Text>
                      <Button type="default" label="Refresh now" />
                    </div>
                  </Popover>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Popover } from './components/molecules/Popover/Popover'

<Popover trigger={<Button type="outlined" label="Filter" />} title="Filters">
  {form}
</Popover>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'trigger', type: 'ReactNode', description: 'Click/keyboard target.', required: true },
            { name: 'children', type: 'ReactNode', description: 'Popover body.', required: true },
            { name: 'title', type: 'string', description: 'Optional heading.', required: false },
            {
              name: 'position',
              type: "'top' | 'bottom' | 'left' | 'right'",
              default: "'bottom'",
              description: 'Placement relative to trigger.',
              required: false,
            },
            { name: 'width', type: 'string', description: 'Optional CSS width on surface.', required: false },
            { name: 'closeOnClickOutside', type: 'boolean', default: 'true', description: 'Dismiss on outside click.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use for secondary panels that should stay near the trigger.',
              children: (
                <Popover trigger={<Button type="outlined" label="Column settings" />}>
                  <Text variant="body-sm">Toggle visible columns.</Text>
                </Popover>
              ),
            },
            {
              type: 'dont',
              description: "Don't nest critical legal consent only inside a popover — use Modal for blocking flows.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Match pattern to user attention needed.</span>
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
              label: 'Trigger',
              description: 'Trigger is focusable; Enter/Space toggles open state with aria-expanded.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
