import { Button } from '../../components/atoms/Button/Button'
import { AccordionItem } from '../../components/organisms/AccordionItem/AccordionItem'
import { Alert } from '../../components/organisms/Alert/Alert'
import { Banner } from '../../components/organisms/Banner/Banner'
import { Card } from '../../components/organisms/Card/Card'
import { ErrorPage } from '../../components/organisms/ErrorPage/ErrorPage'
import { Footer } from '../../components/organisms/Footer/Footer'
import { Forms } from '../../components/organisms/Forms/Forms'
import { GridLayout } from '../../components/organisms/GridLayout/GridLayout'
import { Menu } from '../../components/organisms/Menu/Menu'
import { MenuItem } from '../../components/organisms/Menu/MenuItem'
import { Navbar } from '../../components/organisms/Navbar/Navbar'
import { ProfileCard } from '../../components/organisms/ProfileCard/ProfileCard'
import { SecondaryNav } from '../../components/organisms/SecondaryNav/SecondaryNav'
import { SuccessScreen } from '../../components/organisms/SuccessScreen/SuccessScreen'
import { Table } from '../../components/organisms/Table/Table'
import { ToastView } from '../../components/organisms/Toast/Toast'
import { VideoCard } from '../../components/organisms/VideoCard/VideoCard'
import { VideoPlayer } from '../../components/organisms/VideoPlayer/VideoPlayer'
import { CategoryOverviewCard, CategoryStatBar } from '../helpers/CategoryOverview'
import styles from '../helpers/CategoryOverview.module.css'
import { DocsPage, DocsSection } from '../helpers/DocsPage'

