import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LiveMap from '../components/map/LiveMap'
import DetectionList from '../components/detections/DetectionList'
import DetectionDrawer from '../components/detections/DetectionDrawer'
import EmptyState from '../components/common/EmptyState'
import { MapSkeleton } from '../components/common/Skeleton'
import {
  detectionTypeLabel,
  detectionAccent,
} from '../components/map/markerUtils'
import { useDetections } from '../hooks/useDetections'

const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'needs_review', label: 'Needs review' },
  { id: 'ghost_net', label: 'Ghost nets' },
  { id: 'debris', label: 'Debris' },
  { id: 'submerged_vehicle', label: 'Vehicles' },
]

export default function DetectionDetail() {
  const { data: detections = [], isLoading } = useDetections()
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = searchParams.get('filter') || 'all'
  const [selectedId, setSelectedId] = useState(null)
  const [focusTarget, setFocusTarget] = useState(null)

  const filtered = useMemo(() => {
    if (filter === 'all') return detections
    if (filter === 'needs_review') {
      return detections.filter((d) => d.status === 'needs_review')
    }
    return detections.filter((d) => d.type === filter)
  }, [detections, filter])

  const selected = useMemo(
    () => detections.find((d) => d.id === selectedId) ?? null,
    [detections, selectedId],
  )

  function handleSelect(detection) {
    setSelectedId(detection.id)
    setFocusTarget({ lat: detection.lat, lng: detection.lng })
  }

  function setFilter(id) {
    setSearchParams(id === 'all' ? {} : { filter: id })
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
            AI Catalog
          </p>
          <h1 className="text-xl font-semibold text-white">Detections</h1>
          <p className="mt-1 text-sm text-slate-400">
            Browse all AI findings across surveys.
          </p>
        </div>
        <p className="font-mono text-xs text-slate-500">
          {isLoading ? '—' : `${filtered.length} shown`}
        </p>
      </div>

      <div className="inline-flex flex-wrap gap-1 rounded border border-border bg-abyss p-0.5 self-start">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.id
                ? 'bg-cyan/20 text-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {!isLoading && detections.length === 0 ? (
        <EmptyState
          title="No detections yet"
          description="Run an upload pipeline to populate AI detections."
          action={{ label: 'Upload sonar data', to: '/upload' }}
        />
      ) : (
        <div className="flex min-h-0 flex-1 gap-4">
          <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded border border-border bg-panel">
            {isLoading ? (
              <MapSkeleton label="Loading detections…" />
            ) : filtered.length === 0 ? (
              <EmptyState
                className="h-full border-0"
                title="No matches for this filter"
                description="Try another filter or clear to All."
              />
            ) : (
              <LiveMap
                detections={filtered}
                selectedId={selectedId}
                focusTarget={focusTarget}
                onSelectDetection={handleSelect}
              />
            )}
            <DetectionDrawer
              detection={selected}
              onClose={() => setSelectedId(null)}
            />
          </div>

          <DetectionList
            detections={filtered}
            selectedId={selectedId}
            loading={isLoading}
            onSelect={handleSelect}
          />
        </div>
      )}

      {selected && (
        <p className="text-xs text-slate-500">
          Selected{' '}
          <span style={{ color: detectionAccent(selected.type) }}>
            {detectionTypeLabel(selected.type)}
          </span>{' '}
          ·{' '}
          <Link to={`/sonar/${selected.id}`} className="text-cyan hover:underline">
            Open sonar evidence
          </Link>
        </p>
      )}
    </div>
  )
}
