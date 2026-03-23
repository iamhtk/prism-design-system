import { useState } from 'react'
import { FilterBar } from '../../../components/molecules/FilterBar/FilterBar'
import type { FilterOption } from '../../../components/molecules/FilterBar/FilterBar'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const baseFilters: FilterOption[] = [
  { label: 'All hazards', value: 'all' },
  { label: 'Fuel', value: 'fuel' },
  { label: 'Weather', value: 'wx' },
  { label: 'Workforce', value: 'crew' },
]

const withCounts: FilterOption[] = [
  { label: 'Active', value: 'act', count: 42 },
  { label: 'Paused', value: 'pause', count: 7 },
  { label: 'Archived', value: 'arc', count: 15 },
]

export function FilterBarPage() {
  const [multiSelect, setMultiSelect] = useState(true)
  const [active, setActive] = useState<string[]>(['fuel', 'crew'])

  const patch = (key: string, val: unknown) => {
    if (key === 'multiSelect') setMultiSelect(Boolean(val))
  }

  const values = { multiSelect }
  const interactiveCode = `<FilterBar
  multiSelect={${multiSelect}}
  filters={filters}
  activeFilters={activeFilters}
  onChange={setActiveFilters}
/>`

  return (
    <DocsPage
      title="FilterBar"
      description="Chip row for toggling dataset facets with optional result counts."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4121"
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
                    <FilterBar
                      multiSelect={multiSelect}
                      filters={baseFilters}
                      activeFilters={active}
                      onChange={setActive}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[{ type: 'boolean', key: 'multiSelect', label: 'multiSelect', default: true }]}
                  />
                </>
              ),
            },
            {
              label: 'Multi-select',
              background: 'grid',
              center: true,
              code: '<FilterBar multiSelect filters={opts} defaultSelection={["fuel","wx"]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FilterBarMultiDemo />
                </ComponentDemo>
              ),
            },
            {
              label: 'Single-select',
              background: 'grid',
              center: true,
              code: '<FilterBar multiSelect={false} filters={opts} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FilterBar multiSelect={false} filters={baseFilters} />
                </ComponentDemo>
              ),
            },
            {
              label: 'With counts',
              background: 'grid',
              center: true,
              code: '<FilterBar filters={[{ label: "Active", value: "a", count: 42 }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FilterBar filters={withCounts} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Deselected',
              background: 'grid',
              center: true,
              code: '<FilterBar filters={opts} activeFilters={[]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FilterBar filters={baseFilters} activeFilters={[]} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { FilterBar } from './components/molecules/FilterBar/FilterBar'

<FilterBar filters={filters} activeFilters={active} onChange={setActive} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'filters', type: 'FilterOption[]', description: 'label, value, optional count.', required: true },
            { name: 'activeFilters', type: 'string[]', description: 'Controlled selected values.', required: false },
            { name: 'onChange', type: '(active: string[]) => void', description: 'Selection updates.', required: false },
            { name: 'multiSelect', type: 'boolean', default: 'true', description: 'Allow many chips active.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use aria-pressed styling (built-in) so active chips read as toggles.',
              children: <FilterBar filters={withCounts} activeFilters={['act']} onChange={() => {}} />,
            },
            {
              type: 'dont',
              description: "Don't offer more than ~8 filters in one bar without overflow handling.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Move advanced filters behind a modal.</span>
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
              label: 'Group',
              description: 'Chips sit inside a group labeled Filters for screen readers.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function FilterBarMultiDemo() {
  const [a, setA] = useState<string[]>(['fuel', 'wx'])
  return <FilterBar multiSelect filters={baseFilters} activeFilters={a} onChange={setA} />
}
