import { about, method, timeline } from "../data/content";
import { Reveal } from "./Motion";
import ProfileCard from "./ProfileCard";
import { SectionHead } from "./Ui";


export default function About() {
  return (
    <section id="about" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text={about.heading} className="mb-12 md:mb-16" />

        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <ProfileCard />
          </div>

          {/* Bio */}
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="card flex h-full flex-col justify-center p-7 md:p-9">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="lede mb-4 text-[15px] last:mb-0 md:text-[16px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Method */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {method.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <div className="card h-full p-7">
                <span className="display text-[22px] text-[var(--color-orange)]">
                  {m.n}
                </span>
                <h3 className="display mt-3 text-[19px]">{m.title}</h3>
                <p className="lede mt-2 text-[14px]">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Path — stacked cards like the reference's "المسار الذي سلكته" */}
        <div className="mt-20 md:mt-24">
          <SectionHead
            as="h3"
            text={timeline.heading}
            className="mb-10 !text-[28px] md:!text-[40px]"
          />

          <div className="grid gap-3">
            {timeline.items.map((t, i) => (
              <div
                key={t.title}
                className="reveal card flex flex-wrap items-center justify-between gap-3 px-6 py-5 transition-transform duration-500 hover:-translate-y-1" style={{ ["--d" as string]: `${i * 0.07}s` }}
            >
                <div>
                  <h4 className="display text-[17px]">{t.title}</h4>
                  <p className="text-[13px] text-[var(--color-muted)]">
                    {t.org}
                  </p>
                </div>
                <span className="rounded-full bg-[var(--color-page)] px-4 py-1.5 text-[12px] text-[var(--color-muted)]">
                  {t.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
