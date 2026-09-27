import type { CSSProperties } from "react";

/** Stagger index for the `.enter` load animation (70ms per step). */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
