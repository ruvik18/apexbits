import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BitsSketchHero from '@/components/BitsSketchHero';

export const metadata: Metadata = {
  title: 'ApexBITS — BITSAT College Predictor & Score Data 2026',
  description:
    'Free BITSAT 2026 tools — college predictor for BITS Pilani, Goa and Hyderabad, plus score data analysis with 1500+ datapoints. No login. No paywalls.',
};

const TICKER_ITEMS = [
  'BITS Pilani', '·', 'BITS Goa', '·', 'BITS Hyderabad', '·',
  'BITSAT 2026', '·', 'College Predictor', '·', 'Score Analysis', '·',
  'Phodu Club', '·', 'MathonGo', '·', 'Canvas Classes', '·',
  'Free Tools', '·', '0 Ads. Ever.', '·',
];

const STATS = [
  { value: '3',     label: 'Campuses' },
  { value: '50+',   label: 'Programmes' },
  { value: '1500+', label: 'Score datapoints' },
  { value: '0',     label: 'Ads. Ever.' },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f0' }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          background: '#d5fad3',
          borderBottom: '1px solid rgba(15,14,11,0.1)',
          paddingTop: '80px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Dot grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(15,14,11,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '0 clamp(20px,4vw,60px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '40px',
            minHeight: 'clamp(480px, 60vh, 680px)',
          }}
          className="hero-grid"
        >
          {/* ── LEFT COLUMN ── */}
          <div style={{ paddingBottom: 'clamp(40px,5vw,72px)', paddingTop: 'clamp(20px,3vw,40px)' }}>
            {/* Eyebrow pill */}
            <div
              className="fade-up fade-up-1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px 5px 8px',
                background: 'rgba(15,14,11,0.08)',
                borderRadius: '9999px',
                border: '1px solid rgba(15,14,11,0.14)',
                marginBottom: '28px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#0f0e0b',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#3d3b34',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                BITSAT 2026 · Free tools · 3 Campuses
              </span>
            </div>

            {/* Headline — Dopis Black */}
            <h1
              className="fade-up fade-up-2"
              style={{
                fontFamily: 'Dopis, system-ui, sans-serif',
                fontSize: 'clamp(52px, 7.5vw, 108px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: '#0f0e0b',
                margin: '0 0 24px',
              }}
            >
              The Free
              <br />
              BITS
              <br />
              <em
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                }}
              >
                Ecosystem.
              </em>
            </h1>

            {/* Subtitle — Season Serif */}
            <p
              className="fade-up fade-up-3"
              style={{
                fontFamily: 'Season Serif, Georgia, serif',
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 400,
                color: '#3d3b34',
                lineHeight: 1.6,
                maxWidth: '420px',
                margin: '0 0 36px',
              }}
            >
              Predict your BITS campus and programme, analyse score distributions — instantly. No login. No paywalls. Just honest data for aspirants.
            </p>

            {/* CTA buttons — rectangular pill, NOT circles */}
            <div
              className="fade-up fade-up-4"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}
            >
              <Link
                href="/predictor"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '50px',
                  padding: '0 28px',
                  borderRadius: '9999px',
                  background: '#0f0e0b',
                  color: '#f9f9f0',
                  border: '1.5px solid #0f0e0b',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.18s',
                }}
              >
                Predict BITS →
              </Link>
              <Link
                href="/score-data"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '50px',
                  padding: '0 28px',
                  borderRadius: '9999px',
                  background: 'transparent',
                  color: '#0f0e0b',
                  border: '1.5px solid rgba(15,14,11,0.4)',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.18s, background 0.18s',
                }}
              >
                Score Data
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN — BITS SKETCH ── */}
          <div
            className="fade-up fade-up-3"
            style={{
              height: 'clamp(320px, 45vh, 520px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BitsSketchHero />
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            borderTop: '1px solid rgba(15,14,11,0.1)',
            background: 'rgba(213,250,211,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              padding: '0 clamp(20px,4vw,60px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
            }}
            className="stats-grid"
          >
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 'clamp(20px,3vw,28px) 0',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(15,14,11,0.1)' : 'none',
                  paddingLeft: i > 0 ? 'clamp(16px,2.5vw,32px)' : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Dopis, system-ui, sans-serif',
                    fontSize: 'clamp(32px, 4.5vw, 58px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: '#0f0e0b',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: 'Akkurat Mono, monospace',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#9d937c',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: '5px',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK TICKER ── */}
      <div
        style={{
          background: '#0f0e0b',
          borderBottom: '1px solid #3d3b34',
          overflow: 'hidden',
          padding: '11px 0',
        }}
      >
        <div className="animate-ticker" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '10px',
                fontWeight: 500,
                color: '#9d937c',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '0 16px',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <section
        style={{
          background: '#efecca',
          borderBottom: '1px solid rgba(15,14,11,0.08)',
          padding: 'clamp(60px,8vw,120px) clamp(20px,4vw,60px)',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(32px,5vw,80px)',
              alignItems: 'start',
            }}
            className="two-col"
          >
            <div>
              <p
                style={{
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#9d937c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: '20px',
                }}
              >
                What is ApexBITS?
              </p>
              <h2
                style={{
                  fontFamily: 'Dopis, system-ui, sans-serif',
                  fontSize: 'clamp(36px,5vw,72px)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  color: '#0f0e0b',
                  margin: 0,
                }}
              >
                Honest data.
                <br />
                <span style={{ fontFamily: 'Season Serif, Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
                  Zero paywalls.
                </span>
              </h2>
            </div>
            <div style={{ paddingTop: '8px' }}>
              <p
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: 'clamp(16px,1.6vw,19px)',
                  fontWeight: 400,
                  color: '#3d3b34',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                }}
              >
                Cutoff predictions aren&apos;t guarantees — but having the right data matters. ApexBITS brings together the best prediction models from Phodu Club, MathonGo, and Canvas Classes in one place.
              </p>
              <p
                style={{
                  fontFamily: 'Season Serif, Georgia, serif',
                  fontSize: 'clamp(16px,1.6vw,19px)',
                  fontWeight: 400,
                  color: '#3d3b34',
                  lineHeight: 1.65,
                }}
              >
                Built for BITSAT 2026 aspirants who want clarity — not confusion — when choosing their programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        style={{
          background: '#f9f9f0',
          borderBottom: '1px solid rgba(15,14,11,0.08)',
          padding: 'clamp(60px,8vw,120px) clamp(20px,4vw,60px)',
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: 'clamp(32px,4vw,56px)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Dopis, system-ui, sans-serif',
                fontSize: 'clamp(36px,5.5vw,80px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#0f0e0b',
                margin: 0,
              }}
            >
              What we offer.
            </h2>
            <Link
              href="/predictor"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '40px',
                padding: '0 18px',
                borderRadius: '9999px',
                border: '1.5px solid rgba(15,14,11,0.25)',
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '10px',
                fontWeight: 600,
                color: '#3d3b34',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              All tools →
            </Link>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
            className="two-col"
          >
            {/* Card 1 — College Predictor */}
            <Link
              href="/predictor"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#21201c',
                border: '1px solid #3d3b34',
                padding: 'clamp(28px,4vw,52px)',
                minHeight: 'clamp(320px,38vw,440px)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(213,250,211,0.15)',
                    border: '1px solid rgba(213,250,211,0.25)',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d5fad3' }} />
                  <span style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 600, color: '#d5fad3', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    BITSAT · 2026
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Dopis, system-ui, sans-serif',
                    fontSize: 'clamp(28px,3.5vw,48px)',
                    fontWeight: 900,
                    lineHeight: 0.96,
                    letterSpacing: '-0.025em',
                    color: '#f9f9f0',
                    margin: '0 0 16px',
                  }}
                >
                  College
                  <br />
                  Predictor
                </h3>
                <p
                  style={{
                    fontFamily: 'Season Serif, Georgia, serif',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#9d937c',
                    lineHeight: 1.65,
                    maxWidth: '340px',
                  }}
                >
                  See which BITS programmes match your score using Phodu Club, MathonGo, and Canvas Classes prediction models. Filter by campus and branch.
                </p>
              </div>
              {/* Decorative illustration */}
              <div style={{ position: 'absolute', right: 'clamp(20px,3vw,40px)', bottom: 'clamp(20px,3vw,40px)', opacity: 0.08 }}>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#d5fad3" strokeWidth="1">
                  <circle cx="50" cy="50" r="44" />
                  {[0,1,2,3,4,5,6,7].map(i => {
                    const a = (i * Math.PI * 2) / 8;
                    return <line key={i} x1="50" y1="50" x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44} />;
                  })}
                  <circle cx="50" cy="50" r="22" />
                  <circle cx="50" cy="50" r="8" />
                </svg>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '32px',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#9d937c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #3d3b34',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f9f9f0',
                    fontSize: '16px',
                  }}
                >
                  →
                </span>
                Explore
              </div>
            </Link>

            {/* Card 2 — Score Data */}
            <Link
              href="/score-data"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#badbee',
                border: '1px solid rgba(15,14,11,0.12)',
                padding: 'clamp(28px,4vw,52px)',
                minHeight: 'clamp(320px,38vw,440px)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(15,14,11,0.08)',
                    border: '1px solid rgba(15,14,11,0.14)',
                    marginBottom: '20px',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f0e0b' }} />
                  <span style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 600, color: '#0f0e0b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Score data · 1500+ entries
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Dopis, system-ui, sans-serif',
                    fontSize: 'clamp(28px,3.5vw,48px)',
                    fontWeight: 900,
                    lineHeight: 0.96,
                    letterSpacing: '-0.025em',
                    color: '#0f0e0b',
                    margin: '0 0 16px',
                  }}
                >
                  Score
                  <br />
                  Analysis
                </h3>
                <p
                  style={{
                    fontFamily: 'Season Serif, Georgia, serif',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#3d3b34',
                    lineHeight: 1.65,
                    maxWidth: '340px',
                  }}
                >
                  Explore 1500+ BITSAT score datapoints from Phodu Club and ApexBITS. Distribution charts, mean, median, and percentile comparison.
                </p>
              </div>
              {/* Bar chart decoration */}
              <div style={{ position: 'absolute', right: 'clamp(20px,3vw,40px)', bottom: 'clamp(20px,3vw,40px)', opacity: 0.12 }}>
                <svg width="100" height="80" viewBox="0 0 100 80" fill="none" stroke="#0f0e0b" strokeWidth="1.2">
                  {[12,28,44,60,76].map((x, i) => {
                    const h = [20,40,60,35,50][i];
                    return <rect key={i} x={x} y={70 - h} width="14" height={h} />;
                  })}
                  <line x1="5" y1="70" x2="95" y2="70" />
                </svg>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '32px',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#3d3b34',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                <span
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(15,14,11,0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f0e0b',
                    fontSize: '16px',
                  }}
                >
                  →
                </span>
                Explore
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section
        style={{
          background: '#0f0e0b',
          padding: 'clamp(60px,8vw,120px) clamp(20px,4vw,60px)',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '40px',
          }}
          className="cta-grid"
        >
          <div>
            <p
              style={{
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '10px',
                fontWeight: 600,
                color: '#3d3b34',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                marginBottom: '20px',
              }}
            >
              Get started — free
            </p>
            <h2
              style={{
                fontFamily: 'Dopis, system-ui, sans-serif',
                fontSize: 'clamp(36px,6vw,88px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#f9f9f0',
                margin: 0,
              }}
            >
              Enter your score.
              <br />
              <span style={{ fontFamily: 'Season Serif, Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}>
                See your options.
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
            <Link
              href="/predictor"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '52px',
                padding: '0 32px',
                borderRadius: '9999px',
                background: '#f9f9f0',
                color: '#0f0e0b',
                border: '1.5px solid #f9f9f0',
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              College Predictor →
            </Link>
            <Link
              href="/score-data"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '52px',
                padding: '0 32px',
                borderRadius: '9999px',
                background: 'transparent',
                color: '#9d937c',
                border: '1.5px solid #3d3b34',
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
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
