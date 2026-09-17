import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { projects, type Project } from "../data/content";
import { EASE } from "./Motion";
import { HoverCue, SectionHead } from "./Ui";

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
      transition={{ duration: 0.85, ease: EASE, delay: Math.min(i, 4) * 0.07 }}
      className="card group overflow-hidden transition-transform duration-[600ms] ease-out hover:-translate-y-1.5"
    >
      {/* Logo lockups are never cropped — `contain` keeps every mark whole. */}
      <div className="relative overflow-hidden bg-[var(--color-card)]">
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="aspect-[16/10] w-full object-contain p-8 transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[var(--color-ink)] opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        />
        <HoverCue label="استعرض المشروع" />
        <span className="absolute top-4 right-4 rounded-full bg-[var(--color-card)]/90 px-3 py-1.5 text-[12px] text-[var(--color-muted)] shadow-sm backdrop-blur">
          {p.category}
        </span>
      </div>

      <div className="border-t border-[var(--color-line)] p-6 md:p-7">
        <h3 className="display-soft text-[20px] md:text-[23px]">{p.title}</h3>
        <p className="lede mt-2 text-[14px]">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="mono rounded-full bg-[var(--color-page)] px-2.5 py-1 text-[11px] text-[var(--color-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);
  const shown = expanded ? [...featured, ...rest] : featured;

  return (
    <section id="work" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="ألقِ نظرة على أعمالي" className="mb-12 md:mb-16" />

        <motion.div layout className="grid gap-5 sm:grid-cols-2 md:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <Card key={p.title} p={p} i={expanded ? i - featured.length : i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="mt-12 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="pill pill-dark"
          >
            <span>
              {expanded ? "عرض أقل" : `رؤية جميع المشاريع (${projects.length})`}
            </span>
            <motion.span
              aria-hidden
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }
              }
              className="inline-block"
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
