import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './DocsSidebar.module.css'

export type NavItem = {
  label: string
  path: string
  status?: 'stable' | 'beta' | 'new' | 'deprecated'
  isOverview?: boolean
}

type NavGroup = {
  section: string
  items: NavItem[]
}

const nav: NavGroup[] = [
  {
    section: 'Foundation',
    items: [
      { label: 'Introduction', path: '/docs' },
      { label: 'Tokens', path: '/docs/tokens' },
      { label: 'Layout & Spacing', path: '/docs/layout' },
      { label: 'Grid', path: '/docs/grid' },
      { label: 'Elevation', path: '/docs/elevation' },
      { label: 'Background Blur', path: '/docs/blur' },
    ],
  },
  {
    section: 'Atoms',
    items: [
      { label: 'Overview', path: '/docs/atoms', isOverview: true },
      { label: 'Button', path: '/docs/atoms/button', status: 'stable' },
      { label: 'Label', path: '/docs/atoms/label', status: 'stable' },
      { label: 'Field', path: '/docs/atoms/field', status: 'stable' },
      { label: 'Link', path: '/docs/atoms/link', status: 'stable' },
      { label: 'Badge', path: '/docs/atoms/badge', status: 'stable' },
      { label: 'Tag', path: '/docs/atoms/tag', status: 'stable' },
      { label: 'Loader', path: '/docs/atoms/loader', status: 'stable' },
      { label: 'Divider', path: '/docs/atoms/divider', status: 'stable' },
      { label: 'Avatar', path: '/docs/atoms/avatar', status: 'stable' },
      { label: 'Skeleton', path: '/docs/atoms/skeleton', status: 'stable' },
      { label: 'Heading', path: '/docs/atoms/heading', status: 'stable' },
      { label: 'Text', path: '/docs/atoms/text', status: 'stable' },
      { label: 'Blockquote', path: '/docs/atoms/blockquote', status: 'stable' },
      { label: 'Code', path: '/docs/atoms/code', status: 'stable' },
      { label: 'Image', path: '/docs/atoms/image', status: 'stable' },
      { label: 'MapPin', path: '/docs/atoms/mappin', status: 'stable' },
      { label: 'Rating', path: '/docs/atoms/rating', status: 'stable' },
    ],
  },
  {
    section: 'Molecules',
    items: [
      { label: 'Overview', path: '/docs/molecules', isOverview: true },
      { label: 'Input', path: '/docs/molecules/input', status: 'stable' },
      { label: 'Checkbox', path: '/docs/molecules/checkbox', status: 'stable' },
      { label: 'Radio Button', path: '/docs/molecules/radiobutton', status: 'stable' },
      { label: 'Switch', path: '/docs/molecules/switch', status: 'stable' },
      { label: 'Text Area', path: '/docs/molecules/textarea', status: 'stable' },
      { label: 'Dropdown', path: '/docs/molecules/dropdown', status: 'stable' },
      { label: 'Search Bar', path: '/docs/molecules/searchbar', status: 'stable' },
      { label: 'Breadcrumb', path: '/docs/molecules/breadcrumb', status: 'stable' },
      { label: 'Tooltip', path: '/docs/molecules/tooltip', status: 'stable' },
      { label: 'Progress Bar', path: '/docs/molecules/progressbar', status: 'stable' },
      { label: 'Progress Circle', path: '/docs/molecules/progresscircle', status: 'stable' },
      { label: 'Tab Bar', path: '/docs/molecules/tabbar', status: 'stable' },
      { label: 'Button Group', path: '/docs/molecules/buttongroup', status: 'stable' },
      { label: 'Social Button', path: '/docs/molecules/socialbutton', status: 'stable' },
      { label: 'Pagination', path: '/docs/molecules/pagination', status: 'stable' },
      { label: 'Stat Card', path: '/docs/molecules/statcard', status: 'stable' },
      { label: 'Empty State', path: '/docs/molecules/emptystate', status: 'stable' },
      { label: 'Stepper', path: '/docs/molecules/stepper', status: 'stable' },
      { label: 'File Upload', path: '/docs/molecules/fileupload', status: 'stable' },
      { label: 'List', path: '/docs/molecules/list', status: 'stable' },
      { label: 'Filter Bar', path: '/docs/molecules/filterbar', status: 'stable' },
      { label: 'Date Picker', path: '/docs/molecules/datepicker', status: 'stable' },
      { label: 'Context Menu', path: '/docs/molecules/contextmenu', status: 'stable' },
      { label: 'Popover', path: '/docs/molecules/popover', status: 'stable' },
      { label: 'Notification Bar', path: '/docs/molecules/notificationbar', status: 'stable' },
      { label: 'Subscribe Widget', path: '/docs/molecules/subscribewidget', status: 'new' },
    ],
  },
  {
    section: 'Organisms',
    items: [
      { label: 'Overview', path: '/docs/organisms', isOverview: true },
      { label: 'Accordion', path: '/docs/organisms/accordion', status: 'stable' },
      { label: 'Card', path: '/docs/organisms/card', status: 'stable' },
      { label: 'Forms', path: '/docs/organisms/forms', status: 'stable' },
      { label: 'Profile Card', path: '/docs/organisms/profilecard', status: 'new' },
      { label: 'Video Card', path: '/docs/organisms/videocard', status: 'new' },
      { label: 'Registration Modal', path: '/docs/organisms/registrationmodal', status: 'new' },
      { label: 'Navbar', path: '/docs/organisms/navbar', status: 'new' },
      { label: 'Secondary Nav', path: '/docs/organisms/secondarynav', status: 'new' },
      { label: 'Footer', path: '/docs/organisms/footer', status: 'new' },
      { label: 'Alert', path: '/docs/organisms/alert', status: 'stable' },
      { label: 'Toast', path: '/docs/organisms/toast', status: 'stable' },
      { label: 'Modal', path: '/docs/organisms/modal', status: 'stable' },
      { label: 'Menu', path: '/docs/organisms/menu', status: 'stable' },
      { label: 'Table', path: '/docs/organisms/table', status: 'stable' },
      { label: 'Banner', path: '/docs/organisms/banner', status: 'new' },
      { label: 'Panel', path: '/docs/organisms/panel', status: 'stable' },
      { label: 'Video Player', path: '/docs/organisms/videoplayer', status: 'new' },
      { label: 'Grid Layout', path: '/docs/organisms/gridlayout', status: 'stable' },
      { label: 'Error Page', path: '/docs/organisms/errorpage', status: 'stable' },
      { label: 'Success Screen', path: '/docs/organisms/successscreen', status: 'stable' },
    ],
  },
]

