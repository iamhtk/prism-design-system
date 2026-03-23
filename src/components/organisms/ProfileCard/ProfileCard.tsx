import { Avatar } from '../../atoms/Avatar/Avatar';
import { Button } from '../../atoms/Button/Button';
import styles from './ProfileCard.module.css';

export type ProfileCardProps = {
  avatarSrc?: string;
  name: string;
  role: string;
  company?: string;
  companyLogoSrc?: string;
  location?: string;
  linkedinUrl?: string;
  videoThumbnailSrc?: string;
  videoUrl?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  description?: string;
  variant?: 'compact' | 'full';
};

export const ProfileCard = ({
  avatarSrc,
  name,
  role,
  company,
  companyLogoSrc,
  location,
  linkedinUrl,
  videoThumbnailSrc,
  videoUrl,
  ctaLabel = 'View Presentation Slides',
  onCtaClick,
  description,
  variant = 'full',
}: ProfileCardProps) => {
  const isFull = variant === 'full';

  const mediaContent =
    videoThumbnailSrc != null && videoThumbnailSrc.length > 0 ? (
      <img
        className={styles.thumbnail}
        src={videoThumbnailSrc}
        alt=""
      />
    ) : (
      <div className={styles.thumbnailFallback} aria-hidden />
    );

  const media =
    videoUrl != null && videoUrl.length > 0 ? (
      <a
        className={styles.mediaLink}
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {mediaContent}
      </a>
    ) : (
      <div className={styles.mediaStatic}>{mediaContent}</div>
    );

  const rootClass = [
    styles.root,
    isFull ? styles.rootFull : styles.rootCompact,
  ].join(' ');

  return (
    <article className={rootClass}>
      <div className={styles.left}>
        <div className={styles.topRow}>
          <Avatar
            src={avatarSrc}
            name={name}
            alt=""
            size="lg"
            variant="circle"
          />
          <div className={styles.brandRow}>
            {linkedinUrl != null && linkedinUrl.length > 0 ? (
              <a
                className={styles.linkedinBadge}
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
              >
                in
              </a>
            ) : null}
            {companyLogoSrc != null && companyLogoSrc.length > 0 ? (
              <img
                className={styles.companyLogo}
                src={companyLogoSrc}
                alt=""
              />
            ) : null}
          </div>
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.role}>{role}</p>
        {company != null && company.length > 0 ? (
          <p className={styles.company}>{company}</p>
        ) : null}
        {location != null && location.length > 0 ? (
          <p className={styles.location}>{location}</p>
        ) : null}
        {description != null && description.length > 0 ? (
          <p className={styles.description}>{description}</p>
        ) : null}
      </div>

      {isFull ? (
        <>
          <div className={styles.media}>{media}</div>
          <div className={styles.ctaSlot}>
            <Button label={ctaLabel} type="default" onClick={onCtaClick} />
          </div>
        </>
      ) : (
        <div className={styles.ctaSlotCompact}>
          <Button label={ctaLabel} type="default" onClick={onCtaClick} />
        </div>
      )}
    </article>
  );
};
