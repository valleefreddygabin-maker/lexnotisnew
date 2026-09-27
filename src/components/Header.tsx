import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, Menu, UserPlus, X } from "lucide-react";
import { Logo } from "./Logo";
import { GradientLink } from "./GradientButton";
import { useAuth } from "@/hooks/useAuth";
import { socials } from "@/lib/socials";
import { hasAccountOnDevice } from "@/lib/account-state";




const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/equipe", label: "Équipe" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { session } = useAuth();
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const sync = () => setHasAccount(hasAccountOnDevice());
    sync();
    window.addEventListener("lexnotis:account-state", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("lexnotis:account-state", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Un utilisateur connecté possède forcément un compte.
  useEffect(() => {
    if (session) setHasAccount(true);
  }, [session]);

  const accountLabel = session ? "Mon espace" : hasAccount ? "Se connecter" : "Créer un compte";
  const AccountIcon = session || hasAccount ? LogIn : UserPlus;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <Logo />


        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-brand transition-all duration-300 group-hover:w-5 data-[status=active]:w-5" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="mr-1 flex items-center gap-1">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <Link
            to={session ? "/dashboard" : "/connexion"}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-black/5 px-3 py-2 text-xs text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-black/10"
          >
            <AccountIcon size={13} /> {accountLabel}
          </Link>

          <GradientLink to="/contact" className="!px-4 !py-2 !text-xs">
            Démarrer un projet
          </GradientLink>
        </div>


        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-black/10 bg-black/5 p-1.5 text-foreground md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Scroll progress */}
      <div className="h-[2px] w-full overflow-hidden bg-black/5">
        <div
          className="h-full bg-gradient-brand transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {open && (
        <div className="animate-fade-in border-t border-black/10 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                activeProps={{ className: "bg-black/5 text-foreground" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={session ? "/dashboard" : "/connexion"}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
            >
              <AccountIcon size={15} /> {accountLabel}
            </Link>


            <GradientLink to="/contact" className="mt-2 !w-full">
              Démarrer un projet
            </GradientLink>

            <div className="mt-4 flex items-center gap-2 border-t border-black/10 pt-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
