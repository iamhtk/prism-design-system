import { useState } from 'react'
import { SecondaryNav, type SecondaryNavItem } from '../../../components/organisms/SecondaryNav/SecondaryNav'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sectionItems: SecondaryNavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Pilots', href: '#pilots' },
  { label: 'Scorecard', href: '#scorecard' },
  { label: 'Resources', href: '#resources' },
]

const hrefs = sectionItems.map((i) => i.href)

export function SecondaryNavPage() {
  const [activeHref, setActiveHref] = useState('#scorecard')

  const patch = (key: string, val: unknown) => {
    if (key === 'activeHref') setActiveHref(String(val))
  }

  const values = { activeHref }

  const interactiveCode = `const sectionItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Pilots', href: '#pilots' },
  { label: 'Scorecard', href: '#scorecard' },
  { label: 'Resources', href: '#resources' },
]

<SecondaryNav items={sectionItems} activeHref="${activeHref}" />`

  return (
    <DocsPage
      title="Secondary Nav"
      description="In-page section tabs styled as a horizontal sub-navigation."
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
                    <SecondaryNav items={sectionItems} activeHref={activeHref} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'activeHref',
                        label: 'activeHref',
                        options: hrefs,
                        default: '#scorecard',
                      },
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
              code: '<SecondaryNav items={sectionItems} activeHref="#overview" />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <SecondaryNav items={sectionItems} activeHref="#overview" />
                </ComponentDemo>
              ),
            },
            {
              label: 'No Active',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<SecondaryNav items={sectionItems} />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <SecondaryNav items={sectionItems} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { SecondaryNav } from './components/organisms/SecondaryNav/SecondaryNav'

<SecondaryNav items={items} activeHref={hash} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'items', type: 'SecondaryNavItem[]', description: 'Section links.', required: true },
            { name: 'activeHref', type: 'string', description: 'Highlights matching href.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
