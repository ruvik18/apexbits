import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="w-full mt-16"
      style={{ background: '#21201c', color: '#f9f9f0', borderTop: '1px solid #3d3b34' }}
    >
      <div className="max-w-[1360px] mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div
              className="text-[13px] font-bold mb-3"
              style={{ fontFamily: 'Akkurat Mono, monospace', color: '#f9f9f0' }}
            >
              Alphajee × ApexBITS
            </div>
            <p className="text-[13px] max-w-xs" style={{ color: '#9d937c', lineHeight: '1.6' }}>
              Free BITSAT tools for students. College predictor, score data analysis, and more.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ fontFamily: 'Akkurat Mono, monospace', color: '#3d3b34' }}
            >
              Tools
            </span>
            <Link
              href="/predictor"
              className="text-[13px] hover:text-[#f9f9f0] transition-colors"
              style={{ color: '#9d937c', textDecoration: 'none', fontFamily: 'Akkurat Mono, monospace' }}
            >
              College Predictor
            </Link>
            <Link
              href="/score-data"
              className="text-[13px] hover:text-[#f9f9f0] transition-colors"
              style={{ color: '#9d937c', textDecoration: 'none', fontFamily: 'Akkurat Mono, monospace' }}
            >
              Score Data
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ fontFamily: 'Akkurat Mono, monospace', color: '#3d3b34' }}
            >
              Resources
            </span>
            {[
              { href: 'https://apexbits.site/curriculum-student-advice', label: 'Student Advice' },
              { href: 'https://apexbits.site/fees-and-loans', label: 'Fees & Loans' },
              { href: 'https://apexbits.site/cutoffs', label: 'Cutoffs' },
              { href: 'https://apexbits.site/about', label: 'About Us' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] hover:text-[#f9f9f0] transition-colors"
                style={{ color: '#9d937c', textDecoration: 'none', fontFamily: 'Akkurat Mono, monospace' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid #3d3b34' }}
        >
          <p
            className="text-[11px]"
            style={{ fontFamily: 'Akkurat Mono, monospace', color: '#3d3b34' }}
          >
            © 2026 ApexBITS. No cutoff predictions are guarantees. Use all tools as estimates only.
          </p>
          <a
            href="https://apexbits.site"
            className="text-[11px] hover:text-[#9d937c] transition-colors"
            style={{ fontFamily: 'Akkurat Mono, monospace', color: '#3d3b34', textDecoration: 'none' }}
          >
            apexbits.site →
          </a>
        </div>
      </div>
    </footer>
  );
}
