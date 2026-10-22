import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import { navigate } from '../utils/navigation'
import bundledSite from '../data/site.json'
import bundledArticles from '../data/articles.json'

const TABS = [
  ['content', 'Content'],
  ['inventory', 'Inventory & Gaps'],
  ['submissions', 'Submissions'],
]

// Image hosts that have already proven unstable on this site. The homepage hero
// was served from one of these and started returning 400.
const EPHEMERAL_HOST = 'lh3.googleusercontent.com'

const clone = (value) => JSON.parse(JSON.stringify(value))

function move(list, from, to) {
  if (to < 0 || to >= list.length) return list
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

/* ------------------------------------------------------------------ fields */

function Field({ label, value, onChange, type = 'text', rows, hint }) {
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}-${Math.random().toString(36).slice(2, 7)}`
  return (
    <label className="admin-field" htmlFor={id}>
      <span>{label}</span>
      {rows ? (
        <textarea id={id} rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          id={id}
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        />
      )}
      {hint && <small>{hint}</small>}
    </label>
  )
}

function Collapsible({ title, badge, children, onMoveUp, onMoveDown, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={open ? 'admin-item open' : 'admin-item'}>
      <div className="admin-item-head">
        <button type="button" className="admin-item-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
          <strong>{title || <em>Untitled</em>}</strong>
          {badge && <span className="admin-badge">{badge}</span>}
        </button>
        <div className="admin-item-actions">
          <button type="button" onClick={onMoveUp} aria-label={`Move ${title} up`}>↑</button>
          <button type="button" onClick={onMoveDown} aria-label={`Move ${title} down`}>↓</button>
          <button type="button" className="danger" onClick={onDelete} aria-label={`Delete ${title}`}>
            <Trash2 size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && <div className="admin-item-body">{children}</div>}
    </div>
  )
}

/* ----------------------------------------------------------------- content */

function ContentTab({ site, articles, setSite, setArticles, readOnly }) {
  const patchWork = (i, key, v) => {
    const work = [...site.work]
    work[i] = { ...work[i], [key]: v }
    setSite({ ...site, work })
  }
  const patchArticle = (i, key, v) => {
    const list = [...articles.articles]
    list[i] = { ...list[i], [key]: v }
    setArticles({ ...articles, articles: list })
  }

  return (
    <fieldset className={readOnly ? 'admin-content is-readonly' : 'admin-content'} disabled={readOnly}>
      <section className="admin-group">
        <h3>Hero stats</h3>
        <p className="admin-group-note">
          Shown under the homepage headline. These drift out of date as work is added.
        </p>
        <div className="admin-stat-row">
          {site.stats.map((stat, i) => (
            <div key={i} className="admin-stat">
              <Field
                label="Value"
                value={stat.value}
                onChange={(v) => {
                  const stats = [...site.stats]
                  stats[i] = { ...stats[i], value: v }
                  setSite({ ...site, stats })
                }}
              />
              <Field
                label="Label"
                value={stat.label}
                onChange={(v) => {
                  const stats = [...site.stats]
                  stats[i] = { ...stats[i], label: v }
                  setSite({ ...site, stats })
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="admin-group">
        <div className="admin-group-head">
          <h3>Selected work ({site.work.length})</h3>
          <button
            type="button"
            className="admin-add"
            onClick={() =>
              setSite({
                ...site,
                work: [
                  ...site.work,
                  { name: 'NEW CASE STUDY', tag: '', services: '', copy: '', image: '', width: 1200, height: 800, link: '' },
                ],
              })
            }
          >
            <Plus size={14} aria-hidden="true" /> Add case study
          </button>
        </div>
        <p className="admin-group-note">
          The grid alternates 7/5 then 5/7 columns across a 12-column track. An even
          count fills its rows; an odd one runs the last card full width.
        </p>
        {site.work.map((item, i) => (
          <Collapsible
            key={i}
            title={item.name}
            badge={item.tag}
            onMoveUp={() => setSite({ ...site, work: move(site.work, i, i - 1) })}
            onMoveDown={() => setSite({ ...site, work: move(site.work, i, i + 1) })}
            onDelete={() => setSite({ ...site, work: site.work.filter((_, j) => j !== i) })}
          >
            <Field label="Name" value={item.name} onChange={(v) => patchWork(i, 'name', v)} />
            <Field label="Tag" value={item.tag} onChange={(v) => patchWork(i, 'tag', v)} hint="e.g. Real Estate • Nigeria" />
            <Field label="Services" value={item.services} onChange={(v) => patchWork(i, 'services', v)} />
            <Field label="Copy" value={item.copy} rows={3} onChange={(v) => patchWork(i, 'copy', v)} />
            <Field label="Image URL or path" value={item.image} onChange={(v) => patchWork(i, 'image', v)} hint="Local files live in public/work/" />
            <div className="admin-pair">
              <Field label="Width" type="number" value={item.width} onChange={(v) => patchWork(i, 'width', v)} />
              <Field label="Height" type="number" value={item.height} onChange={(v) => patchWork(i, 'height', v)} />
            </div>
            <Field label="Article link" value={item.link} onChange={(v) => patchWork(i, 'link', v)} />
          </Collapsible>
        ))}
      </section>

      <section className="admin-group">
        <div className="admin-group-head">
          <h3>Clients ({site.clients.length})</h3>
          <button
            type="button"
            className="admin-add"
            onClick={() => setSite({ ...site, clients: [...site.clients, { name: '', link: '' }] })}
          >
            <Plus size={14} aria-hidden="true" /> Add client
          </button>
        </div>
        {site.clients.map((client, i) => (
          <div key={i} className="admin-row">
            <Field
              label="Name"
              value={client.name}
              onChange={(v) => {
                const clients = [...site.clients]
                clients[i] = { ...clients[i], name: v }
                setSite({ ...site, clients })
              }}
            />
            <Field
              label="Link (optional)"
              value={client.link}
              onChange={(v) => {
                const clients = [...site.clients]
                clients[i] = { ...clients[i], link: v }
                setSite({ ...site, clients })
              }}
            />
            <button
              type="button"
              className="admin-row-delete danger"
              onClick={() => setSite({ ...site, clients: site.clients.filter((_, j) => j !== i) })}
              aria-label={`Delete ${client.name || 'client'}`}
            >
              <Trash2 size={14} aria-hidden="true" />
            </button>
          </div>
        ))}
      </section>

      <section className="admin-group">
        <div className="admin-group-head">
          <h3>Capabilities ({site.capabilities.length})</h3>
          <button
            type="button"
            className="admin-add"
            onClick={() => setSite({ ...site, capabilities: [...site.capabilities, ''] })}
          >
            <Plus size={14} aria-hidden="true" /> Add
          </button>
        </div>
        <div className="admin-chiplist">
          {site.capabilities.map((cap, i) => (
            <div key={i} className="admin-chip">
              <input
                value={cap}
                aria-label={`Capability ${i + 1}`}
                onChange={(e) => {
                  const capabilities = [...site.capabilities]
                  capabilities[i] = e.target.value
                  setSite({ ...site, capabilities })
                }}
              />
              <button
                type="button"
                onClick={() => setSite({ ...site, capabilities: site.capabilities.filter((_, j) => j !== i) })}
                aria-label={`Remove ${cap}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-group">
        <h3>Journal articles ({articles.articles.length})</h3>
        <p className="admin-group-note">
          Only one article should be featured; the Journal page shows the first it finds.
        </p>
        {articles.articles.map((article, i) => (
          <Collapsible
            key={article.id ?? i}
            title={article.title}
            badge={article.featured ? 'Featured' : article.category}
            onMoveUp={() => setArticles({ ...articles, articles: move(articles.articles, i, i - 1) })}
            onMoveDown={() => setArticles({ ...articles, articles: move(articles.articles, i, i + 1) })}
            onDelete={() =>
              setArticles({ ...articles, articles: articles.articles.filter((_, j) => j !== i) })
            }
          >
            <Field label="Title" value={article.title} onChange={(v) => patchArticle(i, 'title', v)} />
            <Field label="Slug" value={article.slug} onChange={(v) => patchArticle(i, 'slug', v)} hint="Becomes /journal/<slug>" />
            <div className="admin-pair">
              <Field label="Author" value={article.author} onChange={(v) => patchArticle(i, 'author', v)} />
              <Field label="Category" value={article.category} onChange={(v) => patchArticle(i, 'category', v)} />
            </div>
            <div className="admin-pair">
              <Field label="Date" value={article.date} onChange={(v) => patchArticle(i, 'date', v)} />
              <Field label="Read time" value={article.readTime} onChange={(v) => patchArticle(i, 'readTime', v)} />
            </div>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={Boolean(article.featured)}
                onChange={(e) => {
                  // featured is exclusive: turning one on turns the others off
                  const list = articles.articles.map((a, j) => ({ ...a, featured: e.target.checked && j === i }))
                  setArticles({ ...articles, articles: list })
                }}
              />
              Feature this article on the Journal page
            </label>
            <Field label="Summary" rows={3} value={article.summary} onChange={(v) => patchArticle(i, 'summary', v)} />
            <Field label="Image URL" value={article.image} onChange={(v) => patchArticle(i, 'image', v)} />
            <Field label="Caption" value={article.caption} onChange={(v) => patchArticle(i, 'caption', v)} />
            <Field label="Story intro" rows={3} value={article.storyIntro} onChange={(v) => patchArticle(i, 'storyIntro', v)} />
            <div className="admin-sections">
              <div className="admin-group-head">
                <h4>Body sections ({article.sections?.length || 0})</h4>
                <button
                  type="button"
                  className="admin-add"
                  onClick={() =>
                    patchArticle(i, 'sections', [...(article.sections || []), { heading: '', content: '' }])
                  }
                >
                  <Plus size={14} aria-hidden="true" /> Add section
                </button>
              </div>
              {(article.sections || []).map((sec, k) => (
                <div key={k} className="admin-subsection">
                  <Field
                    label={`Heading ${k + 1}`}
                    value={sec.heading}
                    onChange={(v) => {
                      const sections = [...article.sections]
                      sections[k] = { ...sections[k], heading: v }
                      patchArticle(i, 'sections', sections)
                    }}
                  />
                  <Field
                    label="Content"
                    rows={4}
                    value={sec.content}
                    onChange={(v) => {
                      const sections = [...article.sections]
                      sections[k] = { ...sections[k], content: v }
                      patchArticle(i, 'sections', sections)
                    }}
                  />
                  <button
                    type="button"
                    className="danger admin-sub-delete"
                    onClick={() => patchArticle(i, 'sections', article.sections.filter((_, j) => j !== k))}
                  >
                    <Trash2 size={13} aria-hidden="true" /> Remove section
                  </button>
                </div>
              ))}
            </div>
            <Field label="Takeaway" rows={3} value={article.takeaway} onChange={(v) => patchArticle(i, 'takeaway', v)} />
          </Collapsible>
        ))}
      </section>
    </fieldset>
  )
}

