'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',          label: 'Home',             external: false },
  { href: '/predictor', label: 'College Predictor', external: false },
  { href: '/score-data',label: 'Score Data',        external: false },
  { href: 'https://apexbits.site/curriculum-student-advice', label: 'Student Advice', external: true },
  { href: 'https://apexbits.site/fees-and-loans',            label: 'Fees & Loans',   external: true },
  { href: 'https://apexbits.site/cutoffs',                   label: 'Cutoffs',        external: true },
  { href: 'https://apexbits.site/about',                     label: 'About',          external: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string, external: boolean) =>
    !external && (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {/* ── NAVBAR BAR ───────────────────────────────────────── */}
      <header
        className="fixed z-[190] flex items-center gap-0 transition-colors duration-200"
        style={{
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1360px, calc(100% - 24px))',
          height: '52px',
          background: scrolled ? 'rgba(249,249,240,0.98)' : 'rgba(249,249,240,0.92)',
          border: '1px solid rgba(15,14,11,0.13)',
          borderRadius: '9999px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '0 6px',
        }}
      >
        {/* ── LEFT: ALPHAJEE BRAND ── */}
        <a
          href="https://alphajee.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Alphajee"
          className="inline-flex items-center gap-2 shrink-0 rounded-pill h-[40px] px-3 no-underline transition-colors duration-150 hover:bg-black/5"
        >
          <span className="w-[30px] h-[30px] rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white border border-black/10">
            <Image
              src="/assets/images/alphajee-logo.webp"
              alt="Alphajee"
              width={26}
              height={26}
              style={{ width: '26px', height: '26px', objectFit: 'contain' }}
              priority
            />
          </span>
          <span className="font-display font-bold text-[13px] text-ink tracking-[-0.01em] whitespace-nowrap">
            Alphajee
          </span>
        </a>

        {/* × divider */}
        <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[4px] bg-mint text-ink font-mono text-[10px] font-bold shrink-0 mx-1">
          ×
        </span>

        {/* ── APEXBITS BRAND ── */}
        <Link
          href="/"
          aria-label="ApexBITS Home"
          className="inline-flex items-center gap-2 shrink-0 rounded-pill h-[40px] pl-1.5 pr-3 no-underline border-r border-black/10 mr-1.5 transition-colors duration-150 hover:bg-black/5"
        >
          <span className="w-[30px] h-[30px] rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white border border-black/10 p-[3px]">
            <Image
              src="/assets/images/logo-square.png"
              alt="ApexBITS"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </span>
          <span className="font-display font-bold text-[13px] text-ink tracking-[-0.01em] whitespace-nowrap">
            ApexBITS
          </span>
        </Link>

        {/* ── CENTER NAV — desktop only ── */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex flex-1 items-center justify-center gap-0.5 min-w-0 overflow-hidden"
        >
          {NAV_LINKS.map(link => {
            const active = isActive(link.href, link.external);
            const El = link.external ? 'a' : Link;
            const extraProps = link.external
              ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: link.href };
            return (
              <El
                key={link.href}
                {...(extraProps as any)}
                className={`inline-flex items-center h-[36px] px-[10px] rounded-pill font-mono text-[10.5px] font-medium whitespace-nowrap no-underline transition-all duration-150 ${
                  active
                    ? 'text-ink bg-black/[0.07]'
                    : 'text-tan hover:text-ink'
                }`}
              >
                {link.label}
              </El>
            );
          })}
        </nav>

        {/* ── RIGHT: CTA + HAMBURGER ── */}
        <div className="flex items-center gap-1.5 ml-auto shrink-0">
          {/* CTA — desktop only */}
          <Link
            href="/predictor"
            className="hidden md:inline-flex items-center justify-center h-[36px] px-[18px] rounded-pill bg-ink text-bg border border-ink font-mono text-[10px] font-semibold uppercase tracking-[0.05em] no-underline whitespace-nowrap transition-colors duration-150 hover:bg-ash"
          >
            Predict →
          </Link>

          {/* Hamburger — mobile only. NOTE: no display in style so md:hidden works */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="flex md:hidden flex-col items-center justify-center gap-[5px] w-[40px] h-[40px] rounded-pill border border-black/15 cursor-pointer transition-colors duration-200"
            style={{ background: menuOpen ? '#0f0e0b' : 'transparent', padding: 0 }}
          >
            <span style={{ width: '16px', height: '1.5px', background: menuOpen ? '#f9f9f0' : '#0f0e0b', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none', display: 'block' }} />
            <span style={{ width: '16px', height: '1.5px', background: menuOpen ? '#f9f9f0' : '#0f0e0b', borderRadius: '2px', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1, display: 'block' }} />
            <span style={{ width: '16px', height: '1.5px', background: menuOpen ? '#f9f9f0' : '#0f0e0b', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none', display: 'block' }} />
          </button>
        </div>
      </header>

      {/* ── MOBILE BACKDROP ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className="md:hidden fixed inset-0 z-[180] transition-opacity duration-250"
        style={{
          background: 'rgba(15,14,11,0.45)',
          backdropFilter: 'blur(3px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      />

      {/* ── MOBILE MENU PANEL ── */}
      <div
        className="md:hidden fixed z-[185] transition-all duration-220"
        style={{
          top: '75px',
          left: '50%',
          transform: `translateX(-50%) translateY(${menuOpen ? '0' : '-8px'})`,
          width: 'min(460px, calc(100% - 24px))',
          background: '#f9f9f0',
          border: '1px solid rgba(15,14,11,0.13)',
          borderRadius: '20px',
          padding: '10px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          boxShadow: '0 20px 60px rgba(15,14,11,0.15)',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.08] mb-2">
          <span className="font-display font-bold text-[14px] text-ink">Alphajee</span>
          <span className="w-5 h-5 bg-mint inline-flex items-center justify-center rounded-[4px] font-mono text-[10px] font-bold">×</span>
          <span className="font-display font-bold text-[14px] text-ink">ApexBITS</span>
        </div>

        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map(link => {
            const active = isActive(link.href, link.external);
            const El = link.external ? 'a' : Link;
            const extraProps = link.external
              ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: link.href };
            return (
              <El
                key={link.href}
                {...(extraProps as any)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-[13px] font-medium no-underline transition-colors duration-150 ${
                  active ? 'text-ink bg-black/[0.06]' : 'text-ash'
                }`}
              >
                {link.label}
                {active && <span className="w-1.5 h-1.5 rounded-full bg-ink" />}
              </El>
            );
          })}
        </nav>

        <div className="mt-2 pt-2 border-t border-black/[0.08]">
          <Link
            href="/predictor"
            className="flex items-center justify-center h-12 rounded-xl bg-ink text-bg font-mono text-[11px] font-semibold uppercase tracking-[0.06em] no-underline"
          >
            Predict my BITS programmes →
          </Link>
        </div>
      </div>
    </>
  );
}
