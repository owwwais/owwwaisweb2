import { motion } from "motion/react";
import { affiliations, profile, stats } from "../data/content";
import { Counter, EASE } from "./Motion";
import { Spotlight } from "./Pointer";
import { SectionHead } from "./Ui";

/**
 * Stands where the reference puts client testimonials. These are real
 * affiliations and published numbers rather than invented quotes.
 */
export default function Trusted() {
  return (
    <section className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="معتمد فيمـا أحـب" className="mb-12 md:mb-16" />

        {/* Numbers */}
        <div className="card mb-5 grid grid-cols-2 gap-y-10 px-6 py-10 md:grid-cols-4 md:px-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.09 }}
              className="text-center"
            >
              <div className="display text-[34px] leading-none md:text-[44px]">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-[13px] text-[var(--color-muted)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Where that experience came from */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {affiliations.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.07 }}
              className="card group flex items-center gap-4 px-6 py-5 transition-transform duration-[600ms] ease-out hover:-translate-y-1"
            >
              <Spotlight size={220} />
              <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-green)]" />
              <span>
                <span className="display block text-[15px]">{a.name}</span>
                <span className="block text-[12px] text-[var(--color-muted)]">
                  {a.note}
                </span>
              </span>
            </motion.div>
          ))}

          <motion.a
            href={`mailto:${profile.email}`}
            initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: affiliations.length * 0.07,
            }}
            className="flex items-center justify-center gap-2 rounded-[20px] border border-dashed border-[var(--color-line-2)] px-6 py-5 text-[14px] text-[var(--color-muted)] transition-colors duration-500 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
          >
            اسمك التالي هنا
            <span aria-hidden>←</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
