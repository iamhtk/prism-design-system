import styles from './ProgressCircle.module.css';

export type ProgressCircleProps = {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  animated?: boolean;
  showValue?: boolean;
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const valueTextClassMap = {
  sm: styles.valueSm,
  md: styles.valueMd,
  lg: styles.valueLg,
} as const;

const variantClassMap = {
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  error: styles.variantError,
  info: styles.variantInfo,
} as const;

/** Diameter and stroke match values in cwpc-tokens.css */
const GEOMETRY = {
  sm: { d: 60, stroke: 4 },
  md: { d: 100, stroke: 6 },
  lg: { d: 140, stroke: 8 },
} as const;

export const ProgressCircle = ({
  value,
  size = 'md',
  label,
  variant = 'primary',
  animated = false,
  showValue = true,
}: ProgressCircleProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  const rounded = Math.round(clamped);
  const { d, stroke } = GEOMETRY[size];
  const cx = d / 2;
  const cy = d / 2;
  const r = (d - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - clamped / 100);

  const svgClass = [styles.svg, sizeClassMap[size]].join(' ');
  const progressClass = [
    styles.progress,
    variantClassMap[variant],
    animated ? styles.progressAnimated : '',
  ]
    .filter(Boolean)
    .join(' ');
  const valueClass = [styles.value, valueTextClassMap[size]].join(' ');

  const ariaLabel =
    label != null ? `${label}: ${rounded}%` : `Progress: ${rounded}%`;

  return (
    <div
      className={styles.root}
      role="progressbar"
      aria-valuenow={rounded}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${rounded}%`}
      aria-label={ariaLabel}
    >
      <div className={styles.svgWrap}>
        <svg
          className={svgClass}
          viewBox={`0 0 ${d} ${d}`}
          aria-hidden="true"
          focusable="false"
        >
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            <circle
              className={styles.track}
              cx={cx}
              cy={cy}
              r={r}
              strokeWidth={stroke}
            />
            <circle
              className={progressClass}
              cx={cx}
              cy={cy}
              r={r}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </g>
          {showValue ? (
            <text
              className={valueClass}
              x={cx}
              y={cy}
              dominantBaseline="central"
              textAnchor="middle"
            >
              {rounded}%
            </text>
          ) : null}
        </svg>
      </div>
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </div>
  );
};
