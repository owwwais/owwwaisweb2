import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-[var(--color-line)] bg-white/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="u-shell flex h-[68px] items-center justify-between md:h-[76px]">
            <a
              href="#top"
              className="group flex items-center gap-2.5"
              aria-label={profile.name}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              <span className="text-[15px] font-medium tracking-tight">
                {profile.name}
              </span>
            </a>

            <nav className="hidden items-center gap-9 md:flex">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="u-underline text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="hidden rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[14px] text-white transition-all duration-300 hover:bg-[var(--color-accent)] md:inline-block"
            >
              اتصل بي
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-[1.5px] w-5 bg-[var(--color-ink)] transition-all duration-300 ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-5 bg-[var(--color-ink)] transition-all duration-300 ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <motion.div
          style={{ scaleX: progress, transformOrigin: "right" }}
          className="h-[2px] w-full bg-[var(--color-accent)]"
        />
      </motion.header>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={{
          clipPath: open
            ? "inset(0% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-0 z-40 bg-white md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div className="u-shell flex h-full flex-col justify-center gap-2">
          {nav.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: open ? 0.15 + i * 0.06 : 0, duration: 0.5 }}
              className="border-b border-[var(--color-line)] py-5 text-[28px] font-light"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: open ? 0.15 + nav.length * 0.06 : 0 }}
            className="mt-8 rounded-full bg-[var(--color-ink)] px-6 py-4 text-center text-white"
          >
            اتصل بي
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
