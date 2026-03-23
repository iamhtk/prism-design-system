import type { FormField } from '../../../components/organisms/Forms/Forms'
import { Forms } from '../../../components/organisms/Forms/Forms'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const scorecardFormFields: FormField[] = [
  { label: 'First Name', type: 'text', required: true },
  { label: 'Last Name', type: 'text', required: true },
  { label: 'Email', type: 'email', required: true, iconType: 'email' },
  { label: 'Organization', type: 'text' },
  { label: 'Role', type: 'text' },
  { label: 'Zip Code', type: 'text', required: true },
  { label: 'Message', type: 'text' },
]

const subscribeFields: FormField[] = [{ label: 'Email', type: 'email', required: true, iconType: 'email' }]

const scorecardCode = `const scorecardFormFields = [
  { label: 'First Name', type: 'text', required: true },
  { label: 'Last Name', type: 'text', required: true },
  { label: 'Email', type: 'email', required: true, iconType: 'email' },
  { label: 'Organization', type: 'text' },
  { label: 'Role', type: 'text' },
  { label: 'Zip Code', type: 'text', required: true },
  { label: 'Message', type: 'text' },
]

<Forms
  title="Download Scorecard"
  description="Complete the form below to receive the latest CWPC scorecard."
  fields={scorecardFormFields}
  checkboxLabels={['Subscribe', "I'm interested in piloting with CWPC"]}
  primaryButtonLabel="Download Scorecard"
  secondaryButtonLabel="Close"
  footerText="By clicking Download Scorecard you agree to our"
  footerLinkText="Data Protection Policy"
/>`

const subscribeCode = `const subscribeFields = [
  { label: 'Email', type: 'email', required: true, iconType: 'email' },
]

<Forms
  title="Subscribe to CWPC updates"
  description="Get scorecard releases and pilot opportunities in your inbox."
  fields={subscribeFields}
  primaryButtonLabel="Subscribe"
  secondaryButtonLabel="Maybe later"
  footerText="We respect your inbox."
  footerLinkText="Privacy policy"
/>`

export function FormsPage() {
  return (
    <DocsPage
      title="Forms"
      description="Download scorecard and similar flows built from Card, Input, Checkbox, and Button."
      category="Organisms"
      status="stable"
    >
      <DocsSection title="Preview">
        <StoryTabs
          defaultStory={0}
          stories={[
            {
              label: 'Download Scorecard Form',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: scorecardCode,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Forms
                    title="Download Scorecard"
                    description="Complete the form below to receive the latest CWPC scorecard."
                    fields={scorecardFormFields}
                    checkboxLabels={['Subscribe', "I'm interested in piloting with CWPC"]}
                    primaryButtonLabel="Download Scorecard"
                    secondaryButtonLabel="Close"
                    footerText="By clicking Download Scorecard you agree to our"
                    footerLinkText="Data Protection Policy"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'Subscribe Form',
              background: 'grid',
              center: false,
              fullWidth: true,
              code: subscribeCode,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <Forms
                    title="Subscribe to CWPC updates"
                    description="Get scorecard releases and pilot opportunities in your inbox."
                    fields={subscribeFields}
                    primaryButtonLabel="Subscribe"
                    secondaryButtonLabel="Maybe later"
                    footerText="We respect your inbox."
                    footerLinkText="Privacy policy"
                  />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Forms } from './components/organisms/Forms/Forms'

<Forms title="…" fields={fields} primaryButtonLabel="Submit" onSubmit={…} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Form heading.', required: false },
            { name: 'description', type: 'string', description: 'Intro copy.', required: false },
            { name: 'fields', type: 'FormField[]', description: 'Input definitions.', required: true },
            { name: 'checkboxLabels', type: 'string[]', description: 'Optional consent rows.', required: false },
            { name: 'primaryButtonLabel', type: 'string', description: 'Green CTA label.', required: false },
            { name: 'secondaryButtonLabel', type: 'string', description: 'Secondary button label.', required: false },
            { name: 'footerText', type: 'string', description: 'Footer sentence prefix.', required: false },
            { name: 'footerLinkText', type: 'string', description: 'Inline link label.', required: false },
            { name: 'onSubmit', type: '() => void', description: 'Primary button handler.', required: false },
            { name: 'onClose', type: '() => void', description: 'Secondary button handler.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
