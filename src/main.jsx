import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Menu, Play, X } from 'lucide-react'
import './styles.css'

const work = [
  { name: 'SEVEN30 REAL ESTATE', tag: 'Real Estate • Nigeria', services: 'Media Relations • Event Communications', copy: 'Strengthening trust around Petra Ville Phase I through a landmark land allocation event and quality-led property storytelling.', image: 'https://cdn.guardian.ng/wp-content/uploads/2024/10/Se.jpg', link: 'https://guardian.ng/joe-komolafe/seven30-strengthens-commitment-to-quality-with-land-allocation-at-petra-ville-phase-i/' },
  { name: 'PETRA VILLE PHASE I', tag: 'Property • Abeokuta', services: 'Launch PR • Stakeholder Communications', copy: 'Introducing Seven30 Real Estate Limited’s Petra Ville Phase I through a momentous land allocation event, helping prospective owners see the value and promise of the development.', image: 'https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/Screenshot_20241027-214310.jpg', link: 'https://www.thisdaylive.com/index.php/2024/10/28/seven30-real-estate-limited-unveils-petra-ville-phase-i-with-momentous-land-allocation-event/' },
]

const capabilities = ['Media Relations', 'Content Creation', 'Social Media Management', 'Crisis Management', 'Event Management', 'Influencer Marketing', 'Brand Building', 'Corporate Communications']

