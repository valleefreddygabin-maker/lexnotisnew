"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import {
  CreditCard,
  Bot,
  Receipt,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Workflow,
  LifeBuoy,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


function DashboardLogo() {
  return <Logo static glow={false} gradientId="ln-grad-dashboard" />;
}


type NavItem = { to: string; label: string; icon: typeof Home };

const navItems: NavItem[] = [
  { to: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/dashboard/agent", label: "Agents IA", icon: Bot },
  { to: "/dashboard/automatisations", label: "Automatisations", icon: Workflow },
  { to: "/dashboard/profil", label: "Profil", icon: User },
  { to: "/dashboard/abonnement", label: "Abonnement", icon: CreditCard },
  { to: "/dashboard/facture", label: "Factures", icon: Receipt },
  { to: "/dashboard/accompagnement", label: "Support dédié", icon: LifeBuoy },
];

function NavItems({ onClick }: { onClick?: () => void }) {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const normalizedPath = currentPath.replace(/\/$/, "") || "/";

  const activeItem = navItems
    .slice()
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) => {
      const normalizedItem = item.to.replace(/\/$/, "") || "/";
      return normalizedPath === normalizedItem || normalizedPath.startsWith(`${normalizedItem}/`);
    });

  return (
    <div className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = activeItem?.to === item.to;
        return (
          <Link
            key={item.to}
            to={item.to as never}
            replace
            onClick={onClick}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gradient-to-r from-violet/10 to-blue-accent/8 text-foreground"
                : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

function HomeLink({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        // `replace` empêche le retour arrière (ou le swipe) de ramener
        // sur une page du dashboard après le retour à l'accueil.
        if (typeof window !== "undefined") window.location.replace("/");
      }}
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
    >
      <Home className="h-4 w-4" />
      Retour à l'accueil
    </button>
  );
}



function SignOutButton() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);
    // Conservé pendant la fermeture de session afin que la protection du
    // dashboard sache distinguer une déconnexion volontaire d'une session expirée.
    window.sessionStorage.setItem("lexnotis_logout_success", "true");
    try {
      await Promise.race([
        supabase.auth.signOut({ scope: "local" }),
        new Promise((resolve) => window.setTimeout(resolve, 1500)),
      ]);
    } finally {
      // La redirection reste garantie même si le service d'authentification
      // est momentanément indisponible. Le drapeau est consommé par la page
      // d'accueil, qui affiche la notification de succès.
      if (typeof window !== "undefined") {
        window.location.replace("/?deconnexion=succes");
      }
    }
  };


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir quitter votre espace client ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={() => {
              void handleSignOut();
            }}
            className="bg-gradient-to-r from-violet to-blue-accent text-white hover:opacity-90"
          >
            {pending ? "Déconnexion…" : "Se déconnecter"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-black/8 bg-white px-4 md:hidden">
        <DashboardLogo />
        <button
          onClick={() => setMobileOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-black/5"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 flex-col border-r border-black/8 bg-white md:hidden ${
          mobileOpen ? "flex" : "hidden"
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <NavItems onClick={() => setMobileOpen(false)} />
        </nav>

        <div className="flex flex-col gap-1 border-t border-black/8 p-3">
          <HomeLink onClick={() => setMobileOpen(false)} />
          <SignOutButton />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-black/8 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-black/8 px-5">
          <DashboardLogo />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <NavItems />
        </nav>

        <div className="flex flex-col gap-1 border-t border-black/8 p-3">
          <HomeLink />
          <SignOutButton />
        </div>
      </aside>

    </>
  );
}
