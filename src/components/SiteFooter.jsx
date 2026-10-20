import SectionLabel from './SectionLabel'
import { navigate } from '../utils/navigation'

export default function SiteFooter() {
  const handleNav = (e, href) => {
    if (href.startsWith('/')) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <a href="/" className="footer-brand" onClick={(e) => handleNav(e, '/')}>
            <h3>FLAGSCALE PR</h3>
          </a>
          <p className="footer-subtitle">Public Relations & Strategic Communications</p>
          <p className="footer-tagline">Making African brands impossible to overlook.</p>
          <span className="footer-pill">Serving Anglophone & Francophone Africa.</span>
        </div>
        <div>
          <SectionLabel>EXPLORE</SectionLabel>
          <div className="footer-links">
            <a href="/" onClick={(e) => handleNav(e, '/')}>Work</a>
            <a href="/services" onClick={(e) => handleNav(e, '/services')}>Services</a>
            <a href="/about" onClick={(e) => handleNav(e, '/about')}>About</a>
            <a href="/journal" onClick={(e) => handleNav(e, '/journal')}>The Journal</a>
            <a href="/contact" onClick={(e) => handleNav(e, '/contact')}>Contact</a>
          </div>
        </div>
        <div>
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <div className="footer-contact">
            <a href="mailto:contact@flagscalepr.com">contact@flagscalepr.com</a>
            <a href="tel:+2349057944830">+234 905 794 4830</a>
            <p>Lagos, Nigeria</p>
          </div>
          <div className="footer-social-wrap">
            <SectionLabel>FOLLOW US</SectionLabel>
            <p className="social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a> ·{' '}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a> ·{' '}
              <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </p>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Flagscale PR. All rights reserved.</span>
        <span>
          <a href="#privacy">Privacy Policy</a> · <a href="#terms">Terms of Use</a>
        </span>
      </div>
    </footer>
  )
}
