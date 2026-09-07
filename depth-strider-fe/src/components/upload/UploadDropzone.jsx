import { useRef, useState } from 'react'

/**
 * @param {{
 *   onFileSelected: (file: File) => void,
 *   disabled?: boolean
 * }} props
 */
export default function UploadDropzone({ onFileSelected, disabled = false }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  function acceptFile(file) {
    if (!file || disabled) return
    onFileSelected(file)
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    acceptFile(file)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
      }}
      onDragEnter={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`group cursor-pointer rounded border border-dashed px-6 py-14 text-center transition-colors ${
        dragging
          ? 'border-cyan bg-cyan/10'
          : 'border-border bg-panel hover:border-cyan/50 hover:bg-border/30'
      } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".xtf,.jsf,.tiff,.tif,.png,.jpg,.jpeg,.svg"
        onChange={(e) => acceptFile(e.target.files?.[0])}
      />
      <p className="text-[11px] tracking-[0.2em] text-cyan uppercase">
        Sonar ingest
      </p>
      <p className="mt-2 text-lg font-medium text-white">
        Drop side-scan sonar file here
      </p>
      <p className="mt-2 text-sm text-slate-400">
        XTF / JSF / TIFF — or any file for the demo pipeline
      </p>
      <p className="mt-4 inline-block rounded border border-border px-3 py-1.5 text-xs text-slate-300 transition-colors group-hover:border-cyan/40 group-hover:text-cyan">
        Browse files
      </p>
    </div>
  )
}
