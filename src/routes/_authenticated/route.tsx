import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSidebar } from "@/components/DashboardSidebar";


export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const isIntentionalLogout =
        typeof window !== "undefined" &&
        window.sessionStorage.getItem("lexnotis_logout_success") === "true";

      // Remplace l'entrée d'historique du dashboard : impossible d'y revenir
      // avec le bouton retour ou un swipe après la déconnexion.
      if (typeof window !== "undefined") {
        if (isIntentionalLogout) {
          // Le drapeau est retiré par la page d'accueil après affichage du message.
          window.location.replace("/?deconnexion=succes");
        } else {
          window.location.replace("/connexion");
        }
        return;
      }

      void navigate({ to: "/connexion", replace: true });
    }
  }, [loading, user, navigate]);


  if (loading || !user) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen bg-white">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto bg-white pt-16 md:ml-64 md:pt-0">
        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


