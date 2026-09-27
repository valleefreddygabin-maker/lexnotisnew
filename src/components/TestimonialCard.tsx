import { Quote, Star } from "lucide-react";

interface Props {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials?: string;
  rating?: number;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  initials,
  rating = 5,
}: Props) {
  const displayInitials =
    initials ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-black/10 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:shadow-glow">
      <div className="absolute inset-0 -z-10 bg-gradient-brand-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <Quote
        className="mb-5 h-8 w-8 text-gradient-brand opacity-60"
        style={{ color: "oklch(0.55 0.24 295)" }}
      />

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        « {quote} »
      </p>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-110">
          {displayInitials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">
            {role}, {company}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    </div>
  );
}
