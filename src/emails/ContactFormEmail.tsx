import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Section,
  Text,
  Hr,
  Preview,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

type ContactFormEmailProps = {
  name: string
  senderEmail: string
  phone?: string
  service?: string
  message: string
}

export default function ContactFormEmail({
  name,
  senderEmail,
  phone,
  service,
  message,
}: ContactFormEmailProps) {
  const previewText = `Nouvelle demande de devis de ${name}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg shadow-sm my-10 mx-auto p-8 max-w-2xl">
            <Heading className="text-2xl font-bold text-gray-800">
              Nouvelle Demande de Devis
            </Heading>
            <Text className="text-gray-600 mb-6">
              Vous avez reçu un nouveau message via le formulaire de contact de votre site.
            </Text>

            <Section className="bg-gray-50 border border-gray-200 rounded-md p-6">
              <Heading as="h2" className="text-lg font-semibold text-gray-700 mt-0">
                Détails du Contact
              </Heading>
              <Text className="text-base">
                <strong>Nom:</strong> {name}
              </Text>
              <Text className="text-base">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${senderEmail}`} className="text-blue-600">
                  {senderEmail}
                </a>
              </Text>
              {phone && (
                <Text className="text-base">
                  <strong>Téléphone:</strong> {phone}
                </Text>
              )}
            </Section>

            <Hr className="border-gray-300 my-8" />

            <Heading as="h2" className="text-lg font-semibold text-gray-700 mt-0">
              Message
            </Heading>
            <Text className="text-base text-gray-800 mb-4">
              <strong>Service souhaité:</strong> {service || 'Non spécifié'}
            </Text>
            <Text className="bg-white p-4 border border-gray-200 rounded-md text-base text-gray-700">
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 