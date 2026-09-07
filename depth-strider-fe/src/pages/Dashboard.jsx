import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LiveMap from '../components/map/LiveMap'
import DetectionDrawer from '../components/detections/DetectionDrawer'
import DetectionList from '../components/detections/DetectionList'
import AuvStatusCard from '../components/dashboard/AuvStatusCard'
import EmptyState from '../components/common/EmptyState'
import { MapSkeleton } from '../components/common/Skeleton'
import { useDetections } from '../hooks/useDetections'
import { useSurveys } from '../hooks/useSurveys'

export default function Dashboard() {
  const { data: surveys = [], isLoading: surveysLoading } = useSurveys()
  const { data: detections = [], isLoading: detectionsLoading } = useDetections()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedId, setSelectedId] = useState(null)
  const [focusTarget, setFocusTarget] = useState(null)

  const selected = useMemo(
    () => detections.find((d) => d.id === selectedId) ?? null,
    [detections, selectedId],
  )

  const critical = useMemo(
    () =>
      detections
        .filter(
          (d) => d.type === 'submerged_vehicle' && d.status === 'needs_review',
        )
        .sort((a, b) => b.confidence - a.confidence)[0],
    [detections],
  )

  const loading = surveysLoading || detectionsLoading

  useEffect(() => {
    const focusId = searchParams.get('focus')
    if (!focusId || loading) return
    const target = detections.find((d) => d.id === focusId)
    if (!target) return
    setSelectedId(target.id)
    setFocusTarget({ lat: target.lat, lng: target.lng })
    setSearchParams({}, { replace: true })
  }, [searchParams, detections, loading, setSearchParams])

  function handleSelect(detection) {
    setSelectedId(detection.id)
    setFocusTarget({ lat: detection.lat, lng: detection.lng })
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
            Mission Control
          </p>
          <h1 className="text-xl font-semibold text-white">
            Live Geospatial Awareness
          </h1>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
          <Stat label="Surveys" value={surveys.length} loading={loading} />
          <Stat label="Detections" value={detections.length} loading={loading} />
          <Stat
            label="Needs review"
            value={detections.filter((d) => d.status === 'needs_review').length}
            accent="text-amber"
            loading={loading}
          />
        </div>
      </div>

      {!loading && detections.length === 0 && surveys.length === 0 ? (
        <EmptyState
          title="No mission data yet"
          description="Upload side-scan sonar to start the AI pipeline."
          action={{ label: 'Upload sonar data', to: '/upload' }}
          className="flex-1"
        />
      ) : (
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_220px]">
          <div className="flex min-h-0 flex-col gap-4">
            {critical && (
              <button
                type="button"
                onClick={() => handleSelect(critical)}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-crit/40 bg-crit/10 px-4 py-2 text-left text-xs transition-colors hover:bg-crit/15"
              >
                <span className="text-slate-300">
                  <span className="mr-2 font-semibold tracking-wide text-crit uppercase">
                    Critical
                  </span>
                  Jump to {critical.id} · submerged vehicle ·{' '}
                  {critical.confidence.toFixed(1)}%
                </span>
                <span className="text-crit">Focus map →</span>
              </button>
            )}

            <div className="flex min-h-0 flex-1 gap-4">
              <div className="relative min-h-[320px] min-w-0 flex-1 overflow-hidden rounded border border-border bg-panel lg:min-h-0">
                {loading ? (
                  <MapSkeleton label="Acquiring survey feeds…" />
                ) : (
                  <LiveMap
                    surveys={surveys}
                    detections={detections}
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
                detections={detections}
                selectedId={selectedId}
                loading={loading}
                onSelect={handleSelect}
              />
            </div>
          </div>

          <aside className="flex shrink-0 flex-col gap-4">
            <AuvStatusCard />
            <div className="rounded border border-border bg-panel p-4 text-[11px]">
              <p className="mb-2 tracking-wide text-slate-500 uppercase">
                Quick actions
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/upload"
                  className="rounded border border-border px-2 py-1.5 text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  Upload sonar
                </Link>
                <Link
                  to="/history"
                  className="rounded border border-border px-2 py-1.5 text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  Survey history
                </Link>
                {critical && (
                  <Link
                    to={`/sonar/${critical.id}`}
                    className="rounded border border-crit/40 bg-crit/10 px-2 py-1.5 text-crit transition-colors hover:bg-crit/20"
                  >
                    Open critical sonar
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, accent = 'text-white', loading }) {
  return (
    <div className="rounded border border-border bg-panel px-3 py-1.5">
      <span className="mr-2 text-slate-500">{label}</span>
      <span className={`font-mono ${loading ? 'text-slate-600' : accent}`}>
        {loading ? '—' : value}
      </span>
    </div>
  )
}
