import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'
import LinkArrow from '../components/LinkArrow'
import SmartImage from '../components/SmartImage'
import { work, clients, capabilities, stats } from '../data/site'
import { navigate } from '../utils/navigation'



// The work grid runs on a 12-column track: cards alternate 7/5 then 5/7, so an
// even count always fills its rows. A trailing odd card spans the full width
// instead of orphaning next to seven empty columns.
function workCardClass(index, total) {
  const isTrailingOdd = index === total - 1 && total % 2 === 1 && total > 1
  return isTrailingOdd ? 'work-card work-wide' : `work-card work-${index}`
}

export default function HomePage() {
  return (
    <div className="site">
      <SiteHeader active="work" />
      <main id="main" tabIndex={-1}>
        <section className="hero container" id="top">
          <div className="hero-copy">
            <SectionLabel>Public Relations for African SMEs</SectionLabel>
            <h1>Empower your brand’s voice. <em>Shine and thrive.</em></h1>
            <p className="lead">
              Data-driven, people-centric PR solutions helping African SMEs turn visibility into revenue, partnerships, and long-term contracts across Anglophone and Francophone Africa.
            </p>
            <div className="hero-buttons">
              <a className="button dark" href="#work">Explore Our Work <ArrowRight size={16} /></a>
              <a
                className="play-button"
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/contact')
                }}
              >
                <span><ArrowRight size={13} /></span> Start a Conversation
              </a>
            </div>
            <div className="stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-image">
            <SmartImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmC70-u_4xNKZAYXi-2LXlLrbX2hUgl3eFxDaaNjnBEv7wMKV-3hDDi57tmG-8Vj5UD--H5A5SFQItnB5Rrb3WsxkIUIsg47TOyiPXYgvqFo3Mhsy7oNIRf-JWjL3eN0qn_uLL3m-OT1Qfwm86HHOEil3PeiLiXUPlwczxZTnPgOAXpcSQTr9dCGD7F9SBCKCFQ3sPUim-RzeKlvaYS-nFkUw6l_CkSHNA6bGtp7wBXJMoi5a6Fntz"
              alt="Flagscale PR strategist at work in the Lagos studio"
              width={900}
              height={1200}
              priority
            />
            <div className="dossier"><b>People · Passion</b><span>Professionalism</span></div>
            <div className="image-caption">
              <span><b>Serving</b><strong>Anglophone / Francophone Africa</strong></span>
              <small>FSPR · 2025</small>
            </div>
          </div>
        </section>

        <section className="brand-strip">
          <div className="container strip-inner">
            <SectionLabel>Building with African Businesses</SectionLabel>
            <div className="brand-types">
              <span>Startups</span><i>•</i><span>SMEs</span><i>•</i><span>Corporate Brands</span><i>•</i><span>Founders</span><i>•</i><span>Institutions</span>
            </div>
          </div>
        </section>

        <section className="client-strip">
          <div className="container client-strip-inner">
            <SectionLabel>Clients We’ve Worked With</SectionLabel>
            <div>
              {clients.map((client, i) => (
                <Fragment key={client.name}>
                  {i > 0 && <i>•</i>}
                  {client.link ? (
                    <a href={client.link} target="_blank" rel="noreferrer">
                      {client.name}
                    </a>
                  ) : (
                    <span>{client.name}</span>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="thesis container">
          <div className="number-label">01 / The Thesis</div>
          <div>
            <h2>People first. <br /><em>Business success follows.</em></h2>
            <p className="lead">
              We take time to understand your business, values, goals, and target audience, then build communications that earn trust and create opportunity.
            </p>
          </div>
        </section>

        <section className="work container" id="work">
          <div className="section-heading">
            <div>
              <SectionLabel>02 / Curated Portfolio</SectionLabel>
              <h2>Selected Work</h2>
            </div>
            <p>Dispatches across Lagos, London, Nairobi & New York</p>
          </div>
          <div className="work-grid">
            {work.map((item, i) => (
              <article className={workCardClass(i, work.length)} key={item.name}>
                <div className="work-photo">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    width={item.width}
                    height={item.height}
                  />
                  <span>{item.tag}</span>
                </div>
                <div className="work-body">
                  <SectionLabel>{item.services}</SectionLabel>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                  <LinkArrow href={item.link}>View Case Study</LinkArrow>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities" id="capabilities">
          <div className="container capabilities-inner">
            <div>
              <SectionLabel>03 / Capabilities</SectionLabel>
              <h2>We build<br /><em>reputation.</em></h2>
            </div>
            <div className="capability-content">
              <div className="capability-tags">
                {capabilities.map((item, i) => (
                  <span className={i === 1 ? 'selected' : i === 4 ? 'accent' : ''} key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <LinkArrow href="/services">View Services</LinkArrow>
            </div>
          </div>
        </section>

        <section className="mandate">
          <div className="container mandate-inner">
            <div>
              <SectionLabel>04 / Pan-African Mandate</SectionLabel>
              <h2>Africa is our market.</h2>
              <p>
                From Lagos to Accra, Nairobi to Johannesburg, Flagscale helps ambitious businesses communicate across markets, cultures and communities. Serving Anglophone & Francophone Africa.
              </p>
            </div>
            <div className="coverage">
              <small>Primary Regional Coverage</small>
              {[
                ['Nigeria', 'West Hub • Lagos'],
                ['Ghana', 'Accra Node'],
                ['Kenya', 'East Hub • Nairobi'],
                ['South Africa', 'Johannesburg • Cape Town'],
                ['Francophone Africa', 'Abidjan • Dakar • Douala'],
              ].map(([a, b]) => (
                <div key={a}>
                  <strong>{a}</strong>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="approach container" id="about">
          <div className="section-heading">
            <div>
              <SectionLabel>05 / Philosophy</SectionLabel>
              <h2>People. Passion. Professionalism.</h2>
            </div>
          </div>
          <div className="pillars">
            {[
              ['01', 'People', 'We understand the people behind every market, message and relationship. Authentic connection precedes impactful conversion.', 'Cultural Intelligence'],
              ['02', 'Passion', 'We find the stories worth telling and make people care about them. We treat African enterprise with the global narrative reverence it commands.', 'Narrative Mastery'],
              ['03', 'Professionalism', 'We combine strategic thinking, strong relationships and disciplined execution. Rigor in governance, diplomacy in corporate positioning.', 'Strategic Rigor'],
            ].map(([n, t, copy, foot]) => (
              <article key={n}>
                <strong className="pillar-number">{n}</strong>
                <h3>{t}</h3>
                <p>{copy}</p>
                <small>{foot}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="journal" id="journal">
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel>06 / Editorial Dispatch</SectionLabel>
                <h2>The Flagscale Journal</h2>
              </div>
              <p className="journal-intro">Ideas shaping business, communication and culture across Africa.</p>
            </div>
            <div className="journal-grid">
              {[
                ['The Journal', '08 Min Read', 'Why African businesses need to think beyond visibility', 'Read Story'],
                ['The Podcast', 'Episode 24', 'Conversations with the people building Africa', 'Listen Now'],
                ['Insights', 'Quarterly Brief', 'The changing relationship between brands, media and influence', 'Read Insight'],
              ].map(([tag, time, title, action], i) => (
                <article key={title}>
                  <div>
                    <div className="journal-meta">
                      <b className={i === 1 ? 'gold' : ''}>{tag}</b>
                      <span>{time}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>
                      {i === 0
                        ? 'Moving past vanity metrics toward institutional durability and real regulatory authority in expanding consumer economies.'
                        : i === 1
                        ? 'Unfiltered dialogues with unicorn founders, sovereign fund managers, and cultural curators reshaping continental infrastructure.'
                        : 'How decentralised media houses and creator economies are challenging traditional legacy public relations across West Africa.'}
                    </p>
                  </div>
                  <LinkArrow href="/journal">{action}</LinkArrow>
                </article>
              ))}
            </div>
            <div className="studio">
              <div>
                <SectionLabel>Studio Production</SectionLabel>
                <h3>Flagscale Studio — Victoria Island</h3>
                <p>
                  A dedicated production space for podcasts, broadcast interviews, executive thought leadership, and high-fidelity brand storytelling in the heart of Lagos.
                </p>
              </div>
              <a className="button gold-button" href="mailto:contact@flagscalepr.com">
                Book Studio Session <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="contact container" id="contact">
          <SectionLabel>07 / Call to Authority</SectionLabel>
          <h2>Be seen.<br /><em>Be trusted.</em><br />Be remembered.</h2>
          <p className="lead">Flagscale PR — Public Relations & Strategic Communications</p>
          <small>Serving Anglophone & Francophone Africa</small>
          <a
            className="button dark"
            href="/contact"
            onClick={(e) => {
              e.preventDefault()
              navigate('/contact')
            }}
          >
            Start a Conversation <ArrowRight size={16} />
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
