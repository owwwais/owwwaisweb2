import { motion } from "motion/react";
import { EASE } from "./Motion";
import { cta, services } from "../data/content";
import { SectionHead } from "./Ui";


export default function Services() {
  return (
    <>
      {/* Mid-page CTA banner */}
      <section className="band py-16 md:py-20">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, ease: EASE }}
            className="rounded-[32px] bg-[var(--color-ink)] px-8 py-14 text-center md:px-12 md:py-16"
          >
            <h3 className="display text-[28px] text-white md:text-[40px]">
              {cta.banner}
            </h3>
            <a
              href="#contact"
              className="pill pill-light mt-8 inline-flex"
            >
              {cta.label}
            </a>
          </motion.div>
        </div>
      </section>

      <section id="services" className="band py-20 md:py-28">
        <div className="shell">
          <SectionHead text={services.heading} className="mb-12 md:mb-16" />

          <div className="grid gap-5 md:grid-cols-3">
            {services.groups.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.95, ease: EASE, delay: i * 0.1 }}
                className="card p-7"
              >
                <h3 className="display mb-5 text-[20px]">{g.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-[var(--color-page)] px-4 py-2 text-[13px] text-[var(--color-muted)] transition-colors duration-300 hover:bg-[var(--color-ink)] hover:text-white"
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
    </>
  );
}
