import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { Text } from '../../../components/atoms/Text/Text'
import { Modal } from '../../../components/organisms/Modal/Modal'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const sizes = ['sm', 'md', 'lg'] as const

export function ModalPage() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('CWPC pilot agreement')
  const [size, setSize] = useState<(typeof sizes)[number]>('md')
  const [showCloseButton, setShowCloseButton] = useState(true)

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'size') setSize(val as (typeof sizes)[number])
    if (key === 'showCloseButton') setShowCloseButton(Boolean(val))
  }

  const values = { title, size, showCloseButton }

  const interactiveCode = `const [open, setOpen] = useState(false)

<Button label="Open modal" onClick={() => setOpen(true)} />
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="${title.replace(/"/g, '\\"')}"
  size="${size}"
  showCloseButton={${showCloseButton}}
>
  <Text variant="body-md">Confirm your organization details before submitting the pilot intake.</Text>
</Modal>`

  return (
    <DocsPage
      title="Modal"
      description="Portal dialog with sizes, optional title, and backdrop dismiss."
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
              center: true,
              code: interactiveCode,
              children: (
                <>
                  <ComponentDemo center padding="sm" background="transparent">
                    <Button label="Open modal" type="default" onClick={() => setOpen(true)} />
                    <Modal
                      isOpen={open}
                      onClose={() => setOpen(false)}
                      title={title.trim() || undefined}
                      size={size}
                      showCloseButton={showCloseButton}
                    >
                      <Text variant="body-md">
                        Confirm your organization details before submitting the pilot intake.
                      </Text>
                    </Modal>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'text',
                        key: 'title',
                        label: 'title',
                        default: 'CWPC pilot agreement',
                      },
                      {
                        type: 'select',
                        key: 'size',
                        label: 'size',
                        options: [...sizes],
                        default: 'md',
                      },
                      {
                        type: 'boolean',
                        key: 'showCloseButton',
                        label: 'showCloseButton',
                        default: true,
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Small',
              background: 'grid',
              center: true,
              code: `<Modal isOpen={open} onClose={() => setOpen(false)} title="Small" size="sm">
  <Text variant="body-sm">Compact dialog for short confirmations.</Text>
</Modal>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ModalSizeDemo size="sm" title="Small" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Medium',
              background: 'grid',
              center: true,
              code: `<Modal isOpen={open} onClose={() => setOpen(false)} title="Medium" size="md">
  <Text variant="body-md">Default width for forms and marketing copy.</Text>
</Modal>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ModalSizeDemo size="md" title="Medium" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Large',
              background: 'grid',
              center: true,
              code: `<Modal isOpen={open} onClose={() => setOpen(false)} title="Large" size="lg">
  <Text variant="body-md">Wider surface for rich content or embeds.</Text>
</Modal>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent">
                  <ModalSizeDemo size="lg" title="Large" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Modal } from './components/organisms/Modal/Modal'

<Modal isOpen={open} onClose={close} title="Title" size="md" surface="dark">{children}</Modal>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'isOpen', type: 'boolean', description: 'Visibility.', required: true },
            { name: 'onClose', type: '() => void', description: 'Close request.', required: true },
            { name: 'title', type: 'string', description: 'Dialog heading.', required: false },
            { name: 'children', type: 'ReactNode', description: 'Body content.', required: true },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Width token.', required: false },
            { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Header close control.', required: false },
            { name: 'surface', type: "'dark' | 'light'", default: "'dark'", description: 'Dialog chrome.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function ModalSizeDemo({ size, title }: { size: (typeof sizes)[number]; title: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button label={`Open ${size}`} type="outlined" onClick={() => setOpen(true)} />
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title} size={size}>
        <Text variant="body-md">
          {size === 'sm'
            ? 'Compact dialog for short confirmations.'
            : size === 'md'
              ? 'Default width for forms and marketing copy.'
              : 'Wider surface for rich content or embeds.'}
        </Text>
      </Modal>
    </>
  )
}
