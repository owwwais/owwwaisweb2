import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * True only for real pointing devices. Touch screens have no hover, so every
 * effect here would either never fire or fire once and stick.
 */
export function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

/* ------------------------------------------------------------------
   PointerField — the hero backdrop.

   Two stacked layers that both key off the cursor:
     1. a warm glow that trails the pointer on a spring, and
     2. a denser dot grid revealed only through a soft circular mask,
        so the existing page texture appears to light up on approach.

   Everything is driven by motion values, so the pointer never triggers
   a React render.
   ------------------------------------------------------------------ */
export function PointerField() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduce = useReducedMotion();

  // Park the origin far outside until the pointer actually arrives.
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  // Two different weights: the glow lags noticeably, the mask keeps up.
  const glowX = useSpring(x, { stiffness: 55, damping: 22, mass: 1.1 });
  const glowY = useSpring(y, { stiffness: 55, damping: 22, mass: 1.1 });
  const maskX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.5 });
  const maskY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.5 });

  const [lit, setLit] = useState(false);

  useEffect(() => {
    if (!fine || reduce) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        setLit(true);
      });
    };
    const onLeave = () => setLit(false);

    const parent = el.parentElement ?? el;
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduce, x, y]);

  if (!fine || reduce) return null;

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      {/*
        Both layers are fixed-size elements moved with `transform` only.
        Driving `left`/`top` would force layout on every pointer frame, and a
        CSS blur filter on a moving element repaints a huge area each frame —
        together those were the main cost here. A soft radial gradient needs
        no blur filter, and a static mask needs no recomputation.
      */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          opacity: lit ? 1 : 0,
          willChange: "transform",
          background:
            "radial-gradient(circle closest-side, rgba(254,118,23,0.20) 0%, rgba(254,118,23,0.10) 34%, rgba(254,118,23,0.03) 58%, transparent 74%)",
        }}
        className="absolute -top-[300px] -left-[300px] h-[600px] w-[600px] rounded-full transition-opacity duration-700"
      />

      <motion.div
        style={{
          x: maskX,
          y: maskY,
          opacity: lit ? 1 : 0,
          willChange: "transform",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.30) 1.4px, transparent 0)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(circle closest-side, #000 0%, rgba(0,0,0,0.5) 46%, transparent 72%)",
          maskImage:
            "radial-gradient(circle closest-side, #000 0%, rgba(0,0,0,0.5) 46%, transparent 72%)",
        }}
        className="absolute -top-[220px] -left-[220px] h-[440px] w-[440px] transition-opacity duration-500"
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   Spotlight — a warm sheen that tracks the cursor inside a card.
   Drop it inside any `.card.group.relative`.
   ------------------------------------------------------------------ */
export function Spotlight({
  size = 300,
  color = "rgba(254,118,23,0.10)",
}: {
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = usePointerFine();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!fine || reduce) return;
    const el = ref.current;
    const card = el?.parentElement;
    if (!el || !card) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      });
    };
    card.addEventListener("pointermove", onMove);
    return () => {
      card.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduce]);

  if (!fine || reduce) return null;

  return (
    <span
      ref={ref}
      aria-hidden
      className="spotlight"
      style={
        {
          "--s-size": `${size}px`,
          "--s-color": color,
        } as React.CSSProperties
      }
    />
  );
}

/* ------------------------------------------------------------------
   Tilt — content leans a few pixels against the cursor. Deliberately
   small; this should register as depth, not as a toy.
   ------------------------------------------------------------------ */
export function useCursorLean(strength = 10) {
  const fine = usePointerFine();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.9 });

  useEffect(() => {
    if (!fine || reduce) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        x.set(((e.clientX - cx) / cx) * strength);
        y.set(((e.clientY - cy) / cy) * strength);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduce, strength, x, y]);

  return { x: sx, y: sy, active: fine && !reduce };
}
