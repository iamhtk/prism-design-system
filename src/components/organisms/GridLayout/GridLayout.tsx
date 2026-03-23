import type { ReactNode } from 'react';
import styles from './GridLayout.module.css';

export type GridLayoutProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
};

const gapClassMap = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
} as const;

const colsClassMap = {
  1: styles.cols1,
  2: styles.cols2,
  3: styles.cols3,
  4: styles.cols4,
} as const;

export const GridLayout = ({
  children,
  columns = 3,
  gap = 'md',
  responsive = true,
}: GridLayoutProps) => {
  const rootClass = [
    styles.root,
    gapClassMap[gap],
    colsClassMap[columns],
    responsive ? styles.responsive : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={rootClass}>{children}</div>;
};
