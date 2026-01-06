import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const pangaia = localFont({
  src: [
    {
      path: "../public/assets/fonts/PPPangaia-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/PPPangaia-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pangaia",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFFDF5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sort.lat"),
  title: "sort.lat | The Auto-Pilot Link-in-Bio",
  description: "The first self-optimizing profile. Zero config. Instant speed. Join the waitlist for Batch 01.",
  keywords: ["link in bio", "creator tools", "auto-pilot", "tech", "waitlist", "sort.lat"],
  authors: [{ name: "sort.lat" }],
  openGraph: {
    title: "sort.lat | The Auto-Pilot Link-in-Bio",
    description: "Your profile is stuck in the past. Meet the link-in-bio that rearranges itself.",
    url: "https://sort.lat",
    siteName: "sort.lat",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "sort.lat",
    description: "The link-in-bio that thinks for you.",
    creator: "@sortlat",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${spaceGrotesk.variable} ${pangaia.variable} antialiased bg-cream-puff text-deep-violet overflow-x-hidden selection:bg-acid-lime selection:text-deep-violet w-full min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow w-full relative">
          {children}
        </main>
      </body>
    </html>
  );
}