import { createFileRoute } from "@tanstack/react-router";
import { LegalIdentity, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — LexNotis" },
      {
        name: "description",
        content:
          "Éditeur, hébergeur, propriété intellectuelle et responsabilité du site LexNotis, agence d'infrastructures IA en Sarthe.",
      },
      { property: "og:title", content: "Mentions légales — LexNotis" },
      {
        property: "og:description",
        content: "Informations légales de l'agence LexNotis : éditeur, hébergement, propriété intellectuelle.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lexnotis.com/mentions-legales" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://lexnotis.com/mentions-legales" }],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations relatives à l'éditeur et à l'hébergement du site lexnotis.com."
      updated="9 août 2026"
      sections={[
        { id: "editeur", title: "Éditeur du site" },
        { id: "responsable", title: "Responsable de la publication" },
        { id: "hebergement", title: "Hébergement" },
        { id: "propriete", title: "Propriété intellectuelle" },
        { id: "responsabilite", title: "Limitation de responsabilité" },
        { id: "droit", title: "Droit applicable" },
      ]}
    >
      <LegalSection id="editeur" title="Éditeur du site">
        <p>
          Le site lexnotis.com est édité par LexNotis, agence spécialisée dans la conception
          d'infrastructures et d'assistants IA sur-mesure, fondée par Gabin.
        </p>
        <LegalIdentity showVat />
      </LegalSection>

      <LegalSection id="responsable" title="Responsable de la publication">
        <p>
          La responsabilité de la publication des contenus du site est assurée par la direction de
          LexNotis, joignable à l'adresse contact@lexnotis.com.
        </p>
      </LegalSection>

      <LegalSection id="hebergement" title="Hébergement">
        <p>
          Le site est hébergé sur l'infrastructure Lovable (Lovable Labs Incorporated), qui assure la
          diffusion des pages via un réseau de distribution de contenu. Toute demande relative à
          l'hébergement peut être adressée à LexNotis, qui la relaiera à son prestataire.
        </p>
      </LegalSection>

      <LegalSection id="propriete" title="Propriété intellectuelle">
        <p>
          L'ensemble des éléments du site (textes, visuels, logo LexNotis, identité graphique,
          maquettes, code) est protégé par le droit de la propriété intellectuelle. Toute
          reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite
          préalable de LexNotis est interdite.
        </p>
        <p>
          Les marques et logos de tiers présentés sur le site (fournisseurs de modèles IA, outils
          partenaires) demeurent la propriété de leurs détenteurs respectifs et sont cités à des
          fins d'illustration technique.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="Limitation de responsabilité">
        <p>
          Les informations publiées sur le site sont fournies à titre indicatif et peuvent évoluer.
          LexNotis met tout en œuvre pour en assurer l'exactitude, sans garantir l'absence d'erreur
          ou d'omission. Les liens vers des sites externes ne sauraient engager la responsabilité de
          LexNotis quant à leur contenu.
        </p>
      </LegalSection>

      <LegalSection id="droit" title="Droit applicable">
        <p>
          Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution
          amiable, les tribunaux français sont compétents.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
