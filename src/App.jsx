import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import JournalPage from './pages/JournalPage'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname.replace(/\/$/, '') || '/')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (path === '/about') return <AboutPage />
  if (path === '/services') return <ServicesPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/journal') return <JournalPage />
  if (path.startsWith('/journal/')) {
    const slug = path.replace(/^\/journal\//, '')
    return <ArticlePage slug={slug} />
  }

  return <HomePage />
}
