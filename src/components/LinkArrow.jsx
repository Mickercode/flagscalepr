import { ArrowRight } from 'lucide-react'

export default function LinkArrow({ children, dark = false, href = '#contact' }) {
  return (
    <a
      className={`arrow-link ${dark ? 'arrow-link-dark' : ''}`}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {children}
      <ArrowRight size={16} />
    </a>
  )
}
