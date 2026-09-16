import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { projects, type Project } from "../data/content";
import { Reveal, WordReveal } from "./Motion";
import { SectionLabel } from "./Ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Soft, distinct wash per card — stands in for artwork without
   shouting over the type. */
const washes = [
  "linear-gradient(140deg,#fdf2ec 0%,#f7e9e1 100%)",
  "linear-gradient(140deg,#eef3f8 0%,#e4ecf5 100%)",
  "linear-gradient(140deg,#f0f5f0 0%,#e4efe6 100%)",
  "linear-gradient(140deg,#f6f2fa 0%,#ece5f4 100%)",
  "linear-gradient(140deg,#fbf5e8 0%,#f5ecd9 100%)",
  "linear-gradient(140deg,#f2f2f4 0%,#e8e8ec 100%)",
];

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: EASE, delay: (i % 2) * 0.08 }}
      className="group relative"
    >
      <div className="overflow-hidden rounded-[22px] border border-[var(--color-line)] transition-all duration-500 group-hover:border-[var(--color-line-2)] group-hover:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.28)]">
        {/* Visual */}
        <div
          className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
          style={{ background: washes[i % washes.length] }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.5] transition-transform duration-[1.1s] ease-out group-hover:scale-110"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.14) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <h3 className="u-display relative px-6 text-center text-[30px] text-[var(--color-ink)] transition-transform duration-700 ease-out group-hover:scale-[1.04] md:text-[40px]">
            {p.title}
          </h3>

          <span className="absolute top-4 right-4 rounded-full bg-white/75 px-3 py-1.5 text-[12px] backdrop-blur">
            {p.category}
          </span>
        </div>

        {/* Body */}
        <div className="bg-white p-6 md:p-7">
          <p className="u-lede text-[15px]">{p.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="u-mono rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] text-[var(--color-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const categories = useMemo(
    () => ["الكل", ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );
  const [active, setActive] = useState("الكل");

  const shown = useMemo(
    () =>
      active === "الكل"
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );

  return (
    <section id="work" className="u-section border-t border-[var(--color-line)]">
      <div className="u-shell">
        <SectionLabel index="04">الأعمال</SectionLabel>

        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <WordReveal
            words={["ألقِ", "نظرة", "على", "أعمالي"]}
            accentFrom={3}
            className="u-head text-[32px] md:text-[48px]"
          />

          {/* Category filter */}
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${
                    active === c
                      ? "text-white"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {active === c && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-[var(--color-ink)]"
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-7 md:grid-cols-2 md:gap-9">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <Card key={p.title} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
