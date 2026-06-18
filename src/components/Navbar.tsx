'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home', external: false },
  { href: '/predictor', label: 'College Predictor', external: false },
  { href: '/score-data', label: 'Score Data', external: false },
  { href: 'https://apexbits.site/curriculum-student-advice', label: 'Student Advice', external: true },
  { href: 'https://apexbits.site/fees-and-loans', label: 'Fees & Loans', external: true },
  { href: 'https://apexbits.site/cutoffs', label: 'Cutoffs', external: true },
  { href: 'https://apexbits.site/about', label: 'About', external: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      {/* ── NAVBAR BAR ───────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 190,
          width: 'min(1360px, calc(100% - 24px))',
          height: '52px',
          background: scrolled ? 'rgba(249,249,240,0.98)' : 'rgba(249,249,240,0.92)',
          border: '1px solid rgba(15,14,11,0.13)',
          borderRadius: '9999px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 6px 0 6px',
          gap: '0',
          transition: 'background 0.2s',
        }}
      >
        {/* ── LEFT: ALPHAJEE BRAND ── */}
        <a
          href="https://alphajee.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Alphajee"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 14px 0 6px',
            height: '40px',
            borderRadius: '9999px',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,14,11,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              border: '1px solid rgba(15,14,11,0.1)',
            }}
          >
            <Image
              src="/assets/images/alphajee-logo.webp"
              alt="Alphajee"
              width={26}
              height={26}
              style={{ objectFit: 'contain', width: '26px', height: '26px' }}
              priority
            />
          </span>
          <span
            style={{
              fontFamily: 'Dopis, system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              color: '#0f0e0b',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Alphajee
          </span>
        </a>

        {/* × divider */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '22px',
            borderRadius: '4px',
            background: '#d5fad3',
            color: '#0f0e0b',
            fontFamily: 'Akkurat Mono, monospace',
            fontSize: '10px',
            fontWeight: 700,
            flexShrink: 0,
            margin: '0 4px',
          }}
        >
          ×
        </span>

        {/* ── APEXBITS BRAND (home link) ── */}
        <Link
          href="/"
          aria-label="ApexBITS Home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 14px 0 6px',
            height: '40px',
            borderRadius: '9999px',
            textDecoration: 'none',
            flexShrink: 0,
            borderRight: '1px solid rgba(15,14,11,0.1)',
            marginRight: '6px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,14,11,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <span
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              border: '1px solid rgba(15,14,11,0.1)',
              padding: '3px',
            }}
          >
            <Image
              src="/assets/images/logo-square.png"
              alt="ApexBITS"
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
              priority
            />
          </span>
          <span
            style={{
              fontFamily: 'Dopis, system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              color: '#0f0e0b',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            ApexBITS
          </span>
        </Link>

        {/* ── CENTER NAV (desktop) ── */}
        <nav
          aria-label="Main navigation"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            minWidth: 0,
            overflow: 'hidden',
          }}
          className="hidden md:flex"
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '36px',
                  padding: '0 10px',
                  borderRadius: '9999px',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '10.5px',
                  fontWeight: 500,
                  color: active ? '#0f0e0b' : '#9d937c',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  background: active ? 'rgba(15,14,11,0.07)' : 'transparent',
                  transition: 'color 0.15s, background 0.15s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = '#0f0e0b';
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = '#9d937c';
                }}
              >
                {link.label}
              </El>
            );
          })}
        </nav>

        {/* ── RIGHT: CTA + HAMBURGER ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', flexShrink: 0 }}>
          <Link
            href="/predictor"
            className="hidden md:inline-flex"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '36px',
              padding: '0 18px',
              borderRadius: '9999px',
              background: '#0f0e0b',
              color: '#f9f9f0',
              border: '1px solid #0f0e0b',
              fontFamily: 'Akkurat Mono, monospace',
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#3d3b34')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0f0e0b')}
          >
            Predict →
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              borderRadius: '9999px',
              border: '1px solid rgba(15,14,11,0.15)',
              background: menuOpen ? '#0f0e0b' : 'transparent',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.2s',
            }}
          >
            <span style={{ width: '16px', height: '1.5px', background: menuOpen ? '#f9f9f0' : '#0f0e0b', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: '16px', height: '1.5px', background: menuOpen ? '#f9f9f0' : '#0f0e0b', borderRadius: '2px', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: '16px', height: '1.5px', background: menuOpen ? '#f9f9f0' : '#0f0e0b', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU BACKDROP ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 180,
          background: 'rgba(15,14,11,0.45)',
          backdropFilter: 'blur(3px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s',
        }}
      />

      {/* ── MOBILE MENU PANEL ── */}
      <div
        style={{
          position: 'fixed',
          top: '75px',
          left: '50%',
          transform: `translateX(-50%) translateY(${menuOpen ? '0' : '-8px'})`,
          zIndex: 185,
          width: 'min(460px, calc(100% - 24px))',
          background: '#f9f9f0',
          border: '1px solid rgba(15,14,11,0.13)',
          borderRadius: '20px',
          padding: '10px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.22s, transform 0.22s',
          boxShadow: '0 20px 60px rgba(15,14,11,0.15)',
        }}
        className="md:hidden"
      >
        {/* Brand row in menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px 14px', borderBottom: '1px solid rgba(15,14,11,0.08)', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'Dopis, sans-serif', fontSize: '14px', fontWeight: 700, color: '#0f0e0b' }}>Alphajee</span>
          <span style={{ width: '20px', height: '20px', background: '#d5fad3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 700 }}>×</span>
          <span style={{ fontFamily: 'Dopis, sans-serif', fontSize: '14px', fontWeight: 700, color: '#0f0e0b' }}>ApexBITS</span>
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: active ? '#0f0e0b' : '#3d3b34',
                  background: active ? 'rgba(15,14,11,0.06)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                  justifyContent: 'space-between',
                }}
              >
                {link.label}
                {active && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f0e0b' }} />}
              </El>
            );
          })}
        </nav>

        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(15,14,11,0.08)' }}>
          <Link
            href="/predictor"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px',
              borderRadius: '12px',
              background: '#0f0e0b',
              color: '#f9f9f0',
              fontFamily: 'Akkurat Mono, monospace',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              textDecoration: 'none',
            }}
          >
            Predict my BITS programmes →
          </Link>
        </div>
      </div>
    </>
  );
}
