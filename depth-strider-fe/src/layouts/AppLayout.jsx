import { Outlet, NavLink } from 'react-router-dom'
import { useMemo } from 'react'
import AlertBanner from '../components/dashboard/AlertBanner'
import { useDetections } from '../hooks/useDetections'

const navLinkClass = ({ isActive }) =>
  `block rounded px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-cyan/10 text-cyan'
      : 'text-slate-300 hover:bg-border hover:text-white'
  }`

function SonarNavLink() {
  const { data: detections = [] } = useDetections()
  const targetId = useMemo(() => {
    const review = detections
      .filter((d) => d.status === 'needs_review')
      .sort((a, b) => b.confidence - a.confidence)[0]
    return review?.id ?? detections[0]?.id ?? 'DS-001'
  }, [detections])

  return (
    <NavLink to={`/sonar/${targetId}`} className={navLinkClass}>
      Sonar
    </NavLink>
  )
}

function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-panel p-4">
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.25em] text-cyan uppercase">
          SIH 2026
        </p>
        <h2 className="text-lg font-semibold leading-tight text-white">
          Depth Strider
        </h2>
        <p className="mt-1 text-[11px] text-slate-500">
          Marine Debris Intelligence
        </p>
      </div>

      <nav className="space-y-1">
        <NavLink to="/" end className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/surveys" className={navLinkClass}>
          Surveys
        </NavLink>
        <NavLink to="/upload" className={navLinkClass}>
          Upload
        </NavLink>
        <SonarNavLink />
        <NavLink to="/detections" className={navLinkClass}>
          Detections
        </NavLink>
        <NavLink to="/history" className={navLinkClass}>
          History
        </NavLink>
      </nav>

      <div className="mt-auto rounded border border-border p-4 text-[11px] transition-colors hover:border-cyan/30">
        <div className="mb-1 flex items-center gap-2 text-ok">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
          AUV-07 ONLINE
        </div>
        <p className="text-slate-500">Edge · YOLO · TensorRT</p>
        <p className="mt-1 font-mono text-[10px] text-slate-600">
          Link stable · 12 Mbps
        </p>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-panel px-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-ok" />
        <span className="text-cyan">System Online</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Konkan coastal sector</span>
      </div>
      <span className="text-sm text-slate-300">Operator</span>
    </header>
  )
}

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-abyss text-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <AlertBanner />
        <main className="min-h-0 flex-1 overflow-hidden p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
