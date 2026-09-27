import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Logo } from "./Logo";
import { GradientLink } from "./GradientButton";
import { useAuth } from "@/hooks/useAuth";
import { socials } from "@/lib/socials";
import { hasAccountOnDevice } from "@/lib/account-state";
import { cn } from "@/lib/utils";

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
  const { session } = useAuth();
  const [hasAccount, setHasAccount] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

  // "Scrolled" state from a sentinel at the top of the document (no scroll listener).
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on navigation and with Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previous;
    };
  }, [open]);

  const accountLabel = session ? "Mon espace" : hasAccount ? "Se connecter" : "Créer un compte";
  const AccountIcon = session || hasAccount ? LogIn : UserPlus;
  const accountTo = session ? "/dashboard" : "/connexion";

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-0 h-3 w-px" />
      <header
        data-scrolled={scrolled || open}
        data-open={open}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 data-[open=true]:!bg-background data-[scrolled=true]:bg-background/80 data-[scrolled=true]:shadow-[0_1px_0_var(--border)] data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150"
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Logo glow={false} />

          <nav aria-label="Navigation principale" className="hidden items-center lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3.5 py-2 text-[14px] text-muted-foreground transition-colors duration-200 hover:text-foreground data-[status=active]:text-foreground"
                activeProps={{ className: "font-medium" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to={accountTo}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[14px] text-muted-foreground transition-colors duration-200 hover:text-foreground xl:inline-flex"
            >
              <AccountIcon size={15} strokeWidth={1.75} /> {accountLabel}
            </Link>
            <GradientLink to="/contact" size="sm">
              Discuter de mon projet
            </GradientLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-transform duration-150 ease-out active:scale-95 lg:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out)]",
                  open && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out)]",
                  open && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>

        {/* Scroll progress (CSS scroll-driven, progressive enhancement) */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-data-[scrolled=true]/header:opacity-100"
        >
          <div className="scroll-progress h-full w-full bg-brand" />
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          data-open={open}
          className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[var(--ease-drawer)] data-[open=true]:grid-rows-[1fr] lg:hidden"
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Menu mobile"
              className={cn(
                "container-page flex min-h-[calc(100dvh-4rem)] flex-col overflow-y-auto pb-8 pt-2 transition-opacity duration-200",
                open ? "opacity-100" : "opacity-0",
              )}
            >
              {nav.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-3.5 text-[22px] font-medium tracking-[-0.02em] text-foreground/70 transition-[transform,opacity,color] duration-300 ease-[var(--ease-out)] data-[status=active]:text-foreground",
                    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${60 + i * 30}ms` : "0ms" }}
                  activeOptions={{ exact: true }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <GradientLink to="/contact" className="w-full">
                  Discuter de mon projet <ArrowRight size={16} />
                </GradientLink>
                <GradientLink to={accountTo} variant="ghost" className="w-full">
                  <AccountIcon size={16} strokeWidth={1.75} /> {accountLabel}
                </GradientLink>
              </div>
              <div className="mt-6 flex items-center gap-1">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground [&_svg]:h-[18px] [&_svg]:w-[18px]"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
