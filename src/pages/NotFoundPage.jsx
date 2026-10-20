import { ArrowLeft, ArrowRight } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'
import { navigate } from '../utils/navigation'

export default function NotFoundPage() {
  return (
    <div className="site">
      <SiteHeader />
      <main className="not-found-main container" id="main" tabIndex={-1}>
        <SectionLabel>Error 404</SectionLabel>
        <h1>
          This page has <em>moved on.</em>
        </h1>
        <p className="lead">
          The page you are looking for does not exist, or has been retired from the archive.
          Everything else is still where you left it.
        </p>
        <div className="not-found-actions">
          <a
            className="button dark"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </a>
          <a
            className="arrow-link"
            href="/journal"
            onClick={(e) => {
              e.preventDefault()
              navigate('/journal')
            }}
          >
            Read The Journal <ArrowRight size={16} />
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
