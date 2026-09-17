import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "../data/content";
import { SectionHead } from "./Ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="أسئلتك، جاوبنا عليها." className="mb-12 md:mb-16" />

        <div className="mx-auto grid max-w-[760px] gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, ease: EASE, delay: i * 0.06 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-right"
                >
                  <span className="display text-[16px] md:text-[17px]">
                    {f.q}
                  </span>
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <span className="absolute h-[1.6px] w-3.5 bg-current" />
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : 90, opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="absolute h-[1.6px] w-3.5 bg-current"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="lede px-6 pb-6 text-[14px] md:text-[15px]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
