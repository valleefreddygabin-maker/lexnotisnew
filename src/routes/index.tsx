import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  Zap,
  TrendingUp,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  MapPin,
  CircleCheck,
  HeartHandshake,
  Globe,
  Check,
  Bot,
  Workflow,
  Receipt,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { GradientLink } from "@/components/GradientButton";
import { OfferBento } from "@/components/OfferBento";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { AiMarquee } from "@/components/AiMarquee";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { PhoneChatMockup } from "@/components/PhoneChatMockup";
import { DashboardPreview } from "@/components/DashboardPreview";
import { stagger } from "@/lib/motion";
import vieuxMans from "@/assets/vieux-mans.jpg.asset.json";
import cathedrale from "@/assets/cathedrale-mans.jpg.asset.json";
import remparts from "@/assets/remparts-mans.jpg.asset.json";


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
      "Des agents intelligents conçus pour vos processus, vos données et votre équipe. Pas des solutions génériques.",
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
    description:
      "On vous accompagne pas à pas. Zéro peur de l'IA, un projet fluide et des équipes rassurées.",
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

const stats = [
  { value: 12, suffix: "h", label: "gagnées par semaine", sub: "sur les tâches répétitives" },
  { value: 68, suffix: "%", label: "de productivité en plus", sub: "sur les processus automatisés" },
  { value: 3, suffix: "sem.", label: "de déploiement moyen", sub: "du kick-off au go-live" },
  { value: 4, suffix: "×", label: "de vitesse d'exécution", sub: "sur vos workflows critiques" },
];

const dashboardPoints = [
  { icon: Clock, text: "Suivi du temps gagné et des tâches automatisées" },
  { icon: Bot, text: "Gestion de vos agents et de vos automatisations" },
  { icon: Receipt, text: "Abonnement, factures et accompagnement dédié" },
];

