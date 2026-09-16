import { contact, nav, profile, stack } from "../data/content";
import { Magnetic, Marquee, Reveal, WordReveal } from "./Motion";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact"
        className="u-section relative overflow-hidden border-t border-[var(--color-line)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-52 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #f6e5de 0%, #fdf6f2 50%, transparent 72%)",
          }}
        />

        <div className="u-shell relative text-center">
          <WordReveal
            words={contact.headline}
            stagger={0.05}
            accentFrom={5}
            className="u-head mx-auto max-w-[18ch] text-[32px] md:text-[58px]"
          />

          <Reveal delay={0.2}>
            <p className="u-lede mx-auto mt-8 max-w-[56ch] text-[16px] md:text-[17px]">
              {contact.body}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col items-center gap-5">
              <Magnetic strength={0.4}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-ink)] px-9 py-5 text-[16px] text-white transition-colors duration-300 hover:bg-[var(--color-accent)]"
                >
                  {contact.cta}
                  <span className="transition-transform duration-300 group-hover:-translate-x-1.5">
                    ←
                  </span>
                </a>
              </Magnetic>
              <span className="u-meta text-[13px] text-[var(--color-faint)]">
                {profile.responseTime}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Oversized wordmark marquee — a calm sign-off before the footer */}
      <div className="border-y border-[var(--color-line)] py-8 md:py-10">
        <Marquee duration={48}>
          <span className="u-display flex items-center gap-10 px-10 text-[46px] whitespace-nowrap text-[var(--color-ink)] md:text-[74px]">
            {profile.name}
            <span className="text-[var(--color-accent)]">✦</span>
            <span className="u-mono text-[18px] text-[var(--color-faint)] md:text-[26px]">
              {profile.handle}
            </span>
            <span className="text-[var(--color-accent)]">✦</span>
          </span>
        </Marquee>
      </div>

      <footer className="u-shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-[20px] font-medium">{profile.name}</h2>
            <p className="mt-2 text-[15px] text-[var(--color-muted)]">
              {profile.role}
            </p>
            <p className="text-[15px] text-[var(--color-muted)]">
              {profile.tagline}
            </p>
          </div>

          <nav className="md:col-span-3">
            <h3 className="u-meta mb-4 text-[12px] text-[var(--color-faint)]">
              الأقسام
            </h3>
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="u-underline text-[15px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h3 className="u-meta mb-4 text-[12px] text-[var(--color-faint)]">
              معلومات التواصل
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="u-underline block text-[15px]"
            >
              {profile.email}
            </a>
            <p className="mt-2 text-[15px] text-[var(--color-muted)]">
              {profile.location}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--color-line)] pt-7">
          <div className="mb-7">
            <p className="u-mono flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[var(--color-faint)]">
              {stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
          </div>
          <p className="u-mono text-[12px] text-[var(--color-faint)]">
            © {year} {profile.handle}
          </p>
        </div>
      </footer>
    </>
  );
}
