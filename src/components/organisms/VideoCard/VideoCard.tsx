import { Avatar } from '../../atoms/Avatar/Avatar';
import { Button } from '../../atoms/Button/Button';
import styles from './VideoCard.module.css';

export type VideoCardProps = {
  thumbnailSrc?: string;
  videoUrl?: string;
  title: string;
  presenterName?: string;
  presenterRole?: string;
  presenterAvatarSrc?: string;
  duration?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  onPlay?: () => void;
};

export const VideoCard = ({
  thumbnailSrc,
  videoUrl,
  title,
  presenterName,
  presenterRole,
  presenterAvatarSrc,
  duration,
  ctaLabel = 'View Presentation',
  onCtaClick,
  onPlay,
}: VideoCardProps) => {
  const thumb =
    thumbnailSrc != null && thumbnailSrc.length > 0 ? (
      <img className={styles.thumbnail} src={thumbnailSrc} alt="" />
    ) : (
      <div className={styles.thumbnailFallback} aria-hidden />
    );

  const openVideo = () => {
    onPlay?.();
    if (videoUrl != null && videoUrl.length > 0) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className={styles.root}>
      <div className={styles.thumbWrap}>
        {thumb}
        <button
          type="button"
          className={styles.play}
          aria-label={`Play: ${title}`}
          onClick={openVideo}
        >
          <span className={styles.playTriangle} aria-hidden />
        </button>
        {duration != null && duration.length > 0 ? (
          <span className={styles.duration}>{duration}</span>
        ) : null}
      </div>
      <div className={styles.body}>
        <h2 className={styles.cardTitle}>{title}</h2>
        {presenterName != null && presenterName.length > 0 ? (
          <div className={styles.presenterRow}>
            <Avatar
              src={presenterAvatarSrc}
              name={presenterName}
              alt=""
              size="presenter"
              variant="circle"
            />
            <div className={styles.presenterText}>
              <p className={styles.presenterName}>{presenterName}</p>
              {presenterRole != null && presenterRole.length > 0 ? (
                <p className={styles.presenterRole}>{presenterRole}</p>
              ) : null}
            </div>
          </div>
        ) : null}
        {ctaLabel != null && ctaLabel.length > 0 ? (
          <div className={styles.ctaSlot}>
            <Button
              label={ctaLabel}
              type="transparent"
              onClick={onCtaClick}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
};
