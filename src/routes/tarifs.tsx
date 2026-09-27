import { createFileRoute } from "@tanstack/react-router";
import { Bot, PhoneCall, Workflow, Network, TrendingUp, Globe, Check, ArrowRight } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";
import { PageHero } from "@/components/PageHero";
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
  staticData: {
    cta: {
      title: "Pas sûr de l'offre à choisir ?",
      text: "Le premier échange est gratuit et sans engagement : on cadre votre besoin et on vous dit franchement ce qui est utile, et ce qui ne l'est pas.",
    },
  },
  component: TarifsPage,
});

type Offer = {
  name: string;
  icon: typeof Bot;
  description: string;
  /** One-off setup, € TTC */
  from: string;
  /** Monthly, € */
  monthly: string;
  included: string[];
  highlight?: boolean;
};

const offers: Offer[] = [
  {
    name: "Agents conversationnels",
    icon: Bot,
    description:
      "Chatbots, assistants WhatsApp, qualification des prospects et prise de rendez-vous.",
    from: "790",
    monthly: "199",
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
    from: "990",
    monthly: "249",
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
    from: "1 190",
    monthly: "249",
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
    from: "1 490",
    monthly: "399",
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
    from: "1 990",
    monthly: "249",
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
    from: "2 490",
    monthly: "499",
    highlight: true,
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
      <PageHero
        label="Tarifs"
        title={
          <>
            Des tarifs adaptés à <span className="text-brand">votre projet.</span>
          </>
        }
        lead="Chaque solution est conçue sur mesure selon vos objectifs, vos outils et la complexité de vos processus."
      />

      <section className="container-page pb-8">
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            const dark = offer.highlight;
            return (
              <Reveal key={offer.name} delay={(i % 2) * 70}>
                <article
                  className={
                    dark
                      ? "dark flex h-full flex-col rounded-3xl bg-background p-7 text-foreground md:p-9"
                      : "surface flex h-full flex-col p-7 md:p-9"
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand dark:bg-white/10 dark:text-white">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    {dark && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/90">
                        Le plus complet
                      </span>
                    )}
                  </div>

                  <h2 className="type-h3 mt-6">{offer.name}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {offer.description}
                  </p>

                  <div className="mt-7 border-t border-border pt-6">
                    <p className="text-[13px] text-muted-foreground">À partir de</p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-[44px] font-semibold leading-none tracking-[-0.05em] tabular">
                        {offer.from} €
                      </span>
                      <span className="text-[14px] text-muted-foreground">TTC</span>
                    </p>
                    <p className="mt-2 text-[15px] font-medium text-brand dark:text-[oklch(0.78_0.12_289)]">
                      Puis {offer.monthly} €/mois
                    </p>
                  </div>

                  <ul className="mt-6 grid gap-2.5">
                    {offer.included.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-[15px]">
                        <Check
                          size={16}
                          strokeWidth={2}
                          className="mt-0.5 shrink-0 text-brand dark:text-[oklch(0.78_0.12_289)]"
                        />
                        <span className="text-foreground/80">{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <GradientLink to="/contact" variant={dark ? "ink" : "ghost"} className="w-full">
                      Demander un devis <ArrowRight size={16} />
                    </GradientLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[14px] text-muted-foreground">
          Estimations indicatives. Le devis final est établi après un premier échange gratuit et
          sans engagement.
        </p>
      </section>
    </div>
  );
}
