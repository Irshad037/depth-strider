import { Link } from 'react-router-dom'
import StatusBadge from '../common/StatusBadge'

/**
 * @param {{
 *   survey: Survey,
 *   detectionCount?: number
 * }} props
 */
export default function SurveyCard({ survey, detectionCount }) {
  const count =
    typeof detectionCount === 'number' ? detectionCount : survey.detectionCount
  const date = new Date(survey.startedAt)

  return (
    <Link
      to={`/surveys/${survey.id}`}
      className="group flex flex-col rounded border border-border bg-panel p-4 transition-colors hover:border-cyan/40 hover:bg-border/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-medium text-white group-hover:text-cyan">
            {survey.name}
          </h2>
          <p className="mt-0.5 font-mono text-[11px] text-slate-500">
            {survey.id}
          </p>
        </div>
        <StatusBadge status={survey.status} />
      </div>

      <p className="mt-3 text-sm text-slate-400">{survey.area}</p>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-3">
        <div className="text-xs text-slate-500">
          <p>{date.toLocaleDateString()}</p>
          <p className="mt-0.5 font-mono text-[10px] text-slate-600">
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-lg text-white">{count}</p>
          <p className="text-[11px] text-slate-500">detections</p>
        </div>
      </div>

      {survey.track?.length > 0 && (
        <p className="mt-3 text-[11px] text-slate-600">
          Track · {survey.track.length} waypoints · Konkan sector
        </p>
      )}
    </Link>
  )
}
