import type { ReactNode } from 'react';
import styles from './SocialButtonGroup.module.css';

export type SocialButtonGroupProps = {
  children: ReactNode;
  gap?: 'sm' | 'md';
};

export const SocialButtonGroup = ({
  children,
  gap = 'md',
}: SocialButtonGroupProps) => {
  const rootClass = [
    styles.root,
    gap === 'sm' ? styles.gapSm : styles.gapMd,
  ].join(' ');

  return <div className={rootClass}>{children}</div>;
};
