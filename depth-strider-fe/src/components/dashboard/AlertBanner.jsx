import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDetections } from '../../hooks/useDetections'

/**
 * Critical SAR-style alert — only when a submerged vehicle needs review.
 */
export default function AlertBanner() {
  const { data: detections = [] } = useDetections()
  const [dismissedIds, setDismissedIds] = useState(() => new Set())
  const navigate = useNavigate()

  const alert = useMemo(() => {
    return detections
      .filter(
        (d) =>
          d.type === 'submerged_vehicle' &&
          d.status === 'needs_review' &&
          !dismissedIds.has(d.id),
      )
      .sort((a, b) => b.confidence - a.confidence)[0]
  }, [detections, dismissedIds])

  if (!alert) return null

  return (
    <div className="shrink-0 border-b border-crit/40 bg-crit/10 px-4 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-crit px-1.5 py-0.5 text-[10px] font-semibold tracking-widest text-white uppercase">
              High Priority
            </span>
            <p className="text-sm font-medium text-white">
              Potential submerged vehicle detected
            </p>
          </div>
          <p className="mt-0.5 font-mono text-[11px] text-slate-300">
            {alert.id} · {alert.confidence.toFixed(1)}% confidence ·{' '}
            {alert.lat.toFixed(4)}°N {alert.lng.toFixed(4)}°E · {alert.surveyId}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/sonar/${alert.id}`)}
            className="rounded border border-crit/50 bg-crit/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-crit/30"
          >
            Review Detection
          </button>
          <Link
            to={`/?focus=${alert.id}`}
            className="rounded border border-border px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
          >
            View on Map
          </Link>
          <button
            type="button"
            onClick={() =>
              setDismissedIds((prev) => new Set([...prev, alert.id]))
            }
            className="rounded px-2 py-1.5 text-xs text-slate-500 hover:text-slate-300"
            aria-label="Dismiss alert"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
