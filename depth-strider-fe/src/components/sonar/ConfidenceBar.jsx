/**
 * @param {{ confidence: number, className?: string }} props
 */
export default function ConfidenceBar({ confidence, className = '' }) {
  const clamped = Math.max(0, Math.min(100, confidence))
  const tone =
    clamped >= 90 ? 'bg-amber' : clamped >= 75 ? 'bg-cyan' : 'bg-slate-400'

  return (
    <div className={className}>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="tracking-wide text-slate-400 uppercase">Confidence</span>
        <span className="font-mono text-white">{clamped.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full ${tone} transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
