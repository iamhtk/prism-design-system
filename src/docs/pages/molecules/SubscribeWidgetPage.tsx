import { useState } from 'react'
import { SubscribeWidget } from '../../../components/molecules/SubscribeWidget/SubscribeWidget'
import swStyles from '../../../components/molecules/SubscribeWidget/SubscribeWidget.module.css'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const layouts = ['row', 'column'] as const
const variants = ['dark', 'light'] as const

const lightSurface = {
  width: '100%',
  maxWidth: 'var(--space-1900)',
  padding: 'var(--space-600)',
  background: 'var(--color-neutral-white)',
  borderRadius: 'var(--border-radius-lg)',
}

export function SubscribeWidgetPage() {
  const [layout, setLayout] = useState<(typeof layouts)[number]>('row')
  const [variant, setVariant] = useState<(typeof variants)[number]>('dark')
  const [placeholder, setPlaceholder] = useState('you@fireagency.gov')
  const [buttonLabel, setButtonLabel] = useState('Subscribe')

  const patch = (key: string, val: unknown) => {
    if (key === 'layout') setLayout(val as (typeof layouts)[number])
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'placeholder') setPlaceholder(String(val))
    if (key === 'buttonLabel') setButtonLabel(String(val))
  }

  const values = { layout, variant, placeholder, buttonLabel }
  const interactiveCode = `<SubscribeWidget
  layout="${layout}"
  variant="${variant}"
  placeholder="${placeholder.replace(/"/g, '\\"')}"
  buttonLabel="${buttonLabel.replace(/"/g, '\\"')}"
  label="CWPC newsletter"
/>`

  return (
    <DocsPage
      title="SubscribeWidget"
      description="Email capture row or column with validation, success state, and dark or light chrome."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4126"
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
                    <SubscribeWidget
                      layout={layout}
                      variant={variant}
                      placeholder={placeholder}
                      buttonLabel={buttonLabel}
                      label="CWPC newsletter"
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'layout',
                        label: 'layout',
                        options: [...layouts],
                        default: 'row',
                      },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'dark',
                      },
                      { type: 'text', key: 'placeholder', label: 'placeholder', default: 'you@fireagency.gov' },
                      { type: 'text', key: 'buttonLabel', label: 'buttonLabel', default: 'Subscribe' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Row dark',
              background: 'grid',
              center: true,
              code: '<SubscribeWidget layout="row" variant="dark" label="Stay informed" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SubscribeWidget layout="row" variant="dark" label="Stay informed" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Column dark',
              background: 'grid',
              center: true,
              code: '<SubscribeWidget layout="column" variant="dark" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SubscribeWidget layout="column" variant="dark" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Row light',
              background: 'grid',
              center: true,
              code: '<SubscribeWidget layout="row" variant="light" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={lightSurface}>
                    <SubscribeWidget layout="row" variant="light" label="Email alerts" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: true,
              code: '{/* After a valid email submit, component shows success state */}',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <SubscribeSuccessSnapshot />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { SubscribeWidget } from './components/molecules/SubscribeWidget/SubscribeWidget'

<SubscribeWidget variant="light" layout="column" onSubscribe={(email) => api.subscribe(email)} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'label', type: 'string', description: 'Optional text above controls.', required: false },
            { name: 'placeholder', type: 'string', default: "'Email address'", description: 'Input placeholder.', required: false },
            { name: 'buttonLabel', type: 'string', default: "'Subscribe'", description: 'Submit button text.', required: false },
            { name: 'onSubscribe', type: '(email: string) => void', description: 'Valid email handler.', required: false },
            { name: 'successMessage', type: 'string', description: 'Copy after success.', required: false },
            { name: 'variant', type: "'dark' | 'light'", default: "'dark'", description: 'Surface contrast.', required: false },
            { name: 'layout', type: "'row' | 'column'", default: "'row'", description: 'Stacking direction.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Validate email before calling APIs; surface inline errors from the widget.',
              children: <SubscribeWidget variant="dark" placeholder="name@organization.org" />,
            },
            {
              type: 'dont',
              description: "Don't hide unsubscribe or privacy links when marketing opt-in is required.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Link to policy near the widget.</span>
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
              label: 'Errors',
              description: 'Invalid submissions set aria-invalid on the email control.',
            },
            {
              type: 'aria',
              label: 'Success',
              description: 'Confirmation uses role="status" for polite announcements.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function SubscribeSuccessSnapshot() {
  return (
    <div
      className={[swStyles.successRoot, swStyles.variantDark].filter(Boolean).join(' ')}
      role="status"
    >
      <span className={swStyles.successIcon} aria-hidden>
        ✓
      </span>
      <p className={swStyles.successText}>Thanks — you are subscribed.</p>
    </div>
  )
}
