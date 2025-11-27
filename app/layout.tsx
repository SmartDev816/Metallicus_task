import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Loan Stats - TVL & APY Dashboard',
  description: 'View Total Value Locked (TVL) and Annual Percentage Yield (APY) statistics for loans',
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


