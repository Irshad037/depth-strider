import { Link } from 'react-router-dom'
import {
  detectionTypeLabel,
  detectionAccent,
} from '../map/markerUtils'
import { getSonarEvidence } from '../../mock/mockSonarImages'

const STATUS_STYLES = {
  needs_review: 'text-amber border-amber/40 bg-amber/10',
  verified: 'text-ok border-ok/40 bg-ok/10',
  dismissed: 'text-slate-400 border-border bg-border/40',
}

/**
 * @param {{
 *   detection: Detection | null,
 *   onClose?: () => void
 * }} props
 */
export default function DetectionDrawer({ detection, onClose }) {
  if (!detection) return null

  const accent = detectionAccent(detection.type)
  const statusClass = STATUS_STYLES[detection.status] ?? STATUS_STYLES.dismissed
  const evidence = getSonarEvidence(detection.id, detection.thumbnailUrl)

  return (
    <aside className="absolute inset-y-0 right-0 z-[1100] flex w-full max-w-sm flex-col border-l border-border bg-panel shadow-2xl">
      <div className="flex items-start justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-[11px] tracking-widest text-slate-400 uppercase">
            Detection
          </p>
          <h2 className="font-mono text-lg text-white">{detection.id}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-border px-2 py-1 text-sm text-slate-300 hover:border-cyan hover:text-cyan"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="relative h-36 overflow-hidden rounded border border-border">
          <img
            src={evidence.imageUrl}
            alt="Sonar thumbnail"
            className="h-full w-full object-cover"
            style={{ filter: 'grayscale(0.3) contrast(1.2)' }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss/90 to-transparent px-2 py-1.5">
            <p className="font-mono text-xs" style={{ color: accent }}>
              {detectionTypeLabel(detection.type)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Field label="Type" value={detectionTypeLabel(detection.type)} accent={accent} />
          <Field
            label="Confidence"
            value={`${detection.confidence.toFixed(1)}%`}
          />
          <Field
            label="Coordinates"
            value={`${detection.lat.toFixed(4)}° N\n${detection.lng.toFixed(4)}° E`}
            mono
          />
          <Field label="Survey" value={detection.surveyId} mono />
          <Field
            label="Detected"
            value={new Date(detection.timestamp).toLocaleString()}
          />
          <div>
            <p className="mb-1 text-[11px] tracking-wide text-slate-400 uppercase">
              Status
            </p>
            <span
              className={`inline-block rounded border px-2 py-0.5 text-xs capitalize ${statusClass}`}
            >
              {detection.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <Link
          to={`/sonar/${detection.id}`}
          className="block w-full rounded border border-cyan/50 bg-cyan/10 px-4 py-2.5 text-center text-sm font-medium text-cyan hover:bg-cyan/20"
        >
          View Sonar Evidence →
        </Link>
      </div>
    </aside>
  )
}

function Field({ label, value, accent, mono }) {
  return (
    <div>
      <p className="mb-1 text-[11px] tracking-wide text-slate-400 uppercase">
        {label}
      </p>
      <p
        className={`whitespace-pre-line text-sm text-white ${mono ? 'font-mono text-xs' : ''}`}
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
    </div>
  )
}
