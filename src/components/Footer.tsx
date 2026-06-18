import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-coal border-t border-ash">
      <div
        className="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-[60px]"
        style={{ paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(24px,3vw,40px)' }}
      >
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] gap-7 md:gap-14 lg:gap-16 pb-10 border-b border-ash mb-7">

          {/* Brand — full width on smallest mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="font-display font-bold text-[15px] text-bg">Alphajee</span>
              <span className="w-5 h-5 bg-mint inline-flex items-center justify-center rounded-[4px] font-mono text-[10px] font-bold text-ink">×</span>
              <span className="inline-flex items-center gap-1.5 font-display font-bold text-[15px] text-bg">
                <span className="w-[22px] h-[22px] rounded-[5px] overflow-hidden bg-white inline-flex items-center justify-center p-[2px]">
                  <Image
                    src="/assets/images/logo-square.png"
                    alt="ApexBITS"
                    width={18}
                    height={18}
                    style={{ objectFit: 'contain' }}
                  />
                </span>
                ApexBITS
              </span>
            </div>
            <p className="font-serif text-[14px] text-tan leading-[1.65] max-w-[280px] m-0">
              Free BITSAT tools for students. College predictor, score data analysis, and more.
              No login. No ads.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="font-mono text-[9px] font-semibold text-ash uppercase tracking-[0.16em] mb-4">
              Tools
            </p>
            {[
              { href: '/',           label: 'Home' },
              { href: '/predictor',  label: 'College Predictor' },
              { href: '/score-data', label: 'Score Data' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-mono text-[12px] font-normal text-tan no-underline mb-2.5 leading-[1.5] transition-colors duration-150 hover:text-bg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <p className="font-mono text-[9px] font-semibold text-ash uppercase tracking-[0.16em] mb-4">
              Resources
            </p>
            {[
              { href: 'https://apexbits.site/curriculum-student-advice', label: 'Student Advice' },
              { href: 'https://apexbits.site/fees-and-loans',            label: 'Fees & Loans' },
              { href: 'https://apexbits.site/cutoffs',                   label: 'Cutoffs' },
              { href: 'https://apexbits.site/about',                     label: 'About Us' },
              { href: 'https://alphajee.com',                            label: 'Alphajee' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-[12px] font-normal text-tan no-underline mb-2.5 leading-[1.5] transition-colors duration-150 hover:text-bg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <p className="font-mono text-[10px] text-ash m-0">
            © 2026 ApexBITS. No cutoff predictions are guarantees. Use all tools as estimates only.
          </p>
          <a
            href="https://apexbits.site"
            className="font-mono text-[10px] text-ash no-underline transition-colors duration-150 hover:text-tan"
          >
            apexbits.site ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
