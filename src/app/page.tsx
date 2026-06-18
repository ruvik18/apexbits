import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BitsSketchHero from "@/components/BitsSketchHero";

export const metadata: Metadata = {
  title: "ApexBITS — BITSAT College Predictor & Score Data 2026",
  description:
    "Free BITSAT 2026 tools — college predictor for BITS Pilani, Goa and Hyderabad, plus score data analysis with 1500+ datapoints. No login. No paywalls.",
};

const TICKER_ITEMS = [
  "BITS Pilani",
  "·",
  "BITS Goa",
  "·",
  "BITS Hyderabad",
  "·",
  "BITSAT 2026",
  "·",
  "College Predictor",
  "·",
  "Score Analysis",
  "·",
  "Phodu Club",
  "·",
  "MathonGo",
  "·",
  "Canvas Classes",
  "·",
  "Free Tools",
  "·",
  "0 Ads. Ever.",
  "·",
];

const STATS = [
  { value: "3", label: "Campuses" },
  { value: "50+", label: "Programmes" },
  { value: "1500+", label: "Score datapoints" },
  { value: "0", label: "Ads. Ever." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-mint border-b border-black/10 pt-[80px] overflow-hidden">
        {/* Fine dot-grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,14,11,0.14) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── HERO CONTENT GRID ── */}
        <div
          className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-10 lg:px-[60px] grid grid-cols-1 md:grid-cols-2 items-center gap-10"
          style={{ minHeight: "clamp(480px, 60vh, 680px)" }}
        >
          {/* LEFT — Copy */}
          <div className="pb-10 md:pb-[72px] pt-5 md:pt-10">
            {/* Eyebrow badge */}
            <div className="fade-up fade-up-1 inline-flex items-center gap-2 px-3 py-1.5 bg-black/[0.07] border border-black/[0.13] rounded-pill mb-7">
              <span className="w-[7px] h-[7px] rounded-full bg-ink shrink-0" />
              <span className="font-mono text-[10px] font-semibold text-ash uppercase tracking-[0.1em]">
                BITSAT 2026 · Free Tools · 3 Campuses
              </span>
            </div>

            {/* Headline */}
            <h1
              className="fade-up fade-up-2  text-ink m-0 mb-6 font-sans "
              style={{
                fontSize: "clamp(50px, 7.5vw, 108px)",
                lineHeight: 0.93,
                letterSpacing: "-0.03em",
              }}
            >
              The Free
              <br />
              BITS
              <br />
              <em
                className="font-sans font-semibold not-italic"
                style={{
                  fontStyle: "",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                }}
              >
                Ecosystem.
              </em>
            </h1>

            {/* Subtitle */}
            <p
              className="fade-up fade-up-3 font-serif italic font-light text-ash m-0 mb-9"
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.65,
                maxWidth: "420px",
                fontWeight: 400,
              }}
            >
              Predict your BITS campus and programme, analyse score
              distributions — instantly. No login. No paywalls. Just honest data
              for aspirants.
            </p>

            {/* CTAs */}
            <div className="fade-up fade-up-4 flex flex-wrap gap-3">
              <Link
                href="/predictor"
                className="inline-flex items-center justify-center h-[50px] px-7 rounded-pill bg-ink text-bg border border-ink font-mono text-[11px] font-semibold uppercase tracking-[0.07em] no-underline whitespace-nowrap transition-colors duration-150 hover:bg-ash"
              >
                Predict BITS →
              </Link>
              <Link
                href="/score-data"
                className="inline-flex items-center justify-center h-[50px] px-7 rounded-pill bg-transparent text-ink border border-ink/40 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] no-underline whitespace-nowrap transition-colors duration-150 hover:border-ink hover:bg-black/5"
              >
                Score Data
              </Link>
            </div>
          </div>

          {/* RIGHT — Sketch */}
          <div
            className="fade-up fade-up-3 flex items-center justify-center"
            style={{ height: "clamp(300px, 45vh, 520px)" }}
          >
            <BitsSketchHero />
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="relative z-10 border-t border-black/10 bg-mint/70 backdrop-blur-sm">
          <div className="max-w-[1360px] mx-auto px-5 md:px-10 lg:px-[60px] grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`py-5 md:py-7 ${i < STATS.length - 1 ? "border-r border-black/10" : ""} ${i > 0 ? "pl-4 md:pl-8" : ""}`}
              >
                <div
                  className="font-sans text-ink leading-none"
                  style={{
                    fontFamily: "",
                    fontSize: "clamp(30px, 4.5vw, 58px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[10px] font-medium text-tan uppercase tracking-[0.1em] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK TICKER ─────────────────────────────────────────── */}
      <div className="bg-coal border-b border-ash overflow-hidden py-[11px]">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[10px] font-medium text-tan uppercase tracking-[0.12em] px-4"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT SECTION ───────────────────────────────────────── */}
      <section
        className="bg-cream border-b border-black/[0.08]"
        style={{ padding: "clamp(60px,8vw,120px) clamp(20px,4vw,60px)" }}
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-start">
            {/* Left */}
            <div>
              <p className="font-mono text-[10px] font-semibold text-tan uppercase tracking-[0.14em] mb-5">
                What is ApexBITS?
              </p>
              <h2
                className="font-sans  text-ink m-0"
                style={{
                  fontSize: "clamp(34px, 5vw, 72px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Honest data.
                <br />
                <em
                  className="font-serif"
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                >
                  Zero paywalls.
                </em>
              </h2>
            </div>

            {/* Right */}
            <div className="pt-0 md:pt-2">
              <p
                className="font-sans text-ash m-0 mb-5"
                style={{
                  fontSize: "clamp(16px, 1.5vw, 19px)",
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}
              >
                Cutoff predictions aren&apos;t guarantees — but having the right
                data matters. ApexBITS brings together the best prediction
                models from Phodu Club, MathonGo, and Canvas Classes in one
                place.
              </p>
              <p
                className="font-sans text-ash m-0"
                style={{
                  fontSize: "clamp(16px, 1.5vw, 19px)",
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}
              >
                Built for BITSAT 2026 aspirants who want clarity — not confusion
                — when choosing their programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section
        className="bg-bg border-b border-black/[0.08]"
        style={{ padding: "clamp(60px,8vw,120px) clamp(20px,4vw,60px)" }}
      >
        <div className="max-w-[1360px] mx-auto">
          {/* Header row */}
          <div className="flex items-baseline justify-between gap-5 flex-wrap mb-10 md:mb-14">
            <h2
              className="font-sans  text-ink m-0"
              style={{
                fontSize: "clamp(34px, 5.5vw, 80px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              What we offer.
            </h2>
            <Link
              href="/predictor"
              className="inline-flex items-center gap-1.5 h-10 px-[18px] rounded-pill border border-black/25 font-mono text-[10px] font-semibold text-ash uppercase tracking-[0.08em] no-underline whitespace-nowrap transition-colors duration-150 hover:border-ink hover:text-ink"
            >
              All tools →
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 — College Predictor */}
            <Link
              href="/predictor"
              className="group flex flex-col justify-between bg-coal border border-ash no-underline relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                padding: "clamp(28px,4vw,52px)",
                minHeight: "clamp(300px,36vw,440px)",
              }}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-mint/15 border border-mint/25 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                  <span className="font-mono text-[10px] font-semibold text-mint uppercase tracking-[0.1em]">
                    BITSAT · 2026
                  </span>
                </div>
                <h3
                  className="font-serif italic text-bg m-0 mb-4"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 48px)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.025em",
                  }}
                >
                  College
                  <br />
                  Predictor
                </h3>
                <p
                  className="font-sans text-tan text-[15px] leading-[1.65] m-0"
                  style={{ maxWidth: "340px" }}
                >
                  See which BITS programmes match your score using Phodu Club,
                  MathonGo, and Canvas Classes prediction models. Filter by
                  campus and branch.
                </p>
              </div>

              {/* Decorative compass */}
              <div className="absolute right-8 bottom-8 opacity-[0.07] pointer-events-none">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#d5fad3"
                  strokeWidth="1"
                >
                  <circle cx="50" cy="50" r="44" />
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                    const a = (i * Math.PI * 2) / 8;
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={50 + Math.cos(a) * 44}
                        y2={50 + Math.sin(a) * 44}
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="22" />
                  <circle cx="50" cy="50" r="8" />
                </svg>
              </div>

              <div className="inline-flex items-center gap-2.5 mt-8 font-mono text-[10px] font-semibold text-tan uppercase tracking-[0.1em]">
                <span className="w-9 h-9 rounded-full border border-ash inline-flex items-center justify-center text-bg text-base">
                  →
                </span>
                Explore
              </div>
            </Link>

            {/* Card 2 — Score Analysis */}
            <Link
              href="/score-data"
              className="group flex flex-col justify-between bg-blue border border-black/12 no-underline relative overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                padding: "clamp(28px,4vw,52px)",
                minHeight: "clamp(300px,36vw,440px)",
              }}
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-black/[0.08] border border-black/[0.14] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                  <span className="font-mono text-[10px] font-semibold text-ink uppercase tracking-[0.1em]">
                    Score Data · 1500+ entries
                  </span>
                </div>
                <h3
                  className="font-serif italic text-ink m-0 mb-4"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 48px)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.025em",
                  }}
                >
                  Score
                  <br />
                  Analysis
                </h3>
                <p
                  className="font-sans text-ash text-[15px] leading-[1.65] m-0"
                  style={{ maxWidth: "340px" }}
                >
                  Explore 1500+ BITSAT score datapoints from Phodu Club and
                  ApexBITS. Distribution charts, mean, median, and percentile
                  comparison.
                </p>
              </div>

              {/* Decorative bar chart */}
              <div className="absolute right-8 bottom-8 opacity-[0.12] pointer-events-none">
                <svg
                  width="100"
                  height="80"
                  viewBox="0 0 100 80"
                  fill="none"
                  stroke="#0f0e0b"
                  strokeWidth="1.2"
                >
                  {[12, 28, 44, 60, 76].map((x, i) => {
                    const h = [20, 40, 60, 35, 50][i];
                    return (
                      <rect key={i} x={x} y={70 - h} width="14" height={h} />
                    );
                  })}
                  <line x1="5" y1="70" x2="95" y2="70" />
                </svg>
              </div>

              <div className="inline-flex items-center gap-2.5 mt-8 font-mono text-[10px] font-semibold text-ash uppercase tracking-[0.1em]">
                <span className="w-9 h-9 rounded-full border border-black/20 inline-flex items-center justify-center text-ink text-base">
                  →
                </span>
                Explore
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
      <section
        className="bg-bg"
        style={{ padding: "clamp(60px,8vw,120px) clamp(20px,4vw,60px)" }}
      >
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CTA Card */}
            <div className="bg-ink border border-coal rounded-none p-8 md:p-14 flex flex-col gap-6">
              <p className="font-mono text-[10px] font-semibold text-tan uppercase tracking-[0.14em] m-0">
                Start now — it&apos;s free
              </p>
              <h2
                className="font-sans italic text-bg m-0"
                style={{
                  fontSize: "clamp(28px, 4vw, 54px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Know your chances.
                <br />
                <em
                  className="font-sans"
                  style={{ fontStyle: "italic", fontWeight: 300 }}
                >
                  Right now.
                </em>
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/predictor"
                  className="inline-flex items-center justify-center h-[48px] px-7 rounded-pill bg-mint text-ink border border-mint font-mono text-[11px] font-semibold uppercase tracking-[0.07em] no-underline whitespace-nowrap transition-colors duration-150 hover:bg-mint/80"
                >
                  Predict my BITS →
                </Link>
                <Link
                  href="/score-data"
                  className="inline-flex items-center justify-center h-[48px] px-7 rounded-pill bg-transparent text-bg border border-ash font-mono text-[11px] font-semibold uppercase tracking-[0.07em] no-underline whitespace-nowrap transition-colors duration-150 hover:border-bg/60"
                >
                  Browse Score Data
                </Link>
              </div>
            </div>

            {/* Info card */}
            <div className="bg-cream border border-black/[0.08] p-8 md:p-14 flex flex-col gap-5">
              <p className="font-mono text-[10px] font-semibold text-tan uppercase tracking-[0.14em] m-0">
                No strings attached
              </p>
              <ul className="m-0 p-0 list-none flex flex-col gap-3">
                {[
                  "No account required — ever",
                  "No ads, no trackers, no popups",
                  "3 prediction models in one place",
                  "1500+ real score datapoints",
                  "BITS Pilani, Goa & Hyderabad covered",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-sans text-ash"
                    style={{
                      fontSize: "clamp(14px, 1.3vw, 16px)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0 mt-[6px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
