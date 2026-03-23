import { useState } from 'react'
import { Navbar, type NavItem } from '../../../components/organisms/Navbar/Navbar'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Showcase', href: '/showcase', hasDropdown: true },
  { label: 'Scorecard', href: '/scorecard' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Community', href: '/community' },
]

const itemHrefs = navItems.map((i) => i.href)

export function NavbarPage() {
  const [activeHref, setActiveHref] = useState('/scorecard')

  const patch = (key: string, val: unknown) => {
    if (key === 'activeHref') setActiveHref(String(val))
  }

  const values = { activeHref }

  const interactiveCode = `const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Showcase', href: '/showcase', hasDropdown: true },
  { label: 'Scorecard', href: '/scorecard' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Community', href: '/community' },
]

<Navbar items={navItems} activeHref="${activeHref}" />`

  return (
    <DocsPage
      title="Navbar"
      description="Primary site header with logo and top-level navigation."
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
                    <Navbar items={navItems} activeHref={activeHref} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'activeHref',
                        label: 'activeHref',
                        options: itemHrefs,
                        default: '/scorecard',
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
              code: '<Navbar items={navItems} activeHref="/showcase" />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Navbar items={navItems} activeHref="/showcase" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Text Logo',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<Navbar items={navItems} />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Navbar items={navItems} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Navbar } from './components/organisms/Navbar/Navbar'

<Navbar items={items} activeHref={pathname} logoSrc={url} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'items', type: 'NavItem[]', description: 'Primary links.', required: true },
            { name: 'activeHref', type: 'string', description: 'Highlights matching href.', required: false },
            { name: 'logoSrc', type: 'string', description: 'Brand image; otherwise text mark.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
