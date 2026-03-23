import { useState } from 'react'
import { Skeleton } from '../../../components/atoms/Skeleton/Skeleton'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const skVariants = ['text', 'circle', 'rectangle', 'card'] as const

export function SkeletonPage() {
  const [variant, setVariant] = useState<(typeof skVariants)[number]>('text')
  const [animated, setAnimated] = useState(true)
  const [lines, setLines] = useState(3)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'variant') setVariant(val as (typeof skVariants)[number])
    if (key === 'animated') setAnimated(Boolean(val))
    if (key === 'lines') setLines(Number(val))
    if (key === 'width') setWidth(String(val))
    if (key === 'height') setHeight(String(val))
  }

  const values = { variant, animated, lines, width, height }
  const w = width.trim() ? `\n  width="${width.replace(/"/g, '\\"')}"` : ''
  const h = height.trim() ? `\n  height="${height.replace(/"/g, '\\"')}"` : ''
  const ln = variant === 'text' && lines !== 1 ? `\n  lines={${lines}}` : ''

  const interactiveCode = `<Skeleton
  variant="${variant}"
  animated={${animated}}${ln}${w}${h}
/>`

  return (
    <DocsPage
      title="Skeleton"
      description="Placeholder shimmer while content shape is known but data is not ready."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3010"
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
                    <Skeleton
                      variant={variant}
                      animated={animated}
                      lines={variant === 'text' ? lines : 1}
                      width={width.trim() || undefined}
                      height={height.trim() || undefined}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...skVariants],
                        default: 'text',
                      },
                      { type: 'boolean', key: 'animated', label: 'animated', default: true },
                      {
                        type: 'number',
                        key: 'lines',
                        label: 'lines',
                        default: 3,
                        min: 1,
                        max: 5,
                        step: 1,
                      },
                      { type: 'text', key: 'width', label: 'width', default: '' },
                      { type: 'text', key: 'height', label: 'height', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Text',
              background: 'grid',
              center: true,
              code: '<Skeleton variant="text" lines={3} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Skeleton variant="text" lines={3} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Circle',
              background: 'grid',
              center: true,
              code: '<Skeleton variant="circle" width="48px" height="48px" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Skeleton variant="circle" width="48px" height="48px" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Rectangle',
              background: 'grid',
              center: true,
              code: '<Skeleton variant="rectangle" width="200px" height="120px" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <Skeleton variant="rectangle" width="200px" height="120px" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Card',
              background: 'grid',
              center: true,
              code: '<Skeleton variant="card" width="100%" height="160px" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Skeleton variant="card" width="100%" height="160px" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Static',
              background: 'grid',
              center: true,
              code: '<Skeleton variant="text" lines={2} animated={false} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Skeleton variant="text" lines={2} animated={false} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Skeleton } from './components/atoms/Skeleton/Skeleton'

{loading ? <Skeleton variant="card" height="200px" /> : <Card data={data} />}`}
        />
      </DocsSection>

      <DocsSection title="Props">
        <PropsTable
          props={[
            {
              name: 'variant',
              type: "'text' | 'circle' | 'rectangle' | 'card'",
              default: "'text'",
              description: 'Shape preset.',
              required: false,
            },
            { name: 'lines', type: 'number', default: '1', description: 'Line count for text variant.', required: false },
            { name: 'animated', type: 'boolean', default: 'true', description: 'Shimmer animation.', required: false },
            { name: 'width', type: 'string', description: 'CSS width.', required: false },
            { name: 'height', type: 'string', description: 'CSS height.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Match skeleton geometry to the content that will replace it.',
              children: <Skeleton variant="text" lines={2} width="80%" />,
            },
            {
              type: 'dont',
              description: "Don't show skeletons for flashes shorter than ~300ms.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Prefer instant render</span>
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
              label: 'Decoration',
              description: 'Treat as visual placeholder; avoid implying interactive controls.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
