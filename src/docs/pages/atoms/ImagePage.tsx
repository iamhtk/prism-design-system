import { useState } from 'react'
import { Image } from '../../../components/atoms/Image/Image'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const aspectRatios = ['1/1', '16/9', '4/3', '3/2'] as const
const roundeds = ['none', 'sm', 'md', 'lg', 'full'] as const
const loadingOpts = ['lazy', 'eager'] as const

const DEMO_SRC = 'https://placehold.co/800x450/232329/FF6701/png?text=CWPC'

export function ImagePage() {
  const [ctrlAspect, setCtrlAspect] = useState<(typeof aspectRatios)[number]>('16/9')
  const [ctrlRounded, setCtrlRounded] = useState<(typeof roundeds)[number]>('md')
  const [ctrlLoading, setCtrlLoading] = useState<(typeof loadingOpts)[number]>('lazy')

  const patch = (key: string, val: unknown) => {
    if (key === 'aspectRatio') setCtrlAspect(val as (typeof aspectRatios)[number])
    if (key === 'rounded') setCtrlRounded(val as (typeof roundeds)[number])
    if (key === 'loading') setCtrlLoading(val as (typeof loadingOpts)[number])
  }

  const values = { aspectRatio: ctrlAspect, rounded: ctrlRounded, loading: ctrlLoading }

  const interactiveCode = `<Image
  src="${DEMO_SRC}"
  alt="CWPC placeholder"
  aspectRatio="${ctrlAspect}"
  rounded="${ctrlRounded}"
  loading="${ctrlLoading}"
/>`

  return (
    <DocsPage
      title="Image"
      description="Responsive figure with skeleton loading, rounded corners, and optional caption."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3015"
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
                    <Image
                      src={DEMO_SRC}
                      alt="CWPC placeholder"
                      aspectRatio={ctrlAspect}
                      rounded={ctrlRounded}
                      loading={ctrlLoading}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'aspectRatio',
                        label: 'aspectRatio',
                        options: [...aspectRatios],
                        default: '16/9',
                      },
                      {
                        type: 'select',
                        key: 'rounded',
                        label: 'rounded',
                        options: [...roundeds],
                        default: 'md',
                      },
                      {
                        type: 'select',
                        key: 'loading',
                        label: 'loading',
                        options: [...loadingOpts],
                        default: 'lazy',
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
              code: `<Image
  src="${DEMO_SRC}"
  alt="CWPC marketing visual"
  rounded="md"
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Image src={DEMO_SRC} alt="CWPC marketing visual" rounded="md" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Aspect ratios',
              background: 'grid',
              center: true,
              code: `<Image src="..." alt="Square" aspectRatio="1/1" />
<Image src="..." alt="Video" aspectRatio="16/9" />
<Image src="..." alt="Standard" aspectRatio="4/3" />
<Image src="..." alt="Photo" aspectRatio="3/2" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: 'var(--space-500)',
                    }}
                  >
                    <Image src={DEMO_SRC} alt="Square" aspectRatio="1/1" rounded="md" />
                    <Image src={DEMO_SRC} alt="Video" aspectRatio="16/9" rounded="md" />
                    <Image src={DEMO_SRC} alt="Standard" aspectRatio="4/3" rounded="md" />
                    <Image src={DEMO_SRC} alt="Photo" aspectRatio="3/2" rounded="md" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Rounded',
              background: 'grid',
              center: true,
              code: `<Image src="..." alt="None" rounded="none" />
<Image src="..." alt="Small" rounded="sm" />
<Image src="..." alt="Large" rounded="lg" />
<Image src="..." alt="Full" rounded="full" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: 'var(--space-500)',
                    }}
                  >
                    <Image src={DEMO_SRC} alt="None" aspectRatio="1/1" rounded="none" />
                    <Image src={DEMO_SRC} alt="Small" aspectRatio="1/1" rounded="sm" />
                    <Image src={DEMO_SRC} alt="Large" aspectRatio="1/1" rounded="lg" />
                    <Image src={DEMO_SRC} alt="Full" aspectRatio="1/1" rounded="full" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With Caption',
              background: 'grid',
              center: true,
              code: `<Image
  src="${DEMO_SRC}"
  alt="CWPC field team"
  caption="Fuel reduction crew during a CWPC pilot treatment day."
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Image
                    src={DEMO_SRC}
                    alt="CWPC field team"
                    caption="Fuel reduction crew during a CWPC pilot treatment day."
                    aspectRatio="16/9"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Loading',
              background: 'grid',
              center: true,
              code: `<Image
  src="${DEMO_SRC}"
  alt="Demonstrates skeleton while the asset loads"
  loading="eager"
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Image
                    src={DEMO_SRC}
                    alt="Demonstrates skeleton while the asset loads"
                    loading="eager"
                    aspectRatio="16/9"
                  />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Image } from './components/atoms/Image/Image'

<Image
  src="/media/pilot-crew.jpg"
  alt="Pilot crew briefing"
  aspectRatio="16/9"
  caption="Morning safety briefing before treatments."
/>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'src', type: 'string', description: 'Image URL.', required: true },
            { name: 'alt', type: 'string', description: 'Accessible description.', required: true },
            { name: 'caption', type: 'string', description: 'Optional figcaption.', required: false },
            { name: 'aspectRatio', type: "'1/1' | '16/9' | '4/3' | '3/2'", description: 'Locks responsive ratio.', required: false },
            { name: 'rounded', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Corner radius.', required: false },
            { name: 'loading', type: "'lazy' | 'eager'", default: "'lazy'", description: 'Passed to the native img element.', required: false },
            { name: 'width', type: 'string', description: 'Optional CSS width.', required: false },
            { name: 'height', type: 'string', description: 'Optional CSS height.', required: false },
            { name: 'objectFit', type: "'cover' | 'contain' | 'fill'", default: "'cover'", description: 'Object fit for the image.', required: false },
            { name: 'fallback', type: 'string', description: 'Alternate src after an error.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Always set meaningful alt text that describes the scene, not the file name.',
              children: (
                <Image
                  src={DEMO_SRC}
                  alt="CWPC crew reviewing a fuel treatment map on a tablet"
                  aspectRatio="16/9"
                  rounded="md"
                />
              ),
            },
            {
              type: 'dont',
              description: "Don't ship decorative-only images with empty alt when they convey information.",
              children: <Image src={DEMO_SRC} alt="" aspectRatio="16/9" rounded="md" />,
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
              label: 'Figure',
              description: 'Caption renders in figcaption associated with the image in the accessibility tree.',
            },
            {
              type: 'color',
              label: 'Errors',
              description: 'Failed loads show a non-text icon state; pair with nearby textual context when possible.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
