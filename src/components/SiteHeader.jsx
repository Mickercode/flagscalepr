import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navigate } from '../utils/navigation'

const LINKS = [
  ['/', 'Work', 'work'],
  ['/services', 'Services', 'services'],
  ['/about', 'About', 'about'],
  ['/journal', 'The Journal', 'journal'],
  ['/contact', 'Contact', 'contact'],
]

export default function SiteHeader({ active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (e, href) => {
    if (href.startsWith('/')) {
      e.preventDefault()
      navigate(href)
      setMenuOpen(false)
    }
  }

  // Escape closes the menu, and the page behind it must not scroll while it is open.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        document.querySelector('.menu-button')?.focus()
      }
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="header">
        <a className="brand" href="/" onClick={(e) => handleNav(e, '/')}>
          <span className="brand-mark">F</span>
          <span>
            <strong>FLAGSCALE PR</strong>
            <small>Lagos · Global Reach</small>
          </span>
        </a>
        <nav
          id="site-nav"
          className={menuOpen ? 'nav open' : 'nav'}
          aria-label="Primary"
        >
          {LINKS.map(([href, label, key]) => (
            <a
              key={href}
              className={active === key ? 'active' : ''}
              aria-current={active === key ? 'page' : undefined}
              href={href}
              onClick={(e) => handleNav(e, href)}
            >
              {label}
            </a>
          ))}
          <a className="nav-cta" href="/contact" onClick={(e) => handleNav(e, '/contact')}>
            Let’s Talk <ArrowRight size={15} />
          </a>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>
    </>
  )
}
