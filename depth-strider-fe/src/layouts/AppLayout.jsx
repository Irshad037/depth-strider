import { Outlet, NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-panel border-r border-border p-4">
      <h2 className="text-xl font-bold mb-6">
        Depth Strider
      </h2>

      <nav className="space-y-2">
        <NavLink to="/" className="block px-3 py-2 rounded hover:bg-border">
          Dashboard
        </NavLink>

        <NavLink to="/surveys" className="block px-3 py-2 rounded hover:bg-border">
          Surveys
        </NavLink>

        <NavLink to="/sonar/DS-001" className="block px-3 py-2 rounded hover:bg-border">
          Sonar
        </NavLink>

        <NavLink to="/detections" className="block px-3 py-2 rounded hover:bg-border">
          Detections
        </NavLink>

        <NavLink to="/history" className="block px-3 py-2 rounded hover:bg-border">
          History
        </NavLink>
      </nav>
    </aside>
  )
}


function Topbar() {
  return (
    <header className="h-12 bg-panel border-b border-border flex items-center justify-between px-4">
      <span className="text-sm text-cyan">
        System Status: Online
      </span>

      <span className="text-sm">
        User: Operator
      </span>
    </header>
  )
}


export default function AppLayout() {
  return (
    <div className="flex h-screen bg-abyss text-white">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Topbar />

        <main className="flex-1 overflow-y-auto bg-abyss p-6">
          <Outlet />
        </main>

      </div>

    </div>
  )
}