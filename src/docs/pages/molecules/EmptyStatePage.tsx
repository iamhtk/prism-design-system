import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { EmptyState } from '../../../components/molecules/EmptyState/EmptyState'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['default', 'search', 'error', 'success'] as const

export function EmptyStatePage() {
  const [title, setTitle] = useState('No pilots yet')
  const [description, setDescription] = useState('Create a pilot to start tracking treatments in this county.')
  const [variant, setVariant] = useState<(typeof variants)[number]>('default')

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'description') setDescription(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
  }

  const values = { title, description, variant }
  const descLine = description.trim()
    ? `\n  description="${description.replace(/"/g, '\\"')}"`
    : ''

  const interactiveCode = `<EmptyState
  title="${title.replace(/"/g, '\\"')}"
  variant="${variant}"${descLine}
/>`

  return (
    <DocsPage
      title="EmptyState"
      description="Placeholder view when a dataset or search returns no primary content."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4117"
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
                    <EmptyState
                      title={title}
                      description={description.trim() || undefined}
                      variant={variant}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'title', label: 'title', default: 'No pilots yet' },
                      { type: 'text', key: 'description', label: 'description', default: 'Create a pilot…' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'default',
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
              code: '<EmptyState title="Nothing here yet" description="Adjust filters or add a record." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <EmptyState title="Nothing here yet" description="Adjust filters or add a record." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Search',
              background: 'grid',
              center: true,
              code: '<EmptyState variant="search" title="No matches" description="Try broader keywords." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <EmptyState variant="search" title="No matches" description="Try broader keywords." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: true,
              code: '<EmptyState variant="error" title="Could not load pilots" description="Refresh or contact support." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <EmptyState
                    variant="error"
                    title="Could not load pilots"
                    description="Refresh or contact support."
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: true,
              code: '<EmptyState variant="success" title="Export complete" description="Check your downloads folder." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <EmptyState
                    variant="success"
                    title="Export complete"
                    description="Check your downloads folder."
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'With action',
              background: 'grid',
              center: true,
              code: `<EmptyState
  title="No scorecard"
  description="Generate one from the pilot dashboard."
  action={<Button type="default" label="Create scorecard" />}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <EmptyState
                    title="No scorecard"
                    description="Generate one from the pilot dashboard."
                    action={<Button type="default" label="Create scorecard" />}
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
          code={`import { EmptyState } from './components/molecules/EmptyState/EmptyState'

<EmptyState variant="search" title="No rows" action={<Button label="Clear filters" type="outlined" />} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Heading text.', required: true },
            { name: 'description', type: 'string', description: 'Supporting sentence.', required: false },
            {
              name: 'variant',
              type: "'default' | 'search' | 'error' | 'success'",
              default: "'default'",
              description: 'Fallback icon tone.',
              required: false,
            },
            { name: 'icon', type: 'ReactNode', description: 'Replace default glyph.', required: false },
            { name: 'action', type: 'ReactNode', description: 'Primary CTA slot.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Explain what happened and the next step (filter, retry, create).',
              children: <EmptyState title="No data" description="Upload a CSV or connect your GIS feed." />,
            },
            {
              type: 'dont',
              description: "Don't leave the canvas completely blank without guidance.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Always include title + short description.</span>
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
              label: 'Heading',
              description: 'Title renders as h2 for landmark navigation.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
