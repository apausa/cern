import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
  applicationName: 'Monte Carlo Simulations Dashboard',
  themeColor: 'dark',
};

export default function RootLayout({
  children,
  build,
  simulation,
}: {
  children: ReactNode,
  build: ReactNode,
  simulation: ReactNode,
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <Providers>
          <div className="flex justify-center">
            {build}
            {simulation}
            <div className="w-full xl:w-1/2 h-screen flex flex-col justify-between">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
