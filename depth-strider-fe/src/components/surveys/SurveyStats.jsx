/**
 * @param {{
 *   detections?: Detection[],
 *   loading?: boolean
 * }} props
 */
export default function SurveyStats({ detections = [], loading = false }) {
  const total = detections.length
  const ghostNets = detections.filter((d) => d.type === 'ghost_net').length
  const debris = detections.filter((d) => d.type === 'debris').length
  const vehicles = detections.filter((d) => d.type === 'submerged_vehicle').length
  const anomalies = detections.filter((d) => d.type === 'anomaly').length
  const needsReview = detections.filter((d) => d.status === 'needs_review').length

  const items = [
    { label: 'Total', value: total, accent: 'text-white' },
    { label: 'Ghost nets', value: ghostNets, accent: 'text-amber' },
    { label: 'Debris', value: debris, accent: 'text-cyan' },
    { label: 'Vehicles', value: vehicles, accent: 'text-crit' },
    { label: 'Anomalies', value: anomalies, accent: 'text-slate-300' },
    { label: 'Needs review', value: needsReview, accent: 'text-amber' },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded border border-border bg-panel px-3 py-2"
        >
          <p className="text-[11px] text-slate-500">{item.label}</p>
          <p
            className={`font-mono text-lg ${loading ? 'text-slate-600' : item.accent}`}
          >
            {loading ? '—' : item.value}
          </p>
        </div>
      ))}
    </div>
  )
}
