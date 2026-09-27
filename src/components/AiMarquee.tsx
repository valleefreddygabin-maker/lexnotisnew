// Logos multicolores officiels (dégradés d'origine préservés)
const AI_BRANDS = [
  { name: "OpenAI", src: "https://svgl.app/library/openai.svg" },
  { name: "Anthropic", src: "https://svgl.app/library/anthropic_black.svg" },
  { name: "Google Gemini", src: "https://svgl.app/library/gemini.svg" },
  { name: "Mistral AI", src: "https://svgl.app/library/mistral-ai_logo.svg" },
  { name: "Perplexity", src: "https://svgl.app/library/perplexity.svg" },
  { name: "Hugging Face", src: "https://svgl.app/library/hugging_face.svg" },
  { name: "NVIDIA", src: "https://svgl.app/library/nvidia-icon-light.svg" },
  { name: "Meta AI", src: "https://svgl.app/library/meta.svg" },
  { name: "Midjourney", src: "https://svgl.app/library/midjourney.svg" },
  { name: "ElevenLabs", src: "https://cdn.simpleicons.org/elevenlabs/000000" },
  { name: "LangChain", src: "https://svgl.app/library/langchain-logo.svg" },
  { name: "DeepMind", src: "https://cdn.simpleicons.org/deepmind/4285F4" },
];

export function AiMarquee() {
  const items = [...AI_BRANDS, ...AI_BRANDS];
  return (
    <section
      aria-label="Technologies IA partenaires"
      className="relative overflow-hidden border-y border-black/10 bg-secondary/40 py-10"
    >
      <div className="mx-auto mb-6 max-w-7xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
          Écosystème IA
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Nous intégrons les meilleures intelligences artificielles du marché
        </p>
      </div>

      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused]">
          {items.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-xl border border-black/5 bg-card/60 px-6 py-3 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:border-brand"
            >
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                loading="lazy"
                className="h-6 w-6"
              />
              <span className="text-sm font-medium tracking-tight text-foreground whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
