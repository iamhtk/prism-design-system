import styles from './SecondaryNav.module.css';

export type SecondaryNavItem = { label: string; href: string };

export type SecondaryNavProps = {
  items: SecondaryNavItem[];
  activeHref?: string;
};

export const SecondaryNav = ({
  items,
  activeHref,
}: SecondaryNavProps) => {
  return (
    <div className={styles.root}>
      <nav className={styles.inner} aria-label="Section">
        {items.map((item) => {
          const isActive = activeHref != null && item.href === activeHref;
          const linkClass = [styles.link, isActive ? styles.linkActive : '']
            .filter(Boolean)
            .join(' ');
          return (
            <a key={item.href} className={linkClass} href={item.href}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
