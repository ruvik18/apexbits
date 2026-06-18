import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://apexbits.site'),
  title: {
    default: 'ApexBITS — BITSAT College Predictor & Score Data',
    template: '%s | ApexBITS',
  },
  description: 'Free BITSAT 2026 tools — college predictor for BITS Pilani, Goa and Hyderabad, plus score data analysis with 1500+ datapoints.',
  applicationName: 'ApexBITS',
  keywords: ['BITSAT', 'BITS Pilani', 'college predictor', 'BITSAT score analysis', 'BITS cutoff'],
  authors: [{ name: 'ApexBITS' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    siteName: 'ApexBITS',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grid-bg min-h-screen">{children}</body>
    </html>
  );
}
