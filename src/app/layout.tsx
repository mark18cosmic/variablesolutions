import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const serifDisplay = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sansGeo = Manrope({
  variable: "--font-sans-geo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Variable Solutions — Any problem. One solution.",
  description:
    "A full-service software house in the Maldives building HRM, POS, marketing platforms, websites, mobile apps, and bespoke custom software — under one roof.",
  keywords: [
    "software company Maldives",
    "HR management system",
    "POS system",
    "custom software",
    "mobile apps",
    "web development Maldives",
  ],
  openGraph: {
    title: "Variable Solutions — Any problem. One solution.",
    description:
      "Boutique software house in the Maldives. HRM, POS, marketing, websites, apps and custom software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serifDisplay.variable} ${sansGeo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
