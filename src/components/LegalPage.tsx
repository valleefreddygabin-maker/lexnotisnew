import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export const legalNav = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/confidentialite", label: "Confidentialité" },
  { to: "/cookies", label: "Cookies" },
  { to: "/conditions-generales", label: "CGU" },
] as const;

export function LegalPage({
  eyebrow = "Informations légales",
  title,
  intro,
  updated,
  sections,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  updated: string;
  sections?: { id: string; title: string }[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scroll-spy: highlight the section in view (no URL rewriting — it caused scroll jumps).
  useEffect(() => {
    if (!sections || sections.length === 0 || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top) setActiveId(top.target.id);
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);


  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gradient-brand">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">{intro}</p>
      <p className="mt-2 text-xs text-muted-foreground">Dernière mise à jour : {updated}</p>

      {sections && sections.length > 0 && (
        <div className="mt-8 rounded-2xl border border-black/10 bg-black/[0.02] p-4 md:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sur cette page
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => {
                      const el = document.getElementById(section.id);
                      if (!el) return;
                      event.preventDefault();
                      // Hash is synced only on click, never during scroll.
                      window.history.replaceState(null, "", `#${section.id}`);
                      setActiveId(section.id);
                      const top = el.getBoundingClientRect().top + window.scrollY - 96;
                      window.scrollTo({ top, behavior: "smooth" });
                    }}
                    className={`group flex items-center gap-2 text-sm transition-colors ${
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >

                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all group-hover:h-2 group-hover:w-2 ${
                        isActive ? "bg-brand" : "bg-brand/60"
                      }`}
                    />
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Pages légales
        </p>
        <nav className="flex flex-wrap gap-2">
          {legalNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full border border-black/10 bg-black/[0.03] px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-brand/30 hover:text-foreground"
              activeProps={{ className: "border-brand/40 bg-brand/10 font-medium text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-10 space-y-8">{children}</div>

      <div className="mt-14 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
        <p className="text-sm text-muted-foreground">
          Une question sur ces informations ou sur vos données ?{" "}
          <Link to="/contact" className="text-foreground underline underline-offset-4">
            Contactez-nous
          </Link>{" "}
          ou écrivez à{" "}
          <a
            href="mailto:contact@lexnotis.com"
            className="text-foreground underline underline-offset-4"
          >
            contact@lexnotis.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-black/10 bg-white/60 p-6 md:p-7"
    >
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function LegalIdentity({ showVat = false }: { showVat?: boolean }) {
  return (
    <ul className="space-y-1">
      <li>Dénomination : LEXNOTIS</li>
      <li>Forme juridique : Entrepreneur individuel</li>
      <li>Siège social : France</li>
      <li>SIRET : 102 753 043 00011</li>
      {showVat && <li>Numéro de TVA intracommunautaire : en cours d'attribution</li>}
      <li>
        Contact :{" "}
        <a href="mailto:contact@lexnotis.com" className="underline underline-offset-4">
          contact@lexnotis.com
        </a>
      </li>
    </ul>
  );
}
