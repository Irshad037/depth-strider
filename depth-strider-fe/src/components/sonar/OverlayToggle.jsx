/**
 * @param {{
 *   mode: 'raw' | 'processed' | 'overlay',
 *   onChange: (mode: 'raw' | 'processed' | 'overlay') => void,
 *   showSegmentation?: boolean,
 *   onToggleSegmentation?: () => void
 * }} props
 */
export default function OverlayToggle({
  mode,
  onChange,
  showSegmentation = false,
  onToggleSegmentation,
}) {
  const modes = [
    { id: 'raw', label: 'Raw' },
    { id: 'processed', label: 'Processed' },
    { id: 'overlay', label: 'AI Overlay' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded border border-border bg-abyss p-0.5">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === m.id
                ? 'bg-cyan/20 text-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'overlay' && onToggleSegmentation && (
        <button
          type="button"
          onClick={onToggleSegmentation}
          className={`rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
            showSegmentation
              ? 'border-cyan/50 bg-cyan/10 text-cyan'
              : 'border-border text-slate-400 hover:text-white'
          }`}
        >
          U-Net Segmentation
        </button>
      )}
    </div>
  )
}
