import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { DemoBlock, SectionDivider } from './app/DemoSection'
import demoLayoutStyles from './app/demoLayout.module.css'
import { Avatar, AvatarGroup } from './components/atoms/Avatar/Avatar'
import { Badge } from './components/atoms/Badge/Badge'
import { Blockquote } from './components/atoms/Blockquote/Blockquote'
import { Button } from './components/atoms/Button/Button'
import { Code } from './components/atoms/Code/Code'
import { Divider } from './components/atoms/Divider/Divider'
import { Heading } from './components/atoms/Heading/Heading'
import { Image } from './components/atoms/Image/Image'
import { Field } from './components/atoms/Field/Field'
import { Label } from './components/atoms/Label/Label'
import { Link } from './components/atoms/Link/Link'
import { MapPin } from './components/atoms/MapPin/MapPin'
import { Loader } from './components/atoms/Loader/Loader'
import { Rating } from './components/atoms/Rating/Rating'
import { Skeleton } from './components/atoms/Skeleton/Skeleton'
import { Tag } from './components/atoms/Tag/Tag'
import { Text } from './components/atoms/Text/Text'
import { Breadcrumb } from './components/molecules/Breadcrumb/Breadcrumb'
import { ButtonGroup } from './components/molecules/ButtonGroup/ButtonGroup'
import { Checkbox } from './components/molecules/Checkbox/Checkbox'
import { ContextMenu } from './components/molecules/ContextMenu/ContextMenu'
import { DatePicker } from './components/molecules/DatePicker/DatePicker'
import { List } from './components/molecules/List/List'
import { Dropdown } from './components/molecules/Dropdown/Dropdown'
import { FilterBar } from './components/molecules/FilterBar/FilterBar'
import { EmptyState } from './components/molecules/EmptyState/EmptyState'
import { FileUpload } from './components/molecules/FileUpload/FileUpload'
import { ScrollToTop } from './components/molecules/ScrollToTop/ScrollToTop'
import { SearchBar } from './components/molecules/SearchBar/SearchBar'
import { StatCard } from './components/molecules/StatCard/StatCard'
import { Stepper } from './components/molecules/Stepper/Stepper'
import { Input } from './components/molecules/Input/Input'
import { Pagination } from './components/molecules/Pagination/Pagination'
import { Popover } from './components/molecules/Popover/Popover'
import { ProgressBar } from './components/molecules/ProgressBar/ProgressBar'
import { ProgressCircle } from './components/molecules/ProgressCircle/ProgressCircle'
import { RadioButton } from './components/molecules/RadioButton/RadioButton'
import { SocialButton } from './components/molecules/SocialButton/SocialButton'
import { SocialButtonGroup } from './components/molecules/SocialButton/SocialButtonGroup'
import { Switch } from './components/molecules/Switch/Switch'
import { TabBar, type TabItem } from './components/molecules/TabBar/TabBar'
import { TextArea } from './components/molecules/TextArea/TextArea'
import { Tooltip } from './components/molecules/Tooltip/Tooltip'
import { AccordionItem } from './components/organisms/AccordionItem/AccordionItem'
import { Banner } from './components/organisms/Banner/Banner'
import { Alert } from './components/organisms/Alert/Alert'
import { Card } from './components/organisms/Card/Card'
import { ErrorPage } from './components/organisms/ErrorPage/ErrorPage'
import {
  Footer,
  CWPC_LOGO_SRC_DEFAULT,
} from './components/organisms/Footer/Footer'
import { GridLayout } from './components/organisms/GridLayout/GridLayout'
import { Forms, type FormField } from './components/organisms/Forms/Forms'
import { SuccessScreen } from './components/organisms/SuccessScreen/SuccessScreen'
import { Menu } from './components/organisms/Menu/Menu'
import { MenuItem } from './components/organisms/Menu/MenuItem'
import { Modal } from './components/organisms/Modal/Modal'
import { NotificationBar } from './components/molecules/NotificationBar/NotificationBar'
import { ProfileCard } from './components/organisms/ProfileCard/ProfileCard'
import { RegistrationModal } from './components/organisms/RegistrationModal/RegistrationModal'
import { SubscribeWidget } from './components/molecules/SubscribeWidget/SubscribeWidget'
import { VideoCard } from './components/organisms/VideoCard/VideoCard'
import { Panel } from './components/organisms/Panel/Panel'
import { Navbar } from './components/organisms/Navbar/Navbar'
import { SecondaryNav } from './components/organisms/SecondaryNav/SecondaryNav'
import { Table, type TableColumn } from './components/organisms/Table/Table'
import { VideoPlayer } from './components/organisms/VideoPlayer/VideoPlayer'
import { ToastProvider } from './components/organisms/Toast/ToastProvider'
import { useToast } from './components/organisms/Toast/useToast'
import './App.css'
import homeStyles from './DesignSystemHome.module.css'

const infoIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      fill="currentColor"
    />
  </svg>
)

const mailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill="currentColor"
    />
  </svg>
)

const socialPlatforms = [
  'facebook',
  'twitter',
  'linkedin',
  'youtube',
  'instagram',
] as const

const loaderSizes = ['sm', 'md', 'lg'] as const
const loaderVariants = ['primary', 'success', 'info'] as const

const tabBarDemoTabs: TabItem[] = [
  { id: 'overview', label: 'Overview', badge: 3 },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings', disabled: true },
  { id: 'export', label: 'Export', badge: 12 },
]

const cwpcTableColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'location', label: 'Location', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 'var(--space-1500)',
    align: 'center',
  },
]

const cwpcTableRows = [
  {
    name: 'Jordan Lee',
    role: 'Fire ecologist',
    location: 'Reno, NV',
    status: 'Pilot',
  },
  {
    name: 'Samira Khan',
    role: 'Community liaison',
    location: 'Sacramento, CA',
    status: 'Active',
  },
  {
    name: 'Chris Okonkwo',
    role: 'Data analyst',
    location: 'Bend, OR',
    status: 'Active',
  },
  {
    name: 'Avery Chen',
    role: 'Grant coordinator',
    location: 'Denver, CO',
    status: 'Review',
  },
  {
    name: 'Morgan Ellis',
    role: 'Field operations',
    location: 'Flagstaff, AZ',
    status: 'Active',
  },
]

