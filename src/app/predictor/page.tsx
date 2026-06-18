import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PredictorClient from '@/components/predictor/PredictorClient';

export const metadata: Metadata = {
  title: 'BITSAT College Predictor 2026 | BITS Pilani, Goa & Hyderabad',
  description:
    'Free BITSAT 2026 college predictor for BITS Pilani, Goa and Hyderabad using prediction models from Phodu Club, MathonGo and Canvas Classes.',
  openGraph: {
    title: 'BITSAT College Predictor 2026 | ApexBITS',
    description:
      'See which BITS programmes you can get with your BITSAT score using Phodu Club, MathonGo and Canvas Classes predictions.',
    url: 'https://apexbits.site/predictor',
    images: [
      {
        url: 'https://apexbits.site/assets/images/college-predictor-home-20260614.webp',
        width: 1400,
        height: 864,
        alt: 'ApexBITS BITSAT college predictor preview',
      },
    ],
  },
  alternates: {
    canonical: 'https://apexbits.site/predictor',
  },
};

export default function PredictorPage() {
  return (
    <div className="grid-bg min-h-screen">
      <Navbar />
      <div
        style={{
          width: 'min(1180px, calc(100% - 32px))',
          maxWidth: '1180px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <PredictorClient />
      </div>
      <Footer />
    </div>
  );
}
