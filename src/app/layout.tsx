import { totalArtworks } from '$/lib/images.data';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Ana Kopadze's AI Art Challenge | Creative Journey",
  description: `Explore Ana Kopadze's inspiring Canva AI challenge showcasing ${totalArtworks} unique creative artworks. A celebration of AI-powered artistic exploration and daily creativity.`,
  keywords: ['Ana Kopadze', 'AI art', 'Canva AI', 'creative journey', 'digital art', 'artificial intelligence'],
  metadataBase: new URL('https://anas-creative-quest.vercel.app'),
  authors: [{ name: 'Ana Kopadze' }],
  openGraph: {
    title: "Ana Kopadze's AI Art Challenge",
    description: `Discover ${totalArtworks} stunning AI artworks from Ana Kopadze's creative journey using Canva AI.`,
    type: 'website',
    images: [
      {
        url: '/images/img1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Ana Kopadze AI Art Challenge Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ana Kopadze's AI Art Challenge",
    description: `Discover ${totalArtworks} stunning AI artworks from Ana Kopadze's creative journey.`,
    images: ['/images/img1.jpeg'],
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground font-sans antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
