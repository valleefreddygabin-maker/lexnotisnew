import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit?: string;
}

interface Props {
  pillars: Pillar[];
}

export function GridPillars({ pillars }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((p, i) => (
        <Reveal key={p.title} delay={i * 75}>
          <div className="group flex h-full flex-col rounded-3xl border border-black/10 bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:shadow-glow">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft ring-1 ring-black/10 transition-transform duration-500 group-hover:scale-110">
              <p.icon className="h-5 w-5 text-gradient-brand" style={{ color: "oklch(0.55 0.24 295)" }} />
            </div>
            <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground">
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            {p.benefit && (
              <div className="mt-auto pt-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gradient-brand">
                  {p.benefit}
                </span>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
