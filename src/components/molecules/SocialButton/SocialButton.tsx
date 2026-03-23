import type { ReactNode } from 'react';
import styles from './SocialButton.module.css';

export type SocialButtonProps = {
  platform:
    | 'facebook'
    | 'twitter'
    | 'linkedin'
    | 'youtube'
    | 'instagram'
    | 'tiktok'
    | 'share';
  href: string;
  variant?: 'brand' | 'primary' | 'outlined';
  size?: 'xs' | 'sm' | 'md';
};

const brandClassMap = {
  facebook: styles.brandFacebook,
  twitter: styles.brandTwitter,
  linkedin: styles.brandLinkedin,
  youtube: styles.brandYoutube,
  instagram: styles.brandInstagram,
  tiktok: styles.brandTiktok,
  share: styles.brandShare,
} as const;

const icons: Record<SocialButtonProps['platform'], ReactNode> = {
  facebook: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.5l.5-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  ),
  twitter: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M18.2 7.5c.2-.2.4-.5.5-.8-1.8.7-3 .8-1-.9-2.2-1.5-3.6-1.5-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1-4.1-.2-7.7-2.2-10.1-5.2-.4.7-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 4 4.9-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.5 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.6 2.2 9.1 0 14.1-7.5 14.1-14.1v-.6c1-.7 1.8-1.6 2.5-2.6z" />
    </svg>
  ),
  linkedin: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M6.5 8.5h-3V21h3V8.5zm-1.5-4.5C4 4 3 5 3 6.2s1 2.2 2.5 2.2S8 7.5 8 6.2 7 4 5 4 5 4zm12.5 5c-2.8 0-4.5 1.5-5.3 2.6V8.5H9V21h3v-6.3c0-1.4.5-2.8 2.4-2.8 2.1 0 2.1 1.9 2.1 3.4V21h3v-7.2c0-3.5-.8-6.2-4.8-6.2z" />
    </svg>
  ),
  youtube: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M21.8 8.2s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16 5 12 5 12 5s-4 0-6.9.3c-.4 0-1.3 0-2.1.9-.6.6-.8 2-.8 2S2 9.9 2 11.7v1.6c0 1.8.2 3.5.2 3.5s.2 1.4.8 2c.8.8 1.8.8 2.2.9 1.6.2 6.8.2 6.8.2s4 0 6.9-.3c.4 0 1.3 0 2.1-.9.6-.6.8-2 .8-2s.2-1.7.2-3.5v-1.6c0-1.8-.2-3.5-.2-3.5zM10 15.5v-7l5.5 3.5L10 15.5z" />
    </svg>
  ),
  instagram: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 7.2c-2.7 0-4.8 2.1-4.8 4.8s2.1 4.8 4.8 4.8 4.8-2.1 4.8-4.8-2.1-4.8-4.8-4.8zm0 7.9c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm6.1-8.1c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1.5-1.1 1.1-1.1 1.1.5 1.1 1.1zM20 8.3c0-1.3-.3-2.6-.9-3.7-.9-1.6-2.7-2.5-5.1-2.6H10c-2.4.1-4.2 1-5.1 2.6C4.3 5.7 4 6.9 4 8.3v7.4c0 1.3.3 2.6.9 3.7.9 1.6 2.7 2.5 5.1 2.6h4c2.4-.1 4.2-1 5.1-2.6.6-1.1.9-2.3.9-3.7V8.3zM18.2 16c0 .9-.2 1.7-.5 2.2-.5.9-1.7 1.4-3.2 1.5H9.5c-1.5-.1-2.7-.6-3.2-1.5-.3-.5-.5-1.3-.5-2.2V8c0-.9.2-1.7.5-2.2.5-.9 1.7-1.4 3.2-1.5h5c1.5.1 2.7.6 3.2 1.5.3.5.5 1.3.5 2.2v8z" />
    </svg>
  ),
  tiktok: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  share: (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  ),
};

export const SocialButton = ({
  platform,
  href,
  variant = 'brand',
  size = 'md',
}: SocialButtonProps) => {
  const sizeClass =
    size === 'xs'
      ? styles.sizeXs
      : size === 'sm'
        ? styles.sizeSm
        : styles.sizeMd;

  const variantClasses =
    variant === 'brand'
      ? [styles.variantBrand, brandClassMap[platform]]
      : variant === 'primary'
        ? [styles.variantPrimary]
        : [styles.variantOutlined];

  const rootClass = [styles.root, sizeClass, ...variantClasses]
    .filter(Boolean)
    .join(' ');

  const label =
    variant === 'brand'
      ? `Visit our ${platform} page`
      : `${platform} social link`;

  return (
    <a
      className={rootClass}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {icons[platform]}
    </a>
  );
};
