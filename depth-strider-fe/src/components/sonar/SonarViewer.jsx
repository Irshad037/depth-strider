import {
  detectionTypeLabel,
  detectionAccent,
} from '../map/markerUtils'

/**
 * @param {{
 *   imageUrl: string,
 *   mode: 'raw' | 'processed' | 'overlay',
 *   boundingBox: { x: number, y: number, w: number, h: number },
 *   segmentation?: [number, number][],
 *   showSegmentation?: boolean,
 *   type: string,
 *   confidence: number
 * }} props
 */
export default function SonarViewer({
  imageUrl,
  mode,
  boundingBox,
  segmentation = [],
  showSegmentation = false,
  type,
  confidence,
}) {
  const accent = detectionAccent(type)

  const imageFilter =
    mode === 'raw'
      ? 'grayscale(1) contrast(0.85) brightness(0.9)'
      : mode === 'processed'
        ? 'grayscale(0.35) contrast(1.35) brightness(1.05)'
        : 'grayscale(0.2) contrast(1.2) brightness(1.02)'

  const polygonPoints = segmentation
    .map(([x, y]) => `${x},${y}`)
    .join(' ')

  return (
    <div className="relative overflow-hidden rounded border border-border bg-abyss">
      <div className="relative aspect-[16/9] w-full">
        <img
          src={imageUrl}
          alt="Side-scan sonar"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: imageFilter }}
          draggable={false}
        />

        {/* Scanline HUD */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, #22d3ee08 4px)',
          }}
        />

        {mode === 'overlay' && (
          <>
            <div
              className="absolute border-2"
              style={{
                left: `${boundingBox.x}%`,
                top: `${boundingBox.y}%`,
                width: `${boundingBox.w}%`,
                height: `${boundingBox.h}%`,
                borderColor: accent,
                boxShadow: `0 0 0 1px ${accent}33, inset 0 0 24px ${accent}22`,
              }}
            >
              <div
                className="absolute -top-6 left-0 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold text-abyss"
                style={{ background: accent }}
              >
                {detectionTypeLabel(type).toUpperCase()} {confidence.toFixed(1)}%
              </div>
            </div>

            {showSegmentation && polygonPoints && (
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon
                  points={polygonPoints}
                  fill={accent}
                  fillOpacity="0.4"
                  stroke={accent}
                  strokeWidth="0.4"
                />
              </svg>
            )}
          </>
        )}

        <div className="pointer-events-none absolute bottom-2 left-2 rounded border border-border/80 bg-panel/80 px-2 py-1 font-mono text-[10px] text-slate-300 backdrop-blur">
          SSS · {mode.toUpperCase()}
          {mode === 'overlay' && showSegmentation ? ' · SEG' : ''}
        </div>
      </div>
    </div>
  )
}
