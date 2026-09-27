import { useEffect, useRef } from "react";

interface Props {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

/**
 * Counts up once when scrolled into view. Server-renders the final value
 * (good for SEO / no-JS), writes frames straight to the DOM (no re-renders),
 * and stays static under prefers-reduced-motion.
 */
export function AnimatedCounter({
  to,
  duration = 1600,
  suffix = "",
  prefix = "",
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4); // strong ease-out
          el.textContent = format(to * eased);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    // Already on screen at mount: keep the final value, don't flash back to 0.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = format(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular">
      {format(to)}
    </span>
  );
}
