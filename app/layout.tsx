import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'Simulations Dashboard',
  description: 'Simulations Dashboard',
};

export default function RootLayout({
  children,
  build,
  scripts,
}: {
  children: React.ReactNode,
  build: React.ReactNode,
  scripts: React.ReactNode,
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <Providers>
          {children}
          {build}
          {scripts}
        </Providers>
      </body>
    </html>
  );
}
