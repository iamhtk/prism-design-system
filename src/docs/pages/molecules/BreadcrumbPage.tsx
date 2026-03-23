import { useState } from 'react'
import { Breadcrumb } from '../../../components/molecules/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../components/molecules/Breadcrumb/Breadcrumb'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const seps = ['/', '>'] as const

const itemsSlash: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Scorecard', href: '#' },
  { label: 'Download' },
]

const itemsGt: BreadcrumbItem[] = [
  { label: 'Library', href: '#' },
  { label: 'Wildfire prevention', href: '#' },
  { label: 'CWPC overview' },
]

const itemsSingle: BreadcrumbItem[] = [{ label: 'Dashboard' }]

const itemsLong: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Programs', href: '#' },
  { label: 'Pilots', href: '#' },
  { label: 'Maricopa treatment plan' },
]

export function BreadcrumbPage() {
  const [separator, setSeparator] = useState<(typeof seps)[number]>('/')

  const patch = (key: string, val: unknown) => {
    if (key === 'separator') setSeparator(val as (typeof seps)[number])
  }

  const values = { separator }
  const interactiveCode = `<Breadcrumb
  separator="${separator}"
  items={[
    { label: 'Home', href: '/' },
    { label: 'Scorecard', href: '/scorecard' },
    { label: 'Download' },
  ]}
/>`

  return (
    <DocsPage
      title="Breadcrumb"
      description="Shows hierarchy from site root to the current page with optional links on parents."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4108"
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
                    <Breadcrumb separator={separator} items={itemsSlash} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'separator',
                        label: 'separator',
                        options: [...seps],
                        default: '/',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Slash trail',
              background: 'grid',
              center: true,
              code: `<Breadcrumb
  separator="/"
  items={[
    { label: 'Home', href: '/' },
    { label: 'Scorecard', href: '/scorecard' },
    { label: 'Download' },
  ]}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Breadcrumb separator="/" items={itemsSlash} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Chevron trail',
              background: 'grid',
              center: true,
              code: '<Breadcrumb separator=">" items={[...]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Breadcrumb separator=">" items={itemsGt} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Single level',
              background: 'grid',
              center: true,
              code: '<Breadcrumb items={[{ label: "Dashboard" }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Breadcrumb items={itemsSingle} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Long trail',
              background: 'grid',
              center: true,
              code: '<Breadcrumb items={fourLevels} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Breadcrumb items={itemsLong} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Breadcrumb } from './components/molecules/Breadcrumb/Breadcrumb'

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Scorecard', href: '/scorecards' },
    { label: 'Export' },
  ]}
/>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            {
              name: 'items',
              type: 'BreadcrumbItem[]',
              description: 'Each item can include href except the current page.',
              required: true,
            },
            { name: 'separator', type: "'/' | '>'", default: "'/'", description: 'Visual divider between levels.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Keep the last crumb as plain text with aria-current="page".',
              children: <Breadcrumb items={itemsSlash} />,
            },
            {
              type: 'dont',
              description: "Don't show breadcrumbs on shallow landing pages with no parents.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Skip on single-level marketing heroes.</span>
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
              label: 'Landmark',
              description: 'Wrapped in nav with aria-label="Breadcrumb".',
            },
            {
              type: 'aria',
              label: 'Current page',
              description: 'Final item uses aria-current="page".',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
