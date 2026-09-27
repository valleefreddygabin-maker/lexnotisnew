import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Workflow, Mail, FileText, CalendarCheck, Database, Bot } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const TITLE = "Automatisation de workflow pour entreprises | LexNotis";
const DESCRIPTION =
  "Automatisation de workflow sur-mesure : devis, relances, facturation, rendez-vous, CRM. Exemples concrets, gains de temps et déroulé de projet par LexNotis, en Sarthe.";

export const Route = createFileRoute("/automatisation-workflow")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Automatisation de workflow sur-mesure — LexNotis" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lexnotis.com/automatisation-workflow" },
    ],
    links: [{ rel: "canonical", href: "https://lexnotis.com/automatisation-workflow" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Automatisation de workflow",
          serviceType: "Automatisation de processus métier",
          description:
            "Conception et déploiement d'automatisations de workflow sur-mesure : connexion des outils métier, traitement automatique des tâches répétitives et suivi des gains de temps.",
          areaServed: "France",
          provider: {
            "@type": "Organization",
            name: "LexNotis",
            url: "https://lexnotis.com",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lexnotis.com/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://lexnotis.com/services" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Automatisation de workflow",
              item: "https://lexnotis.com/automatisation-workflow",
            },
          ],
        }),
      },
    ],
  }),
  staticData: {
    cta: {
      title: "Quel processus vous coûte le plus de temps ?",
      text: "Décrivez-nous votre organisation actuelle : nous identifions les workflows automatisables et l'ordre dans lequel les traiter. Diagnostic offert, réponse sous 24h.",
    },
  },
  component: AutomatisationWorkflowPage,
});

const examples = [
  {
    icon: FileText,
    title: "Devis et documents générés automatiquement",
    before: "Rédaction manuelle dans un modèle Word, envoi à la main, oubli de relance.",
    after:
      "Le devis est généré depuis les données du CRM, envoyé au client et archivé, avec relance programmée s'il n'est pas signé.",
  },
  {
    icon: Mail,
    title: "Traitement et tri des emails entrants",
    before: "Chaque demande est lue, qualifiée puis recopiée dans un outil de suivi.",
    after:
      "Les demandes sont classées par type, résumées et créées directement comme fiche client ou ticket, avec réponse d'accusé immédiate.",
  },
  {
    icon: CalendarCheck,
    title: "Prise de rendez-vous sans va-et-vient",
    before: "Plusieurs échanges pour trouver un créneau, saisie manuelle dans l'agenda.",
    after:
      "Le créneau est proposé selon vos disponibilités réelles, confirmé, ajouté à l'agenda et rappelé automatiquement.",
  },
  {
    icon: Database,
    title: "Synchronisation entre vos outils",
    before: "Les mêmes informations saisies dans le CRM, la compta et le tableur de suivi.",
    after:
      "Une seule saisie se propage à tous vos outils, sans doublon ni écart entre les bases.",
  },
  {
    icon: Bot,
    title: "Assistant interne connecté à vos process",
    before: "On cherche l'information dans les dossiers partagés ou on demande à un collègue.",
    after:
      "L'assistant répond depuis vos documents et vos procédures, et déclenche l'action demandée en langage naturel.",
  },
  {
    icon: Workflow,
    title: "Facturation et suivi des paiements",
    before: "Édition des factures en fin de mois, pointage des règlements à la main.",
    after:
      "Factures émises à l'événement déclencheur, rapprochement des paiements et relances des impayés automatisées.",
  },
];

const roiSteps = [
  {
    title: "Cartographie de vos processus",
    text: "On liste vos tâches répétitives, leur fréquence et le temps qu'elles consomment réellement chaque semaine.",
  },
  {
    title: "Estimation du retour sur investissement",
    text: "Temps mensuel économisé × coût horaire interne, comparé au coût de mise en place : vous décidez avec un chiffre, pas une promesse.",
  },
  {
    title: "Déploiement progressif",
    text: "On automatise d'abord le processus au meilleur rapport gain/effort, puis on étend une fois les résultats visibles.",
  },
  {
    title: "Mesure et ajustement",
    text: "Le tableau de bord suit les tâches traitées et le temps gagné, pour ajuster les workflows dans le temps.",
  },
];

const guarantees = [
  "Vos outils actuels sont conservés : on les connecte, on ne les remplace pas.",
  "Chaque automatisation est documentée et reste sous votre contrôle.",
  "Vous gardez la main : validation humaine possible à chaque étape sensible.",
];

function AutomatisationWorkflowPage() {
  return (
    <div>
      <PageHero
        label="Automatisation de workflow"
        title={
          <>
            Automatisez vos workflows, <span className="text-brand">récupérez vos heures.</span>
          </>
        }
        lead="Un workflow, c'est l'enchaînement des étapes d'un processus métier : une demande arrive, elle est qualifiée, un document est produit, un outil est mis à jour, un suivi est déclenché. LexNotis conçoit des automatisations sur-mesure qui exécutent ces enchaînements à votre place, dans les outils que vous utilisez déjà."
        actions={
          <GradientLink to="/contact">
            Analyser mes processus <ArrowRight size={16} />
          </GradientLink>
        }
      />

      {/* EXAMPLES: before / after */}
      <section className="container-page pb-24 md:pb-32">
        <Reveal>
          <h2 className="type-h2 max-w-3xl">Exemples d'automatisations d'entreprise.</h2>
          <p className="type-lead mt-5 max-w-xl">
            Les processus que nous automatisons le plus souvent, avant et après mise en place.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 md:grid-cols-2 md:gap-4">
          {examples.map((e, i) => (
            <Reveal key={e.title} delay={(i % 2) * 70}>
              <article className="surface flex h-full flex-col p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <e.icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.02em]">
                    {e.title}
                  </h3>
                </div>
                <div className="mt-6 grid flex-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="font-mono text-[12px] text-muted-foreground">Avant</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{e.before}</p>
                  </div>
                  <div className="rounded-2xl bg-brand-soft p-4">
                    <p className="font-mono text-[12px] text-brand">Après</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-foreground">{e.after}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROI */}
      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <h2 className="type-h2">
                Comment on mesure le <span className="text-brand">retour sur investissement.</span>
              </h2>
              <p className="type-lead mt-6 max-w-md">
                Chaque projet démarre par un calcul simple et vérifiable, avant toute ligne de
                code.
              </p>
              <ul className="mt-10 space-y-3.5">
                {guarantees.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-relaxed">
                    <Check size={17} strokeWidth={2} className="mt-0.5 shrink-0 text-brand" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {roiSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 60}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border py-9 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-[13px] leading-[1.9] text-muted-foreground tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="type-h3">{s.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
