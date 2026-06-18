import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScoreDataClient from '@/components/score-data/ScoreDataClient';

export const metadata: Metadata = {
  title: 'BITSAT Score Data Analysis | Phodu Club & ApexBITS',
  description:
    'Analyze over 1,500 BITSAT score datapoints from Phodu Club and ApexBITS with score distributions, mean, median, entries above 300, entries above 270, and a score comparison percentile checker.',
  openGraph: {
    title: 'BITSAT Score Data Analysis | Phodu Club & ApexBITS | ApexBITS',
    description:
      'Analyze over 1,500 BITSAT score datapoints from Phodu Club and ApexBITS with score distributions, mean, median, and a percentile checker.',
    url: 'https://apexbits.site/score-data',
    images: [
      {
        url: 'https://apexbits.site/assets/images/score-data-feature-20260614-v2.webp',
        width: 1400,
        height: 1083,
        alt: 'ApexBITS BITSAT score data distribution preview',
      },
    ],
  },
  alternates: {
    canonical: 'https://apexbits.site/score-data',
  },
};

export default function ScoreDataPage() {
  return (
    <div className="grid-bg min-h-screen">
      <Navbar />
      <div
        style={{
          width: 'min(1400px, calc(100% - 32px))',
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '86px',
        }}
      >
        <ScoreDataClient />
      </div>
      <Footer />
    </div>
  );
}
