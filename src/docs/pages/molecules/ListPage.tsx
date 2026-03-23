import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { List } from '../../../components/molecules/List/List'
import type { ListItem } from '../../../components/molecules/List/List'
import { DocIconSearch } from '../../helpers/docsIcons'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['default', 'bordered', 'striped'] as const
const sizes = ['sm', 'md', 'lg'] as const

const four: ListItem[] = [
  { label: 'Maricopa fuel break', description: 'Phase 2 treatments' },
  { label: 'Yavapai crew rotation', description: 'Week of March 10' },
  { label: 'Coconino monitoring', description: 'Sensor calibration' },
  { label: 'Pima community workshop', description: 'Registration open' },
]

export function ListPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>('default')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [interactive, setInteractive] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'interactive') setInteractive(Boolean(val))
  }

  const values = { variant, size, interactive }
  const intLine = interactive ? '\n  interactive' : ''

  const interactiveCode = `<List
  variant="${variant}"
  size="${size}"${intLine}
  items={items}
/>`

  return (
    <DocsPage
      title="List"
      description="Stacked rows for navigation shortcuts, settings, and dense data previews."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4120"
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
                    <List variant={variant} size={size} interactive={interactive} items={four} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      { type: 'boolean', key: 'interactive', label: 'interactive', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<List items={fourPilots} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <List items={four} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Bordered',
              background: 'grid',
              center: true,
              code: '<List variant="bordered" items={items} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <List variant="bordered" items={four} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Striped',
              background: 'grid',
              center: true,
              code: '<List variant="striped" items={items} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <List variant="striped" items={four} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Hover',
              background: 'grid',
              center: true,
              code: '<List interactive items={items} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <List interactive items={four} />
                </ComponentDemo>
              ),
            },
            {
              label: 'With icons',
              background: 'grid',
              center: true,
              code: '<List items={itemsWithIcons} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <List
                    items={four.map((it) => ({
                      ...it,
                      icon: <DocIconSearch />,
                    }))}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'With actions',
              background: 'grid',
              center: true,
              code: '<List items={[{ label: "Row", action: <Button type="transparent" label="Open" /> }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <List
                    items={four.map((it) => ({
                      ...it,
                      action: <Button type="transparent" label="Open" />,
                    }))}
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
          code={`import { List } from './components/molecules/List/List'

<List variant="bordered" interactive items={rows} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'items', type: 'ListItem[]', description: 'label, description, icon, action, href, states.', required: true },
            {
              name: 'variant',
              type: "'default' | 'bordered' | 'striped'",
              default: "'default'",
              description: 'Row chrome.',
              required: false,
            },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Vertical padding scale.', required: false },
            { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover affordance.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use href rows when the whole line navigates; keep actions for secondary operations.',
              children: <List items={[{ label: 'Scorecard PDF', href: '#' }]} />,
            },
            {
              type: 'dont',
              description: "Don't cram more than one primary action per row without clear hierarchy.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Prefer a kebab menu for many actions.</span>
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
              label: 'Links',
              description: 'Rows with href render as anchors and participate in normal tab order.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
