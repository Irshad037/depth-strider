import { Link } from 'react-router-dom'

/**
 * @param {{
 *   title: string,
 *   description?: string,
 *   action?: { label: string, to: string },
 *   className?: string
 * }} props
 */
export default function EmptyState({ title, description, action, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded border border-dashed border-border px-4 py-12 text-center ${className}`}
    >
      <p className="text-sm font-medium text-slate-300">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-slate-500">{description}</p>
      )}
      {action && (
        <Link
          to={action.to}
          className="mt-4 rounded border border-cyan/50 bg-cyan/10 px-3 py-1.5 text-xs font-medium text-cyan transition-colors hover:bg-cyan/20"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
