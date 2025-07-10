import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Suisse Débarras - Entreprise Spécialisée en Débarras | 10+ Ans d'Expérience",
  description: "Suisse Débarras : votre entreprise suisse de référence pour le débarras et nettoyage professionnel. 10+ ans d'expérience en Suisse romande. Devis gratuit, intervention 24h, 98% clients satisfaits.",
  keywords: "débarras Suisse, entreprise débarras, nettoyage professionnel, Suisse romande, débarras résidentiel, débarras commercial, déchets spéciaux, fin de chantier, recyclage, Genève, Vaud, Valais, Neuchâtel, Fribourg, Jura, Berne",
  authors: [{ name: "Suisse Débarras" }],
  creator: "Suisse Débarras",
  publisher: "Suisse Débarras",
  robots: "index, follow",
  metadataBase: new URL('https://suisse-debarras.ch'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-CH': '/',
      'de-CH': '/de',
      'it-CH': '/it',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: 'https://suisse-debarras.ch',
    siteName: 'Suisse Débarras',
    title: 'Suisse Débarras - Entreprise Spécialisée en Débarras | 10+ Ans d\'Expérience',
    description: 'Suisse Débarras : votre entreprise suisse de référence pour le débarras et nettoyage professionnel. 10+ ans d\'expérience en Suisse romande. Devis gratuit, intervention 24h.',
    images: [
      {
        url: '/images/logo debarras.png',
        width: 1200,
        height: 630,
        alt: 'Suisse Débarras - Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suisse Débarras - Entreprise Spécialisée en Débarras',
    description: 'Suisse Débarras : votre entreprise suisse de référence pour le débarras et nettoyage professionnel. 10+ ans d\'expérience en Suisse romande.',
    images: ['/images/logo debarras.png'],
    creator: '@suisse_debarras',
    site: '@suisse_debarras',
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
    other: {
      'msvalidate.01': 'bing-site-verification-code',
    },
  },
  icons: {
    icon: '/images/icons/favicon.svg',
    shortcut: '/images/icons/favicon.svg',
    apple: '/images/icons/favicon.svg',
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/images/icons/favicon.svg',
      },
    ],
  },
  manifest: '/manifest.json',
  category: 'business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Suisse Débarras",
    "image": "https://suisse-debarras.ch/images/logo debarras.png",
    "description": "Entreprise suisse spécialisée en débarras et nettoyage professionnel. 10+ ans d'expérience en Suisse romande.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue des Communes-Réunies 43",
      "addressLocality": "Grand-Lancy",
      "postalCode": "1212",
      "addressCountry": "CH",
      "addressRegion": "Genève"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.1785,
      "longitude": 6.1227
    },
    "telephone": "+41 22 939 15 49",
    "url": "https://suisse-debarras.ch",
    "sameAs": [
      "https://www.facebook.com/suisse.debarras",
      "https://www.linkedin.com/company/suisse-debarras"
    ],
    "openingHours": [
      "Mo-Fr 06:00-17:00"
    ],
    "serviceArea": [
      "Genève", "Vaud", "Valais", "Neuchâtel", "Fribourg", "Jura", "Berne"
    ],
    "priceRange": "$$",
    "currenciesAccepted": "CHF",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Débarras",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nettoyage et Désinfection",
            "description": "Service professionnel de nettoyage et désinfection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Débarras pour Entreprises",
            "description": "Solutions de débarras adaptées aux entreprises"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nettoyage de Fin de Chantier",
            "description": "Nettoyage spécialisé après travaux de construction"
          }
        }
      ]
    }
  };

  return (
    <html lang="fr-CH">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#DC0018" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#DC0018" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="apple-mobile-web-app-title" content="Suisse Débarras" />
        <meta name="application-name" content="Suisse Débarras" />
        <meta name="msapplication-tooltip" content="Suisse Débarras" />
        <link rel="canonical" href="https://suisse-debarras.ch" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
