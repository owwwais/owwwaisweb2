import { cta, services } from "../data/content";
import { SectionHead } from "./Ui";


export default function Services() {
  return (
    <>
      {/* Mid-page CTA banner */}
      <section className="band py-16 md:py-20">
        <div className="shell">
          <div
            className="reveal rounded-[32px] bg-[var(--color-ink)] px-8 py-14 text-center md:px-12 md:py-16"
          >
            <h3 className="display text-[28px] text-white md:text-[40px]">
              {cta.banner}
            </h3>
            <a
              href="#contact"
              className="pill pill-light mt-8 inline-flex"
            >
              {cta.label}
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="band py-20 md:py-28">
        <div className="shell">
          <SectionHead text={services.heading} className="mb-12 md:mb-16" />

          <div className="grid gap-5 md:grid-cols-3">
            {services.groups.map((g, i) => (
              <div
                key={g.title}
                className="reveal card p-7" style={{ ["--d" as string]: `${i * 0.1}s` }}
            >
                <h3 className="display mb-5 text-[20px]">{g.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full bg-[var(--color-page)] px-4 py-2 text-[13px] text-[var(--color-muted)] transition-colors duration-300 hover:bg-[var(--color-ink)] hover:text-white"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
