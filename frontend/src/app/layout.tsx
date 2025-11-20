import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'bookmethat - Book Accommodations & Travel eSIMs',
  description: 'Full-stack marketplace for booking accommodations and travel connectivity solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
