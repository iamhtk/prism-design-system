import styles from './PropsTable.module.css'

export type PropRow = {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export type PropsTableProps = {
  props: PropRow[]
  title?: string
}

export function PropsTable({ props: rows, title }: PropsTableProps) {
  return (
    <div>
      {title ? <p className={styles.tableTitle}>{title}</p> : null}
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <span className={styles.namecell}>
                    {row.name}
                    {row.required ? (
                      <span className={styles.required} aria-hidden>
                        {' '}
                        *
                      </span>
                    ) : null}
                  </span>
                </td>
                <td>
                  <code className={styles.typecell}>{row.type}</code>
                </td>
                <td>
                  <span className={styles.defaultcell}>
                    {row.default !== undefined && row.default !== '' ? row.default : '—'}
                  </span>
                </td>
                <td>
                  <span className={styles.desccell}>{row.description}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
