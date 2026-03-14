import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anguria.dev"),
  title: "Anguria | High-Performance Software Development",
  description: "Desarrollo estructural obsesivo y diseño radical. Construimos productos digitales hiper-optimizados que transforman empresas medianas en líderes de mercado.",
  keywords: ["Desarrollo web", "Apps nativas", "ERPs a medida", "Agencia de software", "Vibecoding", "High-Performance"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://anguria.dev",
    siteName: "Anguria Agency",
    title: "Anguria | High-Performance Software",
    description: "Infraestructuras digitales hiper-optimizadas que escalan operaciones y dominan mercados.",
    images: [
      {
        url: "/og-image.jpg", // The real path will be updated when the OG image is designed
        width: 1200,
        height: 630,
        alt: "Anguria - High Performance Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anguria | Código que rompe reglas",
    description: "Construimos herramientas internas, apps premium y customer areas inmersivas. Únete a la élite tecnológica.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-accent-orange/30 selection:text-accent-orange`}
      >
        {children}
      </body>
    </html>
  );
}
