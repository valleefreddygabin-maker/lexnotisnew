import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { stagger } from "@/lib/motion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — LexNotis | Vos questions, nos réponses" },
      {
        name: "description",
        content:
          "Toutes les réponses sur nos infrastructures IA sur-mesure : délais, sécurité, coûts, technologies et méthodologie LexNotis.",
      },
      { property: "og:title", content: "FAQ — LexNotis" },
      {
        property: "og:description",
        content:
          "Délais, sécurité, coûts, technologies, méthodologie — tout ce que vous devez savoir avant de démarrer avec LexNotis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  staticData: {
    cta: {
      title: "Une autre question ?",
      text: "Parlons-en en 30 minutes, gratuitement et sans engagement.",
    },
  },
  component: FAQ,
});

const faqs = [
  {
    question: "Combien de temps prend un projet LexNotis ?",
    answer:
      "Chaque projet débute par une phase de découverte de quelques jours, puis nous livrons un prototype fonctionnel en 2 à 4 semaines. Le déploiement d'une infrastructure complète, connectée à vos outils et testée en conditions réelles, prend généralement entre 6 et 12 semaines selon la complexité. Nous vous tenons informé de l'avancement à chaque étape et priorisons les fonctionnalités qui apportent le plus de valeur rapidement.",
  },
  {
    question: "Comment se déroule le premier échange ?",
    answer:
      "Nous commençons par un appel de 30 minutes, gratuit et sans engagement. Nous vous écoutons pour comprendre votre activité, vos contraintes et les tâches qui pèsent le plus sur vos équipes. À l'issue de l'échange, nous identifions 2 à 3 leviers concrets et vous repartez avec une première vision de la solution, de son impact et des étapes pour avancer sereinement.",
  },
  {
    question: "Quel retour sur investissement puis-je espérer ?",
    answer:
      "Nos clients constatent en moyenne 30 à 50 % de temps libéré sur les processus automatisés. Selon le volume de tâches concerné, le retour sur investissement est souvent atteint en 3 à 6 mois. Nous ne nous arrêtons pas à la mise en ligne : nous mesurons l'usage en continu et ajustons l'outil pour maximiser l'impact réel sur votre quotidien.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Nous sélectionnons les technologies en fonction de votre besoin précis. Cela peut inclure les modèles d'OpenAI et d'Anthropic, des modèles open-source, ainsi que des architectures cloud modernes et évolutives. Nous veillons à éviter l'enfermement propriétaire : votre infrastructure reste compréhensible, documentée et adaptable à l'avenir.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Oui, la sécurité est au cœur de notre démarche. Vos données restent hébergées sur une infrastructure que vous contrôlez, chiffrées au repos et en transit. Notre approche est conforme au RGPD dès le premier jour, avec des règles d'accès claires et une traçabilité des actions. Nous ne revendons jamais vos données et nous structurons les permissions pour limiter les accès au strict nécessaire.",
  },
  {
    question: "Assurez-vous un suivi après la livraison ?",
    answer:
      "Oui, systématiquement. Après la livraison, nous assurons le monitoring, les améliorations continues et la formation de vos équipes. Vous bénéficiez d'un support prioritaire pour corriger les anomalies, ajuster les comportements et faire évoluer l'outil au rythme de votre activité. Notre objectif est que la solution gagne en valeur avec le temps.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="container-page pb-8 pt-14 md:pt-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="type-label enter">FAQ</p>
            <h1 className="type-h2 enter mt-5" style={stagger(1)}>
              Questions fréquentes
            </h1>
            <p className="type-lead enter mt-5" style={stagger(2)}>
              L'essentiel, simplement.
            </p>
          </div>
        </div>

        <div className="enter lg:col-span-7 lg:col-start-6" style={stagger(2)}>
          <ul className="border-t border-border">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <li key={item.question} data-open={isOpen} className="group border-b border-border">
                  <h2>
                    <button
                      id={buttonId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="text-[18px] font-medium leading-snug tracking-[-0.02em] md:text-[20px]">
                        {item.question}
                      </span>
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-[transform,color,background-color] duration-200 ease-out group-data-[open=true]:rotate-45 group-data-[open=true]:bg-foreground group-data-[open=true]:text-background">
                        <Plus size={15} strokeWidth={2} />
                      </span>
                    </button>
                  </h2>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-data-[open=true]:grid-rows-[1fr]"
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-12 text-[16px] leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-200 group-data-[open=true]:opacity-100 group-data-[open=true]:delay-75">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
