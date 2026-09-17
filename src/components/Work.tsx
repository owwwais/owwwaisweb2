import { motion } from "motion/react";
import { projects } from "../data/content";
import { CircleBadge, SectionHead } from "./Ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Work() {
  return (
    <section id="work" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="ألقِ نظرة على أعمالي" className="mb-12 md:mb-16" />

        <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.1 }}
              className="card group overflow-hidden transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Artwork sits on its own tile and is never cropped — these are
                  logo lockups, so `contain` keeps every mark whole. */}
              <div className="relative overflow-hidden bg-[var(--color-card)]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-contain p-8 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[var(--color-ink)] opacity-0 transition-opacity duration-500 group-hover:opacity-35"
                />
                <CircleBadge label="استعرض المشروع · " />
                <span className="absolute top-4 right-4 rounded-full bg-[var(--color-card)] px-3 py-1.5 text-[12px] text-[var(--color-muted)] shadow-sm">
                  {p.category}
                </span>
              </div>

              <div className="border-t border-[var(--color-line)] p-6 md:p-7">
                <h3 className="display text-[20px] md:text-[23px]">
                  {p.title}
                </h3>
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
          ))}
        </div>
      </div>
    </section>
  );
}
