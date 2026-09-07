import { useMemo } from 'react'
import {
  detectionTypeLabel,
  detectionAccent,
} from '../map/markerUtils'

/**
 * Sort: needs_review pinned first, then confidence descending.
 * @param {Detection[]} detections
 */
function sortDetections(detections) {
  return [...detections].sort((a, b) => {
    const aReview = a.status === 'needs_review' ? 0 : 1
    const bReview = b.status === 'needs_review' ? 0 : 1
    if (aReview !== bReview) return aReview - bReview
    return b.confidence - a.confidence
  })
}

/**
 * @param {{
 *   detections?: Detection[],
 *   selectedId?: string | null,
 *   loading?: boolean,
 *   onSelect?: (detection: Detection) => void
 * }} props
 */
export default function DetectionList({
  detections = [],
  selectedId = null,
  loading = false,
  onSelect,
}) {
  const sorted = useMemo(() => sortDetections(detections), [detections])
  const reviewCount = detections.filter((d) => d.status === 'needs_review').length

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-hidden rounded border border-border bg-panel">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <p className="text-[11px] tracking-widest text-slate-400 uppercase">
              AI Feed
            </p>
            <h2 className="text-sm font-semibold text-white">Detections</h2>
          </div>
          <div className="text-right text-[11px]">
            <span className="font-mono text-white">{detections.length}</span>
            {reviewCount > 0 && (
              <span className="ml-2 font-mono text-amber">{reviewCount} review</span>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading && <ListSkeleton />}

        {!loading && sorted.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No detections in current sector.
          </p>
        )}

        {!loading &&
          sorted.map((detection) => {
            const selected = detection.id === selectedId
            const needsReview = detection.status === 'needs_review'
            const accent = detectionAccent(detection.type)

            return (
              <button
                key={detection.id}
                type="button"
                onClick={() => onSelect?.(detection)}
                className={`w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-border/40 ${
                  selected ? 'bg-cyan/10' : ''
                } ${needsReview ? 'border-l-2 border-l-amber' : 'border-l-2 border-l-transparent'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
                      <span className="truncate text-sm font-medium text-white">
                        {detectionTypeLabel(detection.type)}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                      {detection.id}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-sm ${
                      detection.confidence >= 90 ? 'text-amber' : 'text-slate-300'
                    }`}
                  >
                    {detection.confidence.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span className="truncate font-mono">
                    {detection.lat.toFixed(3)}°N {detection.lng.toFixed(3)}°E
                  </span>
                  <StatusPill status={detection.status} />
                </div>
              </button>
            )
          })}
      </div>
    </aside>
  )
}

function StatusPill({ status }) {
  const styles = {
    needs_review: 'text-amber bg-amber/10',
    verified: 'text-ok bg-ok/10',
    dismissed: 'text-slate-500 bg-border/50',
  }

  return (
    <span
      className={`rounded px-1.5 py-0.5 capitalize ${styles[status] ?? styles.dismissed}`}
    >
      {status.replace('_', ' ')}
    </span>
  )
}

function ListSkeleton() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border-b border-border px-4 py-3">
          <div className="mb-2 h-3 w-2/3 animate-pulse rounded bg-border" />
          <div className="h-2 w-1/3 animate-pulse rounded bg-border/70" />
        </div>
      ))}
    </div>
  )
}
