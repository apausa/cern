import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'Monte Carlo UI',
  description: 'Monte Carlo UI',
};

export default function RootLayout({
  dashboard,
  authentication,
}: {
  dashboard: React.ReactNode,
  authentication: React.ReactNode,
}) {
  const isAuthenticated = true;

  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <Providers>
          {isAuthenticated ? dashboard : authentication}
        </Providers>
      </body>
    </html>
  );
}
