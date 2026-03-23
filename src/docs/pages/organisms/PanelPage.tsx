import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { Text } from '../../../components/atoms/Text/Text'
import { Panel } from '../../../components/organisms/Panel/Panel'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sides = ['left', 'right'] as const

export function PanelPage() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('Filters')
  const [side, setSide] = useState<(typeof sides)[number]>('right')
  const [showOverlay, setShowOverlay] = useState(true)

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'side') setSide(val as (typeof sides)[number])
    if (key === 'showOverlay') setShowOverlay(Boolean(val))
  }

  const values = { title, side, showOverlay }

  const interactiveCode = `const [open, setOpen] = useState(false)

<Button label="Open panel" onClick={() => setOpen(true)} />
<Panel
  isOpen={open}
  onClose={() => setOpen(false)}
  title="${title.replace(/"/g, '\\"')}"
  side="${side}"
  showOverlay={${showOverlay}}
>
  <Text variant="body-md">Refine showcase and scorecard results.</Text>
</Panel>`

  return (
    <DocsPage
      title="Panel"
      description="Slide-in drawer with backdrop, keyboard close, and configurable side."
      category="Organisms"
      status="stable"
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
                    <Button label="Open panel" type="default" onClick={() => setOpen(true)} />
                    <Panel
                      isOpen={open}
                      onClose={() => setOpen(false)}
                      title={title.trim() || undefined}
                      side={side}
                      showOverlay={showOverlay}
                    >
                      <Text variant="body-md">Refine showcase and scorecard results.</Text>
                    </Panel>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'title', label: 'title', default: 'Filters' },
                      {
                        type: 'select',
                        key: 'side',
                        label: 'side',
                        options: [...sides],
                        default: 'right',
                      },
                      { type: 'boolean', key: 'showOverlay', label: 'showOverlay', default: true },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Left',
              background: 'grid',
              center: true,
              code: `<Panel isOpen={open} onClose={() => setOpen(false)} title="Navigation" side="left">
  <Text variant="body-sm">Jump to pilot sections.</Text>
</Panel>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <PanelSideDemo side="left" title="Navigation" label="Open left panel" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Right',
              background: 'grid',
              center: true,
              code: `<Panel isOpen={open} onClose={() => setOpen(false)} title="Details" side="right">
  <Text variant="body-sm">Context for the selected row.</Text>
</Panel>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <PanelSideDemo side="right" title="Details" label="Open right panel" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Panel } from './components/organisms/Panel/Panel'

<Panel isOpen={open} onClose={close} title="Title" side="right" showOverlay>
  {children}
</Panel>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'isOpen', type: 'boolean', description: 'Drawer visibility.', required: true },
            { name: 'onClose', type: '() => void', description: 'Close handler.', required: true },
            { name: 'title', type: 'string', description: 'Header text.', required: false },
            { name: 'children', type: 'ReactNode', description: 'Body.', required: true },
            { name: 'side', type: "'left' | 'right'", default: "'right'", description: 'Slide origin.', required: false },
            { name: 'width', type: 'string', description: 'Drawer width style.', required: false },
            { name: 'showOverlay', type: 'boolean', default: 'true', description: 'Dim background.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function PanelSideDemo({
  side,
  title,
  label,
}: {
  side: (typeof sides)[number]
  title: string
  label: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button label={label} type="outlined" onClick={() => setOpen(true)} />
      <Panel isOpen={open} onClose={() => setOpen(false)} title={title} side={side}>
        <Text variant="body-sm">
          {side === 'left' ? 'Jump to pilot sections.' : 'Context for the selected row.'}
        </Text>
      </Panel>
    </>
  )
}
