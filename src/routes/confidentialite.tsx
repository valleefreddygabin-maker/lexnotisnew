import { createFileRoute } from "@tanstack/react-router";
import { LegalIdentity, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — LexNotis" },
      {
        name: "description",
        content:
          "Quelles données LexNotis collecte, pourquoi, combien de temps elles sont conservées et comment exercer vos droits RGPD.",
      },
      { property: "og:title", content: "Politique de confidentialité — LexNotis" },
      {
        property: "og:description",
        content: "Traitement des données personnelles, durées de conservation et droits RGPD chez LexNotis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://lexnotis.com/confidentialite" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://lexnotis.com/confidentialite" }],
  }),
  component: Confidentialite,
});

function Confidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Comment LexNotis collecte et protège vos données personnelles lorsque vous utilisez ce site ou votre espace client."
      updated="9 août 2026"
      sections={[
        { id: "responsable", title: "Responsable du traitement" },
        { id: "donnees", title: "Données collectées et finalités" },
        { id: "bases", title: "Bases légales" },
        { id: "conservation", title: "Durées de conservation" },
        { id: "destinataires", title: "Destinataires et sous-traitants" },
        { id: "securite", title: "Sécurité" },
        { id: "droits", title: "Vos droits" },
      ]}
    >
      <LegalSection id="responsable" title="Responsable du traitement">
        <p>
          Le responsable du traitement des données est LexNotis, agence spécialisée dans la conception
          d'infrastructures et d'assistants IA sur-mesure.
        </p>
        <LegalIdentity />
      </LegalSection>

      <LegalSection id="donnees" title="Données collectées et finalités">
        <ul className="space-y-2">
          <li>
            <strong className="text-foreground">Formulaire de contact</strong> — nom, email,
            entreprise, sujet et message, afin de répondre à votre demande et d'assurer le suivi
            commercial.
          </li>
          <li>
            <strong className="text-foreground">Compte client</strong> — adresse email et données
            d'authentification, afin de créer et sécuriser votre espace personnel.
          </li>
          <li>
            <strong className="text-foreground">Espace client</strong> — informations de profil,
            projets, automatisations, abonnement et factures, afin de fournir le service souscrit.
          </li>
          <li>
            <strong className="text-foreground">Données techniques</strong> — données strictement
            nécessaires au fonctionnement et à la sécurité du site (session, journalisation
            technique).
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="bases" title="Bases légales">
        <p>
          Selon le traitement : l'exécution du contrat (espace client, prestations), l'intérêt
          légitime (réponse à une demande entrante, sécurité du service) ou votre consentement
          (communications non sollicitées).
        </p>
      </LegalSection>

      <LegalSection id="conservation" title="Durées de conservation">
        <ul className="space-y-1">
          <li>Demandes de contact : 3 ans à compter du dernier échange.</li>
          <li>Compte et données client : durée de la relation contractuelle, puis archivage légal.</li>
          <li>Documents comptables : 10 ans, conformément aux obligations légales.</li>
        </ul>
      </LegalSection>

      <LegalSection id="destinataires" title="Destinataires et sous-traitants">
        <p>
          Vos données sont accessibles aux seuls membres de LexNotis qui en ont besoin. Nous faisons
          appel à des prestataires techniques pour l'hébergement, la base de données, l'authentification
          et l'envoi d'emails transactionnels. Ces prestataires agissent sur instruction et sont liés
          par des engagements de confidentialité. Vos données ne sont ni vendues ni cédées.
        </p>
      </LegalSection>

      <LegalSection id="securite" title="Sécurité">
        <p>
          Les accès à votre espace client sont protégés par mot de passe et par des règles d'accès
          côté serveur limitant chaque utilisateur à ses propres données. Les échanges avec le site
          sont chiffrés en transit (HTTPS).
        </p>
      </LegalSection>

      <LegalSection id="droits" title="Vos droits">
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation,
          d'opposition et de portabilité de vos données, ainsi que du droit de retirer votre
          consentement. Adressez votre demande à contact@lexnotis.com : nous répondons sous un mois.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            cnil.fr
          </a>
          ).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
