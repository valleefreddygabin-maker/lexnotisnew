import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Mail, MapPin } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";
import { Reveal } from "@/components/Reveal";
import gabinPhoto from "@/assets/gabin.png.asset.json";

export const Route = createFileRoute("/gabin")({
  head: () => ({
    meta: [
      { title: "Gabin — CEO & Fondateur | LexNotis" },
      {
        name: "description",
        content:
          "Gabin, CEO et fondateur de LexNotis, conçoit des infrastructures et assistants IA sur-mesure pour libérer le temps des entreprises en Sarthe et partout en France.",
      },
      { property: "og:title", content: "Gabin — CEO & Fondateur | LexNotis" },
      {
        property: "og:description",
        content:
          "Rencontrez Gabin, fondateur de LexNotis, et découvrez comment l'IA sur-mesure redonne du temps aux entreprises.",
      },
      { property: "og:url", content: "/gabin" },
    ],
    links: [{ rel: "canonical", href: "/gabin" }],
  }),
  component: GabinPage,
});

function GabinPage() {
  return (
    <div>
      <section className="px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div className="relative mx-auto max-w-xs md:mx-0">
                <div className="absolute inset-0 rounded-3xl bg-gradient-brand opacity-40 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-card/50 p-2 backdrop-blur-sm">
                  <div className="overflow-hidden rounded-2xl bg-gradient-brand p-[2px]">
                    <img
                      src={gabinPhoto.url}
                      alt="Gabin, CEO et fondateur de LexNotis"
                      className="aspect-[4/5] w-full object-cover"
                      style={{ objectPosition: "center 55%" }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="text-center md:text-left">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
                  CEO & Fondateur
                </p>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                  Gabin
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Fondateur de LexNotis. Je conçois des infrastructures et assistants IA
                  sur-mesure pour libérer le temps des entreprises et leur faire gagner en
                  sérénité.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm text-muted-foreground">
                    <MapPin size={14} className="text-brand" />
                    Sarthe, France
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm text-muted-foreground">
                    <Calendar size={14} className="text-brand" />
                    LexNotis
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                  <GradientLink to="/contact">
                    Discuter de mon projet <ArrowRight size={16} />
                  </GradientLink>
                  <a
                    href="mailto:contact@lexnotis.com"
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-5 py-3 text-sm text-foreground transition-all hover:bg-black/10"
                  >
                    <Mail size={14} /> contact@lexnotis.com
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-card/60 p-8 backdrop-blur-xl md:p-12">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Je crois que{" "}
                <span className="text-foreground font-medium">
                  la technologie n'a de sens que si elle simplifie la vie de ceux qui
                  l'utilisent
                </span>
                . C'est pourquoi j'ai créé LexNotis : aider les entreprises à se
                débarrasser des tâches répétitives, à gagner du temps et à se concentrer
                sur ce qui compte vraiment.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Chaque solution est pensée sur mesure. Pas de logiciel tout fait, pas de
                promesses creuses. Juste des outils qui fonctionnent, une écoute réelle et
                un accompagnement sans stress.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Mon objectif :{" "}
                <span className="text-gradient-brand font-medium">
                  chaque heure gagnée pour un client est une victoire.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
