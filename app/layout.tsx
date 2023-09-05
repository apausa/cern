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
}: {
  children: React.ReactNode,
  build: React.ReactNode,
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <Providers>
          <div className="flex justify-center">
            {build}
            <div className="basis-1/2 h-screen">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
