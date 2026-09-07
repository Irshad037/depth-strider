/**
 * @param {{
 *   status: 'in_progress' | 'completed' | 'failed' | string,
 *   className?: string
 * }} props
 */
export default function StatusBadge({ status, className = '' }) {
  const styles = {
    completed: 'border-ok/40 bg-ok/10 text-ok',
    in_progress: 'border-cyan/40 bg-cyan/10 text-cyan',
    failed: 'border-crit/40 bg-crit/10 text-crit',
  }

  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 text-[11px] capitalize ${styles[status] ?? styles.failed} ${className}`}
    >
      {String(status).replace('_', ' ')}
    </span>
  )
}
