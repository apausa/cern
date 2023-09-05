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
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <Providers>
          <div className="flex justify-center">
            <div className="basis-2/3 h-screen">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
