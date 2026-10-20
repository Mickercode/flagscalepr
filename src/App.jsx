import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import JournalPage from './pages/JournalPage'
import ArticlePage from './pages/ArticlePage'
import NotFoundPage from './pages/NotFoundPage'
import { articles } from './data/articles'

const SITE = 'Flagscale PR'
const TAGLINE = 'People · Passion · Professionalism'

function resolve(path) {
  if (path === '/') {
    return {
      view: <HomePage />,
      title: `${SITE} | ${TAGLINE}`,
      description:
        'Data-driven, people-centric PR solutions for African SMEs across Anglophone and Francophone Africa.',
    }
  }
  if (path === '/about') {
    return {
      view: <AboutPage />,
      title: `About | ${SITE}`,
      description:
        'Flagscale PR helps African businesses build visibility, strengthen reputation, and create meaningful relationships.',
    }
  }
  if (path === '/services') {
    return {
      view: <ServicesPage />,
      title: `Services | ${SITE}`,
      description:
        'Eight core PR services for African SMEs: media relations, content, social, crisis, events, influencer, brand and corporate communications.',
    }
  }
  if (path === '/contact') {
    return {
      view: <ContactPage />,
      title: `Contact | ${SITE}`,
      description:
        'Start a conversation with Flagscale PR. Partners respond within 24 hours from Lagos, London, Nairobi and Accra.',
    }
  }
  if (path === '/journal') {
    return {
      view: <JournalPage />,
      title: `The Journal | ${SITE}`,
      description:
        'Perspectives on business, entrepreneurship, public relations and the people shaping Africa’s commercial future.',
    }
  }
  if (path.startsWith('/journal/')) {
    const slug = path.replace(/^\/journal\//, '')
    const article = articles.find((a) => a.slug === slug)
    return {
      view: <ArticlePage slug={slug} />,
      title: article ? `${article.title} | The Journal` : `Story Not Found | ${SITE}`,
      description: article ? article.summary : 'This story could not be found.',
    }
  }
  return {
    view: <NotFoundPage />,
    title: `Page Not Found | ${SITE}`,
    description: 'The page you are looking for does not exist.',
  }
}

const readPath = () => window.location.pathname.replace(/\/$/, '') || '/'

export default function App() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const handlePopState = () => setPath(readPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const { view, title, description } = resolve(path)

  // Each route needs its own title/description: shared links, browser history
  // and screen-reader page announcements all read from these.
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description])

  // After a client-side route change, focus must move to the new main region
  // or keyboard and screen-reader users stay anchored to the old page.
  useEffect(() => {
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [path])

  return view
}
