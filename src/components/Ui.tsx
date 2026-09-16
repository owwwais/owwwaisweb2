import type { ReactNode } from "react";
import { Reveal } from "./Motion";

/** Small numbered eyebrow that sits above every section heading. */
export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-7 flex items-center gap-3">
        <span className="u-mono text-[12px] text-[var(--color-accent)]">
          {index}
        </span>
        <span className="h-px w-8 bg-[var(--color-line-2)]" />
        <span className="text-[13px] tracking-wide text-[var(--color-muted)]">
          {children}
        </span>
      </div>
    </Reveal>
  );
}
