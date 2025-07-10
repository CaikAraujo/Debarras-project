import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avis Clients & Témoignages - Suisse Débarras | 98% Satisfaction",
  description: "Consultez les témoignages clients de Suisse Débarras : 500+ projets réalisés, 98% clients satisfaits, note 4.9/5. Partagez votre expérience débarras en Suisse. Localisation Avenue des Communes-Réunies 43.",
  keywords: "avis clients débarras, témoignages débarras Suisse, satisfaction client, google reviews, feedback débarras, note clients, Avenue des Communes-Réunies, Grand-Lancy, expérience client",
  openGraph: {
    title: "Avis Clients & Témoignages - Suisse Débarras | 98% Satisfaction",
    description: "500+ projets réalisés, 98% clients satisfaits, note 4.9/5. Consultez les témoignages clients et notre localisation Avenue des Communes-Réunies 43, Grand-Lancy.",
    url: "https://suisse-debarras.ch/feedback",
    type: "website",
    images: [
      {
        url: "/images/logo debarras.png",
        width: 1200,
        height: 630,
        alt: "Témoignages Suisse Débarras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avis Clients & Témoignages - Suisse Débarras",
    description: "500+ projets réalisés, 98% clients satisfaits, note 4.9/5. Consultez les témoignages clients de débarras en Suisse.",
    images: ["/images/logo debarras.png"],
  },
  alternates: {
    canonical: "https://suisse-debarras.ch/feedback",
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 