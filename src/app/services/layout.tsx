import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Professionnels de Débarras en Suisse | Suisse Débarras - 6 Services Spécialisés",
  description: "Services de débarras professionnel en Suisse romande : Nettoyage & Désinfection, Débarras Entreprises, Fin de Chantier, Écopoints, Destruction Matériel, Déchets Spéciaux. Devis gratuit 24h.",
  keywords: "services débarras Suisse, nettoyage professionnel, désinfection, fin de chantier, déchets spéciaux, destruction matériel, écopoints intérieur, débarras entreprises, Genève, Vaud, Valais",
  openGraph: {
    title: "Services Professionnels de Débarras en Suisse | Suisse Débarras",
    description: "6 services spécialisés de débarras en Suisse romande. Nettoyage, désinfection, fin de chantier, déchets spéciaux. 10+ ans d'expérience, devis gratuit 24h.",
    url: "https://suisse-debarras.ch/services",
    type: "website",
    images: [
      {
        url: "/images/logo debarras.png",
        width: 1200,
        height: 630,
        alt: "Services Suisse Débarras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Professionnels de Débarras en Suisse | Suisse Débarras",
    description: "6 services spécialisés de débarras en Suisse romande. Nettoyage, désinfection, fin de chantier, déchets spéciaux. 10+ ans d'expérience.",
    images: ["/images/logo debarras.png"],
  },
  alternates: {
    canonical: "https://suisse-debarras.ch/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 