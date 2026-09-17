import { skillColumns } from "../data/content";
import { SectionHead } from "./Ui";


/** Three colour-headed columns — the reference's skills table. */
export default function Skills() {
  return (
    <section id="skills" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="خدمات تدفع نموك" className="mb-12 md:mb-16" />

        <div className="grid gap-5 md:grid-cols-3">
          {skillColumns.map((col, i) => (
            <div
              key={col.title}
              className="reveal overflow-hidden rounded-[20px] bg-[var(--color-card)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-16px_rgba(0,0,0,0.18)]" style={{ ["--d" as string]: `${i * 0.12}s` }}
            >
              <div
                className="display px-6 py-4 text-center text-[17px] text-white"
                style={{ background: col.color }}
              >
                {col.title}
              </div>
              <ul>
                {col.items.map((it) => (
                  <li
                    key={it}
                    className="border-b border-[var(--color-line)] px-6 py-4 text-center text-[15px] text-[var(--color-ink-2)] transition-colors duration-300 last:border-0 hover:bg-[var(--color-page)]"
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
  );
}
