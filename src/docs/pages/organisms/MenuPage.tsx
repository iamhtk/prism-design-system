import { useState } from 'react'
import { Menu } from '../../../components/organisms/Menu/Menu'
import { MenuItem } from '../../../components/organisms/Menu/MenuItem'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DocIconSearch } from '../../helpers/docsIcons'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['default', 'compact'] as const

export function MenuPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>('default')

  const patch = (key: string, val: unknown) => {
    if (key === 'variant') setVariant(val as (typeof variants)[number])
  }

  const values = { variant }

  const interactiveCode = `<Menu variant="${variant}">
  <MenuItem label="Showcase home" href="/showcase" active />
  <MenuItem label="Presentations" href="/showcase/presentations" />
  <MenuItem label="Innovations" href="/showcase/innovations" />
  <MenuItem label="Scorecard" href="/scorecard" badge={3} />
</Menu>`

  return (
    <DocsPage
      title="Menu"
      description="Vertical list of navigation rows with default or compact density."
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
              code: interactiveCode,
              children: (
                <>
                  <ComponentDemo padding="sm" background="transparent" fullWidth>
                    <Menu variant={variant}>
                      <MenuItem label="Showcase home" href="/showcase" active />
                      <MenuItem label="Presentations" href="/showcase/presentations" />
                      <MenuItem label="Innovations" href="/showcase/innovations" />
                      <MenuItem label="Scorecard" href="/scorecard" badge={3} />
                    </Menu>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
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
              center: false,
              code: `<Menu>
  <MenuItem label="Dashboard" href="#" active />
  <MenuItem label="Pilots" href="#" />
  <MenuItem label="Reports" href="#" />
</Menu>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Menu>
                    <MenuItem label="Dashboard" href="#" active />
                    <MenuItem label="Pilots" href="#" />
                    <MenuItem label="Reports" href="#" />
                  </Menu>
                </ComponentDemo>
              ),
            },
            {
              label: 'Compact',
              background: 'grid',
              center: false,
              code: `<Menu variant="compact">
  <MenuItem label="Settings" href="#" />
  <MenuItem label="Sign out" href="#" />
</Menu>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Menu variant="compact">
                    <MenuItem label="Settings" href="#" />
                    <MenuItem label="Sign out" href="#" />
                  </Menu>
                </ComponentDemo>
              ),
            },
            {
              label: 'With Icons',
              background: 'grid',
              center: false,
              code: `<Menu>
  <MenuItem label="Search library" href="#" iconLeft={<DocIconSearch />} />
  <MenuItem label="Saved views" href="#" iconLeft={<DocIconSearch />} />
</Menu>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Menu>
                    <MenuItem label="Search library" href="#" iconLeft={<DocIconSearch />} />
                    <MenuItem label="Saved views" href="#" iconLeft={<DocIconSearch />} />
                  </Menu>
                </ComponentDemo>
              ),
            },
            {
              label: 'With Disabled',
              background: 'grid',
              center: false,
              code: `<Menu>
  <MenuItem label="Available" href="#" />
  <MenuItem label="Coming soon" href="#" disabled />
</Menu>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Menu>
                    <MenuItem label="Available" href="#" />
                    <MenuItem label="Coming soon" href="#" disabled />
                  </Menu>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Menu } from './components/organisms/Menu/Menu'
import { MenuItem } from './components/organisms/Menu/MenuItem'

<Menu variant="compact">
  <MenuItem label="Home" href="/" active />
</Menu>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', description: 'MenuItem list.', required: true },
            { name: 'variant', type: "'default' | 'compact'", default: "'default'", description: 'Density context for items.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