/* --------------------------------------------------------------- inventory */

function buildGaps(site, articles) {
  const gaps = []
  const push = (severity, area, message) => gaps.push({ severity, area, message })

  site.work.forEach((w) => {
    if (!w.image) push('high', 'Work', `"${w.name}" has no image`)
    if (!w.link) push('high', 'Work', `"${w.name}" has no case-study link`)
    if (!w.width || !w.height) push('medium', 'Work', `"${w.name}" has no intrinsic dimensions, which causes layout shift`)
    if (w.image && w.image.includes(EPHEMERAL_HOST)) {
      push('high', 'Work', `"${w.name}" uses an ephemeral ${EPHEMERAL_HOST} image that can expire`)
    }
  })

  articles.articles.forEach((a) => {
    if (!a.image) push('high', 'Journal', `"${a.title}" has no image`)
    if (a.image && a.image.includes(EPHEMERAL_HOST)) {
      push('high', 'Journal', `"${a.title}" uses an ephemeral ${EPHEMERAL_HOST} image that can expire`)
    }
    if (!a.sections || a.sections.length === 0) push('medium', 'Journal', `"${a.title}" has no body sections`)
    if (!a.caption) push('low', 'Journal', `"${a.title}" has no image caption`)
  })

  const featured = articles.articles.filter((a) => a.featured)
  if (featured.length === 0) push('medium', 'Journal', 'No article is marked featured')
  if (featured.length > 1) push('medium', 'Journal', `${featured.length} articles are marked featured; only the first is shown`)

  // the stat that goes stale every time work is added
  const placements = site.stats.find((s) => /placement/i.test(s.label))
  if (placements && Number(placements.value) !== site.work.length) {
    push('high', 'Stats', `"${placements.label}" reads ${placements.value} but there are ${site.work.length} case studies`)
  }
  const services = site.stats.find((s) => /core service/i.test(s.label))
  if (services && Number(services.value) !== site.capabilities.length) {
    push('medium', 'Stats', `"${services.label}" reads ${services.value} but there are ${site.capabilities.length} capabilities`)
  }

  const unlinked = site.clients.filter((c) => !c.link).length
  if (unlinked) push('low', 'Clients', `${unlinked} of ${site.clients.length} clients have no link to proof of work`)

  push('medium', 'Footer', 'Privacy Policy and Terms of Use still point at dead #privacy / #terms anchors')

  return gaps
}

