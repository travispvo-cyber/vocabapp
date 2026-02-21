import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import TabBar from './TabBar'
import { cn } from '../../lib/utils'
import type { Theme } from '../../types'

interface LayoutProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Layout({ theme, onToggleTheme }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:fixed md:inset-y-0 md:flex md:flex-col transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'md:w-20' : 'md:w-64'
        )}
      >
        <Sidebar
          theme={theme}
          onToggleTheme={onToggleTheme}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'pb-24 md:pb-8 transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
        )}
      >
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
