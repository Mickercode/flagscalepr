// Editable site content. Lives in site.json so the /admin dashboard can rewrite
// it without touching JSX. Keep this file as the import surface for pages.
import data from './site.json'

export const stats = data.stats
export const clients = data.clients
export const capabilities = data.capabilities
export const work = data.work
