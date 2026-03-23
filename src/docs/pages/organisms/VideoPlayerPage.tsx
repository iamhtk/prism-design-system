import { useState } from 'react'
import { VideoPlayer } from '../../../components/organisms/VideoPlayer/VideoPlayer'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sampleMp4 =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const posterUrl =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'

export function VideoPlayerPage() {
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(true)

  const patch = (key: string, val: unknown) => {
    if (key === 'autoplay') setAutoplay(Boolean(val))
    if (key === 'loop') setLoop(Boolean(val))
    if (key === 'muted') setMuted(Boolean(val))
  }

  const values = { autoplay, loop, muted }

  const interactiveCode = `<VideoPlayer
  src="${sampleMp4}"
  title="CWPC sample clip"
  autoplay={${autoplay}}
  loop={${loop}}
  muted={${muted}}
/>`

  return (
    <DocsPage
      title="Video Player"
      description="Custom chrome video surface with seek, volume, and fullscreen."
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
                    <VideoPlayer
                      src={sampleMp4}
                      title="CWPC sample clip"
                      autoplay={autoplay}
                      loop={loop}
                      muted={muted}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'boolean', key: 'autoplay', label: 'autoplay', default: false },
                      { type: 'boolean', key: 'loop', label: 'loop', default: false },
                      { type: 'boolean', key: 'muted', label: 'muted', default: true },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default Placeholder',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: '<VideoPlayer title="Awaiting media URL" />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <VideoPlayer title="Awaiting media URL" />
                </ComponentDemo>
              ),
            },
            {
              label: 'With Poster',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<VideoPlayer
  src="${sampleMp4}"
  poster="${posterUrl}"
  title="Pilot story"
  muted
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <VideoPlayer src={sampleMp4} poster={posterUrl} title="Pilot story" muted />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { VideoPlayer } from './components/organisms/VideoPlayer/VideoPlayer'

<VideoPlayer src={url} poster={thumb} title="Session" autoplay loop muted />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'src', type: 'string', description: 'Video URL; empty shows placeholder.', required: false },
            { name: 'poster', type: 'string', description: 'Poster frame.', required: false },
            { name: 'title', type: 'string', description: 'Accessible name.', required: false },
            { name: 'autoplay', type: 'boolean', default: 'false', description: 'Start on load.', required: false },
            { name: 'loop', type: 'boolean', default: 'false', description: 'Repeat playback.', required: false },
            { name: 'muted', type: 'boolean', default: 'false', description: 'Initial mute.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
