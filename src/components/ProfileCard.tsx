import { motion } from "motion/react";
import { useState } from "react";
import { links, profile } from "../data/content";
import { EASE } from "./Motion";
import { Spotlight } from "./Pointer";

/** Inline so the page ships no icon dependency. */
const ICONS: Record<string, string> = {
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.2-4.5c-.4-.6-.9-1.5-.9-2.4s.4-1.3.6-1.5c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a8 8 0 0 0 3.5 3c.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.2.1.4.2.4.4s0 .8-.2 1.4Z",
  linkedin:
    "M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1A4.2 4.2 0 0 1 17.6 8.7c4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z",
  x: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.5-8.6L1.2 3h6.6l4.5 5.6L17.5 3Zm-1.1 16h1.8L7.7 4.8H5.8L16.4 19Z",
  behance:
    "M8.3 6.5c1.9 0 3.3.6 3.3 2.6 0 1.1-.5 1.8-1.5 2.2 1.3.4 2 1.4 2 2.8 0 2.3-1.9 3.3-4 3.3H2V6.5h6.3Zm-.4 4.4c.9 0 1.4-.4 1.4-1.2s-.6-1.1-1.4-1.1H4.7v2.3h3.2Zm.2 4.5c1 0 1.7-.4 1.7-1.4 0-1-.6-1.4-1.7-1.4H4.7v2.8h3.4ZM18.4 8.9c2.4 0 3.9 1.6 3.9 4.2v.6h-5.7c.1 1.2.8 1.9 2 1.9.8 0 1.4-.3 1.7-.9h1.9c-.4 1.7-1.8 2.6-3.6 2.6-2.5 0-4-1.7-4-4.2s1.5-4.2 3.8-4.2Zm1.8 3.4c-.1-1-.8-1.7-1.8-1.7s-1.7.6-1.8 1.7h3.6ZM15.4 7h4.9v1.2h-4.9V7Z",
  youtube:
    "M23 12s0-3.3-.4-4.9a2.6 2.6 0 0 0-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.8.4A2.6 2.6 0 0 0 1.4 7.2C1 8.7 1 12 1 12s0 3.3.4 4.8a2.6 2.6 0 0 0 1.8 1.8C4.8 19 12 19 12 19s7.2 0 8.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8Zm-13.2 3.1V8.9L15.9 12l-6.1 3.1Z",
  github:
    "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8 0-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
};

export default function ProfileCard() {
  const [src, setSrc] = useState(profile.portrait);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.95, ease: EASE }}
      className="card group overflow-hidden"
    >
      <Spotlight size={340} />

      {/* Portrait — the artwork already carries the page's cream + gold, so it
          sits on the plain surface with no treatment. */}
      <div className="relative overflow-hidden bg-[var(--color-card)]">
        <img
          src={src}
          onError={() => setSrc(profile.photo)}
          alt={profile.name}
          className="aspect-[3/4] w-full object-cover object-top transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-card)] to-transparent"
        />
      </div>

      <div className="relative z-[2] px-7 pb-7">
        <h3 className="display text-[22px]">{profile.name}</h3>
        <p className="mt-1 text-[14px] text-[var(--color-muted)]">
          {profile.role}
        </p>

        {/* Socials */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {links.socials.map((s, i) => (
            <motion.a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              title={s.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-page)] text-[var(--color-ink)] transition-all duration-400 ease-out hover:-translate-y-0.5 hover:bg-[var(--color-ink)] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="currentColor"
                aria-hidden
              >
                <path d={ICONS[s.key]} />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* CV */}
        <a
          href={links.cv}
          download
          className="pill pill-dark mt-6 flex w-full !py-4 text-[15px]"
        >
          تحميل السيرة الذاتية
          <span aria-hidden>↓</span>
        </a>
      </div>
    </motion.div>
  );
}
