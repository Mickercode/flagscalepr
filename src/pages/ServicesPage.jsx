import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Disc3,
  Gem,
  Megaphone,
  Newspaper,
  PenLine,
  Share2,
  ShieldAlert,
} from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'
import SmartImage from '../components/SmartImage'

const divisions = [
  ['01', 'Media Relations', 'We build relationships with journalists and media networks to secure credible coverage for your products, services, and events.', 'Earned Visibility', Newspaper],
  ['02', 'Content Creation', 'Compelling entrepreneurial stories, social content, and owned-media narratives that help African SMEs stand out from competitors.', 'Stories with Purpose', PenLine],
  ['03', 'Social Media Management', 'People-centred content planning and community engagement that turns attention into meaningful customer and partner relationships.', 'Audience Connection', Share2],
  ['04', 'Crisis Management', 'Clear, timely communication and stakeholder guidance to protect trust, maintain a positive image, and respond to uncertainty.', 'Reputation Care', ShieldAlert],
  ['05', 'Event Management', 'Strategic events and experiences that create opportunities for coverage, connection, partnerships, and long-term contracts.', 'Experiences that Open Doors', CalendarCheck],
  ['06', 'Influencer Marketing', 'Trusted African creators and cultural voices aligned with your audience, values, and business goals.', 'Cultural Relevance', Megaphone],
  ['07', 'Brand Building', 'Positioning, messaging, and consistent communications that establish trust and make your business memorable.', 'Brand Confidence', Gem],
  ['08', 'Corporate Communications', 'Tailored communications for customers, employees, partners, investors, and stakeholders across dynamic markets.', 'Stakeholder Alignment', Building2],
]

const phases = [
  ['Phase 01', 'DISCOVER', 'Understand the Business', 'We learn your business, audience, values, goals, market context, and the opportunities standing between visibility and growth.', 'Audience & Brand Brief'],
  ['Phase 02', 'DEFINE', 'Shape the Story', 'We turn your expertise and entrepreneurial journey into clear messaging, content themes, media angles, and partnership narratives.', 'Strategic Communications Plan'],
  ['Phase 03', 'DEPLOY', 'Activate the Channels', 'We coordinate media relations, content, social platforms, events, influencers, and corporate communications around your priorities.', 'Campaign & Content Calendar'],
  ['Phase 04', 'GROW', 'Measure & Strengthen', 'We review what is resonating, refine the message, nurture relationships, and build a repeatable communications system for growth.', 'Progress & Opportunity Review'],
]

export default function ServicesPage() {
  return (
    <div className="site services-page">
      <SiteHeader active="services" />
      <main className="services-main" id="main" tabIndex={-1}>
        <section className="services-intro container">
          <div className="service-meta">
            <SectionLabel>01 / Services for African SMEs</SectionLabel>
            <span>ANGLOPHONE • FRANCOPHONE AFRICA &nbsp; • &nbsp; PEOPLE-CENTRIC PR</span>
          </div>
          <div className="services-hero-grid">
            <h1>Make Your Brand’s Voice <em>Count.</em></h1>
            <div>
              <p>
                Data-driven, tailored communications for African SMEs working toward business success and an accelerated AfCFTA progression.
              </p>
              <div className="protocol">
                <small>Our promise:</small><b>People · Passion · Professionalism</b>
              </div>
            </div>
          </div>
          <div className="metrics">
            {[
              ['8', 'Core PR Services', 'From media relations to corporate communications'],
              ['SMEs', 'Our Focus', 'Practical communications built around your stage of growth'],
              ['2', 'Language Corridors', 'Anglophone and Francophone African markets'],
              ['1', 'Owned Media Studio', 'Podcast, post-production, and executive thought leadership'],
            ].map(([value, label, copy]) => (
              <div key={label}>
                <strong>{value}</strong>
                <b>{label}</b>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="divisions">
          <div className="container">
            <div className="service-section-heading">
              <div>
                <SectionLabel>02 / Structural Practice Groups</SectionLabel>
                <h2>The Eight Sovereign Divisions</h2>
              </div>
              <p>
                Modular, highly specialized bureaus designed to deploy independently or assemble as a cohesive global communications vanguard.
              </p>
            </div>
            <div className="division-grid">
              {divisions.map(([num, title, copy, foot, Icon]) => (
                <article className={num === '08' ? 'division-card crisis' : 'division-card'} key={num}>
                  <div>
                    <div className="division-top">
                      <strong>{num}</strong>
                      <span className="division-icon">
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <footer>
                    <small>{foot}</small>
                    <b aria-hidden="true">
                      <ArrowRight size={15} />
                    </b>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="studio-showcase container">
          <div className="studio-image">
            <SmartImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCEWwr0cnv_7Xk7nwYpde-Z-a7myUZva7Caw4_FzTwA2jbuH_cIlO3xWBi5MXXwYoCINMAxlwypyN937nI4NU-2B4wrmf6YYztDy6oE8kmAouyW3KaMSKPaBXsb-txCbZJAwM69383HisEJmKniaIXG5zo-on0C6hdi9s-RJfQaUMdARPbYieTQR_8ce6YqRGnjeXamFRP3g1pSIXZjTX5PVCqqFYvLblzuKd6ox1ERx73gI4n5tv8"
              alt="Broadcast studio control room in Lagos"
              width={1400}
              height={940}
              />
            <span>Victoria Island, Lagos • Studio 01</span>
          </div>
          <div className="studio-copy">
            <SectionLabel>Broadcast Infrastructure</SectionLabel>
            <h2>The Flagscale Studio</h2>
            <p>
              Our purpose-engineered Victoria Island production facility provides institutional leaders with an acoustic sanctuary for high-fidelity fireside interviews, broadcast syndication, and sovereign thought leadership.
            </p>
            <div className="studio-specs">
              {[
                ['4K Cinema Suite', 'Multi-angle cinema camera array with Zeiss primes'],
                ['Acoustic Vault', 'Zero-bleed decibel-rated architectural dampening'],
                ['Fiber Uplink Stream', 'Dedicated gigabit pipe for live BBC, Bloomberg, CNN link-up'],
                ['VIP Greenroom', 'Private executive suite with concierge hospitality'],
              ].map(([title, copy]) => (
                <div key={title}>
                  <b><Disc3 size={14} aria-hidden="true" /> &nbsp; {title}</b>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <a className="arrow-link" href="mailto:contact@flagscalepr.com">
              Book Studio Walkthrough & Technical Specs <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="framework">
          <div className="container">
            <div className="service-section-heading">
              <div>
                <SectionLabel>03 / Methodological Precision</SectionLabel>
                <h2>Strategic Engagement Framework</h2>
              </div>
              <span>4-STAGE PRECISION MANDATE</span>
            </div>
            <div className="phase-grid">
              {phases.map(([phase, time, title, copy, deliverable]) => (
                <article key={phase}>
                  <div>
                    <div className="phase-meta">
                      <b>{phase}</b>
                      <small>{time}</small>
                    </div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <footer>
                    <small>Deliverable</small>
                    <b>{deliverable}</b>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mandate-cta container">
          <div>
            <SectionLabel>Bilateral Representation</SectionLabel>
            <h2>Ready to Shape Your Legacy?</h2>
            <p>
              Our strategic advisory engagements are reserved for institutions, sovereign leaders, and founders seeking transformative, long-term cultural stature and global resonance.
            </p>
          </div>
          <div>
            <a className="button gold-button" href="mailto:contact@flagscalepr.com">
              Initiate Strategic Mandate <ArrowRight size={16} aria-hidden="true" />
            </a>
            <small>Confidential partner briefing scheduled within 24h</small>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
