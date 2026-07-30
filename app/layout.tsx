import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mw-guides.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MW Guides — Reisen entlang der bemerkenswertesten Bahnstrecken Europas",
    template: "%s | MW Guides",
  },
  description:
    "MW Guides kuratiert außergewöhnliche Reiseerlebnisse entlang Europas bemerkenswertesten öffentlichen Verkehrswegen — Schwebebahn, Straßenbahn, Küstentram. Selbstgeführt, offline nutzbar.",
  keywords: [
    "Reiseerlebnis",
    "Schwebebahn",
    "Küstentram",
    "Straßenbahn Tour",
    "selbstgeführte Tour",
    "GPS Tour",
    "Städtereise",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "MW Guides",
    title: "MW Guides — Reisen entlang der bemerkenswertesten Bahnstrecken Europas",
    description:
      "Kuratierte Premium-Reiseerlebnisse entlang außergewöhnlicher öffentlicher Verkehrswege — selbstgeführt, persönlich erfahren, offline nutzbar.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MW Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MW Guides — Reisen entlang der bemerkenswertesten Bahnstrecken Europas",
    description:
      "Kuratierte Premium-Reiseerlebnisse entlang außergewöhnlicher öffentlicher Verkehrswege.",
    images: ["/images/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
