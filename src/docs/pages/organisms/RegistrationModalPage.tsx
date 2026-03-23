import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { RegistrationModal } from '../../../components/organisms/RegistrationModal/RegistrationModal'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

function RegistrationModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ComponentDemo center padding="sm" background="transparent">
        <Button label="Notify me" type="default" onClick={() => setOpen(true)} />
        <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />
      </ComponentDemo>
    </>
  )
}

export function RegistrationModalPage() {
  return (
    <DocsPage
      title="Registration Modal"
      description="Light-surface modal for email capture when registration is closed."
      category="Organisms"
      status="stable"
    >
      <DocsSection title="Preview">
        <StoryTabs
          defaultStory={0}
          stories={[
            {
              label: 'Preview',
              background: 'grid',
              center: true,
              code: `const [open, setOpen] = useState(false)

<>
  <Button label="Notify me" type="default" onClick={() => setOpen(true)} />
  <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />
</>`,
              children: <RegistrationModalDemo />,
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { RegistrationModal } from './components/organisms/RegistrationModal/RegistrationModal'

const [open, setOpen] = useState(false)
<RegistrationModal isOpen={open} onClose={() => setOpen(false)} onSubscribe={(email) => {}} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'isOpen', type: 'boolean', description: 'Controls visibility.', required: true },
            { name: 'onClose', type: '() => void', description: 'Close handler.', required: true },
            { name: 'title', type: 'string', description: 'Heading copy.', required: false },
            { name: 'description', type: 'string', description: 'Supporting text.', required: false },
            { name: 'onSubscribe', type: '(email: string) => void', description: 'Valid email submit.', required: false },
            { name: 'successMessage', type: 'string', description: 'Alert copy after submit.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
