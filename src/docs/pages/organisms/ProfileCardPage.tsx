import { useState } from 'react'
import { ProfileCard } from '../../../components/organisms/ProfileCard/ProfileCard'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const thumb =
  'https://images.unsplash.com/photo-1504280390767-32e45670a35a?auto=format&fit=crop&w=640&q=80'

const variants = ['full', 'compact'] as const

export function ProfileCardPage() {
  const [name, setName] = useState('Jordan Lee')
  const [role, setRole] = useState('Pilot lead, CWPC North')
  const [variant, setVariant] = useState<(typeof variants)[number]>('full')
  const [ctaLabel, setCtaLabel] = useState('View presentation slides')
  const [description, setDescription] = useState('Focused on community fuels reduction and early detection.')

  const patch = (key: string, val: unknown) => {
    if (key === 'name') setName(String(val))
    if (key === 'role') setRole(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'ctaLabel') setCtaLabel(String(val))
    if (key === 'description') setDescription(String(val))
  }

  const values = { name, role, variant, ctaLabel, description }

  const descLine =
    description.trim().length > 0
      ? `
  description="${description.replace(/"/g, '\\"')}"`
      : ''

  const interactiveCode = `<ProfileCard
  name="${name.replace(/"/g, '\\"')}"
  role="${role.replace(/"/g, '\\"')}"
  variant="${variant}"
  ctaLabel="${ctaLabel.replace(/"/g, '\\"')}"${descLine}
  videoThumbnailSrc="${thumb}"
  onCtaClick={() => {}}
/>`

  return (
    <DocsPage
      title="Profile Card"
      description="Speaker or pilot profile with avatar, media, and CTA."
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
                    <ProfileCard
                      name={name}
                      role={role}
                      variant={variant}
                      ctaLabel={ctaLabel}
                      description={description.trim() || undefined}
                      videoThumbnailSrc={thumb}
                      onCtaClick={() => {}}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'name', label: 'name', default: 'Jordan Lee' },
                      { type: 'text', key: 'role', label: 'role', default: 'Pilot lead, CWPC North' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'full',
                      },
                      { type: 'text', key: 'ctaLabel', label: 'ctaLabel', default: 'View presentation slides' },
                      {
                        type: 'text',
                        key: 'description',
                        label: 'description',
                        default: 'Focused on community fuels reduction and early detection.',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Full',
              background: 'grid',
              center: false,
              code: `<ProfileCard
  name="Avery Kim"
  role="Innovation director"
  company="Sierra Resilience Co."
  location="Reno, NV"
  videoThumbnailSrc={thumbUrl}
  ctaLabel="View presentation slides"
  onCtaClick={() => {}}
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <ProfileCard
                    name="Avery Kim"
                    role="Innovation director"
                    company="Sierra Resilience Co."
                    location="Reno, NV"
                    videoThumbnailSrc={thumb}
                    ctaLabel="View presentation slides"
                    onCtaClick={() => {}}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Compact',
              background: 'grid',
              center: false,
              code: `<ProfileCard
  variant="compact"
  name="Morgan Patel"
  role="Scorecard analyst"
  ctaLabel="Contact"
  onCtaClick={() => {}}
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <ProfileCard
                    variant="compact"
                    name="Morgan Patel"
                    role="Scorecard analyst"
                    ctaLabel="Contact"
                    onCtaClick={() => {}}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'With LinkedIn',
              background: 'grid',
              center: false,
              code: `<ProfileCard
  name="Casey Nguyen"
  role="Community liaison"
  linkedinUrl="https://www.linkedin.com/"
  videoThumbnailSrc={thumbUrl}
  ctaLabel="View slides"
  onCtaClick={() => {}}
/>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <ProfileCard
                    name="Casey Nguyen"
                    role="Community liaison"
                    linkedinUrl="https://www.linkedin.com/"
                    videoThumbnailSrc={thumb}
                    ctaLabel="View slides"
                    onCtaClick={() => {}}
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
          code={`import { ProfileCard } from './components/organisms/ProfileCard/ProfileCard'

<ProfileCard name="…" role="…" variant="full" videoThumbnailSrc={url} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'name', type: 'string', description: 'Display name.', required: true },
            { name: 'role', type: 'string', description: 'Title or program role.', required: true },
            { name: 'company', type: 'string', description: 'Organization line.', required: false },
            { name: 'location', type: 'string', description: 'Geo line.', required: false },
            { name: 'description', type: 'string', description: 'Supporting bio.', required: false },
            { name: 'avatarSrc', type: 'string', description: 'Avatar image.', required: false },
            { name: 'videoThumbnailSrc', type: 'string', description: 'Media tile.', required: false },
            { name: 'videoUrl', type: 'string', description: 'Opens on media click.', required: false },
            { name: 'linkedinUrl', type: 'string', description: 'Badge link.', required: false },
            { name: 'ctaLabel', type: 'string', default: "'View Presentation Slides'", description: 'Button label.', required: false },
            { name: 'onCtaClick', type: '() => void', description: 'CTA handler.', required: false },
            { name: 'variant', type: "'compact' | 'full'", default: "'full'", description: 'Layout density.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
