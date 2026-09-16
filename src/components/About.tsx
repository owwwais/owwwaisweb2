import { about, method, services } from "../data/content";
import { Reveal, WordReveal } from "./Motion";
import { SectionLabel } from "./Ui";

export default function About() {
  return (
    <section id="about" className="u-section border-t border-[var(--color-line)]">
      <div className="u-shell">
        <SectionLabel index="01">{about.title}</SectionLabel>

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <WordReveal
              words={about.headline}
              accentFrom={3}
              className="u-head text-[30px] md:sticky md:top-32 md:text-[42px]"
            />
          </div>

          <div className="md:col-span-7">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="u-lede mb-6 text-[16px] md:text-[17px]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---- What I do ---- */}
      <div className="u-shell mt-28 md:mt-40">
        <SectionLabel index="02">ما أقدّمه</SectionLabel>

        <div className="mt-2 border-t border-[var(--color-line)]">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="group grid gap-3 border-b border-[var(--color-line)] py-9 transition-colors duration-500 hover:bg-[var(--color-surface)] md:grid-cols-12 md:gap-8 md:px-4">
                <div className="md:col-span-3">
                  <span className="u-meta text-[12px] text-[var(--color-accent)]">
                    {s.metric}
                  </span>
                </div>
                <h3 className="text-[19px] font-medium md:col-span-4 md:text-[21px]">
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5">
                    {s.title}
                  </span>
                </h3>
                <p className="u-lede text-[15px] md:col-span-5">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-[15px] text-[var(--color-muted)]">
            تبحث عن شيء غير مذكور هنا؟{" "}
            <a href="#contact" className="u-underline text-[var(--color-ink)]">
              اسألني مباشرة
            </a>
            .
          </p>
        </Reveal>
      </div>

      {/* ---- Method ---- */}
      <div className="u-shell mt-28 md:mt-40">
        <SectionLabel index="03">{method.title}</SectionLabel>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {method.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="h-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-line-2)] hover:bg-white hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.22)]">
                <span className="u-display text-[30px] text-[var(--color-accent)]">
                  {s.n}
                </span>
                <h3 className="mt-4 text-[18px] font-medium">{s.title}</h3>
                <p className="u-lede mt-3 text-[15px]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
