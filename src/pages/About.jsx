import { useEffect, useRef } from 'react'

export default function About() {
  const wordRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const fit = () => {
      const word = wordRef.current
      const container = containerRef.current
      if (!word || !container) return
      word.style.fontSize = '10rem'
      word.style.position = 'absolute'
      word.style.whiteSpace = 'nowrap'
      const naturalWidth = word.scrollWidth
      word.style.position = ''
      const available = container.offsetWidth - 48
      word.style.fontSize = `${10 * (available / naturalWidth)}rem`
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
      {/* Bio */}
      <div style={{ flex: 1, padding: '3rem 1.5rem 2rem', maxWidth: '640px' }}>
        <p className="exhibit-label" style={{ marginBottom: '2.5rem' }}>About</p>
        <p
          style={{
            fontFamily: 'Polymath Display, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            lineHeight: 1.65,
            color: 'var(--ink)',
          }}
        >
          Evan de Jesus is an aspiring designer from Michigan currently living in Salt Lake City. He finds joy and energy in taking simple ideas and expanding them through the lens of art and design.
        </p>
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
          about
        </span>
      </div>
    </div>
  )
}
