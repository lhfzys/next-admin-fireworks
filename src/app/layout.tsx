import type { Metadata } from 'next';
import React from 'react';
import { AppWrapper } from './app-wrapper';
import './globals.css';
import RootProvider from './root-provider';

export const metadata: Metadata = {
  title: 'Fireworks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <AppWrapper>{children}</AppWrapper>
        </RootProvider>
      </body>
    </html>
  );
}
