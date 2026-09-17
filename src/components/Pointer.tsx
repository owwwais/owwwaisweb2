import {
  motion,
  useMotionTemplate,
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

  const dotMask = useMotionTemplate`radial-gradient(220px 220px at ${maskX}px ${maskY}px, #000 0%, rgba(0,0,0,0.45) 45%, transparent 72%)`;

  if (!fine || reduce) return null;

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Warm glow trailing the cursor */}
      <motion.div
        style={{
          left: glowX,
          top: glowY,
          opacity: lit ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(254,118,23,0.16) 0%, rgba(254,118,23,0.06) 38%, transparent 68%)",
        }}
        transition={{ opacity: { duration: 0.8 } }}
        className="absolute h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[42px] transition-opacity duration-700"
      />

      {/* Denser dots, revealed only around the cursor */}
      <motion.div
        style={{
          opacity: lit ? 1 : 0,
          WebkitMaskImage: dotMask,
          maskImage: dotMask,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.30) 1.4px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
        className="absolute inset-0 transition-opacity duration-500"
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
