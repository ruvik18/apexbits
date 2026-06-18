'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  MODELS,
  MODEL_ORDER,
  FALLBACK_CSV,
  parseCSV,
  getAllBranches,
  computePredictions,
  type CutoffRow,
  type ModelKey,
  type PredictedRow,
  type Tier,
} from '@/lib/predictorData';

const CAMPUS_PINS: Record<string, string> = { Pilani: '📍', Goa: '🌊', Hyderabad: '🏙' };
const TIER_LABELS: Record<Tier, string> = { safe: 'Safe', target: 'Target', unlikely: 'Unlikely' };

const TIER_BADGE: Record<Tier, string> = {
  safe:     'text-green-800 bg-green-600/10 border border-green-600/25',
  target:   'text-amber-800 bg-yellow-500/10 border border-yellow-500/25',
  unlikely: 'text-red-800 bg-red-500/10 border border-red-500/25',
};

const TIER_ROW_BG: Record<Tier, React.CSSProperties> = {
  safe:     { background: 'linear-gradient(90deg, rgba(213,250,211,0.6) 0%, #f0efe6 35%)' },
  target:   { background: 'linear-gradient(90deg, rgba(239,236,202,0.8) 0%, #f0efe6 35%)' },
  unlikely: { background: 'linear-gradient(90deg, rgba(186,219,238,0.55) 0%, #f0efe6 35%)' },
};

