import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { experience, skills, skillsNote } from "../data/content";
import { Reveal, WordReveal } from "./Motion";
import { SectionLabel } from "./Ui";

/* Self-assessed levels rendered as proportions — the caption keeps
   them honest about being an estimate. */
const levelWidth: Record<string, string> = {
  "متقدم": "92%",
  "جيد": "72%",
  "عند الحاجة": "48%",
};

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="u-section border-t border-[var(--color-line)]"
    >
      <div className="u-shell">
        <SectionLabel index="06">المسار</SectionLabel>

        <WordReveal
          words={["الخبرة", "العملية", "والمؤهلات"]}
          accentFrom={2}
          className="u-head mb-14 text-[32px] md:mb-20 md:text-[48px]"
        />

        {/* Timeline — the rail draws itself as you scroll */}
        <div ref={trackRef} className="relative pr-8 md:pr-12">
          <div className="absolute top-2 right-[3px] bottom-2 w-px bg-[var(--color-line)]" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute top-2 right-[3px] bottom-2 w-px bg-[var(--color-accent)]"
          />
          <motion.span
            style={{ top: glowY }}
            className="absolute right-0 h-[7px] w-[7px] rounded-full bg-[var(--color-accent)] shadow-[0_0_0_5px_rgba(217,119,87,0.16)]"
          />

          {experience.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <article className="group relative pb-14 last:pb-0">
                <span className="absolute top-2.5 right-[-3px] h-[9px] w-[9px] rounded-full border-2 border-white bg-[var(--color-line-2)] transition-colors duration-500 group-hover:bg-[var(--color-accent)]" />

                <div className="grid gap-2 md:grid-cols-12 md:gap-8">
                  <span className="u-meta text-[12px] text-[var(--color-accent)] md:col-span-3">
                    {e.period}
                  </span>
                  <div className="md:col-span-9">
                    <h3 className="text-[19px] font-medium md:text-[21px]">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-[var(--color-faint)]">
                      {e.org}
                    </p>
                    <p className="u-lede mt-3 max-w-[62ch] text-[15px]">
                      {e.body}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-28 md:mt-36">
          <SectionLabel index="07">المهارات</SectionLabel>
          <Reveal>
            <p className="u-lede mb-10 max-w-[56ch] text-[15px]">
              {skillsNote}
            </p>
          </Reveal>

          <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04}>
                <div>
                  <div className="mb-2.5 flex items-baseline justify-between gap-4">
                    <span className="text-[15px]">{s.name}</span>
                    <span className="u-meta text-[12px] text-[var(--color-faint)]">
                      {s.level}
                    </span>
                  </div>
                  <div className="h-px w-full bg-[var(--color-line)]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: levelWidth[s.level] ?? "50%" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 1.15,
                        delay: 0.1 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-px bg-[var(--color-accent)]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
