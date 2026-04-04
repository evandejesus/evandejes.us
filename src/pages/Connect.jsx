import { useEffect, useRef } from 'react'

const LINKS = [
  { index: '01', label: 'Email', href: 'mailto:evanjdejesus@gmail.com', display: 'evanjdejesus@gmail.com' },
  { index: '02', label: 'Instagram', href: 'https://instagram.com/evanjesus0', display: '@evanjesus0' },
  { index: '03', label: 'LinkedIn', href: 'https://www.linkedin.com/in/evan-de-jesus-581a51162', display: 'Evan de Jesus' },
]

export default function Connect() {
  const wordRef = useRef(null)
  const containerRef = useRef(null)

  // Scale "connect" to fill the full container width
  useEffect(() => {
    const fit = () => {
      const word = wordRef.current
      const container = containerRef.current
      if (!word || !container) return
      // Measure natural width unconstrained
      word.style.fontSize = '10rem'
      word.style.position = 'absolute'
      word.style.whiteSpace = 'nowrap'
      const naturalWidth = word.scrollWidth
      word.style.position = ''
      // Scale to fit container (minus 1.5rem padding each side)
      const available = container.offsetWidth - 48
      const MAX_FONT_SIZE = 18
      word.style.fontSize = `${Math.min(MAX_FONT_SIZE, 10 * (available / naturalWidth))}rem`
    }
    document.fonts.ready.then(() => requestAnimationFrame(fit))
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div
      style={{
        paddingTop: '3.5rem',
        minHeight: '100vh',
        background: 'var(--cream)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* connect info */}
      <div style={{ flex: 1, padding: '3rem 1.5rem 2rem' }}>
        <p
          className="exhibit-label"
          style={{ marginBottom: '2.5rem' }}
        >
          Get in touch
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {LINKS.map(({ index, label, href, display }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(128,128,128,0.15)',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span
                  style={{
                    fontFamily: 'Polymath Display, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    color: 'var(--muted)',
                    minWidth: '2rem',
                  }}
                >
                  {index}
                </span>
                <span
                  style={{
                    fontFamily: 'Polymath Display, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    minWidth: '6rem',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: 'Polymath Display, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  {display}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Screen-filling word */}
      <div
        ref={containerRef}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, overflow: 'hidden', padding: '1rem 1.5rem', lineHeight: 0.85, pointerEvents: 'none' }}

      >
        <span
          ref={wordRef}
          style={{
            fontFamily: 'Polymath Display, sans-serif',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            display: 'block',
            color: 'var(--ink)',
            userSelect: 'none',
          }}
        >
          connect
        </span>
      </div>
    </div>
  )
}
