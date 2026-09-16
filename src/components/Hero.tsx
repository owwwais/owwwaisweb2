import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero, profile, stack } from "../data/content";
import { Magnetic, Marquee, WordReveal } from "./Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The hero recedes gently as the next section rises over it.
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pt-[136px] pb-20 md:pt-[190px] md:pb-28"
    >
      {/* Soft ambient wash — keeps the white from reading as flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.55] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #f6e5de 0%, #fdf6f2 45%, transparent 70%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="u-shell relative">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[13px] text-[var(--color-muted)]">
            {hero.kicker}
          </span>
        </motion.div>

        <WordReveal
          words={hero.headline}
          stagger={0.055}
          accentFrom={7}
          className="u-head max-w-[17ch] text-[36px] leading-[1.28] sm:text-[52px] md:text-[68px] lg:text-[78px]"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          className="u-lede mt-8 max-w-[52ch] text-[16px] md:mt-10 md:text-[18px]"
        >
          {hero.lede}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1 }}
          className="mt-11 flex flex-wrap items-center gap-4 md:mt-14"
        >
          <Magnetic>
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-7 py-4 text-[15px] text-white transition-colors duration-300 hover:bg-[var(--color-accent)]"
            >
              {hero.primaryCta.label}
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-line-2)] px-7 py-4 text-[15px] transition-colors duration-300 hover:border-[var(--color-ink)]"
            >
              {hero.secondaryCta.label}
            </a>
          </Magnetic>

          <span className="u-meta mr-1 text-[13px] text-[var(--color-faint)]">
            {hero.proof}
          </span>
        </motion.div>
      </motion.div>

      {/* Tooling marquee — quiet texture at the base of the fold */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.25 }}
        className="mt-20 border-y border-[var(--color-line)] py-5 md:mt-28"
      >
        <Marquee duration={55}>
          {stack.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="u-mono flex items-center gap-8 px-8 text-[13px] whitespace-nowrap text-[var(--color-faint)]"
            >
              {s}
              <span className="text-[var(--color-accent)]">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>

      <span className="sr-only">
        {profile.name} — {profile.role}
      </span>
    </section>
  );
}
