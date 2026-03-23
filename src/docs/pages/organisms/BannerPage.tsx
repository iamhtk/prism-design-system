import { useState } from 'react'
import { Banner } from '../../../components/organisms/Banner/Banner'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const hero =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80'

export function BannerPage() {
  const [title, setTitle] = useState('Prevent catastrophic wildfire together')
  const [subtitle, setSubtitle] = useState('CWPC pilots & scorecard')
  const [description, setDescription] = useState(
    'Join municipalities, tribes, and sponsors building measurable resilience.',
  )
  const [ctaLabel, setCtaLabel] = useState('Explore pilots')
  const [height, setHeight] = useState('320px')

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'subtitle') setSubtitle(String(val))
    if (key === 'description') setDescription(String(val))
    if (key === 'ctaLabel') setCtaLabel(String(val))
    if (key === 'height') setHeight(String(val))
  }

  const values = { title, subtitle, description, ctaLabel, height }

  const subLine = subtitle.trim() ? `\n  subtitle="${subtitle.replace(/"/g, '\\"')}"` : ''
  const descLine = description.trim() ? `\n  description="${description.replace(/"/g, '\\"')}"` : ''
  const ctaLine = ctaLabel.trim() ? `\n  ctaLabel="${ctaLabel.replace(/"/g, '\\"')}"` : ''
  const heightLine = height.trim() ? `\n  height="${height.replace(/"/g, '\\"')}"` : ''

  const interactiveCode = `<Banner
  imageSrc={heroUrl}
  title="${title.replace(/"/g, '\\"')}"${subLine}${descLine}${ctaLine}${heightLine}
  onCtaClick={() => {}}
/>`

  return (
    <DocsPage
      title="Banner"
      description="Hero banner with background media, overlay, and primary CTA."
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
                    <Banner
                      imageSrc={hero}
                      title={title}
                      subtitle={subtitle.trim() || undefined}
                      description={description.trim() || undefined}
                      ctaLabel={ctaLabel.trim() || undefined}
                      height={height.trim() || undefined}
                      onCtaClick={() => {}}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'text',
                        key: 'title',
                        label: 'title',
                        default: 'Prevent catastrophic wildfire together',
                      },
                      { type: 'text', key: 'subtitle', label: 'subtitle', default: 'CWPC pilots & scorecard' },
                      {
                        type: 'text',
                        key: 'description',
                        label: 'description',
                        default: 'Join municipalities, tribes, and sponsors building measurable resilience.',
                      },
                      { type: 'text', key: 'ctaLabel', label: 'ctaLabel', default: 'Explore pilots' },
                      { type: 'text', key: 'height', label: 'height', default: '320px' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'With Image',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<Banner
  imageSrc={heroUrl}
  subtitle="Showcase"
  title="Wildfire innovation week"
  description="Replay sessions from CWPC pilot communities."
  ctaLabel="Watch recordings"
  height="280px"
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Banner
                    imageSrc={hero}
                    subtitle="Showcase"
                    title="Wildfire innovation week"
                    description="Replay sessions from CWPC pilot communities."
                    ctaLabel="Watch recordings"
                    height="280px"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Fallback (no image)',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<Banner title="CWPC Scorecard" description="Download the latest regional benchmarks." ctaLabel="Get the scorecard" />`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Banner
                    title="CWPC Scorecard"
                    description="Download the latest regional benchmarks."
                    ctaLabel="Get the scorecard"
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
          code={`import { Banner } from './components/organisms/Banner/Banner'

<Banner imageSrc={url} title="…" ctaLabel="…" ctaHref="/pilots" height="360px" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Hero heading.', required: true },
            { name: 'subtitle', type: 'string', description: 'Eyebrow line.', required: false },
            { name: 'description', type: 'string', description: 'Supporting copy.', required: false },
            { name: 'imageSrc', type: 'string', description: 'Background photo.', required: false },
            { name: 'ctaLabel', type: 'string', description: 'Primary button label.', required: false },
            { name: 'ctaHref', type: 'string', description: 'Navigation target.', required: false },
            { name: 'onCtaClick', type: '() => void', description: 'Click handler before href.', required: false },
            { name: 'height', type: 'string', description: 'CSS height + min-height.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