export default function PredictorClient() {
  const [rows, setRows]               = useState<CutoffRow[]>([]);
  const [score, setScore]             = useState(295);
  const [model, setModel]             = useState<ModelKey>('phodu');
  const [outlook, setOutlook]         = useState(50);
  const [branchFilter, setBranchFilter] = useState<string[]>([]);
  const [results, setResults]         = useState<PredictedRow[]>([]);
  const [activeTier, setActiveTier]   = useState<Tier>('safe');
  const [showResults, setShowResults] = useState(false);
  const [branches, setBranches]       = useState<string[]>([]);
  const scoreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/assets/data/predictor-cutoffs.csv?v=3')
      .then((r) => r.text())
      .then((text) => {
        const parsed = parseCSV(text);
        setRows(parsed);
        setBranches(getAllBranches(parsed));
      })
      .catch(() => {
        const fallback = parseCSV(FALLBACK_CSV);
        setRows(fallback);
        setBranches(getAllBranches(fallback));
      });
  }, []);

  const sliderStyle = (value: number, min: number, max: number): React.CSSProperties => ({
    background: `linear-gradient(90deg, #0f0e0b ${((value - min) / (max - min)) * 100}%, rgba(15,14,11,0.14) ${((value - min) / (max - min)) * 100}%)`,
  });

  const outlookLabel =
    outlook < 25 ? 'Doomer'
    : outlook < 45 ? 'Pessimistic'
    : outlook < 55 ? 'Neutral'
    : outlook < 75 ? 'Optimistic'
    : 'Hopium';

  const handlePredict = useCallback(() => {
    const predicted = computePredictions(rows, score, model, outlook, branchFilter);
    setResults(predicted);
    setShowResults(true);
    const hasSafe = predicted.some((r) => r.tier === 'safe');
    setActiveTier(hasSafe ? 'safe' : predicted.some((r) => r.tier === 'target') ? 'target' : 'unlikely');
  }, [rows, score, model, outlook, branchFilter]);

  const tierCounts = { safe: 0, target: 0, unlikely: 0 };
  results.forEach((r) => { tierCounts[r.tier]++; });
  const visibleResults = results.filter((r) => r.tier === activeTier);

  const toggleBranch = (branch: string) => {
    setBranchFilter((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  return (
    <main className="w-full max-w-[1180px] mx-auto px-0 pt-[86px] pb-22">

      {/* ── HERO ── */}
      <section className="relative w-full mb-6 overflow-hidden border border-black/[0.12] flex flex-col items-start justify-end bg-mint"
        style={{ padding: 'clamp(76px,10vw,128px) clamp(22px,5vw,72px) clamp(44px,7vw,76px)', minHeight: 'clamp(280px,42vw,440px)' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{ backgroundImage: 'linear-gradient(rgba(15,14,11,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(15,14,11,0.14) 1px,transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <p className="relative font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] mb-[14px]">
          <span className="inline-block rounded-full bg-ink mr-[9px]" style={{ width: '7px', height: '7px', verticalAlign: '1px' }} />
          BITSAT · BITS 2026 · 3 Campuses
        </p>
        <h1 className="relative font-display font-black text-ink m-0" style={{ fontSize: 'clamp(52px,8vw,108px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
          BITS College
          <br />
          <em className="font-serif font-light" style={{ fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Predictor.
          </em>
        </h1>
      </section>

      {/* ── CONTROLS ── */}
      <section className="flex flex-col gap-[18px] pb-[18px]">

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 border border-black/[0.14] rounded-xl bg-cream text-ash font-serif">
          <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 mt-[1px] text-bg bg-ink rounded-full text-sm font-bold font-mono">
            !
          </span>
          <span className="text-[15px] leading-[1.6]">
            No one can predict cutoffs with complete accuracy, however these are the predictions from the top BITSAT Teachers — Phodu Club, MathonGo, and Canvas Classes.
          </span>
        </div>

        {/* Model picker */}
        <div className="rounded-xl border border-black/10 bg-sand" style={{ padding: 'clamp(20px,3vw,34px)' }}>
          <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] mb-[14px]">
            Prediction model
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px]">
            {MODEL_ORDER.map((key) => {
              const m = MODELS[key];
              const active = model === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setModel(key)}
                  className={`text-left grid gap-[6px] p-4 rounded-[10px] border transition-all duration-[180ms] cursor-pointer min-h-[74px] items-center ${
                    active
                      ? 'border-ink bg-ink text-bg'
                      : 'border-black/[0.16] bg-bg/60 text-ash'
                  }`}
                >
                  <div className={`flex items-center gap-[9px] font-mono font-bold text-[15px] ${active ? 'text-bg' : 'text-ink'}`}>
                    <span className="rounded-full shrink-0 w-[10px] h-[10px]" style={{ background: active ? m.color : '#9d937c' }} />
                    {m.name}
                  </div>
                  <div className={`text-[12px] leading-[1.45] ${active ? 'text-bg/70' : 'text-tan'}`}>{m.rule}</div>
                  <a
                    href={m.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`text-[11px] no-underline inline-flex items-center gap-1 font-mono ${active ? 'text-bg/50' : 'text-tan'}`}
                  >
                    ↗ {m.srcLabel}
                  </a>
                </button>
              );
            })}
          </div>
        </div>

        {/* Score + Branch */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.85fr)] gap-[18px]">

          {/* Score input */}
          <div className="rounded-xl border border-black/10 bg-sand" style={{ padding: 'clamp(20px,3vw,34px)' }}>
            <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] mb-3">
              Your BITSAT score
            </p>
            <div className="flex items-baseline gap-[10px] p-[14px_20px] border border-black/10 rounded-xl bg-bg">
              <input
                ref={scoreInputRef}
                aria-label="BITSAT total score"
                type="number"
                min={0}
                max={390}
                value={score}
                onChange={(e) => setScore(Math.max(0, Math.min(390, Number(e.target.value))))}
                className="w-full min-w-0 border-0 bg-transparent text-ink font-serif font-normal outline-none p-0"
                style={{ fontSize: 'clamp(40px,6vw,62px)', letterSpacing: '-0.04em' }}
              />
              <span className="text-tan font-serif font-normal whitespace-nowrap shrink-0" style={{ fontSize: 'clamp(18px,2.4vw,24px)' }}>
                / 390
              </span>
            </div>
            <div className="mt-[18px] mx-[2px] mb-1">
              <input
                aria-label="BITSAT score slider"
                type="range"
                min={0}
                max={390}
                step={1}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                style={sliderStyle(score, 0, 390)}
                className="w-full"
              />
            </div>
          </div>

          {/* Branch filter */}
          <div className="rounded-xl border border-black/10 bg-sand flex flex-col" style={{ padding: 'clamp(20px,3vw,34px)' }}>
            <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] mb-1">
              Filter by branch
            </p>
            <p className="font-serif text-[13px] text-tan mb-4">
              Leave empty to see all branches
            </p>
            <div className="flex flex-wrap gap-2">
              {branches.map((b) => {
                const active = branchFilter.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBranch(b)}
                    className={`font-mono font-medium text-[11px] py-[7px] px-3 border rounded-pill transition-all duration-[180ms] cursor-pointer ${
                      active
                        ? 'text-bg border-ink bg-ink'
                        : 'text-ash border-black/[0.16] bg-bg/60'
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Outlook slider */}
        <div className="p-[22px_24px] border border-black/10 rounded-xl bg-blue">
          <div className="flex justify-between items-baseline gap-[14px] mb-[6px]">
            <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] m-0">
              Cutoff outlook
            </p>
            <span className="font-serif text-[15px] font-medium text-ink">
              {outlookLabel}
            </span>
          </div>
          <input
            aria-label="Cutoff outlook between pessimistic and optimistic"
            type="range"
            min={0}
            max={100}
            step={1}
            value={outlook}
            onChange={(e) => setOutlook(Number(e.target.value))}
            style={sliderStyle(outlook, 0, 100)}
            className="w-full"
          />
          <div className="flex justify-between mt-[10px] font-mono text-[10px] font-medium uppercase tracking-[0.1em]">
            <span className="text-tan">Doomer · closes high</span>
            <span className="text-ash">Neutral</span>
            <span className="text-tan">Hopium · closes low</span>
          </div>
        </div>

        {/* Predict button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handlePredict}
            disabled={rows.length === 0}
            className={`font-mono text-[11px] font-medium tracking-[0.03em] uppercase inline-flex items-center justify-center gap-[10px] min-h-[48px] px-[30px] rounded-pill border border-ink bg-ink text-bg transition-all duration-[180ms] ${
              rows.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-ash'
            }`}
          >
            Predict my BITS programmes →
          </button>
        </div>
      </section>

      {/* ── RESULTS ── */}
      {showResults && (
        <section aria-label="Predicted programmes" className="pb-2">

          {/* Results header */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mt-9 mb-[14px]">
            <h2 className="font-serif font-normal text-ink m-0" style={{ fontSize: 'clamp(32px,4vw,54px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              Your <em style={{ fontStyle: 'italic' }}>predicted</em> programmes
            </h2>
            <span className="font-mono text-[13px] text-tan font-medium">
              Score <b className="text-ink font-bold">{score}</b> · {MODELS[model].name} · {outlookLabel}
            </span>
          </div>

          {/* Tier pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(['safe', 'target', 'unlikely'] as Tier[]).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setActiveTier(tier)}
                className={`font-mono text-[12px] font-semibold py-2 px-[14px] rounded-pill border transition-all duration-[180ms] cursor-pointer ${
                  activeTier === tier
                    ? 'border-ink bg-ink text-bg'
                    : 'border-black/[0.16] bg-bg/60 text-ash'
                } ${tierCounts[tier] === 0 ? 'opacity-40' : ''}`}
              >
                {TIER_LABELS[tier]} · {tierCounts[tier]}
              </button>
            ))}
          </div>

          {/* Result rows */}
          <div className="grid gap-3 mb-[18px]">
            {visibleResults.length === 0 ? (
              <div className="p-5 border border-black/10 rounded-xl bg-sand text-tan font-mono text-[13px]">
                No programmes in this tier with the current filters.
              </div>
            ) : (
              visibleResults.map((r) => (
                <div
                  key={`${r.campus}-${r.programme}`}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-4 p-[22px_24px] rounded-xl border border-black/[0.12] relative overflow-hidden"
                  style={TIER_ROW_BG[r.tier]}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-[10px]">
                      <h3 className="m-0 font-serif font-normal text-ink" style={{ fontSize: 'clamp(19px,2.2vw,25px)', letterSpacing: '-0.03em', lineHeight: 1.12 }}>
                        {r.programme}
                      </h3>
                      <span className={`inline-flex items-center gap-[5px] font-mono text-[10px] font-semibold uppercase tracking-[0.1em] py-[5px] px-[9px] rounded-pill ${TIER_BADGE[r.tier]}`}>
                        {TIER_LABELS[r.tier]}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-[14px] gap-y-1 font-serif text-[14px] text-ash leading-[1.55]">
                      <span>
                        <span className="text-tan">{CAMPUS_PINS[r.campus] || '📌'} </span>
                        <b className="text-ink font-semibold">{r.campus}</b>
                      </span>
                      <span className="text-tan">·</span>
                      <span>
                        <span className="text-tan">2025 close </span>
                        <b className="text-ink font-bold">{r.close2025}</b>
                      </span>
                      <span className="text-tan">·</span>
                      <span>
                        <span className="text-tan">predicted </span>
                        <b className="text-ink font-bold">{r.predictedCutoff}</b>
                      </span>
                    </div>
                  </div>
                  <div className="grid justify-items-end gap-[2px] min-w-[78px] text-right">
                    <strong
                      className="font-serif font-normal"
                      style={{
                        fontSize: 'clamp(22px,2.3vw,30px)',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        color: r.margin > 0 ? '#166534' : r.margin < 0 ? '#991b1b' : '#0f0e0b',
                      }}
                    >
                      {r.margin > 0 ? '+' : ''}{r.margin}
                    </strong>
                    <span className="font-mono text-tan text-[11px] font-medium tracking-[0.02em]">
                      marks margin
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Methodology note */}
          <div className="p-[18px_20px] border border-black/10 rounded-xl bg-sand text-ash font-serif text-[14px] leading-[1.65]">
            Ranked using <b>score − predicted</b>. Safe means more than 7 marks above the predicted cutoff,
            Target means within ±7 marks of it, and Unlikely means more than 7 marks below it.
            The predicted cutoff moves with the outlook slider. This is a statistical estimate, not a guarantee.
          </div>
        </section>
      )}
    </main>
  );
}
