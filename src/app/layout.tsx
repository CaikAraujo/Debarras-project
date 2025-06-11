import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Débarras Pro - Services de Débarras et Nettoyage",
  description: "Spécialistes en débarras, nettoyage résidentiel et commercial, élimination de gravats et organisation d'espaces. Service rapide et professionnel.",
  keywords: "débarras, nettoyage, élimination gravats, organisation, nettoyage résidentiel, nettoyage commercial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
