import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import SurveyList from '../components/surveys/SurveyList'
import { useSurveys } from '../hooks/useSurveys'
import { useDetections } from '../hooks/useDetections'

/**
 * Historical archive view — completed surveys first for demo narrative.
 */
export default function History() {
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

  const historical = useMemo(
    () => surveys.filter((s) => s.status === 'completed'),
    [surveys],
  )

  const loading = surveysLoading || detectionsLoading

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
            Archive
          </p>
          <h1 className="text-xl font-semibold text-white">Survey History</h1>
          <p className="mt-1 text-sm text-slate-400">
            Completed missions with stored tracks and AI detections.
          </p>
        </div>
        <Link
          to="/surveys"
          className="rounded border border-border px-3 py-2 text-xs text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
        >
          View all surveys
        </Link>
      </div>

      <SurveyList
        surveys={historical}
        detectionCounts={detectionCounts}
        loading={loading}
        showFilters={false}
        emptyMessage="No completed surveys yet. Finish an upload to populate history."
      />
    </div>
  )
}
