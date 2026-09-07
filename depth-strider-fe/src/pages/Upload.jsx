import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import UploadDropzone from '../components/upload/UploadDropzone'
import ProcessingStages from '../components/upload/ProcessingStages'
import { useProcessingSimulation } from '../hooks/useProcessingSimulation'
import {
  finalizeUploadProcessing,
  UPLOAD_SURVEY_ID,
} from '../services/api/processing'

export default function Upload() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [fileName, setFileName] = useState('')
  const finalizingRef = useRef(false)

  const simulation = useProcessingSimulation({
    onComplete: () => {
      // handled in effect when isDone flips — avoids double navigate from StrictMode
    },
  })

  useEffect(() => {
    if (!simulation.isDone || finalizingRef.current) return undefined

    finalizingRef.current = true
    let cancelled = false

    ;(async () => {
      await finalizeUploadProcessing(UPLOAD_SURVEY_ID)
      await queryClient.invalidateQueries({ queryKey: ['surveys'] })
      await queryClient.invalidateQueries({ queryKey: ['detections'] })
      if (!cancelled) {
        navigate(`/surveys/${UPLOAD_SURVEY_ID}`, { replace: true })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [simulation.isDone, navigate, queryClient])

  function handleFileSelected(file) {
    setFileName(file.name)
    finalizingRef.current = false
    simulation.start()
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col gap-4 overflow-y-auto">
      <div>
        <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
          Ingest Pipeline
        </p>
        <h1 className="text-xl font-semibold text-white">Upload Sonar Data</h1>
        <p className="mt-1 text-sm text-slate-400">
          Drop a file to run the full ingest → preprocess → YOLO → U-Net → geo
          validation demo.
        </p>
      </div>

      {!simulation.started ? (
        <UploadDropzone onFileSelected={handleFileSelected} />
      ) : (
        <ProcessingStages
          fileName={fileName}
          currentStage={simulation.currentStage}
          stages={simulation.stages}
          progressPct={simulation.progressPct}
          detectionCount={simulation.detectionCount}
          isDone={simulation.isDone}
        />
      )}

      {simulation.started && !simulation.isDone && (
        <p className="text-center text-xs text-slate-500">
          Simulated pipeline — file contents are not read. Survey{' '}
          <span className="font-mono text-slate-400">{UPLOAD_SURVEY_ID}</span>
        </p>
      )}

      {simulation.isDone && (
        <p className="text-center text-sm text-ok">
          Complete — opening survey results…
        </p>
      )}
    </div>
  )
}
