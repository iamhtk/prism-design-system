import { CodeBlock } from '../helpers/CodeBlock'
import { DocsPage, DocsSection } from '../helpers/DocsPage'
import styles from './GridPage.module.css'

const GRID_USAGE = `import { GridLayout } from './components/organisms/GridLayout/GridLayout'

// 3 column grid
<GridLayout columns={3} gap="md">
  <Card title="Item 1" />
  <Card title="Item 2" />
  <Card title="Item 3" />
</GridLayout>

// Responsive (collapses on mobile)
<GridLayout columns={4} gap="lg" responsive>
  {items.map(item => <StatCard key={item.id} {...item} />)}
</GridLayout>`

const BREAKPOINT_ROWS = [
  ['Mobile S', '320 – 480px', '4', '16px', '16px', '100%'],
  ['Mobile L', '320 – 480px', '8', '16px', '8px', '100%'],
  ['Tablet S', '481 – 768px', '6', '16px', '16px', '100%'],
  ['Tablet L', '481 – 768px', '8', '16px', '16px', '100%'],
  ['Laptop', '769 – 1280px', '12', '32px', '16px', '100%'],
  ['Desktop', '1281px+', '12', 'Grow', '18px', '1152px'],
] as const

export function GridPage() {
  return (
    <DocsPage
      category="Foundation"
      title="Grid"
      description="Column grid system for responsive layouts across all screen sizes."
    >
      <DocsSection title="Breakpoints">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.th}>
                  Breakpoint
                </th>
                <th scope="col" className={styles.th}>
                  Screen Size
                </th>
                <th scope="col" className={styles.th}>
                  Columns
                </th>
                <th scope="col" className={styles.th}>
                  Margin
                </th>
                <th scope="col" className={styles.th}>
                  Gutter
                </th>
                <th scope="col" className={styles.th}>
                  Max Width
                </th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINT_ROWS.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, col) => (
                    <td key={`${row[0]}-${col}`} className={styles.td}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection title="Using GridLayout">
        <CodeBlock code={GRID_USAGE} language="tsx" />
      </DocsSection>
    </DocsPage>
  )
}
