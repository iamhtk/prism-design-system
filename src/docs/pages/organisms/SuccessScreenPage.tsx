import { useState } from 'react'
import { SuccessScreen } from '../../../components/organisms/SuccessScreen/SuccessScreen'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const scaleWrap = {
  transform: 'scale(0.65)',
  transformOrigin: 'top center' as const,
  width: '100%',
}

export function SuccessScreenPage() {
  const [title, setTitle] = useState('Application received')
  const [description, setDescription] = useState(
    'CWPC will review your pilot materials and email next steps within five business days.',
  )
  const [ctaLabel, setCtaLabel] = useState('Back to showcase')
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'description') setDescription(String(val))
    if (key === 'ctaLabel') setCtaLabel(String(val))
    if (key === 'secondaryCtaLabel') setSecondaryCtaLabel(String(val))
  }

  const values = { title, description, ctaLabel, secondaryCtaLabel }

  const descLine = description.trim()
    ? `\n  description="${description.replace(/"/g, '\\"')}"`
    : ''
  const ctaLine = ctaLabel.trim() ? `\n  ctaLabel="${ctaLabel.replace(/"/g, '\\"')}"` : ''
  const secLine =
    secondaryCtaLabel.trim().length > 0
      ? `\n  secondaryCtaLabel="${secondaryCtaLabel.replace(/"/g, '\\"')}"`
      : ''

  const interactiveCode = `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <SuccessScreen
    title="${title.replace(/"/g, '\\"')}"${descLine}${ctaLine}${secLine}
    onCtaClick={() => {}}
    onSecondaryCtaClick={() => {}}
  />
</div>`

  return (
    <DocsPage
      title="Success Screen"
      description="Confirmation layout with check icon and one or two actions."
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
                    <div style={scaleWrap}>
                      <SuccessScreen
                        title={title}
                        description={description.trim() || undefined}
                        ctaLabel={ctaLabel.trim() || undefined}
                        secondaryCtaLabel={secondaryCtaLabel.trim() || undefined}
                        onCtaClick={() => {}}
                        onSecondaryCtaClick={() => {}}
                      />
                    </div>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'title', label: 'title', default: 'Application received' },
                      {
                        type: 'text',
                        key: 'description',
                        label: 'description',
                        default:
                          'CWPC will review your pilot materials and email next steps within five business days.',
                      },
                      { type: 'text', key: 'ctaLabel', label: 'ctaLabel', default: 'Back to showcase' },
                      { type: 'text', key: 'secondaryCtaLabel', label: 'secondaryCtaLabel', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <SuccessScreen
    title="You are on the list"
    description="We will email you when registration reopens."
    ctaLabel="Return home"
    onCtaClick={() => {}}
  />
</div>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <div style={scaleWrap}>
                    <SuccessScreen
                      title="You are on the list"
                      description="We will email you when registration reopens."
                      ctaLabel="Return home"
                      onCtaClick={() => {}}
                    />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With Secondary CTA',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <SuccessScreen
    title="Scorecard downloaded"
    description="Save a copy for your records."
    ctaLabel="Open downloads folder"
    secondaryCtaLabel="View showcase"
    onCtaClick={() => {}}
    onSecondaryCtaClick={() => {}}
  />
</div>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <div style={scaleWrap}>
                    <SuccessScreen
                      title="Scorecard downloaded"
                      description="Save a copy for your records."
                      ctaLabel="Open downloads folder"
                      secondaryCtaLabel="View showcase"
                      onCtaClick={() => {}}
                      onSecondaryCtaClick={() => {}}
                    />
                  </div>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { SuccessScreen } from './components/organisms/SuccessScreen/SuccessScreen'

<SuccessScreen title="Done" description="…" ctaLabel="Continue" onCtaClick={() => {}} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', default: "'Success!'", description: 'Heading.', required: false },
            { name: 'description', type: 'string', description: 'Supporting copy.', required: false },
            { name: 'ctaLabel', type: 'string', description: 'Primary button.', required: false },
            { name: 'onCtaClick', type: '() => void', description: 'Primary handler.', required: false },
            { name: 'secondaryCtaLabel', type: 'string', description: 'Ghost button.', required: false },
            { name: 'onSecondaryCtaClick', type: '() => void', description: 'Secondary handler.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
