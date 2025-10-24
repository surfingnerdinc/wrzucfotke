import type { Metadata } from "next";
import "./globals.css";
import LiveChatDemo from "./components/LiveChatDemo";


export const metadata: Metadata = {
  title: "Core One Flow - Zaawansowany System CRM dla Nowoczesnych Firm",
  description: "Revolucjonizuj zarządzanie relacjami z klientami dzięki Core One Flow. Automatyzacja procesów, inteligentna analityka, zarządzanie projektami i bazą klientów w jednym miejscu. Rozpocznij 30-dniowy darmowy trial.",
  keywords: "CRM, zarządzanie klientami, automatyzacja, projekty, analityka, baza klientów, przypomnienia, workflow, system CRM, oprogramowanie dla firm",
  authors: [{ name: "Core One Flow Team" }],
  creator: "Core One Flow",
  publisher: "Core One Flow",
  robots: "index, follow",
  openGraph: {
    title: "Core One Flow - Zaawansowany System CRM",
    description: "Automatyzacja, analityka i zarządzanie w jednym miejscu. 30-dni darmowego trialu bez zobowiązań.",
    url: "https://coreoneflow.pl",
    siteName: "Core One Flow",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Core One Flow CRM System",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Core One Flow - Zaawansowany System CRM",
    description: "Automatyzacja, analityka i zarządzanie w jednym miejscu. 30-dni darmowego trialu bez zobowiązań.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className=""
      >
        {children}
        <LiveChatDemo />
      </body>
    </html>
  );
}