const demoNavbarItems = [
  { label: 'Home', href: '/' },
  { label: 'Showcase', href: '/showcase', hasDropdown: true },
  { label: 'Scorecard', href: '/scorecard', hasDropdown: true },
  { label: 'Sponsor', href: '/sponsor' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

const demoSecondaryNavItems = [
  { label: 'Showcase', href: '/showcase' },
  { label: 'Assess', href: '/assess' },
  { label: 'Scorecard', href: '/scorecard' },
  { label: 'Sponsor', href: '/sponsor' },
  { label: 'Pilot', href: '/pilot' },
  { label: 'Collaborate', href: '/collaborate' },
  { label: 'Subscribe', href: '/subscribe' },
  { label: 'Share', href: '/share' },
  { label: 'Support', href: '/support' },
  { label: 'Contribute', href: '/contribute' },
] as const

const dropdownSectionOptions = [
  { label: 'Showcase', value: 'showcase' },
  { label: 'Sponsor', value: 'sponsor' },
  { label: 'Scorecard', value: 'scorecard' },
  { label: 'Pilot', value: 'pilot' },
  { label: 'Collaborate', value: 'collaborate' },
] as const

function ToastDemoSection() {
  const { addToast } = useToast()
  return (
    <>
      <h2 id="toast-heading" className="buttonDemo_heading">
        Toast triggers
      </h2>
      <div className="layoutDemo_toastButtons">
        <Button
          label="Show Success"
          type="outlined"
          onClick={() =>
            addToast('Your changes were saved.', 'success', 'Success')
          }
        />
        <Button
          label="Show Error"
          type="outlined"
          onClick={() =>
            addToast('Something went wrong. Try again.', 'error', 'Error')
          }
        />
        <Button
          label="Show Warning"
          type="outlined"
          onClick={() =>
            addToast('Review pilot data before publishing.', 'warning', 'Warning')
          }
        />
        <Button
          label="Show Info"
          type="outlined"
          onClick={() =>
            addToast('Office hours: Wednesdays 2–3pm PT.', 'info', 'Info')
          }
        />
      </div>
    </>
  )
}

const buttonTypes = ['default', 'outlined', 'transparent'] as const

const buttonStates = [
  'default',
  'hover',
  'pressed',
  'focus',
  'disabled',
] as const

const fieldStatuses = [
  'default',
  'hover',
  'focus',
  'error',
  'disabled',
] as const

const scorecardFormFields: FormField[] = [
  { label: 'First Name', type: 'text', required: true },
  { label: 'Last Name', type: 'text', required: true },
  { label: 'Email', type: 'email', required: true, iconType: 'email' },
  { label: 'Organization', type: 'text' },
  { label: 'Role', type: 'text' },
  { label: 'Zip Code', type: 'text', required: true },
  { label: 'Message', type: 'text' },
]

export default function DesignSystemHome() {
  const [radioGroupValue, setRadioGroupValue] = useState('b')
  const [textAreaDefault, setTextAreaDefault] = useState('')
  const [textAreaCount, setTextAreaCount] = useState('')
  const [removableTags, setRemovableTags] = useState({
    alpha: true,
    beta: true,
    gamma: true,
  })
  const [demoTabId, setDemoTabId] = useState('overview')
  const [modalOpen, setModalOpen] = useState(false)
  const [paginationPage, setPaginationPage] = useState(3)
  const [ratingDemo, setRatingDemo] = useState(4)
  const [searchBarValue, setSearchBarValue] = useState('')
  const [stepperDemoStep, setStepperDemoStep] = useState(1)
  const [filterMulti, setFilterMulti] = useState<string[]>([])
  const [filterSingle, setFilterSingle] = useState<string[]>(['active'])
  const [pickerDate, setPickerDate] = useState<Date | undefined>(
    () => new Date(),
  )
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelLeftOpen, setPanelLeftOpen] = useState(false)
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false)

  const demoFilterOptions = [
    { label: 'All', value: 'all', count: 24 },
    { label: 'Active', value: 'active', count: 8 },
    { label: 'Draft', value: 'draft', count: 3 },
    { label: 'Archived', value: 'archived', count: 13 },
  ]

  const searchBarSuggestions = [
    'Wildfire risk assessment',
    'Community preparedness',
    'Fuel reduction',
    'Evacuation routes',
  ]

  const stepperDemoSteps = [
    { label: 'Account', description: 'Sign up and verify email' },
    { label: 'Organization', description: 'Add team details' },
    { label: 'Review', description: 'Confirm and submit' },
    { label: 'Launch', description: 'Go live' },
  ]

  return (
    <ToastProvider position="top-right">
    <div className={homeStyles.pageRoot}>
      <div className={homeStyles.announcementBar}>
        <span aria-hidden>📖</span>
        <span>View the full interactive documentation</span>
        <RouterLink to="/docs" className={homeStyles.docsLink}>
          CWPC Design System Docs →
        </RouterLink>
      </div>
      <Navbar
        items={[...demoNavbarItems]}
        activeHref="/"
        logoSrc={CWPC_LOGO_SRC_DEFAULT}
      />
      <SecondaryNav items={[...demoSecondaryNavItems]} activeHref="/showcase" />
      <main
        className={`${demoLayoutStyles.main} ${homeStyles.mainInner}`}
      >
      <h1 className={homeStyles.pageTitle}>CWPC Design System</h1>
      <p className={homeStyles.docLinks}>
        <RouterLink to="/docs/layout" className={homeStyles.docLinkInline}>Layout &amp; spacing</RouterLink>
        <RouterLink to="/docs/elevation" className={homeStyles.docLinkInline}>Elevation</RouterLink>
        <RouterLink to="/docs/grid" className={homeStyles.docLinkInline}>Grid system</RouterLink>
        <RouterLink to="/docs/background-blur" className={homeStyles.docLinkInline}>Background blur</RouterLink>
      </p>

      <SectionDivider label="FOUNDATION" first />
      <DemoBlock label="Colors">
        <div className={demoLayoutStyles.colorSwatchRow}>
          <div className={demoLayoutStyles.colorSwatch}>
            <div className={demoLayoutStyles.colorSwatchTile} style={{ background: 'var(--color-primary-default)' }} />
            <Text variant="body-sm">Primary</Text>
          </div>
          <div className={demoLayoutStyles.colorSwatch}>
            <div className={demoLayoutStyles.colorSwatchTile} style={{ background: 'var(--color-success-default)' }} />
            <Text variant="body-sm">Success</Text>
          </div>
          <div className={demoLayoutStyles.colorSwatch}>
            <div className={demoLayoutStyles.colorSwatchTile} style={{ background: 'var(--color-warning-default)' }} />
            <Text variant="body-sm">Warning</Text>
          </div>
          <div className={demoLayoutStyles.colorSwatch}>
            <div className={demoLayoutStyles.colorSwatchTile} style={{ background: 'var(--color-error-default)' }} />
            <Text variant="body-sm">Error</Text>
          </div>
          <div className={demoLayoutStyles.colorSwatch}>
            <div className={demoLayoutStyles.colorSwatchTile} style={{ background: 'var(--color-information-default)' }} />
            <Text variant="body-sm">Info</Text>
          </div>
        </div>
      </DemoBlock>
      <DemoBlock label="Typography">
        <div className="layoutDemo_atomColumn">
          <Heading level={1}>Heading level 1</Heading>
          <Heading level={2}>Heading level 2</Heading>
          <Heading level={3}>Heading level 3</Heading>
          <Heading level={4}>Heading level 4</Heading>
          <Heading level={5}>Heading level 5</Heading>
          <Heading level={6}>Heading level 6</Heading>
          <Text variant="body-xl">Body XL</Text>
          <Text variant="body-lg">Body large</Text>
          <Text variant="body-md">Body medium</Text>
          <Text variant="body-sm">Body small</Text>
          <Text variant="body-xs">Body extra small</Text>
        </div>
      </DemoBlock>

      <SectionDivider label="ATOMS" />

      <DemoBlock label="Button">
      <section className="buttonDemo_section" aria-labelledby="types-heading">
        <h2 id="types-heading" className="buttonDemo_heading">
          Types (interactive)
        </h2>
        <div className="buttonDemo_row">
          <Button
            label="Button Text"
            type="default"
            iconLeft={infoIcon}
            iconRight={infoIcon}
          />
          <Button
            label="Button Text"
            type="outlined"
            iconLeft={infoIcon}
            iconRight={infoIcon}
          />
          <Button
            label="Button Text"
            type="transparent"
            iconLeft={infoIcon}
            iconRight={infoIcon}
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="states-heading">
        <h2 id="states-heading" className="buttonDemo_heading">
          States
        </h2>
        {buttonStates.map((state) => (
          <div key={state} className="buttonDemo_stateRow">
            <span className="buttonDemo_stateLabel">{state}</span>
            <div className="buttonDemo_row">
              {buttonTypes.map((t) => (
                <Button
                  key={t}
                  label="Button Text"
                  type={t}
                  status={state}
                  iconLeft={infoIcon}
                  iconRight={infoIcon}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
      </DemoBlock>

      <DemoBlock label="Label">
      <section className="buttonDemo_section" aria-labelledby="label-heading">
        <h2 id="label-heading" className="buttonDemo_heading">
          Label
        </h2>
        <div className="labelDemo_stack">
          <Label text="Email address" />
          <Label text="Password" required />
          <Label text="Phone number" hint />
        </div>
      </section>
      </DemoBlock>

      <DemoBlock label="Field">
      <section className="buttonDemo_section" aria-labelledby="field-heading">
        <h2 id="field-heading" className="buttonDemo_heading">
          Field
        </h2>
        <div className="fieldDemo_container">
          <div className="fieldDemo_stack">
            {fieldStatuses.map((state) => (
              <div key={state} className="fieldDemo_row">
                <span className="fieldDemo_stateLabel">{state}</span>
                <Field status={state} placeholder="Enter text…" />
              </div>
            ))}
          </div>
        </div>
      </section>
      </DemoBlock>

      <section className="buttonDemo_section" aria-labelledby="link-heading">
        <h2 id="link-heading" className="buttonDemo_heading">
          Link
        </h2>
        <p className="linkDemo_paragraph">
          Default link with underline on hover:{' '}
          <Link href="#">Learn more</Link>
          {' · '}
          <Link href="#" underline="always">
            Always underlined
          </Link>
          {' · '}
          <Link href="#" underline="never">
            No underline
          </Link>
          {' · '}
          Primary variant:{' '}
          <Link href="#" variant="primary">
            CWPC primary
          </Link>
          {' · '}
          <Link href="#" variant="primary" underline="always">
            Primary always on
          </Link>
          {' · '}
          Disabled:{' '}
          <Link href="#" disabled>
            Unavailable
          </Link>
          {' · '}
          <Link href="https://example.com" external>
            External
          </Link>
        </p>
      </section>

      <section className="buttonDemo_section" aria-labelledby="badge-heading">
        <h2 id="badge-heading" className="buttonDemo_heading">
          Badge
        </h2>
        <div className="badgeDemo_row">
          <Badge label="Primary" variant="primary" size="sm" dot />
          <Badge label="Success" variant="success" size="sm" dot />
          <Badge label="Warning" variant="warning" size="sm" dot />
          <Badge label="Error" variant="error" size="sm" dot />
          <Badge label="Info" variant="info" size="sm" dot />
          <Badge label="Neutral" variant="neutral" size="sm" dot />
        </div>
        <div className="badgeDemo_row">
          <Badge label="Primary" variant="primary" size="md" dot />
          <Badge label="Success" variant="success" size="md" dot />
          <Badge label="Warning" variant="warning" size="md" dot />
          <Badge label="Error" variant="error" size="md" dot />
          <Badge label="Info" variant="info" size="md" dot />
          <Badge label="Neutral" variant="neutral" size="md" dot />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="tag-heading">
        <h2 id="tag-heading" className="buttonDemo_heading">
          Tag
        </h2>
        <div className="tagDemo_row">
          {removableTags.alpha ? (
            <Tag
              label="Removable (default)"
              variant="default"
              onRemove={() =>
                setRemovableTags((s) => ({ ...s, alpha: false }))
              }
            />
          ) : null}
          {removableTags.beta ? (
            <Tag
              label="Removable (primary)"
              variant="primary"
              onRemove={() =>
                setRemovableTags((s) => ({ ...s, beta: false }))
              }
            />
          ) : null}
          {removableTags.gamma ? (
            <Tag
              label="Removable (success)"
              variant="success"
              onRemove={() =>
                setRemovableTags((s) => ({ ...s, gamma: false }))
              }
            />
          ) : null}
          <Tag label="Static (default)" variant="default" />
          <Tag label="Static (primary)" variant="primary" />
          <Tag label="Disabled" variant="success" disabled />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="loader-heading">
        <h2 id="loader-heading" className="buttonDemo_heading">
          Loader
        </h2>
        <div className="loaderDemo_grid">
          {loaderSizes.flatMap((size) =>
            loaderVariants.map((variant) => (
              <div
                key={`${size}-${variant}`}
                className="loaderDemo_cell"
              >
                <Loader
                  size={size}
                  variant={variant}
                  label={`Loading ${size} ${variant}`}
                />
              </div>
            )),
          )}
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="divider-heading">
        <h2 id="divider-heading" className="buttonDemo_heading">
          Divider
        </h2>
        <Divider orientation="horizontal" />
        <Divider orientation="horizontal" label="OR" spacing="md" />
        <div className="dividerVerticalDemo">
          <p className="dividerVerticalDemo_text">Before</p>
          <Divider orientation="vertical" spacing="md" />
          <p className="dividerVerticalDemo_text">After</p>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="avatar-heading">
        <h2 id="avatar-heading" className="buttonDemo_heading">
          Avatar
        </h2>
        <div className="layoutDemo_avatarRow">
          <Avatar name="Alex Morgan" size="xs" />
          <Avatar name="Alex Morgan" size="sm" />
          <Avatar name="Alex Morgan" size="md" />
          <Avatar name="Alex Morgan" size="lg" />
          <Avatar name="Alex Morgan" size="xl" />
        </div>
        <div className="layoutDemo_avatarRow">
          <Avatar name="Jordan Lee" status="online" />
          <Avatar name="Samira Khan" status="offline" />
          <Avatar name="Chris Okonkwo" status="away" />
        </div>
        <div className="layoutDemo_avatarRow">
          <AvatarGroup
            max={6}
            avatars={[
              { name: 'Avery Chen' },
              { name: 'Morgan Ellis' },
              { name: 'Riley Park' },
              { name: 'Taylor Brooks' },
              { name: 'Casey Nguyen' },
              { name: 'Jamie Rivera' },
            ]}
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="skeleton-heading">
        <h2 id="skeleton-heading" className="buttonDemo_heading">
          Skeleton
        </h2>
        <div className="layoutDemo_skeleton">
          <Skeleton variant="text" lines={3} animated />
          <Skeleton variant="circle" animated />
          <Skeleton variant="card" animated />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="heading-atom-heading">
        <h2 id="heading-atom-heading" className="buttonDemo_heading">
          Heading (atom)
        </h2>
        <div className="layoutDemo_atomColumn">
          <Heading level={1}>Level 1 heading</Heading>
          <Heading level={2} color="primary">
            Level 2 primary
          </Heading>
          <Heading level={3} color="tertiary">
            Level 3 tertiary
          </Heading>
          <Heading level={4} color="info" weight="semibold">
            Level 4 info
          </Heading>
          <Heading level={5} color="success">
            Level 5 success
          </Heading>
          <Heading level={6} color="secondary" weight="regular" align="center">
            Level 6 secondary centered
          </Heading>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="text-atom-heading">
        <h2 id="text-atom-heading" className="buttonDemo_heading">
          Text (atom)
        </h2>
        <div className="layoutDemo_atomColumn">
          <Text variant="body-xl">Body XL</Text>
          <Text variant="body-lg" color="primary">
            Body large primary
          </Text>
          <Text variant="body-md">Body medium default</Text>
          <Text variant="body-sm" color="caption">
            Body small caption color
          </Text>
          <Text variant="body-xs">Body extra small (compact)</Text>
          <Text variant="caption">Caption variant</Text>
          <Text variant="label" as="span">
            Label variant
          </Text>
          <Text color="error" weight="semibold">
            Error emphasis
          </Text>
          <div className="layoutDemo_textTruncate">
            <Text truncate>
              This line is truncated when it overflows the container width.
            </Text>
          </div>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="blockquote-atom-heading">
        <h2 id="blockquote-atom-heading" className="buttonDemo_heading">
          Blockquote (atom)
        </h2>
        <div className="layoutDemo_atomColumn">
          <Blockquote cite="CWPC Field Notes, 2024">
            Default variant for pull quotes and callouts in long-form content.
          </Blockquote>
          <Blockquote variant="primary" cite="Operations lead">
            Primary emphasis for mission-critical guidance.
          </Blockquote>
          <Blockquote variant="success" cite="Safety review">
            Success variant highlights positive outcomes and confirmations.
          </Blockquote>
          <Blockquote variant="info" cite="Data services">
            Info variant for references and technical context.
          </Blockquote>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="code-atom-heading">
        <h2 id="code-atom-heading" className="buttonDemo_heading">
          Code (atom)
        </h2>
        <div className="layoutDemo_atomColumn">
          <Text as="div">
            Inline code: <Code>npm run build</Code> in your terminal.
          </Text>
          <Code block language="ts" copyable>
            {`type WildfireRisk = 'low' | 'moderate' | 'high';

function assess(zone: string): WildfireRisk {
  return 'moderate';
}`}
          </Code>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="image-atom-heading">
        <h2 id="image-atom-heading" className="buttonDemo_heading">
          Image (atom)
        </h2>
        <div className="layoutDemo_atomColumn layoutDemo_imageMax">
          <Image
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.png"
            alt="Pink flower"
            caption="Photo credit: MDN sample assets."
            aspectRatio="16/9"
            rounded="lg"
          />
          <Text as="p" variant="caption" color="caption">
            Broken URL with fallback
          </Text>
          <Image
            src="https://example.invalid/missing.png"
            alt=""
            fallback="https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.png"
            aspectRatio="4/3"
            rounded="md"
          />
          <Text as="p" variant="caption" color="caption">
            Error placeholder (no valid fallback)
          </Text>
          <Image src="https://example.invalid/bad" alt="Missing" rounded="sm" />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="mappin-atom-heading">
        <h2 id="mappin-atom-heading" className="buttonDemo_heading">
          MapPin (atom)
        </h2>
        <div className="layoutDemo_atomRow">
          <MapPin size="sm" color="primary" />
          <MapPin size="md" color="success" label="HQ" active />
          <MapPin
            size="lg"
            color="warning"
            label="Sector 4"
            onClick={() => {
              /* demo */
            }}
          />
          <MapPin size="md" color="error" />
          <MapPin size="md" color="info" />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="rating-atom-heading">
        <h2 id="rating-atom-heading" className="buttonDemo_heading">
          Rating (atom)
        </h2>
        <div className="layoutDemo_atomColumn">
          <div className="layoutDemo_atomRow">
            <Text as="span" variant="caption">
              sm
            </Text>
            <Rating size="sm" value={3} readonly />
            <Text as="span" variant="caption">
              md readonly
            </Text>
            <Rating value={4} max={5} readonly showValue />
          </div>
          <div className="layoutDemo_atomRow">
            <Text as="span" variant="caption">
              lg interactive
            </Text>
            <Rating
              size="lg"
              value={ratingDemo}
              onChange={setRatingDemo}
              showValue
            />
          </div>
          <Text variant="caption" color="caption">
            Uncontrolled (internal state):
          </Text>
          <Rating />
        </div>
      </section>

      <DemoBlock label="Spinner">
        <Text as="p" variant="caption" color="caption">
          No standalone Spinner component — use the Loader atom for spinners.
        </Text>
      </DemoBlock>

      <SectionDivider label="MOLECULES" />

      <DemoBlock label="Input">
      <section className="buttonDemo_section" aria-labelledby="input-heading">
        <h2 id="input-heading" className="buttonDemo_heading">
          Input
        </h2>
        <div className="inputDemo_row">
          <Input
            label="Field label"
            placeholder="Placeholder"
            showHintIcon
            iconLeft={infoIcon}
            iconRight={infoIcon}
            hint="Hint text here"
            width="380px"
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            iconLeft={mailIcon}
            hint="We'll never share your email."
            width="380px"
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            required
            iconRight={infoIcon}
            hint="Must be at least 8 characters."
            width="380px"
          />
        </div>
      </section>
      </DemoBlock>

      <DemoBlock label="Checkbox">
      <section className="buttonDemo_section" aria-labelledby="checkbox-heading">
        <h2 id="checkbox-heading" className="buttonDemo_heading">
          Checkbox
        </h2>
        <div className="checkboxDemo_stack">
          <Checkbox label="Subscribe to updates" />
          <Checkbox
            label="I'm interested in piloting with CWPC"
            defaultChecked
          />
          <Checkbox label="Disabled option" disabled />
          <Checkbox
            label="Disabled checked"
            defaultChecked
            disabled
          />
          <Checkbox
            label="Accept terms"
            hint="You must accept to continue"
          />
          <Checkbox
            label="Confirm email"
            error="This field is required"
          />
        </div>
      </section>
      </DemoBlock>

      <DemoBlock label="RadioButton">
      <section className="buttonDemo_section" aria-labelledby="radio-heading">
        <h2 id="radio-heading" className="buttonDemo_heading">
          RadioButton
        </h2>
        <fieldset className="radioDemo_fieldset">
          <legend className="radioDemo_legend">Choose an option</legend>
          <div className="radioDemo_stack">
            <RadioButton
              name="demo-radio"
              value="a"
              label="Option A"
              checked={radioGroupValue === 'a'}
              onChange={setRadioGroupValue}
            />
            <RadioButton
              name="demo-radio"
              value="b"
              label="Option B (default)"
              checked={radioGroupValue === 'b'}
              onChange={setRadioGroupValue}
            />
            <RadioButton
              name="demo-radio"
              value="c"
              label="Option C"
              checked={radioGroupValue === 'c'}
              onChange={setRadioGroupValue}
            />
            <RadioButton
              name="demo-radio"
              value="d"
              label="Option D"
              checked={radioGroupValue === 'd'}
              onChange={setRadioGroupValue}
            />
            <RadioButton
              name="demo-radio"
              value="x"
              label="Disabled option"
              disabled
              checked={false}
              onChange={() => {}}
            />
          </div>
        </fieldset>
      </section>
      </DemoBlock>

      <DemoBlock label="Switch">
      <section className="buttonDemo_section" aria-labelledby="switch-heading">
        <h2 id="switch-heading" className="buttonDemo_heading">
          Switch
        </h2>
        <div className="switchDemo_stack">
          <Switch label="Notifications off" />
          <Switch label="Notifications on" defaultChecked />
          <Switch label="Disabled switch" disabled />
        </div>
      </section>
      </DemoBlock>

      <DemoBlock label="TextArea">
      <section className="buttonDemo_section" aria-labelledby="textarea-heading">
        <h2 id="textarea-heading" className="buttonDemo_heading">
          TextArea
        </h2>
        <div className="textAreaDemo_stack">
          <TextArea
            label="Comments"
            placeholder="Tell us more…"
            value={textAreaDefault}
            onChange={setTextAreaDefault}
            hint="This is the default state."
          />
          <TextArea
            label="Bio"
            placeholder="Up to 200 characters"
            value={textAreaCount}
            onChange={setTextAreaCount}
            showCount
            maxLength={200}
            hint="Character limit applies."
          />
          <TextArea
            label="Confirm email"
            placeholder="Re-enter email"
            error="This field is required"
          />
        </div>
      </section>
      </DemoBlock>

      <DemoBlock label="Dropdown">
      <section className="buttonDemo_section" aria-labelledby="dropdown-heading">
        <h2 id="dropdown-heading" className="buttonDemo_heading">
          Dropdown
        </h2>
        <div className="layoutDemo_dropdown">
          <Dropdown
            label="Select Section"
            hint="Choose a section to navigate to"
            placeholder="Pick a section"
            options={[...dropdownSectionOptions]}
          />
        </div>
      </section>
      </DemoBlock>

      <section className="buttonDemo_section" aria-labelledby="searchbar-molecule-heading">
        <h2 id="searchbar-molecule-heading" className="buttonDemo_heading">
          SearchBar (molecule)
        </h2>
        <div className="layoutDemo_atomColumn layoutDemo_searchBar">
          <SearchBar
            placeholder="Search programs…"
            value={searchBarValue}
            onChange={setSearchBarValue}
            onSearch={() => {
              /* wired in product apps */
            }}
            suggestions={searchBarSuggestions}
            size="md"
          />
          <SearchBar placeholder="Small loading" size="sm" loading disabled={false} />
          <SearchBar placeholder="Large disabled" size="lg" disabled />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="breadcrumb-heading">
        <h2 id="breadcrumb-heading" className="buttonDemo_heading">
          Breadcrumb
        </h2>
        <div className="breadcrumbDemo_stack">
          <Breadcrumb
            items={[
              { label: 'Home', href: '#bc-home' },
              { label: 'Scorecard', href: '#bc-scorecard' },
              { label: 'Download' },
            ]}
            separator="/"
          />
          <Breadcrumb
            items={[
              { label: 'Home', href: '#bc2-home' },
              { label: 'Scorecard', href: '#bc2-scorecard' },
              { label: 'Download' },
            ]}
            separator=">"
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="tooltip-heading">
        <h2 id="tooltip-heading" className="buttonDemo_heading">
          Tooltip
        </h2>
        <div className="layoutDemo_tooltips">
          <Tooltip content="Tooltip on top" position="top">
            <Button label="Top" type="outlined" />
          </Tooltip>
          <Tooltip content="Tooltip below" position="bottom">
            <Button label="Bottom" type="outlined" />
          </Tooltip>
          <Tooltip content="Tooltip on the left" position="left">
            <Button label="Left" type="outlined" />
          </Tooltip>
          <Tooltip content="Tooltip on the right" position="right">
            <Button label="Right" type="outlined" />
          </Tooltip>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="progress-bar-heading">
        <h2 id="progress-bar-heading" className="buttonDemo_heading">
          ProgressBar
        </h2>
        <div className="progressDemo_stack">
          <div className="progressDemo_stack">
            <ProgressBar
              variant="primary"
              value={20}
              label="Primary"
              showValue
              animated
            />
            <ProgressBar
              variant="success"
              value={45}
              label="Success"
              showValue
              animated
            />
            <ProgressBar
              variant="warning"
              value={60}
              label="Warning"
              showValue
              animated
            />
            <ProgressBar
              variant="error"
              value={80}
              label="Error"
              showValue
              animated
            />
            <ProgressBar
              variant="info"
              value={95}
              label="Info"
              showValue
              animated
            />
          </div>
          <div className="progressDemo_row">
            <ProgressBar
              size="sm"
              value={40}
              label="Small"
              showValue
              animated
            />
            <ProgressBar
              size="md"
              value={40}
              label="Medium"
              showValue
              animated
            />
            <ProgressBar
              size="lg"
              value={40}
              label="Large"
              showValue
              animated
            />
          </div>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="progress-circle-heading">
        <h2 id="progress-circle-heading" className="buttonDemo_heading">
          ProgressCircle
        </h2>
        <div className="progressDemo_stack">
          <div className="progressCircleDemo_row">
            <ProgressCircle
              variant="primary"
              value={22}
              label="Primary"
              animated
            />
            <ProgressCircle
              variant="success"
              value={38}
              label="Success"
              animated
            />
            <ProgressCircle
              variant="warning"
              value={55}
              label="Warning"
              animated
            />
            <ProgressCircle
              variant="error"
              value={72}
              label="Error"
              animated
            />
            <ProgressCircle
              variant="info"
              value={88}
              label="Info"
              animated
            />
          </div>
          <div className="progressCircleDemo_row">
            <ProgressCircle
              size="sm"
              value={50}
              label="Small"
              animated
            />
            <ProgressCircle
              size="md"
              value={50}
              label="Medium"
              animated
            />
            <ProgressCircle
              size="lg"
              value={50}
              label="Large"
              animated
            />
          </div>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="tabbar-heading">
        <h2 id="tabbar-heading" className="buttonDemo_heading">
          TabBar
        </h2>
        <TabBar
          tabs={tabBarDemoTabs}
          activeTab={demoTabId}
          onChange={setDemoTabId}
        />
        <div className="tabBarDemo_content" role="tabpanel">
          {demoTabId === 'overview' ? (
            <p>Overview panel: score summaries and highlights.</p>
          ) : null}
          {demoTabId === 'details' ? (
            <p>Details panel: extended metrics and notes.</p>
          ) : null}
          {demoTabId === 'export' ? (
            <p>Export panel: download and sharing options.</p>
          ) : null}
          {demoTabId === 'settings' ? (
            <p>Settings (this tab is disabled in the demo).</p>
          ) : null}
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="button-group-heading">
        <h2 id="button-group-heading" className="buttonDemo_heading">
          ButtonGroup
        </h2>
        <div className="buttonGroupDemo_stack">
          <ButtonGroup
            connected
            items={[
              { label: 'Day' },
              { label: 'Week' },
              { label: 'Month' },
            ]}
          />
          <ButtonGroup
            connected={false}
            items={[
              { label: 'List' },
              { label: 'Grid' },
              { label: 'Map' },
            ]}
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="social-heading">
        <h2 id="social-heading" className="buttonDemo_heading">
          SocialButton
        </h2>
        <div className="socialDemo_stack">
          <SocialButtonGroup gap="md">
            {socialPlatforms.map((platform) => (
              <SocialButton
                key={`brand-${platform}`}
                platform={platform}
                href="https://example.com"
                variant="brand"
              />
            ))}
          </SocialButtonGroup>
          <SocialButtonGroup gap="md">
            {socialPlatforms.map((platform) => (
              <SocialButton
                key={`primary-${platform}`}
                platform={platform}
                href="https://example.com"
                variant="primary"
              />
            ))}
          </SocialButtonGroup>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="pagination-heading">
        <h2 id="pagination-heading" className="buttonDemo_heading">
          Pagination
        </h2>
        <Pagination
          currentPage={paginationPage}
          totalPages={10}
          onChange={setPaginationPage}
          showFirstLast
          siblingCount={1}
        />
      </section>

      <section className="buttonDemo_section" aria-labelledby="statcard-molecule-heading">
        <h2 id="statcard-molecule-heading" className="buttonDemo_heading">
          StatCard (molecule)
        </h2>
        <div className="layoutDemo_statRow">
          <StatCard
            value="128"
            label="Active pilots"
            trend="up"
            trendValue="+12%"
            variant="primary"
            icon={infoIcon}
            description="Across western regions this quarter."
          />
          <StatCard
            value="94%"
            label="On-time drills"
            trend="neutral"
            trendValue="0%"
            variant="success"
            icon={infoIcon}
          />
          <StatCard
            value="16"
            label="Open actions"
            trend="down"
            trendValue="-3"
            variant="warning"
          />
          <StatCard value="2.4k" label="Data points synced" variant="info" />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="emptystate-molecule-heading">
        <h2 id="emptystate-molecule-heading" className="buttonDemo_heading">
          EmptyState (molecule)
        </h2>
        <div className="layoutDemo_atomColumn">
          <EmptyState
            variant="default"
            title="Nothing here yet"
            description="Create your first project to see activity in this list."
            action={<Button label="Create project" type="default" />}
          />
          <EmptyState
            variant="search"
            title="No matches"
            description="Try different keywords or clear filters."
          />
          <EmptyState
            variant="error"
            title="Something went wrong"
            description="We could not load this section. Check your connection and try again."
            action={<Button label="Retry" type="outlined" />}
          />
          <EmptyState
            variant="success"
            title="You are all set"
            description="Your upload finished successfully."
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="stepper-molecule-heading">
        <h2 id="stepper-molecule-heading" className="buttonDemo_heading">
          Stepper (molecule)
        </h2>
        <div className="layoutDemo_atomColumn layoutDemo_stepper">
          <Text as="span" variant="caption">
            Horizontal — current step {stepperDemoStep} (use buttons to advance)
          </Text>
          <div className="layoutDemo_atomRow">
            <Button
              label="Back"
              type="outlined"
              onClick={() =>
                setStepperDemoStep((s) => Math.max(0, s - 1))
              }
            />
            <Button
              label="Next"
              type="default"
              onClick={() =>
                setStepperDemoStep((s) =>
                  Math.min(stepperDemoSteps.length - 1, s + 1),
                )
              }
            />
          </div>
          <Stepper steps={stepperDemoSteps} currentStep={stepperDemoStep} />
          <Text as="span" variant="caption">
            Vertical
          </Text>
          <Stepper
            steps={stepperDemoSteps}
            currentStep={2}
            orientation="vertical"
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="fileupload-molecule-heading">
        <h2 id="fileupload-molecule-heading" className="buttonDemo_heading">
          FileUpload (molecule)
        </h2>
        <div className="layoutDemo_fileUpload">
          <FileUpload
            label="Attachments"
            hint="PDF, PNG up to 10MB"
            accept=".pdf,.png,image/png,application/pdf"
            multiple
            maxSize={10 * 1024 * 1024}
            onUpload={() => {
              /* demo */
            }}
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="filterbar-molecule-heading">
        <h2 id="filterbar-molecule-heading" className="buttonDemo_heading">
          FilterBar (molecule)
        </h2>
        <Text as="p" variant="caption" color="caption">
          Multi-select
        </Text>
        <FilterBar
          filters={demoFilterOptions}
          activeFilters={filterMulti}
          onChange={setFilterMulti}
          multiSelect
        />
        <Text as="p" variant="caption" color="caption">
          Single-select (click active to clear)
        </Text>
        <FilterBar
          filters={demoFilterOptions}
          activeFilters={filterSingle}
          onChange={setFilterSingle}
          multiSelect={false}
        />
      </section>

      <section className="buttonDemo_section" aria-labelledby="datepicker-molecule-heading">
        <h2 id="datepicker-molecule-heading" className="buttonDemo_heading">
          DatePicker (molecule)
        </h2>
        <div className="layoutDemo_datePicker">
          <DatePicker
            label="Report date"
            hint="Dates outside the range are disabled."
            value={pickerDate}
            onChange={setPickerDate}
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
          />
          <DatePicker placeholder="Pick a date" disabled />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="list-molecule-heading">
        <h2 id="list-molecule-heading" className="buttonDemo_heading">
          List (molecule)
        </h2>
        <Text as="p" variant="caption" color="caption">
          Default
        </Text>
        <List
          items={[
            {
              label: 'Overview',
              description: 'Summary metrics',
              icon: infoIcon,
            },
            {
              label: 'Active fires',
              description: 'Live incidents',
              icon: infoIcon,
              active: true,
            },
            {
              label: 'Archived',
              icon: infoIcon,
              action: <Badge label="12" size="sm" variant="neutral" />,
            },
          ]}
        />
        <Text as="p" variant="caption" color="caption">
          Bordered, interactive
        </Text>
        <List
          variant="bordered"
          interactive
          items={[
            {
              label: 'Evacuation routes',
              description: 'Updated hourly',
              icon: infoIcon,
            },
            {
              label: 'Fuel breaks',
              href: '#list-molecule-heading',
              icon: infoIcon,
            },
          ]}
        />
        <Text as="p" variant="caption" color="caption">
          Striped, large
        </Text>
        <List
          variant="striped"
          size="lg"
          items={[
            { label: 'Row A', icon: infoIcon },
            { label: 'Row B', icon: infoIcon, disabled: true },
            { label: 'Row C', icon: infoIcon },
          ]}
        />
      </section>

      <section className="buttonDemo_section" aria-labelledby="contextmenu-molecule-heading">
        <h2 id="contextmenu-molecule-heading" className="buttonDemo_heading">
          ContextMenu (molecule)
        </h2>
        <Text as="p" variant="caption" color="caption">
          Left-click the button or right-click anywhere in the control.
        </Text>
        <ContextMenu
          trigger={<Button label="Menu" type="outlined" />}
          position="bottom-left"
          items={[
            { label: 'Open', icon: infoIcon, onClick: () => {} },
            { label: 'Duplicate', icon: infoIcon, onClick: () => {} },
            { divider: true },
            {
              label: 'Delete',
              destructive: true,
              onClick: () => {},
            },
          ]}
        />
      </section>

      <section className="buttonDemo_section" aria-labelledby="popover-molecule-heading">
        <h2 id="popover-molecule-heading" className="buttonDemo_heading">
          Popover (molecule)
        </h2>
        <div className="layoutDemo_atomRow">
          <Popover
            trigger={<Button label="Details" type="transparent" />}
            title="Wildfire outlook"
            position="bottom"
          >
            <Text as="p" variant="body-sm">
              Use this panel for richer help text, form hints, or compact summaries.
            </Text>
          </Popover>
          <Popover
            trigger={<Button label="Top" type="transparent" />}
            position="top"
            width="var(--width-modal-sm)"
          >
            <Text as="p" variant="body-sm">
              Wider popover using a width token.
            </Text>
          </Popover>
        </div>
      </section>

      <DemoBlock label="NotificationBar">
        <NotificationBar
          variant="success"
          message="Example in-page notification (dismissible)."
          dismissible
        />
      </DemoBlock>

      <section
        className="buttonDemo_section"
        aria-labelledby="subscribe-widget-molecule-heading"
      >
        <h2 id="subscribe-widget-molecule-heading" className="buttonDemo_heading">
          SubscribeWidget (molecule)
        </h2>
        <div className="layoutDemo_atomColumn">
          <SubscribeWidget
            variant="dark"
            layout="row"
            label="Stay informed"
            onSubscribe={() => {
              /* demo */
            }}
          />
          <SubscribeWidget
            variant="dark"
            layout="column"
            label="Newsletter"
            onSubscribe={() => {
              /* demo */
            }}
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="scrolltotop-molecule-heading">
        <h2 id="scrolltotop-molecule-heading" className="buttonDemo_heading">
          ScrollToTop (molecule)
        </h2>
        <Text as="p" variant="caption" color="caption">
          One real ScrollToTop control is rendered at the end of the page (outside demo areas). It uses{' '}
          <code style={{ color: '#A1A1AA' }}>position: fixed</code> and only appears after you scroll down
          more than 300px.
        </Text>
      </section>

      <div style={{ marginBottom: '56px' }}>
        <p
          style={{
            fontSize: '11px',
            color: '#71717A',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px',
            fontWeight: '700',
            marginTop: 0,
          }}
        >
          Sticky Bar
        </p>
        <div
          style={{
            background: '#232329',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '32px',
          }}
        >
          <p style={{ fontSize: '12px', color: '#71717A', marginBottom: '16px', marginTop: 0 }}>
            StickyBar renders as position: fixed at the bottom of the screen. Preview shown inline:
          </p>
          <div
            style={{
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              padding: '12px 24px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: '#FF6701',
                color: '#000',
                padding: '10px 24px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Continue
            </div>
          </div>
        </div>
      </div>

      <SectionDivider label="ORGANISMS" />

      <section className="buttonDemo_section" aria-labelledby="accordion-heading">
        <h2 id="accordion-heading" className="buttonDemo_heading">
          AccordionItem
        </h2>
        <div className="accordionDemo_stack">
          <AccordionItem
            title="Scorecard section A"
            body="This is the body text for the first accordion item. It stays collapsed by default."
          />
          <AccordionItem
            title="Scorecard section B"
            body="This is the body text for the second accordion item. It is open by default so you can see the full content."
            defaultOpen
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="card-heading">
        <h2 id="card-heading" className="buttonDemo_heading">
          Card
        </h2>
        <div className="cardDemo_wrap">
          <Card title="Wildfire Innovator Showcase" titleColor="primary">
            <p className="cardDemo_body">
              Join leaders from across the wildfire prevention community to share
              innovations, research, and on-the-ground strategies that reduce
              catastrophic risk.
            </p>
            <div className="cardDemo_actions">
              <Button label="Learn more" type="default" />
              <Button label="View agenda" type="outlined" />
            </div>
          </Card>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="forms-heading">
        <h2 id="forms-heading" className="buttonDemo_heading">
          Forms
        </h2>
        <div className="formsDemo_wrap">
          <Forms
            title="Download Scorecard"
            description="Complete the form below to receive the latest CWPC scorecard."
            fields={scorecardFormFields}
            checkboxLabels={[
              'Subscribe',
              "I'm interested in piloting with CWPC",
            ]}
            primaryButtonLabel="Download Scorecard"
            secondaryButtonLabel="Close"
            footerText="By clicking Download Scorecard you agree to our"
            footerLinkText="Data Protection Policy"
          />
        </div>
      </section>

      <section
        className="buttonDemo_section"
        aria-labelledby="profile-card-organism-heading"
      >
        <h2 id="profile-card-organism-heading" className="buttonDemo_heading">
          ProfileCard (organism)
        </h2>
        <div className="layoutDemo_statRow">
          <ProfileCard
            variant="compact"
            name="Carsten Brinkschulte"
            role="CEO"
            company="Dryad Networks GmbH"
            location="Berlin, Germany"
            linkedinUrl="https://www.linkedin.com/"
            description="Dryad provides ultra-early wildfire detection using solar-powered gas sensors and mesh networks, helping land managers detect ignitions before they spread."
            onCtaClick={() => {
              /* demo */
            }}
          />
          <ProfileCard
            variant="full"
            name="Carsten Brinkschulte"
            role="CEO"
            company="Dryad Networks GmbH"
            location="Berlin, Germany"
            linkedinUrl="https://www.linkedin.com/"
            videoThumbnailSrc="https://images.unsplash.com/photo-1504280390767-32e45670a35a?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://example.com/presentation"
            description="Dryad provides ultra-early wildfire detection using solar-powered gas sensors and mesh networks, helping land managers detect ignitions before they spread."
            onCtaClick={() => {
              /* demo */
            }}
          />
        </div>
      </section>

      <section
        className="buttonDemo_section"
        aria-labelledby="video-card-organism-heading"
      >
        <h2 id="video-card-organism-heading" className="buttonDemo_heading">
          VideoCard (organism)
        </h2>
        <div className="layoutDemo_statRow">
          <VideoCard
            thumbnailSrc="https://images.unsplash.com/photo-1504280390767-32e45670a35a?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://example.com/video-a"
            title="Wildfire Prevention Technology Showcase"
            presenterName="Barrett Deng"
            presenterRole="CEO, Clore"
            duration="12:04"
            onCtaClick={() => {
              /* demo */
            }}
            onPlay={() => {
              /* demo */
            }}
          />
          <VideoCard
            thumbnailSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
            videoUrl="https://example.com/video-b"
            title="Wildfire Prevention Technology Showcase"
            presenterName="Barrett Deng"
            presenterRole="CEO, Clore"
            duration="8:42"
            onCtaClick={() => {
              /* demo */
            }}
          />
        </div>
      </section>

      <section
        className="buttonDemo_section"
        aria-labelledby="registration-modal-organism-heading"
      >
        <h2 id="registration-modal-organism-heading" className="buttonDemo_heading">
          RegistrationModal (organism)
        </h2>
        <Button
          label="Open Registration Modal"
          type="outlined"
          onClick={() => setRegistrationModalOpen(true)}
        />
        <RegistrationModal
          isOpen={registrationModalOpen}
          onClose={() => setRegistrationModalOpen(false)}
          onSubscribe={() => {
            /* demo */
          }}
        />
      </section>

      <section className="buttonDemo_section" aria-labelledby="alert-heading">
        <h2 id="alert-heading" className="buttonDemo_heading">
          Alert
        </h2>
        <div className="layoutDemo_alerts">
          <Alert
            variant="success"
            title="Success"
            message="Your scorecard export is ready to download."
          />
          <Alert
            variant="error"
            title="Error"
            message="We could not verify your email. Try again in a few minutes."
            dismissible
          />
          <Alert
            variant="warning"
            title="Warning"
            message="Pilot data for this region is still under review."
          />
          <Alert
            variant="info"
            title="Info"
            message="CWPC office hours are Wednesdays from 2–3pm PT."
            dismissible
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="toast-heading">
        <ToastDemoSection />
      </section>

      <section className="buttonDemo_section" aria-labelledby="modal-heading">
        <h2 id="modal-heading" className="buttonDemo_heading">
          Modal
        </h2>
        <Button
          label="Open download modal"
          type="default"
          onClick={() => setModalOpen(true)}
        />
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Download Scorecard"
        >
          <p className="modalDemo_body">
            Enter your details on the form to receive the latest CWPC scorecard
            and pilot program updates. You can close this dialog with the button
            above or by clicking outside.
          </p>
        </Modal>
      </section>

      <section className="buttonDemo_section" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="buttonDemo_heading">
          Menu / MenuItem
        </h2>
        <div className="menuDemo_shell">
          <Menu variant="default">
            <MenuItem
              label="Dashboard"
              href="#menu-dashboard"
              iconLeft={infoIcon}
              active
            />
            <MenuItem
              label="Scorecard library"
              href="#menu-scorecards"
              iconLeft={mailIcon}
            />
            <MenuItem
              label="Field notes"
              onClick={() => {}}
            />
            <MenuItem
              label="Inbox"
              href="#menu-inbox"
              badge="3"
            />
            <MenuItem label="Archived runs" disabled />
          </Menu>
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="table-heading">
        <h2 id="table-heading" className="buttonDemo_heading">
          Table
        </h2>
        <div className="tableDemo_block">
          <Table
            caption="CWPC consortium contacts (sample data)"
            columns={cwpcTableColumns}
            rows={cwpcTableRows}
            striped
            stickyHeader
          />
        </div>
      </section>

      <section
        className="buttonDemo_section"
        aria-labelledby="banner-organism-heading"
        id="banner-site-hero"
      >
        <h2 id="banner-organism-heading" className="buttonDemo_heading">
          Banner (organism) — image background variant
        </h2>
        <div className="layoutDemo_fullBleed">
          <Banner
            imageSrc="https://images.unsplash.com/photo-1504280390767-32e45670a35a?auto=format&fit=crop&w=1600&q=80"
            title="Banner with photo background"
            subtitle="Optional subtitle in amber"
            description="Same overlay and bottom-left layout as the default wildfire gradient hero."
            ctaLabel="Learn more"
            ctaHref="#banner-organism-heading"
            height="var(--space-1700)"
          />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="panel-organism-heading">
        <h2 id="panel-organism-heading" className="buttonDemo_heading">
          Panel (organism)
        </h2>
        <div className="layoutDemo_atomRow">
          <Button
            label="Open right panel"
            type="outlined"
            onClick={() => setPanelOpen(true)}
          />
          <Button
            label="Open left panel"
            type="outlined"
            onClick={() => setPanelLeftOpen(true)}
          />
        </div>
        <Panel
          isOpen={panelOpen}
          onClose={() => setPanelOpen(false)}
          title="Filters"
          side="right"
        >
          <Text as="p" variant="body-md">
            Panel content goes here. Press Escape or click the backdrop to close.
          </Text>
        </Panel>
        <Panel
          isOpen={panelLeftOpen}
          onClose={() => setPanelLeftOpen(false)}
          title="Navigation"
          side="left"
          width="var(--width-modal-sm)"
        >
          <Text as="p" variant="body-md">
            Left drawer example with custom width token.
          </Text>
        </Panel>
      </section>

      <section className="buttonDemo_section" aria-labelledby="videoplayer-organism-heading">
        <h2 id="videoplayer-organism-heading" className="buttonDemo_heading">
          VideoPlayer (organism)
        </h2>
        <Text as="p" variant="caption" color="caption">
          With sample source (hover for controls)
        </Text>
        <VideoPlayer
          title="Sample wildlife video"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          poster="https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower.png"
        />
        <Text as="p" variant="caption" color="caption">
          No source (placeholder)
        </Text>
        <VideoPlayer title="No video loaded" />
      </section>

      <section className="buttonDemo_section" aria-labelledby="gridlayout-organism-heading">
        <h2 id="gridlayout-organism-heading" className="buttonDemo_heading">
          GridLayout (organism)
        </h2>
        <Text as="p" variant="caption" color="caption">
          Three columns, medium gap, responsive (narrow the window to see breakpoints).
        </Text>
        <GridLayout columns={3} gap="md" responsive>
          <div className="layoutDemo_gridCell">1</div>
          <div className="layoutDemo_gridCell">2</div>
          <div className="layoutDemo_gridCell">3</div>
          <div className="layoutDemo_gridCell">4</div>
          <div className="layoutDemo_gridCell">5</div>
          <div className="layoutDemo_gridCell">6</div>
        </GridLayout>
        <Text as="p" variant="caption" color="caption">
          Four columns, large gap, not responsive
        </Text>
        <GridLayout columns={4} gap="lg" responsive={false}>
          <div className="layoutDemo_gridCell">A</div>
          <div className="layoutDemo_gridCell">B</div>
          <div className="layoutDemo_gridCell">C</div>
          <div className="layoutDemo_gridCell">D</div>
        </GridLayout>
      </section>

      <section className="buttonDemo_section" aria-labelledby="errorpage-organism-heading">
        <h2 id="errorpage-organism-heading" className="buttonDemo_heading">
          ErrorPage (organism)
        </h2>
        <div className={demoLayoutStyles.scaledOrganism}>
        <ErrorPage
          code="404"
          description="The page you are looking for does not exist or has been moved."
          ctaHref="#errorpage-organism-heading"
        />
        <ErrorPage
          code="500"
          title="Custom server title"
          description="Try again in a few minutes."
          ctaLabel="Contact support"
          onCtaClick={() => {
            /* demo */
          }}
        />
        </div>
      </section>

      <section className="buttonDemo_section" aria-labelledby="successscreen-organism-heading">
        <h2 id="successscreen-organism-heading" className="buttonDemo_heading">
          SuccessScreen (organism)
        </h2>
        <div className={demoLayoutStyles.scaledOrganism}>
        <SuccessScreen
          description="Your submission was received. You can return to the dashboard or add another entry."
          ctaLabel="Go to dashboard"
          onCtaClick={() => {
            /* demo */
          }}
          secondaryCtaLabel="Add another"
          onSecondaryCtaClick={() => {
            /* demo */
          }}
        />
        </div>
      </section>

      <DemoBlock label="Navbar">
        <Navbar
          items={[...demoNavbarItems]}
          activeHref="/"
          logoSrc={CWPC_LOGO_SRC_DEFAULT}
        />
      </DemoBlock>

      <DemoBlock label="SecondaryNav">
        <SecondaryNav items={[...demoSecondaryNavItems]} activeHref="/showcase" />
      </DemoBlock>

      </main>
      <ScrollToTop position="bottom-right" threshold={300} />
      <Footer
        onSubscribe={() => {
          /* demo */
        }}
      />
    </div>
    </ToastProvider>
  )
}
