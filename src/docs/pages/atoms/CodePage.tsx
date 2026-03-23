import { useState } from 'react'
import { Code } from '../../../components/atoms/Code/Code'
import { Text } from '../../../components/atoms/Text/Text'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

export function CodePage() {
  const [ctrlBlock, setCtrlBlock] = useState(false)
  const [ctrlCopyable, setCtrlCopyable] = useState(false)
  const [ctrlLanguage, setCtrlLanguage] = useState('tsx')
  const [ctrlSnippet, setCtrlSnippet] = useState('const cwpc = true')

  const patch = (key: string, val: unknown) => {
    if (key === 'block') setCtrlBlock(Boolean(val))
    if (key === 'copyable') setCtrlCopyable(Boolean(val))
    if (key === 'language') setCtrlLanguage(String(val))
    if (key === 'snippet') setCtrlSnippet(String(val))
  }

  const values = { block: ctrlBlock, copyable: ctrlCopyable, language: ctrlLanguage, snippet: ctrlSnippet }

  const langLine = ctrlBlock && ctrlLanguage.trim() ? `\n  language="${ctrlLanguage.replace(/"/g, '\\"')}"` : ''
  const copyLine = ctrlBlock && ctrlCopyable ? '\n  copyable' : ''

  const escapedSnippet = ctrlSnippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const interactiveCode = ctrlBlock
    ? `<Code block${langLine}${copyLine}>
${ctrlSnippet
  .split('\n')
  .map((l) => `  ${l}`)
  .join('\n')}
</Code>`
    : `<Text as="p" variant="body-md">
  Configure pilots using <Code>${escapedSnippet}</Code> in your app shell.
</Text>`

  const blockExampleCode = `<Code block language="tsx">
export function scorecardUrl(id: string) {
  return \`/scorecards/\${id}\`
}
</Code>`

  const lineNumberExampleCode = `<Code block language="ts">
type Pilot = { id: string }
const pilots: Pilot[] = []
export default pilots
</Code>`

  return (
    <DocsPage
      title="Code"
      description="Inline and block code snippets with optional language chrome and copy control."
      category="Atoms"
      status="stable"
      figmaNodeId="349:3014"
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
                    {ctrlBlock ? (
                      <Code
                        block
                        language={ctrlLanguage.trim() || undefined}
                        copyable={ctrlCopyable}
                      >
                        {ctrlSnippet}
                      </Code>
                    ) : (
                      <Text as="p" variant="body-md">
                        Configure pilots using <Code>{ctrlSnippet}</Code> in your app shell.
                      </Text>
                    )}
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'boolean', key: 'block', label: 'block', default: false },
                      { type: 'boolean', key: 'copyable', label: 'copyable', default: false },
                      { type: 'text', key: 'language', label: 'language', default: 'tsx' },
                      { type: 'text', key: 'snippet', label: 'snippet', default: 'const cwpc = true' },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Inline',
              background: 'grid',
              center: true,
              code: 'Enable pilots with <Code>const cwpc = true</Code> in configuration.',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Text as="p" variant="body-md">
                    Enable pilots with <Code>const cwpc = true</Code> in configuration.
                  </Text>
                </ComponentDemo>
              ),
            },
            {
              label: 'Block',
              background: 'grid',
              center: true,
              code: blockExampleCode,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Code block language="tsx">
                    {`export function scorecardUrl(id: string) {
  return \`/scorecards/\${id}\`
}`}
                  </Code>
                </ComponentDemo>
              ),
            },
            {
              label: 'With line numbers',
              background: 'grid',
              center: true,
              code: lineNumberExampleCode,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Code block language="ts">
                    {`type Pilot = { id: string }
const pilots: Pilot[] = []
export default pilots`}
                  </Code>
                </ComponentDemo>
              ),
            },
            {
              label: 'Copyable',
              background: 'grid',
              center: true,
              code: `<Code block language="bash" copyable>
npm run dev
</Code>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Code block language="bash" copyable>
                    npm run dev
                  </Code>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Code } from './components/atoms/Code/Code'

<Code block language="tsx" copyable>
  {snippet}
</Code>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', description: 'Code string or nodes to render.', required: true },
            { name: 'block', type: 'boolean', default: 'false', description: 'Switches to preformatted block layout.', required: false },
            { name: 'language', type: 'string', description: 'Optional label in the block chrome.', required: false },
            { name: 'copyable', type: 'boolean', default: 'false', description: 'Shows copy button for block content.', required: false },
            { name: 'className', type: 'string', description: 'Extra classes on inline code or wrapper.', required: false },
          ]}
        />
      </DocsSection>

      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use block mode for multi-line snippets; keep inline code for identifiers and short expressions.',
              children: (
                <Code block language="ts">
                  {`export const REGIONS = ['Southwest', 'Pacific'] as const`}
                </Code>
              ),
            },
            {
              type: 'dont',
              description: "Don't paste secrets or tokens into copyable demos.",
              children: <Code>process.env.API_KEY</Code>,
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Accessibility">
        <AccessibilitySection
          wcagLevel="AA"
          items={[
            {
              type: 'focus',
              label: 'Copy control',
              description: 'Block copy buttons are keyboard-focusable with an aria-label.',
            },
            {
              type: 'keyboard',
              label: 'Inline code',
              description: 'Inline code inherits reading order from surrounding prose.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
