import { useState } from 'react'
import { Text } from '../../../components/atoms/Text/Text'
import { ContextMenu } from '../../../components/molecules/ContextMenu/ContextMenu'
import type { ContextMenuItem } from '../../../components/molecules/ContextMenu/ContextMenu'
import { DocIconSearch } from '../../helpers/docsIcons'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'] as const

const fourItems: ContextMenuItem[] = [
  { label: 'Open', onClick: () => {} },
  { label: 'Rename', onClick: () => {} },
  { label: 'Duplicate', onClick: () => {} },
  { label: 'Archive', onClick: () => {} },
]

export function ContextMenuPage() {
  const [position, setPosition] = useState<(typeof positions)[number]>('bottom-left')

  const patch = (key: string, val: unknown) => {
    if (key === 'position') setPosition(val as (typeof positions)[number])
  }

  const values = { position }
  const interactiveCode = `<ContextMenu
  position="${position}"
  trigger={<span>Right-click or press Enter</span>}
  items={items}
/>`

  return (
    <DocsPage
      title="ContextMenu"
      description="Secondary commands opened via context-click or an explicit keyboard-accessible trigger."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4123"
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
                    <ContextMenu
                      position={position}
                      trigger={
                        <Text variant="body-sm">
                          Right-click here — or focus and press Enter — to open the menu.
                        </Text>
                      }
                      items={fourItems}
                    />
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
                        default: 'bottom-left',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<ContextMenu trigger={<span>Row actions</span>} items={four} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ContextMenu trigger={<Text variant="body-sm">Row actions (right-click)</Text>} items={fourItems} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Destructive',
              background: 'grid',
              center: true,
              code: '<ContextMenu items={[{ label: "Delete", destructive: true, onClick }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ContextMenu
                    trigger={<Text variant="body-sm">Scorecard row</Text>}
                    items={[
                      { label: 'Edit', onClick: () => {} },
                      { label: 'Delete', destructive: true, onClick: () => {} },
                    ]}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Divider',
              background: 'grid',
              center: true,
              code: '<ContextMenu items={[{ label: "Copy" }, { divider: true }, { label: "Paste" }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ContextMenu
                    trigger={<Text variant="body-sm">Canvas</Text>}
                    items={[
                      { label: 'Copy link', onClick: () => {} },
                      { divider: true },
                      { label: 'Paste', onClick: () => {} },
                    ]}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'With icons',
              background: 'grid',
              center: true,
              code: '<ContextMenu items={[{ label: "Search", icon: <Icon /> }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ContextMenu
                    trigger={<Text variant="body-sm">Map layer</Text>}
                    items={[
                      { label: 'Find on map', icon: <DocIconSearch />, onClick: () => {} },
                      { label: 'Export layer', onClick: () => {} },
                    ]}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled item',
              background: 'grid',
              center: true,
              code: '<ContextMenu items={[{ label: "Share", disabled: true }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <ContextMenu
                    trigger={<Text variant="body-sm">Report</Text>}
                    items={[
                      { label: 'Download PDF', onClick: () => {} },
                      { label: 'Share link', disabled: true, onClick: () => {} },
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
          code={`import { ContextMenu } from './components/molecules/ContextMenu/ContextMenu'

<ContextMenu trigger={<span>Row</span>} items={[{ label: 'Edit', onClick: openEditor }]} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'items', type: 'ContextMenuItem[]', description: 'label, onClick, icon, disabled, destructive, divider.', required: true },
            { name: 'trigger', type: 'ReactNode', description: 'Visible target + keyboard opener.', required: true },
            {
              name: 'position',
              type: "'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'",
              default: "'bottom-left'",
              description: 'Menu placement.',
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
              description: 'Keep menus short and ordered from safest to most destructive at the bottom.',
              children: <ContextMenu trigger={<Text variant="body-sm">File</Text>} items={fourItems} />,
            },
            {
              type: 'dont',
              description: "Don't hide primary navigation inside a context menu.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Use Navbar for top-level routes.</span>
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
              description: 'Trigger is focusable and opens on Enter/Space; menu items are role menuitem.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
