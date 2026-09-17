import { motion } from "motion/react";
import { about, method, profile, timeline } from "../data/content";
import { EASE, Reveal } from "./Motion";
import { SectionHead } from "./Ui";


export default function About() {
  return (
    <section id="about" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text={about.heading} className="mb-12 md:mb-16" />

        <div className="grid gap-6 md:grid-cols-12">
          {/* Portrait */}
          <Reveal className="md:col-span-5">
            <div className="card overflow-hidden p-0">
              <img
                src={profile.photo}
                alt={profile.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="card h-full p-7 md:p-9">
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
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
                className="card flex flex-wrap items-center justify-between gap-3 px-6 py-5 transition-transform duration-500 hover:-translate-y-1"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
