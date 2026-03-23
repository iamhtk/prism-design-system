import { useEffect, useState } from 'react'
import { ProgressCircle } from '../../../components/molecules/ProgressCircle/ProgressCircle'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['primary', 'success', 'warning', 'error', 'info'] as const
const sizes = ['sm', 'md', 'lg'] as const

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-600)', alignItems: 'flex-end' }

export function ProgressCirclePage() {
  const [value, setValue] = useState(68)
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [label, setLabel] = useState('')
  const [showValue, setShowValue] = useState(true)
  const [animated, setAnimated] = useState(false)

  const patch = (key: string, val: unknown) => {
    if (key === 'value') setValue(Number(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'label') setLabel(String(val))
    if (key === 'showValue') setShowValue(Boolean(val))
    if (key === 'animated') setAnimated(Boolean(val))
  }

  const values = { value, variant, size, label, showValue, animated }
  const labelLine = label.trim() ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''
  const showVal = showValue ? '' : '\n  showValue={false}'
  const anim = animated ? '\n  animated' : ''

  const interactiveCode = `<ProgressCircle
  value={${value}}
  variant="${variant}"
  size="${size}"${labelLine}${showVal}${anim}
/>`

  return (
    <DocsPage
      title="ProgressCircle"
      description="Radial progress for dashboards, readiness scores, and compact status tiles."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4111"
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
                  <ComponentDemo center padding="sm" background="transparent">
                    <ProgressCircle
                      value={value}
                      variant={variant}
                      size={size}
                      label={label.trim() || undefined}
                      showValue={showValue}
                      animated={animated}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'number', key: 'value', label: 'value', default: 68, min: 0, max: 100, step: 1 },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'primary',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      { type: 'text', key: 'label', label: 'label', default: '' },
                      { type: 'boolean', key: 'showValue', label: 'showValue', default: true },
                      { type: 'boolean', key: 'animated', label: 'animated', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Variants',
              background: 'grid',
              center: true,
              code: variants.map((v) => `<ProgressCircle value={55} variant="${v}" size="sm" />`).join('\n'),
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={row}>
                    {variants.map((v) => (
                      <ProgressCircle key={v} value={55} variant={v} size="sm" />
                    ))}
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Sizes',
              background: 'grid',
              center: true,
              code: `<ProgressCircle value={40} size="sm" />
<ProgressCircle value={40} size="md" />
<ProgressCircle value={40} size="lg" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={row}>
                    <ProgressCircle value={40} size="sm" />
                    <ProgressCircle value={40} size="md" />
                    <ProgressCircle value={40} size="lg" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'With label',
              background: 'grid',
              center: true,
              code: '<ProgressCircle value={82} label="Treatments complete" variant="success" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ProgressCircle value={82} label="Treatments complete" variant="success" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Mount animation',
              background: 'grid',
              center: true,
              code: `function Demo() {
  const [v, setV] = useState(0)
  useEffect(() => { const t = requestAnimationFrame(() => setV(72)); return () => cancelAnimationFrame(t) }, [])
  return <ProgressCircle value={v} animated />
}`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ProgressCircleMountDemo />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { ProgressCircle } from './components/molecules/ProgressCircle/ProgressCircle'

<ProgressCircle value={score} variant="info" label="Readiness" showValue />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'number', description: '0–100 arc fill.', required: true },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Diameter scale.', required: false },
            {
              name: 'variant',
              type: "'primary' | 'success' | 'warning' | 'error' | 'info'",
              default: "'primary'",
              description: 'Stroke color.',
              required: false,
            },
            { name: 'label', type: 'string', description: 'Caption under the ring.', required: false },
            { name: 'animated', type: 'boolean', default: 'false', description: 'Animates stroke offset.', required: false },
            { name: 'showValue', type: 'boolean', default: 'true', description: 'Center percentage text.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Pair with a text label so the metric is understandable without color alone.',
              children: <ProgressCircle value={71} label="Fuel break miles" variant="warning" />,
            },
            {
              type: 'dont',
              description: "Don't use dozens of animated circles on one screen — motion competes for attention.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Limit simultaneous animations.</span>
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
              label: 'Progress',
              description: 'Root exposes progressbar semantics with valuenow and valuetext.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function ProgressCircleMountDemo() {
  const [v, setV] = useState(0)
  useEffect(() => {
    const t = requestAnimationFrame(() => setV(72))
    return () => cancelAnimationFrame(t)
  }, [])
  return <ProgressCircle value={v} animated variant="primary" />
}
