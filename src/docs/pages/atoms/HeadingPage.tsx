import { useState } from 'react'
import { Heading } from '../../../components/atoms/Heading/Heading'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const levels = ['1', '2', '3', '4', '5', '6'] as const
const colors = ['primary', 'secondary', 'tertiary', 'default', 'info', 'success'] as const
const weights = ['regular', 'medium', 'semibold', 'bold'] as const
const aligns = ['left', 'center', 'right'] as const

const rowStyle = { display: 'flex', flexDirection: 'column' as const, gap: 'var(--space-400)', width: '100%' }

export function HeadingPage() {
  const [ctrlLevel, setCtrlLevel] = useState<(typeof levels)[number]>('2')
  const [ctrlColor, setCtrlColor] = useState<(typeof colors)[number]>('default')
  const [ctrlWeight, setCtrlWeight] = useState<(typeof weights)[number]>('bold')
  const [ctrlAlign, setCtrlAlign] = useState<(typeof aligns)[number]>('left')

  const patch = (key: string, val: unknown) => {
    if (key === 'level') setCtrlLevel(val as (typeof levels)[number])
    if (key === 'color') setCtrlColor(val as (typeof colors)[number])
    if (key === 'weight') setCtrlWeight(val as (typeof weights)[number])
    if (key === 'align') setCtrlAlign(val as (typeof aligns)[number])
  }

  const values = { level: ctrlLevel, color: ctrlColor, weight: ctrlWeight, align: ctrlAlign }

  const levelNum = Number(ctrlLevel) as 1 | 2 | 3 | 4 | 5 | 6

  const interactiveCode = `<Heading
  level={${levelNum}}
  color="${ctrlColor}"
  weight="${ctrlWeight}"
  align="${ctrlAlign}"
>
  The quick brown fox
</Heading>`

  return (
    <DocsPage
      title="Heading"
      description="Semantic heading scale with brand color, weight, and alignment options."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3011"
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
                    <Heading level={levelNum} color={ctrlColor} weight={ctrlWeight} align={ctrlAlign}>
                      The quick brown fox
                    </Heading>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'level',
                        label: 'level',
                        options: [...levels],
                        default: '2',
                      },
                      {
                        type: 'select',
                        key: 'color',
                        label: 'color',
                        options: [...colors],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'weight',
                        label: 'weight',
                        options: [...weights],
                        default: 'bold',
                      },
                      {
                        type: 'select',
                        key: 'align',
                        label: 'align',
                        options: [...aligns],
                        default: 'left',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'All levels',
              background: 'grid',
              center: true,
              code: `<Heading level={1}>Level 1</Heading>
<Heading level={2}>Level 2</Heading>
<Heading level={3}>Level 3</Heading>
<Heading level={4}>Level 4</Heading>
<Heading level={5}>Level 5</Heading>
<Heading level={6}>Level 6</Heading>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={rowStyle}>
                    <Heading level={1}>Level 1</Heading>
                    <Heading level={2}>Level 2</Heading>
                    <Heading level={3}>Level 3</Heading>
                    <Heading level={4}>Level 4</Heading>
                    <Heading level={5}>Level 5</Heading>
                    <Heading level={6}>Level 6</Heading>
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'All colors',
              background: 'grid',
              center: true,
              code: `<Heading color="primary">Primary</Heading>
<Heading color="secondary">Secondary</Heading>
<Heading color="tertiary">Tertiary</Heading>
<Heading color="default">Default</Heading>
<Heading color="info">Info</Heading>
<Heading color="success">Success</Heading>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={rowStyle}>
                    <Heading color="primary">Primary</Heading>
                    <Heading color="secondary">Secondary</Heading>
                    <Heading color="tertiary">Tertiary</Heading>
                    <Heading color="default">Default</Heading>
                    <Heading color="info">Info</Heading>
                    <Heading color="success">Success</Heading>
                  </div>
                </ComponentDemo>
              ),
            },
            {
              label: 'Weights',
              background: 'grid',
              center: true,
              code: `<Heading weight="regular">Regular</Heading>
<Heading weight="medium">Medium</Heading>
<Heading weight="semibold">Semibold</Heading>
<Heading weight="bold">Bold</Heading>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <div style={rowStyle}>
                    <Heading weight="regular">Regular</Heading>
                    <Heading weight="medium">Medium</Heading>
                    <Heading weight="semibold">Semibold</Heading>
                    <Heading weight="bold">Bold</Heading>
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
          code={`import { Heading } from './components/atoms/Heading/Heading'

<Heading level={2} color="primary" align="center">
  Prevent catastrophic wildfire
</Heading>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', default: '2', description: 'Maps to h1–h6.', required: false },
            { name: 'children', type: 'ReactNode', description: 'Heading content.', required: true },
            {
              name: 'color',
              type: "'primary' | 'secondary' | 'tertiary' | 'default' | 'info' | 'success'",
              default: "'default'",
              description: 'Tokenized text color.',
              required: false,
            },
            {
              name: 'weight',
              type: "'regular' | 'medium' | 'semibold' | 'bold'",
              default: "'bold'",
              description: 'Font weight.',
              required: false,
            },
            { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment.', required: false },
            { name: 'className', type: 'string', description: 'Extra classes.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use heading levels in document order (H1 → H2 → H3) to preserve outline.',
              children: (
                <>
                  <Heading level={2}>Section</Heading>
                  <Heading level={3}>Subsection</Heading>
                </>
              ),
            },
            {
              type: 'dont',
              description: "Don't pick a level only for visual size — adjust color or weight instead.",
              children: <Heading level={4}>Looks like H2</Heading>,
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
              label: 'Semantics',
              description: 'Each level renders the matching native h1–h6 element.',
            },
            {
              type: 'wcag',
              label: 'Page structure',
              description: 'Use at most one h1 per page; subsequent headings nest logically.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
