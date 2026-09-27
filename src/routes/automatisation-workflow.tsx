import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleCheck, Workflow, Mail, FileText, CalendarCheck, Database, Bot } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";
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
    title: "1. Cartographie de vos processus",
    text: "On liste vos tâches répétitives, leur fréquence et le temps qu'elles consomment réellement chaque semaine.",
  },
  {
    title: "2. Estimation du retour sur investissement",
    text: "Temps mensuel économisé × coût horaire interne, comparé au coût de mise en place : vous décidez avec un chiffre, pas une promesse.",
  },
  {
    title: "3. Déploiement progressif",
    text: "On automatise d'abord le processus au meilleur rapport gain/effort, puis on étend une fois les résultats visibles.",
  },
  {
    title: "4. Mesure et ajustement",
    text: "Le tableau de bord suit les tâches traitées et le temps gagné, pour ajuster les workflows dans le temps.",
  },
];

function AutomatisationWorkflowPage() {
  return (
    <div className="overflow-hidden">
      <section className="px-6 pt-8 pb-12 md:pt-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
            Automatisation de workflow
          </p>
          <h1 className="text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Automatisez vos workflows,{" "}
            <span className="text-gradient-brand">récupérez vos heures</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground md:text-base">
            Un workflow, c'est l'enchaînement des étapes d'un processus métier : une demande arrive,
            elle est qualifiée, un document est produit, un outil est mis à jour, un suivi est
            déclenché. LexNotis conçoit des automatisations sur-mesure qui exécutent ces
            enchaînements à votre place, dans les outils que vous utilisez déjà.
          </p>
          <div className="mt-7 flex justify-center">
            <GradientLink to="/contact">
              Analyser mes processus <ArrowRight size={16} />
            </GradientLink>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                Exemples d'automatisations d'entreprise
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                Les processus que nous automatisons le plus souvent, avant et après mise en place.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-black/10 bg-card/40 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:shadow-glow">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand-soft border border-black/10">
                    <e.icon className="h-6 w-6" style={{ color: "oklch(0.55 0.24 295)" }} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold tracking-tight">{e.title}</h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Avant</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.before}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gradient-brand">Après</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.after}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                Comment on mesure le <span className="text-gradient-brand">retour sur investissement</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                Chaque projet démarre par un calcul simple et vérifiable, avant toute ligne de code.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {roiSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-black/10 bg-card/40 p-7 backdrop-blur-sm">
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <ul className="mx-auto mt-10 grid max-w-3xl gap-3">
              {[
                "Vos outils actuels sont conservés : on les connecte, on ne les remplace pas.",
                "Chaque automatisation est documentée et reste sous votre contrôle.",
                "Vous gardez la main : validation humaine possible à chaque étape sensible.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CircleCheck
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "oklch(0.55 0.24 295)" }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-gradient-brand-soft p-10 text-center md:p-12">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Quel processus vous coûte le plus de temps ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Décrivez-nous votre organisation actuelle : nous identifions les workflows automatisables
            et l'ordre dans lequel les traiter. Diagnostic offert, réponse sous 24h.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <GradientLink to="/contact">
              Demander mon diagnostic <ArrowRight size={16} />
            </GradientLink>
            <GradientLink to="/services" variant="ghost">
              Voir tous nos services
            </GradientLink>
          </div>
        </div>
      </section>
    </div>
  );
}
