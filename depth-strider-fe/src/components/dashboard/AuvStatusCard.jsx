/**
 * Static edge/AUV status widget for demo — no real device logic.
 */
export default function AuvStatusCard({
  name = 'AUV-07',
  status = 'ONLINE',
  processing = 'ACTIVE',
  inference = 'YOLO',
  device = 'EDGE',
  connection = 'STABLE',
}) {
  const online = status === 'ONLINE'

  return (
    <div className="rounded border border-border bg-panel p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase">
            Edge Node
          </p>
          <h3 className="font-mono text-sm text-white">{name}</h3>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] ${
            online
              ? 'border-ok/40 bg-ok/10 text-ok'
              : 'border-crit/40 bg-crit/10 text-crit'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-ok' : 'bg-crit'} ${online ? 'animate-pulse' : ''}`}
          />
          {status}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
        <Row label="Processing" value={processing} />
        <Row label="Inference" value={inference} accent="text-cyan" />
        <Row label="Device" value={device} />
        <Row label="Connection" value={connection} accent="text-ok" />
      </dl>
    </div>
  )
}

function Row({ label, value, accent = 'text-white' }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className={`font-mono ${accent}`}>{value}</dd>
    </div>
  )
}
