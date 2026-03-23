import { useId } from 'react';
import { Button } from '../../atoms/Button/Button';
import styles from './ErrorPage.module.css';

export type ErrorPageProps = {
  code?: '404' | '500' | '403';
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
};

const defaultTitles: Record<NonNullable<ErrorPageProps['code']>, string> = {
  '404': 'Page Not Found',
  '500': 'Something Went Wrong',
  '403': 'Access Denied',
};

export const ErrorPage = ({
  code = '404',
  title,
  description,
  ctaLabel = 'Go Back Home',
  onCtaClick,
  ctaHref,
}: ErrorPageProps) => {
  const titleId = useId();
  const resolvedTitle = title ?? defaultTitles[code];

  return (
    <section className={styles.root} aria-labelledby={titleId}>
      <div className={styles.stack}>
        <div className={styles.textBlock}>
          <p className={styles.code} aria-hidden="true">
            {code}
          </p>
          <h1 id={titleId} className={styles.title}>
            {resolvedTitle}
          </h1>
          {description != null ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </div>
        <div className={styles.cta}>
          <Button
            label={ctaLabel}
            type="default"
            onClick={() => {
              onCtaClick?.();
              if (ctaHref != null) {
                window.location.href = ctaHref;
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};
