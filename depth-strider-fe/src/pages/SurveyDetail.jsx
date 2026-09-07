import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import LiveMap from '../components/map/LiveMap'
import DetectionList from '../components/detections/DetectionList'
import DetectionDrawer from '../components/detections/DetectionDrawer'
import SurveyStats from '../components/surveys/SurveyStats'
import StatusBadge from '../components/common/StatusBadge'
import { MapSkeleton } from '../components/common/Skeleton'
import { useSurvey } from '../hooks/useSurveys'
import { useDetections } from '../hooks/useDetections'

export default function SurveyDetail() {
  const { id } = useParams()
  const { data: survey, isLoading: surveyLoading } = useSurvey(id)
  const { data: detections = [], isLoading: detectionsLoading } = useDetections(id)
  const [selectedId, setSelectedId] = useState(null)
  const [focusTarget, setFocusTarget] = useState(null)

  const selected = useMemo(
    () => detections.find((d) => d.id === selectedId) ?? null,
    [detections, selectedId],
  )

  const loading = surveyLoading || detectionsLoading

  function handleSelect(detection) {
    setSelectedId(detection.id)
    setFocusTarget({ lat: detection.lat, lng: detection.lng })
  }

  if (!loading && !survey) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-sm">
        <p className="text-slate-400">Survey not found.</p>
        <Link
          to="/surveys"
          className="text-cyan transition-colors hover:underline"
        >
          ← Back to surveys
        </Link>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/surveys"
            className="text-[11px] tracking-widest text-slate-500 uppercase transition-colors hover:text-cyan"
          >
            ← Survey History
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-white">
            {loading ? 'Loading…' : survey.name}
          </h1>
          <p className="font-mono text-xs text-slate-400">
            {id}
            {survey?.area ? ` · ${survey.area}` : ''}
            {survey?.startedAt
              ? ` · ${new Date(survey.startedAt).toLocaleString()}`
              : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {survey && (
            <StatusBadge status={survey.status} className="px-2.5 py-1 text-xs" />
          )}
          <Link
            to="/upload"
            className="rounded border border-border px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
          >
            New upload
          </Link>
        </div>
      </div>

      <SurveyStats detections={detections} loading={loading} />

      <div className="flex min-h-0 flex-1 gap-4">
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden rounded border border-border bg-panel">
          <div className="pointer-events-none absolute left-3 top-3 z-[1000] rounded border border-border bg-panel/90 px-2 py-1 text-[11px] text-slate-300 backdrop-blur">
            Survey track · {survey?.track?.length ?? 0} pts
          </div>
          {loading ? (
            <MapSkeleton label="Loading survey track…" />
          ) : (
            <LiveMap
              surveys={survey ? [survey] : []}
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
  )
}
