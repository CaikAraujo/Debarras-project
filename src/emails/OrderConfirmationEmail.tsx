import React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Hr,
  Tailwind,
  Link,
  Img
} from '@react-email/components'
import Stripe from 'stripe'

interface OrderConfirmationEmailProps {
  customerName: string
  customerEmail: string
  orderId: string
  amountTotal: number
  shippingAddress: Stripe.Address | null
}

const formatAddress = (address: Stripe.Address | null) => {
  if (!address) return 'Non fournie'
  const parts = [
    address.line1,
    address.line2,
    `${address.postal_code || ''} ${address.city || ''}`.trim(),
    `${address.state || ''}, ${address.country || ''}`.trim()
  ].filter(Boolean) // Remove partes vazias
  return parts.join(', ')
}

export default function OrderConfirmationEmail({
  customerName,
  orderId,
  amountTotal,
  customerEmail,
  shippingAddress,
}: OrderConfirmationEmailProps) {
  const preview = `Nouvelle commande de ${customerName} confirmée`

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white my-10 mx-auto p-8 rounded-lg shadow-md max-w-xl">
            <Section className="text-center">
              <Img 
                src="https://i.imgur.com/r6nBw2z.png" // Use o URL do seu logo
                alt="Logo Debarras Suisse" 
                width="150"
                className="mx-auto"
              />
              <Heading className="text-2xl font-bold text-gray-800 mt-6">
                Nouvelle Commande Confirmée !
              </Heading>
            </Section>

            <Section className="mt-6">
              <Text className="text-base text-gray-600">
                Bonjour, une nouvelle commande a été passée et payée avec succès sur le site.
              </Text>
            </Section>

            <Hr className="my-6 border-gray-300" />
            
            <Section>
              <Heading as="h2" className="text-lg font-semibold text-gray-700">
                Détails du Client
              </Heading>
              <Text className="text-base text-gray-600 my-1">
                <strong>Nom :</strong> {customerName}
              </Text>
              <Text className="text-base text-gray-600 my-1">
                <strong>E-mail :</strong> <Link href={`mailto:${customerEmail}`} className="text-blue-600">{customerEmail}</Link>
              </Text>
              <Text className="text-base text-gray-600 my-1">
                <strong>Adresse de livraison :</strong> {formatAddress(shippingAddress)}
              </Text>
            </Section>

            <Hr className="my-6 border-gray-300" />

            <Section>
              <Heading as="h2" className="text-lg font-semibold text-gray-700">
                Détails de la Commande
              </Heading>
              <Text className="text-base text-gray-600 my-1">
                <strong>ID de la Commande :</strong> {orderId}
              </Text>
              <Text className="text-xl font-bold text-gray-800 my-2">
                <strong>Montant Total :</strong> CHF {amountTotal.toFixed(2)}
              </Text>
            </Section>
            
            <Hr className="my-6 border-gray-300" />

            <Section className="text-center text-gray-500 text-sm">
              <Text>
                © {new Date().getFullYear()} Debarras Suisse. Tous droits réservés.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
} 