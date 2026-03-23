import { useState } from 'react'
import { NotificationBar } from '../../../components/molecules/NotificationBar/NotificationBar'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['primary', 'success', 'warning', 'error', 'info'] as const

export function NotificationBarPage() {
  const [message, setMessage] = useState('New scorecard templates are available for FY26 pilots.')
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary')
  const [dismissible, setDismissible] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'message') setMessage(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'dismissible') setDismissible(Boolean(val))
  }

  const values = { message, variant, dismissible }
  const disLine = dismissible ? '\n  dismissible' : ''

  const interactiveCode = `<NotificationBar
  message="${message.replace(/"/g, '\\"')}"
  variant="${variant}"${disLine}
/>`

  return (
    <DocsPage
      title="NotificationBar"
      description="Full-width status strip for deployments, outages, and lightweight calls to action."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4125"
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
                    <NotificationBar message={message} variant={variant} dismissible={dismissible} />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'message', label: 'message', default: 'Announcement…' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'primary',
                      },
                      { type: 'boolean', key: 'dismissible', label: 'dismissible', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Primary',
              background: 'grid',
              center: true,
              code: '<NotificationBar variant="primary" message="Maintenance tonight 22:00 PT." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <NotificationBar variant="primary" message="Maintenance tonight 22:00 PT." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: true,
              code: '<NotificationBar variant="success" message="Export queued — email arrives in ~5 minutes." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <NotificationBar variant="success" message="Export queued — email arrives in ~5 minutes." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Warning',
              background: 'grid',
              center: true,
              code: '<NotificationBar variant="warning" message="Telemetry delay up to 15 minutes." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <NotificationBar variant="warning" message="Telemetry delay up to 15 minutes." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: true,
              code: '<NotificationBar variant="error" message="GIS sync failed — retry or contact support." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <NotificationBar variant="error" message="GIS sync failed — retry or contact support." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Info',
              background: 'grid',
              center: true,
              code: '<NotificationBar variant="info" message="Webinar starts in 30 minutes." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <NotificationBar variant="info" message="Webinar starts in 30 minutes." />
                </ComponentDemo>
              ),
            },
            {
              label: 'Dismissible',
              background: 'grid',
              center: true,
              code: '<NotificationBar dismissible message="You can close this banner." onDismiss={() => {}} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <NotificationBar dismissible message="You can close this banner." onDismiss={() => {}} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { NotificationBar } from './components/molecules/NotificationBar/NotificationBar'

<NotificationBar variant="warning" message="Degraded performance" dismissible onDismiss={logDismiss} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'message', type: 'string', description: 'Primary sentence.', required: true },
            {
              name: 'variant',
              type: "'primary' | 'success' | 'warning' | 'info' | 'error'",
              default: "'primary'",
              description: 'Semantic styling.',
              required: false,
            },
            { name: 'dismissible', type: 'boolean', default: 'false', description: 'Shows dismiss control.', required: false },
            { name: 'onDismiss', type: '() => void', description: 'Fires when dismissed.', required: false },
            { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Inline button.', required: false },
            { name: 'link', type: '{ label: string; href: string }', description: 'Text link.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use dismissible bars for non-blocking FYI messages users can hide.',
              children: <NotificationBar dismissible message="Cookie policy updated." onDismiss={() => {}} />,
            },
            {
              type: 'dont',
              description: "Don't stack multiple full-width bars without collapsing or prioritizing.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Queue announcements or merge copy.</span>
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
              label: 'Status',
              description: 'Root uses role="status" so updates are announced politely.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
