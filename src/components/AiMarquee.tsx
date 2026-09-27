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

function hideBrokenImage(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
}

/**
 * The one marquee on the page: constant, linear motion (it's a list that doesn't
 * need individual attention). Logos stay grey until hovered so the row reads as texture.
 */
export function AiMarquee() {
  const items = [...AI_BRANDS, ...AI_BRANDS];
  return (
    <section aria-label="Technologies IA partenaires" className="py-16 md:py-20">
      <p className="container-page text-center text-[15px] text-muted-foreground">
        Nous intégrons les meilleures intelligences artificielles du marché
      </p>

      <div className="marquee-pause mask-fade-x mt-8 overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-12 pr-12 md:gap-16 md:pr-16">
          {items.map((brand, i) => (
            <li
              key={`${brand.name}-${i}`}
              aria-hidden={i >= AI_BRANDS.length}
              className="flex shrink-0 items-center gap-2.5 opacity-60 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={brand.src}
                alt=""
                loading="lazy"
                width={24}
                height={24}
                onError={hideBrokenImage}
                className="h-6 w-6 object-contain"
              />
              <span className="whitespace-nowrap text-[17px] font-medium tracking-[-0.02em] text-foreground">
                {brand.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
