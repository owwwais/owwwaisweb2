import { motion } from "motion/react";
import { products } from "../data/content";
import { Reveal, WordReveal } from "./Motion";
import { SectionLabel } from "./Ui";

export default function Products() {
  return (
    <section
      id="products"
      className="u-section border-t border-[var(--color-line)] bg-[var(--color-surface)]"
    >
      <div className="u-shell">
        <SectionLabel index="05">المنتجات</SectionLabel>

        <div className="mb-14 grid gap-6 md:grid-cols-12">
          <WordReveal
            words={["أنظمة", "جاهزة", "تشتغل", "اليوم."]}
            accentFrom={3}
            className="u-head text-[32px] md:col-span-6 md:text-[48px]"
          />
          <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
            <p className="u-lede text-[16px]">
              اشترك في أحدها وجرّبه مباشرة، أو اطلب شراء نظام لتفصيله على
              احتياجك.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.65,
                delay: (i % 3) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col bg-white p-7 transition-colors duration-500 hover:bg-[var(--color-accent-soft)]"
            >
              <span className="u-mono text-[11px] text-[var(--color-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[17px] leading-[1.6] font-medium">
                {p.title}
              </h3>
              <p className="u-lede mt-3 grow text-[14px]">{p.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] text-[var(--color-accent)] opacity-0 transition-all duration-500 group-hover:opacity-100">
                التفاصيل
                <span className="transition-transform duration-500 group-hover:-translate-x-1">
                  ←
                </span>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
