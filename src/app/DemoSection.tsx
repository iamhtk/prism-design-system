import type { ReactNode } from 'react';
import styles from './demoLayout.module.css';

export function SectionDivider({
  label,
  first,
}: {
  label: string;
  first?: boolean;
}) {
  return (
    <div
      className={
        first
          ? `${styles.sectionDivider} ${styles.sectionDividerFirst}`
          : styles.sectionDivider
      }
    >
      <span className={styles.sectionLabel}>{label}</span>
    </div>
  );
}

export function DemoBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.demoBlock}>
      <p className={styles.demoLabel}>{label}</p>
      <div className={styles.demoSurface}>{children}</div>
    </div>
  );
}
