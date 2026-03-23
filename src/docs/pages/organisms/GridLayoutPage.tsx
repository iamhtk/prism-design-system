import { useState } from 'react'
import { Text } from '../../../components/atoms/Text/Text'
import { GridLayout } from '../../../components/organisms/GridLayout/GridLayout'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const colsOpts = ['2', '3', '4'] as const
const gaps = ['sm', 'md', 'lg'] as const

const cellStyle = {
  padding: 'var(--space-400)',
  borderRadius: 'var(--border-radius-md)',
  borderWidth: 'var(--border-width-xs)',
  borderStyle: 'solid' as const,
  borderColor: 'var(--color-disabled-subtle)',
}

function DemoCells() {
  return (
    <>
      <div style={cellStyle}>
        <Text variant="body-sm">Showcase</Text>
      </div>
      <div style={cellStyle}>
        <Text variant="body-sm">Scorecard</Text>
      </div>
      <div style={cellStyle}>
        <Text variant="body-sm">Pilots</Text>
      </div>
      <div style={cellStyle}>
        <Text variant="body-sm">Sponsors</Text>
      </div>
    </>
  )
}

export function GridLayoutPage() {
  const [columns, setColumns] = useState<2 | 3 | 4>(3)
  const [gap, setGap] = useState<(typeof gaps)[number]>('md')
  const [responsive, setResponsive] = useState(true)

  const patch = (key: string, val: unknown) => {
    if (key === 'columns') setColumns(Number(val) as 2 | 3 | 4)
    if (key === 'gap') setGap(val as (typeof gaps)[number])
    if (key === 'responsive') setResponsive(Boolean(val))
  }

  const values = { columns: String(columns), gap, responsive }

  const interactiveCode = `<GridLayout columns={${columns}} gap="${gap}" responsive={${responsive}}>
  {children}
</GridLayout>`

  return (
    <DocsPage
      title="Grid Layout"
      description="Responsive column grid with tokenized gaps."
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
              center: false,
              fullWidth: true,
              code: interactiveCode,
              children: (
                <>
                  <ComponentDemo padding="sm" background="transparent" fullWidth>
                    <GridLayout columns={columns} gap={gap} responsive={responsive}>
                      <DemoCells />
                    </GridLayout>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'columns',
                        label: 'columns',
                        options: [...colsOpts],
                        default: '3',
                      },
                      {
                        type: 'select',
                        key: 'gap',
                        label: 'gap',
                        options: [...gaps],
                        default: 'md',
                      },
                      { type: 'boolean', key: 'responsive', label: 'responsive', default: true },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Two Columns',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<GridLayout columns={2} gap="lg">{children}</GridLayout>',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <GridLayout columns={2} gap="lg">
                    <DemoCells />
                  </GridLayout>
                </ComponentDemo>
              ),
            },
            {
              label: 'No Responsive',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<GridLayout columns={4} gap="sm" responsive={false}>{children}</GridLayout>',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <GridLayout columns={4} gap="sm" responsive={false}>
                    <DemoCells />
                  </GridLayout>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { GridLayout } from './components/organisms/GridLayout/GridLayout'

<GridLayout columns={3} gap="md" responsive>
  {cards}
</GridLayout>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', description: 'Cell content.', required: true },
            { name: 'columns', type: '1 | 2 | 3 | 4', default: '3', description: 'Desktop column count.', required: false },
            { name: 'gap', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Gutter token.', required: false },
            { name: 'responsive', type: 'boolean', default: 'true', description: 'Collapse on small screens.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
