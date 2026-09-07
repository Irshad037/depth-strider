import { Polyline, CircleMarker, Tooltip } from 'react-leaflet'

/**
 * @param {{ survey: Survey, active?: boolean }} props
 */
export default function TrackLine({ survey, active = false }) {
  if (!survey?.track?.length) return null

  const positions = survey.track
  const last = positions[positions.length - 1]

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: active ? '#22d3ee' : '#22d3ee88',
          weight: active ? 4 : 2,
          opacity: active ? 0.95 : 0.55,
          dashArray: active ? undefined : '6 8',
        }}
      >
        <Tooltip sticky>{survey.name}</Tooltip>
      </Polyline>

      {active && last && (
        <CircleMarker
          center={last}
          radius={8}
          pathOptions={{
            color: '#0a0e14',
            weight: 2,
            fillColor: '#22d3ee',
            fillOpacity: 1,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} permanent>
            LIVE
          </Tooltip>
        </CircleMarker>
      )}
    </>
  )
}
