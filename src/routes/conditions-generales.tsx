import { createFileRoute } from "@tanstack/react-router";
import { LegalIdentity, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/conditions-generales")({
  head: () => ({
    meta: [
      { title: "Conditions générales — LexNotis" },
      {
        name: "description",
        content:
          "Conditions d'utilisation du site et de l'espace client LexNotis, cadre des prestations, tarifs, livrables et résiliation.",
      },
      { property: "og:title", content: "Conditions générales — LexNotis" },
      {
        property: "og:description",
        content: "Cadre contractuel des prestations LexNotis et règles d'usage de l'espace client.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lexnotis.com/conditions-generales" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://lexnotis.com/conditions-generales" }],
  }),
  component: ConditionsGenerales,
});

function ConditionsGenerales() {
  return (
    <LegalPage
      title="Conditions générales"
      intro="Règles d'utilisation du site et de l'espace client, et cadre général de nos prestations."
      updated="9 août 2026"
      sections={[
        { id: "editeur", title: "Éditeur du service" },
        { id: "objet", title: "Objet" },
        { id: "compte", title: "Compte et espace client" },
        { id: "prestations", title: "Prestations et livrables" },
        { id: "tarifs", title: "Tarifs et paiement" },
        { id: "resiliation", title: "Durée et résiliation" },
        { id: "confidentialite", title: "Confidentialité et données" },
        { id: "responsabilite", title: "Responsabilité" },
        { id: "droit", title: "Droit applicable et litiges" },
      ]}
    >
      <LegalSection id="editeur" title="Éditeur du service">
        <p>
          Les présentes conditions sont proposées par LexNotis, agence spécialisée dans la conception
          d'infrastructures et d'assistants IA sur-mesure.
        </p>
        <LegalIdentity />
      </LegalSection>

      <LegalSection id="objet" title="Objet">
        <p>
          Les présentes conditions encadrent l'accès au site lexnotis.com, l'utilisation de l'espace
          client et le cadre général des prestations d'infrastructure et d'assistants IA réalisées
          par LexNotis. Chaque mission fait l'objet d'un devis ou d'un contrat spécifique qui prévaut
          en cas de divergence.
        </p>
      </LegalSection>

      <LegalSection id="compte" title="Compte et espace client">
        <p>
          La création d'un compte nécessite une adresse email valide et confirmée. Vous êtes
          responsable de la confidentialité de vos identifiants et des actions réalisées depuis votre
          compte. Tout usage frauduleux doit être signalé sans délai à contact@lexnotis.com.
        </p>
        <p>
          LexNotis peut suspendre un compte en cas d'utilisation abusive, illicite ou portant
          atteinte à la sécurité du service.
        </p>
      </LegalSection>

      <LegalSection id="prestations" title="Prestations et livrables">
        <p>
          Le périmètre, le calendrier et les livrables sont définis dans le devis accepté. Les délais
          annoncés sur le site sont indicatifs et dépendent de la disponibilité des informations et
          accès fournis par le client.
        </p>
      </LegalSection>

      <LegalSection id="tarifs" title="Tarifs et paiement">
        <p>
          Les prix sont exprimés en euros hors taxes et précisés au devis ou dans l'abonnement
          souscrit. Les factures émises sont consultables depuis l'espace client. Les modalités de
          règlement et échéances sont celles indiquées sur chaque facture.
        </p>
      </LegalSection>

      <LegalSection id="resiliation" title="Durée et résiliation">
        <p>
          Les abonnements sont souscrits pour la durée indiquée lors de la souscription et peuvent
          être résiliés selon les conditions de l'offre concernée. La résiliation n'affecte pas les
          sommes dues au titre des prestations déjà réalisées.
        </p>
      </LegalSection>

      <LegalSection id="confidentialite" title="Confidentialité et données">
        <p>
          Chaque partie s'engage à préserver la confidentialité des informations échangées. Le
          traitement des données personnelles est décrit dans notre politique de confidentialité.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="Responsabilité">
        <p>
          LexNotis intervient dans le cadre d'une obligation de moyens. Sa responsabilité ne saurait
          être engagée pour les dommages indirects, ni pour les défaillances imputables à des
          services tiers ou à un usage non conforme des livrables.
        </p>
      </LegalSection>

      <LegalSection id="droit" title="Droit applicable et litiges">
        <p>
          Les présentes conditions sont soumises au droit français. Les parties rechercheront une
          solution amiable avant toute action judiciaire ; à défaut, les tribunaux français sont
          compétents.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
