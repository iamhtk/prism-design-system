import { useState } from 'react'
import { AccordionItem } from '../../../components/organisms/AccordionItem/AccordionItem'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const col = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--space-400)', width: '100%' }

export function AccordionPage() {
  const [title, setTitle] = useState('Who can access pilot data?')
  const [body, setBody] = useState(
    'County leads, CWPC reviewers, and designated agency partners listed in your data-sharing agreement.',
  )
  const [defaultOpen, setDefaultOpen] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'body') setBody(String(val))
    if (key === 'defaultOpen') setDefaultOpen(Boolean(val))
  }

  const values = { title, body, defaultOpen }
  const openLine = defaultOpen ? '\n  defaultOpen' : ''
  const interactiveCode = `<AccordionItem
  title="${title.replace(/"/g, '\\"')}"
  body="${body.replace(/"/g, '\\"').slice(0, 80)}…"${openLine}
/>`

  return (
    <DocsPage
      title="AccordionItem"
      description="Expandable panel for FAQs and secondary detail that should not dominate the page."
      category="Organisms"
      status="stable"
      figmaNodeId="351:5001"
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
                    <AccordionItem
                      key={`${title}-${body}-${defaultOpen}`}
                      title={title}
                      body={body}
                      defaultOpen={defaultOpen}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'title', label: 'title', default: 'Who can access pilot data?' },
                      { type: 'text', key: 'body', label: 'body', default: 'County leads…' },
                      { type: 'boolean', key: 'defaultOpen', label: 'defaultOpen', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Collapsed',
              background: 'grid',
              center: true,
              code: '<AccordionItem title="Funding timeline" body="Q1 intake, Q2 pilots, Q3 reporting." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <AccordionItem
                    title="Funding timeline"
                    body="Q1 intake, Q2 pilots, Q3 reporting."
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Expanded',
              background: 'grid',
              center: true,
              code: '<AccordionItem title="Scorecard cadence" body="…" defaultOpen />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <AccordionItem
                    title="Scorecard cadence"
                    body="Exports refresh nightly; manual sync is available to county admins."
                    defaultOpen
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Group',
              background: 'grid',
              center: true,
              code: `{items.map((item) => (
  <AccordionItem key={item.title} title={item.title} body={item.body} />
))}`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={col}>
                    <AccordionItem title="Eligibility" body="Counties with signed MOUs may enroll." />
                    <AccordionItem title="Data retention" body="Raw files are purged after 24 months unless extended." />
                    <AccordionItem title="Support" body="Email pilots@cwpc.org for access issues." />
                  </div>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { AccordionItem } from './components/organisms/AccordionItem/AccordionItem'

<AccordionItem title="FAQ" body="Answer text…" defaultOpen />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Header button text.', required: true },
            { name: 'body', type: 'string', description: 'Expanded region copy.', required: true },
            { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial expanded state.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use for long FAQ answers and policy detail that would clutter the main column.',
              children: <AccordionItem title="Sample" body="Collapsed by default." />,
            },
            {
              type: 'dont',
              description: "Don't hide mission-critical warnings only inside a collapsed accordion.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Surface urgent info above the fold.</span>
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
              label: 'Toggle',
              description: 'Header is a button; Enter and Space expand or collapse the region.',
            },
            {
              type: 'aria',
              label: 'State',
              description: 'aria-expanded and aria-controls link the button to the content region.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
