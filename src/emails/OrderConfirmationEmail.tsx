import React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Section,
} from '@react-email/components'
import Stripe from 'stripe'

interface OrderConfirmationEmailProps {
  customerName: string
  customerEmail: string
  orderId: string
  amountTotal: number
  shippingAddress: Stripe.Address | null
}

const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  customerName,
  orderId,
  amountTotal,
  customerEmail,
  shippingAddress
}) => (
  <Html>
    <Head />
    <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'sans-serif' }}>
      <Container
        style={{
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#ffffff',
          border: '1px solid #dddddd',
        }}
      >
        <Heading style={{ color: '#333333' }}>
          Nouvelle Vente Confirmée !
        </Heading>
        <Section>
          <Text>
            Bonjour, une nouvelle commande a été passée et payée avec succès sur le site.
          </Text>
          <Text>
            <strong>Nom du Client :</strong> {customerName}
          </Text>
          <Text>
            <strong>E-mail du Client :</strong> {customerEmail}
          </Text>
          <Text>
            <strong>ID de la Commande (Session Stripe) :</strong> {orderId}
          </Text>
          <Text>
            <strong>Montant Total :</strong> CHF {amountTotal.toFixed(2)}
          </Text>
          {shippingAddress && (
            <>
              <Text>
                <strong>Adresse de livraison :</strong>
              </Text>
              <Text>
                {shippingAddress.line1}
                <br />
                {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
                {shippingAddress.postal_code} {shippingAddress.city}
                <br />
                {shippingAddress.state}, {shippingAddress.country}
              </Text>
            </>
          )}
        </Section>
      </Container>
    </Body>
  </Html>
)

export default OrderConfirmationEmail 