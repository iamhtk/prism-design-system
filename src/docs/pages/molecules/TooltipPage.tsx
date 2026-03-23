import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { Tooltip } from '../../../components/molecules/Tooltip/Tooltip'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const positions = ['top', 'bottom', 'left', 'right'] as const

export function TooltipPage() {
  const [content, setContent] = useState('Short helper copy')
  const [position, setPosition] = useState<(typeof positions)[number]>('top')
  const [delay, setDelay] = useState(200)

  const patch = (key: string, val: unknown) => {
    if (key === 'content') setContent(String(val))
    if (key === 'position') setPosition(val as (typeof positions)[number])
    if (key === 'delay') setDelay(Number(val))
  }

  const values = { content, position, delay }
  const interactiveCode = `<Tooltip content="${content.replace(/"/g, '\\"')}" position="${position}" delay={${delay}}>
  <Button type="outlined" label="Focus or hover me" />
</Tooltip>`

  return (
    <DocsPage
      title="Tooltip"
      description="Lightweight hint anchored to a focusable or hoverable trigger."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4109"
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
                    <Tooltip content={content} position={position} delay={delay}>
                      <Button type="outlined" label="Focus or hover me" />
                    </Tooltip>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'content', label: 'content', default: 'Short helper copy' },
                      {
                        type: 'select',
                        key: 'position',
                        label: 'position',
                        options: [...positions],
                        default: 'top',
                      },
                      { type: 'number', key: 'delay', label: 'delay (ms)', default: 200, min: 0, max: 2000, step: 50 },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Top',
              background: 'grid',
              center: true,
              code: '<Tooltip content="Download PDF" position="top"><Button type="outlined" label="Export" /></Tooltip>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tooltip content="Download PDF" position="top">
                    <Button type="outlined" label="Export" />
                  </Tooltip>
                </ComponentDemo>
              ),
            },
            {
              label: 'Bottom',
              background: 'grid',
              center: true,
              code: '<Tooltip content="Opens in new tab" position="bottom"><Button type="transparent" label="Learn more" /></Tooltip>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tooltip content="Opens in new tab" position="bottom">
                    <Button type="transparent" label="Learn more" />
                  </Tooltip>
                </ComponentDemo>
              ),
            },
            {
              label: 'Left',
              background: 'grid',
              center: true,
              code: '<Tooltip content="Keyboard shortcut: /" position="left"><Button type="outlined" label="Search" /></Tooltip>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tooltip content="Keyboard shortcut: /" position="left">
                    <Button type="outlined" label="Search" />
                  </Tooltip>
                </ComponentDemo>
              ),
            },
            {
              label: 'Right',
              background: 'grid',
              center: true,
              code: '<Tooltip content="Beta feature" position="right"><Button type="outlined" label="Try pilot map" /></Tooltip>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tooltip content="Beta feature" position="right">
                    <Button type="outlined" label="Try pilot map" />
                  </Tooltip>
                </ComponentDemo>
              ),
            },
            {
              label: 'With delay',
              background: 'grid',
              center: true,
              code: '<Tooltip content="Waits 800ms" delay={800}><Button type="outlined" label="Hover slowly" /></Tooltip>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Tooltip content="Waits 800ms" delay={800}>
                    <Button type="outlined" label="Hover slowly" />
                  </Tooltip>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Tooltip } from './components/molecules/Tooltip/Tooltip'

<Tooltip content="Saved automatically">
  <Button type="outlined" label="Save draft" />
</Tooltip>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'content', type: 'string', description: 'Tooltip text.', required: true },
            { name: 'children', type: 'ReactNode', description: 'Trigger element.', required: true },
            {
              name: 'position',
              type: "'top' | 'bottom' | 'left' | 'right'",
              default: "'top'",
              description: 'Bubble placement.',
              required: false,
            },
            { name: 'delay', type: 'number', default: '200', description: 'Milliseconds before show.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Keep copy under ~10 words; tooltips are for micro-copy only.',
              children: (
                <Tooltip content="Exports CSV for Excel">
                  <Button type="outlined" label="Download data" />
                </Tooltip>
              ),
            },
            {
              type: 'dont',
              description: "Don't place links, inputs, or other tooltips inside the bubble.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Use Popover for rich interactive content.</span>
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
              label: 'Tooltip role',
              description: 'Bubble uses role="tooltip" while the trigger should remain keyboard focusable.',
            },
            {
              type: 'keyboard',
              label: 'Focus',
              description: 'Focus-visible on the child shows the tooltip via onFocusCapture.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
