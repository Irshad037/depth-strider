import { Marker } from 'react-leaflet'
import { useDetectionIcon } from './markerUtils'

/**
 * @param {{
 *   detection: Detection,
 *   selected?: boolean,
 *   onSelect?: (detection: Detection) => void
 * }} props
 */
export default function DetectionMarker({ detection, selected = false, onSelect }) {
  const icon = useDetectionIcon(detection.type, detection.status, selected)

  return (
    <Marker
      position={[detection.lat, detection.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect?.(detection),
      }}
      zIndexOffset={selected ? 1000 : detection.status === 'needs_review' ? 500 : 0}
    />
  )
}
