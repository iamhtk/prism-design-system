import { useState } from 'react'
import { MapPin } from '../../../components/atoms/MapPin/MapPin'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const pinColors = ['primary', 'success', 'error', 'info', 'warning'] as const
const pinSizes = ['sm', 'md', 'lg'] as const

const rowStyle = { display: 'flex', flexWrap: 'wrap' as const, gap: 'var(--space-600)', alignItems: 'flex-end' }

export function MapPinPage() {
  const [ctrlColor, setCtrlColor] = useState<(typeof pinColors)[number]>('primary')
  const [ctrlSize, setCtrlSize] = useState<(typeof pinSizes)[number]>('md')
  const [ctrlActive, setCtrlActive] = useState(false)
  const [ctrlLabel, setCtrlLabel] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'color') setCtrlColor(val as (typeof pinColors)[number])
    if (key === 'size') setCtrlSize(val as (typeof pinSizes)[number])
    if (key === 'active') setCtrlActive(Boolean(val))
    if (key === 'label') setCtrlLabel(String(val))
  }

  const values = { color: ctrlColor, size: ctrlSize, active: ctrlActive, label: ctrlLabel }

  const labelLine =
    ctrlLabel.trim().length > 0 ? `\n  label="${ctrlLabel.replace(/"/g, '\\"')}"` : ''

  const interactiveCode = `<MapPin
  color="${ctrlColor}"
  size="${ctrlSize}"
  active={${ctrlActive}}${labelLine}
/>`

  return (
    <DocsPage
      title="MapPin"
      description="Location marker for maps and spatial summaries."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3016"
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
                    <MapPin
                      color={ctrlColor}
                      size={ctrlSize}
                      active={ctrlActive}
                      label={ctrlLabel.trim() || undefined}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'color',
                        label: 'color',
                        options: [...pinColors],
                        default: 'primary',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...pinSizes],
                        default: 'md',
                      },
                      { type: 'boolean', key: 'active', label: 'active', default: false },
                      { type: 'text', key: 'label', label: 'label', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'All colors',
              background: 'grid',
              center: true,
              code: `<MapPin color="primary" />
<MapPin color="success" />
<MapPin color="error" />
<MapPin color="info" />
<MapPin color="warning" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={rowStyle}>
                    <MapPin color="primary" />
                    <MapPin color="success" />
                    <MapPin color="error" />
                    <MapPin color="info" />
                    <MapPin color="warning" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'All Sizes',
              background: 'grid',
              center: true,
              code: `<MapPin size="sm" />
<MapPin size="md" />
<MapPin size="lg" />`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <div style={rowStyle}>
                    <MapPin size="sm" />
                    <MapPin size="md" />
                    <MapPin size="lg" />
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Active State',
              background: 'grid',
              center: true,
              code: '<MapPin active label="Selected site" onClick={() => {}} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <MapPin active label="Selected site" onClick={() => {}} />
                </ComponentDemo>
              ),
            },
            {
              label: 'With label',
              background: 'grid',
              center: true,
              code: '<MapPin label="Pilot county" color="success" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <MapPin label="Pilot county" color="success" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { MapPin } from './components/atoms/MapPin/MapPin'

<MapPin
  label="Treatment corridor"
  color="info"
  active={selectedId === corridor.id}
  onClick={() => setSelectedId(corridor.id)}
/>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Marker scale.', required: false },
            {
              name: 'color',
              type: "'primary' | 'success' | 'error' | 'info' | 'warning'",
              default: "'primary'",
              description: 'Semantic fill.',
              required: false,
            },
            { name: 'label', type: 'string', description: 'Optional caption under the pin.', required: false },
            { name: 'active', type: 'boolean', default: 'false', description: 'Highlights the selected marker.', required: false },
            { name: 'onClick', type: '() => void', description: 'Renders as a button when provided.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Provide a label when multiple pins share the same map region.',
              children: <MapPin label="County HQ" color="primary" />,
            },
            {
              type: 'dont',
              description: "Don't rely on pin hue alone to communicate severity — add legend text.",
              children: (
                <div style={rowStyle}>
                  <MapPin color="error" />
                  <MapPin color="warning" />
                </div>
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
              type: 'keyboard',
              label: 'Interactive pins',
              description: 'When onClick is set, the marker is a button focusable via Tab and activatable with Enter or Space.',
            },
            {
              type: 'aria',
              label: 'Static pins',
              description: 'Decorative pins expose role="img" with aria-label from the label prop or a default.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
