import { useState } from "react";
import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Review = {
  title: string;
  text: string;
  name: string;
  role: string;
};

const reviews: Review[] = [
  {
    title: "Un accompagnement très réactif",
    text: "On a été accompagnés pas à pas par Hugo. Tout était clair dès le premier échange, et l'agent mis en place gère aujourd'hui la moitié de nos emails entrants. On a enfin arrêté de courir après les relances.",
    name: "Lucie R.",
    role: "Dirigeante d'une PME",
  },
  {
    title: "Un gain de temps incroyable",
    text: "L'automatisation de nos devis et de notre suivi client nous fait gagner un temps précieux. Ce genre d'outil devient vite indispensable quand on est une petite structure.",
    name: "Rémi F.",
    role: "Responsable commercial",
  },
  {
    title: "On ne rate plus un seul appel",
    text: "Même quand l'équipe est en déplacement, les demandes sont prises en charge et les rendez-vous se placent tout seuls dans l'agenda. Simple et très efficace.",
    name: "Claire M.",
    role: "Directrice d'une agence immobilière",
  },
  {
    title: "Je recommande vraiment",
    text: "J'avais peur de l'IA et de la complexité. Finalement c'est LexNotis qui a tout mis en place, et on nous a formés en une heure. Zéro stress.",
    name: "Laurent A.",
    role: "Gérant d'un salon de coiffure",
  },
  {
    title: "Prise en main ultra simple",
    text: "Ce que j'ai aimé, c'est que tout est pensé pour nous : le tableau de bord est lisible, on voit le temps gagné chaque semaine et on sait exactement ce que fait l'agent.",
    name: "Babacar N.",
    role: "Fondateur d'un studio",
  },
  {
    title: "C'est pro et rapide",
    text: "Trois semaines entre le premier rendez-vous et la mise en production. Le site a été livré avec le chatbot connecté à notre CRM. Rien à redire.",
    name: "Julia P.",
    role: "Directrice marketing",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="mb-5 break-inside-avoid rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-glow">
      <Stars />
      <h3 className="mt-3 text-sm font-semibold tracking-tight text-foreground">{r.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand-soft text-[10px] font-semibold text-foreground">
          {r.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
        <span>
          <span className="block text-xs font-medium text-foreground">{r.name}</span>
          <span className="block text-[11px] text-muted-foreground">{r.role}</span>
        </span>
      </div>
    </div>
  );
}

export function ReviewWall() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-sm">
              <Stars />
              <span className="text-xs text-muted-foreground">
                Noté <span className="font-semibold text-foreground">4.9 sur 5</span> par nos clients
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Des entreprises qui ont
              <br />
              <span className="text-gradient-brand">déjà repris du temps</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
              Avis fictifs présentés à titre illustratif.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div
            className={`overflow-hidden transition-all duration-700 ${
              expanded ? "max-h-[3000px]" : "max-h-[560px]"
            }`}
          >
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {reviews.map((r) => (
                <ReviewCard key={r.name} r={r} />
              ))}
            </div>
          </div>

          {!expanded && (
            <>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,black_35%,transparent)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/85 to-transparent" />
            </>
          )}

          <div className="relative mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:scale-105 hover:border-brand"
            >
              {expanded ? "Réduire les avis" : "Voir plus d'avis"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
