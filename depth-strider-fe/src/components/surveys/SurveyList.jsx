import { useMemo, useState } from 'react'
import SurveyCard from './SurveyCard'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed' },
  { id: 'in_progress', label: 'In progress' },
]

/**
 * @param {{
 *   surveys?: Survey[],
 *   detectionCounts?: Record<string, number>,
 *   loading?: boolean,
 *   emptyMessage?: string,
 *   showFilters?: boolean
 * }} props
 */
export default function SurveyList({
  surveys = [],
  detectionCounts = {},
  loading = false,
  emptyMessage = 'No surveys in archive.',
  showFilters = true,
}) {
  const [filter, setFilter] = useState('all')

  const sorted = useMemo(() => {
    const filtered =
      !showFilters || filter === 'all'
        ? surveys
        : surveys.filter((s) => s.status === filter)

    return [...filtered].sort((a, b) => {
      const rank = (s) =>
        s.status === 'in_progress' ? 0 : s.status === 'failed' ? 2 : 1
      const byStatus = rank(a) - rank(b)
      if (byStatus !== 0) return byStatus
      return new Date(b.startedAt) - new Date(a.startedAt)
    })
  }, [surveys, filter, showFilters])

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {showFilters ? (
          <div className="inline-flex rounded border border-border bg-abyss p-0.5">
            {FILTERS.map((f) => (
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
        ) : (
          <p className="text-xs text-slate-500">Completed missions only</p>
        )}
        <p className="font-mono text-xs text-slate-500">
          {sorted.length} survey{sorted.length === 1 ? '' : 's'}
        </p>
      </div>

      {loading && <SurveyListSkeleton />}

      {!loading && sorted.length === 0 && (
        <div className="rounded border border-dashed border-border px-4 py-12 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      )}

      {!loading && sorted.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((survey) => (
            <SurveyCard
              key={survey.id}
              survey={survey}
              detectionCount={detectionCounts[survey.id]}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SurveyListSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded border border-border bg-panel p-4"
        >
          <div className="mb-3 h-4 w-2/3 rounded bg-border" />
          <div className="mb-6 h-3 w-1/3 rounded bg-border/70" />
          <div className="h-3 w-1/2 rounded bg-border/50" />
        </div>
      ))}
    </div>
  )
}
