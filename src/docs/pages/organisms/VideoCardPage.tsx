import { useState } from 'react'
import { VideoCard } from '../../../components/organisms/VideoCard/VideoCard'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const thumb =
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80'

export function VideoCardPage() {
  const [title, setTitle] = useState('Fuel breaks that scale with communities')
  const [presenterName, setPresenterName] = useState('Riley Chen')
  const [duration, setDuration] = useState('18:42')
  const [ctaLabel, setCtaLabel] = useState('View presentation')

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'presenterName') setPresenterName(String(val))
    if (key === 'duration') setDuration(String(val))
    if (key === 'ctaLabel') setCtaLabel(String(val))
  }

  const values = { title, presenterName, duration, ctaLabel }

  const presenterLine =
    presenterName.trim().length > 0
      ? `
  presenterName="${presenterName.replace(/"/g, '\\"')}"
  presenterRole="CWPC pilot mentor"`
      : ''

  const durationLine =
    duration.trim().length > 0
      ? `
  duration="${duration.replace(/"/g, '\\"')}"`
      : ''

  const interactiveCode = `<VideoCard
  title="${title.replace(/"/g, '\\"')}"${presenterLine}${durationLine}
  thumbnailSrc="${thumb}"
  videoUrl="https://example.com/session"
  ctaLabel="${ctaLabel.replace(/"/g, '\\"')}"
  onCtaClick={() => {}}
/>`

  return (
    <DocsPage
      title="Video Card"
      description="Session tile with play control, presenter row, and CTA."
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
                    <VideoCard
                      title={title}
                      presenterName={presenterName.trim() || undefined}
                      presenterRole="CWPC pilot mentor"
                      duration={duration.trim() || undefined}
                      thumbnailSrc={thumb}
                      videoUrl="https://example.com/session"
                      ctaLabel={ctaLabel}
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
                        default: 'Fuel breaks that scale with communities',
                      },
                      { type: 'text', key: 'presenterName', label: 'presenterName', default: 'Riley Chen' },
                      { type: 'text', key: 'duration', label: 'duration', default: '18:42' },
                      { type: 'text', key: 'ctaLabel', label: 'ctaLabel', default: 'View presentation' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'With Presenter',
              background: 'grid',
              center: false,
              code: `<VideoCard
  title="Scorecard deep dive"
  presenterName="Jamie Ortiz"
  presenterRole="Data lead"
  duration="24:10"
  thumbnailSrc={thumbUrl}
  videoUrl="https://example.com/watch"
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <VideoCard
                    title="Scorecard deep dive"
                    presenterName="Jamie Ortiz"
                    presenterRole="Data lead"
                    duration="24:10"
                    thumbnailSrc={thumb}
                    videoUrl="https://example.com/watch"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Thumbnail Only',
              background: 'grid',
              center: false,
              code: `<VideoCard title="Community office hours recording" thumbnailSrc={thumbUrl} />`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <VideoCard title="Community office hours recording" thumbnailSrc={thumb} />
                </ComponentDemo>
              ),
            },
            {
              label: 'No Thumbnail',
              background: 'grid',
              center: false,
              code: `<VideoCard title="Placeholder session" presenterName="CWPC Staff" />`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <VideoCard title="Placeholder session" presenterName="CWPC Staff" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { VideoCard } from './components/organisms/VideoCard/VideoCard'

<VideoCard title="…" thumbnailSrc={url} videoUrl={url} onPlay={() => {}} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Session title.', required: true },
            { name: 'thumbnailSrc', type: 'string', description: 'Poster image.', required: false },
            { name: 'videoUrl', type: 'string', description: 'Opens when play is pressed.', required: false },
            { name: 'presenterName', type: 'string', description: 'Presenter line.', required: false },
            { name: 'presenterRole', type: 'string', description: 'Subtitle under presenter.', required: false },
            { name: 'presenterAvatarSrc', type: 'string', description: 'Avatar image.', required: false },
            { name: 'duration', type: 'string', description: 'Badge on thumbnail.', required: false },
            { name: 'ctaLabel', type: 'string', default: "'View Presentation'", description: 'Text CTA.', required: false },
            { name: 'onCtaClick', type: '() => void', description: 'Secondary action.', required: false },
            { name: 'onPlay', type: '() => void', description: 'Before navigation.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
