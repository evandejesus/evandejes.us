import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useDarkMode } from '../DarkModeContext'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/connect', label: 'Connect' },
]

function DarkToggle() {
  const { dark, toggle } = useDarkMode()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{
        background: 'none',
        border: '1px solid rgba(128,128,128,0.3)',
        borderRadius: '999px',
        cursor: 'pointer',
        padding: '4px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--muted)',
        fontFamily: 'Polymath Display, sans-serif',
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transition: 'color 0.15s ease, border-color 0.15s ease',
      }}
    >
      <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>{dark ? '○' : '●'}</span>
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        style={{
          borderBottom: open ? 'none' : '1px solid rgba(128,128,128,0.15)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'var(--cream)',
          zIndex: 100,
          transition: 'background 0.3s ease',
        }}
      >
        {/* Wordmark */}
        <NavLink
          to="/"
          style={{
            fontFamily: 'Polymath Display, sans-serif',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '0.01em',
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          evandejes.us
        </NavLink>

        {/* Desktop links + toggle */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                fontFamily: 'Polymath Display, sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                letterSpacing: '0.01em',
                color: isActive ? 'var(--ink)' : 'var(--muted)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              })}
            >
              {label}
            </NavLink>
          ))}
          <DarkToggle />
        </nav>

        {/* Mobile right side: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <DarkToggle />
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              width: '24px',
            }}
          >
            <span style={{ display: 'block', height: '1.5px', background: 'var(--ink)', transformOrigin: 'center', transition: 'transform 0.25s ease, opacity 0.25s ease', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', height: '1.5px', background: 'var(--ink)', transition: 'opacity 0.25s ease', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', height: '1.5px', background: 'var(--ink)', transformOrigin: 'center', transition: 'transform 0.25s ease, opacity 0.25s ease', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--ink)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          pointerEvents: open ? 'all' : 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                fontFamily: 'Polymath Display, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 12vw, 5rem)',
                letterSpacing: '0em',
                lineHeight: 1.1,
                color: isActive ? 'var(--volt)' : 'var(--cream)',
                textDecoration: 'none',
                display: 'block',
                transition: 'color 0.15s ease',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}
