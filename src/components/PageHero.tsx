import type { ReactNode } from "react";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  /** Small mono label above the title. Use sparingly. */
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  /** Optional visual on the right (desktop) / below (mobile). */
  aside?: ReactNode;
  className?: string;
}

/** Left-aligned page opener shared by inner pages. Plays the load stagger once. */
export function PageHero({ label, title, lead, actions, aside, className }: Props) {
  return (
    <section className={cn("container-page pb-16 pt-14 md:pb-24 md:pt-24", className)}>
      <div className={cn(aside && "grid items-center gap-14 lg:grid-cols-12 lg:gap-8")}>
        <div className={cn(aside && "lg:col-span-6")}>
          {label && <p className="type-label enter">{label}</p>}
          <h1
            className={cn("type-display enter max-w-4xl", label && "mt-5")}
            style={stagger(1)}
          >
            {title}
          </h1>
          {lead && (
            <p className="type-lead enter mt-6 max-w-2xl" style={stagger(2)}>
              {lead}
            </p>
          )}
          {actions && (
            <div className="enter mt-9 flex flex-wrap gap-3" style={stagger(3)}>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="enter lg:col-span-6" style={stagger(2)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
