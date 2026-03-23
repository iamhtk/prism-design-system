import styles from './Breadcrumb.module.css';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: '/' | '>';
};

export const Breadcrumb = ({
  items,
  separator = '/',
}: BreadcrumbProps) => {
  const lastIndex = items.length - 1;

  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === lastIndex;
          const showSep = index < lastIndex;

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : item.href != null ? (
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <span className={styles.plain}>{item.label}</span>
              )}
              {showSep ? (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