const journalCards = [
  ['CULTURAL DIPLOMACY', 'Culture · 6 Min Read', 'The Soft Power Blueprint: How Creative Economies are Reshaping African Diplomacy', 'From Afrobeats dominating streaming metrics in North America to fashion houses anchoring sovereign goodwill, creative output is the continent’s sharpest diplomatic instrument.', 'BY TUNDE ADEWOLE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUAWCq4k3zl79txg56VrwfryuzaJT8wGPATlrS-TeIFwSzEFfegiXBR32Ts7mjMfaVEUONG_iAP9gBfqnvl9qTQMmeB3EzGWHWMMqDqpXyvUU_m14muBytlIyjKp9RJU_mnnM2InlDdgZ7SlZy09Hq5iZr46OVLer7QIVlsvrFspo7HUXiMO4WfnfkqzSdnzQTXL2DwB5rZul0dV6_po4JfcT57CZxk5gD_hhXBNQ8zJOq5LXkDkm'],
  ['CAPITAL MARKETS', 'Financial PR · 9 Min Read', 'Communicating Valuation in High-Volatility FX Environments', 'How dual-listed African conglomerates balance local currency realities with offshore dollar investor sentiment during institutional earnings reports and sovereign debt revisions.', 'BY NKIRU EZE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF7ZUSCFIKElmMQxN3iQkGwQ5gDFAFD90jNpivmI9h_-74kk1oWIWWbmIZQDAYO4mMiKIMMZa4rMFuCZDlOnm7lIacG19Ki1dz86npfV31NQNcrQHWe4MubLBPOEu7hVvnoEC-mkyPdDIULnaB6RgL9xXUKPtEpfNL24d7eX0tO9BMO1TL8qmOLDVV0WNjV3vk1pqFW6MRgOJ8guePKVFq0ada6tpqZ8Z2G17igsTqY8iRgUckQTZs'],
  ['MEDIA GOVERNANCE', 'Media Trends · 7 Min Read', 'The Changing Relationship Between Brands, Media and Sovereign Influence', 'An architectural breakdown of the new publishing cartels across West and East Africa, and why commercial reliance on sponsored journalism is diminishing corporate leverage.', 'BY KWAME OSEI', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMif-Ae50J_848lmI2A8xwIyR3oQ9zTwjO5A31QfB6qW4Yf3PKiGkF78kS4kh0YlRTDjN3ii3hvDEgMQh6n6yeA8sfUZzul_dcoBKndH98WYNnP8lHT8KvQOJzPmjT8s1Xova0gd_dArbEDguMlZnd8WKibM8UAXrtcl7evWaWofSwfgxJgAk2mkp4S-YRDl8F20c1nKW7hPuYI3pR3IsDX54rMoHde-4FwOqEbTyfmugW8xheTZ1u'],
  ['CRISIS ARCHITECTURE', 'Crisis Protocol · 11 Min Read', 'Managing Cross-Border Crisis Communications in Multi-Regulated Sectors', 'Standard operating procedures for telecoms, extractive energy, and fintech operators confronting synchronized regulatory inquiry across ECOWAS and SADC jurisdictions.', 'BY FOLASHADE ALADE-DAVIES', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeMJcEYMhLKm4Ng5SswlmoobCnOtOyJiBtk7mlrxQnFHnAvaCu_DNnjNHWMRPQppYuERSkrP6HKPpVpMQh42Hx8k1mWL21hMkLw6T00PQ3bhqzSvVNy5qRTlrNKCnd_bGDlfTg76q-8bFKKn-awM3GsKqOs-vAZwL_ZyOhMurpVBo4L0fOTgJhbpK3n7_MQd2v-oiVnCaIZrp95P44irhFFM-CDLTZjN-OmPv2yWhxzVi48E99yoJN'],
  ['EXECUTIVE DOSSIER', 'Leadership · 5 Min Read', 'Executive Stature in the Age of Digital Decentralization', 'Why the most respected African CEOs are systematically pulling back from social vanity engagement to deploy surgical, highly documented policy interventions.', 'BY AMARA DIOP', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Vpf60uaIRE9up3Wa3BXBmnOdnutVca1IGt8mD4yQyj6hF8QGcT1E2IGBJMfgQNAOQrLiSPo_OnUQj_AcyINNcL-hc-wd8q0DMNrvIUt5ukd7MSNqZu9yIREz13uyPyF1skFiE3PBwfVYp91XF1dtWdNLkDWyf1C5h3PerTYUr5p3TDQqQtctGpj_GlP3AGUKWbHpo5pF8Y2ZZSnBgE_my8gV1xNHGL5wWylYpbk9WKvAwWdXrdeI'],
  ['BRAND DURABILITY', 'Consumer PR · 8 Min Read', 'Building African Consumer Giants: The New Rules of Brand Trust', 'How domestic FMCG brands are out-maneuvering Western multinational incumbents through authentic provenance storytelling, supply chain transparency, and community investment.', 'BY BABATUNDE COLE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkwsKRYxAt-TxxjkstxO0vpo12H2wIyZ5Ehy68QmvfkSB6t8tgO52bQXAZJUS3BXqNnI5V8mTwP-GINLbOP1Sx4pMBs_zRTG2QaGlKurqKzYYI8jGbninAGocHEP6O2JpMytAF-Z200g1boUTbNINqCy5DtijbQbf_IZ-dZKaewJcJDrNl_ghOLomi54tf0GKDjegE00hGHpB1khpOWXWJKmQwSlSkYBTt2FzrTZxZ-eo_B97U0fkt'],
]

function SectionLabel({ children }) { return <span className="section-label">{children}</span> }
function LinkArrow({ children, dark = false, href = '#contact' }) { return <a className={`arrow-link ${dark ? 'arrow-link-dark' : ''}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{children}<ArrowRight size={16} /></a> }

function navigate(href) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (href.startsWith('#')) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.href = href
  }
}

function SiteHeader({ active = '' }) {
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
        <span><strong>FLAGSCALE PR</strong><small>Lagos · Global Reach</small></span>
      </a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <a className={active === 'work' ? 'active' : ''} href="/" onClick={(e) => handleNav(e, '/')}>Work</a>
        <a className={active === 'services' ? 'active' : ''} href="/services" onClick={(e) => handleNav(e, '/services')}>Services</a>
        <a className={active === 'about' ? 'active' : ''} href="/about" onClick={(e) => handleNav(e, '/about')}>About</a>
        <a className={active === 'journal' ? 'active' : ''} href="/journal" onClick={(e) => handleNav(e, '/journal')}>The Journal</a>
        <a className={active === 'contact' ? 'active' : ''} href="/contact" onClick={(e) => handleNav(e, '/contact')}>Contact</a>
        <a className="nav-cta" href="/contact" onClick={(e) => handleNav(e, '/contact')}>
          Let's Talk <ArrowRight size={15} />
        </a>
      </nav>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function SiteFooter() {
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
        <span>© 2026 Flagscale PR. All rights reserved.</span>
        <span>
          <a href="#privacy">Privacy Policy</a> · <a href="#terms">Terms of Use</a>
        </span>
      </div>
    </footer>
  )
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname.replace(/\/$/, '') || '/')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (path === '/journal') return <JournalPage />
  if (path === '/services') return <ServicesPage />
  if (path === '/about') return <AboutPage />
  if (path === '/contact') return <ContactPage />

  return (
    <div className="site">
      <SiteHeader active="work" />
      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <SectionLabel>Public Relations for African SMEs</SectionLabel>
            <h1>Empower your brand’s voice. <em>Shine and thrive.</em></h1>
            <p className="lead">Data-driven, people-centric PR solutions helping African SMEs turn visibility into revenue, partnerships, and long-term contracts across Anglophone and Francophone Africa.</p>
            <div className="hero-buttons">
              <a className="button dark" href="#work">Explore Our Work <ArrowRight size={16} /></a>
              <a className="play-button" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                <span><ArrowRight size={13} /></span> Start a Conversation
              </a>
            </div>
            <div className="stats">
              <div><strong>8</strong><span>Core Services</span></div>
              <div><strong>2</strong><span>Verified Placements</span></div>
              <div><strong>1</strong><span>Owned Media Studio</span></div>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://lh3.googleusercontent.com/aida/AEtjO1VJsfwiB0PQp6g5W9a7Jy915h5juGkW5PR5596dfc9NYLJ53hNHYd2DYWzL4nndJCHzvklTzEsAd3Mh5D030kFxtf11QPH_Ims9l8-A3NGEmYbRbPgYSJfjuqz2qoT-z77OWl3djiRMbFg8D9rkdbsjw5NqeIcFQ4sb9rjoo8mn1WdvBXQirAUVKa20Nfl4MsWlDdZ-q6ZzkVs3O9LH4YBBdOxNHA6jwiJmqHpZHsdCxArkdvkgaio4FtRM" alt="African communications professional" />
            <div className="dossier"><b>People · Passion</b><span>Professionalism</span></div>
            <div className="image-caption"><span><b>Serving</b><strong>Anglophone / Francophone Africa</strong></span><small>FSPR · 2025</small></div>
          </div>
        </section>
        <section className="brand-strip"><div className="container strip-inner"><SectionLabel>Building with African Businesses</SectionLabel><div className="brand-types"><span>Startups</span><i>•</i><span>SMEs</span><i>•</i><span>Corporate Brands</span><i>•</i><span>Founders</span><i>•</i><span>Institutions</span></div></div></section>
        <section className="client-strip"><div className="container client-strip-inner"><SectionLabel>Clients We’ve Worked With</SectionLabel><div><a href="https://guardian.ng/joe-komolafe/seven30-strengthens-commitment-to-quality-with-land-allocation-at-petra-ville-phase-i/" target="_blank" rel="noreferrer">Seven30 Real Estate Limited</a><i>•</i><a href="https://www.thisdaylive.com/index.php/2024/10/28/seven30-real-estate-limited-unveils-petra-ville-phase-i-with-momentous-land-allocation-event/" target="_blank" rel="noreferrer">Petra Ville Phase I</a><i>•</i><span>2MoroTrip</span><i>•</i><span>AISEC</span><i>•</i><span>Gluke</span><i>•</i><span>Higher Education with Liberty and Progress</span></div></div></section>
        <section className="thesis container"><div className="number-label">01 / The Thesis</div><div><h2>People first. <br /><em>Business success follows.</em></h2><p className="lead">We take time to understand your business, values, goals, and target audience, then build communications that earn trust and create opportunity.</p></div></section>
        <section className="work container" id="work"><div className="section-heading"><div><SectionLabel>02 / Curated Portfolio</SectionLabel><h2>Selected Work</h2></div><p>Dispatches across Lagos, London, Nairobi & New York</p></div><div className="work-grid">{work.map((item, i) => <article className={`work-card work-${i}`} key={item.name}><div className="work-photo"><img src={item.image} alt={item.name} /><span>{item.tag}</span></div><div className="work-body"><SectionLabel>{item.services}</SectionLabel><h3>{item.name}</h3><p>{item.copy}</p><LinkArrow href={item.link}>View Case Study</LinkArrow></div></article>)}</div></section>
        <section className="capabilities" id="capabilities"><div className="container capabilities-inner"><div><SectionLabel>03 / Capabilities</SectionLabel><h2>We build<br /><em>reputation.</em></h2></div><div className="capability-content"><div className="capability-tags">{capabilities.map((item, i) => <span className={i === 1 ? 'selected' : i === 4 ? 'accent' : ''} key={item}>{item}</span>)}</div><LinkArrow href="/services">View Services</LinkArrow></div></div></section>
        <section className="mandate"><div className="container mandate-inner"><div><SectionLabel>04 / Pan-African Mandate</SectionLabel><h2>Africa is our market.</h2><p>From Lagos to Accra, Nairobi to Johannesburg, Flagscale helps ambitious businesses communicate across markets, cultures and communities. Serving Anglophone & Francophone Africa.</p></div><div className="coverage"><small>Primary Regional Coverage</small>{[['Nigeria', 'West Hub • Lagos'], ['Ghana', 'Accra Node'], ['Kenya', 'East Hub • Nairobi'], ['South Africa', 'Johannesburg • Cape Town'], ['Francophone Africa', 'Abidjan • Dakar • Douala']].map(([a, b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></div></section>
        <section className="approach container" id="about"><div className="section-heading"><div><SectionLabel>05 / Philosophy</SectionLabel><h2>People. Passion. Professionalism.</h2></div></div><div className="pillars">{[['01', 'People', 'We understand the people behind every market, message and relationship. Authentic connection precedes impactful conversion.', 'Cultural Intelligence'], ['02', 'Passion', 'We find the stories worth telling and make people care about them. We treat African enterprise with the global narrative reverence it commands.', 'Narrative Mastery'], ['03', 'Professionalism', 'We combine strategic thinking, strong relationships and disciplined execution. Rigor in governance, diplomacy in corporate positioning.', 'Strategic Rigor']].map(([n, t, copy, foot]) => <article key={n}><strong className="pillar-number">{n}</strong><h3>{t}</h3><p>{copy}</p><small>{foot}</small></article>)}</div></section>
        <section className="journal" id="journal"><div className="container"><div className="section-heading"><div><SectionLabel>06 / Editorial Dispatch</SectionLabel><h2>The Flagscale Journal</h2></div><p className="journal-intro">Ideas shaping business, communication and culture across Africa.</p></div><div className="journal-grid">{[['The Journal', '08 Min Read', 'Why African businesses need to think beyond visibility', 'Read Story'], ['The Podcast', 'Episode 24', 'Conversations with the people building Africa', 'Listen Now'], ['Insights', 'Quarterly Brief', 'The changing relationship between brands, media and influence', 'Read Insight']].map(([tag, time, title, action], i) => <article key={title}><div><div className="journal-meta"><b className={i === 1 ? 'gold' : ''}>{tag}</b><span>{time}</span></div><h3>{title}</h3><p>{i === 0 ? 'Moving past vanity metrics toward institutional durability and real regulatory authority in expanding consumer economies.' : i === 1 ? 'Unfiltered dialogues with unicorn founders, sovereign fund managers, and cultural curators reshaping continental infrastructure.' : 'How decentralized media houses and creator economies are challenging traditional legacy public relations across West Africa.'}</p></div><LinkArrow href="/journal">{action}</LinkArrow></article>)}</div><div className="studio"><div><SectionLabel>Studio Production</SectionLabel><h3>Flagscale Studio — Victoria Island</h3><p>A dedicated production space for podcasts, broadcast interviews, executive thought leadership, and high-fidelity brand storytelling in the heart of Lagos.</p></div><a className="button gold-button" href="mailto:contact@flagscalepr.com">Book Studio Session <ArrowRight size={16} /></a></div></div></section>
        <section className="contact container" id="contact"><SectionLabel>07 / Call to Authority</SectionLabel><h2>Be seen.<br /><em>Be trusted.</em><br />Be remembered.</h2><p className="lead">Flagscale PR — Public Relations & Strategic Communications</p><small>Serving Anglophone & Francophone Africa</small><a className="button dark" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Start a Conversation <ArrowRight size={16} /></a></section>
      </main>
      <SiteFooter />
    </div>
  )
}

function ServicesPage() {
  const divisions = [
    ['01', 'Media Relations', 'We build relationships with journalists and media networks to secure credible coverage for your products, services, and events.', 'Earned Visibility', '▤'],
    ['02', 'Content Creation', 'Compelling entrepreneurial stories, social content, and owned-media narratives that help African SMEs stand out from competitors.', 'Stories with Purpose', '◇'],
    ['03', 'Social Media Management', 'People-centred content planning and community engagement that turns attention into meaningful customer and partner relationships.', 'Audience Connection', '◎'],
    ['04', 'Crisis Management', 'Clear, timely communication and stakeholder guidance to protect trust, maintain a positive image, and respond to uncertainty.', 'Reputation Care', '⚠'],
    ['05', 'Event Management', 'Strategic events and experiences that create opportunities for coverage, connection, partnerships, and long-term contracts.', 'Experiences that Open Doors', '✦'],
    ['06', 'Influencer Marketing', 'Trusted African creators and cultural voices aligned with your audience, values, and business goals.', 'Cultural Relevance', '♧'],
    ['07', 'Brand Building', 'Positioning, messaging, and consistent communications that establish trust and make your business memorable.', 'Brand Confidence', '◌'],
    ['08', 'Corporate Communications', 'Tailored communications for customers, employees, partners, investors, and stakeholders across dynamic markets.', 'Stakeholder Alignment', '▣'],
  ]
  const phases = [
    ['Phase 01', 'DISCOVER', 'Understand the Business', 'We learn your business, audience, values, goals, market context, and the opportunities standing between visibility and growth.', 'Audience & Brand Brief'],
    ['Phase 02', 'DEFINE', 'Shape the Story', 'We turn your expertise and entrepreneurial journey into clear messaging, content themes, media angles, and partnership narratives.', 'Strategic Communications Plan'],
    ['Phase 03', 'DEPLOY', 'Activate the Channels', 'We coordinate media relations, content, social platforms, events, influencers, and corporate communications around your priorities.', 'Campaign & Content Calendar'],
    ['Phase 04', 'GROW', 'Measure & Strengthen', 'We review what is resonating, refine the message, nurture relationships, and build a repeatable communications system for growth.', 'Progress & Opportunity Review'],
  ]
  return (
    <div className="site services-page">
      <SiteHeader active="services" />
      <main className="services-main">
        <section className="services-intro container">
          <div className="service-meta"><SectionLabel>01 / Services for African SMEs</SectionLabel><span>ANGLOPHONE • FRANCOPHONE AFRICA &nbsp; • &nbsp; PEOPLE-CENTRIC PR</span></div>
          <div className="services-hero-grid">
            <h1>Make Your Brand’s Voice <em>Count.</em></h1>
            <div>
              <p>Data-driven, tailored communications for African SMEs working toward business success and an accelerated AfCFTA progression.</p>
              <div className="protocol"><small>Our promise:</small><b>People · Passion · Professionalism</b></div>
            </div>
          </div>
          <div className="metrics">{[['8', 'Core PR Services', 'From media relations to corporate communications'], ['SMEs', 'Our Focus', 'Practical communications built around your stage of growth'], ['2', 'Language Corridors', 'Anglophone and Francophone African markets'], ['1', 'Owned Media Studio', 'Podcast, post-production, and executive thought leadership']].map(([value, label, copy]) => <div key={label}><strong>{value}</strong><b>{label}</b><p>{copy}</p></div>)}</div>
        </section>
        <section className="divisions">
          <div className="container">
            <div className="service-section-heading"><div><SectionLabel>02 / Structural Practice Groups</SectionLabel><h2>The Eight Sovereign Divisions</h2></div><p>Modular, highly specialized bureaus designed to deploy independently or assemble as a cohesive global communications vanguard.</p></div>
            <div className="division-grid">{divisions.map(([num, title, copy, foot, icon]) => <article className={num === '08' ? 'division-card crisis' : 'division-card'} key={num}><div><div className="division-top"><strong>{num}</strong><span>{icon}</span></div><h3>{title}</h3><p>{copy}</p></div><footer><small>{foot}</small><b>→</b></footer></article>)}</div>
          </div>
        </section>
        <section className="studio-showcase container">
          <div className="studio-image"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCEWwr0cnv_7Xk7nwYpde-Z-a7myUZva7Caw4_FzTwA2jbuH_cIlO3xWBi5MXXwYoCINMAxlwypyN937nI4NU-2B4wrmf6YYztDy6oE8kmAouyW3KaMSKPaBXsb-txCbZJAwM69383HisEJmKniaIXG5zo-on0C6hdi9s-RJfQaUMdARPbYieTQR_8ce6YqRGnjeXamFRP3g1pSIXZjTX5PVCqqFYvLblzuKd6ox1ERx73gI4n5tv8" alt="Broadcast studio control room in Lagos" /><span>Victoria Island, Lagos • Studio 01</span></div>
          <div className="studio-copy">
            <SectionLabel>Broadcast Infrastructure</SectionLabel>
            <h2>The Flagscale Studio</h2>
            <p>Our purpose-engineered Victoria Island production facility provides institutional leaders with an acoustic sanctuary for high-fidelity fireside interviews, broadcast syndication, and sovereign thought leadership.</p>
            <div className="studio-specs">{[['4K Cinema Suite', 'Multi-angle cinema camera array with Zeiss primes'], ['Acoustic Vault', 'Zero-bleed decibel-rated architectural dampening'], ['Fiber Uplink Stream', 'Dedicated gigabit pipe for live BBC, Bloomberg, CNN link-up'], ['VIP Greenroom', 'Private executive suite with concierge hospitality']].map(([title, copy]) => <div key={title}><b>◉ &nbsp; {title}</b><p>{copy}</p></div>)}</div>
            <a className="arrow-link" href="mailto:contact@flagscalepr.com">Book Studio Walkthrough & Technical Specs <ArrowRight size={16} /></a>
          </div>
        </section>
        <section className="framework">
          <div className="container">
            <div className="service-section-heading"><div><SectionLabel>03 / Methodological Precision</SectionLabel><h2>Strategic Engagement Framework</h2></div><span>4-STAGE PRECISION MANDATE</span></div>
            <div className="phase-grid">{phases.map(([phase, time, title, copy, deliverable]) => <article key={phase}><div><div className="phase-meta"><b>{phase}</b><small>{time}</small></div><h3>{title}</h3><p>{copy}</p></div><footer><small>Deliverable</small><b>{deliverable}</b></footer></article>)}</div>
          </div>
        </section>
        <section className="mandate-cta container">
          <div>
            <SectionLabel>Bilateral Representation</SectionLabel>
            <h2>Ready to Shape Your Legacy?</h2>
            <p>Our strategic advisory engagements are reserved for institutions, sovereign leaders, and founders seeking transformative, long-term cultural stature and global resonance.</p>
          </div>
          <div>
            <a className="button gold-button" href="mailto:contact@flagscalepr.com">Initiate Strategic Mandate →</a>
            <small>Confidential partner briefing scheduled within 24h</small>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function AboutPage() {
  return (
    <div className="site about-page">
      <SiteHeader active="about" />

      <main className="about-main">
        {/* HERO SECTION */}
        <section className="about-hero container">
          <div className="about-hero-top">
            <SectionLabel>ABOUT FLAGSCALE</SectionLabel>
            <span className="corridor-badge">Serving Anglophone & Francophone Africa.</span>
          </div>

          <div className="about-hero-grid">
            <div className="about-hero-copy">
              <h1>We believe African businesses deserve to be seen.</h1>
              <p className="lead">
                Flagscale PR is a public relations and strategic communications agency helping African businesses build visibility, strengthen their reputations, and create meaningful relationships.
              </p>
              <p className="about-hero-sub">
                We combine strategic thinking, compelling storytelling, media relations, and digital communication to help businesses communicate with purpose.
              </p>
              <div className="about-hero-actions">
                <a className="button dark" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                  Let's Talk <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="about-hero-visual">
              <div className="about-hero-image-wrap">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmC70-u_4xNKZAYXi-2LXlLrbX2hUgl3eFxDaaNjnBEv7wMKV-3hDDi57tmG-8Vj5UD--H5A5SFQItnB5Rrb3WsxkIUIsg47TOyiPXYgvqFo3Mhsy7oNIRf-JWjL3eN0qn_uLL3m-OT1Qfwm86HHOEil3PeiLiXUPlwczxZTnPgOAXpcSQTr9dCGD7F9SBCKCFQ3sPUim-RzeKlvaYS-nFkUw6l_CkSHNA6bGtp7wBXJMoi5a6Fntz"
                  alt="Flagscale PR strategic communications"
                />
                <div className="about-hero-badge">
                  <b>People · Passion</b>
                  <span>Professionalism</span>
                </div>
                <div className="about-hero-caption">
                  <span>Strategic Communications</span>
                  <strong>African Business Stature</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: OUR BELIEF */}
        <section className="about-belief">
          <div className="container">
            <div className="belief-grid">
              <div className="belief-headline-col">
                <SectionLabel>02 / OUR BELIEF</SectionLabel>
                <h2>Visibility is valuable. <em>Trust is essential.</em></h2>
                <div className="belief-callout">
                  <span className="callout-label">Core Philosophy</span>
                  <p>“Getting attention is one thing. Giving people a reason to trust your business is another.”</p>
                </div>
              </div>

              <div className="belief-body-col">
                <p className="lead-belief">
                  We believe effective public relations begins with understanding the business behind the brand: its ambitions, its audience, its market, and the value it brings.
                </p>
                <p>
                  That understanding shapes the stories we tell, the relationships we pursue, and the communication strategies we develop.
                </p>
                <div className="belief-milestone">
                  <div className="milestone-badge">Our Goal</div>
                  <p>
                    To help businesses move beyond being noticed to being <strong>understood</strong>, <strong>trusted</strong>, and <strong>considered</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: OUR PERSPECTIVE */}
        <section className="about-perspective container">
          <div className="perspective-header">
            <SectionLabel>03 / OUR PERSPECTIVE</SectionLabel>
            <h2>Africa is our context. <em>Opportunity is our focus.</em></h2>
          </div>

          <div className="perspective-grid">
            <div className="perspective-card primary">
              <span className="perspective-num">01 / PAN-AFRICAN SCALE</span>
              <h3>Cross-Border Growth</h3>
              <p>African businesses are building across industries, communities, and national borders.</p>
              <p>As markets become more connected, businesses need communication that respects local differences while supporting wider ambitions.</p>
            </div>

            <div className="perspective-card highlight">
              <span className="perspective-num">02 / DUAL CORRIDOR</span>
              <h3>Anglophone & Francophone</h3>
              <p>Flagscale is developing an Africa-facing PR practice focused on Anglophone and Francophone markets.</p>
              <div className="corridor-tags">
                <span>Anglophone Africa</span>
                <span>Francophone Africa</span>
              </div>
            </div>

            <div className="perspective-card">
              <span className="perspective-num">03 / CONTINENTAL INTEGRATION</span>
              <h3>Strategic Infrastructure</h3>
              <p>We see strategic communications as part of the infrastructure that helps businesses build credibility, form partnerships, and pursue growth.</p>
              <p className="perspective-sub">
                Our long-term ambition aligns with a more connected African economy and the opportunities represented by the African Continental Free Trade Area.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 04: OUR VALUES */}
        <section className="about-values">
          <div className="container">
            <div className="values-header">
              <div>
                <SectionLabel>04 / OUR VALUES</SectionLabel>
                <h2>The Values Behind Every Mandate.</h2>
              </div>
              <p>People · Passion · Professionalism</p>
            </div>

            <div className="values-grid">
              <article className="value-card">
                <div className="value-top">
                  <strong className="value-number">01</strong>
                  <span className="value-tag">Human-Centred</span>
                </div>
                <h3>PEOPLE</h3>
                <p className="value-statement">We put people at the centre of communication.</p>
                <p className="value-desc">
                  We seek to understand audiences, respect different perspectives, and build relationships that matter. Every effective communication strategy begins with knowing who you want to reach and what matters to them.
                </p>
              </article>

              <article className="value-card">
                <div className="value-top">
                  <strong className="value-number">02</strong>
                  <span className="value-tag">Narrative Mastery</span>
                </div>
                <h3>PASSION</h3>
                <p className="value-statement">We care about the stories behind businesses and the opportunities those stories can unlock.</p>
                <p className="value-desc">
                  We approach each engagement with curiosity, commitment, and a desire to help businesses communicate what makes them distinctive.
                </p>
              </article>

              <article className="value-card">
                <div className="value-top">
                  <strong className="value-number">03</strong>
                  <span className="value-tag">Strategic Discipline</span>
                </div>
                <h3>PROFESSIONALISM</h3>
                <p className="value-statement">We approach every engagement with strategic discipline, thoughtful execution, clear communication, and respect for our clients' reputations.</p>
                <p className="value-desc">
                  We believe good work requires more than compelling ideas. It requires consistency, accountability, and attention to detail.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECTION 05: OUR APPROACH */}
        <section className="about-approach container">
          <div className="approach-header">
            <div>
              <SectionLabel>05 / OUR APPROACH</SectionLabel>
              <h2>Understand before you communicate.</h2>
            </div>
            <p className="approach-lead">
              We take time to understand your business, the people you need to reach, and the outcomes you want to achieve.
            </p>
          </div>

          <div className="approach-steps-grid">
            {[
              {
                step: '01',
                name: 'UNDERSTAND',
                copy: 'We examine your business, audience, market, objectives, and communication challenges.',
                badge: 'Stage 01'
              },
              {
                step: '02',
                name: 'POSITION',
                copy: 'We identify the messages, stories, and ideas that best communicate your value.',
                badge: 'Stage 02'
              },
              {
                step: '03',
                name: 'CREATE',
                copy: 'We develop the content, campaigns, and communication materials needed to bring your positioning to life.',
                badge: 'Stage 03'
              },
              {
                step: '04',
                name: 'CONNECT',
                copy: 'We help your business engage relevant media, audiences, and stakeholders through appropriate channels.',
                badge: 'Stage 04'
              },
              {
                step: '05',
                name: 'EVALUATE',
                copy: 'We assess progress against agreed objectives and identify opportunities to improve the effectiveness of your communication.',
                badge: 'Stage 05'
              },
            ].map(item => (
              <div className="approach-step-card" key={item.step}>
                <div className="step-top">
                  <span className="step-num">{item.step}</span>
                  <small>{item.badge}</small>
                </div>
                <h3>{item.name}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="approach-adaptive-box">
            <span className="adaptive-icon">◈</span>
            <p>
              <strong>Every business is different.</strong> Our approach adapts to the challenge, rather than forcing every client into the same strategy.
            </p>
          </div>
        </section>

        {/* SECTION 06: OUR AMBITION */}
        <section className="about-ambition">
          <div className="container">
            <div className="ambition-grid">
              <div className="ambition-copy">
                <SectionLabel>06 / OUR AMBITION</SectionLabel>
                <h2>Helping African businesses move forward.</h2>
                <p className="lead">
                  We want to contribute to an environment where African businesses are easier to discover, understand, trust, and partner with.
                </p>
                <p>
                  As businesses pursue opportunities beyond their immediate markets, effective communication becomes increasingly important in establishing credibility and building relationships across borders.
                </p>
                <p>
                  Through strategic public relations, meaningful connections, and compelling storytelling, Flagscale aims to help ambitious businesses strengthen their positions in their markets and pursue new opportunities.
                </p>
              </div>

              <div className="ambition-quote-card">
                <SectionLabel>Core Conviction</SectionLabel>
                <blockquote>
                  “We believe Africa's business stories deserve to travel further.”
                </blockquote>
                <div className="quote-footer">
                  <b>FLAGSCALE PR</b>
                  <span>Public Relations & Strategic Communications</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 07: CLOSING CTA */}
        <section className="about-closing-cta container">
          <div className="closing-cta-card">
            <SectionLabel>07 / CLOSING CTA</SectionLabel>
            <h2>Let’s tell your story well.</h2>
            <p className="lead">
              Have a business, an idea, or an opportunity you want the right people to know about?
            </p>
            <p className="closing-sub">
              Let's explore how strategic communication can help you move forward.
            </p>
            <div className="closing-btn-wrap">
              <a className="button dark" href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                Start a Conversation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [tags, setTags] = useState([])
  const [faq, setFaq] = useState(null)
  const tagOptions = ['Immediate M&A Announcement', 'Capital Raise Disclosure', 'State Visit / Bilateral Forum', 'Visual Campaign / Fashion Week']
  const faqs = [
    ['How does Flagscale PR approach initial mandate onboarding?', 'Every prospective client undergoes a 72-hour reputational and strategic audit before contract formalization. Once cleared, an onboarding partner and dedicated strategic team are assigned within 48 hours.'],
    ['What confidentiality and non-disclosure standards apply?', 'All introductory discussions, preliminary dossier evaluations, and crisis scenarios are executed under strict multilateral NDAs governed by Nigerian and UK corporate jurisprudence.'],
    ['What is the retainer framework and campaign duration structure?', 'Flagscale PR operates primarily on 6-month or 12-month sovereign and enterprise strategic retainers, with rapid-deployment strike teams available for specialized mandates.'],
  ]
  return (
    <div className="site contact-page">
      <SiteHeader active="contact" />
      <main className="contact-main">
        <div className="status-ticker">
          <span>● &nbsp; DISPATCH STATUS: ACTIVE DESKS OPEN</span>
          <span className="ticker-cities">LAGOS 14:20 WAT &nbsp; • &nbsp; LONDON 13:20 GMT &nbsp; • &nbsp; NAIROBI 16:20 EAT</span>
          <b>REF: FGS-INTEL-2025</b>
        </div>
        <section className="contact-hero container">
          <div>
            <div className="about-kicker"><SectionLabel>04 / Engagement & Bureaus</SectionLabel><span></span><small>Diplomatic & Corporate Accreditation</small></div>
            <h1>Start a Conversation.<br /><em>Shape Your Narrative.</em></h1>
          </div>
          <p className="lead">Whether commissioning a comprehensive sovereign PR mandate, preparing for cross-border expansion, or booking the Flagscale Studio, our partners respond within 24 hours.</p>
        </section>
        <section className="contact-metrics container">
          {[['24 HR', 'Executive Callback SLA'], ['4 CITIES', 'Dedicated Partner Bureaus'], ['100%', 'Attorney-Grade NDA Guarantee'], ['3.4B+', 'Cumulative Media Reach']].map(([value, label]) => <div key={label}><strong>{value}</strong><small>{label}</small></div>)}
        </section>
        <section className="contact-core container">
          <div className="mandate-form">
            <div className="form-title"><div><small>STAGE 01 — CLIENT INITIATION</small><h2>Confidential Mandate Briefing</h2></div><b>⌑</b></div>
            {submitted ? <div className="form-success"><strong>✓ &nbsp; Mandate dossier received.</strong><p>An engagement partner has been routed. Expect dispatch within 4 hours.</p><button className="button dark" onClick={() => setSubmitted(false)}>Submit Another Briefing</button></div> : <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
              <div className="form-row">
                <label>Full Name & Title *<input required placeholder="e.g. Dr. Amina Bello, Chief Strategy Officer" /></label>
                <label>Corporate / Institutional Organization *<input required placeholder="e.g. Horizon Energy Group" /></label>
              </div>
              <div className="form-row">
                <label>Corporate Email *<input required type="email" placeholder="amina@horizonenergy.com" /></label>
                <label>Direct Line (with Prefix) *<input required type="tel" placeholder="+234 802 000 0000" /></label>
              </div>
              <div className="form-row">
                <label>Primary Objective *<select required defaultValue=""><option value="" disabled>Select Engagement Type</option><option>Strategic PR & Communications</option><option>Crisis Communications & Mitigation</option><option>Executive Profiling & Thought Leadership</option><option>Market Launch / Cross-Border Expansion</option><option>Studio Production Booking</option></select></label>
                <label>Scope of Operations *<select required defaultValue=""><option value="" disabled>Select Territory Focus</option><option>Nigeria</option><option>Pan-African / Multi-Country</option><option>International Diaspora</option><option>Global Sovereign & Institutional</option></select></label>
              </div>
              <fieldset>
                <legend>Quick Tags / Priority Accelerators:</legend>
                <div className="tag-list">{tagOptions.map(tag => <button type="button" className={tags.includes(tag) ? 'tag selected' : 'tag'} key={tag} onClick={() => setTags(tags.includes(tag) ? tags.filter(item => item !== tag) : [...tags, tag])}>{tag}</button>)}</div>
              </fieldset>
              <label>Brief Narrative Summary & Proposed Timeline *<textarea required rows="5" placeholder="Outline key milestones, existing reputational challenges, desired media targets, and mandatory launch timelines..." /></label>
              <button className="button dark submit-button" type="submit">Submit Mandate Briefing <ArrowRight size={16} /></button>
              <small className="form-note">✓ &nbsp; All submissions are governed by strict non-disclosure and attorney-grade confidentiality protocols.</small>
            </form>}
          </div>
          <aside className="bureaus">
            <div className="hq-card">
              <SectionLabel>Global Headquarters</SectionLabel>
              <b className="flagship">Flagship</b>
              <h3>Flagscale Lagos (Bureau Principal)</h3>
              <p>Plot 14, Akin Adesola Street, Victoria Island, Lagos, Nigeria</p>
              <div className="bureau-map"><span>⌖ &nbsp; Victoria Island Diplomatic District</span></div>
              <div className="contact-pairs">
                <div><small>Direct Bureau Line</small><a href="tel:+2349057944830">+234 905 794 4830</a></div>
                <div><small>Direct Dispatch</small><a href="mailto:lagos@flagscalepr.com">lagos@flagscalepr.com</a></div>
              </div>
            </div>
            <div className="regional-desks">
              <div className="desk-heading"><b>Regional Partner Desks</b><small>3 Strategic Nodes</small></div>
              {[['London', 'UK & EMEA Desk', 'Mayfair, London W1J, United Kingdom', 'london@flagscalepr.com'], ['Nairobi', 'East Africa Desk', 'Kilimani Business District, Nairobi, Kenya', 'nairobi@flagscalepr.com'], ['Accra', 'West African Axis', 'Airport Residential Area, Accra, Ghana', 'accra@flagscalepr.com']].map(([city, label, address, email]) => <div className="desk" key={city}><div><b>{city}</b><small>{label}</small></div><p>{address}</p><a href={`mailto:${email}`}>{email} ↗</a></div>)}
            </div>
            <div className="special-channels">
              <div><SectionLabel>Production Suite</SectionLabel><h4>Flagscale Studio VI</h4><p>High-definition broadcast, executive portraits, and private podcast tapings.</p><a href="mailto:studio@flagscalepr.com">studio@flagscalepr.com</a></div>
              <div><SectionLabel>Newsroom / Press</SectionLabel><h4>Editorial Desk</h4><p>Accredited journalists, wire press release inquiries, and quote requests.</p><a href="mailto:media@flagscalepr.com">media@flagscalepr.com</a></div>
            </div>
          </aside>
        </section>
        <section className="dispatch-cta container">
          <div><SectionLabel>Rapid Executive Dispatch</SectionLabel><h2>Prefer an immediate executive briefing?</h2><p>Bypass the standard written dossier. Reserve 20 minutes directly on the institutional calendar of a Senior Partner in Lagos, London, or Nairobi.</p></div>
          <a className="button gold-button" href="mailto:advisory@flagscalepr.com">Schedule Intro Call →</a>
        </section>
        <section className="faq-section container">
          <div><SectionLabel>Procedural Protocols</SectionLabel><h2>Frequently Addressed Inquiries</h2><p className="lead">Understanding our governance, fee architecture, and client onboarding vetting standards.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], i) => <article key={question}><button onClick={() => setFaq(faq === i ? null : i)}><strong>0{i + 1}</strong><span>{question}</span><b>{faq === i ? '−' : '+'}</b></button>{faq === i && <p>{answer}</p>}</article>)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function JournalPage() {
  const [filter, setFilter] = useState('ALL DISPATCHES')
  const [playing, setPlaying] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const filters = ['ALL DISPATCHES', 'STRATEGIC NARRATIVE', 'CULTURAL DIPLOMACY', 'THE PODCAST', 'EXECUTIVE DOSSIERS', 'CRISIS ARCHITECTURE']
  return (
    <div className="site journal-page">
      <SiteHeader active="journal" />
      <main className="journal-main">
        <div className="reading-progress"><span /></div>
        <section className="journal-masthead container">
          <div className="issue-bar"><SectionLabel>THE FLAGSCALE JOURNAL · ISSUE Nº 09 · QUARTERLY DISPATCH</SectionLabel><span>LAGOS / NAIROBI / LONDON / NY &nbsp; • &nbsp; CIRCULATION: 42,000+ C-SUITE</span></div>
          <div className="masthead-grid"><h1>Ideas shaping business, communication & culture across Africa.</h1><p>Architectural thought leadership dissecting institutional narrative power, boardroom diplomacy, and pan-African market realities.</p></div>
          <div className="filter-bar"><div>{filters.map(item => <button key={item} className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)}>{item}</button>)}</div><span className="weekly">◷ &nbsp; UPDATED WEEKLY</span></div>
        </section>
        <section className="container lead-dossier">
          <article className="cover-story">
            <div className="cover-image">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdbLpdKFuL22PYBPg321K0r4U1o02HrAMf-hsX09zux7RZergd5EdTF11kj1lDDjkjvwiryBjkczIGl3SNjmBDJpJPksnqeF_6h-XlA7qOP4cnVljK6taQWh8oIVNe68thi6YO3w2TL20ZuprtJMVvc4l0EnmbT95VihinG1f9xomlLWaAqgDUdsjQEQJ4R3oWUGsBol0X_G1aoqK0AxxHtgayi2R3iX8JQPjkjDaPnMtQgN7j9-5I" alt="African corporate executive in a tailored suit" />
              <div className="cover-scrim" />
              <b className="cover-badge">● &nbsp; THE COVER STORY</b>
              <p className="cover-quote">“Power in emerging markets is no longer won through sheer noise. It is anchored in regulatory legitimacy and quiet cultural sovereignty.”</p>
            </div>
            <div className="cover-copy">
              <div>
                <SectionLabel>COVER ESSAY · 12 MIN READ · BY FOLASHADE ALADE-DAVIES</SectionLabel>
                <span className="role">MANAGING DIRECTOR & SENIOR PARTNER, LAGOS BUREAU</span>
                <h2>Why African Businesses Need to Think Beyond Visibility</h2>
                <p className="body-copy">Moving past vanity metrics toward institutional durability and real regulatory authority in expanding consumer economies. How premier conglomerates across Lagos, Nairobi, and Johannesburg secure generational trust when market scrutiny intensifies.</p>
                <div className="core-thesis">
                  <SectionLabel>CORE THESIS</SectionLabel>
                  <p>Impression counts do not protect enterprise value during sovereign rate adjustments or licensing revisions. Narrative insulation requires deliberate institutional alignment.</p>
                </div>
              </div>
              <div className="story-actions">
                <a className="button dark" href="#dispatches">Read Complete Essay <ArrowRight size={16} /></a>
                <div><button aria-label="Bookmark story">♡</button><button aria-label="Share story">↗</button><span>SHARE DOSSIER</span></div>
              </div>
            </div>
          </article>
        </section>
        <section className="container dialogue">
          <div className="dialogue-top"><SectionLabel>◉ &nbsp; THE FLAGSCALE DIALOGUE · STUDIO BROADCAST</SectionLabel><span>SEASON 03 · EPISODE 24 &nbsp; <b>NOW STREAMING</b></span></div>
          <div className="dialogue-grid">
            <div className="dialogue-image"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVXlnAoUEkPU8YxC-OX71nOgnkNhgTNCFhYmF8DTv8P-8gKa6dMNZw5WA6GMb5MNAutPPz8RSb6E0hoa9fplwCx0tLEDWlkIyWLr9c0kasSJRPZ1pdfR6Sn8eoAlp-0-Ayi82sZVfUn-MHslO9KNJ1SKWXr0KVqMjF_JBaeeYp69JpwPSYBOMCYpFF66D9pANx-PMmKLeNYKxVZOKiEyL6Q9iLpU5Hw9DJcPGyt3T5191PLi1FdXMQ" alt="Podcast studio broadcast setup" /><span>● &nbsp; STUDIO MASTER · 42:15</span></div>
            <div className="dialogue-copy">
              <SectionLabel>SPECIAL GUEST DOSSIER &nbsp; — &nbsp; COTONOU / DAKAR / ABIDJAN CORRIDOR</SectionLabel>
              <h2>Building Cross-Border Reputation in Francophone & Anglophone Africa</h2>
              <p>Mamadou Diallo <span>(Former VP of Corporate Communications, Orange West Africa)</span> joins Flagscale PR Managing Partners to dissect dual-market messaging, French regulatory subtleties, and national identity sensitivity.</p>
              <div className="audio-player">
                <button className="audio-play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause broadcast' : 'Play broadcast'}>{playing ? 'Ⅱ' : '▶'}</button>
                <div className="audio-track">
                  <div><span>EP. 24 — CROSS-BORDER FRANCOPHONE DIPLOMACY</span><span>16:42 / 42:15</span></div>
                  <div className={playing ? 'wave playing' : 'wave'}>{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ height: `${10 + ((i * 17) % 25)}px` }} />)}</div>
                </div>
                <button className="speed">1.0x</button>
              </div>
              <div className="listen">SUBSCRIBE & LISTEN VIA: <a href="#dispatches">Apple Podcasts</a> · <a href="#dispatches">Spotify</a> · <a href="#dispatches">YouTube</a></div>
            </div>
          </div>
        </section>
        <section className="container dispatches" id="dispatches">
          <div className="dispatch-heading"><div><SectionLabel>ANALYSIS & STRATEGY</SectionLabel><h2>Curated Thought Leadership</h2></div><span>DISPATCHES Nº 142 — Nº 147</span></div>
          <div className="dispatch-grid">{journalCards.map(([category, meta, title, copy, author, image]) => <article className="dispatch-card" key={title}><div className="dispatch-image"><img src={image} alt="" /><span>{meta}</span></div><div className="dispatch-copy"><SectionLabel>{category}</SectionLabel><h3>{title}</h3><p>{copy}</p><div><small>{author}</small><a href="#dispatches">Read →</a></div></div></article>)}</div>
        </section>
        <section className="container report">
          <div className="report-copy">
            <SectionLabel>ANNUAL FLAGSCALE RESEARCH REPORT · 2025 EDITION</SectionLabel>
            <h2>The 2025 African Media & Influence Landscape Report</h2>
            <p className="body-copy">Our definitive 48-page executive intelligence dossier examining 1,200 pan-African media outlets, 300 tier-one journalists, and corporate communication spends across Nigeria, Kenya, South Africa, Ghana, and Senegal.</p>
            <div className="report-stats">
              <div><small>SYNDICATION CONVERGENCE</small><strong>74%</strong><p>Of top tier newsrooms now syndicate through sovereign and regional editorial wires rather than Western agencies.</p></div>
              <div><small>CREATOR COMMERCIAL IMPACT</small><strong>$1.2B</strong><p>Estimated addressable brand communication reach captured by vetted cultural tastemakers and private intellectual channels.</p></div>
            </div>
            <a className="button dark" href="#newsletter">↓ &nbsp; Download Executive Intelligence Dossier (PDF) →</a>
            <small className="format">FORMAT: 48-PAGE EXECUTIVE PDF (14.2 MB)</small>
          </div>
          <div className="report-cover"><div><small>FLAGSCALE RESEARCH &nbsp;&nbsp; CONFIDENTIAL</small><hr /><h3>AFRICAN MEDIA INTELLIGENCE REPORT</h3><span>ANNUAL STRATEGIC AUDIT 2025</span><div className="chart">╱╲__╱╲___╱╲╱</div><small>FLAGSCALE PR BISTRO LABS &nbsp;&nbsp; VOL. 09</small></div></div>
        </section>
        <section className="container newsletter" id="newsletter">
          <div><SectionLabel>✉ &nbsp; RESTRICTED EXECUTIVE CIRCULATION</SectionLabel><h2>The Monthly Dispatch</h2><p>African Strategic Intelligence in Your Inbox — Strictly vetted content. Zero marketing noise. Delivered the first Thursday of every calendar month.</p></div>
          {subscribed ? <div className="subscribed"><strong>✓ &nbsp; DISPATCH REQUEST RECEIVED</strong><p>We have added your address to our vetted circulation ledger. Issue Nº 09 will transmit shortly.</p></div> : <form onSubmit={e => { e.preventDefault(); setSubscribed(true) }}><div><input required type="email" placeholder="ENTER CORPORATE WORK EMAIL" aria-label="Corporate Email Address" /><button className="button dark" type="submit">Subscribe →</button></div><small>GDPR & NDPR COMPLIANT ARCHIVE &nbsp;&nbsp; UNSUBSCRIBE AT ANY TIME</small></form>}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
