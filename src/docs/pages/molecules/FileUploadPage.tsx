import { useState } from 'react'
import { FileUpload } from '../../../components/molecules/FileUpload/FileUpload'
import uploadStyles from '../../../components/molecules/FileUpload/FileUpload.module.css'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function FileUploadPage() {
  const [multiple, setMultiple] = useState(false)
  const [accept, setAccept] = useState('.pdf,.csv')
  const [disabled, setDisabled] = useState(false)
  const [label, setLabel] = useState('Treatment attachments')

  const patch = (key: string, val: unknown) => {
    if (key === 'multiple') setMultiple(Boolean(val))
    if (key === 'accept') setAccept(String(val))
    if (key === 'disabled') setDisabled(Boolean(val))
    if (key === 'label') setLabel(String(val))
  }

  const values = { multiple, accept, disabled, label }
  const acc = accept.trim() ? `\n  accept="${accept.replace(/"/g, '\\"')}"` : ''
  const mult = multiple ? '\n  multiple' : ''
  const dis = disabled ? '\n  disabled' : ''
  const lab = label.trim() ? `\n  label="${label.replace(/"/g, '\\"')}"` : ''

  const interactiveCode = `<FileUpload${lab}${acc}${mult}${dis} />`

  return (
    <DocsPage
      title="FileUpload"
      description="Drag-and-drop target with keyboard support and a removable file list after selection."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4119"
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
                    <FileUpload
                      label={label.trim() || undefined}
                      accept={accept.trim() || undefined}
                      multiple={multiple}
                      disabled={disabled}
                    />
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'label', label: 'label', default: 'Treatment attachments' },
                      { type: 'text', key: 'accept', label: 'accept', default: '.pdf,.csv' },
                      { type: 'boolean', key: 'multiple', label: 'multiple', default: false },
                      { type: 'boolean', key: 'disabled', label: 'disabled', default: false },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: '<FileUpload />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FileUpload />
                </ComponentDemo>
              ),
            },
            {
              label: 'Accept types',
              background: 'grid',
              center: true,
              code: '<FileUpload accept=".pdf,.geojson" hint="PDF or GeoJSON up to 25 MB." />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FileUpload accept=".pdf,.geojson" hint="PDF or GeoJSON up to 25 MB." />
                </ComponentDemo>
              ),
            },
            {
              label: 'With file',
              background: 'grid',
              center: true,
              code: `/* After user selects a file, list renders like: */
<ul className="fileList">
  <li className="fileRow">…</li>
</ul>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <MockFileRow />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled',
              background: 'grid',
              center: true,
              code: '<FileUpload disabled label="Uploads locked" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <FileUpload disabled label="Uploads locked" />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { FileUpload } from './components/molecules/FileUpload/FileUpload'

<FileUpload accept="image/*" multiple onUpload={(files) => uploadToBucket(files)} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'onUpload', type: '(files: File[]) => void', description: 'Fires after files are accepted.', required: false },
            { name: 'accept', type: 'string', description: 'Native input accept string.', required: false },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows more than one file.', required: false },
            { name: 'maxSize', type: 'number', description: 'Max bytes per file.', required: false },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Locks drop zone.', required: false },
            { name: 'label', type: 'string', description: 'Announced label for the control.', required: false },
            { name: 'hint', type: 'string', description: 'Secondary line inside the drop zone.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'State accepted MIME types or extensions and any size caps in the hint.',
              children: <FileUpload accept=".pdf" hint="Single PDF, max 15 MB." />,
            },
            {
              type: 'dont',
              description: "Don't start uploading to the server before the user confirms sensitive exports.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Confirm before irreversible uploads.</span>
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
              label: 'Drop zone',
              description: 'Zone is focusable and activates the file picker with Enter or Space.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function MockFileRow() {
  return (
    <ul className={uploadStyles.fileList}>
      <li className={uploadStyles.fileRow}>
        <div className={uploadStyles.fileMeta}>
          <span className={uploadStyles.fileName}>pilot-map-june.pdf</span>
          <span className={uploadStyles.fileSize}>1.2 MB</span>
        </div>
        <button type="button" className={uploadStyles.removeBtn} aria-label="Remove pilot-map-june.pdf">
          ×
        </button>
      </li>
    </ul>
  )
}
