import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="fr" dir="ltr">
    <Head />
    <Preview>Réinitialisez votre mot de passe {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Réinitialisez votre mot de passe</Heading>
        <Text style={text}>
          Nous avons reçu une demande de réinitialisation de votre mot de passe
          pour {siteName}. Cliquez sur le bouton ci-dessous pour choisir un
          nouveau mot de passe.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Réinitialiser mon mot de passe
        </Button>
        <Text style={footer}>
          Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer
          cet email : votre mot de passe restera inchangé.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#1a1130',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const button = {
  backgroundColor: '#8c40ff',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '8px',
  padding: '12px 20px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
