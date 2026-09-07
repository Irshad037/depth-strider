import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SonarViewer from '../components/sonar/SonarViewer'
import OverlayToggle from '../components/sonar/OverlayToggle'
import ConfidenceBar from '../components/sonar/ConfidenceBar'
import { useDetection, useDetections, useVerifyDetection } from '../hooks/useDetections'
import { getSonarEvidence } from '../mock/mockSonarImages'
import {
  detectionTypeLabel,
  detectionAccent,
} from '../components/map/markerUtils'

export default function SonarAnalysis() {
  const { detectionId } = useParams()
  const navigate = useNavigate()
  const { data: detection, isLoading } = useDetection(detectionId)
  const { data: allDetections = [] } = useDetections()
  const verifyMutation = useVerifyDetection()

  const [mode, setMode] = useState('overlay')
  const [showSegmentation, setShowSegmentation] = useState(true)
  const [verifiedFlash, setVerifiedFlash] = useState(false)

  const evidence = useMemo(
    () => getSonarEvidence(detectionId, detection?.thumbnailUrl),
    [detectionId, detection?.thumbnailUrl],
  )

  const sortedIds = useMemo(
    () =>
      [...allDetections]
        .sort((a, b) => b.confidence - a.confidence)
        .map((d) => d.id),
    [allDetections],
  )

  const currentIndex = sortedIds.indexOf(detectionId)
  const prevId = currentIndex > 0 ? sortedIds[currentIndex - 1] : null
  const nextId =
    currentIndex >= 0 && currentIndex < sortedIds.length - 1
      ? sortedIds[currentIndex + 1]
      : null

  async function handleVerify() {
    if (!detection || detection.status === 'verified') return
    await verifyMutation.mutateAsync(detection.id)
    setVerifiedFlash(true)
    setTimeout(() => setVerifiedFlash(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="h-8 w-48 animate-pulse rounded bg-border" />
        <div className="min-h-0 flex-1 animate-pulse rounded border border-border bg-panel" />
        <div className="h-28 animate-pulse rounded border border-border bg-panel" />
      </div>
    )
  }

  if (!detection) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-sm">
        <p className="text-slate-400">Detection not found.</p>
        <Link to="/" className="text-cyan transition-colors hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  const accent = detectionAccent(detection.type)
  const status = verifiedFlash ? 'verified' : detection.status

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            to="/"
            className="text-[11px] tracking-widest text-slate-500 uppercase hover:text-cyan"
          >
            ← Mission Control
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-white">
            Sonar Analysis
          </h1>
          <p className="mt-0.5 font-mono text-sm text-slate-400">
            {detection.id} · {detection.surveyId}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!prevId}
            onClick={() => prevId && navigate(`/sonar/${prevId}`)}
            className="rounded border border-border px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan/50 hover:text-cyan disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            type="button"
            disabled={!nextId}
            onClick={() => nextId && navigate(`/sonar/${nextId}`)}
            className="rounded border border-border px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan/50 hover:text-cyan disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <OverlayToggle
          mode={mode}
          onChange={setMode}
          showSegmentation={showSegmentation}
          onToggleSegmentation={() => setShowSegmentation((v) => !v)}
        />
        <p className="text-[11px] text-slate-500">
          Toggle Raw / Processed / AI Overlay · inspect before verifying
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <SonarViewer
          imageUrl={evidence.imageUrl}
          mode={mode}
          boundingBox={evidence.boundingBox}
          segmentation={evidence.segmentation}
          showSegmentation={showSegmentation}
          type={detection.type}
          confidence={detection.confidence}
        />
      </div>

      <div className="grid gap-4 rounded border border-border bg-panel p-4 md:grid-cols-[1fr_auto]">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="mb-1 text-[11px] tracking-wide text-slate-400 uppercase">
              Detection
            </p>
            <p className="text-sm font-medium" style={{ color: accent }}>
              {detectionTypeLabel(detection.type)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] tracking-wide text-slate-400 uppercase">
              Location
            </p>
            <p className="font-mono text-xs text-white">
              {detection.lat.toFixed(4)}°N {detection.lng.toFixed(4)}°E
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] tracking-wide text-slate-400 uppercase">
              Status
            </p>
            <span
              className={`inline-block rounded border px-2 py-0.5 text-xs capitalize ${
                status === 'verified'
                  ? 'border-ok/40 bg-ok/10 text-ok'
                  : status === 'needs_review'
                    ? 'border-amber/40 bg-amber/10 text-amber'
                    : 'border-border text-slate-400'
              }`}
            >
              {status.replace('_', ' ')}
            </span>
          </div>
          <ConfidenceBar confidence={detection.confidence} className="sm:col-span-3" />
        </div>

        <div className="flex flex-col justify-end gap-2 md:min-w-[200px]">
          <button
            type="button"
            onClick={handleVerify}
            disabled={status === 'verified' || verifyMutation.isPending}
            className={`rounded px-4 py-2.5 text-sm font-medium transition-colors ${
              status === 'verified'
                ? 'border border-ok/40 bg-ok/10 text-ok'
                : 'border border-cyan/50 bg-cyan/10 text-cyan hover:bg-cyan/20'
            } disabled:cursor-not-allowed`}
          >
            {verifyMutation.isPending
              ? 'Saving…'
              : status === 'verified'
                ? '✓ Verified'
                : 'Mark as Verified'}
          </button>
          {verifiedFlash && (
            <p className="text-center text-[11px] text-ok">
              Detection marked verified
            </p>
          )}
          <Link
            to={`/?focus=${detection.id}`}
            className="rounded border border-border px-4 py-2 text-center text-xs text-slate-300 transition-colors hover:border-cyan/40 hover:text-cyan"
          >
            View on Map
          </Link>
        </div>
      </div>
    </div>
  )
}
