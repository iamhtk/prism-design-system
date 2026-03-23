import styles from './Pagination.module.css';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  showFirstLast?: boolean;
  siblingCount?: number;
};

function buildPageRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): (number | 'ellipsis')[] {
  if (totalPages < 1) return [];
  const set = new Set<number>();
  set.add(1);
  set.add(totalPages);
  for (
    let i = currentPage - siblingCount;
    i <= currentPage + siblingCount;
    i += 1
  ) {
    if (i >= 1 && i <= totalPages) {
      set.add(i);
    }
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | 'ellipsis')[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) {
      out.push('ellipsis');
    }
    out.push(sorted[i]!);
  }
  return out;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  showFirstLast = false,
  siblingCount = 1,
}: PaginationProps) => {
  const safeTotal = Math.max(1, totalPages);
  const current = Math.min(safeTotal, Math.max(1, currentPage));
  const pages = buildPageRange(safeTotal, current, siblingCount);

  const go = (p: number) => {
    if (p < 1 || p > safeTotal || p === current) return;
    onChange(p);
  };

  return (
    <nav className={styles.root} aria-label="Pagination">
      {showFirstLast ? (
        <button
          type="button"
          className={[styles.btn, current <= 1 ? styles.disabled : ''].join(' ')}
          disabled={current <= 1}
          aria-label="First page"
          onClick={() => go(1)}
        >
          |&lt;
        </button>
      ) : null}
      <button
        type="button"
        className={[styles.btn, current <= 1 ? styles.disabled : ''].join(' ')}
        disabled={current <= 1}
        aria-label="Previous page"
        onClick={() => go(current - 1)}
      >
        ←
      </button>
      {pages.map((item, idx) =>
        item === 'ellipsis' ? (
          <span
            key={`e-${idx}`}
            className={[styles.btn, styles.ellipsis].join(' ')}
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={[
              styles.btn,
              item === current ? styles.current : '',
            ].join(' ')}
            aria-label={`Page ${item}`}
            aria-current={item === current ? 'page' : undefined}
            onClick={() => go(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className={[
          styles.btn,
          current >= safeTotal ? styles.disabled : '',
        ].join(' ')}
        disabled={current >= safeTotal}
        aria-label="Next page"
        onClick={() => go(current + 1)}
      >
        →
      </button>
      {showFirstLast ? (
        <button
          type="button"
          className={[
            styles.btn,
            current >= safeTotal ? styles.disabled : '',
          ].join(' ')}
          disabled={current >= safeTotal}
          aria-label="Last page"
          onClick={() => go(safeTotal)}
        >
          &gt;|
        </button>
      ) : null}
    </nav>
  );
};
