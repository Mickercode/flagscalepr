import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Circle, FileText, MapPin, Minus, Plus } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'


const BUREAU_CLOCKS = [
  { city: 'LAGOS', zone: 'Africa/Lagos', label: 'WAT' },
  { city: 'LONDON', zone: 'Europe/London', label: 'GMT' },
  { city: 'NAIROBI', zone: 'Africa/Nairobi', label: 'EAT' },
]

const formatZone = (date, timeZone) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [tags, setTags] = useState([])
  const [faq, setFaq] = useState(null)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const tagOptions = [
    'Immediate M&A Announcement',
    'Capital Raise Disclosure',
    'State Visit / Bilateral Forum',
    'Visual Campaign / Fashion Week',
  ]
  const faqs = [
    [
      'How does Flagscale PR approach initial mandate onboarding?',
      'Every prospective client undergoes a 72-hour reputational and strategic audit before contract formalisation. Once cleared, an onboarding partner and dedicated strategic team are assigned within 48 hours.',
    ],
    [
      'What confidentiality and non-disclosure standards apply?',
      'All introductory discussions, preliminary dossier evaluations, and crisis scenarios are executed under strict multilateral NDAs governed by Nigerian and UK corporate jurisprudence.',
    ],
    [
      'What is the retainer framework and campaign duration structure?',
      'Flagscale PR operates primarily on 6-month or 12-month sovereign and enterprise strategic retainers, with rapid-deployment strike teams available for specialised mandates.',
    ],
  ]

  return (
    <div className="site contact-page">
      <SiteHeader active="contact" />
      <main className="contact-main" id="main" tabIndex={-1}>
        <div className="status-ticker">
          <span>
            <Circle size={8} fill="currentColor" aria-hidden="true" /> &nbsp; DISPATCH STATUS: ACTIVE DESKS OPEN
          </span>
          <span className="ticker-cities">
            {BUREAU_CLOCKS.map(({ city, zone, label }, i) => (
              <span key={city}>
                {i > 0 && <span className="ticker-sep"> &nbsp; • &nbsp; </span>}
                {city} {formatZone(now, zone)} {label}
              </span>
            ))}
          </span>
          <b>REF: FGS-INTEL-{now.getFullYear()}</b>
        </div>

        <section className="contact-hero container">
          <div>
            <div className="about-kicker">
              <SectionLabel>04 / Engagement & Bureaus</SectionLabel>
              <span></span>
              <small>Diplomatic & Corporate Accreditation</small>
            </div>
            <h1>Start a Conversation.<br /><em>Shape Your Narrative.</em></h1>
          </div>
          <p className="lead">
            Whether commissioning a comprehensive sovereign PR mandate, preparing for cross-border expansion, or booking the Flagscale Studio, our partners respond within 24 hours.
          </p>
        </section>

        <section className="contact-metrics container">
          {[
            ['24 HR', 'Executive Callback SLA'],
            ['4 CITIES', 'Dedicated Partner Bureaus'],
            ['100%', 'Attorney-Grade NDA Guarantee'],
            ['3.4B+', 'Cumulative Media Reach'],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <small>{label}</small>
            </div>
          ))}
        </section>

        <section className="contact-core container">
          <div className="mandate-form">
            <div className="form-title">
              <div>
                <small>STAGE 01 — CLIENT INITIATION</small>
                <h2>Confidential Mandate Briefing</h2>
              </div>
              <b aria-hidden="true">
                <FileText size={18} />
              </b>
            </div>

            {submitted ? (
              <div className="form-success" role="status" aria-live="polite">
                <strong>
                  <Check size={16} aria-hidden="true" /> &nbsp; Mandate dossier received.
                </strong>
                <p>An engagement partner has been routed. Expect dispatch within 4 hours.</p>
                <button className="button dark" onClick={() => setSubmitted(false)}>
                  Submit Another Briefing
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <p className="required-note">
                  Fields marked <b aria-hidden="true">*</b> are required.
                </p>
                <div className="form-row">
                  <label htmlFor="c-name">
                    Full Name & Title <b aria-hidden="true">*</b>
                    <input
                      id="c-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="e.g. Dr. Amina Bello, Chief Strategy Officer"
                    />
                  </label>
                  <label htmlFor="c-org">
                    Corporate / Institutional Organisation <b aria-hidden="true">*</b>
                    <input
                      id="c-org"
                      name="organization"
                      required
                      autoComplete="organization"
                      placeholder="e.g. Horizon Energy Group"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label htmlFor="c-email">
                    Corporate Email <b aria-hidden="true">*</b>
                    <input
                      id="c-email"
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="amina@horizonenergy.com"
                    />
                  </label>
                  <label htmlFor="c-tel">
                    Direct Line (with Prefix) <b aria-hidden="true">*</b>
                    <input
                      id="c-tel"
                      name="tel"
                      required
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+234 802 000 0000"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label htmlFor="c-objective">
                    Primary Objective <b aria-hidden="true">*</b>
                    <select id="c-objective" name="objective" required defaultValue="">
                      <option value="" disabled>Select Engagement Type</option>
                      <option>Strategic PR & Communications</option>
                      <option>Crisis Communications & Mitigation</option>
                      <option>Executive Profiling & Thought Leadership</option>
                      <option>Market Launch / Cross-Border Expansion</option>
                      <option>Studio Production Booking</option>
                    </select>
                  </label>
                  <label htmlFor="c-scope">
                    Scope of Operations <b aria-hidden="true">*</b>
                    <select id="c-scope" name="scope" required defaultValue="">
                      <option value="" disabled>Select Territory Focus</option>
                      <option>Nigeria</option>
                      <option>Pan-African / Multi-Country</option>
                      <option>International Diaspora</option>
                      <option>Global Sovereign & Institutional</option>
                    </select>
                  </label>
                </div>
                <fieldset>
                  <legend>Quick Tags / Priority Accelerators:</legend>
                  <div className="tag-list">
                    {tagOptions.map((tag) => (
                      <button
                        type="button"
                        className={tags.includes(tag) ? 'tag selected' : 'tag'}
                        aria-pressed={tags.includes(tag)}
                        key={tag}
                        onClick={() =>
                          setTags(
                            tags.includes(tag)
                              ? tags.filter((item) => item !== tag)
                              : [...tags, tag]
                          )
                        }
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label htmlFor="c-brief">
                  Brief Narrative Summary & Proposed Timeline <b aria-hidden="true">*</b>
                  <textarea
                    id="c-brief"
                    name="brief"
                    required
                    rows="5"
                    placeholder="Outline key milestones, existing reputational challenges, desired media targets, and mandatory launch timelines..."
                  />
                </label>
                <button className="button dark submit-button" type="submit">
                  Submit Mandate Briefing <ArrowRight size={16} />
                </button>
                <small className="form-note">
                  <Check size={13} aria-hidden="true" /> &nbsp; All submissions are governed by strict
                  non-disclosure and attorney-grade confidentiality protocols.
                </small>
              </form>
            )}
          </div>

          <aside className="bureaus">
            <div className="hq-card">
              <SectionLabel>Global Headquarters</SectionLabel>
              <b className="flagship">Flagship</b>
              <h3>Flagscale Lagos (Bureau Principal)</h3>
              <p>Plot 14, Akin Adesola Street, Victoria Island, Lagos, Nigeria</p>
              <div className="bureau-map">
                <span>
                  <MapPin size={14} aria-hidden="true" /> &nbsp; Victoria Island Diplomatic District
                </span>
              </div>
              <div className="contact-pairs">
                <div>
                  <small>Direct Bureau Line</small>
                  <a href="tel:+2349057944830">+234 905 794 4830</a>
                </div>
                <div>
                  <small>Direct Dispatch</small>
                  <a href="mailto:lagos@flagscalepr.com">lagos@flagscalepr.com</a>
                </div>
              </div>
            </div>

            <div className="regional-desks">
              <div className="desk-heading">
                <b>Regional Partner Desks</b>
                <small>3 Strategic Nodes</small>
              </div>
              {[
                ['London', 'UK & EMEA Desk', 'Mayfair, London W1J, United Kingdom', 'london@flagscalepr.com'],
                ['Nairobi', 'East Africa Desk', 'Kilimani Business District, Nairobi, Kenya', 'nairobi@flagscalepr.com'],
                ['Accra', 'West African Axis', 'Airport Residential Area, Accra, Ghana', 'accra@flagscalepr.com'],
              ].map(([city, label, address, email]) => (
                <div className="desk" key={city}>
                  <div>
                    <b>{city}</b>
                    <small>{label}</small>
                  </div>
                  <p>{address}</p>
                  <a href={`mailto:${email}`}>{email}
                    <ArrowUpRight size={13} aria-hidden="true" /></a>
                </div>
              ))}
            </div>

            <div className="special-channels">
              <div>
                <SectionLabel>Production Suite</SectionLabel>
                <h4>Flagscale Studio VI</h4>
                <p>High-definition broadcast, executive portraits, and private podcast tapings.</p>
                <a href="mailto:studio@flagscalepr.com">studio@flagscalepr.com</a>
              </div>
              <div>
                <SectionLabel>Newsroom / Press</SectionLabel>
                <h4>Editorial Desk</h4>
                <p>Accredited journalists, wire press release inquiries, and quote requests.</p>
                <a href="mailto:media@flagscalepr.com">media@flagscalepr.com</a>
              </div>
            </div>
          </aside>
        </section>

        <section className="dispatch-cta container">
          <div>
            <SectionLabel>Rapid Executive Dispatch</SectionLabel>
            <h2>Prefer an immediate executive briefing?</h2>
            <p>
              Bypass the standard written dossier. Reserve 20 minutes directly on the institutional calendar of a Senior Partner in Lagos, London, or Nairobi.
            </p>
          </div>
          <a className="button gold-button" href="mailto:advisory@flagscalepr.com">
            Schedule Intro Call <ArrowRight size={16} aria-hidden="true" />
          </a>
        </section>

        <section className="faq-section container">
          <div>
            <SectionLabel>Procedural Protocols</SectionLabel>
            <h2>Frequently Addressed Inquiries</h2>
            <p className="lead">
              Understanding our governance, fee architecture, and client onboarding vetting standards.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <article key={question}>
                <button
                  type="button"
                  aria-expanded={faq === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setFaq(faq === i ? null : i)}
                >
                  <strong>0{i + 1}</strong>
                  <span>{question}</span>
                  <b aria-hidden="true">
                    {faq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </b>
                </button>
                {faq === i && (
                  <p id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-trigger-${i}`}>
                    {answer}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
