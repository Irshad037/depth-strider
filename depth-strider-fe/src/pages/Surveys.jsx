import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import SurveyList from '../components/surveys/SurveyList'
import { useSurveys } from '../hooks/useSurveys'
import { useDetections } from '../hooks/useDetections'

export default function Surveys() {
  const { data: surveys = [], isLoading: surveysLoading } = useSurveys()
  const { data: detections = [], isLoading: detectionsLoading } = useDetections()

  const detectionCounts = useMemo(() => {
    /** @type {Record<string, number>} */
    const counts = {}
    detections.forEach((d) => {
      counts[d.surveyId] = (counts[d.surveyId] ?? 0) + 1
    })
    return counts
  }, [detections])

  const totals = useMemo(() => {
    const completed = surveys.filter((s) => s.status === 'completed').length
    const active = surveys.filter((s) => s.status === 'in_progress').length
    return {
      surveys: surveys.length,
      completed,
      active,
      detections: detections.length,
    }
  }, [surveys, detections])

  const loading = surveysLoading || detectionsLoading

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
            Survey History
          </p>
          <h1 className="text-xl font-semibold text-white">Surveys</h1>
          <p className="mt-1 text-sm text-slate-400">
            Browse past missions, open tracks, and inspect stored detections.
          </p>
        </div>
        <Link
          to="/upload"
          className="rounded border border-cyan/50 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan transition-colors hover:bg-cyan/20"
        >
          Upload Sonar Data
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Summary label="Surveys" value={totals.surveys} loading={loading} />
        <Summary label="Completed" value={totals.completed} accent="text-ok" loading={loading} />
        <Summary label="Active" value={totals.active} accent="text-cyan" loading={loading} />
        <Summary label="Detections" value={totals.detections} accent="text-amber" loading={loading} />
      </div>

      <SurveyList
        surveys={surveys}
        detectionCounts={detectionCounts}
        loading={loading}
        emptyMessage={
          surveys.length === 0
            ? 'No surveys in archive yet.'
            : 'No surveys match this filter.'
        }
      />
    </div>
  )
}

function Summary({ label, value, accent = 'text-white', loading }) {
  return (
    <div className="rounded border border-border bg-panel px-3 py-2">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className={`font-mono text-lg ${loading ? 'text-slate-600' : accent}`}>
        {loading ? '—' : value}
      </p>
    </div>
  )
}
