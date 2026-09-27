import { createFileRoute } from "@tanstack/react-router";
import { useCookieConsent } from "@/components/CookieConsent";
import { LegalIdentity, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — LexNotis" },
      {
        name: "description",
        content:
          "Quels cookies et stockages locaux LexNotis utilise, à quoi ils servent et comment les maîtriser depuis votre navigateur.",
      },
      { property: "og:title", content: "Cookies — LexNotis" },
      {
        property: "og:description",
        content: "Politique cookies de LexNotis : usages strictement nécessaires et gestion depuis votre navigateur.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lexnotis.com/cookies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://lexnotis.com/cookies" }],
  }),
  component: Cookies,
});

function Cookies() {
  const { open } = useCookieConsent();
  return (
    <LegalPage
      title="Politique cookies"
      intro="Le site LexNotis fonctionne sans cookie publicitaire ni traceur de profilage."
      updated="9 août 2026"
      sections={[
        { id: "responsable", title: "Responsable du site" },
        { id: "utilisation", title: "Ce que nous utilisons" },
        { id: "non-utilisation", title: "Ce que nous n'utilisons pas" },
        { id: "gerer", title: "Gérer vos cookies" },
      ]}
    >
      <LegalSection id="responsable" title="Responsable du site">
        <p>
          Le site lexnotis.com est édité par LexNotis, agence spécialisée dans la conception
          d'infrastructures et d'assistants IA sur-mesure.
        </p>
        <LegalIdentity />
      </LegalSection>

      <LegalSection id="utilisation" title="Ce que nous utilisons">
        <ul className="space-y-2">
          <li>
            <strong className="text-foreground">Cookies de session</strong> — nécessaires pour vous
            maintenir connecté à votre espace client et sécuriser l'authentification.
          </li>
          <li>
            <strong className="text-foreground">Stockage local</strong> — mémorise des préférences
            d’interface, comme l’option « se souvenir de moi » et l’état de votre parcours de
            connexion sur cet appareil.
          </li>
        </ul>
        <p>
          Ces éléments sont strictement nécessaires au fonctionnement du service : ils ne requièrent
          pas de consentement préalable et ne servent à aucun ciblage publicitaire.
        </p>
      </LegalSection>

      <LegalSection id="non-utilisation" title="Ce que nous n'utilisons pas">
        <p>
          Aucun cookie publicitaire, aucun traceur tiers de réseaux sociaux et aucun profilage
          comportemental ne sont déposés depuis ce site.
        </p>
      </LegalSection>

      <LegalSection id="gerer" title="Gérer vos cookies">
        <p>
          Vous pouvez modifier vos préférences à tout moment via le panneau ci-dessous, ou
          supprimer et bloquer les cookies depuis les réglages de votre navigateur. Attention :
          bloquer les cookies de session empêche la connexion à l’espace client.
        </p>
        <button
          onClick={open}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:scale-105"
        >
          Gérer mes préférences cookies
        </button>
      </LegalSection>
    </LegalPage>
  );
}

