import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'

const journalCards = [
  ['CULTURAL DIPLOMACY', 'Culture · 6 Min Read', 'The Soft Power Blueprint: How Creative Economies are Reshaping African Diplomacy', 'From Afrobeats dominating streaming metrics in North America to fashion houses anchoring sovereign goodwill, creative output is the continent’s sharpest diplomatic instrument.', 'BY TUNDE ADEWOLE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUAWCq4k3zl79txg56VrwfryuzaJT8wGPATlrS-TeIFwSzEFfegiXBR32Ts7mjMfaVEUONG_iAP9gBfqnvl9qTQMmeB3EzGWHWMMqDqpXyvUU_m14muBytlIyjKp9RJU_mnnM2InlDdgZ7SlZy09Hq5iZr46OVLer7QIVlsvrFspo7HUXiMO4WfnfkqzSdnzQTXL2DwB5rZul0dV6_po4JfcT57CZxk5gD_hhXBNQ8zJOq5LXkDkm'],
  ['CAPITAL MARKETS', 'Financial PR · 9 Min Read', 'Communicating Valuation in High-Volatility FX Environments', 'How dual-listed African conglomerates balance local currency realities with offshore dollar investor sentiment during institutional earnings reports and sovereign debt revisions.', 'BY NKIRU EZE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF7ZUSCFIKElmMQxN3iQkGwQ5gDFAFD90jNpivmI9h_-74kk1oWIWWbmIZQDAYO4mMiKIMMZa4rMFuCZDlOnm7lIacG19Ki1dz86npfV31NQNcrQHWe4MubLBPOEu7hVvnoEC-mkyPdDIULnaB6RgL9xXUKPtEpfNL24d7eX0tO9BMO1TL8qmOLDVV0WNjV3vk1pqFW6MRgOJ8guePKVFq0ada6tpqZ8Z2G17igsTqY8iRgUckQTZs'],
  ['MEDIA GOVERNANCE', 'Media Trends · 7 Min Read', 'The Changing Relationship Between Brands, Media and Sovereign Influence', 'An architectural breakdown of the new publishing cartels across West and East Africa, and why commercial reliance on sponsored journalism is diminishing corporate leverage.', 'BY KWAME OSEI', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMif-Ae50J_848lmI2A8xwIyR3oQ9zTwjO5A31QfB6qW4Yf3PKiGkF78kS4kh0YlRTDjN3ii3hvDEgMQh6n6yeA8sfUZzul_dcoBKndH98WYNnP8lHT8KvQOJzPmjT8s1Xova0gd_dArbEDguMlZnd8WKibM8UAXrtcl7evWaWofSwfgxJgAk2mkp4S-YRDl8F20c1nKW7hPuYI3pR3IsDX54rMoHde-4FwOqEbTyfmugW8xheTZ1u'],
  ['CRISIS ARCHITECTURE', 'Crisis Protocol · 11 Min Read', 'Managing Cross-Border Crisis Communications in Multi-Regulated Sectors', 'Standard operating procedures for telecoms, extractive energy, and fintech operators confronting synchronized regulatory inquiry across ECOWAS and SADC jurisdictions.', 'BY FOLASHADE ALADE-DAVIES', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeMJcEYMhLKm4Ng5SswlmoobCnOtOyJiBtk7mlrxQnFHnAvaCu_DNnjNHWMRPQppYuERSkrP6HKPpVpMQh42Hx8k1mWL21hMkLw6T00PQ3bhqzSvVNy5qRTlrNKCnd_bGDlfTg76q-8bFKKn-awM3GsKqOs-vAZwL_ZyOhMurpVBo4L0fOTgJhbpK3n7_MQd2v-oiVnCaIZrp95P44irhFFM-CDLTZjN-OmPv2yWhxzVi48E99yoJN'],
  ['EXECUTIVE DOSSIER', 'Leadership · 5 Min Read', 'Executive Stature in the Age of Digital Decentralization', 'Why the most respected African CEOs are systematically pulling back from social vanity engagement to deploy surgical, highly documented policy interventions.', 'BY AMARA DIOP', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Vpf60uaIRE9up3Wa3BXBmnOdnutVca1IGt8mD4yQyj6hF8QGcT1E2IGBJMfgQNAOQrLiSPo_OnUQj_AcyINNcL-hc-wd8q0DMNrvIUt5ukd7MSNqZu9yIREz13uyPyF1skFiE3PBwfVYp91XF1dtWdNLkDWyf1C5h3PerTYUr5p3TDQqQtctGpj_GlP3AGUKWbHpo5pF8Y2ZZSnBgE_my8gV1xNHGL5wWylYpbk9WKvAwWdXrdeI'],
  ['BRAND DURABILITY', 'Consumer PR · 8 Min Read', 'Building African Consumer Giants: The New Rules of Brand Trust', 'How domestic FMCG brands are out-maneuvering Western multinational incumbents through authentic provenance storytelling, supply chain transparency, and community investment.', 'BY BABATUNDE COLE', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkwsKRYxAt-TxxjkstxO0vpo12H2wIyZ5Ehy68QmvfkSB6t8tgO52bQXAZJUS3BXqNnI5V8mTwP-GINLbOP1Sx4pMBs_zRTG2QaGlKurqKzYYI8jGbninAGocHEP6O2JpMytAF-Z200g1boUTbNINqCy5DtijbQbf_IZ-dZKaewJcJDrNl_ghOLomi54tf0GKDjegE00hGHpB1khpOWXWJKmQwSlSkYBTt2FzrTZxZ-eo_B97U0fkt'],
]

export default function JournalPage() {
  const [filter, setFilter] = useState('ALL DISPATCHES')
  const [playing, setPlaying] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const filters = [
    'ALL DISPATCHES',
    'STRATEGIC NARRATIVE',
    'CULTURAL DIPLOMACY',
    'THE PODCAST',
    'EXECUTIVE DOSSIERS',
    'CRISIS ARCHITECTURE',
  ]

  return (
    <div className="site journal-page">
      <SiteHeader active="journal" />
      <main className="journal-main">
        <div className="reading-progress"><span /></div>

        <section className="journal-masthead container">
          <div className="issue-bar">
            <SectionLabel>THE FLAGSCALE JOURNAL · ISSUE Nº 09 · QUARTERLY DISPATCH</SectionLabel>
            <span>LAGOS / NAIROBI / LONDON / NY &nbsp; • &nbsp; CIRCULATION: 42,000+ C-SUITE</span>
          </div>
          <div className="masthead-grid">
            <h1>Ideas shaping business, communication & culture across Africa.</h1>
            <p>
              Architectural thought leadership dissecting institutional narrative power, boardroom diplomacy, and pan-African market realities.
            </p>
          </div>
          <div className="filter-bar">
            <div>
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? 'filter active' : 'filter'}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="weekly">◷ &nbsp; UPDATED WEEKLY</span>
          </div>
        </section>

        <section className="container lead-dossier">
          <article className="cover-story">
            <div className="cover-image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdbLpdKFuL22PYBPg321K0r4U1o02HrAMf-hsX09zux7RZergd5EdTF11kj1lDDjkjvwiryBjkczIGl3SNjmBDJpJPksnqeF_6h-XlA7qOP4cnVljK6taQWh8oIVNe68thi6YO3w2TL20ZuprtJMVvc4l0EnmbT95VihinG1f9xomlLWaAqgDUdsjQEQJ4R3oWUGsBol0X_G1aoqK0AxxHtgayi2R3iX8JQPjkjDaPnMtQgN7j9-5I"
                alt="African corporate executive in a tailored suit"
              />
              <div className="cover-scrim" />
              <b className="cover-badge">● &nbsp; THE COVER STORY</b>
              <p className="cover-quote">
                “Power in emerging markets is no longer won through sheer noise. It is anchored in regulatory legitimacy and quiet cultural sovereignty.”
              </p>
            </div>
            <div className="cover-copy">
              <div>
                <SectionLabel>COVER ESSAY · 12 MIN READ · BY FOLASHADE ALADE-DAVIES</SectionLabel>
                <span className="role">MANAGING DIRECTOR & SENIOR PARTNER, LAGOS BUREAU</span>
                <h2>Why African Businesses Need to Think Beyond Visibility</h2>
                <p className="body-copy">
                  Moving past vanity metrics toward institutional durability and real regulatory authority in expanding consumer economies. How premier conglomerates across Lagos, Nairobi, and Johannesburg secure generational trust when market scrutiny intensifies.
                </p>
                <div className="core-thesis">
                  <SectionLabel>CORE THESIS</SectionLabel>
                  <p>
                    Impression counts do not protect enterprise value during sovereign rate adjustments or licensing revisions. Narrative insulation requires deliberate institutional alignment.
                  </p>
                </div>
              </div>
              <div className="story-actions">
                <a className="button dark" href="#dispatches">
                  Read Complete Essay <ArrowRight size={16} />
                </a>
                <div>
                  <button aria-label="Bookmark story">♡</button>
                  <button aria-label="Share story">↗</button>
                  <span>SHARE DOSSIER</span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="container dialogue">
          <div className="dialogue-top">
            <SectionLabel>◉ &nbsp; THE FLAGSCALE DIALOGUE · STUDIO BROADCAST</SectionLabel>
            <span>SEASON 03 · EPISODE 24 &nbsp; <b>NOW STREAMING</b></span>
          </div>
          <div className="dialogue-grid">
            <div className="dialogue-image">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVXlnAoUEkPU8YxC-OX71nOgnkNhgTNCFhYmF8DTv8P-8gKa6dMNZw5WA6GMb5MNAutPPz8RSb6E0hoa9fplwCx0tLEDWlkIyWLr9c0kasSJRPZ1pdfR6Sn8eoAlp-0-Ayi82sZVfUn-MHslO9KNJ1SKWXr0KVqMjF_JBaeeYp69JpwPSYBOMCYpFF66D9pANx-PMmKLeNYKxVZOKiEyL6Q9iLpU5Hw9DJcPGyt3T5191PLi1FdXMQ"
                alt="Podcast studio broadcast setup"
              />
              <span>● &nbsp; STUDIO MASTER · 42:15</span>
            </div>
            <div className="dialogue-copy">
              <SectionLabel>SPECIAL GUEST DOSSIER &nbsp; — &nbsp; COTONOU / DAKAR / ABIDJAN CORRIDOR</SectionLabel>
              <h2>Building Cross-Border Reputation in Francophone & Anglophone Africa</h2>
              <p>
                Mamadou Diallo <span>(Former VP of Corporate Communications, Orange West Africa)</span> joins Flagscale PR Managing Partners to dissect dual-market messaging, French regulatory subtleties, and national identity sensitivity.
              </p>
              <div className="audio-player">
                <button
                  className="audio-play"
                  onClick={() => setPlaying(!playing)}
                  aria-label={playing ? 'Pause broadcast' : 'Play broadcast'}
                >
                  {playing ? 'Ⅱ' : '▶'}
                </button>
                <div className="audio-track">
                  <div>
                    <span>EP. 24 — CROSS-BORDER FRANCOPHONE DIPLOMACY</span>
                    <span>16:42 / 42:15</span>
                  </div>
                  <div className={playing ? 'wave playing' : 'wave'}>
                    {Array.from({ length: 30 }, (_, i) => (
                      <i key={i} style={{ height: `${10 + ((i * 17) % 25)}px` }} />
                    ))}
                  </div>
                </div>
                <button className="speed">1.0x</button>
              </div>
              <div className="listen">
                SUBSCRIBE & LISTEN VIA: <a href="#dispatches">Apple Podcasts</a> · <a href="#dispatches">Spotify</a> · <a href="#dispatches">YouTube</a>
              </div>
            </div>
          </div>
        </section>

        <section className="container dispatches" id="dispatches">
          <div className="dispatch-heading">
            <div>
              <SectionLabel>ANALYSIS & STRATEGY</SectionLabel>
              <h2>Curated Thought Leadership</h2>
            </div>
            <span>DISPATCHES Nº 142 — Nº 147</span>
          </div>
          <div className="dispatch-grid">
            {journalCards.map(([category, meta, title, copy, author, image]) => (
              <article className="dispatch-card" key={title}>
                <div className="dispatch-image">
                  <img src={image} alt="" />
                  <span>{meta}</span>
                </div>
                <div className="dispatch-copy">
                  <SectionLabel>{category}</SectionLabel>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <div>
                    <small>{author}</small>
                    <a href="#dispatches">Read →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container report">
          <div className="report-copy">
            <SectionLabel>ANNUAL FLAGSCALE RESEARCH REPORT · 2025 EDITION</SectionLabel>
            <h2>The 2025 African Media & Influence Landscape Report</h2>
            <p className="body-copy">
              Our definitive 48-page executive intelligence dossier examining 1,200 pan-African media outlets, 300 tier-one journalists, and corporate communication spends across Nigeria, Kenya, South Africa, Ghana, and Senegal.
            </p>
            <div className="report-stats">
              <div>
                <small>SYNDICATION CONVERGENCE</small>
                <strong>74%</strong>
                <p>Of top tier newsrooms now syndicate through sovereign and regional editorial wires rather than Western agencies.</p>
              </div>
              <div>
                <small>CREATOR COMMERCIAL IMPACT</small>
                <strong>$1.2B</strong>
                <p>Estimated addressable brand communication reach captured by vetted cultural tastemakers and private intellectual channels.</p>
              </div>
            </div>
            <a className="button dark" href="#newsletter">
              ↓ &nbsp; Download Executive Intelligence Dossier (PDF) →
            </a>
            <small className="format">FORMAT: 48-PAGE EXECUTIVE PDF (14.2 MB)</small>
          </div>
          <div className="report-cover">
            <div>
              <small>FLAGSCALE RESEARCH &nbsp;&nbsp; CONFIDENTIAL</small>
              <hr />
              <h3>AFRICAN MEDIA INTELLIGENCE REPORT</h3>
              <span>ANNUAL STRATEGIC AUDIT 2025</span>
              <div className="chart">╱╲__╱╲___╱╲╱</div>
              <small>FLAGSCALE PR BISTRO LABS &nbsp;&nbsp; VOL. 09</small>
            </div>
          </div>
        </section>

        <section className="container newsletter" id="newsletter">
          <div>
            <SectionLabel>✉ &nbsp; RESTRICTED EXECUTIVE CIRCULATION</SectionLabel>
            <h2>The Monthly Dispatch</h2>
            <p>African Strategic Intelligence in Your Inbox — Strictly vetted content. Zero marketing noise. Delivered the first Thursday of every calendar month.</p>
          </div>
          {subscribed ? (
            <div className="subscribed">
              <strong>✓ &nbsp; DISPATCH REQUEST RECEIVED</strong>
              <p>We have added your address to our vetted circulation ledger. Issue Nº 09 will transmit shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
              }}
            >
              <div>
                <input required type="email" placeholder="ENTER CORPORATE WORK EMAIL" aria-label="Corporate Email Address" />
                <button className="button dark" type="submit">Subscribe →</button>
              </div>
              <small>GDPR & NDPR COMPLIANT ARCHIVE &nbsp;&nbsp; UNSUBSCRIBE AT ANY TIME</small>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
