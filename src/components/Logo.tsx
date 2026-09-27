import { Link } from "@tanstack/react-router";
import { useId } from "react";

interface Props {
  /** Masque le texte "LexNotis" et son tagline. */
  compact?: boolean;
  /** Rend le logo non cliquable (dashboard). */
  static?: boolean;
  /** Retire le halo flouté derrière le pictogramme. */
  glow?: boolean;
  gradientId?: string;
}

export function Logo({
  compact = false,
  static: isStatic = false,
  glow = true,
  gradientId,
}: Props) {
  // Chaque instance reçoit un identifiant unique : un id partagé entre
  // plusieurs logos (barre mobile + sidebar) empêchait le dégradé de
  // s'afficher quand la première occurrence était masquée.
  const uniqueId = useId().replace(/:/g, "");
  const gradId = `${gradientId ?? "ln-grad"}-${uniqueId}`;

  const content = (
    <>
      <div className="relative">
        {glow && (
          <div className="absolute inset-0 rounded-xl bg-gradient-brand opacity-40 blur-lg transition-opacity group-hover:opacity-70" />
        )}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="relative"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.22 290)" />
              <stop offset="100%" stopColor="oklch(0.68 0.18 245)" />
            </linearGradient>
          </defs>
          <path
            d="M6 6 L6 30 L18 30 L14 26 L10 26 L10 6 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M18 30 L18 10 L22 14 L22 22 L30 12 L34 12 L34 30 L30 30 L30 20 L22 30 Z"
            fill={`url(#${gradId})`}
          />
        </svg>
      </div>
      {!compact && (
        <div className="flex flex-col items-start justify-start leading-tight">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            LexNotis
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Intelligence sur-mesure
          </span>
        </div>
      )}
    </>
  );

  if (isStatic) {
    return <div className="flex cursor-default select-none items-start gap-3">{content}</div>;
  }

  return (
    <Link to="/" className="group flex items-start gap-3">
      {content}
    </Link>
  );
}
