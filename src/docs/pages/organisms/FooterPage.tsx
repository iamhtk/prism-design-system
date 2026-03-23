import { Footer } from '../../../components/organisms/Footer/Footer'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const scaleWrap = {
  transform: 'scale(0.85)',
  transformOrigin: 'top center' as const,
  width: '100%',
}

const footerCode = `<div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', width: '100%' }}>
  <Footer onSubscribe={() => {}} />
</div>`

export function FooterPage() {
  return (
    <DocsPage
      title="Footer"
      description="Multi-column links, social row, and subscribe CTA with default CWPC structure."
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
              center: false,
              fullWidth: true,
              code: footerCode,
              children: (
                <ComponentDemo padding="sm" background="transparent" fullWidth>
                  <div style={scaleWrap}>
                    <Footer onSubscribe={() => {}} />
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
          code={`import { Footer } from './components/organisms/Footer/Footer'

<Footer columns={columns} socialLinks={links} onSubscribe={() => {}} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'columns', type: 'FooterColumn[]', description: 'Link groups.', required: false },
            { name: 'socialLinks', type: '{ platform; href }[]', description: 'SocialButton data.', required: false },
            { name: 'copyrightText', type: 'string', description: 'Brand line under logo.', required: false },
            { name: 'logoSrc', type: 'string', description: 'Footer mark.', required: false },
            { name: 'onSubscribe', type: '() => void', description: 'Subscribe button.', required: false },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
