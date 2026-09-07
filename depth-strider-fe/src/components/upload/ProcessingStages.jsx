import ProgressBar from '../common/ProgressBar'

/**
 * @param {{
 *   fileName?: string,
 *   currentStage: string,
 *   stages: string[],
 *   progressPct: number,
 *   detectionCount: number,
 *   isDone: boolean
 * }} props
 */
export default function ProcessingStages({
  fileName,
  currentStage,
  stages,
  progressPct,
  detectionCount,
  isDone,
}) {
  const currentIdx = stages.indexOf(currentStage)

  return (
    <div className="rounded border border-border bg-panel p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
            Processing Survey
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            {isDone ? 'Pipeline complete' : currentStage}
          </h2>
          {fileName && (
            <p className="mt-1 font-mono text-xs text-slate-500">{fileName}</p>
          )}
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl text-white">{Math.round(progressPct)}%</p>
          <p className="text-[11px] text-slate-500">overall progress</p>
        </div>
      </div>

      <ProgressBar
        value={progressPct}
        barClassName={isDone ? 'bg-ok' : 'bg-cyan'}
        className="mb-6"
      />

      <ol className="mb-6 space-y-2">
        {stages.map((stage, idx) => {
          const done = idx < currentIdx || (isDone && stage === 'Completed')
          const active = stage === currentStage && !isDone

          return (
            <li
              key={stage}
              className={`flex items-center gap-3 rounded border px-3 py-2 text-sm ${
                active
                  ? 'border-cyan/40 bg-cyan/10 text-cyan'
                  : done
                    ? 'border-border/60 text-ok'
                    : 'border-transparent text-slate-500'
              }`}
            >
              <span className="font-mono text-[11px] opacity-70">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">{stage}</span>
              <span className="text-[11px]">
                {done ? '✓' : active ? '●' : '·'}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded border border-border bg-abyss/50 px-3 py-2">
          <p className="text-[11px] text-slate-500">Current stage</p>
          <p className="font-medium text-white">{currentStage}</p>
        </div>
        <div className="rounded border border-border bg-abyss/50 px-3 py-2">
          <p className="text-[11px] text-slate-500">Detections</p>
          <p className="font-mono text-lg text-amber">{detectionCount}</p>
        </div>
      </div>
    </div>
  )
}
