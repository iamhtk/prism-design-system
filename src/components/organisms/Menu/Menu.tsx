import type { ReactNode } from 'react';
import { MenuVariantContext } from './MenuItem';
import styles from './Menu.module.css';

export type MenuProps = {
  children: ReactNode;
  variant?: 'default' | 'compact';
};

export const Menu = ({
  children,
  variant = 'default',
}: MenuProps) => {
  return (
    <MenuVariantContext.Provider value={variant}>
      <div className={styles.menu}>{children}</div>
    </MenuVariantContext.Provider>
  );
};
