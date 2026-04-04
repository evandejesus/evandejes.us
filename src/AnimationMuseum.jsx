/**
 * AnimationMuseum
 *
 * A single-column gallery of GSAP animation exhibits.
 * To add a new exhibit, import your component and push an entry
 * into the EXHIBITS array below. That's it.
 *
 * Each exhibit has:
 *   title       — short label shown above the frame
 *   component   — the React component containing your GSAP animation
 *   height      — any valid CSS height string (e.g. '100vh', '600px', 'auto')
 *   dark        — optional bool; use a dark ink background instead of cream
 */

import WordReveal from "./animations/WordReveal";
import SplitFlip from "./animations/SplitFlip";
import Horizontal from "./animations/Horizontal";
import Boxes from "./animations/Boxes";
import profileImg from "../brand_assets/profile.jpg";

export const ANIMATION_CONTAINER_CLASS =
  "flex flex-col items-center justify-center w-full h-full";

// ─── ADD YOUR EXHIBITS HERE ──────────────────────────────────────────────────
const EXHIBITS = [
  // {
  //   title: 'Word Reveal',
  //   component: WordReveal,
  //   height: '80vh',
  //   dark: false,
  // },
  {
    title: "Split Flip",
    component: SplitFlip,
    height: "40vh",
    dark: false,
  },
  {
    title: "Horizontal",
    component: Horizontal,
    height: "30vh",
    dark: false,
  },
  {
    title: "Boxes",
    component: Boxes,
    height: "70vh",
    dark: false,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function ExhibitFrame({ title, component: Component, height, dark, index }) {
  return (
    <div>
      {/* Divider + label row */}
      <div className="px-6 py-3 flex items-center gap-4">
        <hr className="exhibit-divider flex-1" />
        <span className="exhibit-label">
          {String(index + 1).padStart(2, "0")} — {title}
        </span>
        <hr className="exhibit-divider flex-1" />
      </div>

      {/* Frame */}
      <div
        style={{
          height,
          background: dark ? "var(--ink)" : "var(--cream)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Component />
      </div>
    </div>
  );
}

export default function AnimationMuseum() {
  return (
    <div
      style={{
        background: "var(--cream)",
        minHeight: "100vh",
        paddingTop: "3rem",
      }}
    >
      {/* Hero */}
      <div style={{ display: "flex", minHeight: "60vh" }}>
        {/* Text column */}
        <div
          style={{
            flex: 1,
            padding: "3rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p className="exhibit-label mb-4">Evan de Jesus</p>
          <h1
            style={{
              fontFamily: "Polymath Display, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              letterSpacing: "0em",
              lineHeight: 1.05,
              color: "var(--ink)",
            }}
          >
            Cloud Engineer · Artist · Designer
          </h1>
        </div>

        {/* Photo column */}
        <div
          style={{
            width: "18%",
            flexShrink: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              aspectRatio: "1",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={profileImg}
              alt="Evan de Jesus"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(1) contrast(1.6) brightness(1.0)",
                transform: "rotate(16deg) scale(1.01)",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <main>
        {EXHIBITS.map((exhibit, i) => (
          <ExhibitFrame key={exhibit.title} index={i} {...exhibit} />
        ))}
      </main>

      {/* Footer spacer */}
      <div style={{ height: "20vh" }} />
    </div>
  );
}
