import { useState } from 'react'
import { Avatar, AvatarGroup } from '../../../components/atoms/Avatar/Avatar'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const shapes = ['circle', 'square'] as const
const statusOpts = ['none', 'online', 'offline', 'away'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-400)', alignItems: 'center' }

function statusVal(s: (typeof statusOpts)[number]): 'online' | 'offline' | 'away' | undefined {
  if (s === 'none') return undefined
  return s
}

export function AvatarPage() {
  const [name, setName] = useState('Alex Morgan')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [variant, setVariant] = useState<(typeof shapes)[number]>('circle')
  const [status, setStatus] = useState<(typeof statusOpts)[number]>('none')

  const patch = (key: string, val: unknown) => {
    if (key === 'name') setName(String(val))
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'variant') setVariant(val as (typeof shapes)[number])
    if (key === 'status') setStatus(val as (typeof statusOpts)[number])
  }

  const values = { name, size, variant, status }
  const st = statusVal(status)
  const statusLine = st ? `\n  status="${st}"` : ''

  const interactiveCode = `<Avatar
  name="${name.replace(/"/g, '\\"')}"
  size="${size}"
  variant="${variant}"${statusLine}
/>`

  return (
    <DocsPage
      title="Avatar"
      description="Initials or image avatar with optional presence indicator and stacked groups."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3009"
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
                    <Avatar name={name} size={size} variant={variant} status={st} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'name', label: 'name', default: 'Alex Morgan' },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...shapes],
                        default: 'circle',
                      },
                      {
                        type: 'select',
                        key: 'status',
                        label: 'status',
                        options: [...statusOpts],
                        default: 'none',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'All sizes',
              background: 'grid',
              center: true,
              code: `<Avatar name="CW" size="xs" />
<Avatar name="CW" size="sm" />
<Avatar name="CW" size="md" />
<Avatar name="CW" size="lg" />
<Avatar name="CW" size="xl" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Avatar name="CW" size="xs" />
                    <Avatar name="CW" size="sm" />
                    <Avatar name="CW" size="md" />
                    <Avatar name="CW" size="lg" />
                    <Avatar name="CW" size="xl" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With initials',
              background: 'grid',
              center: true,
              code: `<Avatar name="Ava Chen" />
<Avatar name="Ben Ortiz" />
<Avatar name="Casey Kim" />
<Avatar name="Dana Singh" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Avatar name="Ava Chen" />
                    <Avatar name="Ben Ortiz" />
                    <Avatar name="Casey Kim" />
                    <Avatar name="Dana Singh" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With status',
              background: 'grid',
              center: true,
              code: `<Avatar name="Online" status="online" />
<Avatar name="Offline" status="offline" />
<Avatar name="Away" status="away" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={row}>
                    <Avatar name="Online" status="online" />
                    <Avatar name="Offline" status="offline" />
                    <Avatar name="Away" status="away" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'AvatarGroup',
              background: 'grid',
              center: true,
              code: `<AvatarGroup
  max={4}
  avatars={[
    { name: 'A' }, { name: 'B' }, { name: 'C' },
    { name: 'D' }, { name: 'E' }, { name: 'F' },
  ]}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <AvatarGroup
                    max={4}
                    avatars={[
                      { name: 'Ava' },
                      { name: 'Ben' },
                      { name: 'Casey' },
                      { name: 'Dana' },
                      { name: 'Eli' },
                      { name: 'Flo' },
                    ]}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Square',
              background: 'grid',
              center: true,
              code: '<Avatar name="CWPC" variant="square" size="lg" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Avatar name="CWPC" variant="square" size="lg" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Avatar, AvatarGroup } from './components/atoms/Avatar/Avatar'

<Avatar name="Jordan Lee" size="md" status="online" />`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'name', type: 'string', description: 'Derives initials when no image.', required: false },
            { name: 'src', type: 'string', description: 'Image URL.', required: false },
            { name: 'alt', type: 'string', description: 'Alt text for images.', required: false },
            {
              name: 'size',
              type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'presenter'",
              default: "'md'",
              description: 'Visual scale.',
              required: false,
            },
            { name: 'variant', type: "'circle' | 'square'", default: "'circle'", description: 'Shape.', required: false },
            {
              name: 'status',
              type: "'online' | 'offline' | 'away'",
              description: 'Optional presence dot.',
              required: false,
            },
            { name: 'className', type: 'string', description: 'Extra classes.', required: false },
            {
              name: 'AvatarGroup — avatars',
              type: 'AvatarProps[]',
              description: 'Stacked avatars; each item spreads into Avatar.',
              required: true,
            },
            {
              name: 'AvatarGroup — max',
              type: 'number',
              default: '4',
              description: 'Visible avatars before a +N overflow chip.',
              required: false,
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Provide name (or alt with src) so assistive tech has a meaningful label.',
              children: <Avatar name="Taylor Reed" />,
            },
            {
              type: 'dont',
              description: "Don't ship avatars with neither name nor image without an explicit alt strategy.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Empty avatar — avoid</span>
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
              label: 'Name',
              description: 'Initials avatars expose aria-label from the name prop.',
            },
            {
              type: 'color',
              label: 'Status',
              description: 'Presence dots supplement text; do not rely on color alone in surrounding UI.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
