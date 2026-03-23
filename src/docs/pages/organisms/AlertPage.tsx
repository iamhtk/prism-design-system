import { useState } from 'react'
import { Alert } from '../../../components/organisms/Alert/Alert'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['success', 'error', 'warning', 'info'] as const

export function AlertPage() {
  const [message, setMessage] = useState('Your pilot profile was saved.')
  const [variant, setVariant] = useState<(typeof variants)[number]>('success')
  const [title, setTitle] = useState('Saved')
  const [dismissible, setDismissible] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'message') setMessage(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'title') setTitle(String(val))
    if (key === 'dismissible') setDismissible(Boolean(val))
  }

  const values = { message, variant, title, dismissible }

  const titleLine = title.trim() ? `\n  title="${title.replace(/"/g, '\\"')}"` : ''

  const interactiveCode = `<Alert
  message="${message.replace(/"/g, '\\"')}"
  variant="${variant}"${titleLine}
  dismissible={${dismissible}}
/>`

  return (
    <DocsPage
      title="Alert"
      description="Inline feedback with optional title, icon rail, and dismiss animation."
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
                    <Alert
                      key={`${message}-${variant}-${title}-${dismissible}`}
                      message={message}
                      variant={variant}
                      title={title.trim() || undefined}
                      dismissible={dismissible}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'text',
                        key: 'message',
                        label: 'message',
                        default: 'Your pilot profile was saved.',
                      },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'success',
                      },
                      { type: 'text', key: 'title', label: 'title', default: 'Saved' },
                      { type: 'boolean', key: 'dismissible', label: 'dismissible', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: false,
              code: '<Alert variant="success" message="Registration complete — check your email." />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Alert variant="success" message="Registration complete — check your email." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: false,
              code: '<Alert variant="error" title="Upload failed" message="File must be under 10MB." />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Alert variant="error" title="Upload failed" message="File must be under 10MB." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Warning',
              background: 'grid',
              center: false,
              code: '<Alert variant="warning" message="Scorecard export is queued; do not close this tab." />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Alert variant="warning" message="Scorecard export is queued; do not close this tab." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Info',
              background: 'grid',
              center: false,
              code: '<Alert variant="info" title="Heads up" message="Community hours are canceled this week." />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Alert variant="info" title="Heads up" message="Community hours are canceled this week." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Dismissible',
              background: 'grid',
              center: false,
              code: '<Alert message="You can dismiss this alert when finished." dismissible />',
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Alert message="You can dismiss this alert when finished." dismissible />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Alert } from './components/organisms/Alert/Alert'

<Alert variant="error" title="Error" message="…" dismissible onDismiss={() => {}} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'message', type: 'string', description: 'Body copy.', required: true },
            {
              name: 'variant',
              type: "'success' | 'error' | 'warning' | 'info'",
              default: "'info'",
              description: 'Semantic color.',
              required: false,
            },
            { name: 'title', type: 'string', description: 'Optional heading.', required: false },
            { name: 'dismissible', type: 'boolean', default: 'false', description: 'Close control.', required: false },
            { name: 'onDismiss', type: '() => void', description: 'After exit animation.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
