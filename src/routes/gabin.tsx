import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { stagger } from "@/lib/motion";
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
  staticData: {
    cta: {
      title: "Chaque heure gagnée pour un client est une victoire.",
      text: "Parlez-moi de votre activité et des tâches qui vous prennent le plus de temps. Le premier échange est offert.",
    },
  },
  component: GabinPage,
});

function GabinPage() {
  return (
    <div>
      <section className="container-page pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <div className="enter md:col-span-5" style={stagger(1)}>
            <div className="relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden rounded-[28px] bg-brand-soft md:mx-0">
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(closest-side,oklch(0.52_0.215_289/0.18),transparent)]"
              />
              <img
                src={gabinPhoto.url}
                alt="Gabin, CEO et fondateur de LexNotis"
                className="absolute inset-0 h-full w-full object-cover object-[50%_58%] [transform:scale(1.55)] [transform-origin:50%_78%]"
              />
            </div>
          </div>

          <div className="md:col-span-7 md:pl-6">
            <p className="type-label enter">CEO & Fondateur</p>
            <h1 className="type-display enter mt-5" style={stagger(1)}>
              Gabin
            </h1>
            <p className="type-lead enter mt-6 max-w-xl" style={stagger(2)}>
              Fondateur de LexNotis. Je conçois des infrastructures et assistants IA sur-mesure pour
              libérer le temps des entreprises et leur faire gagner en sérénité.
            </p>

            <p
              className="enter mt-6 inline-flex items-center gap-1.5 text-[15px] text-muted-foreground"
              style={stagger(3)}
            >
              <MapPin size={15} strokeWidth={1.75} className="text-brand" /> Sarthe, France
            </p>

            <div className="enter mt-9 flex flex-wrap gap-3" style={stagger(4)}>
              <GradientLink to="/contact">
                Discuter de mon projet <ArrowRight size={16} />
              </GradientLink>
              <a href="mailto:contact@lexnotis.com" className="btn btn-ghost">
                <Mail size={15} strokeWidth={1.75} /> contact@lexnotis.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <div className="max-w-4xl space-y-8 text-[22px] font-medium leading-[1.4] tracking-[-0.02em] text-muted-foreground md:text-[30px]">
              <p>
                Je crois que{" "}
                <span className="text-foreground">
                  la technologie n'a de sens que si elle simplifie la vie de ceux qui l'utilisent.
                </span>{" "}
                C'est pourquoi j'ai créé LexNotis : aider les entreprises à se débarrasser des
                tâches répétitives, à gagner du temps et à se concentrer sur ce qui compte vraiment.
              </p>
              <p>
                Chaque solution est pensée sur mesure. Pas de logiciel tout fait, pas de promesses
                creuses. <span className="text-foreground">Juste des outils qui fonctionnent</span>,
                une écoute réelle et un accompagnement sans stress.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
