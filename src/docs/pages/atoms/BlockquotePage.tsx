import { useState } from 'react'
import { Blockquote } from '../../../components/atoms/Blockquote/Blockquote'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const bqVariants = ['default', 'primary', 'success', 'info'] as const

export function BlockquotePage() {
  const [ctrlVariant, setCtrlVariant] = useState<(typeof bqVariants)[number]>('default')
  const [ctrlCite, setCtrlCite] = useState('')

  const patch = (key: string, val: unknown) => {
    if (key === 'variant') setCtrlVariant(val as (typeof bqVariants)[number])
    if (key === 'cite') setCtrlCite(String(val))
  }

  const values = { variant: ctrlVariant, cite: ctrlCite }

  const citeLine =
    ctrlCite.trim().length > 0 ? `\n  cite="${ctrlCite.replace(/"/g, '\\"')}"` : ''

  const interactiveCode = `<Blockquote variant="${ctrlVariant}"${citeLine}>
  Communities need coordinated fuel treatment and workforce capacity to bend the risk curve.
</Blockquote>`

  return (
    <DocsPage
      title="Blockquote"
      description="Highlighted quotation with optional citation footer."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3013"
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
                    <Blockquote variant={ctrlVariant} cite={ctrlCite.trim() || undefined}>
                      Communities need coordinated fuel treatment and workforce capacity to bend the risk curve.
                    </Blockquote>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...bqVariants],
                        default: 'default',
                      },
                      { type: 'text', key: 'cite', label: 'cite', default: '' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: `<Blockquote>
  CWPC convenes pilots, sponsors, and agencies on a shared prevention roadmap.
</Blockquote>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Blockquote>
                    CWPC convenes pilots, sponsors, and agencies on a shared prevention roadmap.
                  </Blockquote>
                </ComponentDemo>
              ),
            },
            {
              label: 'Primary',
              background: 'grid',
              center: true,
              code: `<Blockquote variant="primary">
  Fuel breaks and workforce training are the twin engines of resilience.
</Blockquote>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Blockquote variant="primary">
                    Fuel breaks and workforce training are the twin engines of resilience.
                  </Blockquote>
                </ComponentDemo>
              ),
            },
            {
              label: 'Success',
              background: 'grid',
              center: true,
              code: `<Blockquote variant="success">
  Scorecard pilots are reporting measurable reduction in high-hazard acres.
</Blockquote>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Blockquote variant="success">
                    Scorecard pilots are reporting measurable reduction in high-hazard acres.
                  </Blockquote>
                </ComponentDemo>
              ),
            },
            {
              label: 'Info',
              background: 'grid',
              center: true,
              code: `<Blockquote variant="info">
  Data partnerships help communities prioritize treatments where risk is highest.
</Blockquote>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Blockquote variant="info">
                    Data partnerships help communities prioritize treatments where risk is highest.
                  </Blockquote>
                </ComponentDemo>
              ),
            },
            {
              label: 'With citation',
              background: 'grid',
              center: true,
              code: `<Blockquote cite="CWPC Scorecard Overview, 2025">
  Prevention is a systems problem—finance, policy, and field delivery must move together.
</Blockquote>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Blockquote cite="CWPC Scorecard Overview, 2025">
                    Prevention is a systems problem—finance, policy, and field delivery must move together.
                  </Blockquote>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Blockquote } from './components/atoms/Blockquote/Blockquote'

<Blockquote variant="info" cite="Field notes, Arizona pilot">
  Crews completed treatment across 1,200 acres ahead of peak fire season.
</Blockquote>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', description: 'Quoted content.', required: true },
            {
              name: 'variant',
              type: "'default' | 'primary' | 'success' | 'info'",
              default: "'default'",
              description: 'Border and text accent.',
              required: false,
            },
            { name: 'cite', type: 'string', description: 'Optional citation line.', required: false },
            { name: 'className', type: 'string', description: 'Extra classes on blockquote.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Attribute long-form quotes with cite when the source is known.',
              children: (
                <Blockquote cite="CWPC field interview, 2025">
                  Crew coordination cut treatment time in half across the pilot counties.
                </Blockquote>
              ),
            },
            {
              type: 'dont',
              description: "Don't use blockquotes for decorative callouts without quoted material.",
              children: <Blockquote>Marketing tagline pretending to be a quote</Blockquote>,
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
              label: 'Native blockquote',
              description: 'Uses semantic blockquote; cite renders in a footer for screen reader context.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
