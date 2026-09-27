import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Delay in ms. Keep staggers short (40-80ms between siblings). */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
  style?: CSSProperties;
}

/**
 * Fades + lifts content in the first time it enters the viewport.
 * Pure CSS transition driven by one IntersectionObserver; no re-renders.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div", style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error polymorphic ref
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}
