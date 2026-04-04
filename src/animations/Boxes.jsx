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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MyAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    // gsap.context() scopes all GSAP selectors to this component
    // and automatically cleans up on unmount via ctx.revert()
    const ctx = gsap.context(() => {
      // ── your animation here ──────────────────────────────────────
      // target the element with a class of "green" - rotate and move TO 100px to the left over the course of 1 second.
      gsap.to(".green", { rotation: 360, x: 100, duration: 1 });

      // target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second.
      gsap.from(".purple", { rotation: -360, x: -100, duration: 1 });

      // target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second.
      gsap.fromTo(".red", { x: -100 }, { rotation: 360, x: 100, duration: 1 });
      // ─────────────────────────────────────────────────────────────
    }, containerRef); // ← scope

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-between w-full h-full p-40 m-0"
    >
      <div class="green w-32 h-32 bg-green-500 rounded-lg"></div>
      <div class="purple w-32 h-32 bg-purple-500 rounded-lg"></div>
      <div class="red w-32 h-32 bg-red-500 rounded-lg"></div>
    </div>
  );
}
