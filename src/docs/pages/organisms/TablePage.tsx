import { useState } from 'react'
import { Table, type TableColumn } from '../../../components/organisms/Table/Table'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const baseColumns: TableColumn[] = [
  { key: 'pilot', label: 'Pilot' },
  { key: 'region', label: 'Region' },
  { key: 'focus', label: 'Focus area' },
  { key: 'status', label: 'Status', sortable: true },
]

const sortableColumns: TableColumn[] = [
  { key: 'pilot', label: 'Pilot', sortable: true },
  { key: 'region', label: 'Region', sortable: true },
  { key: 'score', label: 'Scorecard', sortable: true, align: 'right' },
]

const rows = [
  { pilot: 'Redwood Valley', region: 'CA North', focus: 'Fuel breaks', status: 'Active' },
  { pilot: 'High Desert Alliance', region: 'NV South', focus: 'Education', status: 'Active' },
  { pilot: 'Cascadia Ridge', region: 'OR West', focus: 'Detection', status: 'Alumni' },
]

const sortRows = [
  { pilot: 'Redwood Valley', region: 'CA North', score: '92' },
  { pilot: 'Cascadia Ridge', region: 'OR West', score: '88' },
  { pilot: 'High Desert Alliance', region: 'NV South', score: '81' },
]

export function TablePage() {
  const [striped, setStriped] = useState(false)
  const [stickyHeader, setStickyHeader] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'striped') setStriped(Boolean(val))
    if (key === 'stickyHeader') setStickyHeader(Boolean(val))
  }

  const values = { striped, stickyHeader }

  const interactiveCode = `<Table
  columns={columns}
  rows={rows}
  striped={${striped}}
  stickyHeader={${stickyHeader}}
/>`

  return (
    <DocsPage
      title="Table"
      description="Sortable data grid with optional striping, caption, and sticky header."
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
              code: `${interactiveCode}

const columns = [
  { key: 'pilot', label: 'Pilot' },
  { key: 'region', label: 'Region' },
  { key: 'focus', label: 'Focus area' },
  { key: 'status', label: 'Status', sortable: true },
]

const rows = [
  { pilot: 'Redwood Valley', region: 'CA North', focus: 'Fuel breaks', status: 'Active' },
  …
]`,
              children: (
                <>
                  <ComponentDemo padding="sm" background="transparent" fullWidth>
                    <Table
                      columns={baseColumns}
                      rows={rows}
                      striped={striped}
                      stickyHeader={stickyHeader}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'boolean', key: 'striped', label: 'striped', default: false },
                      { type: 'boolean', key: 'stickyHeader', label: 'stickyHeader', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<Table columns={columns} rows={rows} />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Table columns={baseColumns} rows={rows} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Striped',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<Table columns={columns} rows={rows} striped />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Table columns={baseColumns} rows={rows} striped />
                </ComponentDemo>
              ),
            },
            {
              label: 'Sortable',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<Table
  columns={[
    { key: 'pilot', label: 'Pilot', sortable: true },
    { key: 'region', label: 'Region', sortable: true },
    { key: 'score', label: 'Scorecard', sortable: true, align: 'right' },
  ]}
  rows={sortRows}
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Table columns={sortableColumns} rows={sortRows} />
                </ComponentDemo>
              ),
            },
            {
              label: 'With Caption',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<Table
  caption="CWPC pilot roster (sample)"
  columns={columns}
  rows={rows}
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Table caption="CWPC pilot roster (sample)" columns={baseColumns} rows={rows} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Table } from './components/organisms/Table/Table'

<Table columns={cols} rows={data} striped caption="…" stickyHeader />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'columns', type: 'TableColumn[]', description: 'Header definitions.', required: true },
            { name: 'rows', type: 'Record<string, ReactNode>[]', description: 'Body data keyed by column.', required: true },
            { name: 'striped', type: 'boolean', default: 'false', description: 'Alternating row tone.', required: false },
            { name: 'caption', type: 'string', description: 'Accessible table caption.', required: false },
            { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Pin header on scroll.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
