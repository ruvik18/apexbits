import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BitsSketchHero from '@/components/BitsSketchHero';

export const metadata: Metadata = {
  title: 'ApexBITS — BITSAT Tools for BITS Pilani, Goa & Hyderabad',
  description:
    'Free BITSAT 2026 college predictor and score data analysis. Predict which BITS programmes you can get based on cutoffs from Phodu Club, MathonGo, and Canvas Classes.',
};

const STATS = [
  { value: '3', label: 'Campuses' },
  { value: '50+', label: 'Programmes' },
  { value: '1500+', label: 'Score datapoints' },
  { value: '3', label: 'Prediction models' },
];

const FEATURES = [
  {
    title: 'College Predictor',
    description:
      'See which BITS programmes match your BITSAT score using prediction models from Phodu Club, MathonGo, and Canvas Classes. Filter by campus and branch.',
    href: '/predictor',
    bg: '#d5fad3',
    tag: 'BITSAT · 2026',
  },
  {
    title: 'Score Data Analysis',
    description:
      'Explore 1500+ BITSAT score datapoints from Phodu Club and ApexBITS. See distribution charts, mean, median, and estimate your percentile.',
    href: '/score-data',
    bg: '#badbee',
    tag: 'Score data · 1500+ entries',
  },
];

const TICKER_ITEMS = [
  'BITS Pilani', 'BITS Goa', 'BITS Hyderabad', 'BITSAT 2026',
  'College Predictor', 'Score Analysis', 'Phodu Club', 'MathonGo',
  'Canvas Classes', 'Free Tools', 'BITS Pilani', 'BITS Goa',
  'BITS Hyderabad', 'BITSAT 2026', 'College Predictor', 'Score Analysis',
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: '#d5fad3',
          borderBottom: '1px solid rgba(15,14,11,0.1)',
          paddingTop: '100px',
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,14,11,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(15,14,11,0.04) 1px,transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center text-center pb-6">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-6 animate-fade-up animate-fade-up-delay-1"
              style={{
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '11px',
                fontWeight: 500,
                color: '#3d3b34',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              <span
                className="inline-block w-[7px] h-[7px] rounded-full bg-[#0f0e0b]"
              />
              BITSAT · BITS 2026 · 3 Campuses
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up animate-fade-up-delay-2"
              style={{
                fontFamily: 'Season Serif, Georgia, serif',
                fontSize: 'clamp(52px, 8.5vw, 116px)',
                fontWeight: 400,
                lineHeight: 0.93,
                letterSpacing: '-0.035em',
                color: '#0f0e0b',
                maxWidth: '960px',
                marginBottom: '28px',
              }}
            >
              Your BITS
              <br />
              Predictor
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-up animate-fade-up-delay-3"
              style={{
                fontFamily: 'Season Serif, Georgia, serif',
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 400,
                color: '#3d3b34',
                lineHeight: 1.55,
                maxWidth: '540px',
                marginBottom: '36px',
              }}
            >
              Free BITSAT 2026 tools — college predictor and score analysis — built for serious aspirants.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 justify-center animate-fade-up animate-fade-up-delay-4">
              <Link
                href="/predictor"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[#f9f9f0] bg-[#0f0e0b] border border-[#0f0e0b] hover:bg-[#3d3b34] hover:border-[#3d3b34] transition-all"
                style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}
              >
                College Predictor →
              </Link>
              <Link
                href="/score-data"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[#0f0e0b] bg-transparent border border-[#0f0e0b] hover:bg-[rgba(15,14,11,0.06)] transition-all"
                style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}
              >
                Score Data
              </Link>
            </div>
          </div>

          {/* Animated BITS sketch */}
          <BitsSketchHero />
        </div>
      </section>

      {/* Ticker */}
      <div
        className="w-full overflow-hidden py-3"
        style={{ background: '#0f0e0b', borderBottom: '1px solid #3d3b34' }}
      >
        <div className="animate-ticker flex gap-0 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6"
              style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 500, color: '#9d937c', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              {item}
              <span className="text-[#3d3b34]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <section
        className="w-full"
        style={{ background: '#f9f9f0', borderBottom: '1px solid rgba(15,14,11,0.1)' }}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col justify-center py-10 px-6"
                style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(15,14,11,0.1)' : 'none' }}
              >
                <span
                  style={{
                    fontFamily: 'Season Serif, Georgia, serif',
                    fontSize: 'clamp(42px, 5vw, 72px)',
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: '#0f0e0b',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: 'Akkurat Mono, monospace',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: '#9d937c',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: '6px',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is ApexBITS */}
      <section
        className="w-full py-20 md:py-28"
        style={{ background: '#efecca' }}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <p
              style={{
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '10px',
                fontWeight: 500,
                color: '#9d937c',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '24px',
              }}
            >
              About
            </p>
            <h2
              style={{
                fontFamily: 'Season Serif, Georgia, serif',
                fontSize: 'clamp(32px, 5vw, 72px)',
                fontWeight: 400,
                lineHeight: 0.97,
                letterSpacing: '-0.03em',
                color: '#0f0e0b',
                marginBottom: '24px',
              }}
            >
              The smartest way to plan your BITS admission.
            </h2>
          </div>
          <div
            className="w-full"
            style={{ borderTop: '1px solid rgba(15,14,11,0.15)', marginTop: '32px', paddingTop: '32px' }}
          />
          <div className="flex flex-col md:flex-row gap-12 justify-end">
            <div style={{ maxWidth: '480px' }}>
              <p
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#3d3b34',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}
              >
                Cutoff predictions aren&#39;t guarantees — but having the right data matters. ApexBITS brings together the best prediction models from Phodu Club, MathonGo, and Canvas Classes in one place.
              </p>
              <p
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  color: '#3d3b34',
                  lineHeight: 1.6,
                }}
              >
                Built for BITSAT 2026 aspirants who want clarity — not confusion — when choosing their programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section
        className="w-full py-20 md:py-28"
        style={{ background: '#d5fad3' }}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p
              style={{
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '10px',
                fontWeight: 500,
                color: '#3d3b34',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '16px',
              }}
            >
              What runs on ApexBITS?
            </p>
            <h2
              style={{
                fontFamily: 'Season Serif, Georgia, serif',
                fontSize: 'clamp(36px, 5.5vw, 80px)',
                fontWeight: 400,
                lineHeight: 0.97,
                letterSpacing: '-0.02em',
                color: '#0f0e0b',
              }}
            >
              Just about everything.
            </h2>
            <div className="mt-6">
              <Link
                href="/predictor"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-[#0f0e0b] border border-[#0f0e0b] hover:bg-[rgba(15,14,11,0.06)] transition-all"
                style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}
              >
                → All Tools
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-none"
                style={{
                  background: '#21201c',
                  border: '1px solid #3d3b34',
                  padding: 'clamp(28px, 4vw, 48px)',
                  minHeight: '400px',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease',
                }}
              >
                {/* Tag */}
                <div>
                  <span
                    className="inline-block mb-4"
                    style={{
                      fontFamily: 'Akkurat Mono, monospace',
                      fontSize: '10px',
                      fontWeight: 500,
                      color: '#9d937c',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {f.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Season Serif, Georgia, serif',
                      fontSize: 'clamp(26px, 3.5vw, 44px)',
                      fontWeight: 400,
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: '#f9f9f0',
                      marginBottom: '16px',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Season Serif, Georgia, serif',
                      fontSize: '15px',
                      fontWeight: 400,
                      color: '#9d937c',
                      lineHeight: 1.6,
                      maxWidth: '360px',
                    }}
                  >
                    {f.description}
                  </p>
                </div>

                {/* Card decorative illustration */}
                <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={f.bg} strokeWidth="1.2">
                    {f.href === '/predictor' ? (
                      <>
                        <circle cx="60" cy="60" r="50" />
                        {Array.from({ length: 8 }).map((_, i) => {
                          const a = (i * Math.PI * 2) / 8;
                          return <line key={i} x1="60" y1="60" x2={60 + Math.cos(a) * 50} y2={60 + Math.sin(a) * 50} />;
                        })}
                        <circle cx="60" cy="60" r="28" />
                        <circle cx="60" cy="60" r="8" />
                      </>
                    ) : (
                      <>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <rect key={i} x={i * 22 + 5} y={120 - (i * 18 + 20)} width="16" height={i * 18 + 20} />
                        ))}
                        <line x1="5" y1="100" x2="115" y2="100" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Discover link */}
                <div className="mt-8 flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#3d3b34] text-[#f9f9f0] group-hover:bg-[#f9f9f0] group-hover:text-[#0f0e0b] transition-all"
                    style={{ fontSize: '14px' }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      fontFamily: 'Akkurat Mono, monospace',
                      fontSize: '10px',
                      fontWeight: 500,
                      color: '#9d937c',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Discover
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Performance stat section - Aptos-inspired */}
      <section
        className="w-full py-20 md:py-28 relative overflow-hidden"
        style={{ background: '#f9f9f0', borderTop: '1px solid rgba(15,14,11,0.1)' }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,14,11,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(15,14,11,0.025) 1px,transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Code lines (right side decoration) */}
        <div
          className="absolute right-6 top-0 bottom-0 overflow-hidden pointer-events-none hidden xl:block"
          style={{ width: '200px', opacity: 0.07 }}
        >
          <div
            className="code-scroll flex flex-col gap-0 pt-8"
            style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '8px', color: '#0f0e0b', lineHeight: 1.6 }}
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const lines = [
                '/// YOU BUILD', '/// NO DOWNTIME', 'public fun deploy()', '{', '  return true', '}',
                '/// GET HELP', '/// GRANTS, TOOLS', 'public fun access()', '{', '  return true', '}',
                'module aptos::predict {', '  fun cutoff(s: u64)', '  : Result {', '  return s', '  }', '}',
              ];
              return <div key={i}>{lines[i % lines.length]}</div>;
            })}
            {Array.from({ length: 40 }).map((_, i) => {
              const lines = [
                '/// YOU BUILD', '/// NO DOWNTIME', 'public fun deploy()', '{', '  return true', '}',
                '/// GET HELP', '/// GRANTS, TOOLS', 'public fun access()', '{', '  return true', '}',
              ];
              return <div key={`b-${i}`}>{lines[i % lines.length]}</div>;
            })}
          </div>
        </div>

        <div className="relative max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-[40%]">
              <div
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: 'clamp(64px, 9vw, 120px)',
                  fontWeight: 400,
                  lineHeight: 0.92,
                  letterSpacing: '-0.04em',
                  color: '#0f0e0b',
                }}
              >
                ~50ms
              </div>
              <div
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: 'clamp(24px, 3.5vw, 48px)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#0f0e0b',
                  marginTop: '8px',
                }}
              >
                prediction time
              </div>
              <p
                style={{
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#9d937c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginTop: '16px',
                }}
              >
                Instant results. No signup.
              </p>
              <p
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: '16px',
                  color: '#3d3b34',
                  lineHeight: 1.65,
                  maxWidth: '320px',
                  marginTop: '24px',
                }}
              >
                While other tools gatekeep behind logins, ApexBITS gives you instant, transparent predictions — right in your browser.
              </p>
            </div>

            {/* Geodesic sphere decoration */}
            <div className="flex-1 flex items-center justify-center">
              <svg viewBox="0 0 300 300" width="300" height="300" fill="none" stroke="#0f0e0b" strokeWidth="0.8" opacity="0.45" style={{ maxWidth: '100%' }}>
                <circle cx="150" cy="150" r="120" />
                {/* Pentagon grid lines */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i * Math.PI * 2) / 12;
                  const a2 = ((i + 1) * Math.PI * 2) / 12;
                  return (
                    <g key={i}>
                      <line x1={150 + Math.cos(a) * 120} y1={150 + Math.sin(a) * 120} x2={150 + Math.cos(a2) * 120} y2={150 + Math.sin(a2) * 120} />
                      <line x1={150 + Math.cos(a) * 70} y1={150 + Math.sin(a) * 70} x2={150 + Math.cos(a) * 120} y2={150 + Math.sin(a) * 120} />
                      <line x1={150 + Math.cos(a) * 70} y1={150 + Math.sin(a) * 70} x2={150 + Math.cos(a2) * 70} y2={150 + Math.sin(a2) * 70} />
                    </g>
                  );
                })}
                <circle cx="150" cy="150" r="70" />
                <circle cx="150" cy="150" r="35" />
                {/* Center logo waves */}
                <path d="M135,150 Q142,140 150,150 Q158,160 165,150" strokeWidth="2" />
                <path d="M130,155 Q142,140 150,155 Q158,170 170,155" strokeWidth="1.5" />
                {/* Decorative squares at corners */}
                {[
                  { x: 30, y: 30 }, { x: 260, y: 30 }, { x: 30, y: 260 }, { x: 260, y: 260 },
                  { x: 145, y: 20 }, { x: 145, y: 270 }, { x: 20, y: 145 }, { x: 270, y: 145 },
                ].map((pt, i) => (
                  <rect key={i} x={pt.x - 4} y={pt.y - 4} width="8" height="8" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="w-full py-20 md:py-28"
        style={{ background: '#0f0e0b' }}
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 text-center">
          <p
            style={{
              fontFamily: 'Akkurat Mono, monospace',
              fontSize: '10px',
              fontWeight: 500,
              color: '#3d3b34',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: '24px',
            }}
          >
            Get started
          </p>
          <h2
            style={{
              fontFamily: 'Season Serif, Georgia, serif',
              fontSize: 'clamp(36px, 6vw, 88px)',
              fontWeight: 400,
              lineHeight: 0.97,
              letterSpacing: '-0.025em',
              color: '#f9f9f0',
              maxWidth: '760px',
              margin: '0 auto 32px',
            }}
          >
            Enter your score. See your options.
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/predictor"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-[#0f0e0b] bg-[#f9f9f0] border border-[#f9f9f0] hover:bg-[#efecca] transition-all"
              style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}
            >
              College Predictor →
            </Link>
            <Link
              href="/score-data"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-[#f9f9f0] bg-transparent border border-[#3d3b34] hover:border-[#9d937c] transition-all"
              style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}
            >
              Score Data
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
