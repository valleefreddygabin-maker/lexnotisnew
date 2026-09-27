import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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

function hideBrokenImage(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.visibility = "hidden";
}

export function IntegrationsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="type-h2">Connectez LexNotis à tous vos outils du quotidien</h2>
            <p className="type-lead mx-auto mt-5 max-w-xl">
              Email, agenda, CRM, facturation, réseaux sociaux, tableurs : vos outils communiquent
              enfin entre eux, sans friction.
            </p>
          </div>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-4 gap-2.5 sm:grid-cols-8 sm:gap-3">
          {tools.map((t, i) => (
            <Reveal as="li" key={t.name} delay={Math.min(i, 12) * 30}>
              <div
                title={t.name}
                className="surface flex aspect-square items-center justify-center rounded-2xl transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                <img
                  src={t.src}
                  alt={t.name}
                  loading="lazy"
                  width={30}
                  height={30}
                  onError={hideBrokenImage}
                  className="h-[30px] w-[30px] object-contain"
                />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-[15px] text-muted-foreground">
            Et des milliers d'autres.{" "}
            <Link to="/contact" className="group inline-flex items-center gap-1 font-medium text-brand">
              Vérifier mes outils
              <ArrowRight
                size={15}
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
