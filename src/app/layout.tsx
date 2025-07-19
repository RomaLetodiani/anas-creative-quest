import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ana Kopadze's 30-Day AI Art Challenge | Creative Journey",
  description:
    "Explore Ana Kopadze's inspiring 30-day Canva AI challenge showcasing 19 unique creative artworks. A celebration of AI-powered artistic exploration and daily creativity.",
  keywords: [
    "Ana Kopadze",
    "AI art",
    "Canva AI",
    "30-day challenge",
    "creative journey",
    "digital art",
    "artificial intelligence",
  ],
  authors: [{ name: "Ana Kopadze" }],
  openGraph: {
    title: "Ana Kopadze's 30-Day AI Art Challenge",
    description:
      "Discover 19 stunning AI artworks from Ana Kopadze's creative 30-day challenge using Canva AI.",
    type: "website",
    images: [
      {
        url: "/images/img1.jpeg",
        width: 1200,
        height: 630,
        alt: "Ana Kopadze AI Art Challenge Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ana Kopadze's 30-Day AI Art Challenge",
    description: "Discover 19 stunning AI artworks from Ana Kopadze's creative journey.",
    images: ["/images/img1.jpeg"],
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
