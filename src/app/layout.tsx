import HeaderTop from '@/components/HeaderTop';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeaderMain from '@/components/HeaderMain';

import MobNavbar from '@/components/MobNavbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Store',
  description: 'Next.js Bookstore app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className={inter.className}>
        <HeaderTop />
        <HeaderMain />
        <MobNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
