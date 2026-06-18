/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/predictor.html', destination: '/predictor', permanent: true },
      { source: '/score-data.html', destination: '/score-data', permanent: true },
      { source: '/college-predictor', destination: '/predictor', permanent: true },
      { source: '/bits-college-predictor', destination: '/predictor', permanent: true },
      { source: '/bitsat-college-predictor', destination: '/predictor', permanent: true },
      { source: '/bitsat-predictor', destination: '/predictor', permanent: true },
      { source: '/bitsat-predictor-2026', destination: '/predictor', permanent: true },
      { source: '/bits-predictor', destination: '/predictor', permanent: true },
      { source: '/score-analysis', destination: '/score-data', permanent: true },
      { source: '/bitsat-score-data', destination: '/score-data', permanent: true },
      { source: '/bitsat-score-analysis', destination: '/score-data', permanent: true },
      { source: '/phodu-score-data', destination: '/score-data', permanent: true },
      { source: '/apexbits-score-data', destination: '/score-data', permanent: true },
    ];
  },
};

module.exports = nextConfig;
