/**
 * Posts a form submission so it can be read back in the /admin dashboard.
 *
 * Running locally, the dev server stores it in .admin/submissions.json. In a
 * deployed build there is no such endpoint, so set VITE_FORM_ENDPOINT to a real
 * one (a form service or your own function) or submissions are discarded, which
 * is what the site did for every enquiry before this existed.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/submissions'

export async function submitForm(kind, data) {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, data }),
    })
    if (!res.ok) throw new Error(`Submission endpoint returned ${res.status}`)
    return { ok: true }
  } catch (err) {
    // Never block the person in front of the form on our storage problem.
    console.warn('[flagscale] submission was not stored:', err.message)
    return { ok: false, error: String(err.message || err) }
  }
}
