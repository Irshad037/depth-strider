import { useCallback, useEffect, useRef, useState } from 'react'

export const PROCESSING_STAGES = [
  ['Uploading', 800],
  ['Ingesting', 1200],
  ['Preprocessing', 1500],
  ['AI Inference', 2500],
  ['Segmentation', 1200],
  ['Geo Validation', 800],
  ['Completed', 400],
]

/**
 * Fake multi-stage processing pipeline for demo uploads.
 * @param {{ autoStart?: boolean, onComplete?: () => void }} [options]
 */
export function useProcessingSimulation({ autoStart = false, onComplete } = {}) {
  const [started, setStarted] = useState(autoStart)
  const [stageIndex, setStageIndex] = useState(0)
  const [stageProgress, setStageProgress] = useState(0)
  const [detectionCount, setDetectionCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  const timersRef = useRef([])

  onCompleteRef.current = onComplete

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const start = useCallback(() => {
    clearTimers()
    setStarted(true)
    setStageIndex(0)
    setStageProgress(0)
    setDetectionCount(0)
  }, [clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setStarted(false)
    setStageIndex(0)
    setStageProgress(0)
    setDetectionCount(0)
  }, [clearTimers])

  useEffect(() => {
    if (!started) return undefined

    clearTimers()

    const [label, duration] = PROCESSING_STAGES[stageIndex]
    const tickMs = 80
    const steps = Math.max(1, Math.floor(duration / tickMs))
    let step = 0

    const tick = () => {
      step += 1
      setStageProgress(Math.min(100, (step / steps) * 100))

      if (label === 'AI Inference' && Math.random() > 0.55) {
        setDetectionCount((n) => n + 1)
      }

      if (step >= steps) {
        if (stageIndex >= PROCESSING_STAGES.length - 1) {
          setStageProgress(100)
          onCompleteRef.current?.()
          return
        }
        setStageIndex((i) => i + 1)
        setStageProgress(0)
        return
      }

      timersRef.current.push(setTimeout(tick, tickMs))
    }

    timersRef.current.push(setTimeout(tick, tickMs))

    return clearTimers
  }, [started, stageIndex, clearTimers])

  const totalWeight = PROCESSING_STAGES.reduce((sum, [, ms]) => sum + ms, 0)
  const completedWeight = PROCESSING_STAGES.slice(0, stageIndex).reduce(
    (sum, [, ms]) => sum + ms,
    0,
  )
  const currentDuration = PROCESSING_STAGES[stageIndex][1]
  const progressPct = Math.min(
    100,
    ((completedWeight + (stageProgress / 100) * currentDuration) / totalWeight) * 100,
  )

  const currentStage = PROCESSING_STAGES[stageIndex][0]
  const isDone = started && currentStage === 'Completed' && progressPct >= 99.5

  return {
    started,
    currentStage,
    stageIndex,
    stages: PROCESSING_STAGES.map(([name]) => name),
    progressPct,
    detectionCount,
    isDone,
    start,
    reset,
  }
}
