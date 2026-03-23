import { useState } from 'react'
import { Button } from '../../../components/atoms/Button/Button'
import { Link } from '../../../components/atoms/Link/Link'
import { Text } from '../../../components/atoms/Text/Text'
import { Card } from '../../../components/organisms/Card/Card'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const variants = ['default', 'highlighted'] as const
const titleColors = ['primary', 'information'] as const

const DEMO_IMG =
  'https://placehold.co/720x400/232329/FF6701/png?text=CWPC+Pilot'

export function CardPage() {
  const [title, setTitle] = useState('Community wildfire resilience')
  const [variant, setVariant] = useState<(typeof variants)[number]>('default')
  const [titleColor, setTitleColor] = useState<(typeof titleColors)[number]>('primary')

  const patch = (key: string, val: unknown) => {
    if (key === 'title') setTitle(String(val))
    if (key === 'variant') setVariant(val as (typeof variants)[number])
    if (key === 'titleColor') setTitleColor(val as (typeof titleColors)[number])
  }

  const values = { title, variant, titleColor }
  const interactiveCode = `<Card
  title="${title.replace(/"/g, '\\"')}"
  variant="${variant}"
  titleColor="${titleColor}"
>
  <p>Body copy and actions go in children.</p>
  <Button type="default" label="View scorecard" />
</Card>`

  return (
    <DocsPage
      title="Card"
      description="Marketing and editorial surface with optional hero image, highlighted border, and footer slot."
      category="Organisms"
      status="stable"
      figmaNodeId="351:5002"
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
                    <Card title={title} variant={variant} titleColor={titleColor}>
                      <Text variant="body-md" color="default">
                        Pilot counties pair fuel treatments with workforce programs to bend the risk curve.
                      </Text>
                      <div style={{ marginTop: 'var(--space-500)' }}>
                        <Button type="default" label="View scorecard" />
                      </div>
                    </Card>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      { type: 'text', key: 'title', label: 'title', default: 'Community wildfire resilience' },
                      {
                        type: 'select',
                        key: 'variant',
                        label: 'variant',
                        options: [...variants],
                        default: 'default',
                      },
                      {
                        type: 'select',
                        key: 'titleColor',
                        label: 'titleColor',
                        options: [...titleColors],
                        default: 'primary',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: `<Card title="Pilot spotlight">
  <p>Body text</p>
  <Button type="default" label="Learn more" />
</Card>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Card title="Pilot spotlight">
                    <Text variant="body-md" color="default">
                      Maricopa County reduced high-hazard acres by 18% this season.
                    </Text>
                    <div style={{ marginTop: 'var(--space-500)' }}>
                      <Button type="default" label="Learn more" />
                    </div>
                  </Card>
                </ComponentDemo>
              ),
            },
            {
              label: 'Highlighted',
              background: 'grid',
              center: true,
              code: '<Card variant="highlighted" title="Certified region" titleColor="information">…</Card>',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Card variant="highlighted" title="Certified region" titleColor="information">
                    <Text variant="body-md" color="default">
                      This jurisdiction met all CWPC readiness checkpoints.
                    </Text>
                  </Card>
                </ComponentDemo>
              ),
            },
            {
              label: 'With image',
              background: 'grid',
              center: true,
              code: '<Card title="Field briefing" imageSrc="…" imageAlt="Crew at work" />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Card
                    title="Field briefing"
                    imageSrc={DEMO_IMG}
                    imageAlt="CWPC crew reviewing treatment map"
                  >
                    <Text variant="body-md" color="default">
                      Morning safety sync before mechanical thinning along the northern corridor.
                    </Text>
                  </Card>
                </ComponentDemo>
              ),
            },
            {
              label: 'With footer',
              background: 'grid',
              center: true,
              code: '<Card title="News" footer={<a href="#">Read all</a>}>…</Card>',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <Card
                    title="Latest updates"
                    footer={
                      <Link href="#" variant="primary" underline="hover">
                        View archive
                      </Link>
                    }
                  >
                    <Text variant="body-md" color="default">
                      New GIS layers for Q2 are available to pilot admins.
                    </Text>
                  </Card>
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { Card } from './components/organisms/Card/Card'

<Card variant="highlighted" title="Headline" imageSrc={src} imageAlt="…">{content}</Card>`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'title', type: 'string', description: 'Heading inside the card.', required: false },
            {
              name: 'titleColor',
              type: "'primary' | 'information'",
              default: "'primary'",
              description: 'Heading color token.',
              required: false,
            },
            { name: 'imageSrc', type: 'string', description: 'Hero image URL.', required: false },
            { name: 'imageAlt', type: 'string', description: 'Alt text for the image.', required: false },
            { name: 'children', type: 'ReactNode', description: 'Body content.', required: false },
            { name: 'footer', type: 'ReactNode', description: 'Footer row below content.', required: false },
            {
              name: 'variant',
              type: "'default' | 'highlighted'",
              default: "'default'",
              description: 'Highlighted adds success border treatment.',
              required: false,
            },
            { name: 'width', type: 'string', description: 'Optional CSS width.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Pair imagery with concise copy and a single primary button.',
              children: <Card title="Example" />,
            },
            {
              type: 'dont',
              description: "Don't nest multiple competing primary buttons without hierarchy.",
              children: (
                <Text variant="body-sm" color="caption">
                  Use one default button per card.
                </Text>
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
              label: 'Images',
              description: 'Provide imageAlt whenever imageSrc is set.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}
