import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Quiz from './pages/Quiz'
import Bookmarks from './pages/Bookmarks'
import Settings from './pages/Settings'
import ConceptDetail from './pages/ConceptDetail'
import Auth from './pages/Auth'
import type { Theme } from './types'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route element={<Layout theme={theme} onToggleTheme={toggleTheme} />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/concept/:id" element={<ConceptDetail />} />
      </Route>
    </Routes>
  )
}

export default App
