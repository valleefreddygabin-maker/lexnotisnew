import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";
import { PageHero } from "@/components/PageHero";
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
  staticData: {
    cta: {
      title: "Discutons de votre projet.",
      text: "Chaque entreprise, quelle que soit sa taille, mérite une infrastructure intelligente à sa hauteur. Construisons la vôtre ensemble.",
    },
  },
  component: TeamPage,
});

const values = [
  { title: "Ambition", text: "On vise haut, pour vous et avec vous. Rien de moyen." },
  { title: "Proximité", text: "Un contact direct, des réponses rapides, une vraie relation." },
  { title: "Résultats", text: "Des gains mesurables, pas des promesses vagues." },
];

function TeamPage() {
  return (
    <div>
      <PageHero
        label="L'équipe"
        title={
          <>
            Une équipe. <span className="text-brand">Une seule mission.</span>
          </>
        }
        lead="Gabin, entrepreneur passionné par l'IA, la technique et l'impact concret. Il construit LexNotis pour redonner du temps aux entreprises qui en manquent."
        actions={
          <GradientLink to="/gabin" variant="ghost">
            Découvrir Gabin <ArrowRight size={16} />
          </GradientLink>
        }
        aside={
          <figure className="mx-auto max-w-[440px] lg:ml-auto lg:mr-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-brand-soft">
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(closest-side,oklch(0.52_0.215_289/0.18),transparent)]"
              />
              <img
                src={gabinPhoto.url}
                alt="Portrait de Gabin, fondateur de LexNotis"
                className="absolute inset-0 h-full w-full object-cover object-[50%_58%] [transform:scale(1.55)] [transform-origin:50%_78%]"
              />
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between gap-4">
              <span>
                <span className="block text-[17px] font-semibold tracking-[-0.02em]">Gabin</span>
                <span className="block text-[14px] text-muted-foreground">CEO & Fondateur</span>
              </span>
              <span className="max-w-[15rem] text-right text-[14px] leading-snug text-muted-foreground">
                « Chaque heure gagnée pour un client, c'est une victoire. »
              </span>
            </figcaption>
          </figure>
        }
      />

      {/* VALUES */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <h2 className="type-h2">Ce qui nous anime.</h2>
          </Reveal>
          <ul className="mt-14 border-t border-border">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i * 70}
                className="grid gap-3 border-b border-border py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <h3 className="text-[36px] font-semibold leading-none tracking-[-0.045em] md:col-span-5 md:text-[56px]">
                  {v.title}
                </h3>
                <p className="text-[17px] leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7 md:text-[19px]">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-12 md:py-20">
        <div className="container-page">
          <Reveal>
            <div className="max-w-4xl text-[24px] font-medium leading-[1.35] tracking-[-0.025em] text-muted-foreground md:text-[34px]">
              <p>
                Je suis un entrepreneur qui croit que{" "}
                <span className="text-foreground">
                  la technologie n'a de sens que si elle simplifie la vie de ceux qui l'utilisent.
                </span>
              </p>
              <p className="mt-8">
                Je rejette les solutions génériques, les usines à gaz et les promesses creuses. Je
                préfère aller vite, écouter, construire des choses qui marchent vraiment, et rester
                disponible quand vous en avez besoin.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
