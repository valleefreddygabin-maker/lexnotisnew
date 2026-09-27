import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Rocket, Heart, Target } from "lucide-react";
import { FounderAvatar } from "@/components/FounderAvatar";
import { GradientLink } from "@/components/GradientButton";
import { Reveal } from "@/components/Reveal";
import gabinPhoto from "@/assets/gabin.png.asset.json";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "L'équipe — Gabin | LexNotis" },
      {
        name: "description",
        content:
          "Gabin, fondateur de LexNotis, conçoit des infrastructures et assistants IA sur-mesure pour libérer le temps des entreprises.",
      },
      { property: "og:title", content: "L'équipe LexNotis" },
      {
        property: "og:description",
        content:
          "Gabin — fondateur de LexNotis. Une vision : libérer le temps des entreprises grâce à l'IA sur-mesure.",
      },
      { property: "og:url", content: "/equipe" },
    ],
    links: [{ rel: "canonical", href: "/equipe" }],
  }),
  component: TeamPage,
});

const founders = [
  {
    name: "Gabin",
    role: "CEO & Fondateur",
    photo: gabinPhoto.url,
    photoZoom: 1.8,
    photoPosition: "center 55%",
    quote: "Chaque heure gagnée pour un client, c'est une victoire.",
  },
];

const values = [
  {
    icon: Rocket,
    title: "Ambition",
    text: "On vise haut, pour vous et avec vous. Rien de moyen.",
  },
  {
    icon: Heart,
    title: "Proximité",
    text: "Un contact direct, des réponses rapides, une vraie relation.",
  },
  {
    icon: Target,
    title: "Résultats",
    text: "Des gains mesurables, pas des promesses vagues.",
  },
];

function TeamPage() {
  return (
    <div>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand animate-fade-in">
            L'équipe
          </p>
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight md:text-6xl">
            Une équipe.
            <br />
            <span className="text-gradient-brand animate-gradient">Une seule mission.</span>
          </h1>
          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "150ms" }}
          >
            Gabin — entrepreneur passionné par l'IA, la technique et l'impact concret.
            Il construit LexNotis pour redonner du temps aux entreprises qui en manquent.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-sm justify-center">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 120} className="w-full">
              <FounderAvatar {...f} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                Nos valeurs
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                Ce qui nous <span className="text-gradient-brand">anime</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="rounded-2xl border border-black/10 bg-card/40 p-8 backdrop-blur-sm transition hover:-translate-y-1 hover:border-brand hover:shadow-glow">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                    <v.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-card/60 p-10 backdrop-blur-xl md:p-14">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Je suis un entrepreneur qui croit que{" "}
              <span className="text-foreground font-medium">
                la technologie n'a de sens que si elle simplifie la vie de ceux qui
                l'utilisent
              </span>
              . Je rejette les solutions génériques, les usines à gaz et les promesses
              creuses. Je préfère aller vite, écouter, construire des choses qui marchent
              vraiment — et rester disponible quand vous en avez besoin.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Mon pari : chaque entreprise, quelle que soit sa taille, mérite une
              infrastructure intelligente à sa hauteur.{" "}
              <span className="text-gradient-brand font-medium">Je la construis avec vous.</span>
            </p>
            <div className="mt-10">
              <GradientLink to="/contact">
                Discutons de votre projet <ArrowRight size={16} />
              </GradientLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
