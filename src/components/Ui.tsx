import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const word: Variants = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

/**
 * Big centred display heading that reveals word by word — the reference
 * uses this for every section title.
 */
export function SectionHead({
  text,
  className = "",
  as = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const Tag = motion[as];
  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      className={`display text-center text-[34px] sm:text-[44px] md:text-[56px] ${className}`}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
        >
          <motion.span variants={word} style={{ display: "inline-block" }}>
            {w}
          </motion.span>
          {" "}
        </span>
      ))}
    </Tag>
  );
}

/** Rotating circular caption used on the project cards. */
export function CircleBadge({ label }: { label: string }) {
  const chars = [...label.padEnd(28, " ")];
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="relative flex h-[86px] w-[86px] scale-75 items-center justify-center rounded-full bg-[var(--color-ink)] opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          className="absolute inset-0"
        >
          {chars.map((c, i) => (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 text-[10px] text-white"
              style={{
                transform: `rotate(${(360 / chars.length) * i}deg) translateY(-36px)`,
                transformOrigin: "0 0",
              }}
            >
              {c}
            </span>
          ))}
        </motion.span>
        <span className="text-[16px] text-white">←</span>
      </span>
    </span>
  );
}
