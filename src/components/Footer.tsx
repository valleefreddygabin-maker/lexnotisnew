import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { socials } from "@/lib/socials";
import { legalNav } from "./LegalPage";

export function Footer() {

  return (
    <footer className="mt-32 border-t border-black/10 bg-background/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              L'agence qui conçoit des infrastructures intelligentes sur-mesure
              pour libérer le potentiel des entreprises.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-foreground text-muted-foreground">Accueil</Link></li>
              <li><Link to="/services" className="hover:text-foreground text-muted-foreground">Services</Link></li>
              <li><Link to="/tarifs" className="hover:text-foreground text-muted-foreground">Tarifs</Link></li>
              <li><Link to="/equipe" className="hover:text-foreground text-muted-foreground">Équipe</Link></li>
              <li><Link to="/contact" className="hover:text-foreground text-muted-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </h4>
            <p className="text-sm text-muted-foreground">
              Une idée, un besoin, un défi ?<br />
              <Link to="/contact" className="text-foreground hover:text-gradient-brand">
                Parlons-en →
              </Link>
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Réseaux
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} LexNotis. Tous droits réservés.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalNav.map((item) => (
              <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

