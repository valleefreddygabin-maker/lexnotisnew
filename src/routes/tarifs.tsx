import { createFileRoute } from "@tanstack/react-router";
import { Bot, PhoneCall, Workflow, Network, TrendingUp, Globe, Check, ArrowRight } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs — Agents IA, automatisations & systèmes sur mesure | LexNotis" },
      {
        name: "description",
        content:
          "Des tarifs adaptés à votre projet : agents conversationnels dès 790 € TTC, agents marketing & commerciaux dès 990 € TTC, automatisations métier dès 1 190 € TTC, agents vocaux dès 1 490 € TTC, sites web sur-mesure dès 1 990 € TTC, systèmes IA sur mesure dès 2 490 € TTC.",
      },
      { property: "og:title", content: "Tarifs LexNotis — solutions IA sur mesure" },
      {
        property: "og:description",
        content:
          "Chaque solution est conçue sur mesure selon vos objectifs, vos outils et la complexité de vos processus.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tarifs" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tarifs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            { name: "Agents conversationnels", price: 790 },
            { name: "Agents marketing & commerciaux", price: 990 },
            { name: "Automatisations métier", price: 1190 },
            { name: "Agents vocaux", price: 1490 },
            { name: "Sites web sur-mesure", price: 1990 },
            { name: "Systèmes IA sur mesure", price: 2490 },
          ].map((o, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: o.name,
              offers: {
                "@type": "Offer",
                price: o.price,
                priceCurrency: "EUR",
              },
              provider: {
                "@type": "Organization",
                name: "LexNotis",
                url: "https://lexnotis.com",
              },
            },
          })),
        }),
      },
    ],
  }),
  component: TarifsPage,
});

type Offer = {
  name: string;
  icon: typeof Bot;
  description: string;
  price: string;
  mrr: string;
  included: string[];
};

const offers: Offer[] = [
  {
    name: "Agents conversationnels",
    icon: Bot,
    description:
      "Chatbots, assistants WhatsApp, qualification des prospects et prise de rendez-vous.",
    price: "À partir de 790 € TTC",
    mrr: "Puis 199 €/mois",
    included: [
      "Agent conversationnel sur-mesure",
      "Intégration site web, WhatsApp ou Messenger",
      "Qualification automatique des prospects",
      "Prise de rendez-vous en autonomie",
    ],
  },
  {
    name: "Agents marketing & commerciaux",
    icon: TrendingUp,
    description:
      "Prospection, création de contenus, relances personnalisées, enrichissement CRM et reporting.",
    price: "À partir de 990 € TTC",
    mrr: "Puis 249 €/mois",
    included: [
      "Qualification automatique des leads",
      "Enrichissement et synchronisation CRM",
      "Création de contenus et relances personnalisées",
      "Reporting et tableaux de bord automatiques",
    ],
  },
  {
    name: "Automatisations métier",
    icon: Workflow,
    description:
      "Génération de devis, traitement des e-mails, gestion documentaire, CRM et tâches administratives.",
    price: "À partir de 1 190 € TTC",
    mrr: "Puis 249 €/mois",
    included: [
      "Analyse de vos processus répétitifs",
      "Flux de travail automatisés",
      "Connexion CRM, e-mail, comptabilité",
      "Relances et notifications programmées",
    ],
  },
  {
    name: "Agents vocaux",
    icon: PhoneCall,
    description:
      "Réponse téléphonique, qualification, prise de rendez-vous, transfert d'appel et compte rendu.",
    price: "À partir de 1 490 € TTC",
    mrr: "Puis 399 €/mois",
    included: [
      "Voix naturelle et scénario personnalisé",
      "Transfert vers un humain si besoin",
      "Compte rendu écrit post-appel",
      "Intégration agenda et CRM",
    ],
  },
  {
    name: "Sites web sur-mesure",
    icon: Globe,
    description:
      "Sites vitrines, e-commerce, intranets et applications web avec intégration chatbot.",
    price: "À partir de 1990€ TTC",
    mrr: "Puis 249 €/mois",
    included: [
      "Design UX/UI personnalisé",
      "Optimisation performances et SEO",
      "Hébergement et maintenance inclus",
    ],
  },
  {
    name: "Systèmes IA sur mesure",
    icon: Network,
    description:
      "Plusieurs agents, intégrations et processus réunis dans une solution personnalisée.",
    price: "À partir de 2490 € TTC",
    mrr: "Puis 499 €/mois",
    included: [
      "Cadrage et architecture complète",
      "Orchestration multi-agents",
      "Intégrations ERP / CRM / outils métier",
      "Maintenance et évolution incluses",
    ],
  },
];

function TarifsPage() {
  return (
    <div>
      {/* HERO */}
      <section className="px-6 py-24 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand animate-fade-in">
            Tarifs
          </p>
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight md:text-6xl">
            Des tarifs adaptés à{" "}
            <span className="text-gradient-brand animate-gradient">votre projet</span>
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "150ms" }}
          >
            Chaque solution est conçue sur mesure selon vos objectifs, vos outils et la
            complexité de vos processus.
          </p>
        </div>
      </section>

      {/* OFFERS GRID */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {offers.map((offer, i) => {
              const Icon = offer.icon;
              return (
                <Reveal key={offer.name} delay={i * 100}>
                  <div className="group relative flex h-full flex-col rounded-3xl border border-black/10 bg-card/40 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow md:p-10">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white/60 transition-colors group-hover:border-brand/30">
                      <Icon className="h-6 w-6" style={{ color: "oklch(0.55 0.24 295)" }} />
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                      {offer.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {offer.description}
                    </p>

                    <div className="mt-6">
                      <span className="text-3xl font-bold text-gradient-brand">
                        {offer.price}
                      </span>
                      <p className="mt-1 text-sm font-medium text-brand">
                        {offer.mrr}
                      </p>
                    </div>

                    <ul className="mt-6 grid gap-2.5">
                      {offer.included.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          <span className="text-muted-foreground">{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-8">
                      <GradientLink to="/contact" className="!w-full">
                        Demander un devis <ArrowRight size={16} />
                      </GradientLink>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Estimations indicatives. Le devis final est établi après un premier
            échange gratuit et sans engagement.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-gradient-brand-soft p-12 text-center md:p-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Pas sûr de l'offre à choisir ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Le premier échange est gratuit et sans engagement : on cadre votre besoin et on
              vous dit franchement ce qui est utile — et ce qui ne l'est pas.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GradientLink to="/contact">
                Parler de mon projet <ArrowRight size={16} />
              </GradientLink>
              <GradientLink to="/services" variant="ghost">
                Voir nos services
              </GradientLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
