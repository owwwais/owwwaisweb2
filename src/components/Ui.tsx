import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./Motion";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075 } },
};

/**
 * Words are the smallest unit we ever animate. Splitting Arabic any finer
 * puts each letter in its own box and the script stops joining — the whole
 * word would render as loose, disconnected glyphs.
 */
const wordV: Variants = {
  hidden: { y: "108%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: EASE },
  },
};

export function SectionHead({
  text,
  className = "",
  as = "h2",
  align = "center",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3";
  align?: "center" | "start";
}) {
  const Tag = as === "h2" ? motion.h2 : motion.h3;
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Plain = as;
    return (
      <Plain
        className={`display text-[30px] sm:text-[40px] md:text-[54px] ${
          align === "center" ? "text-center" : ""
        } ${className}`}
      >
        {text}
      </Plain>
    );
  }

  return (
    <Tag
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-14% 0px -14% 0px" }}
      className={`display text-[30px] sm:text-[40px] md:text-[54px] ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
        >
          <motion.span variants={wordV} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** Small caption above a section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-4 text-center text-[13px] tracking-wide text-[var(--color-muted)]"
    >
      {children}
    </motion.p>
  );
}

/**
 * Hover affordance on a card. One text node — no per-letter boxes, so the
 * Arabic stays joined.
 */
export function HoverCue({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="flex translate-y-2 items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3 text-[13px] whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        {label}
        <span aria-hidden>←</span>
      </span>
    </span>
  );
}
