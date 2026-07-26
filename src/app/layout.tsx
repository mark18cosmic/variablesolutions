import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StartProjectModal } from "@/components/start-project";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
    "Roster HRM",
  ],
  openGraph: {
    title: "KMSolutions — Any problem. One solution.",
    description:
      "Full-service software company in the Maldives. HRM, POS, marketing, websites, apps and custom software — under one roof.",
    type: "website",
  },
};

/** Applies the saved theme before first paint so there's no flash. */
const themeScript = `!function(){try{var t=localStorage.getItem("kms-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}}()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <StartProjectModal />
      </body>
    </html>
  );
}
