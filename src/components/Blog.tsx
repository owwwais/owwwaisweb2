import { motion } from "motion/react";
import { posts } from "../data/content";
import { Spotlight } from "./Pointer";
import { EASE } from "./Motion";
import { SectionHead } from "./Ui";

export default function Blog() {
  return (
    <section id="blog" className="band py-20 md:py-28">
      <div className="shell">
        <SectionHead
          text="من المدوّنة، ما تعلّمته أثناء العمل."
          className="mb-12 md:mb-16"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className="card group flex flex-col overflow-hidden transition-transform duration-[600ms] ease-out hover:-translate-y-1.5"
            >
              <Spotlight />
              <div className="overflow-hidden">
                <img
                  src={post.img}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                />
              </div>

              <div className="flex grow flex-col p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[var(--color-page)] px-3 py-1 text-[11px] text-[var(--color-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="display-soft text-[17px] leading-[1.65]">
                  {post.title}
                </h3>
                <p className="lede mt-2 grow text-[14px]">{post.excerpt}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] text-[var(--color-faint)]">
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-[var(--color-orange)] transition-transform duration-500 ease-out group-hover:-translate-x-1">
                    اقرأ المزيد
                    <span aria-hidden>←</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
