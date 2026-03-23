import { useState } from 'react'
import { StatCard } from '../../../components/molecules/StatCard/StatCard'
import { DocIconSearch } from '../../helpers/docsIcons'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['primary', 'success', 'info', 'warning'] as const
const trendOpts = ['none', 'up', 'down', 'neutral'] as const

export function StatCardPage() {
  const [value, setValue] = useState('5,000+')
  const [label, setLabel] = useState('Active volunteers')
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary')
  const [trend, setTrend] = useState<(typeof trendOpts)[number]>('none')
  const [trendValue, setTrendValue] = useState('+12% QoQ')

  const patch = (key: string, val: unknown) => {
    if (key === 'value') setValue(String(val))
    if (key === 'label') setLabel(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'trend') setTrend(val as (typeof trendOpts)[number])
    if (key === 'trendValue') setTrendValue(String(val))
  }

  const values = { value, label, variant, trend, trendValue }
  const trendLine =
    trend === 'none'
      ? ''
      : `\n  trend="${trend}"${trendValue.trim() ? `\n  trendValue="${trendValue.replace(/"/g, '\\"')}"` : ''}`

  const interactiveCode = `<StatCard
  value="${value.replace(/"/g, '\\"')}"
  label="${label.replace(/"/g, '\\"')}"
  variant="${variant}"${trendLine}
/>`

  const trendProp = trend === 'none' ? undefined : trend
  const trendValProp = trend === 'none' || !trendValue.trim() ? undefined : trendValue

  return (
    <DocsPage
      title="StatCard"
      description="KPI tile for dashboards with optional trend and icon slots."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4116"
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
                    <StatCard
                      value={value}
                      label={label}
                      variant={variant}
                      trend={trendProp}
                      trendValue={trendValProp}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'value', label: 'value', default: '5,000+' },
                      { type: 'text', key: 'label', label: 'label', default: 'Active volunteers' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'primary',
                      },
                      {
                        type: 'select',
                        key: 'trend',
                        label: 'trend',
                        options: [...trendOpts],
                        default: 'none',
                      },
                      { type: 'text', key: 'trendValue', label: 'trendValue', default: '+12% QoQ' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Primary',
              background: 'grid',
              center: true,
              code: '<StatCard value="5,000+" label="Registered users" variant="primary" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard value="5,000+" label="Registered users" variant="primary" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: true,
              code: '<StatCard value="68%" label="Pilot retention" variant="success" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard value="68%" label="Pilot retention" variant="success" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Info',
              background: 'grid',
              center: true,
              code: '<StatCard value="38" label="Countries represented" variant="info" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard value="38" label="Countries represented" variant="info" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Warning',
              background: 'grid',
              center: true,
              code: '<StatCard value="12" label="Open alerts" variant="warning" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard value="12" label="Open alerts" variant="warning" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Trend up',
              background: 'grid',
              center: true,
              code: '<StatCard value="92%" label="Treatments on time" variant="success" trend="up" trendValue="+4%" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard
                    value="92%"
                    label="Treatments on time"
                    variant="success"
                    trend="up"
                    trendValue="+4%"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Trend down',
              background: 'grid',
              center: true,
              code: '<StatCard value="14" label="High-hazard acres" variant="warning" trend="down" trendValue="-3%" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard
                    value="14"
                    label="High-hazard acres"
                    variant="warning"
                    trend="down"
                    trendValue="-3%"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'With icon',
              background: 'grid',
              center: true,
              code: '<StatCard value="128" label="Saved searches" variant="info" icon={<Icon />} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <StatCard value="128" label="Saved searches" variant="info" icon={<DocIconSearch />} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { StatCard } from './components/molecules/StatCard/StatCard'

<StatCard value="4.2k" label="Acres treated" variant="success" trend="up" trendValue="+18%" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'value', type: 'string', description: 'Primary metric string.', required: true },
            { name: 'label', type: 'string', description: 'Supporting label.', required: true },
            {
              name: 'variant',
              type: "'primary' | 'success' | 'info' | 'warning'",
              default: "'primary'",
              description: 'Semantic color.',
              required: false,
            },
            { name: 'trend', type: "'up' | 'down' | 'neutral'", description: 'Optional arrow direction.', required: false },
            { name: 'trendValue', type: 'string', description: 'Text beside arrow.', required: false },
            { name: 'icon', type: 'ReactNode', description: 'Optional leading icon.', required: false },
            { name: 'description', type: 'string', description: 'Extra body copy.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Pair trends with numeric deltas so direction is not color-only.',
              children: (
                <StatCard value="88%" label="Completion" variant="success" trend="up" trendValue="+6%" />
              ),
            },
            {
              type: 'dont',
              description: "Don't overload one card with paragraphs — keep to one metric + short label.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Move narrative to body copy below.</span>
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
              label: 'Structure',
              description: 'Rendered as article with readable value and label order.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
