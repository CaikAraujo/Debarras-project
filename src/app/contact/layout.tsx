import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Devis Gratuit - Suisse Débarras | Intervention 24h",
  description: "Contactez Suisse Débarras pour votre devis gratuit de débarras en Suisse. Intervention rapide 24h, 7 cantons couverts. Avenue des Communes-Réunies 43, Grand-Lancy. Tel: +41 22 939 15 49",
  keywords: "contact débarras Suisse, devis gratuit débarras, intervention 24h, Grand-Lancy, Genève, Avenue des Communes-Réunies, téléphone débarras, urgence débarras",
  openGraph: {
    title: "Contact & Devis Gratuit - Suisse Débarras | Intervention 24h",
    description: "Contactez Suisse Débarras pour votre devis gratuit de débarras en Suisse. Intervention rapide 24h, 7 cantons couverts. Tel: +41 22 939 15 49",
    url: "https://suisse-debarras.ch/contact",
    type: "website",
    images: [
      {
        url: "/images/logo debarras.png",
        width: 1200,
        height: 630,
        alt: "Contact Suisse Débarras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Devis Gratuit - Suisse Débarras",
    description: "Contactez Suisse Débarras pour votre devis gratuit de débarras en Suisse. Intervention rapide 24h, 7 cantons couverts.",
    images: ["/images/logo debarras.png"],
  },
  alternates: {
    canonical: "https://suisse-debarras.ch/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 