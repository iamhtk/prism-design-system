import { useState } from 'react'
import { Pagination } from '../../../components/molecules/Pagination/Pagination'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(3)
  const [totalPages, setTotalPages] = useState(10)
  const [showFirstLast, setShowFirstLast] = useState(false)
  const [siblingCount, setSiblingCount] = useState(1)

  const patch = (key: string, val: unknown) => {
    if (key === 'currentPage') setCurrentPage(Number(val))
    if (key === 'totalPages') setTotalPages(Number(val))
    if (key === 'showFirstLast') setShowFirstLast(Boolean(val))
    if (key === 'siblingCount') setSiblingCount(Number(val))
  }

  const values = { currentPage, totalPages, showFirstLast, siblingCount }
  const interactiveCode = `<Pagination
  currentPage={${currentPage}}
  totalPages={${totalPages}}
  onChange={setCurrentPage}
  showFirstLast={${showFirstLast}}
  siblingCount={${siblingCount}}
/>`

  return (
    <DocsPage
      title="Pagination"
      description="Numeric pager for long tables and search results with optional first/last shortcuts."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4115"
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
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onChange={setCurrentPage}
                      showFirstLast={showFirstLast}
                      siblingCount={siblingCount}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'number',
                        key: 'currentPage',
                        label: 'currentPage',
                        default: 3,
                        min: 1,
                        max: 50,
                        step: 1,
                      },
                      {
                        type: 'number',
                        key: 'totalPages',
                        label: 'totalPages',
                        default: 10,
                        min: 1,
                        max: 50,
                        step: 1,
                      },
                      { type: 'boolean', key: 'showFirstLast', label: 'showFirstLast', default: false },
                      {
                        type: 'number',
                        key: 'siblingCount',
                        label: 'siblingCount',
                        default: 1,
                        min: 0,
                        max: 2,
                        step: 1,
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
              code: '<Pagination currentPage={3} totalPages={10} onChange={setPage} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Pagination currentPage={3} totalPages={10} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'First page',
              background: 'grid',
              center: true,
              code: '<Pagination currentPage={1} totalPages={10} onChange={setPage} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Pagination currentPage={1} totalPages={10} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Last page',
              background: 'grid',
              center: true,
              code: '<Pagination currentPage={10} totalPages={10} onChange={setPage} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Pagination currentPage={10} totalPages={10} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'First & last',
              background: 'grid',
              center: true,
              code: '<Pagination currentPage={5} totalPages={12} onChange={setPage} showFirstLast />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Pagination currentPage={5} totalPages={12} onChange={() => {}} showFirstLast />
                </ComponentDemo>
              ),
            },
            {
              label: 'Few pages',
              background: 'grid',
              center: true,
              code: '<Pagination currentPage={2} totalPages={3} onChange={setPage} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Pagination currentPage={2} totalPages={3} onChange={() => {}} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Pagination } from './components/molecules/Pagination/Pagination'

<Pagination currentPage={page} totalPages={pages} onChange={setPage} showFirstLast />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'currentPage', type: 'number', description: 'Active page index (1-based).', required: true },
            { name: 'totalPages', type: 'number', description: 'Total page count.', required: true },
            { name: 'onChange', type: '(page: number) => void', description: 'Called when a page is chosen.', required: true },
            { name: 'showFirstLast', type: 'boolean', default: 'false', description: 'Adds jump-to-first/last controls.', required: false },
            { name: 'siblingCount', type: 'number', default: '1', description: 'Pages shown around current.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Highlight the active page and keep prev/next disabled at boundaries.',
              children: <Pagination currentPage={4} totalPages={9} onChange={() => {}} />,
            },
            {
              type: 'dont',
              description: "Don't paginate when only one page exists — show the full list.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Hide the nav when totalPages ≤ 1.</span>
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
              label: 'Navigation',
              description: 'nav uses aria-label="Pagination"; current page sets aria-current="page".',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
