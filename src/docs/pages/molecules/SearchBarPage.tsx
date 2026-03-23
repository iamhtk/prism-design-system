import { useState } from 'react'
import { SearchBar } from '../../../components/molecules/SearchBar/SearchBar'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sizes = ['sm', 'md', 'lg'] as const
const threeSuggestions = ['Scorecard PDF', 'Scorecard API', 'Scorecard workshop']

export function SearchBarPage() {
  const [placeholder, setPlaceholder] = useState('Search pilots, counties, treatments…')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'placeholder') setPlaceholder(String(val))
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'loading') setLoading(Boolean(val))
    if (key === 'disabled') setDisabled(Boolean(val))
  }

  const values = { placeholder, size, loading, disabled }
  const disLine = disabled ? '\n  disabled' : ''
  const loadLine = loading ? '\n  loading' : ''

  const interactiveCode = `<SearchBar
  placeholder="${placeholder.replace(/"/g, '\\"')}"
  size="${size}"${loadLine}${disLine}
  value={value}
  onChange={setValue}
/>`

  return (
    <DocsPage
      title="SearchBar"
      description="Search field with optional loading swap and typeahead suggestions."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4107"
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
                    <SearchBar
                      placeholder={placeholder}
                      size={size}
                      loading={loading}
                      disabled={disabled}
                      value={value}
                      onChange={setValue}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'Search…' },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      { type: 'boolean', key: 'loading', label: 'loading', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Small',
              background: 'grid',
              center: true,
              code: '<SearchBar size="sm" placeholder="Filter table…" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SearchBar size="sm" placeholder="Filter table…" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Medium',
              background: 'grid',
              center: true,
              code: '<SearchBar size="md" placeholder="Search…" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SearchBar size="md" placeholder="Search…" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Large',
              background: 'grid',
              center: true,
              code: '<SearchBar size="lg" placeholder="Find a CWPC resource" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SearchBar size="lg" placeholder="Find a CWPC resource" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Loading',
              background: 'grid',
              center: true,
              code: '<SearchBar loading placeholder="Searching directory…" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SearchBar loading placeholder="Searching directory…" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Suggestions',
              background: 'grid',
              center: true,
              code: `<SearchBar
  placeholder="Try “scorecard”"
  suggestions={['Scorecard PDF', 'Scorecard API', 'Scorecard workshop']}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SearchBar placeholder="Try “scorecard”" suggestions={threeSuggestions} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { SearchBar } from './components/molecules/SearchBar/SearchBar'

<SearchBar value={q} onChange={setQ} onSearch={runQuery} suggestions={hints} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'placeholder', type: 'string', default: "'Search…'", description: 'Input placeholder.', required: false },
            { name: 'value', type: 'string', description: 'Controlled query string.', required: false },
            { name: 'onChange', type: '(value: string) => void', description: 'Fires as the user types.', required: false },
            { name: 'onSearch', type: '(value: string) => void', description: 'Fires on Enter or suggestion pick.', required: false },
            { name: 'onClear', type: '() => void', description: 'Optional clear handler.', required: false },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Density scale.', required: false },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Swaps icon for Loader.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Locks the field.', required: false },
            { name: 'suggestions', type: 'string[]', default: '[]', description: 'Filtered listbox under input.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Offer suggestions for repeated queries or long-tail keywords.',
              children: <SearchBar placeholder="Search docs" suggestions={threeSuggestions} />,
            },
            {
              type: 'dont',
              description: "Don't fire expensive searches on every keystroke without debouncing.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Debounce network calls by ~200–400ms.</span>
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
              label: 'Combobox',
              description: 'Input uses combobox semantics with aria-expanded when suggestions render.',
            },
            {
              type: 'keyboard',
              label: 'List navigation',
              description: 'Arrow keys move highlight; Enter selects; Escape closes the list.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
