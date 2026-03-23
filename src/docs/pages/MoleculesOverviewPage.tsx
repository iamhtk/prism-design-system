import { useState } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { Breadcrumb } from '../../components/molecules/Breadcrumb/Breadcrumb'
import { ButtonGroup } from '../../components/molecules/ButtonGroup/ButtonGroup'
import { Checkbox } from '../../components/molecules/Checkbox/Checkbox'
import { ContextMenu } from '../../components/molecules/ContextMenu/ContextMenu'
import { DatePicker } from '../../components/molecules/DatePicker/DatePicker'
import { Dropdown } from '../../components/molecules/Dropdown/Dropdown'
import { EmptyState } from '../../components/molecules/EmptyState/EmptyState'
import { FileUpload } from '../../components/molecules/FileUpload/FileUpload'
import { FilterBar } from '../../components/molecules/FilterBar/FilterBar'
import { Input } from '../../components/molecules/Input/Input'
import { List } from '../../components/molecules/List/List'
import { NotificationBar } from '../../components/molecules/NotificationBar/NotificationBar'
import { Pagination } from '../../components/molecules/Pagination/Pagination'
import { Popover } from '../../components/molecules/Popover/Popover'
import { ProgressBar } from '../../components/molecules/ProgressBar/ProgressBar'
import { ProgressCircle } from '../../components/molecules/ProgressCircle/ProgressCircle'
import { RadioButton } from '../../components/molecules/RadioButton/RadioButton'
import { SearchBar } from '../../components/molecules/SearchBar/SearchBar'
import { SocialButton } from '../../components/molecules/SocialButton/SocialButton'
import { StatCard } from '../../components/molecules/StatCard/StatCard'
import { Stepper } from '../../components/molecules/Stepper/Stepper'
import { SubscribeWidget } from '../../components/molecules/SubscribeWidget/SubscribeWidget'
import { Switch } from '../../components/molecules/Switch/Switch'
import { TabBar } from '../../components/molecules/TabBar/TabBar'
import { TextArea } from '../../components/molecules/TextArea/TextArea'
import { Tooltip } from '../../components/molecules/Tooltip/Tooltip'
import { CategoryOverviewCard, CategoryStatBar } from '../helpers/CategoryOverview'
import styles from '../helpers/CategoryOverview.module.css'
import { DocsPage, DocsSection } from '../helpers/DocsPage'

function CheckboxPair() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className={styles.previewCol}>
      <Checkbox label="Checked" checked={a} onChange={setA} />
      <Checkbox label="Unchecked" checked={b} onChange={setB} />
    </div>
  )
}

function RadioPair() {
  const [v, setV] = useState('a')
  return (
    <div className={styles.previewCol}>
      <RadioButton name="ov-r" value="a" label="Option A" checked={v === 'a'} onChange={setV} />
      <RadioButton name="ov-r" value="b" label="Option B" checked={v === 'b'} onChange={setV} />
    </div>
  )
}

function SwitchPair() {
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  return (
    <div className={styles.previewCol}>
      <Switch label="Off" checked={a} onChange={setA} />
      <Switch label="On" checked={b} onChange={setB} />
    </div>
  )
}

function PaginationMini() {
  const [p, setP] = useState(1)
  return <Pagination currentPage={p} totalPages={5} onChange={setP} />
}

