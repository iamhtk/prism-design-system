import { useId } from 'react';
import { Button } from '../../atoms/Button/Button';
import styles from './SuccessScreen.module.css';

export type SuccessScreenProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
};

export const SuccessScreen = ({
  title = 'Success!',
  description,
  ctaLabel,
  onCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
}: SuccessScreenProps) => {
  const titleId = useId();

  return (
    <section className={styles.root} aria-labelledby={titleId}>
      <div className={styles.stack}>
        <div className={styles.iconWrap} aria-hidden>
          <span className={styles.check}>✓</span>
        </div>
        <h1 id={titleId} className={styles.title}>
          {title}
        </h1>
        {description != null ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {(ctaLabel != null || secondaryCtaLabel != null) ? (
          <div className={styles.actions}>
            {ctaLabel != null ? (
              <Button
                label={ctaLabel}
                type="default"
                colorScheme="success"
                onClick={onCtaClick}
              />
            ) : null}
            {secondaryCtaLabel != null ? (
              <Button
                label={secondaryCtaLabel}
                type="transparent"
                onClick={onSecondaryCtaClick}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};
