/**
 * WordReveal — placeholder GSAP animation
 *
 * Words slide up and fade in one by one on scroll enter.
 * Swap this out or duplicate the pattern for new exhibits.
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Evan', 'de', 'Jesus']

export default function WordReveal() {
  const containerRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordRefs.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-start gap-2 px-12 py-24"
    >
      {WORDS.map((word, i) => (
        <div
          key={word}
          className="overflow-hidden"
        >
          <span
            ref={(el) => (wordRefs.current[i] = el)}
            style={{
              fontFamily: 'Polymath Display, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              letterSpacing: '0em',
              lineHeight: 1,
              display: 'block',
              color: 'var(--ink)',
            }}
          >
            {word}
          </span>
        </div>
      ))}
    </div>
  )
}
