import styles from './Navbar.module.css';

export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export type NavbarProps = {
  items: NavItem[];
  activeHref?: string;
  logoSrc?: string;
};

export const Navbar = ({ items, activeHref, logoSrc }: NavbarProps) => {
  return (
    <header className={styles.root}>
      <a className={styles.logoLink} href="/">
        {logoSrc != null && logoSrc.length > 0 ? (
          <img
            className={styles.logoImage}
            src={logoSrc}
            alt="Catastrophic Wildfire Prevention Consortium"
          />
        ) : (
          <span className={styles.logoText}>CWPC</span>
        )}
      </a>
      <nav className={styles.nav} aria-label="Primary">
        {items.map((item) => {
          const isActive = activeHref != null && item.href === activeHref;
          const linkClass = [styles.link, isActive ? styles.linkActive : '']
            .filter(Boolean)
            .join(' ');
          return (
            <a key={item.href} className={linkClass} href={item.href}>
              <span className={styles.linkLabel}>{item.label}</span>
              {item.hasDropdown === true ? (
                <span className={styles.dropdownMark} aria-hidden>
                  ▾
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>
    </header>
  );
};
