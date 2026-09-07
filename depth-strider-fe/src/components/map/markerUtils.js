import { useMemo } from 'react'
import L from 'leaflet'

const TYPE_COLORS = {
  submerged_vehicle: '#ef4444',
  ghost_net: '#f59e0b',
  debris: '#22d3ee',
  anomaly: '#94a3b8',
}

/**
 * @param {{ type: string, status: string, selected?: boolean }} props
 */
export function createDetectionIcon({ type, status, selected = false }) {
  const color = TYPE_COLORS[type] ?? TYPE_COLORS.anomaly
  const pulse = status === 'needs_review' ? 'ds-marker-pulse' : ''
  const size = selected ? 18 : 12
  const ring = selected ? `box-shadow: 0 0 0 3px ${color}55;` : ''

  return L.divIcon({
    className: 'ds-detection-marker',
    html: `<div class="ds-marker-dot ${pulse}" style="
      width:${size}px;
      height:${size}px;
      background:${color};
      border:2px solid #0a0e14;
      border-radius:50%;
      ${ring}
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

export function detectionTypeLabel(type) {
  const labels = {
    ghost_net: 'Ghost Net',
    debris: 'Marine Debris',
    submerged_vehicle: 'Submerged Vehicle',
    anomaly: 'Anomaly',
  }
  return labels[type] ?? type
}

export function detectionAccent(type) {
  return TYPE_COLORS[type] ?? TYPE_COLORS.anomaly
}

/** Stable icon cache keyed by type+status+selected */
export function useDetectionIcon(type, status, selected) {
  return useMemo(
    () => createDetectionIcon({ type, status, selected }),
    [type, status, selected],
  )
}
