import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mw-guides.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MW Guides | Digital Travel Experiences",
    template: "%s | MW Guides",
  },
  description: "Digital travel experiences currently in development.",
  keywords: ["MW Guides", "digital travel experiences", "Explore Trips", "Ride Guides"],
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_GB"],
    url: siteUrl,
    siteName: "MW Guides",
    title: "MW Guides | Digital Travel Experiences",
    description: "Digital travel experiences currently in development.",
    images: [
      {
        url: "/images/reiseideen/neue-generation-hero.jpg",
        width: 1600,
        height: 1067,
        alt: "MW Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MW Guides | Digital Travel Experiences",
    description: "Digital travel experiences currently in development.",
    images: ["/images/reiseideen/neue-generation-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
