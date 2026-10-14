import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navigate } from '../utils/navigation'

export default function SiteHeader({ active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  const handleNav = (e, href) => {
    if (href.startsWith('/')) {
      e.preventDefault()
      navigate(href)
      close()
    }
  }

  return (
    <header className="header">
      <a className="brand" href="/" onClick={(e) => handleNav(e, '/')}>
        <span className="brand-mark">F</span>
        <span>
          <strong>FLAGSCALE PR</strong>
          <small>Lagos · Global Reach</small>
        </span>
      </a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <a className={active === 'work' ? 'active' : ''} href="/" onClick={(e) => handleNav(e, '/')}>
          Work
        </a>
        <a className={active === 'services' ? 'active' : ''} href="/services" onClick={(e) => handleNav(e, '/services')}>
          Services
        </a>
        <a className={active === 'about' ? 'active' : ''} href="/about" onClick={(e) => handleNav(e, '/about')}>
          About
        </a>
        <a className={active === 'journal' ? 'active' : ''} href="/journal" onClick={(e) => handleNav(e, '/journal')}>
          The Journal
        </a>
        <a className={active === 'contact' ? 'active' : ''} href="/contact" onClick={(e) => handleNav(e, '/contact')}>
          Contact
        </a>
        <a className="nav-cta" href="/contact" onClick={(e) => handleNav(e, '/contact')}>
          Let's Talk <ArrowRight size={15} />
        </a>
      </nav>
      <button
        className="menu-button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}
