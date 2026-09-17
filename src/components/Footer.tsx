import { motion } from "motion/react";
import { EASE } from "./Motion";
import { cta, nav, profile } from "../data/content";



export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Final CTA */}
      <section id="contact" className="band py-20 md:py-28">
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="card px-8 py-14 text-center md:px-12 md:py-20"
          >
            <h2 className="display text-[30px] md:text-[48px]">
              {cta.finalHeading}
            </h2>
            <p className="lede mx-auto mt-6 max-w-[52ch] text-[15px] md:text-[16px]">
              {cta.body}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="pill pill-dark text-[17px]"
              >
                {cta.label}
              </a>
              <span className="text-[13px] text-[var(--color-faint)]">
                {cta.note}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="band">
        <div className="shell grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={profile.photo}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <h2 className="display text-[18px]">{profile.name}</h2>
                <p className="text-[13px] text-[var(--color-muted)]">
                  {profile.role}
                </p>
              </div>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-block text-[15px] underline decoration-[var(--color-line-2)] underline-offset-4 transition-colors hover:decoration-[var(--color-ink)]"
            >
              {profile.email}
            </a>
            <p className="mt-1 text-[14px] text-[var(--color-muted)]">
              {profile.location}
            </p>
          </div>

          <nav className="md:col-span-4">
            <h3 className="display mb-4 text-[15px]">الأقسام</h3>
            <ul className="grid gap-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[15px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="display mb-4 text-[15px]">الموقع السابق</h3>
            <a
              href="https://owwwais.com"
              className="text-[15px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              owwwais.com
            </a>
          </div>
        </div>

        <div className="shell border-t border-[var(--color-line)] py-6">
          <p className="mono text-[12px] text-[var(--color-faint)]">
            © {year} {profile.handle}
          </p>
        </div>
      </footer>
    </>
  );
}
