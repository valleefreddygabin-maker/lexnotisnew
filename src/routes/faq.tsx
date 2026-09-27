import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { GradientLink } from "@/components/GradientButton";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6 pt-24 pb-16 font-faq">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Questions fréquentes
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            L'essentiel, simplement.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                data-open={isOpen}
                className="rounded-2xl border border-black/10 bg-card transition-colors duration-300 ease-out hover:border-black/20 data-[open=true]:border-violet/30"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 py-5 px-5 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-display text-sm font-semibold leading-snug md:text-base">
                    {item.question}
                  </h3>
                  <span
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-black/10 text-muted-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-[open=true]:rotate-180 data-[open=true]:border-violet/30 data-[open=true]:text-primary"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="px-5 pb-5 transition-opacity duration-300 ease-out"
                      style={{ opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-black/10 bg-card p-6">
          <h2 className="font-display text-base font-semibold">
            Une autre question ?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Parlons-en en 30 min, gratuit et sans engagement.
          </p>
          <div className="mt-4">
            <GradientLink to="/contact" variant="ghost">
              Réserver un appel
            </GradientLink>
          </div>
        </div>
      </div>
    </div>
  );
}
