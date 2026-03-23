import {
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import styles from './Table.module.css';

export type TableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
};

export type TableProps = {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
  striped?: boolean;
  caption?: string;
  stickyHeader?: boolean;
};

type SortState = { key: string; dir: 'asc' | 'desc' };

function sortValue(node: ReactNode): string {
  if (node == null) return '';
  if (
    typeof node === 'string' ||
    typeof node === 'number' ||
    typeof node === 'boolean'
  ) {
    return String(node);
  }
  return '';
}

export const Table = ({
  columns,
  rows,
  striped = false,
  caption,
  stickyHeader = false,
}: TableProps) => {
  const [sortState, setSortState] = useState<SortState | null>(null);

  const sortedRows = useMemo(() => {
    if (sortState == null) return rows;
    const col = columns.find((c) => c.key === sortState.key);
    if (!col?.sortable) return rows;
    const { key, dir } = sortState;
    return [...rows].sort((a, b) => {
      const cmp = sortValue(a[key]).localeCompare(
        sortValue(b[key]),
        undefined,
        { numeric: true, sensitivity: 'base' },
      );
      return dir === 'asc' ? cmp : -cmp;
    });
  }, [rows, columns, sortState]);

  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!sortable) return;
    setSortState((prev) => {
      if (prev?.key === columnKey) {
        return { key: columnKey, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      }
      return { key: columnKey, dir: 'asc' };
    });
  };

  const tableClass = [styles.table, stickyHeader ? styles.stickyHeader : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <table className={tableClass}>
        {caption != null ? (
          <caption className={styles.caption}>{caption}</caption>
        ) : null}
        <thead>
          <tr className={styles.headRow}>
            {columns.map((col) => {
              const isSorted = sortState?.key === col.key;
              const sortIcon =
                col.sortable != null && col.sortable ? (
                  <span
                    className={
                      isSorted ? styles.sortIconsActive : styles.sortIcons
                    }
                    aria-hidden="true"
                  >
                    {isSorted && sortState != null
                      ? sortState.dir === 'asc'
                        ? '↑'
                        : '↓'
                      : '↑↓'}
                  </span>
                ) : null;

              const thStyle: CSSProperties = {
                textAlign: col.align ?? 'left',
                ...(col.width != null ? { width: col.width } : {}),
              };

              const thClass = [
                styles.th,
                col.sortable ? styles.thSortable : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <th key={col.key} className={thClass} style={thStyle}>
                  {col.sortable ? (
                    <button
                      type="button"
                      className={styles.headerButton}
                      onClick={() => handleSort(col.key, col.sortable)}
                    >
                      {col.label}
                      {sortIcon}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => {
            const rowClass = [styles.row, striped ? styles.rowStriped : '']
              .filter(Boolean)
              .join(' ');
            return (
              <tr key={rowIndex} className={rowClass}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={styles.td}
                    style={{ textAlign: col.align ?? 'left' }}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
