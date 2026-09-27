import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  Workflow,
  Bot,
  Cloud,
  Lock,
  Wrench,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { GradientLink } from "@/components/GradientButton";
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
      "Vos outils travaillent ensemble. Devis, factures, CRM, emails, tableaux de bord — tout est connecté et se synchronise seul.",
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
      "Une base solide, scalable et pensée pour durer. Applications, bases de données, APIs — tout est optimisé et supervisé.",
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

function ServicesPage() {
  return (
    <div>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand animate-fade-in">
            Nos services
          </p>
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight md:text-6xl">
            Des <span className="text-gradient-brand animate-gradient">infrastructures</span>
            <br />
            pensées pour vos besoins
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "150ms" }}
          >
            De l'audit initial à la maintenance long terme, on prend en charge toute la
            chaîne. Vous restez concentré sur votre métier — on s'occupe du reste.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <FeatureCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Notre méthode
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                4 étapes. Zéro friction.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "01", title: "Écoute", text: "On comprend votre entreprise, vos équipes et vos objectifs." },
              { step: "02", title: "Conception", text: "On dessine une solution sur-mesure, chiffrée et validée avec vous." },
              { step: "03", title: "Déploiement", text: "On livre vite, par itérations, avec vous à chaque étape." },
              { step: "04", title: "Évolution", text: "On mesure, on améliore, on adapte au fil de votre croissance." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 100}>
                <div className="rounded-2xl border border-black/10 bg-card/40 p-6 backdrop-blur-sm transition hover:border-brand hover:shadow-glow">
                  <div className="text-4xl font-bold text-gradient-brand">{s.step}</div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-gradient-brand-soft p-12 text-center md:p-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Un projet en tête ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Parlons-en. Le premier échange est offert et sans engagement.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GradientLink to="/contact">
                Nous contacter <ArrowRight size={16} />
              </GradientLink>
              <GradientLink to="/automatisation-workflow" variant="ghost">
                Automatisation de workflow
              </GradientLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