export function MoleculesOverviewPage() {
  return (
    <DocsPage
      title="Molecules"
      description="Simple combinations of atoms working together as a unit. Each molecule has one clear purpose. They are the workhorses of the CWPC design system — the components you use most in forms, navigation, and data display."
      category="Foundation"
      status="stable"
    >
      <CategoryStatBar
        segments={[
          { strong: '26', rest: 'Components' },
          { strong: 'Combine atoms' },
          { strong: 'Single purpose' },
        ]}
      />
      <DocsSection>
        <div className={styles.grid}>
          <CategoryOverviewCard
            title="Input"
            description="Label + field + hint text as one unit"
            to="/docs/molecules/input"
            categoryLabel="MOLECULE"
            preview={<Input label="Email" placeholder="you@example.com" />}
          />
          <CategoryOverviewCard
            title="Checkbox"
            description="Tick box with label and states"
            to="/docs/molecules/checkbox"
            categoryLabel="MOLECULE"
            preview={<CheckboxPair />}
          />
          <CategoryOverviewCard
            title="Radio Button"
            description="Circle selector for exclusive choice"
            to="/docs/molecules/radiobutton"
            categoryLabel="MOLECULE"
            preview={<RadioPair />}
          />
          <CategoryOverviewCard
            title="Switch"
            description="Toggle on/off control"
            to="/docs/molecules/switch"
            categoryLabel="MOLECULE"
            preview={<SwitchPair />}
          />
          <CategoryOverviewCard
            title="Text Area"
            description="Multi-line input with resize"
            to="/docs/molecules/textarea"
            categoryLabel="MOLECULE"
            preview={
              <div className={styles.previewW200}>
                <TextArea label="Notes" placeholder="Add details…" rows={3} />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Dropdown"
            description="Select menu with searchable options"
            to="/docs/molecules/dropdown"
            categoryLabel="MOLECULE"
            preview={
              <Dropdown
                placeholder="Select an option"
                options={[
                  { label: 'One', value: '1' },
                  { label: 'Two', value: '2' },
                ]}
                width="200px"
              />
            }
          />
          <CategoryOverviewCard
            title="Search Bar"
            description="Input with search icon and clear button"
            to="/docs/molecules/searchbar"
            categoryLabel="MOLECULE"
            preview={<SearchBar placeholder="Search…" size="md" />}
          />
          <CategoryOverviewCard
            title="Breadcrumb"
            description="Location trail with separator"
            to="/docs/molecules/breadcrumb"
            categoryLabel="MOLECULE"
            preview={
              <Breadcrumb
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Scorecard', href: '#' },
                  { label: 'Download' },
                ]}
              />
            }
          />
          <CategoryOverviewCard
            title="Tooltip"
            description="Hover popup with info text"
            to="/docs/molecules/tooltip"
            categoryLabel="MOLECULE"
            preview={
              <Tooltip content="Helpful context" position="top">
                <Button label="Hover me" type="outlined" />
              </Tooltip>
            }
          />
          <CategoryOverviewCard
            title="Progress Bar"
            description="Horizontal fill indicator"
            to="/docs/molecules/progressbar"
            categoryLabel="MOLECULE"
            preview={
              <div className={styles.previewCol}>
                <ProgressBar value={30} size="sm" />
                <ProgressBar value={60} size="sm" variant="success" />
                <ProgressBar value={90} size="sm" variant="info" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Progress Circle"
            description="Circular score indicator"
            to="/docs/molecules/progresscircle"
            categoryLabel="MOLECULE"
            preview={
              <div className={styles.previewRow}>
                <ProgressCircle value={72} size="sm" showValue />
                <ProgressCircle value={40} size="sm" variant="success" showValue />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Tab Bar"
            description="Horizontal navigation tabs"
            to="/docs/molecules/tabbar"
            categoryLabel="MOLECULE"
            preview={
              <TabBar
                tabs={[
                  { id: 'a', label: 'Overview' },
                  { id: 'b', label: 'Specs' },
                  { id: 'c', label: 'Code' },
                ]}
                defaultTab="a"
              />
            }
          />
          <CategoryOverviewCard
            title="Button Group"
            description="Connected or separated button row"
            to="/docs/molecules/buttongroup"
            categoryLabel="MOLECULE"
            preview={
              <ButtonGroup
                connected
                items={[
                  { label: 'Day' },
                  { label: 'Week', active: true },
                  { label: 'Month' },
                ]}
              />
            }
          />
          <CategoryOverviewCard
            title="Social Button"
            description="Platform-branded icon buttons"
            to="/docs/molecules/socialbutton"
            categoryLabel="MOLECULE"
            preview={
              <div className={styles.previewRow}>
                <SocialButton platform="facebook" href="#" size="sm" />
                <SocialButton platform="twitter" href="#" size="sm" />
                <SocialButton platform="linkedin" href="#" size="sm" />
                <SocialButton platform="youtube" href="#" size="sm" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Pagination"
            description="Page number controls"
            to="/docs/molecules/pagination"
            categoryLabel="MOLECULE"
            preview={<PaginationMini />}
          />
          <CategoryOverviewCard
            title="Stat Card"
            description="Large metric with trend indicator"
            to="/docs/molecules/statcard"
            categoryLabel="MOLECULE"
            preview={
              <StatCard value="5,000+" label="Active users" trend="up" trendValue="+12%" variant="primary" />
            }
          />
          <CategoryOverviewCard
            title="Empty State"
            description="Placeholder when no data exists"
            to="/docs/molecules/emptystate"
            categoryLabel="MOLECULE"
            preview={<EmptyState title="No results" description="Try another query." variant="search" />}
          />
          <CategoryOverviewCard
            title="Stepper"
            description="Multi-step progress indicator"
            to="/docs/molecules/stepper"
            categoryLabel="MOLECULE"
            preview={
              <Stepper
                orientation="horizontal"
                currentStep={1}
                steps={[
                  { label: 'Account' },
                  { label: 'Verify' },
                  { label: 'Done' },
                ]}
              />
            }
          />
          <CategoryOverviewCard
            title="File Upload"
            description="Drag and drop file upload area"
            to="/docs/molecules/fileupload"
            categoryLabel="MOLECULE"
            preview={<FileUpload label="Drop files" hint="PDF, up to 10MB" />}
          />
          <CategoryOverviewCard
            title="List"
            description="Structured item list with variants"
            to="/docs/molecules/list"
            categoryLabel="MOLECULE"
            preview={
              <List
                variant="bordered"
                size="sm"
                items={[
                  { label: 'Item one' },
                  { label: 'Item two' },
                  { label: 'Item three' },
                ]}
              />
            }
          />
          <CategoryOverviewCard
            title="Filter Bar"
            description="Row of filter chips"
            to="/docs/molecules/filterbar"
            categoryLabel="MOLECULE"
            preview={
              <FilterBar
                filters={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'New', value: 'new' },
                  { label: 'Archived', value: 'arc' },
                ]}
                activeFilters={['active', 'new']}
              />
            }
          />
          <CategoryOverviewCard
            title="Date Picker"
            description="Calendar date selection"
            to="/docs/molecules/datepicker"
            categoryLabel="MOLECULE"
            preview={<DatePicker label="Date" placeholder="Pick a date" />}
          />
          <CategoryOverviewCard
            title="Context Menu"
            description="Right-click or trigger floating menu"
            to="/docs/molecules/contextmenu"
            categoryLabel="MOLECULE"
            preview={
              <ContextMenu
                trigger={<Button label="Right-click" type="outlined" />}
                items={[
                  { label: 'Copy', onClick: () => {} },
                  { label: 'Paste', onClick: () => {} },
                  { divider: true },
                  { label: 'Delete', destructive: true, onClick: () => {} },
                ]}
              />
            }
          />
          <CategoryOverviewCard
            title="Popover"
            description="Rich tooltip with title and content"
            to="/docs/molecules/popover"
            categoryLabel="MOLECULE"
            preview={
              <Popover trigger={<Button label="Open" type="outlined" />} title="Details">
                <p style={{ margin: 0, fontSize: 13, color: '#a1a1aa' }}>Extra content here.</p>
              </Popover>
            }
          />
          <CategoryOverviewCard
            title="Notification Bar"
            description="Full-width announcement strip"
            to="/docs/molecules/notificationbar"
            categoryLabel="MOLECULE"
            preview={
              <div className={styles.previewNotifScale}>
                <NotificationBar message="System maintenance tonight" variant="primary" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Subscribe Widget"
            description="Inline email subscription form"
            to="/docs/molecules/subscribewidget"
            categoryLabel="MOLECULE"
            preview={<SubscribeWidget layout="row" />}
          />
        </div>
      </DocsSection>
    </DocsPage>
  )
}
