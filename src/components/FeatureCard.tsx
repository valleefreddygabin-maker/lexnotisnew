import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit?: string;
}

export function FeatureCard({ icon: Icon, title, description, benefit }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/10 bg-card/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:shadow-glow">
      <div className="absolute inset-0 -z-10 bg-gradient-brand-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft ring-1 ring-black/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-6 w-6 text-gradient-brand" style={{ color: "oklch(0.55 0.24 295)" }} />
      </div>

      <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

      {benefit && (
        <div className="mt-5 border-t border-black/10 pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-gradient-brand">
            {benefit}
          </p>
        </div>
      )}
    </div>
  );
}
