import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Copy, Diamond, Share2 } from 'lucide-react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import SectionLabel from '../components/SectionLabel'
import { navigate } from '../utils/navigation'
import SmartImage from '../components/SmartImage'
import { articles } from '../data/articles'

export default function ArticlePage({ slug }) {
  const [copied, setCopied] = useState(false)

  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="site article-page">
        <SiteHeader active="journal" />
        <main className="article-main container not-found-container" id="main" tabIndex={-1}>
          <SectionLabel>THE FLAGSCALE JOURNAL</SectionLabel>
          <h1>Article Not Found</h1>
          <p className="lead">The dispatch you are seeking does not exist or may have been archived.</p>
          <a
            className="button dark"
            href="/journal"
            onClick={(e) => {
              e.preventDefault()
              navigate('/journal')
            }}
          >
            <ArrowLeft size={16} /> Return to The Journal
          </a>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const currentUrl = encodeURIComponent(window.location.href)
  const currentTitle = encodeURIComponent(article.title)

  return (
    <div className="site article-page">
      <SiteHeader active="journal" />

      <main className="article-main" id="main" tabIndex={-1}>
        {/* TOP BREADCRUMB */}
        <div className="article-breadcrumb container">
          <a
            className="back-journal-link"
            href="/journal"
            onClick={(e) => {
              e.preventDefault()
              navigate('/journal')
            }}
          >
            <ArrowLeft size={15} /> The Journal
          </a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-category">{article.category}</span>
        </div>

        {/* ARTICLE HEADER */}
        <header className="article-header container">
          <div className="article-category-badge">
            <SectionLabel>{article.category}</SectionLabel>
          </div>

          <h1 className="article-headline">{article.title}</h1>

          <p className="article-intro-summary">{article.summary}</p>

          <div className="article-byline-bar">
            <span className="byline-author">By <strong>{article.author}</strong></span>
            <span className="byline-dot">·</span>
            <span className="byline-date">{article.date}</span>
            <span className="byline-dot">·</span>
            <span className="byline-readtime">{article.readTime}</span>
          </div>
        </header>

        {/* FEATURE IMAGE */}
        <section className="article-featured-image-section container">
          <div className="article-image-frame">
            <SmartImage src={article.image} alt="" width={1600} height={900} priority />
            {article.caption && (
              <figcaption className="article-image-caption">
                <span>{article.caption}</span>
                <small>Flagscale Journal Archive</small>
              </figcaption>
            )}
          </div>
        </section>

        {/* THE STORY (EDITORIAL BODY) */}
        <section className="article-content-section container">
          <div className="article-content-grid">
            <div className="article-body">
              <div className="story-label">
                <SectionLabel>THE STORY</SectionLabel>
              </div>

              {/* Opening paragraph */}
              <p className="story-lead-paragraph">{article.storyIntro}</p>

              {/* Body sections */}
              {article.sections &&
                article.sections.map((section, idx) => (
                  <div className="story-section" key={idx}>
                    <h2>{section.heading}</h2>
                    <p>{section.content}</p>
                  </div>
                ))}

              {/* THE TAKEAWAY */}
              <div className="article-takeaway-box">
                <div className="takeaway-header">
                  <span className="takeaway-badge">THE TAKEAWAY</span>
                  <span className="takeaway-dot">
                    <Diamond size={14} aria-hidden="true" />
                  </span>
                </div>
                <p className="takeaway-text">{article.takeaway}</p>
              </div>

              {/* SHARE THIS STORY */}
              <div className="article-share-bar">
                <span className="share-title">
                  <Share2 size={16} /> SHARE THIS STORY
                </span>
                <div className="share-links">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-link"
                  >
                    LinkedIn
                  </a>
                  <span className="share-sep">·</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-link"
                  >
                    Facebook
                  </a>
                  <span className="share-sep">·</span>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="share-link"
                  >
                    X
                  </a>
                  <span className="share-sep">·</span>
                  <button
                    className="copy-link-btn"
                    onClick={handleCopyLink}
                    type="button"
                    aria-label={copied ? 'Link copied to clipboard' : 'Copy link to this story'}
                  >
                    {copied ? (
                      <>
                        <Check size={13} color="var(--ochre)" /> Copied Link
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="article-sidebar">
              <div className="sidebar-card author-bio-card">
                <SectionLabel>ABOUT THE AUTHOR</SectionLabel>
                <h3>{article.author}</h3>
                <p>
                  Contributing strategist and editorial correspondent for The Flagscale Journal, analyzing institutional communications and Pan-African commerce.
                </p>
              </div>

              <div className="sidebar-card editorial-note-card">
                <SectionLabel>EDITORIAL DESK</SectionLabel>
                <h4>Serving Anglophone & Francophone Africa</h4>
                <p>
                  Flagscale PR examines the communications infrastructure bridging businesses across 14 continental hubs.
                </p>
                <a
                  className="arrow-link"
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/contact')
                  }}
                >
                  Direct Dispatch <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* HAVE A STORY TO SHARE? */}
        <section className="story-pitch-section container">
          <div className="story-pitch-card">
            <div>
              <SectionLabel>SUBMISSIONS & IDEAS</SectionLabel>
              <h2>Have a story to share?</h2>
              <p>
                We welcome expert commentary, founder retrospectives, and industry analysis from practitioners across African enterprise.
              </p>
            </div>
            <a
              className="button dark"
              href="/contact"
              onClick={(e) => {
                e.preventDefault()
                navigate('/contact')
              }}
            >
              Contact the Editorial Team <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* MORE FROM THE JOURNAL */}
        <section className="more-journal-section container">
          <div className="section-heading">
            <div>
              <SectionLabel>CONTINUE READING</SectionLabel>
              <h2>More from The Journal</h2>
            </div>
            <a
              className="arrow-link"
              href="/journal"
              onClick={(e) => {
                e.preventDefault()
                navigate('/journal')
              }}
            >
              View All Stories <ArrowRight size={14} />
            </a>
          </div>

          <div className="more-grid">
            {relatedArticles.map((rel) => (
              <article className="more-card" key={rel.id}>
                <a
                  className="more-image-wrap"
                  href={`/journal/${rel.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/journal/${rel.slug}`)
                  }}
                >
                  <SmartImage src={rel.image} alt="" width={900} height={600} />
                  <span className="more-category">{rel.category}</span>
                </a>
                <div className="more-body">
                  <small className="more-meta">{rel.readTime}</small>
                  <h3>
                    <a
                      href={`/journal/${rel.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/journal/${rel.slug}`)
                      }}
                    >
                      {rel.title}
                    </a>
                  </h3>
                  <p>{rel.summary}</p>
                  <a
                    className="arrow-link"
                    href={`/journal/${rel.slug}`}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/journal/${rel.slug}`)
                    }}
                  >
                    Read Story <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
