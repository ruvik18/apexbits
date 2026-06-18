'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: 'https://apexbits.site/', label: 'Home', external: true },
  { href: '/predictor', label: 'College Predictor', external: false },
  { href: '/score-data', label: 'Score Data', external: false },
  { href: 'https://apexbits.site/curriculum-student-advice', label: 'Student Advice', external: true },
  { href: 'https://apexbits.site/fees-and-loans', label: 'Fees & Loans', external: true },
  { href: 'https://apexbits.site/cutoffs', label: 'Cutoffs', external: true },
  { href: 'https://apexbits.site/about', label: 'About Us', external: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[190] w-[min(1360px,calc(100%-32px))] h-[52px]"
        style={{
          background: scrolled ? 'rgba(249,249,240,0.97)' : 'rgba(249,249,240,0.94)',
          border: '1px solid rgba(15,14,11,0.13)',
          borderRadius: '9999px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '14px',
          padding: '0 8px 0 18px',
          transition: 'background 0.2s ease',
        }}
      >
        {/* Brand */}
        <Link
          href="/predictor"
          aria-label="Alphajee x ApexBITS"
          className="inline-flex items-center gap-[10px] min-w-0 text-[#0f0e0b] font-mono text-[12px] font-bold no-underline pr-[14px]"
          style={{ borderRight: '1px solid rgba(15,14,11,0.12)', fontFamily: 'Akkurat Mono, monospace' }}
        >
          <span
            className="inline-flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{
              width: '28px', height: '28px',
              border: '1px solid rgba(15,14,11,0.12)',
              borderRadius: '6px',
              background: '#fff',
              padding: '3px',
            }}
          >
            <Image src="/assets/images/logo-square.png" alt="" width={22} height={22} className="object-contain" priority />
          </span>
          <span className="inline-flex items-center gap-[7px] text-[#0f0e0b] whitespace-nowrap">
            <span className="font-bold">Alphajee</span>
            <span
              className="inline-flex items-center justify-center text-[10px] font-bold"
              style={{ width: '18px', height: '18px', background: '#d5fad3', color: '#0f0e0b', flexShrink: 0 }}
            >x</span>
            <span className="font-bold">ApexBITS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Site sections"
          className="hidden md:flex items-center justify-center gap-[6px] w-full min-w-0"
        >
          {NAV_LINKS.map((link) => {
            const isActive = !link.external && pathname === link.href;
            return link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="relative inline-flex items-center justify-center min-h-[36px] px-[7px] text-[#9d937c] hover:text-[#0f0e0b] transition-colors"
                style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="relative inline-flex items-center justify-center min-h-[36px] px-[7px] transition-colors"
                style={{
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: isActive ? '#0f0e0b' : '#9d937c',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-[11px] right-[11px] bottom-[4px] h-[1.5px] bg-current" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center h-[36px] px-[18px] rounded-full text-[#f9f9f0] bg-[#0f0e0b] border border-[#0f0e0b] transition-all"
          style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em', minWidth: '72px' }}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Desktop CTA */}
        <a
          href="/predictor"
          className="hidden md:inline-flex items-center justify-center h-[36px] px-[18px] rounded-full text-[#f9f9f0] bg-[#0f0e0b] border border-[#0f0e0b] hover:bg-[#3d3b34] hover:border-[#3d3b34] transition-all"
          style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Get Started
        </a>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[180] md:hidden"
          style={{ background: 'rgba(15,14,11,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-[76px] left-1/2 -translate-x-1/2 z-[185] md:hidden w-[min(480px,calc(100%-32px))] transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          background: '#f9f9f0',
          border: '1px solid rgba(15,14,11,0.13)',
          borderRadius: '20px',
          padding: '12px',
        }}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = !link.external && pathname === link.href;
            return link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3 rounded-xl hover:bg-[#f0efe6] transition-colors"
                style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '13px', fontWeight: 500, color: '#3d3b34', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3 rounded-xl transition-colors"
                style={{
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isActive ? '#0f0e0b' : '#3d3b34',
                  background: isActive ? '#f0efe6' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="/predictor"
            className="flex items-center justify-center mt-1 px-4 py-3 rounded-xl text-[#f9f9f0] bg-[#0f0e0b]"
            style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none' }}
          >
            Get Started
          </a>
        </nav>
      </div>
    </>
  );
}
