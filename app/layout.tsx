import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";

import "./global.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const madeDillan = localFont({
  src: "../assets/fonts/made-dillan.woff",
  variable: "--font-made-dillan",
});

const spaceText = localFont({
  src: "../assets/fonts/space-text-medium.woff",
  variable: "--font-space-text",
});

export const revalidate = 600;

export const metadata: Metadata = {
  openGraph: {
    siteName: "mohammedatallah.dev",
  },
  twitter: {
    site: "@alvarlagerlof",
    creator: "@alvarlagerlof",
    card: "summary_large_image",
  },
  icons: [
    {
      url: "/favicons/favicon.ico",
    },
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      url: "/favicons/favicon-192x192.png",
      sizes: "192x192",
    },
  ],
  themeColor: "#16a34a",
  // alternates: {
  //   types: {
  //     "application/rss+xml": "https://alvar.dev/feed.xml",
  //   },
  // },
  metadataBase: new URL("https://alvar.dev"),
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.className} ${madeDillan.variable} ${spaceText.variable}`}>
      <body>
        {children}
        <Script defer data-domain="alvar.dev" src="/js/script.outbound-links.js"></Script>
      </body>
    </html>
  );
}
