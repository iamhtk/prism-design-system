import { useState } from 'react'
import { SocialButton } from '../../../components/molecules/SocialButton/SocialButton'
import type { SocialButtonProps } from '../../../components/molecules/SocialButton/SocialButton'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const five: SocialButtonProps['platform'][] = [
  'facebook',
  'twitter',
  'linkedin',
  'youtube',
  'instagram',
]

const variants = ['brand', 'primary', 'outlined'] as const
const sizes = ['xs', 'sm', 'md'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-400)', alignItems: 'center' }

const href = 'https://example.com'

export function SocialButtonPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>('brand')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')

  const patch = (key: string, val: unknown) => {
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'size') setSize(val as (typeof sizes)[number])
  }

  const values = { variant, size }
  const interactiveCode = five
    .map(
      (p) =>
        `<SocialButton platform="${p}" href="${href}" variant="${variant}" size="${size}" />`,
    )
    .join('\n')

  return (
    <DocsPage
      title="SocialButton"
      description="Icon-first links to CWPC social destinations with brand, primary, or outlined treatments."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4114"
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
                    <div style={row}>
                      {five.map((p) => (
                        <SocialButton key={p} platform={p} href={href} variant={variant} size={size} />
                      ))}
                    </div>
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
                        default: 'brand',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Brand',
              background: 'grid',
              center: true,
              code: five.map((p) => `<SocialButton platform="${p}" href="#" variant="brand" />`).join('\n'),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={row}>
                    {five.map((p) => (
                      <SocialButton key={p} platform={p} href={href} variant="brand" />
                    ))}
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Primary',
              background: 'grid',
              center: true,
              code: five.map((p) => `<SocialButton platform="${p}" href="#" variant="primary" />`).join('\n'),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={row}>
                    {five.map((p) => (
                      <SocialButton key={p} platform={p} href={href} variant="primary" />
                    ))}
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Outlined',
              background: 'grid',
              center: true,
              code: five.map((p) => `<SocialButton platform="${p}" href="#" variant="outlined" />`).join('\n'),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={row}>
                    {five.map((p) => (
                      <SocialButton key={p} platform={p} href={href} variant="outlined" />
                    ))}
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Small',
              background: 'grid',
              center: true,
              code: '<SocialButton platform="linkedin" href="#" size="sm" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <SocialButton platform="linkedin" href={href} size="sm" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Medium',
              background: 'grid',
              center: true,
              code: '<SocialButton platform="linkedin" href="#" size="md" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <SocialButton platform="linkedin" href={href} size="md" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { SocialButton } from './components/molecules/SocialButton/SocialButton'

<SocialButton platform="youtube" href="https://youtube.com/@cwpc" variant="brand" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            {
              name: 'platform',
              type: "'facebook' | 'twitter' | 'linkedin' | 'youtube' | 'instagram' | 'tiktok' | 'share'",
              description: 'Determines glyph and brand color.',
              required: true,
            },
            { name: 'href', type: 'string', description: 'Destination URL.', required: true },
            {
              name: 'variant',
              type: "'brand' | 'primary' | 'outlined'",
              default: "'brand'",
              description: 'Visual treatment.',
              required: false,
            },
            { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'md'", description: 'Hit target scale.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Link to official profiles and open in a new tab (component sets target blank + rel).',
              children: <SocialButton platform="twitter" href={href} variant="brand" />,
            },
            {
              type: 'dont',
              description: "Don't stack duplicate networks with different href targets in the same row.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>One canonical link per platform.</span>
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
              label: 'Labels',
              description: 'Each anchor exposes a descriptive aria-label for screen readers.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
