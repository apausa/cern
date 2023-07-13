import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Monte Carlo GUI',
  description: 'Monte Carlo GUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head><Header /></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
