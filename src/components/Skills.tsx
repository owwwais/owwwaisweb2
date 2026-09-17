import { motion } from "motion/react";
import { skillColumns } from "../data/content";
import { SectionHead } from "./Ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Three colour-headed columns — the reference's skills table. */
export default function Skills() {
  return (
    <section id="skills" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="خدمات تدفع نموك" className="mb-12 md:mb-16" />

        <div className="grid gap-5 md:grid-cols-3">
          {skillColumns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: EASE, delay: i * 0.12 }}
              className="overflow-hidden rounded-[20px] bg-[var(--color-card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-16px_rgba(0,0,0,0.18)]"
            >
              <div
                className="display px-6 py-4 text-center text-[17px] text-white"
                style={{ background: col.color }}
              >
                {col.title}
              </div>
              <ul>
                {col.items.map((it) => (
                  <li
                    key={it}
                    className="border-b border-[var(--color-line)] px-6 py-4 text-center text-[15px] text-[var(--color-ink-2)] transition-colors duration-300 last:border-0 hover:bg-[var(--color-page)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
