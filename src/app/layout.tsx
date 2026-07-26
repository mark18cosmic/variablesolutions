import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StartProjectModal } from "@/components/start-project";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KMSolutions — Any problem. One solution.",
  description:
    "A full-service software company in the Maldives building HR management systems, POS systems, marketing services, websites, apps, and any custom digital work your business needs.",
  keywords: [
    "software company Maldives",
    "HR management system",
    "POS system",
    "custom software",
    "mobile apps",
    "web development Maldives",
    "KMSolutions",
  ],
  openGraph: {
    title: "KMSolutions — Any problem. One solution.",
    description:
      "Full-service software company in the Maldives. HRM, POS, marketing, websites, apps and custom software — under one roof.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <StartProjectModal />
      </body>
    </html>
  );
}
