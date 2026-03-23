import { useState } from 'react'
import { Stepper } from '../../../components/molecules/Stepper/Stepper'
import type { Step } from '../../../components/molecules/Stepper/Stepper'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const orientations = ['horizontal', 'vertical'] as const

const steps4: Step[] = [
  { label: 'Intake', description: 'Collect jurisdiction details' },
  { label: 'Review', description: 'CWPC validates data' },
  { label: 'Pilot', description: 'Field teams execute' },
  { label: 'Report', description: 'Publish scorecard' },
]

const steps5: Step[] = [
  { label: 'Draft', description: 'Outline goals' },
  { label: 'Align', description: 'Stakeholder sign-off' },
  { label: 'Fund', description: 'Budget lock' },
  { label: 'Deploy', description: 'Crew scheduling' },
  { label: 'Measure', description: 'KPI capture' },
]

export function StepperPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>('horizontal')

  const patch = (key: string, val: unknown) => {
    if (key === 'currentStep') setCurrentStep(Number(val))
    if (key === 'orientation') setOrientation(val as (typeof orientations)[number])
  }

  const values = { currentStep, orientation }
  const maxStep = orientation === 'vertical' ? 4 : 3
  const interactiveCode = `<Stepper
  orientation="${orientation}"
  currentStep={${currentStep}}
  steps={steps}
/>`

  return (
    <DocsPage
      title="Stepper"
      description="Shows progress through ordered phases for onboarding, wizards, and compliance flows."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4118"
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
                    <Stepper
                      orientation={orientation}
                      currentStep={currentStep}
                      steps={orientation === 'vertical' ? steps5 : steps4}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'number',
                        key: 'currentStep',
                        label: 'currentStep',
                        default: 1,
                        min: 0,
                        max: maxStep,
                        step: 1,
                      },
                      {
                        type: 'select',
                        key: 'orientation',
                        label: 'orientation',
                        options: [...orientations],
                        default: 'horizontal',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Horizontal',
              background: 'grid',
              center: true,
              code: '<Stepper steps={fourSteps} currentStep={1} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Stepper steps={steps4} currentStep={1} />
                </ComponentDemo>
              ),
            },
            {
              label: 'Vertical',
              background: 'grid',
              center: true,
              code: '<Stepper orientation="vertical" steps={fiveSteps} currentStep={2} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Stepper orientation="vertical" steps={steps5} currentStep={2} />
                </ComponentDemo>
              ),
            },
            {
              label: 'All complete',
              background: 'grid',
              center: true,
              code: `<Stepper
  steps={[
    { label: 'A', status: 'complete' },
    { label: 'B', status: 'complete' },
    { label: 'C', status: 'complete' },
  ]}
  currentStep={2}
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Stepper
                    steps={[
                      { label: 'Kickoff', status: 'complete' },
                      { label: 'Build', status: 'complete' },
                      { label: 'Launch', status: 'complete' },
                    ]}
                    currentStep={2}
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'First active',
              background: 'grid',
              center: true,
              code: '<Stepper steps={fourSteps} currentStep={0} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Stepper steps={steps4} currentStep={0} />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Stepper } from './components/molecules/Stepper/Stepper'

<Stepper steps={steps} currentStep={index} orientation="vertical" />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'steps', type: 'Step[]', description: 'label, optional description, optional status override.', required: true },
            { name: 'currentStep', type: 'number', default: '0', description: 'Active index (0-based).', required: false },
            {
              name: 'orientation',
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: 'Layout direction.',
              required: false,
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use for linear flows where users advance in order.',
              children: <Stepper steps={steps4} currentStep={1} />,
            },
            {
              type: 'dont',
              description: "Don't stretch beyond ~6 steps without breaking into sub-flows.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Long sequences feel endless.</span>
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
              description: 'Wrapped in nav with aria-label="Progress" and ordered list semantics.',
            },
            {
              type: 'aria',
              label: 'Current step',
              description: 'Active circle sets aria-current="step".',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
