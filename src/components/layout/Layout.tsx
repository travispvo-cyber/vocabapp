import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TabBar from './TabBar'
import type { Theme } from '../../types'

interface LayoutProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Layout({ theme, onToggleTheme }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar theme={theme} onToggleTheme={onToggleTheme} />
      </aside>

      {/* Main Content */}
      <main className="pb-24 md:pb-8 md:pl-64">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-6 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Tab Bar */}
      <nav className="fixed inset-x-0 bottom-0 md:hidden z-50">
        <TabBar />
      </nav>
    </div>
  )
}
