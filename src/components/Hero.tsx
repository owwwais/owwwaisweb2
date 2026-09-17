import { motion } from "motion/react";
import { hero, stack, stats } from "../data/content";
import { Counter, Marquee } from "./Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The wordmark rises out of a mask as ONE unit. Splitting Arabic into
 * per-letter spans risks breaking the script's cursive shaping, and the
 * reference reveals whole words anyway.
 */
function Wordmark({ text }: { text: string }) {
  return (
    <h1
      className="display whitespace-nowrap"
      style={{ fontSize: "clamp(56px, 15vw, 128px)", lineHeight: 1.35 }}
    >
      <span
        style={{
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom",
          paddingBottom: "0.1em",
          marginBottom: "-0.1em",
        }}
      >
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ y: "115%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
        >
          {text}
        </motion.span>
      </span>
    </h1>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-[150px] md:pt-[190px]">
      <div className="shell text-center">
        <Wordmark text={hero.title} />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          className="lede mx-auto mt-6 max-w-[54ch] text-[15px] md:text-[17px]"
        >
          {hero.lede}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={hero.primary.href} className="pill pill-dark">
            {hero.primary.label}
          </a>
          <a href={hero.secondary.href} className="pill pill-light">
            {hero.secondary.label}
          </a>
        </motion.div>
      </div>

      {/* Proof band: tooling marquee + headline numbers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.15 }}
        className="band mt-20 py-7 md:mt-28"
      >
        <div className="shell flex flex-col items-center gap-7 md:flex-row md:justify-between">
          <div className="flex shrink-0 items-center gap-5">
            {stats.slice(0, 2).map((s) => (
              <div key={s.label} className="text-center">
                <div className="display text-[26px] leading-none">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[12px] text-[var(--color-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full min-w-0 md:max-w-[620px]">
            <Marquee duration={46}>
              {stack.map((s, i) => (
                <span
                  key={`${s}-${i}`}
                  className="mono flex items-center gap-7 px-7 text-[13px] whitespace-nowrap text-[var(--color-faint)]"
                >
                  {s}
                  <span className="text-[var(--color-orange)]">✦</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
