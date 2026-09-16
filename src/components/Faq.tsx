import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "../data/content";
import { Reveal, WordReveal } from "./Motion";
import { SectionLabel } from "./Ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="u-section border-t border-[var(--color-line)] bg-[var(--color-surface)]"
    >
      <div className="u-shell grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <SectionLabel index="08">الأسئلة الشائعة</SectionLabel>
          <WordReveal
            words={["أسئلة", "تتكرر", "كثيراً."]}
            accentFrom={2}
            className="u-head text-[30px] md:sticky md:top-32 md:text-[40px]"
          />
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="border-b border-[var(--color-line-2)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-right"
                  >
                    <span
                      className={`text-[16px] transition-colors duration-300 md:text-[17px] ${
                        isOpen ? "text-[var(--color-accent)]" : ""
                      }`}
                    >
                      {f.q}
                    </span>
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                      <span className="absolute h-px w-3.5 bg-current" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="absolute h-px w-3.5 bg-current"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="u-lede pb-7 text-[15px]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
