import { useState } from 'react'
import { ErrorPage } from '../../../components/organisms/ErrorPage/ErrorPage'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const codes = ['404', '500', '403'] as const

const scaleWrap = {
  transform: 'scale(0.65)',
  transformOrigin: 'top center' as const,
  width: '100%',
}

export function ErrorPagePage() {
  const [code, setCode] = useState<(typeof codes)[number]>('404')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('The page you are looking for may have moved or been removed.')

  const patch = (key: string, val: unknown) => {
    if (key === 'code') setCode(val as (typeof codes)[number])
    if (key === 'title') setTitle(String(val))
    if (key === 'description') setDescription(String(val))
  }

  const values = { code, title, description }

  const titleLine = title.trim() ? `\n  title="${title.replace(/"/g, '\\"')}"` : ''
  const descLine = description.trim()
    ? `\n  description="${description.replace(/"/g, '\\"')}"`
    : ''

  const interactiveCode = `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <ErrorPage
    code="${code}"${titleLine}${descLine}
    ctaLabel="Go Back Home"
    onCtaClick={() => {}}
  />
</div>`

  return (
    <DocsPage
      title="Error Page"
      description="Centered error template with code, title, and primary recovery action."
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
                      <ErrorPage
                        code={code}
                        title={title.trim() || undefined}
                        description={description.trim() || undefined}
                        ctaLabel="Go Back Home"
                        onCtaClick={() => {}}
                      />
                    </div>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'code',
                        label: 'code',
                        options: [...codes],
                        default: '404',
                      },
                      { type: 'text', key: 'title', label: 'title (optional)', default: '' },
                      {
                        type: 'text',
                        key: 'description',
                        label: 'description',
                        default: 'The page you are looking for may have moved or been removed.',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: '404',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <ErrorPage code="404" />
</div>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <div style={scaleWrap}>
                    <ErrorPage code="404" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: '500',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <ErrorPage code="500" />
</div>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <div style={scaleWrap}>
                    <ErrorPage code="500" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: '403',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `<div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '100%' }}>
  <ErrorPage code="403" />
</div>`,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <div style={scaleWrap}>
                    <ErrorPage code="403" />
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
          code={`import { ErrorPage } from './components/organisms/ErrorPage/ErrorPage'

<ErrorPage code="404" title="Custom" description="…" ctaHref="/" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'code', type: "'404' | '500' | '403'", default: "'404'", description: 'Large numeric.', required: false },
            { name: 'title', type: 'string', description: 'Overrides default per code.', required: false },
            { name: 'description', type: 'string', description: 'Supporting copy.', required: false },
            { name: 'ctaLabel', type: 'string', default: "'Go Back Home'", description: 'Button label.', required: false },
            { name: 'onCtaClick', type: '() => void', description: 'Button handler.', required: false },
            { name: 'ctaHref', type: 'string', description: 'Navigation fallback.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
