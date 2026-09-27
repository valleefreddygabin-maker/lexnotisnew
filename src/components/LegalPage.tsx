import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { stagger } from "@/lib/motion";

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

  // Scroll-spy: highlight the section in view (no URL rewriting, it caused scroll jumps).
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
    <div className="container-page pb-8 pt-14 md:pt-24">
      <header className="max-w-3xl">
        <p className="type-label enter">{eyebrow}</p>
        <h1 className="type-h2 enter mt-5" style={stagger(1)}>
          {title}
        </h1>
        <p className="type-lead enter mt-5" style={stagger(2)}>
          {intro}
        </p>
        <p className="enter mt-3 text-[14px] text-muted-foreground" style={stagger(2)}>
          Dernière mise à jour : {updated}
        </p>
      </header>

      <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-8">
        <aside className="lg:col-span-3">
          <div className="space-y-10 lg:sticky lg:top-28">
            {sections && sections.length > 0 && (
              <nav aria-label="Sur cette page">
                <p className="type-label mb-4">Sur cette page</p>
                <ul className="space-y-0.5 border-l border-border">
                  {sections.map((section) => {
                    const isActive = activeId === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          aria-current={isActive ? "true" : undefined}
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
                          className={`-ml-px block border-l py-1.5 pl-4 text-[14px] transition-colors duration-200 ${
                            isActive
                              ? "border-brand font-medium text-foreground"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            <nav aria-label="Pages légales">
              <p className="type-label mb-4">Pages légales</p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {legalNav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="inline-block rounded-full px-3 py-1.5 text-[14px] text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-colors hover:text-foreground lg:rounded-none lg:px-0 lg:py-1 lg:shadow-none"
                      activeProps={{ className: "font-medium !text-foreground" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <div className="space-y-12">{children}</div>

          <div className="mt-16 rounded-3xl bg-secondary p-6 md:p-8">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Une question sur ces informations ou sur vos données ?{" "}
              <Link to="/contact" className="font-medium text-foreground underline underline-offset-4">
                Contactez-nous
              </Link>{" "}
              ou écrivez à{" "}
              <a
                href="mailto:contact@lexnotis.com"
                className="font-medium text-foreground underline underline-offset-4"
              >
                contact@lexnotis.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
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
    <section id={id} className="scroll-mt-28 rounded-2xl">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="mt-4 max-w-[68ch] space-y-3 text-[16px] leading-relaxed text-muted-foreground [&_a]:text-foreground [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground">
        {children}
      </div>
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
