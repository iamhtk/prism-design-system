import { Button } from '../../atoms/Button/Button';
import { SocialButton } from '../../molecules/SocialButton/SocialButton';
import styles from './Footer.module.css';

export type FooterColumnLink = { label: string; href: string };

export type FooterColumn = { heading: string; links: FooterColumnLink[] };

export type FooterProps = {
  columns?: FooterColumn[];
  socialLinks?: { platform: string; href: string }[];
  copyrightText?: string;
  logoSrc?: string;
  onSubscribe?: () => void;
};

export const CWPC_LOGO_SRC_DEFAULT =
  'https://www.figma.com/api/mcp/asset/ec8b27e0-6682-46b5-9d3e-915a870260bb';

const defaultColumns: FooterColumn[] = [
  {
    heading: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Sponsor', href: '/sponsor' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Scorecard',
    links: [
      { label: 'Scorecard Home', href: '/scorecard' },
      { label: 'Scorecard Instructions', href: '/scorecard/instructions' },
      { label: 'Scorecard FAQs', href: '/scorecard/faqs' },
      { label: 'About Scorecard', href: '/scorecard/about' },
    ],
  },
  {
    heading: 'Showcase',
    links: [
      { label: 'Innovations', href: '/showcase/innovations' },
      { label: 'Presentations', href: '/showcase/presentations' },
    ],
  },
];

const defaultSocialLinks: { platform: string; href: string }[] = [
  { platform: 'linkedin', href: 'https://www.linkedin.com/' },
  { platform: 'facebook', href: 'https://www.facebook.com/' },
  { platform: 'youtube', href: 'https://www.youtube.com/' },
  { platform: 'tiktok', href: 'https://www.tiktok.com/' },
  { platform: 'instagram', href: 'https://www.instagram.com/' },
  { platform: 'share', href: 'https://example.com/share' },
];

const socialPlatforms = [
  'facebook',
  'twitter',
  'linkedin',
  'youtube',
  'instagram',
  'tiktok',
  'share',
] as const;

type SocialPlatform = (typeof socialPlatforms)[number];

function isSocialPlatform(p: string): p is SocialPlatform {
  return socialPlatforms.includes(p.toLowerCase() as SocialPlatform);
}

export const Footer = ({
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  copyrightText = '© Catastrophic Wildfire Prevention Consortium. All rights reserved.',
  logoSrc,
  onSubscribe,
}: FooterProps) => {
  const resolvedLogo = logoSrc ?? CWPC_LOGO_SRC_DEFAULT;

  return (
    <footer className={styles.root}>
      <div className={styles.row}>
        <div className={styles.brandColumn}>
          <a className={styles.logoLink} href="/">
            <img
              className={styles.logoImage}
              src={resolvedLogo}
              alt="Catastrophic Wildfire Prevention Consortium"
            />
          </a>
          <p className={styles.copyright}>{copyrightText}</p>
        </div>

        {columns.map((column) => (
          <div key={column.heading} className={styles.linkColumn}>
            <h2 className={styles.columnHeading}>{column.heading}</h2>
            <ul className={styles.linkList}>
              {column.links.map((link) => (
                <li key={link.href} className={styles.linkItem}>
                  <a className={styles.columnLink} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.followColumn}>
          <h2 className={styles.columnHeading}>Follow Us</h2>
          <div className={styles.socialRow}>
            {socialLinks.map(({ platform, href }) => {
              const key = `${platform}-${href}`;
              if (isSocialPlatform(platform)) {
                return (
                  <SocialButton
                    key={key}
                    platform={platform.toLowerCase() as SocialPlatform}
                    href={href}
                    variant="brand"
                    size="xs"
                  />
                );
              }
              return (
                <a key={key} className={styles.fallbackSocial} href={href}>
                  {platform}
                </a>
              );
            })}
          </div>
          <div className={styles.subscribeWrap}>
            <Button
              label="Subscribe"
              type="default"
              onClick={onSubscribe}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
