import { stats } from "../data/content";
import { Counter, Reveal } from "./Motion";

export default function Stats() {
  return (
    <section className="u-shell py-16 md:py-24">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.09}>
            <div className="border-t border-[var(--color-line)] pt-6">
              <div className="flex items-baseline gap-0.5 text-[40px] leading-none font-light tracking-tight md:text-[56px]">
                <Counter to={s.value} />
                <span className="text-[var(--color-accent)]">{s.suffix}</span>
              </div>
              <p className="mt-3 text-[14px] text-[var(--color-muted)]">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
