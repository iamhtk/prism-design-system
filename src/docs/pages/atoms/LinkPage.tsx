import { useState } from 'react'
import { Link } from '../../../components/atoms/Link/Link'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['default', 'primary'] as const
const underlines = ['always', 'hover', 'never'] as const

export function LinkPage() {
  const [href, setHref] = useState('#')
  const [linkText, setLinkText] = useState('View scorecard')
  const [variant, setVariant] = useState<(typeof variants)[number]>('default')
  const [underline, setUnderline] = useState<(typeof underlines)[number]>('hover')
  const [external, setExternal] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'href') setHref(String(val))
    if (key === 'children') setLinkText(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'underline') setUnderline(val as (typeof underlines)[number])
    if (key === 'external') setExternal(Boolean(val))
    if (key === 'disabled') setDisabled(Boolean(val))
  }

  const values = { href, children: linkText, variant, underline, external, disabled }

  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const interactiveCode = `<Link
  href="${esc(href)}"
  variant="${variant}"
  underline="${underline}"
  external={${external}}
  disabled={${disabled}}
>
  ${linkText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
</Link>`

  return (
    <DocsPage
      title="Link"
      description="Text links for navigation and inline references, with optional external and disabled styles."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3004"
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
                    <Link
                      href={href}
                      variant={variant}
                      underline={underline}
                      external={external}
                      disabled={disabled}
                    >
                      {linkText}
                    </Link>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'href', label: 'href', default: '#' },
                      { type: 'text', key: 'children', label: 'children', default: 'View scorecard' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'underline',
                        label: 'underline',
                        options: [...underlines],
                        default: 'hover',
                      },
                      { type: 'boolean', key: 'external', label: 'external', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<Link href="#" variant="default">Default link</Link>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Link href="#" variant="default">
                    Default link
                  </Link>
                </ComponentDemo>
              ),
            },
            {
              label: 'Primary',
              background: 'grid',
              center: true,
              code: '<Link href="#" variant="primary">Primary link</Link>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Link href="#" variant="primary">
                    Primary link
                  </Link>
                </ComponentDemo>
              ),
            },
            {
              label: 'Underline always',
              background: 'grid',
              center: true,
              code: '<Link href="#" underline="always">Always underlined</Link>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Link href="#" underline="always">
                    Always underlined
                  </Link>
                </ComponentDemo>
              ),
            },
            {
              label: 'Underline hover',
              background: 'grid',
              center: true,
              code: '<Link href="#" underline="hover">Underline on hover</Link>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Link href="#" underline="hover">
                    Underline on hover
                  </Link>
                </ComponentDemo>
              ),
            },
            {
              label: 'External',
              background: 'grid',
              center: true,
              code: '<Link href="https://cwpc.org" external>Open CWPC</Link>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Link href="https://cwpc.org" external>
                    Open CWPC
                  </Link>
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: '<Link href="#" disabled>Unavailable</Link>',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Link href="#" disabled>
                    Unavailable
                  </Link>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Link } from './components/atoms/Link/Link'

<Link href="/scorecard" variant="primary">
  View scorecard
</Link>`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'href', type: 'string', description: 'Destination URL.', required: true },
            { name: 'children', type: 'ReactNode', description: 'Link content.', required: true },
            {
              name: 'variant',
              type: "'default' | 'primary'",
              default: "'default'",
              description: 'Color treatment.',
              required: false,
            },
            {
              name: 'underline',
              type: "'always' | 'hover' | 'never'",
              default: "'hover'",
              description: 'Underline behavior.',
              required: false,
            },
            { name: 'external', type: 'boolean', default: 'false', description: 'Opens in a new tab with rel security.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Renders as non-interactive text.', required: false },
            { name: 'className', type: 'string', description: 'Extra classes on the anchor.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use descriptive link text (e.g. “View scorecard”).',
              children: <Link href="#">View scorecard</Link>,
            },
            {
              type: 'do',
              description: 'Use external for outbound URLs that open in a new tab.',
              children: (
                <Link href="https://example.com" external>
                  External resource
                </Link>
              ),
            },
            {
              type: 'dont',
              description: "Don't use links for destructive or primary actions—use Button.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>
                  Prefer &lt;Button&gt; for “Delete all data”
                </span>
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
              label: 'Keyboard',
              description: 'Links are in tab order; activate with Enter.',
            },
            {
              type: 'focus',
              label: 'Focus',
              description: 'Focus styles match interactive token outlines.',
            },
            {
              type: 'aria',
              label: 'External',
              description: 'External links set target and rel; supplement with visible hint if needed.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
