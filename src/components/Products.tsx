import { Spotlight } from "./Pointer";
import { products } from "../data/content";
import { SectionHead } from "./Ui";


export default function Products() {
  return (
    <section id="products" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead text="أنظمة جاهزة تشتغل اليوم" className="mb-12 md:mb-16" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.title}
              className="reveal card group flex flex-col p-7 transition-transform duration-500 hover:-translate-y-1.5" style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}
            >
              <Spotlight />
              <span className="mono text-[11px] text-[var(--color-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-soft mt-3 text-[18px] leading-[1.6]">
                {p.title}
              </h3>
              <p className="lede mt-2 grow text-[14px]">{p.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] text-[var(--color-orange)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                التفاصيل
                <span>←</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
