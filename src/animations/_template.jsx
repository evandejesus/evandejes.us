/**
 * Animation Boilerplate
 *
 * Copy this file, rename it, and build your animation inside.
 * Then add an entry to the EXHIBITS array in src/AnimationMuseum.jsx.
 *
 * EXHIBITS entry shape:
 *   { title: 'My Animation', component: MyAnimation, height: '80vh', dark: false }
 *
 * height — any valid CSS string: '100vh', '600px', 'auto'
 * dark   — true = ink background, false = cream background
 *          If dark: true, use color: 'var(--cream)' for text.
 *          If dark: false, use color: 'var(--ink)' for text.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MyAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    // gsap.context() scopes all GSAP selectors to this component
    // and automatically cleans up on unmount via ctx.revert()
    const ctx = gsap.context(() => {

      // ── your animation here ──────────────────────────────────────
      gsap.from('.my-element', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
      // ─────────────────────────────────────────────────────────────

    }, containerRef) // ← scope

    return () => ctx.revert() // cleanup
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
      }}
    >
      <p
        className="my-element"
        style={{
          fontFamily: 'Polymath Display, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          color: 'var(--ink)', // swap to var(--cream) if dark: true
        }}
      >
        Hello
      </p>
    </div>
  )
}
