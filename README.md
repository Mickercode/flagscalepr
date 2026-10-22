# Flagscale PR

> Data-driven, people-centric PR solutions for African SMEs across Anglophone and Francophone Africa.

**People · Passion · Professionalism**

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/Mickercode/flagscalepr.git

# Navigate into the project directory
cd flagscalepr

# Install dependencies
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Build

Build the project for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Site dashboard (`/admin`)

Run `npm run dev` and open <http://localhost:5173/admin>.

### What it does

| Tab | Purpose |
| --- | --- |
| **Content** | Edit hero stats, case studies, clients, capabilities and Journal articles. Saving writes `src/data/site.json` and `src/data/articles.json`, so changes land in your working tree and are committed like any other edit. |
| **Inventory & Gaps** | Counts of everything published, plus automatic checks: missing images or links, articles on expiring image hosts, stats that no longer match reality, clients with no proof of work. "Run checks" fetches every outbound URL and reports its status. |
| **Submissions** | Contact and subscribe form entries, with read/unread, delete and CSV export. |

### Why editing only works locally

The site is a static build with no backend. The dashboard's API lives in
`vite-plugin-admin-api.js` and is registered `apply: 'serve'`, so it exists on
the dev server only and is never part of a production bundle.

Deployed, `/admin` still loads but detects the missing API and drops to
read-only: content is shown in a disabled fieldset and submissions are not
captured. That is deliberate — an unauthenticated editor on a public URL would
let anyone rewrite the site.

To manage content, pull, run `npm run dev`, edit at `/admin`, then commit and
push the changed JSON.

### Capturing submissions in production

Locally, submissions are written to `.admin/submissions.json` (gitignored).
A deployed build has nowhere to put them, so set a real endpoint:

```bash
# .env
VITE_FORM_ENDPOINT=https://your-form-endpoint.example/submit
```

It receives `POST` with `{ kind: 'mandate' | 'subscribe', data: { ... } }`.
Without it, deployed forms still confirm to the visitor but the enquiry is
discarded — which is what the site did for every enquiry before the dashboard
existed.

### Content files

| File | Holds |
| --- | --- |
| `src/data/site.json` | Hero stats, case studies, clients, capabilities |
| `src/data/articles.json` | Journal articles, categories, editorial themes |

`site.js` and `articles.js` are thin wrappers that re-export these, so pages
import from them as before. Images referenced as `/work/...` live in `public/`.
