import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------
   Reveal — the workhorse. Fades and lifts a block as it scrolls in.
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   WordReveal — headline animates word by word, each word rising out
   of a clipping mask. This is the signature motion of the reference.
   ------------------------------------------------------------------ */
const wordContainer: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

export function WordReveal({
  words,
  className,
  stagger = 0.06,
  accentFrom,
}: {
  words: string[];
  className?: string;
  stagger?: number;
  /** Index from which words render in the accent colour. */
  accentFrom?: number;
}) {
  return (
    <motion.h2
      className={className}
      variants={wordContainer}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.12em",
            marginBottom: "-0.12em",
          }}
        >
          <motion.span
            variants={wordChild}
            style={{
              display: "inline-block",
              color:
                accentFrom !== undefined && i >= accentFrom
                  ? "var(--color-accent)"
                  : undefined,
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.h2>
  );
}

/* ------------------------------------------------------------------
   Counter — counts up to a target once visible.
   ------------------------------------------------------------------ */
export function Counter({
  to,
  suffix = "",
  duration = 1.9,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — fast then settling, reads as "landing" on a number
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = `${Math.round(eased * to)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ------------------------------------------------------------------
   Marquee — infinite horizontal scroll, pauses on hover.
   ------------------------------------------------------------------ */
export function Marquee({
  children,
  duration = 42,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`u-marquee u-fade-x overflow-hidden ${className}`}>
      <div
        className="u-marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Parallax — subtle depth as the section passes the viewport.
   ------------------------------------------------------------------ */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Magnetic — button leans toward the cursor, then springs back.
   ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
