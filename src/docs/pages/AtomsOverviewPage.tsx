import { Avatar } from '../../components/atoms/Avatar/Avatar'
import { Badge } from '../../components/atoms/Badge/Badge'
import { Blockquote } from '../../components/atoms/Blockquote/Blockquote'
import { Button } from '../../components/atoms/Button/Button'
import { Code } from '../../components/atoms/Code/Code'
import { Divider } from '../../components/atoms/Divider/Divider'
import { Field } from '../../components/atoms/Field/Field'
import { Heading } from '../../components/atoms/Heading/Heading'
import { Label } from '../../components/atoms/Label/Label'
import { Link } from '../../components/atoms/Link/Link'
import { Loader } from '../../components/atoms/Loader/Loader'
import { MapPin } from '../../components/atoms/MapPin/MapPin'
import { Rating } from '../../components/atoms/Rating/Rating'
import { Skeleton } from '../../components/atoms/Skeleton/Skeleton'
import { Tag } from '../../components/atoms/Tag/Tag'
import { Text } from '../../components/atoms/Text/Text'
import { CategoryOverviewCard, CategoryStatBar } from '../helpers/CategoryOverview'
import styles from '../helpers/CategoryOverview.module.css'
import { DocsPage, DocsSection } from '../helpers/DocsPage'

export function AtomsOverviewPage() {
  return (
    <DocsPage
      title="Atoms"
      description="The smallest building blocks of the CWPC design system. Atoms are self-contained and have no dependencies on other components. They form the foundation that everything else is built on."
      category="Foundation"
      status="stable"
    >
      <CategoryStatBar
        segments={[
          { strong: '17', rest: 'Components' },
          { strong: 'Self-contained' },
          { strong: 'No dependencies' },
        ]}
      />
      <DocsSection>
        <div className={styles.grid}>
          <CategoryOverviewCard
            title="Button"
            description="Interactive button with 3 types and 5 states"
            to="/docs/atoms/button"
            categoryLabel="ATOM"
            preview={<Button label="Click me" type="default" />}
          />
          <CategoryOverviewCard
            title="Label"
            description="Form field label with optional required marker and hint"
            to="/docs/atoms/label"
            categoryLabel="ATOM"
            preview={<Label text="Email address" required />}
          />
          <CategoryOverviewCard
            title="Field"
            description="White input box in all 5 interaction states"
            to="/docs/atoms/field"
            categoryLabel="ATOM"
            preview={<Field placeholder="Enter text..." status="default" />}
          />
          <CategoryOverviewCard
            title="Link"
            description="Styled anchor with primary and information variants"
            to="/docs/atoms/link"
            categoryLabel="ATOM"
            preview={
              <Link href="#" variant="primary">
                View documentation →
              </Link>
            }
          />
          <CategoryOverviewCard
            title="Badge"
            description="Small status pill in 6 semantic color variants"
            to="/docs/atoms/badge"
            categoryLabel="ATOM"
            preview={
              <div className={styles.previewRow}>
                <Badge label="Primary" variant="primary" />
                <Badge label="Success" variant="success" />
                <Badge label="Error" variant="error" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Tag"
            description="Removable chip for filters and selections"
            to="/docs/atoms/tag"
            categoryLabel="ATOM"
            preview={
              <div className={styles.previewRow}>
                <Tag label="React" onRemove={() => {}} />
                <Tag label="Design" variant="primary" onRemove={() => {}} />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Loader"
            description="CSS spinning indicator in 3 sizes"
            to="/docs/atoms/loader"
            categoryLabel="ATOM"
            preview={
              <div className={styles.previewRow}>
                <Loader size="sm" />
                <Loader size="md" />
                <Loader size="lg" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Divider"
            description="Horizontal separator with optional center label"
            to="/docs/atoms/divider"
            categoryLabel="ATOM"
            preview={
              <div className={styles.dividerNarrow}>
                <Divider label="OR" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Avatar"
            description="User profile circle with image, initials or status"
            to="/docs/atoms/avatar"
            categoryLabel="ATOM"
            preview={
              <div className={styles.previewRow}>
                <Avatar name="Alex Kim" size="sm" />
                <Avatar name="Jordan Lee" size="md" />
                <Avatar name="Sam Rivera" size="lg" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Skeleton"
            description="Shimmering loading placeholder"
            to="/docs/atoms/skeleton"
            categoryLabel="ATOM"
            preview={<Skeleton variant="text" lines={2} width="140px" />}
          />
          <CategoryOverviewCard
            title="Heading"
            description="H1 through H6 with CWPC type scale"
            to="/docs/atoms/heading"
            categoryLabel="ATOM"
            preview={
              <Heading level={3} color="primary">
                Heading
              </Heading>
            }
          />
          <CategoryOverviewCard
            title="Text"
            description="Body text in all size and color variants"
            to="/docs/atoms/text"
            categoryLabel="ATOM"
            preview={
              <div className={styles.previewCol}>
                <Text variant="body-lg">Large</Text>
                <Text variant="body-md">Medium</Text>
                <Text variant="body-xs" color="caption">
                  Small caption
                </Text>
              </div>
            }
          />
          <CategoryOverviewCard
            title="Blockquote"
            description="Styled quote with left border accent"
            to="/docs/atoms/blockquote"
            categoryLabel="ATOM"
            preview={
              <Blockquote variant="primary" cite="CWPC">
                Prevention starts with community data.
              </Blockquote>
            }
          />
          <CategoryOverviewCard
            title="Code"
            description="Inline and block code display"
            to="/docs/atoms/code"
            categoryLabel="ATOM"
            preview={
              <Code>
                const cwpc = true
              </Code>
            }
          />
          <CategoryOverviewCard
            title="Image"
            description="Responsive image with aspect ratios and captions"
            to="/docs/atoms/image"
            categoryLabel="ATOM"
            preview={
              <div className={styles.imageIconFallback} aria-hidden>
                🖼
              </div>
            }
          />
          <CategoryOverviewCard
            title="MapPin"
            description="CWPC location marker in all color variants"
            to="/docs/atoms/mappin"
            categoryLabel="ATOM"
            preview={
              <div className={styles.previewRow}>
                <MapPin color="primary" size="sm" />
                <MapPin color="success" size="sm" />
                <MapPin color="error" size="sm" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Rating"
            description="Interactive 5-star rating component"
            to="/docs/atoms/rating"
            categoryLabel="ATOM"
            preview={<Rating value={4} readonly />}
          />
        </div>
      </DocsSection>
    </DocsPage>
  )
}