function InventoryTab({ site, articles, apiAvailable }) {
  const [health, setHealth] = useState(null)
  const [checking, setChecking] = useState(false)
  const gaps = useMemo(() => buildGaps(site, articles), [site, articles])

  const runChecks = useCallback(async () => {
    setChecking(true)
    try {
      const res = await fetch('/api/health')
      setHealth(await res.json())
    } catch {
      setHealth({ error: 'Link checking needs the dev server.' })
    } finally {
      setChecking(false)
    }
  }, [])

  const counts = [
    ['Case studies', site.work.length],
    ['Journal articles', articles.articles.length],
    ['Clients', site.clients.length],
    ['Capabilities', site.capabilities.length],
    ['Categories', articles.categories.length],
    ['Editorial themes', articles.editorialThemes.length],
  ]

  const bySeverity = { high: 0, medium: 0, low: 0 }
  gaps.forEach((g) => { bySeverity[g.severity] += 1 })

  return (
    <div className="admin-inventory">
      <section className="admin-group">
        <h3>Inventory</h3>
        <div className="admin-counts">
          {counts.map(([label, n]) => (
            <div key={label}>
              <strong>{n}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-group">
        <h3>
          Gaps ({gaps.length}) <span className="admin-sev high">{bySeverity.high} high</span>
          <span className="admin-sev medium">{bySeverity.medium} medium</span>
          <span className="admin-sev low">{bySeverity.low} low</span>
        </h3>
        <ul className="admin-gaps">
          {gaps.map((g, i) => (
            <li key={i} className={`admin-gap ${g.severity}`}>
              <AlertTriangle size={14} aria-hidden="true" />
              <span className="admin-gap-area">{g.area}</span>
              <span>{g.message}</span>
            </li>
          ))}
          {gaps.length === 0 && <li className="admin-gap none">Nothing flagged.</li>}
        </ul>
      </section>

      <section className="admin-group">
        <div className="admin-group-head">
          <h3>Outbound links &amp; images</h3>
          <button type="button" className="admin-add" onClick={runChecks} disabled={checking || !apiAvailable}>
            {checking ? <Loader2 size={14} className="spin" aria-hidden="true" /> : <RefreshCw size={14} aria-hidden="true" />}
            {checking ? 'Checking…' : 'Run checks'}
          </button>
        </div>
        {!apiAvailable && <p className="admin-group-note">Live checking needs the dev server.</p>}
        {health?.error && <p className="admin-group-note">{health.error}</p>}
        {health?.results && (
          <>
            <p className="admin-group-note">
              {health.results.filter((r) => r.ok).length} healthy,{' '}
              {health.results.filter((r) => r.inconclusive).length} refused the checker
              (bot protection, not necessarily broken),{' '}
              {health.results.filter((r) => !r.ok && !r.inconclusive).length} broken.
            </p>
            <table className="admin-table">
            <thead>
              <tr><th>Status</th><th>Used by</th><th>URL</th></tr>
            </thead>
            <tbody>
              {health.results
                .slice()
                .sort((a, b) => Number(a.ok) - Number(b.ok))
                .map((r) => (
                  <tr key={r.url} className={r.ok || r.inconclusive ? '' : 'bad'}>
                    <td>
                      <span
                        className={
                          r.ok
                            ? 'admin-pill ok'
                            : r.inconclusive
                            ? 'admin-pill warn'
                            : 'admin-pill bad'
                        }
                        title={
                          r.inconclusive
                            ? 'Refused this checker, not necessarily broken — open it to confirm'
                            : undefined
                        }
                      >
                        {r.status || 'ERR'}
                      </span>
                    </td>
                    <td>{r.sources.join(', ')}</td>
                    <td className="admin-url">
                      <a href={r.url} target="_blank" rel="noreferrer">
                        {r.url.length > 72 ? `${r.url.slice(0, 72)}…` : r.url}
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </div>
  )
}

/* ------------------------------------------------------------- submissions */

function SubmissionsTab({ apiAvailable }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/submissions')
      const data = await res.json()
      setList(data.submissions || [])
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (apiAvailable) load()
    else setLoading(false)
  }, [apiAvailable, load])

  const toggleRead = async (s) => {
    await fetch(`/api/submissions/${s.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !s.read }),
    })
    load()
  }

  const remove = async (s) => {
    await fetch(`/api/submissions/${s.id}`, { method: 'DELETE' })
    load()
  }

  const exportCsv = () => {
    const keys = [...new Set(list.flatMap((s) => Object.keys(s.data)))]
    const head = ['receivedAt', 'kind', ...keys]
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const rows = list.map((s) => [s.receivedAt, s.kind, ...keys.map((k) => s.data[k])].map(esc).join(','))
    const blob = new Blob([[head.join(','), ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flagscale-submissions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!apiAvailable) {
    return (
      <div className="admin-group">
        <h3>Submissions</h3>
        <p className="admin-group-note">
          Capturing enquiries needs somewhere to store them. Running locally they land in
          <code> .admin/submissions.json</code>. For the deployed site, point the forms at a
          real endpoint — see <code>VITE_FORM_ENDPOINT</code> in the README.
        </p>
      </div>
    )
  }

  return (
    <div className="admin-group">
      <div className="admin-group-head">
        <h3>
          Submissions ({list.length})
          {list.some((s) => !s.read) && (
            <span className="admin-badge unread">{list.filter((s) => !s.read).length} unread</span>
          )}
        </h3>
        <div className="admin-head-actions">
          <button type="button" className="admin-add" onClick={load}>
            <RefreshCw size={14} aria-hidden="true" /> Refresh
          </button>
          <button type="button" className="admin-add" onClick={exportCsv} disabled={!list.length}>
            <Download size={14} aria-hidden="true" /> Export CSV
          </button>
        </div>
      </div>

      {loading && <p className="admin-group-note">Loading…</p>}
      {!loading && list.length === 0 && (
        <p className="admin-group-note">
          Nothing yet. Submit the contact or subscribe form and it will appear here.
        </p>
      )}

      {list.map((s) => (
        <div key={s.id} className={s.read ? 'admin-submission read' : 'admin-submission'}>
          <div className="admin-submission-head">
            <span className="admin-badge">{s.kind}</span>
            <time dateTime={s.receivedAt}>{new Date(s.receivedAt).toLocaleString()}</time>
            <div className="admin-item-actions">
              <button type="button" onClick={() => toggleRead(s)}>
                {s.read ? 'Mark unread' : 'Mark read'}
              </button>
              <button type="button" className="danger" onClick={() => remove(s)} aria-label="Delete submission">
                <Trash2 size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
          <dl className="admin-submission-body">
            {Object.entries(s.data).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{String(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------- page */

export default function AdminPage() {
  // Tab lives in the URL so a view can be linked to and survives a refresh.
  const [tab, setTab] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('tab')
    return TABS.some(([key]) => key === requested) ? requested : 'content'
  })

  const selectTab = (key) => {
    setTab(key)
    const url = key === 'content' ? '/admin' : `/admin?tab=${key}`
    window.history.replaceState({}, '', url)
  }
  const [apiAvailable, setApiAvailable] = useState(null)
  const [site, setSite] = useState(() => clone(bundledSite))
  const [articles, setArticles] = useState(() => clone(bundledArticles))
  const [baseline, setBaseline] = useState(() => ({
    site: clone(bundledSite),
    articles: clone(bundledArticles),
  }))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // In production there is no /api, so the request either 404s or returns the
  // SPA shell. Either way it is not JSON, and the dashboard drops to read-only.
  useEffect(() => {
    let cancelled = false
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('no api'))))
      .then((data) => {
        if (cancelled || !data?.site) return
        setSite(data.site)
        setArticles(data.articles)
        setBaseline({ site: clone(data.site), articles: clone(data.articles) })
        setApiAvailable(true)
      })
      .catch(() => !cancelled && setApiAvailable(false))
    return () => {
      cancelled = true
    }
  }, [])

  const dirty = useMemo(
    () =>
      JSON.stringify(site) !== JSON.stringify(baseline.site) ||
      JSON.stringify(articles) !== JSON.stringify(baseline.articles),
    [site, articles, baseline],
  )

  // Warn before losing unsaved edits to a refresh or a closed tab.
  useEffect(() => {
    if (!dirty) return undefined
    const warn = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      for (const [which, payload] of [['site', site], ['articles', articles]]) {
        const res = await fetch(`/api/content/${which}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error((await res.json()).error || `Failed to save ${which}`)
      }
      setBaseline({ site: clone(site), articles: clone(articles) })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(String(err.message || err))
    } finally {
      setSaving(false)
    }
  }

  const readOnly = apiAvailable === false

  return (
    <div className="site admin-page">
      <main className="admin-main" id="main" tabIndex={-1}>
        <header className="admin-header">
          <div>
            <SectionLabel>Flagscale PR</SectionLabel>
            <h1>Site Dashboard</h1>
          </div>
          <div className="admin-header-right">
            <span className={readOnly ? 'admin-mode readonly' : 'admin-mode live'}>
              {apiAvailable === null ? 'Connecting…' : readOnly ? 'Read-only' : 'Live editing'}
            </span>
            <a
              href="/"
              className="admin-add"
              onClick={(e) => {
                e.preventDefault()
                navigate('/')
              }}
            >
              View site
            </a>
          </div>
        </header>

        {readOnly && (
          <div className="admin-notice">
            <AlertTriangle size={16} aria-hidden="true" />
            <p>
              This is the deployed build, which is static and has no backend, so content here
              is read-only and submissions are not captured. Run <code>npm run dev</code> and
              open <code>/admin</code> to edit content and read enquiries.
            </p>
          </div>
        )}

        <nav className="admin-tabs" aria-label="Dashboard sections">
          {TABS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={tab === key ? 'admin-tab active' : 'admin-tab'}
              aria-current={tab === key ? 'page' : undefined}
              onClick={() => selectTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === 'content' && (
          <ContentTab
            site={site}
            articles={articles}
            setSite={setSite}
            setArticles={setArticles}
            readOnly={readOnly}
          />
        )}
        {tab === 'inventory' && (
          <InventoryTab site={site} articles={articles} apiAvailable={apiAvailable === true} />
        )}
        {tab === 'submissions' && <SubmissionsTab apiAvailable={apiAvailable === true} />}

        {tab === 'content' && !readOnly && (
          <div className={dirty ? 'admin-savebar dirty' : 'admin-savebar'}>
            <span role="status" aria-live="polite">
              {error
                ? error
                : saved
                ? 'Saved to src/data — commit it like any other change.'
                : dirty
                ? 'Unsaved changes'
                : 'No changes'}
            </span>
            <div>
              <button
                type="button"
                className="admin-add"
                disabled={!dirty || saving}
                onClick={() => {
                  setSite(clone(baseline.site))
                  setArticles(clone(baseline.articles))
                }}
              >
                Discard
              </button>
              <button type="button" className="button dark" disabled={!dirty || saving} onClick={save}>
                {saving ? <Loader2 size={15} className="spin" aria-hidden="true" /> : saved ? <Check size={15} aria-hidden="true" /> : <Save size={15} aria-hidden="true" />}
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
