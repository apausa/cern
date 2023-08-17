import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="font-sans">
        {isAuthenticated ? dashboard : authentication}
      </body>
    </html>
  );
}
