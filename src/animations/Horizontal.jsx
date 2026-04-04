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

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import "./Horizontal.css";

gsap.registerPlugin(SplitText);

export default function MyAnimation() {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  useEffect(() => {
    // gsap.context() scopes all GSAP selectors to this component
    // and automatically cleans up on unmount via ctx.revert()
    const ctx = gsap.context(() => {
      // ── your animation here ──────────────────────────────────────

      let text = document.querySelector(".headline");
      gsap.set(text, { opacity: 1 });
      let mySplitText = SplitText.create(text, {
        type: "chars, words",
        charsClass: "char",
      });
      let chars = mySplitText.chars;

      const el = elementRef.current;
      if (el) {
        const listener = () => {
          if (!text.isSplit) {
            mySplitText.split({
              type: "chars, words",
              charsClass: "char",
            });
          }
          gsap.from(chars, {
            duration: 1,
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back",
            stagger: 0.05,
            onComplete: () => {
              mySplitText.revert();
              text.removeAttribute("aria-hidden");
            },
          });
        };
        el.addEventListener("click", listener);

        // Cleanup is mandatory to avoid memory leaks
        return () => el.removeEventListener("click", listener);
      }

      // ─────────────────────────────────────────────────────────────
    }, containerRef); // ← scope

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={containerRef} className="cont">
      <div className="container">
        <h1 className="headline" aria-hidden="true">
          This text animates and then reverts
        </h1>
      </div>
      <button ref={elementRef}>animate me</button>
    </div>
  );
}
