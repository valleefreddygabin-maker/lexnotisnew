import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  Workflow,
  Bot,
  Cloud,
  Lock,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GradientLink } from "@/components/GradientButton";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Infrastructures IA sur-mesure | LexNotis" },
      {
        name: "description",
        content:
          "Audit, automatisation, assistants IA, cloud, sécurité, maintenance — nous couvrons toute la chaîne pour votre transformation.",
      },
      { property: "og:title", content: "Services LexNotis" },
      {
        property: "og:description",
        content:
          "Une offre complète pour concevoir, déployer et faire évoluer votre infrastructure intelligente.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              provider: { "@type": "Organization", name: "LexNotis", url: "https://lexnotis.com" },
            },
          })),
        }),
      },
    ],
  }),
  staticData: {
    cta: {
      title: "Un projet en tête ?",
      text: "Parlons-en. Le premier échange est offert et sans engagement.",
    },
  },
  component: ServicesPage,
});

const services = [
  {
    icon: Compass,
    title: "Audit & conseil stratégique",
    description:
      "On cartographie vos processus, identifie les goulots et priorise les gains rapides. Un plan clair, actionnable, sans jargon.",
    benefit: "Feuille de route sur-mesure",
  },
  {
    icon: Workflow,
    title: "Automatisation de workflows",
    description:
      "Vos outils travaillent ensemble. Devis, factures, CRM, emails, tableaux de bord : tout est connecté et se synchronise seul.",
    benefit: "Fini les copier-coller",
  },
  {
    icon: Bot,
    title: "Assistants IA métier",
    description:
      "Un assistant qui connaît votre entreprise, vos documents, vos clients. Il répond, résume, rédige et vous fait gagner des heures.",
    benefit: "Disponible 24/7",
  },
  {
    icon: Cloud,
    title: "Infrastructure cloud",
    description:
      "Une base solide, scalable et pensée pour durer. Applications, bases de données, APIs : tout est optimisé et supervisé.",
    benefit: "Scalable dès le jour 1",
  },
  {
    icon: Lock,
    title: "Sécurité & conformité",
    description:
      "Chiffrement, contrôle d'accès, journalisation, conformité RGPD. Vos données restent en sécurité, votre esprit en paix.",
    benefit: "RGPD-ready",
  },
  {
    icon: Wrench,
    title: "Maintenance & évolution",
    description:
      "On ne vous laisse jamais seul. Support réactif, améliorations continues, adaptation aux nouveaux besoins de votre entreprise.",
    benefit: "Un partenaire long terme",
  },
];

const steps = [
  { title: "Écoute", text: "On comprend votre entreprise, vos équipes et vos objectifs." },
  { title: "Conception", text: "On dessine une solution sur-mesure, chiffrée et validée avec vous." },
  { title: "Déploiement", text: "On livre vite, par itérations, avec vous à chaque étape." },
  { title: "Évolution", text: "On mesure, on améliore, on adapte au fil de votre croissance." },
];

function ServicesPage() {
  return (
    <div>
      <PageHero
        label="Nos services"
        title={
          <>
            Des infrastructures <span className="text-brand">pensées</span> pour vos besoins.
          </>
        }
        lead="De l'audit initial à la maintenance long terme, on prend en charge toute la chaîne. Vous restez concentré sur votre métier, on s'occupe du reste."
        actions={
          <>
            <GradientLink to="/contact">
              Discuter de mon projet <ArrowRight size={16} />
            </GradientLink>
            <GradientLink to="/tarifs" variant="ghost">
              Voir les tarifs
            </GradientLink>
          </>
        }
      />

      {/* SERVICES */}
      <section className="container-page pb-8 md:pb-12">
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 70}>
              <article className="surface flex h-full gap-5 p-6 md:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <s.icon size={20} strokeWidth={1.75} />
                </span>
                <div className="flex min-w-0 flex-col">
                  <h2 className="type-h3">{s.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <p className="mt-auto flex items-center gap-1.5 pt-5 font-mono text-[12px] text-foreground/70">
                    <Check size={13} strokeWidth={2} className="text-brand" />
                    {s.benefit}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            to="/automatisation-workflow"
            className="group mt-4 flex flex-col gap-4 rounded-3xl bg-foreground p-6 text-background transition-transform duration-200 ease-out active:scale-[0.99] md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <p className="font-mono text-[12px] text-background/60">Zoom sur</p>
              <p className="mt-1 text-[20px] font-semibold tracking-[-0.02em]">
                L'automatisation de workflow, exemples concrets à l'appui
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              Voir les exemples
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="type-h2">4 étapes. Zéro friction.</h2>
          </Reveal>

          <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-[7px] hidden h-px bg-border md:block"
            />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="relative">
                <span className="relative z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-background shadow-[0_0_0_1px_var(--border)]">
                  <span className="h-[7px] w-[7px] rounded-full bg-brand" />
                </span>
                <p className="mt-6 font-mono text-[12px] text-muted-foreground tabular">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="type-h3 mt-2">{s.title}</h3>
                <p className="mt-2 max-w-[16rem] text-[15px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