export function OrganismsOverviewPage() {
  return (
    <DocsPage
      title="Organisms"
      description="Complex UI sections assembled from molecules and atoms. Organisms represent meaningful sections of an interface — navigation systems, content cards, full forms, and page-level patterns specific to the CWPC product."
      category="Foundation"
      status="stable"
    >
      <CategoryStatBar
        segments={[
          { strong: '20', rest: 'Components' },
          { strong: 'Page-level patterns' },
          { strong: 'CWPC-specific' },
        ]}
      />
      <DocsSection>
        <div className={styles.grid}>
          <CategoryOverviewCard
            title="Accordion"
            description="Expandable content rows"
            to="/docs/organisms/accordion"
            categoryLabel="ORGANISM"
            preview={<AccordionItem title="Scorecard section" body="Details appear when expanded." />}
          />
          <CategoryOverviewCard
            title="Card"
            description="Dark content card with CWPC glow shadow"
            to="/docs/organisms/card"
            categoryLabel="ORGANISM"
            preview={
              <Card title="CWPC update" width="min(100%, 220px)">
                <p className={styles.cardMuted}>Short supporting copy.</p>
              </Card>
            }
          />
          <CategoryOverviewCard
            title="Forms"
            description="Complete multi-field form with dark container"
            to="/docs/organisms/forms"
            categoryLabel="ORGANISM"
            preview={
              <div style={{ transform: 'scale(0.45)', transformOrigin: 'top center', width: '222%' }}>
                <Forms
                  title="Sign in"
                  fields={[
                    { label: 'Email', type: 'email' },
                    { label: 'Password', type: 'password' },
                  ]}
                  primaryButtonLabel="Continue"
                />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Profile Card"
            description="Presenter profile with video thumbnail"
            to="/docs/organisms/profilecard"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.previewW200}>
                <ProfileCard variant="compact" name="Dr. Jane Rowe" role="Fire ecologist" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Video Card"
            description="Video thumbnail with presenter info"
            to="/docs/organisms/videocard"
            categoryLabel="ORGANISM"
            preview={<VideoCard title="Field briefing" presenterName="Alex Kim" />}
          />
          <CategoryOverviewCard
            title="Registration Modal"
            description="Closed registration notification"
            to="/docs/organisms/registrationmodal"
            categoryLabel="ORGANISM"
            preview={<Button label="Get notified" type="outlined" />}
          />
          <CategoryOverviewCard
            title="Navbar"
            description="Top navigation with logo and links"
            to="/docs/organisms/navbar"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.scaleNav}>
                <Navbar
                  activeHref="#"
                  items={[
                    { label: 'Home', href: '#' },
                    { label: 'Scorecard', href: '#' },
                    { label: 'About', href: '#' },
                  ]}
                />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Secondary Nav"
            description="Horizontal section links bar"
            to="/docs/organisms/secondarynav"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.scaleBar}>
                <SecondaryNav
                  activeHref="#b"
                  items={[
                    { label: 'Overview', href: '#a' },
                    { label: 'Specs', href: '#b' },
                    { label: 'API', href: '#c' },
                  ]}
                />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Footer"
            description="Multi-column footer with social links"
            to="/docs/organisms/footer"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.scaleFooter}>
                <Footer copyrightText="© CWPC" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Alert"
            description="Notification banner in 4 severity levels"
            to="/docs/organisms/alert"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.previewCol}>
                <Alert variant="success" message="Changes saved." />
                <Alert variant="warning" message="Review required." />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Toast"
            description="Temporary corner notification"
            to="/docs/organisms/toast"
            categoryLabel="ORGANISM"
            preview={
              <ToastView
                slideFrom="right"
                onDismissed={() => {}}
                item={{
                  id: 'overview-toast',
                  title: 'Success',
                  message: 'Your file uploaded.',
                  variant: 'success',
                  duration: 600000,
                }}
              />
            }
          />
          <CategoryOverviewCard
            title="Modal"
            description="Popup dialog overlay"
            to="/docs/organisms/modal"
            categoryLabel="ORGANISM"
            preview={<div className={styles.placeholderBox}>Modal dialog</div>}
          />
          <CategoryOverviewCard
            title="Menu"
            description="Vertical navigation with active states"
            to="/docs/organisms/menu"
            categoryLabel="ORGANISM"
            preview={
              <Menu variant="compact">
                <MenuItem label="Dashboard" href="#" active />
                <MenuItem label="Reports" href="#" />
                <MenuItem label="Settings" href="#" />
              </Menu>
            }
          />
          <CategoryOverviewCard
            title="Table"
            description="Sortable data table with striped rows"
            to="/docs/organisms/table"
            categoryLabel="ORGANISM"
            preview={
              <Table
                striped
                columns={[
                  { key: 'n', label: 'Name' },
                  { key: 's', label: 'Status' },
                ]}
                rows={[
                  { n: 'Alpha', s: 'Live' },
                  { n: 'Beta', s: 'Draft' },
                ]}
              />
            }
          />
          <CategoryOverviewCard
            title="Banner"
            description="Full-width hero with background and CTA"
            to="/docs/organisms/banner"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.scaleBanner}>
                <Banner subtitle="CWPC" title="Prevent wildfire" ctaLabel="Learn more" height="100px" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Panel"
            description="Collapsible side drawer"
            to="/docs/organisms/panel"
            categoryLabel="ORGANISM"
            preview={<div className={styles.placeholderBox}>Side panel</div>}
          />
          <CategoryOverviewCard
            title="Video Player"
            description="Custom video controls"
            to="/docs/organisms/videoplayer"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.previewW200}>
                <VideoPlayer title="Preview" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Grid Layout"
            description="Responsive column grid wrapper"
            to="/docs/organisms/gridlayout"
            categoryLabel="ORGANISM"
            preview={
              <GridLayout columns={3} gap="sm" responsive={false}>
                <div className={styles.placeholderBox}>1</div>
                <div className={styles.placeholderBox}>2</div>
                <div className={styles.placeholderBox}>3</div>
              </GridLayout>
            }
          />
          <CategoryOverviewCard
            title="Error Page"
            description="404 and 500 error screens"
            to="/docs/organisms/errorpage"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.scaleError}>
                <ErrorPage code="404" />
              </div>
            }
          />
          <CategoryOverviewCard
            title="Success Screen"
            description="Full-screen success confirmation"
            to="/docs/organisms/successscreen"
            categoryLabel="ORGANISM"
            preview={
              <div className={styles.scaleSuccess}>
                <SuccessScreen title="Submitted" description="We received your scorecard." />
              </div>
            }
          />
        </div>
      </DocsSection>
    </DocsPage>
  )
}
