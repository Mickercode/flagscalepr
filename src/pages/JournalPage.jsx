import { useState } from 'react'
import { ArrowRight, Check, Diamond } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'
import { navigate } from '../utils/navigation'
import SmartImage from '../components/SmartImage'
import { articles, categories, editorialThemes } from '../data/articles'

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('All Stories')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featuredArticle = articles.find((a) => a.featured) || articles[0]
  const latestArticles = articles.filter(
    (a) => activeCategory === 'All Stories' || a.category === activeCategory
  )

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <div className="site journal-page">
      <SiteHeader active="journal" />

      <main className="journal-main" id="main" tabIndex={-1}>
        {/* HERO SECTION */}
        <section className="journal-hero container">
          <div className="journal-hero-top">
            <SectionLabel>THE FLAGSCALE JOURNAL</SectionLabel>
            <span className="corridor-badge">Perspectives & Dispatches</span>
          </div>

          <div className="journal-hero-content">
            <h1>Ideas worth talking about.</h1>
            <p className="lead">
              Perspectives on business, entrepreneurship, public relations, leadership, and the people shaping Africa’s commercial future.
            </p>
            <p className="journal-hero-sub">
              We explore the stories, decisions, and ideas influencing how African businesses grow, communicate, and connect with the world.
            </p>
          </div>

          {/* CATEGORY NAVIGATION */}
          <div className="journal-category-nav">
            <div className="category-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="category-counter" role="status" aria-live="polite">
              Showing {latestArticles.length} {latestArticles.length === 1 ? 'Story' : 'Stories'}
            </span>
          </div>
        </section>

        {/* FEATURED STORY */}
        {featuredArticle && activeCategory === 'All Stories' && (
          <section className="featured-story-section container">
            <article className="featured-card">
              <a
                className="featured-media"
                href={`/journal/${featuredArticle.slug}`}
                aria-label={`Read the featured story: ${featuredArticle.title}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/journal/${featuredArticle.slug}`)
                }}
              >
                <SmartImage src={featuredArticle.image} alt="" width={1280} height={800} priority />
                <span className="featured-badge">FEATURED</span>
              </a>

              <div className="featured-body">
                <div className="featured-meta">
                  <SectionLabel>{featuredArticle.category}</SectionLabel>
                  <span className="read-time">{featuredArticle.readTime}</span>
                </div>

                <h2>{featuredArticle.title}</h2>
                <p className="featured-summary">{featuredArticle.summary}</p>

                <div className="featured-footer">
                  <span className="author-byline">
                    By {featuredArticle.author} · {featuredArticle.date}
                  </span>
                  <a
                    className="button dark"
                    href={`/journal/${featuredArticle.slug}`}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/journal/${featuredArticle.slug}`)
                    }}
                  >
                    Read the Story <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* LATEST STORIES */}
        <section className="latest-stories-section container">
          <div className="section-heading">
            <div>
              <SectionLabel>EDITORIAL ARCHIVE</SectionLabel>
              <h2>Latest Stories</h2>
            </div>
            <p>{activeCategory === 'All Stories' ? 'All Recent Dispatches' : activeCategory}</p>
          </div>

          <div className="stories-grid">
            {latestArticles.map((article) => (
              <article className="story-card" key={article.id}>
                <a
                  className="story-image-wrap"
                  href={`/journal/${article.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/journal/${article.slug}`)
                  }}
                >
                  <SmartImage src={article.image} alt="" width={900} height={600} />
                  <span className="story-category-tag">{article.category}</span>
                </a>

                <div className="story-card-body">
                  <div className="story-meta">
                    <span className="story-author">{article.author}</span>
                    <span className="story-dot">•</span>
                    <span className="story-time">{article.readTime}</span>
                  </div>

                  <h3>
                    <a
                      href={`/journal/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/journal/${article.slug}`)
                      }}
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="story-excerpt">{article.summary}</p>

                  <div className="story-footer">
                    <a
                      className="arrow-link"
                      href={`/journal/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/journal/${article.slug}`)
                      }}
                    >
                      Read Story <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EDITORIAL DIRECTION */}
        <section className="editorial-direction-section">
          <div className="container">
            <div className="direction-header">
              <SectionLabel>EDITORIAL DIRECTION</SectionLabel>
              <h2>The Journal will cover four broad themes:</h2>
              <p>Core pillars steering our research, dispatches, and executive conversations.</p>
            </div>

            <div className="themes-grid">
              {editorialThemes.map((item) => (
                <div className="theme-card" key={item.theme}>
                  <div className="theme-top">
                    <span className="theme-number">{item.number}</span>
                    <span className="theme-dot">
                      <Diamond size={14} aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{item.theme}</h3>
                  <p>{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTRIBUTORS */}
        <section className="contributors-section container">
          <div className="contributors-card">
            <div className="contributors-copy">
              <SectionLabel>CONTRIBUTORS</SectionLabel>
              <h2>Have a perspective worth sharing?</h2>
              <p>
                We welcome relevant story ideas, expert contributions, and interview suggestions from people with useful perspectives on African business and communications.
              </p>
            </div>
            <div className="contributors-action">
              <a
                className="button gold-button"
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/contact')
                }}
              >
                Contact the Editorial Team <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* JOURNAL SUBSCRIPTION */}
        <section className="subscription-section container">
          <div className="subscription-card">
            <div className="subscription-copy">
              <SectionLabel>JOURNAL SUBSCRIPTION</SectionLabel>
              <h2>Good stories, straight to your inbox.</h2>
              <p>Get occasional updates when we publish new stories and perspectives.</p>
            </div>

            <div className="subscription-form-wrap">
              {subscribed ? (
                <div className="subscribed-success" role="status" aria-live="polite">
                  <Check size={20} color="var(--ochre-text)" />
                  <div>
                    <strong>You are subscribed.</strong>
                    <p>Thank you for joining our circulation ledger. You will receive new stories as they publish.</p>
                  </div>
                </div>
              ) : (
                <form className="subscription-form" onSubmit={handleSubscribe}>
                  <div className="subscription-input-group">
                    <input
                      type="email"
                      required
                      placeholder="ENTER YOUR EMAIL ADDRESS"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Email Address for Journal updates"
                    />
                    <button className="button dark" type="submit">
                      Subscribe <ArrowRight size={15} />
                    </button>
                  </div>
                  <small className="consent-text">
                    By subscribing, you agree to receive occasional updates. You can unsubscribe at any time.
                  </small>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
