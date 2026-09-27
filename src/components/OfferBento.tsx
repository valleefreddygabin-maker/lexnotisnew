import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Mail, FileText, Database } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import gabinPhoto from "@/assets/gabin.png.asset.json";

export interface Offer {
  icon: LucideIcon;
  title: string;
  description: string;
  benefit?: string;
}

function CellText({ offer, tone = "default" }: { offer: Offer; tone?: "default" | "inverse" }) {
  const Icon = offer.icon;
  const inverse = tone === "inverse";
  return (
    <>
      <Icon
        aria-hidden
        strokeWidth={1.75}
        className={inverse ? "h-5 w-5 text-white/80" : "h-5 w-5 text-brand"}
      />
      <h3 className={`type-h3 mt-5 ${inverse ? "text-white" : ""}`}>{offer.title}</h3>
      <p
        className={`mt-2 max-w-md text-[15px] leading-relaxed ${
          inverse ? "text-white/85" : "text-muted-foreground"
        }`}
      >
        {offer.description}
      </p>
    </>
  );
}

function Benefit({ children, inverse }: { children?: string; inverse?: boolean }) {
  if (!children) return null;
  return (
    <p
      className={`mt-auto flex items-center gap-1.5 pt-6 font-mono text-[12px] ${
        inverse ? "text-white/80" : "text-foreground/70"
      }`}
    >
      <Check size={13} strokeWidth={2} className={inverse ? "text-white" : "text-brand"} />
      {children}
    </p>
  );
}

/** A small, real workflow rendered as UI: what an assistant actually does. */
function WorkflowVisual() {
  const steps = [
    { icon: Mail, label: "Demande reçue par email", meta: "09:14" },
    { icon: FileText, label: "Devis généré depuis votre modèle", meta: "09:14" },
    { icon: Database, label: "Fiche client mise à jour dans le CRM", meta: "09:15" },
  ];
  return (
    <div className="relative mt-auto pt-8">
      <div className="rounded-2xl bg-secondary/70 p-2 shadow-[inset_0_0_0_1px_var(--border)]">
      <ol className="space-y-1.5">
        {steps.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-3 rounded-xl bg-card px-3.5 py-3 shadow-[0_0_0_1px_var(--border),0_1px_2px_oklch(0.2_0.02_286/0.05)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <s.icon size={15} strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium tracking-[-0.01em]">
              {s.label}
            </span>
            <span className="font-mono text-[12px] text-muted-foreground tabular">{s.meta}</span>
          </li>
        ))}
      </ol>
      <p className="px-3.5 pb-1.5 pt-3 font-mono text-[12px] text-muted-foreground">
        Traité automatiquement, sans ressaisie
      </p>
      </div>
    </div>
  );
}

export function OfferBento({ offers }: { offers: Offer[] }) {
  const [assistants, automation, performance, security, websites, support] = offers;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
      {/* Large cell: assistants, with a real workflow */}
      <Reveal className="md:col-span-4 md:row-span-2">
        <article className="surface flex h-full flex-col p-7 md:p-9">
          <CellText offer={assistants} />
          <WorkflowVisual />
        </article>
      </Reveal>

      {/* Accent cell: the number that matters */}
      <Reveal delay={60} className="md:col-span-2 md:row-span-2">
        <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand p-7 text-white md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <CellText offer={automation} tone="inverse" />
          <div className="mt-auto pt-10">
            <p className="text-[15px] text-white/85">Jusqu'à</p>
            <p className="mt-1 text-[80px] font-semibold leading-[0.9] tracking-[-0.06em] tabular">
              40<span className="text-white/60">%</span>
            </p>
            <p className="mt-3 text-[15px] text-white/85">de temps gagné sur les tâches automatisées</p>
          </div>
        </article>
      </Reveal>

      {[performance, security, websites].map((offer, i) => (
        <Reveal key={offer.title} delay={60 + i * 60} className="md:col-span-2">
          <article className="surface flex h-full flex-col p-7">
            <CellText offer={offer} />
            <Benefit>{offer.benefit}</Benefit>
          </article>
        </Reveal>
      ))}

      {/* Wide cell: a real person, because the fear of AI is solved by people */}
      <Reveal delay={60} className="md:col-span-6">
        <article className="relative grid overflow-hidden rounded-3xl bg-brand-soft md:grid-cols-12">
          <div className="flex flex-col p-7 md:col-span-7 md:p-10">
            <CellText offer={support} />
            <Link
              to="/equipe"
              className="group mt-8 inline-flex w-fit items-center gap-1.5 text-[15px] font-medium text-brand"
            >
              Rencontrer l'équipe
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              />
            </Link>
          </div>
          <div className="relative h-64 md:col-span-5 md:h-auto">
            <img
              src={gabinPhoto.url}
              alt="Gabin, fondateur de LexNotis"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[50%_42%] md:object-[40%_40%]"
            />
          </div>
        </article>
      </Reveal>
    </div>
  );
}
