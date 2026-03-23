import { useId, useRef } from 'react'
import styles from './Controls.module.css'

export type ControlType =
  | { type: 'text'; label: string; key: string; default: string }
  | { type: 'select'; label: string; key: string; options: string[]; default: string }
  | { type: 'boolean'; label: string; key: string; default: boolean }
  | {
      type: 'number'
      label: string
      key: string
      default: number
      min?: number
      max?: number
      step?: number
    }
  | { type: 'color'; label: string; key: string; default: string }

export type ControlsProps = {
  controls: ControlType[]
  values: Record<string, any>
  onChange: (key: string, value: any) => void
}

function getValue(control: ControlType, values: Record<string, any>): any {
  const v = values[control.key]
  return v !== undefined ? v : control.default
}

export function Controls({ controls, values, onChange }: ControlsProps) {
  const baseId = useId()

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>Controls</span>
        <span className={styles.headerCount}>
          {controls.length} {controls.length === 1 ? 'prop' : 'props'}
        </span>
      </div>
      <div className={styles.grid}>
        {controls.map((control) => {
          const id = `${baseId}-${control.key}`
          const value = getValue(control, values)

          if (control.type === 'text') {
            return (
              <div key={control.key} className={styles.cell}>
                <label htmlFor={id} className={styles.controlLabel}>
                  {control.label}
                </label>
                <input
                  id={id}
                  className={styles.input}
                  type="text"
                  value={String(value)}
                  onChange={(e) => onChange(control.key, e.target.value)}
                />
              </div>
            )
          }

          if (control.type === 'select') {
            return (
              <div key={control.key} className={styles.cell}>
                <label htmlFor={id} className={styles.controlLabel}>
                  {control.label}
                </label>
                <div className={styles.selectWrap}>
                  <select
                    id={id}
                    className={styles.select}
                    value={String(value)}
                    onChange={(e) => onChange(control.key, e.target.value)}
                  >
                    {control.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className={styles.selectChevron} aria-hidden>
                    ▾
                  </span>
                </div>
              </div>
            )
          }

          if (control.type === 'boolean') {
            const checked = Boolean(value)
            return (
              <div key={control.key} className={styles.cell}>
                <span className={styles.controlLabel}>{control.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  className={[styles.toggle, checked ? styles.toggleOn : styles.toggleOff].join(' ')}
                  onClick={() => onChange(control.key, !checked)}
                >
                  <span
                    className={[styles.toggleKnob, checked ? styles.toggleKnobOn : ''].filter(Boolean).join(' ')}
                    aria-hidden
                  />
                </button>
              </div>
            )
          }

          if (control.type === 'number') {
            const step = control.step ?? 1
            const num = typeof value === 'number' ? value : Number(value)
            const safe = Number.isFinite(num) ? num : control.default
            const clamp = (n: number) => {
              let x = n
              if (control.min !== undefined) x = Math.max(control.min, x)
              if (control.max !== undefined) x = Math.min(control.max, x)
              return x
            }
            return (
              <div key={control.key} className={styles.cell}>
                <label htmlFor={id} className={styles.controlLabel}>
                  {control.label}
                </label>
                <div className={styles.numberRow}>
                  <button
                    type="button"
                    className={styles.numberBtn}
                    aria-label="Decrease"
                    onClick={() => onChange(control.key, clamp(safe - step))}
                  >
                    −
                  </button>
                  <input
                    id={id}
                    className={[styles.input, styles.numberInput].join(' ')}
                    type="number"
                    min={control.min}
                    max={control.max}
                    step={step}
                    value={safe}
                    onChange={(e) => {
                      const n = parseFloat(e.target.value)
                      if (Number.isFinite(n)) onChange(control.key, clamp(n))
                    }}
                  />
                  <button
                    type="button"
                    className={styles.numberBtn}
                    aria-label="Increase"
                    onClick={() => onChange(control.key, clamp(safe + step))}
                  >
                    +
                  </button>
                </div>
              </div>
            )
          }

          return (
            <ColorControlCell
              key={control.key}
              id={id}
              control={control}
              value={value}
              onChange={onChange}
            />
          )
        })}
      </div>
    </div>
  )
}

function normalizeHexForInput(hex: string): string {
  const h = hex.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(h)) return h
  if (/^#[0-9a-fA-F]{3}$/.test(h)) {
    const r = h[1]
    const g = h[2]
    const b = h[3]
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return '#000000'
}

type ColorControl = Extract<ControlType, { type: 'color' }>

function ColorControlCell({
  id,
  control,
  value,
  onChange,
}: {
  id: string
  control: ColorControl
  value: unknown
  onChange: (key: string, value: any) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const hex = typeof value === 'string' ? value : control.default

  return (
    <div className={styles.cell}>
      <span className={styles.controlLabel}>{control.label}</span>
      <div className={styles.colorRow}>
        <div className={styles.colorField}>
          <input
            ref={inputRef}
            id={id}
            type="color"
            className={styles.colorHidden}
            value={normalizeHexForInput(hex)}
            onChange={(e) => onChange(control.key, e.target.value)}
            aria-label={control.label}
          />
          <button
            type="button"
            className={styles.colorSwatchBtn}
            style={{ backgroundColor: hex }}
            onClick={() => inputRef.current?.click()}
            aria-label={`Open color picker for ${control.label}`}
          />
        </div>
        <span className={styles.colorHex}>{hex}</span>
      </div>
    </div>
  )
}
