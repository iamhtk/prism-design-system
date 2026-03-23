import { Button } from '../../atoms/Button/Button';
import styles from './Banner.module.css';

export type BannerProps = {
  imageSrc?: string;
  subtitle?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  height?: string;
  align?: 'left' | 'center';
  /** When false, the dark gradient overlay over the image/fallback is omitted. */
  showOverlay?: boolean;
};

export const Banner = ({
  imageSrc,
  subtitle,
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  height,
  align = 'left',
  showOverlay = true,
}: BannerProps) => {
  const bannerStyle =
    height !== undefined && height.length > 0
      ? { height, minHeight: height }
      : undefined;

  const innerClass = [
    styles.inner,
    align === 'center' ? styles.innerCenter : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={styles.banner} style={bannerStyle}>
      {imageSrc != null && imageSrc.length > 0 ? (
        <img className={styles.bgImage} src={imageSrc} alt="" />
      ) : (
        <div className={styles.bgFallback} aria-hidden />
      )}
      {showOverlay ? <div className={styles.overlay} aria-hidden /> : null}
      <div className={styles.content}>
        <div className={innerClass}>
          {subtitle != null ? (
            <p className={styles.subtitle}>{subtitle}</p>
          ) : null}
          <h1 className={styles.title}>{title}</h1>
          {description != null ? (
            <p className={styles.description}>{description}</p>
          ) : null}
          {ctaLabel != null ? (
            <div className={styles.cta}>
              <Button
                label={ctaLabel}
                type="default"
                colorScheme="information"
                onClick={() => {
                  onCtaClick?.();
                  if (ctaHref != null) {
                    window.location.href = ctaHref;
                  }
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};
