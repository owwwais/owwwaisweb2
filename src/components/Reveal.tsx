import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveals, done with CSS instead of JS.
 *
 * Framer animates by writing inline styles every frame on the main thread.
 * With dozens of elements resolving at once that was the site's single largest
 * source of dropped frames (measured: 39.8% -> 15.3% with those animations
 * off). A class toggle plus a CSS transition on `opacity`/`transform` hands
 * the work to the compositor, so scrolling stays on budget.
 *
 * Framer is still the right tool for interaction-driven motion — the menu,
 * the accordion, the expanding grid, the pointer effects — none of which run
 * during a scroll.
 */

let observer: IntersectionObserver | null = null;
const seen = new WeakSet<Element>();

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting || seen.has(e.target)) continue;
        seen.add(e.target);
        e.target.classList.add("is-in");
        observer!.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  return observer;
}

/**
 * Observes every `.reveal` in the document, including nodes added later (the
 * project grid grows when it expands). One observer for the whole page.
 */
export function useRevealScanner() {
  useEffect(() => {
    const ob = getObserver();

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (seen.has(el) || el.classList.contains("is-in")) return;
        // Anything already on screen should not wait for a scroll.
        if (el.getBoundingClientRect().top < window.innerHeight) {
          seen.add(el);
          el.classList.add("is-in");
        } else {
          ob.observe(el);
        }
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Anything already on screen at mount should not wait for a scroll.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("is-in");
      return;
    }
    const ob = getObserver();
    ob.observe(el);
    return () => ob.unobserve(el);
  }, []);
  return ref;
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Seconds. Becomes a CSS transition-delay, not a JS timer. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--d": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
