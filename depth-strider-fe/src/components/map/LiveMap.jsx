import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import TrackLine from './TrackLine'
import DetectionMarker from './DetectionMarker'

/**
 * Fly / pan when a detection is selected from the list.
 */
function MapFocus({ focusTarget }) {
  const map = useMap()

  useEffect(() => {
    if (!focusTarget) return
    map.flyTo([focusTarget.lat, focusTarget.lng], 11, { duration: 0.8 })
  }, [focusTarget, map])

  return null
}

/**
 * @param {{
 *   surveys?: Survey[],
 *   detections?: Detection[],
 *   selectedId?: string | null,
 *   focusTarget?: { lat: number, lng: number } | null,
 *   onSelectDetection?: (detection: Detection) => void,
 *   className?: string
 * }} props
 */
export default function LiveMap({
  surveys = [],
  detections = [],
  selectedId = null,
  focusTarget = null,
  onSelectDetection,
  className = '',
}) {
  const center = useMemo(() => {
    if (detections.length) {
      const lat =
        detections.reduce((sum, d) => sum + d.lat, 0) / detections.length
      const lng =
        detections.reduce((sum, d) => sum + d.lng, 0) / detections.length
      return [lat, lng]
    }
    return [18.2, 73.0]
  }, [detections])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <MapContainer
        center={center}
        zoom={8}
        className="h-full w-full bg-abyss"
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        <MapFocus focusTarget={focusTarget} />

        {surveys.map((survey) => (
          <TrackLine
            key={survey.id}
            survey={survey}
            active={survey.status === 'in_progress'}
          />
        ))}

        {detections.map((detection) => (
          <DetectionMarker
            key={detection.id}
            detection={detection}
            selected={detection.id === selectedId}
            onSelect={onSelectDetection}
          />
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded border border-border bg-panel/90 px-3 py-2 text-[11px] text-slate-300 backdrop-blur">
        <div className="mb-1 font-medium tracking-wide text-cyan">LAYERS</div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-cyan" /> Survey track
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-crit" /> Vehicle
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber" /> Ghost net
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan" /> Debris
          </span>
        </div>
      </div>
    </div>
  )
}
