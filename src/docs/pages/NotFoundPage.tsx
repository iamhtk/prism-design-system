import { useNavigate } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.desc}>
        This component or page doesn&apos;t exist in the design system yet.
      </p>
      <button type="button" className={styles.btn} onClick={() => navigate('/docs')}>
        Back to Introduction
      </button>
    </div>
  )
}
