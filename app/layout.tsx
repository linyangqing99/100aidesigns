import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "../components/Analytics";
import "./globals.css";

const productionOrigin = "https://100ai.design";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(productionOrigin),
  title: "100 AI Designs - 100 Runnable Design Languages",
  description:
    "One hundred AI-made product design languages, each shipped, decoded, and packaged for reuse.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "100 AI Designs",
    description: "100 design languages. 100 runnable products.",
    url: productionOrigin,
    siteName: "100 AI Designs",
    images: [
      {
        url: "/og.png",
        width: 1744,
        height: 907,
        alt: "100 AI Designs",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
