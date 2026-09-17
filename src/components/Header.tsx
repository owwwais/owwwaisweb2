import { AnimatePresence, motion } from "motion/react";
import { EASE } from "./Motion";
import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";


export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="shell flex h-[92px] items-center justify-between">
          {/* Identity pill — avatar + name, mirroring the reference. */}
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
            className="card flex items-center gap-3 rounded-full py-2 pr-2 pl-5"
          >
            <img
              src={profile.photo}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="leading-tight">
              <span className="display block text-[15px]">أويس</span>
              <span className="block text-[11px] text-[var(--color-muted)]">
                علوم بيانات واستشارات
              </span>
            </span>
          </motion.a>

          {/* Menu trigger */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.18 }}
            className="card relative z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full"
          >
            <span className="flex flex-col gap-[5px]">
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block h-[1.6px] w-[18px] bg-[var(--color-ink)]"
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="block h-[1.6px] w-[18px] bg-[var(--color-ink)]"
              />
            </span>
          </motion.button>
        </div>
      </header>

      {/* Overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[var(--color-page)]/95 backdrop-blur-xl"
          >
            <div className="shell flex h-full flex-col justify-center">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="display group flex items-baseline gap-4 border-b border-[var(--color-line)] py-6 text-[34px] md:text-[52px]"
                >
                  <span className="mono text-[13px] text-[var(--color-faint)]">
                    0{i + 1}
                  </span>
                  <span className="transition-transform duration-500 group-hover:-translate-x-2">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
