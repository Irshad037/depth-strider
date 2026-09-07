/**
 * @param {{
 *   value: number,
 *   className?: string,
 *   barClassName?: string
 * }} props
 */
export default function ProgressBar({ value, className = '', barClassName = 'bg-cyan' }) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className={`h-2 overflow-hidden rounded-full bg-border ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-150 ease-out ${barClassName}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
