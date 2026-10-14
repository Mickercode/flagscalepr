import { ArrowRight } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'
import { navigate } from '../utils/navigation'

export default function AboutPage() {
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
                <a
                  className="button dark"
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/contact')
                  }}
                >
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
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
