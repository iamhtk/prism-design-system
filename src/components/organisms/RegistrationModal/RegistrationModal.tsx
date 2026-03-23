import { useEffect, useId, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Alert } from '../Alert/Alert';
import { Modal } from '../Modal/Modal';
import styles from './RegistrationModal.module.css';

export type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onSubscribe?: (email: string) => void;
  successMessage?: string;
};

const defaultTitle =
  'Registration is currently closed. Get notified when it opens!';

function isValidEmail(value: string): boolean {
  const t = value.trim();
  return t.includes('@') && t.includes('.');
}

export const RegistrationModal = ({
  isOpen,
  onClose,
  title = defaultTitle,
  description,
  onSubscribe,
  successMessage = "You're on the list. We'll email you when registration opens.",
}: RegistrationModalProps) => {
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setEmail('');
    }
  }, [isOpen]);

  const handleSubscribe = () => {
    if (!isValidEmail(email)) {
      return;
    }
    onSubscribe?.(email.trim());
    setSubmitted(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      surface="light"
      showCloseButton
      title={undefined}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {description != null && description.length > 0 ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {submitted ? (
          <Alert variant="success" message={successMessage} />
        ) : (
          <>
            <div className={styles.emailRow}>
              <label className={styles.emailLabel} htmlFor={emailId}>
                Email
              </label>
              <input
                id={emailId}
                className={styles.emailInput}
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className={styles.subscribeSlot}>
              <Button
                label="Subscribe for Updates"
                type="default"
                onClick={handleSubscribe}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