function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flagged = window.sessionStorage.getItem("lexnotis_logout_success") === "true";
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
    <div className="overflow-x-clip">
      <Hero />
      <AiMarquee />

      {/* OFFER */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="type-h2 max-w-2xl">Une infrastructure complète, pensée pour vous.</h2>
            <p className="type-lead mt-5 max-w-xl">
              Chaque entreprise est unique. Nos solutions le sont aussi.
            </p>
          </Reveal>
          <div className="mt-14">
            <OfferBento offers={pillars} />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <h2 className="type-h2">
                <span className="block">Gagnez du temps.</span>
                <span className="block">Réduisez le stress.</span>
                <span className="block text-brand">Accélérez.</span>
              </h2>
              <p className="type-lead mt-6 max-w-sm">
                Ce que nos clients retrouvent quand l'IA prend en charge le travail répétitif.
              </p>
            </Reveal>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {benefits.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 60}
                className="border-t border-border py-10 first:border-t-0 first:pt-0 last:pb-0 lg:py-12"
              >
                <b.icon aria-hidden strokeWidth={1.75} className="h-6 w-6 text-brand" />
                <h3 className="type-h3 mt-5">{b.title}</h3>
                <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="type-h2 max-w-3xl">
              Chaque heure gagnée est une heure investie ailleurs.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-y border-border py-12 lg:grid-cols-4 lg:gap-0">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 70}
                className="lg:border-l lg:border-border lg:px-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="text-[52px] font-semibold leading-none tracking-[-0.055em] md:text-[72px]">
                  <AnimatedCounter to={s.value} />
                  <span className="ml-1 text-[0.5em] tracking-[-0.03em] text-muted-foreground">
                    {s.suffix}
                  </span>
                </p>
                <p className="mt-5 text-[15px] font-medium">{s.label}</p>
                <p className="mt-1 text-[14px] text-muted-foreground">{s.sub}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-[14px] text-muted-foreground">
                Résultats mesurés chez nos clients après déploiement de nos infrastructures IA
                sur-mesure.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-brand"
              >
                Estimer mon gain de temps
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLIENT SPACE */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <p className="type-label">Votre espace client</p>
            <h2 className="type-h2 mt-4 max-w-2xl">Un tableau de bord clair pour tout piloter.</h2>
            <p className="type-lead mt-5 max-w-xl">
              Suivez vos agents IA, vos automatisations, votre site web et vos factures depuis un
              seul endroit. Vous voyez exactement le temps gagné, semaine après semaine.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <div className="relative overflow-hidden rounded-[32px] bg-brand-soft px-4 pt-6 sm:px-8 sm:pt-10 md:px-14 md:pt-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/70 blur-3xl"
              />
              <div className="relative mx-auto max-w-5xl translate-y-2">
                <DashboardPreview />
              </div>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {dashboardPoints.map((p, i) => (
              <Reveal as="li" key={p.text} delay={i * 60} className="flex items-start gap-3">
                <p.icon aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-[15px] leading-relaxed">{p.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* LOCAL */}
      <section className="py-24 md:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="type-h2">Une agence de proximité, en Sarthe.</h2>
              <p className="type-lead mt-6 max-w-md">
                Un contact direct, des réponses rapides, une vraie relation. Pour nos clients de la
                Sarthe comme de toute la France.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                {["Réponse sous 24h", "Premier échange offert", "Sans engagement"].map((t) => (
                  <li key={t} className="flex items-center gap-2 whitespace-nowrap text-[15px] font-medium">
                    <Check size={16} strokeWidth={2} className="text-brand" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-4 lg:col-span-7">
            <Reveal as="section" className="col-span-7">
              <figure>
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={remparts.url}
                    alt="Les remparts gallo-romains du Mans"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover object-[70%_50%]"
                  />
                </div>
                <figcaption className="mt-3 text-[13px] text-muted-foreground">
                  L'enceinte gallo-romaine du Mans
                </figcaption>
              </figure>
            </Reveal>
            <Reveal as="section" delay={100} className="col-span-5 mt-16 md:mt-24">
              <figure>
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={cathedrale.url}
                    alt="La cathédrale Saint-Julien du Mans au soleil couchant"
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover object-[40%_50%]"
                  />
                </div>
                <figcaption className="mt-3 text-[13px] text-muted-foreground">
                  La cathédrale Saint-Julien
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <IntegrationsSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[720px] w-[min(900px,70vw)] bg-[radial-gradient(closest-side,oklch(0.52_0.215_289/0.10),transparent)]"
      />
      <div className="container-page grid items-center gap-14 pb-16 pt-10 md:pt-14 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:gap-6 lg:pb-20 lg:pt-8">
        <div className="lg:col-span-6">
          <p className="enter inline-flex items-center gap-1.5 rounded-full bg-card py-1.5 pl-2.5 pr-3.5 text-[13px] text-muted-foreground shadow-[0_0_0_1px_var(--border)]">
            <MapPin size={13} strokeWidth={2} className="text-brand" />
            Agence IA sur-mesure, en Sarthe
          </p>
          <h1 className="type-display enter mt-7 max-w-[11ch]" style={stagger(1)}>
            L’intelligence <span className="text-brand">au service</span> de votre entreprise.
          </h1>
          <p className="type-lead enter mt-7 max-w-[30rem]" style={stagger(2)}>
            Des systèmes IA sur-mesure pour automatiser vos tâches répétitives et redonner du
            temps à votre équipe.
          </p>
          <div className="enter mt-10 flex flex-wrap gap-3" style={stagger(3)}>
            <GradientLink to="/contact">
              Discuter de mon projet <ArrowRight size={16} />
            </GradientLink>
            <GradientLink to="/services" variant="ghost">
              Voir nos services
            </GradientLink>
          </div>
        </div>

        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

/** A real place (Le Mans) + the real product (the agent in your pocket). */
function HeroVisual() {
  return (
    <div className="relative mx-auto h-[560px] w-full max-w-[520px] sm:h-[620px]">
      <div
        className="enter absolute right-0 top-0 h-[86%] w-[74%] overflow-hidden rounded-[28px] shadow-[0_0_0_1px_var(--border)]"
        style={stagger(2)}
      >
        <img
          src={vieuxMans.url}
          alt="Rue pavée du Vieux Mans au coucher du soleil"
          fetchPriority="high"
          className="h-full w-full object-cover object-[62%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div
        className="enter absolute right-3 top-6 z-20 flex max-w-[250px] items-start gap-2.5 rounded-2xl bg-card/90 p-3 pr-4 shadow-[0_0_0_1px_var(--border),var(--shadow-float)] backdrop-blur-xl sm:right-[-12px]"
        style={stagger(6)}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
          <Workflow size={15} strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-medium leading-tight">Relance programmée</span>
          <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
            Devis n°2418, rappel à J+3
          </span>
        </span>
      </div>

      <div className="enter absolute bottom-0 left-0 z-10 origin-bottom-left scale-[0.86] sm:scale-100" style={stagger(4)}>
        <PhoneChatMockup />
      </div>
    </div>
  );
}