const sectionCounts = new Map(nav.map((g) => [g.section, g.items.length]))

function dotClassForStatus(status: NavItem['status']): string {
  if (!status) return ''
  const map = {
    stable: styles.dotStable,
    beta: styles.dotBeta,
    new: styles.dotNew,
    deprecated: styles.dotDeprecated,
  } as const
  return map[status]
}

function useIsMac(): boolean {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
}

function isNavItemActive(path: string, pathname: string): boolean {
  if (path === '/docs') return pathname === '/docs'
  return pathname === path
}

function linkEndProp(item: NavItem): boolean {
  return item.path === '/docs' || item.isOverview === true
}

export function DocsSidebar() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const activeRef = useRef<HTMLAnchorElement | null>(null)
  const isMac = useIsMac()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const filtered = useMemo(
    () =>
      nav
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.label.toLowerCase().includes(query.trim().toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [query],
  )

  const searchPlaceholder = isMac ? 'Search... ⌘K' : 'Search... Ctrl+K'

  return (
    <>
      <button
        type="button"
        className={styles.hamburger}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        className={`${styles.overlay} ${mobileOpen ? styles.overlayVisible : ''}`}
        role="presentation"
        onClick={() => setMobileOpen(false)}
      />
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.search}>
          <input
            ref={searchRef}
            className={styles.searchInput}
            type="search"
            placeholder={searchPlaceholder}
            aria-label="Search components"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {filtered.length === 0 ? (
          <p className={styles.searchEmpty}>
            <span className={styles.searchEmptyIcon} aria-hidden>
              🔍
            </span>
            <span className={styles.searchEmptyText}>No components found</span>
          </p>
        ) : (
          filtered.map((group) => (
            <div key={group.section} className={styles.group}>
              <div className={styles.groupHeader}>
                <p className={styles.groupLabel}>{group.section}</p>
                <span className={styles.groupCount}>{sectionCounts.get(group.section) ?? group.items.length}</span>
              </div>
              {group.items.map((item) => (
                <NavLink
                  key={item.path + item.label}
                  to={item.path}
                  end={linkEndProp(item)}
                  className={({ isActive }) => {
                    if (item.isOverview) {
                      return [styles.overviewLink, isActive ? styles.overviewLinkActive : ''].filter(Boolean).join(' ')
                    }
                    return isActive ? `${styles.link} ${styles.active}` : styles.link
                  }}
                  ref={(el) => {
                    if (isNavItemActive(item.path, location.pathname)) {
                      activeRef.current = el
                    }
                  }}
                >
                  {item.isOverview ? (
                    <>
                      <span className={styles.overviewGridIcon} aria-hidden>
                        ▦
                      </span>
                      <span>{item.label}</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.linkLabel}>{item.label}</span>
                      {item.status ? (
                        <span
                          className={[styles.statusDot, dotClassForStatus(item.status)].filter(Boolean).join(' ')}
                          title={item.status}
                          aria-hidden
                        />
                      ) : null}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))
        )}
      </aside>
    </>
  )
}
