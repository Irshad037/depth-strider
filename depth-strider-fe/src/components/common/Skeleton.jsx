/**
 * @param {{ className?: string, lines?: number }} props
 */
export function SkeletonBlock({ className = '', lines = 1 }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded bg-border"
          style={{ width: `${70 - i * 12}%` }}
        />
      ))}
    </div>
  )
}

export function MapSkeleton({ label = 'Loading map…' }) {
  return (
    <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden bg-abyss">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-border/40 via-panel to-abyss" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 11px, #22d3ee10 12px), repeating-linear-gradient(90deg, transparent, transparent 11px, #22d3ee10 12px)',
        }}
      />
      <p className="relative text-sm text-slate-400">{label}</p>
    </div>
  )
}

export function PanelSkeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded border border-border bg-panel p-4 ${className}`}>
      <div className="mb-4 h-4 w-1/3 rounded bg-border" />
      <div className="mb-2 h-3 w-2/3 rounded bg-border/80" />
      <div className="h-3 w-1/2 rounded bg-border/60" />
    </div>
  )
}
