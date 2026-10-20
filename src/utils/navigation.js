const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function navigate(href) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    if (href === window.location.pathname) {
      scrollToTop()
      return
    }
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    scrollToTop()
  } else if (href.startsWith('#')) {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      // in-page jumps must move focus too, or keyboard/SR users stay put
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    }
  } else {
    window.location.href = href
  }
}
