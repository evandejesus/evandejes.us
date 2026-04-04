/**
 * SplitFlip
 *
 * Characters tumble on the X axis around a receding vanishing point,
 * passing through visible (rotationX: 0) mid-animation.
 * Inspired by: https://codepen.io/petebarr/pen/oJvVpw
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LINES = ['Evan de Jesus']

export default function SplitFlip() {
  const containerRef = useRef(null)
  const lineRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const width = container.offsetWidth
    const depth = -width / 8
    const transformOrigin = `50% 50% ${depth}px`
    const animTime = 0.9

    // Collect char elements per line
    const lineChars = lineRefs.current.map(line =>
      Array.from(line.querySelectorAll('.char'))
    )

    gsap.set(lineRefs.current, {
      perspective: 700,
      transformStyle: 'preserve-3d',
    })

    const tl = gsap.timeline({ repeat: -1 })

    lineChars.forEach((chars, index) => {
      tl.fromTo(
        chars,
        { rotationX: -90 },
        {
          rotationX: 90,
          stagger: 0.08,
          duration: animTime,
          ease: 'none',
          transformOrigin,
        },
        index * 0.45
      )
    })

    return () => tl.kill()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '0.1em',
        padding: '3rem',
        width: '100%',
        height: '100%',
      }}
    >
      {LINES.map((word, i) => (
        <div
          key={word}
          ref={el => (lineRefs.current[i] = el)}
          className="line"
          style={{ overflow: 'hidden', lineHeight: 1 }}
        >
          {word.split('').map((char, j) => (
            <span
              key={j}
              className="char"
              style={{
                display: 'inline-block',
                fontFamily: 'Polymath Display, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(4rem, 14vw, 11rem)',
                lineHeight: 1,
                color: 'var(--ink)',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
