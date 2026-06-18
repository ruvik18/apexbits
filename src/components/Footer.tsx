import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ background: '#21201c', borderTop: '1px solid #3d3b34' }}>
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: 'clamp(48px,6vw,80px) clamp(20px,4vw,60px) clamp(24px,3vw,40px)',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gap: 'clamp(28px,4vw,60px)',
            paddingBottom: '40px',
            borderBottom: '1px solid #3d3b34',
            marginBottom: '28px',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'Dopis, system-ui, sans-serif', fontSize: '15px', fontWeight: 700, color: '#f9f9f0' }}>Alphajee</span>
              <span style={{ width: '20px', height: '20px', background: '#d5fad3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 700, color: '#0f0e0b' }}>×</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Dopis, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#f9f9f0',
                }}
              >
                <span
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    background: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px',
                  }}
                >
                  <Image src="/assets/images/logo-square.png" alt="ApexBITS" width={18} height={18} style={{ objectFit: 'contain' }} />
                </span>
                ApexBITS
              </span>
            </div>
            <p style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: '14px', color: '#9d937c', lineHeight: 1.65, maxWidth: '280px', margin: 0 }}>
              Free BITSAT tools for students. College predictor, score data analysis, and more. No login. No ads.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '9px', fontWeight: 600, color: '#3d3b34', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '16px' }}>Tools</p>
            {[
              { href: '/', label: 'Home' },
              { href: '/predictor', label: 'College Predictor' },
              { href: '/score-data', label: 'Score Data' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{ display: 'block', fontFamily: 'Akkurat Mono, monospace', fontSize: '12px', fontWeight: 400, color: '#9d937c', textDecoration: 'none', marginBottom: '10px', lineHeight: 1.5 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '9px', fontWeight: 600, color: '#3d3b34', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '16px' }}>Resources</p>
            {[
              { href: 'https://apexbits.site/curriculum-student-advice', label: 'Student Advice' },
              { href: 'https://apexbits.site/fees-and-loans', label: 'Fees & Loans' },
              { href: 'https://apexbits.site/cutoffs', label: 'Cutoffs' },
              { href: 'https://apexbits.site/about', label: 'About Us' },
              { href: 'https://alphajee.com', label: 'Alphajee' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', fontFamily: 'Akkurat Mono, monospace', fontSize: '12px', fontWeight: 400, color: '#9d937c', textDecoration: 'none', marginBottom: '10px', lineHeight: 1.5 }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', color: '#3d3b34', margin: 0 }}>
            © 2026 ApexBITS. No cutoff predictions are guarantees. Use all tools as estimates only.
          </p>
          <a
            href="https://apexbits.site"
            style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', color: '#3d3b34', textDecoration: 'none' }}
          >
            apexbits.site ↗
          </a>
        </div>
      </div>

    </footer>
  );
}
