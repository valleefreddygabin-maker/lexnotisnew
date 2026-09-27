import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  Zap,
  TrendingUp,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Quote,
  MapPin,
  Timer,
  Rocket,
  CalendarCheck,
  Gauge,
  CircleCheck,
  HeartHandshake,
  Globe,


} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { GradientLink } from "@/components/GradientButton";
import { GridPillars } from "@/components/GridPillars";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { AiMarquee } from "@/components/AiMarquee";

import { IntegrationsSection } from "@/components/IntegrationsSection";
import { PhoneChatMockup } from "@/components/PhoneChatMockup";
import { DashboardPreview } from "@/components/DashboardPreview";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LexNotis — L'intelligence au service de votre entreprise" },
      {
        name: "description",
        content:
          "LexNotis conçoit des infrastructures IA sur-mesure pour automatiser vos tâches, gagner du temps et accélérer votre entreprise.",
      },
      { property: "og:title", content: "LexNotis — L'intelligence au service de votre entreprise" },
      {
        property: "og:description",
        content:
          "LexNotis conçoit des infrastructures IA sur-mesure pour automatiser vos tâches, gagner du temps et accélérer votre entreprise.",
      },
      { property: "og:url", content: "https://lexnotis.com/" },
    ],
    links: [{ rel: "canonical", href: "https://lexnotis.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "LexNotis",
          url: "https://lexnotis.com",
          description:
            "LexNotis conçoit des infrastructures IA sur-mesure pour automatiser vos tâches et accélérer votre entreprise.",
          areaServed: "France",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Sarthe",
            addressCountry: "FR",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const LOGOUT_TOAST_DURATION_MS = 6000;

const pillars = [
  {
    icon: Brain,
    title: "Assistants IA sur-mesure",
    description:
      "Des agents intelligents conçus pour vos processus, vos données et votre équipe — pas des solutions génériques.",
    benefit: "Adapté à votre métier",
  },
  {
    icon: Zap,
    title: "Automatisation intelligente",
    description:
      "On identifie les tâches répétitives et on les automatise pour libérer votre temps et celui de vos équipes.",
    benefit: "Jusqu'à 40% de temps gagné",
  },
  {
    icon: TrendingUp,
    title: "Performance durable",
    description:
      "Une infrastructure évolutive qui grandit avec votre entreprise et améliore votre performance jour après jour.",
    benefit: "ROI mesurable",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & confidentialité",
    description:
      "Vos données restent les vôtres. Architecture sécurisée, conforme et pensée pour la confidentialité.",
    benefit: "Conformité intégrée",
  },
  {
    icon: Globe,
    title: "Sites web sur-mesure",
    description:
      "Sites vitrines et applications web conçus pour vous, avec options comme l'intégration d'un chatbot intelligent.",
    benefit: "Chatbot intégrable",
  },
  {
    icon: HeartHandshake,
    title: "Accompagnement sans stress",
    description: "On vous accompagne pas à pas. Zéro peur de l'IA, un projet fluide et des équipes rassurées.",
    benefit: "Plus de peur de l'IA",
  },
];



const benefits = [
  {
    icon: Clock,
    title: "Récupérez des heures chaque semaine",
    text: "Moins de tâches manuelles, moins de saisies, moins de va-et-vient. Vous et votre équipe vous concentrez sur ce qui a vraiment de la valeur.",
  },
  {
    icon: Sparkles,
    title: "Le stress en moins, la clarté en plus",
    text: "Des workflows fluides, des outils qui parlent entre eux, une vue d'ensemble en temps réel. Fini les feux à éteindre en permanence.",
  },
  {
    icon: TrendingUp,
    title: "Des gains concrets sur votre développement",
    text: "Plus de capacité, de meilleures décisions, un avantage compétitif. On investit dans l'infrastructure pour libérer votre croissance.",
  },
];


function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flagged =
      window.sessionStorage.getItem("lexnotis_logout_success") === "true";
    if (params.get("deconnexion") === "succes" || flagged) {
      window.sessionStorage.removeItem("lexnotis_logout_success");
      toast.success("Déconnexion réussie", {
        description: "Vous êtes bien déconnecté(e). À bientôt !",
        duration: LOGOUT_TOAST_DURATION_MS,
        icon: <CircleCheck className="h-5 w-5 text-emerald-500" />,
        className: "group border-l-4 border-l-emerald-500",
      });
      params.delete("deconnexion");
      const search = params.toString() ? `?${params.toString()}` : "";
      window.history.replaceState({}, "", `${window.location.pathname}${search}`);
    }
  }, []);


  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 pt-4 pb-10 md:pt-6 md:pb-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in mb-3 inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.05_290)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.45_0.22_290)]">
            <MapPin size={11} />
            Agence IA sur-mesure — Sarthe
          </div>

          <h1 className="animate-fade-up text-3xl font-black leading-[0.95] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            L'intelligence
            <br />
            <span className="text-gradient-brand animate-gradient">au service</span>
            <br />
            de votre entreprise.
          </h1>

          <p
            className="animate-fade-up mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base"
            style={{ animationDelay: "150ms" }}
          >
            Notre équipe vous accompagne dans la création de systèmes IA sur-mesure pour{" "}
            <span className="font-semibold text-foreground">automatiser vos tâches</span>,{" "}
            <span className="font-semibold text-foreground">libérer votre temps</span> et faire gagner du temps à votre entreprise.
          </p>

          <div
            className="animate-fade-up mt-5 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <GradientLink to="/contact">
              Discuter de mon projet <ArrowRight size={16} />
            </GradientLink>
          </div>
        </div>



        {/* PILLARS strip */}
        <div
          className="animate-fade-up mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"

          style={{ animationDelay: "600ms" }}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col items-center gap-2 rounded-xl border border-black/5 bg-secondary px-3 py-4 text-center backdrop-blur-sm"
            >
              <p.icon className="h-5 w-5 text-gradient-brand" style={{ color: "oklch(0.55 0.24 295)" }} />
              <p className="text-[11px] font-medium uppercase leading-tight tracking-wider text-muted-foreground">
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* AI PARTNERS MARQUEE */}
      <AiMarquee />

      {/* PILLARS */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Ce que nous construisons
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Une infrastructure complète, pensée pour vous
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Chaque entreprise est unique. Nos solutions le sont aussi.
              </p>



            </div>
          </Reveal>

          <GridPillars pillars={pillars} />
        </div>
      </section>

      {/* PHONE CHAT DEMO */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <PhoneChatMockup />
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Votre agent, dans votre poche
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Pilotez votre entreprise depuis{" "}
                <span className="text-gradient-brand">un simple message</span>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                Connecté à vos outils du quotidien (email, agenda, CRM, devis), votre assistant
                LexNotis exécute vos demandes en langage naturel — depuis WhatsApp ou le canal de
                votre choix.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Devis, relances et emails envoyés automatiquement",
                  "Rendez-vous créés dans votre agenda",
                  "Entraîné sur vos documents et vos process",
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
              <div className="mt-8">
                <GradientLink to="/contact">
                  Voir ce que ça donne chez vous <ArrowRight size={16} />
                </GradientLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS — time / stress / growth */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Pourquoi LexNotis
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Gagnez du temps.
                <br />
                <span className="text-gradient-brand">Réduisez le stress.</span> Accélérez.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 120}>
                <div className="group h-full rounded-3xl border border-black/10 bg-card/40 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:shadow-glow">
                  <div className="animate-float mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
                    <b.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIME SAVINGS — animated counters */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Le temps, votre vraie ressource
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Chaque heure gagnée est{" "}
                <span className="text-gradient-brand">une heure investie</span> ailleurs
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Des résultats mesurables observés chez nos clients après déploiement de nos
                infrastructures IA sur-mesure.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Timer,
                value: 12,
                suffix: "h",
                label: "gagnées par semaine",
                sub: "sur les tâches répétitives",
              },
              {
                icon: Gauge,
                value: 68,
                suffix: "%",
                label: "de productivité en plus",
                sub: "sur les processus automatisés",
              },
              {
                icon: CalendarCheck,
                value: 3,
                suffix: " sem.",
                label: "de déploiement moyen",
                sub: "du kick-off au go-live",
              },
              {
                icon: Rocket,
                value: 4,
                suffix: "x",
                label: "de vitesse d'exécution",
                sub: "sur vos workflows critiques",
              },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-black/10 bg-card/40 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:shadow-glow">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25" />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand-soft border border-black/10">
                      <s.icon className="h-6 w-6" style={{ color: "oklch(0.55 0.24 295)" }} />
                    </div>
                    <div className="text-5xl font-bold tracking-tight text-gradient-brand md:text-6xl">
                      <AnimatedCounter to={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">{s.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-3xl border border-black/10 bg-gradient-brand-soft p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left">
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  Combien d'heures pourriez-vous récupérer cette année ?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Diagnostic offert · réponse sous 24h · sans engagement
                </p>
              </div>
              <GradientLink to="/contact">
                Estimer mon gain de temps <ArrowRight size={16} />
              </GradientLink>
            </div>
          </Reveal>
        </div>
      </section>



      {/* DASHBOARD PREVIEW */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Votre espace client
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Un tableau de bord clair pour{" "}
                <span className="text-gradient-brand">tout piloter</span>
              </h2>
              <p className="mt-4 text-sm text-muted-foreground md:text-base">
                Suivez vos agents IA, vos automatisations, votre site web et vos factures depuis un
                seul endroit. Vous voyez exactement le temps gagné, semaine après semaine.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Suivi du temps gagné et des tâches automatisées",
                  "Gestion de vos agents et de vos automatisations",
                  "Abonnement, factures et accompagnement dédié",
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
              <div className="mt-8">
                <GradientLink to="/contact">
                  Demander une démo <ArrowRight size={16} />
                </GradientLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <DashboardPreview />
          </Reveal>
        </div>
      </section>


      {/* INTEGRATIONS */}
      <IntegrationsSection />


      {/* QUOTE + CTA — same row */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-black/10 bg-gradient-brand-soft p-10 text-center md:p-12">
              <Quote className="mb-5 h-10 w-10 text-gradient-brand opacity-80" style={{ color: "oklch(0.55 0.24 295)" }} />
              <p className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                « Moins de tâches répétitives,{" "}
                <span className="text-gradient-brand">plus de valeur créée.</span> »
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Votre partenaire IA pour un avenir plus efficace
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-black/10 bg-card/60 p-10 text-center backdrop-blur-xl md:p-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Prêt à <span className="text-gradient-brand">libérer</span> votre entreprise ?
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">
                Un échange de 30 minutes suffit pour identifier les leviers qui feront la
                différence.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <GradientLink to="/contact">
                  Réserver un échange <ArrowRight size={16} />
                </GradientLink>
                <GradientLink to="/equipe" variant="ghost">
                  Rencontrer l'équipe
                </GradientLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
