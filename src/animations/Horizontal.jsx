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
import { ANIMATION_CONTAINER_CLASS } from "../AnimationMuseum";

gsap.registerPlugin(SplitText);

export default function MyAnimation() {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      let text = document.querySelector(".headline");
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
            },
          });
        };
        el.addEventListener("click", listener);

        return () => el.removeEventListener("click", listener);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${ANIMATION_CONTAINER_CLASS} font-[Mori]`}
    >
      <div className="w-full">
        <h1
          className="headline text-center text-[rgb(14,16,15)] text-[clamp(2rem,6rem,4.5vw)] leading-tight"
          style={{
            willChange: "transform",
            fontKerning: "none",
            WebkitTextRendering: "optimizeSpeed",
            textRendering: "optimizeSpeed",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
          aria-hidden="true"
        >
          This text animates and then reverts
        </h1>
      </div>
      <button
        ref={elementRef}
        className="mt-6 border border-[var(--ink)] bg-transparent text-[var(--ink)] px-4 py-2 hover:opacity-80 transition-opacity"
      >
        animate me
      </button>
    </div>
  );
}
