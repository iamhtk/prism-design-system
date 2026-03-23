import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { ToastProvider } from '../../../components/organisms/Toast/ToastProvider'
import { useToast } from '../../../components/organisms/Toast/useToast'
import type { ToastVariant } from '../../../components/organisms/Toast/Toast'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const triggerRow = {
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: 'var(--space-300)',
  alignItems: 'center' as const,
}

function ToastPlayground() {
  const { addToast } = useToast()
  const [duration, setDuration] = useState(4000)

  const patch = (key: string, val: unknown) => {
    if (key === 'duration') setDuration(Number(val))
  }

  const values = { duration }

  return (
    <>
      <ComponentDemo padding="sm" background="transparent" fullWidth>
        <div style={triggerRow}>
          <Button
            label="Success"
            type="default"
            onClick={() => addToast('Pilot roster synced', 'success', 'CWPC', duration)}
          />
          <Button
            label="Error"
            type="outlined"
            onClick={() => addToast('Invite expired', 'error', 'Account', duration)}
          />
          <Button
            label="Warning"
            type="outlined"
            onClick={() => addToast('Maintenance tonight', 'warning', 'Ops', duration)}
          />
          <Button
            label="Info"
            type="transparent"
            onClick={() => addToast('New showcase entries', 'info', 'Digest', duration)}
          />
        </div>
      </ComponentDemo>
      <Controls
        values={values}
        onChange={patch}
        controls={[
          { type: 'number', key: 'duration', label: 'duration (ms)', default: 4000, min: 1500, max: 12000, step: 500 },
        ]}
      />
    </>
  )
}

function ToastSingleTrigger({ variant, label }: { variant: ToastVariant; label: string }) {
  const { addToast } = useToast()
  const messages: Record<ToastVariant, { message: string; title: string }> = {
    success: { message: 'Scorecard export finished.', title: 'Ready' },
    error: { message: 'Could not save sponsor notes.', title: 'Error' },
    warning: { message: 'Session ends in 2 minutes.', title: 'Heads up' },
    info: { message: 'CWPC office hours moved to Thursday.', title: 'FYI' },
  }
  const m = messages[variant]
  return (
    <>
      <ComponentDemo padding="sm" background="transparent" fullWidth>
        <Button label={label} type="default" onClick={() => addToast(m.message, variant, m.title, 5000)} />
      </ComponentDemo>
    </>
  )
}

export function ToastPage() {
  return (
    <DocsPage
      title="Toast"
      description="Transient notifications via ToastProvider portal; stack in a screen corner."
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
              code: `import { ToastProvider } from './components/organisms/Toast/ToastProvider'
import { useToast } from './components/organisms/Toast/useToast'

<ToastProvider position="top-right">
  <YourTriggers />
</ToastProvider>

const { addToast } = useToast()
addToast('Pilot roster synced', 'success', 'CWPC', duration)`,
              children: (
                <ToastProvider position="top-right">
                  <ToastPlayground />
                </ToastProvider>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `addToast('Scorecard export finished.', 'success', 'Ready', 5000)`,
              children: (
                <ToastProvider position="top-right">
                  <ToastSingleTrigger variant="success" label="Show success toast" />
                </ToastProvider>
              ),
            },
            {
              label: 'Error',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `addToast('Could not save sponsor notes.', 'error', 'Error', 5000)`,
              children: (
                <ToastProvider position="top-right">
                  <ToastSingleTrigger variant="error" label="Show error toast" />
                </ToastProvider>
              ),
            },
            {
              label: 'Warning',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `addToast('Session ends in 2 minutes.', 'warning', 'Heads up', 5000)`,
              children: (
                <ToastProvider position="top-right">
                  <ToastSingleTrigger variant="warning" label="Show warning toast" />
                </ToastProvider>
              ),
            },
            {
              label: 'Info',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: `addToast('CWPC office hours moved to Thursday.', 'info', 'FYI', 5000)`,
              children: (
                <ToastProvider position="top-right">
                  <ToastSingleTrigger variant="info" label="Show info toast" />
                </ToastProvider>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { ToastProvider } from './components/organisms/Toast/ToastProvider'
import { useToast } from './components/organisms/Toast/useToast'

export function App() {
  return (
    <ToastProvider position="top-right">
      <YourApp />
    </ToastProvider>
  )
}

const { addToast } = useToast()
addToast('Message', 'info', 'Title', 6000)`}
        />
      </DocsSection>
      <DocsSection title="Props (ToastProvider)">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', description: 'App subtree.', required: true },
            { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", default: "'top-right'", description: 'Stack corner.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
