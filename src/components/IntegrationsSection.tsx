import { Reveal } from "@/components/Reveal";
import { GradientLink } from "@/components/GradientButton";
import { ArrowRight } from "lucide-react";

// Logos multicolores officiels (dégradés Instagram, Google Drive, etc. préservés)
const tools: { name: string; src: string }[] = [
  { name: "Gmail", src: "https://svgl.app/library/gmail.svg" },
  { name: "Google Agenda", src: "https://svgl.app/library/google-calendar.svg" },
  { name: "Google Meet", src: "https://svgl.app/library/google-meet.svg" },
  { name: "Google Sheets", src: "https://svgl.app/library/google-sheets.svg" },
  { name: "Google Drive", src: "https://svgl.app/library/drive.svg" },
  { name: "Notion", src: "https://svgl.app/library/notion.svg" },
  { name: "HubSpot", src: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "WhatsApp", src: "https://svgl.app/library/whatsapp-icon.svg" },
  { name: "Instagram", src: "https://svgl.app/library/instagram-icon.svg" },
  { name: "Airtable", src: "https://cdn.simpleicons.org/airtable/18BFFF" },
  { name: "Stripe", src: "https://svgl.app/library/stripe.svg" },
  { name: "Zapier", src: "https://cdn.simpleicons.org/zapier/FF4F00" },
  { name: "Shopify", src: "https://svgl.app/library/shopify.svg" },
  { name: "Trello", src: "https://svgl.app/library/trello.svg" },
  { name: "Asana", src: "https://svgl.app/library/asana-logo.svg" },
  { name: "WordPress", src: "https://svgl.app/library/wordpress.svg" },
];


export function IntegrationsSection() {
  const row = [...tools, ...tools];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div
            className="group relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee gap-4 py-2 group-hover:[animation-play-state:paused]">
              {row.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  title={t.name}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
                  <img
                    src={t.src}
                    alt={`Logo ${t.name}`}
                    loading="lazy"
                    className="h-9 w-9 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>


        <Reveal delay={120}>
          <div className="mt-10">
            <span className="inline-flex items-center rounded-full border border-black/10 bg-gradient-brand-soft px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
              Des milliers d'intégrations possibles
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
              Connectez LexNotis à
              <br />
              <span className="text-gradient-brand">tous vos outils du quotidien</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
              Email, agenda, CRM, facturation, réseaux sociaux, tableurs : vos outils communiquent
              enfin entre eux. On centralise vos workflows et on automatise vos opérations sans
              friction.
            </p>
            <div className="mt-8 flex justify-center">
              <GradientLink to="/contact">
                Vérifier mes outils <ArrowRight size={16} />
              </GradientLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
