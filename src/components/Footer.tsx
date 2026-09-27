import { Link, useMatches, useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { socials } from "@/lib/socials";
import { legalNav } from "./LegalPage";
import { Reveal } from "./Reveal";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** Page-specific closing message shown above the footer. */
    cta?: { title: string; text: string };
  }
}

// Pages where a "talk to us" call-to-action would be redundant.
const NO_CTA = ["/contact", "/connexion", "/mot-de-passe-oublie", "/reset-password"];

const navigation = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/automatisation-workflow", label: "Automatisation" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/equipe", label: "Équipe" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showCta = !NO_CTA.includes(pathname);
  const cta = useMatches({
    select: (matches) => [...matches].reverse().find((m) => m.staticData?.cta)?.staticData?.cta,
  });

  return (
    <footer className="dark px-2 pb-2 pt-24 md:px-3 md:pb-3 md:pt-32">
      <div className="relative overflow-hidden rounded-[28px] bg-background text-foreground">
        {/* Soft violet light from the top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-4xl rounded-full bg-[oklch(0.52_0.215_289/0.28)] blur-[120px]"
        />

        <div className="container-page relative">
          {showCta && (
            <div className="border-b border-border py-20 md:py-28">
              <Reveal>
                <h2 className="type-h2 max-w-3xl">
                  {cta ? (
                    cta.title
                  ) : (
                    <>
                      Moins de tâches répétitives.{" "}
                      <span className="text-muted-foreground">Plus de valeur créée.</span>
                    </>
                  )}
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="type-lead mt-6 max-w-xl">
                  {cta?.text ??
                    "Un échange de 30 minutes suffit pour identifier les leviers qui feront la différence. Offert et sans engagement."}
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn btn-on-night">
                    Discuter de mon projet <ArrowRight size={16} />
                  </Link>
                </div>
              </Reveal>
            </div>
          )}

          <div className="grid gap-12 py-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Logo glow={false} />
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                L'agence sarthoise qui conçoit des infrastructures intelligentes sur-mesure pour
                libérer le potentiel des entreprises.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="type-label mb-4">Navigation</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] md:grid-cols-1">
                {navigation.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-foreground/80 transition-colors duration-200 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="type-label mb-4">Contact</p>
              <a
                href="mailto:contact@lexnotis.com"
                className="link-underline text-[15px] text-foreground"
              >
                contact@lexnotis.com
              </a>
              <p className="mt-2 text-[15px] text-muted-foreground">Sarthe, France</p>

              <div className="mt-6 flex items-center gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-[color,background-color,transform] duration-200 ease-out hover:bg-foreground/5 hover:text-foreground active:scale-95 [&_svg]:h-[18px] [&_svg]:w-[18px]"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-border py-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} LexNotis. Tous droits réservés.</p>
            <nav aria-label="Pages légales" className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
