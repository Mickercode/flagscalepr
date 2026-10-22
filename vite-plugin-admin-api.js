import fs from 'node:fs'
import path from 'node:path'

/**
 * Dev-only API behind the /admin dashboard.
 *
 * The site is a static build with no backend, so editing content and capturing
 * form submissions have nowhere to go in production. This plugin gives those
 * powers to the dev server only: it reads and writes the real JSON content
 * files, so edits land in your working tree and go through git like any other
 * change.
 *
 * `apply: 'serve'` keeps it out of the production bundle entirely — a public
 * deploy never exposes these write endpoints.
 */

// The only files this API may write. Anything else is rejected outright, so a
// crafted request cannot walk the filesystem.
const WRITABLE = {
  site: 'src/data/site.json',
  articles: 'src/data/articles.json',
}

const SUBMISSIONS_DIR = '.admin'
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'submissions.json')

const json = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 5_000_000) reject(new Error('Payload too large'))
    })
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {})
      } catch {
        reject(new Error('Body was not valid JSON'))
      }
    })
    req.on('error', reject)
  })

function readJson(root, rel, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'))
  } catch {
    return fallback
  }
}

function writeJson(root, rel, data) {
  const target = path.join(root, rel)
  // write to a sibling temp file then rename, so an interrupted write cannot
  // leave a half-written content file behind
  const tmp = `${target}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2) + '\n', 'utf8')
  fs.renameSync(tmp, target)
}

function readSubmissions(root) {
  return readJson(root, SUBMISSIONS_FILE, []) || []
}

function writeSubmissions(root, list) {
  const dir = path.join(root, SUBMISSIONS_DIR)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  writeJson(root, SUBMISSIONS_FILE, list)
}

/** Collect every outbound URL the site depends on, with where it came from. */
function collectUrls(site, articles) {
  const found = new Map()
  const add = (url, source) => {
    if (!url || !/^https?:\/\//.test(url)) return
    if (!found.has(url)) found.set(url, { url, sources: [] })
    found.get(url).sources.push(source)
  }
  ;(site?.work || []).forEach((w) => {
    add(w.image, `work: ${w.name} (image)`)
    add(w.link, `work: ${w.name} (link)`)
  })
  ;(site?.clients || []).forEach((c) => add(c.link, `client: ${c.name}`))
  ;(articles?.articles || []).forEach((a) => add(a.image, `article: ${a.title}`))
  return [...found.values()]
}

// Publisher WAFs reject requests that do not look like a browser, which makes a
// naive checker report healthy links as broken. guardian.ng 403s a bare HEAD.
// Statuses that mean "we were refused", not "this link is dead".
const BOT_WALL = new Set([401, 403, 405, 406, 429])

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9',
}

async function checkUrl(url) {
  const started = Date.now()
  const attempt = async (method) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: controller.signal,
        headers: BROWSER_HEADERS,
      })
      return { status: res.status, ok: res.ok }
    } finally {
      clearTimeout(timer)
    }
  }
  try {
    // Some hosts refuse HEAD outright, so a failed HEAD is never conclusive —
    // confirm with a GET before reporting anything as broken.
    let result = await attempt('HEAD')
    if (!result.ok) {
      const viaGet = await attempt('GET')
      result = { ...viaGet, headRefused: !viaGet.ok ? undefined : true }
    }
    // Publishers behind bot protection reject this checker's TLS fingerprint
    // however the request is dressed up. guardian.ng answers curl with 200 and
    // Node with 403. Reporting that as a dead link would be wrong and would
    // train everyone to ignore the panel, so it gets its own state.
    const inconclusive = !result.ok && BOT_WALL.has(result.status)
    return { ...result, inconclusive, ms: Date.now() - started }
  } catch (err) {
    return { status: 0, ok: false, ms: Date.now() - started, error: String(err.message || err) }
  }
}

export default function adminApi() {
  return {
    name: 'flagscale-admin-api',
    apply: 'serve',

    configureServer(server) {
      const root = server.config.root

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        const route = url.pathname
        if (!route.startsWith('/api/')) return next()

        try {
          // ---- content -------------------------------------------------
          if (route === '/api/content' && req.method === 'GET') {
            return json(res, 200, {
              site: readJson(root, WRITABLE.site),
              articles: readJson(root, WRITABLE.articles),
            })
          }

          if (route.startsWith('/api/content/') && req.method === 'PUT') {
            const which = route.slice('/api/content/'.length)
            if (!Object.prototype.hasOwnProperty.call(WRITABLE, which)) {
              return json(res, 400, { error: `Unknown content file: ${which}` })
            }
            const body = await readBody(req)
            if (!body || typeof body !== 'object' || Array.isArray(body)) {
              return json(res, 400, { error: 'Expected a JSON object' })
            }
            writeJson(root, WRITABLE[which], body)
            return json(res, 200, { ok: true, file: WRITABLE[which] })
          }

          // ---- link + image health ------------------------------------
          if (route === '/api/health' && req.method === 'GET') {
            const site = readJson(root, WRITABLE.site)
            const articles = readJson(root, WRITABLE.articles)
            const targets = collectUrls(site, articles)
            const results = await Promise.all(
              targets.map(async (t) => ({ ...t, ...(await checkUrl(t.url)) })),
            )
            return json(res, 200, { checkedAt: new Date().toISOString(), results })
          }

          // ---- form submissions ---------------------------------------
          if (route === '/api/submissions' && req.method === 'GET') {
            return json(res, 200, { submissions: readSubmissions(root) })
          }

          if (route === '/api/submissions' && req.method === 'POST') {
            const body = await readBody(req)
            const list = readSubmissions(root)
            const entry = {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              receivedAt: new Date().toISOString(),
              kind: body.kind === 'subscribe' ? 'subscribe' : 'mandate',
              read: false,
              data: body.data && typeof body.data === 'object' ? body.data : {},
            }
            list.unshift(entry)
            writeSubmissions(root, list)
            return json(res, 201, { ok: true, id: entry.id })
          }

          if (route.startsWith('/api/submissions/') && req.method === 'PATCH') {
            const id = route.slice('/api/submissions/'.length)
            const list = readSubmissions(root)
            const hit = list.find((s) => s.id === id)
            if (!hit) return json(res, 404, { error: 'No such submission' })
            const body = await readBody(req)
            hit.read = Boolean(body.read)
            writeSubmissions(root, list)
            return json(res, 200, { ok: true })
          }

          if (route.startsWith('/api/submissions/') && req.method === 'DELETE') {
            const id = route.slice('/api/submissions/'.length)
            const list = readSubmissions(root).filter((s) => s.id !== id)
            writeSubmissions(root, list)
            return json(res, 200, { ok: true })
          }

          return json(res, 404, { error: `No such endpoint: ${req.method} ${route}` })
        } catch (err) {
          return json(res, 500, { error: String(err.message || err) })
        }
      })
    },
  }
}
