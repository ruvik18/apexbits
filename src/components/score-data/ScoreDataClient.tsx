'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const SCORE_CHART_MIN_START = 120;
const SCORE_CHART_MAX_START = 320;
const SCORE_BUCKET_SIZE = 10;
const SCORE_MAX = 390;
const DATA_VERSION = 'bucketed-score-data-20260618-1';

interface Bucket {
  start: number;
  end: number;
  count: number;
  cumulative: number;
}

interface ScoreData {
  ok: boolean;
  totalEntries: number;
  bucketSize: number;
  scoreMax: number;
  meanScore: number;
  medianRange: string;
  buckets: Bucket[];
  chartBuckets: Bucket[];
}

interface DatasetConfig {
  label: string;
  eyebrow: string;
  heading: string;
  copy: string;
  path: string;
  loading: string;
  unavailable: string;
}

const DATASETS: Record<string, DatasetConfig> = {
  phodu: {
    label: 'Phodu Club Data',
    eyebrow: 'Phodu Club bucketed score data',
    heading: 'Phodu Club Data Distribution',
    copy: 'Scores are stored as 10-mark buckets, not exact submitted marks.',
    path: '/assets/data/phodu-scores.json',
    loading: 'Loading Phodu Club score buckets...',
    unavailable: 'Phodu Club Data could not be loaded.',
  },
  apexbits: {
    label: 'ApexBITS Data',
    eyebrow: 'ApexBITS bucketed score data',
    heading: 'ApexBITS Data Distribution',
    copy: 'Counts are loaded as 10-mark buckets. Exact submitted scores are not shipped on this page.',
    path: '/assets/data/scores.json',
    loading: 'Loading ApexBITS score buckets...',
    unavailable: 'ApexBITS Data could not be loaded.',
  },
};

function formatNumber(v: number) {
  return new Intl.NumberFormat('en-IN').format(Math.round(v));
}

function formatScoreStat(v: number) {
  const rounded = Math.round(v * 10) / 10;
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: Number.isInteger(rounded) ? 0 : 1,
  }).format(rounded);
}

function formatPercentNumber(v: number | null) {
  if (v === null || !Number.isFinite(v)) return null;
  const clipped = Math.max(0, Math.min(100, v));
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(clipped);
}

function formatPercentileRange(range: { min: number; max: number } | null) {
  if (!range) return '— %ile';
  const min = formatPercentNumber(range.min);
  const max = formatPercentNumber(range.max);
  if (!min || !max) return '— %ile';
  return min === max ? `${min}%ile` : `${min}–${max}%ile`;
}

function formatRange(range: { min: number; max: number } | null) {
  if (!range) return formatNumber(0);
  const min = Math.max(0, Math.round(range.min));
  const max = Math.max(0, Math.round(range.max));
  return min === max ? formatNumber(min) : `${formatNumber(min)}–${formatNumber(max)}`;
}

function normalizeAllBuckets(rawBuckets: any[], bucketSize: number, scoreMax: number): Bucket[] {
  const counts = new Map<number, number>();
  for (const b of rawBuckets) {
    const start = Math.floor((Number(b.start) || 0) / bucketSize) * bucketSize;
    const count = Math.max(0, Math.round(Number(b.count) || 0));
    if (start < 0 || start > scoreMax || count <= 0) continue;
    counts.set(start, (counts.get(start) || 0) + count);
  }
  const buckets: Bucket[] = [];
  for (let s = 0; s <= scoreMax; s += bucketSize) {
    buckets.push({ start: s, end: Math.min(s + bucketSize - 1, scoreMax), count: counts.get(s) || 0, cumulative: 0 });
  }
  return buckets;
}

function addCumulative(buckets: Bucket[]) {
  let cum = 0;
  for (let i = buckets.length - 1; i >= 0; i--) {
    cum += buckets[i].count;
    buckets[i].cumulative = cum;
  }
}

function estimateMean(buckets: Bucket[], total: number) {
  if (!total) return 0;
  return buckets.reduce((sum, b) => sum + ((b.start + b.end) / 2) * b.count, 0) / total;
}

function findMedianRange(buckets: Bucket[], total: number) {
  if (!total) return '--';
  const target = (total + 1) / 2;
  let cum = 0;
  for (const b of buckets) {
    cum += b.count;
    if (cum >= target) return b.start === b.end ? String(b.start) : `${b.start}–${b.end}`;
  }
  return '--';
}

function buildScoreData(payload: any): ScoreData | null {
  if (!payload || typeof payload !== 'object') return null;
  if (!Array.isArray(payload.buckets)) return null;
  const bucketSize = Math.max(1, Math.round(Number(payload.bucketSize) || SCORE_BUCKET_SIZE));
  const scoreMax   = Math.max(bucketSize, Math.round(Number(payload.scoreMax) || SCORE_MAX));
  const buckets    = normalizeAllBuckets(payload.buckets, bucketSize, scoreMax);
  const counted    = buckets.reduce((s, b) => s + b.count, 0);
  const total      = Math.max(0, Math.round(Number(payload.totalEntries) || counted));
  addCumulative(buckets);
  return {
    ok: true,
    totalEntries: total,
    bucketSize,
    scoreMax,
    meanScore:   estimateMean(buckets, total),
    medianRange: findMedianRange(buckets, total),
    buckets,
    chartBuckets: buckets.filter((b) => b.start >= SCORE_CHART_MIN_START && b.start <= SCORE_CHART_MAX_START),
  };
}

function estimateHigherRange(data: ScoreData, score: number) {
  let min = 0, max = 0;
  for (const b of data.buckets) {
    if (b.start > score) min += b.count;
    if (b.end   > score) max += b.count;
  }
  return { min, max };
}

const dataCache = new Map<string, ScoreData>();

export default function ScoreDataClient() {
  const [activeDataset, setActiveDataset] = useState('phodu');
  const [data, setData]                   = useState<ScoreData | null>(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [compareScore, setCompareScore]   = useState<number | null>(295);
  const reqIdRef = useRef(0);

  const loadDataset = useCallback(async (key: string) => {
    const config = DATASETS[key] || DATASETS['phodu'];
    const reqId  = ++reqIdRef.current;
    setActiveDataset(key);
    setLoading(true);
    setError('');
    setData(null);
    try {
      let result: ScoreData | null = dataCache.get(key) || null;
      if (!result) {
        const res  = await fetch(`${config.path}?v=${DATA_VERSION}`);
        const json = await res.json();
        result = buildScoreData(json);
        if (result) dataCache.set(key, result);
      }
      if (reqId !== reqIdRef.current) return;
      if (!result) throw new Error('PARSE_FAILED');
      setData(result);
    } catch {
      if (reqId !== reqIdRef.current) return;
      setError(DATASETS[key]?.unavailable || 'Failed to load dataset.');
    } finally {
      if (reqId === reqIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => { loadDataset('phodu'); }, [loadDataset]);

  const config = DATASETS[activeDataset] || DATASETS['phodu'];

  const higherRange    = data && compareScore !== null ? estimateHigherRange(data, compareScore) : null;
  const percentileRange = data && higherRange && data.totalEntries > 0 ? {
    min: (Math.max(0, data.totalEntries - higherRange.max) / data.totalEntries) * 100,
    max: (Math.max(0, data.totalEntries - higherRange.min) / data.totalEntries) * 100,
  } : null;

  const above300 = data ? estimateHigherRange(data, 300) : null;
  const above270 = data ? estimateHigherRange(data, 270) : null;
  const maxCount = data ? Math.max(1, ...data.chartBuckets.map((b) => b.count)) : 1;

  const sliderFill = (v: number): React.CSSProperties => ({
    background: `linear-gradient(90deg, #0f0e0b ${(v / SCORE_MAX) * 100}%, rgba(15,14,11,0.14) ${(v / SCORE_MAX) * 100}%)`,
  });

  return (
    <main className="pb-[72px]">

      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden mb-6 border border-black/[0.12] flex flex-col items-start justify-end bg-blue"
        style={{ padding: 'clamp(76px,10vw,128px) clamp(22px,5vw,72px) clamp(44px,7vw,76px)', minHeight: 'clamp(280px,42vw,380px)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{ backgroundImage: 'linear-gradient(rgba(15,14,11,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(15,14,11,0.14) 1px,transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <p className="relative font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] mb-[14px]">
          <span className="inline-block rounded-full bg-ink mr-[9px]" style={{ width: '7px', height: '7px', verticalAlign: '1px' }} />
          BITSAT · Score data · 1500+ datapoints
        </p>
        <h1 className="relative font-display font-black text-ink m-0" style={{ fontSize: 'clamp(52px,8vw,108px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
          BITSAT Score
          <br />
          <em className="font-serif font-light" style={{ fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Analysis.
          </em>
        </h1>
      </section>

      {/* ── DATASET TABS ── */}
      <section className="rounded-xl border border-black/10 bg-sand mb-[18px]" style={{ padding: 'clamp(20px,3vw,34px)' }}>
        <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] mb-[14px]">
          Score data source
        </p>
        <div role="tablist" aria-label="Score data source" className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          {Object.entries(DATASETS).map(([key, cfg]) => {
            const active    = activeDataset === key;
            const dotColor  = key === 'phodu' ? '#e39ff6' : '#4da3ff';
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => loadDataset(key)}
                className={`text-left grid items-center gap-[6px] min-h-[82px] p-[16px_18px] rounded-[10px] border transition-all duration-[180ms] cursor-pointer ${
                  active
                    ? 'border-ink bg-ink'
                    : 'border-black/[0.16] bg-bg/60'
                }`}
              >
                <div className={`flex items-center gap-[9px] font-mono font-bold text-[14px] ${active ? 'text-bg' : 'text-ink'}`}>
                  <span className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: dotColor }} />
                  {cfg.label}
                </div>
                <div className={`font-mono text-[12px] ${active ? 'text-bg/70' : 'text-tan'}`}>
                  Dataset · 10-mark buckets
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── PERCENTILE CHECKER ── */}
      <section
        className="grid grid-cols-1 md:grid-cols-[minmax(0,1.18fr)_minmax(280px,.82fr)] gap-[18px] rounded-xl border border-black/10 bg-sand mb-[18px] items-stretch"
        style={{ padding: 'clamp(20px,3vw,34px)' }}
        aria-label="Compare your score with the selected dataset"
      >
        {/* Input side */}
        <div className="border border-black/[0.12] rounded-xl bg-bg p-[18px] grid gap-3">
          <div className="flex items-baseline justify-between gap-[14px] flex-wrap">
            <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] m-0">
              Your BITSAT score
            </p>
            <span className="font-serif text-[13px] text-tan">enter total marks</span>
          </div>
          <div className="flex items-end justify-between gap-[14px] min-h-[92px] p-[16px_18px] border border-black/10 rounded-xl bg-bg">
            <input
              type="number"
              min={0}
              max={SCORE_MAX}
              step={1}
              value={compareScore ?? ''}
              onChange={(e) => {
                const v = e.target.value === '' ? null : Math.max(0, Math.min(SCORE_MAX, Math.round(Number(e.target.value))));
                setCompareScore(v);
              }}
              aria-label="Enter your BITSAT score out of 390"
              className="min-w-0 border-0 bg-transparent text-ink font-serif font-normal outline-none p-0"
              style={{ width: 'min(100%, 360px)', fontSize: 'clamp(2.75rem,7vw,4.45rem)', lineHeight: 0.94, letterSpacing: '-0.07em' }}
            />
            <span className="shrink-0 pb-2 text-tan font-serif font-normal whitespace-nowrap" style={{ fontSize: 'clamp(1.15rem,2.6vw,1.7rem)', letterSpacing: '-0.04em' }}>
              / 390
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={SCORE_MAX}
            step={1}
            value={compareScore ?? 0}
            onChange={(e) => setCompareScore(Number(e.target.value))}
            aria-label="Adjust BITSAT score"
            style={{ ...sliderFill(compareScore ?? 0), width: '100%', cursor: 'pointer' }}
          />
          <p className="font-serif text-[14px] text-tan m-0">
            Compare your score against the selected bucketed public dataset.
          </p>
        </div>

        {/* Result side */}
        <div
          aria-live="polite"
          className="border border-black/[0.12] rounded-xl bg-ink text-bg p-[18px] grid items-center gap-[10px]"
        >
          <p className="font-mono text-[11px] font-medium text-bg/50 uppercase tracking-[0.1em] m-0">
            Estimated higher range
          </p>
          <div className="flex items-end flex-wrap" style={{ gap: 'clamp(12px,2.5vw,22px)' }}>
            <strong className="font-serif font-normal text-bg" style={{ fontSize: 'clamp(3rem,7.5vw,5.25rem)', lineHeight: 0.92, letterSpacing: '-0.075em' }}>
              {loading ? '—' : higherRange ? formatRange(higherRange) : '—'}
            </strong>
            <span
              className="inline-flex items-center min-h-[40px] mb-[0.22em] px-[13px] py-2 rounded-pill border border-bg/25 bg-bg/[0.08] text-bg font-mono font-medium whitespace-nowrap"
              style={{ fontSize: 'clamp(1.05rem,2.4vw,1.55rem)', lineHeight: 1, letterSpacing: '-0.045em' }}
            >
              {loading ? '— %ile' : formatPercentileRange(percentileRange)}
            </span>
          </div>
          <div className="px-3 py-2 rounded-pill border border-bg/20 bg-bg/[0.08] text-bg/70 font-mono text-[12px] font-medium leading-[1.15] w-fit">
            {config.label} · {data ? `${formatNumber(data.totalEntries)} bucketed entries` : 'loading...'}
          </div>
          <p className="font-serif text-[13px] text-bg/60 leading-[1.5] m-0">
            {compareScore !== null && data
              ? `Exact marks are hidden in ${data.bucketSize}-mark buckets. ${formatRange(higherRange)} of ${formatNumber(data.totalEntries)} entries may be above a score in the ${Math.floor(compareScore / data.bucketSize) * data.bucketSize}–${Math.min(Math.floor(compareScore / data.bucketSize) * data.bucketSize + data.bucketSize - 1, data.scoreMax)} bucket. Percentile estimate: ${formatPercentileRange(percentileRange)}.`
              : 'Enter your score to compare it with the selected data source.'}
          </p>
        </div>
      </section>

      {/* ── DATA PANEL ── */}
      <section
        aria-live="polite"
        className="rounded-xl border border-black/10 bg-sand relative"
        style={{ padding: 'clamp(20px,3vw,34px)' }}
      >
        <div className="flex justify-between items-start gap-5 flex-wrap mb-[22px]">
          <div style={{ minWidth: 'min(100%, 520px)', maxWidth: '760px' }}>
            <p className="font-mono text-[11px] font-medium text-ash uppercase tracking-[0.1em] m-0 mb-2">
              {loading ? 'Loading...' : config.eyebrow}
            </p>
            <h2 className="font-serif font-normal text-ink mt-2 m-0" style={{ fontSize: 'clamp(2rem,4.2vw,3.35rem)', lineHeight: 0.98, letterSpacing: '-0.06em' }}>
              {loading ? 'Loading...' : config.heading}
            </h2>
            <p className="font-serif text-ash leading-[1.58] mt-3 m-0" style={{ fontSize: 'clamp(.96rem,1.3vw,1.08rem)', maxWidth: '66ch' }}>
              {loading ? '' : config.copy}
            </p>
          </div>
        </div>

        {/* Metric cards */}
        {data && !loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px] mb-[22px]">
            {[
              { label: 'Above 300 est.', value: above300 ? formatRange(above300) : '--' },
              { label: 'Above 270 est.', value: above270 ? formatRange(above270) : '--' },
              { label: 'Mean est.',       value: `~ ${formatScoreStat(data.meanScore)}` },
              { label: 'Median bucket',  value: data.medianRange || '--' },
            ].map((m) => (
              <div key={m.label} className="border border-black/[0.12] rounded-xl bg-bg p-4 min-w-0">
                <span className="block text-tan font-mono text-[10px] font-medium uppercase tracking-[0.12em]">
                  {m.label}
                </span>
                <strong className="block mt-2 text-ink font-serif font-normal" style={{ fontSize: 'clamp(1.75rem,4vw,2.6rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {m.value}
                </strong>
              </div>
            ))}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="p-5 border border-black/10 rounded-xl bg-bg text-tan text-center font-mono text-[13px]">
            {config.loading}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-[12px_14px] rounded-xl border border-yellow-400/30 bg-yellow-400/[0.09] text-amber-800 font-mono text-[13px] mb-4">
            {error}
          </div>
        )}

        {/* Chart */}
        {data && !loading && (
          <article className="border border-black/[0.12] rounded-xl bg-bg overflow-hidden mt-6">
            <div className="flex items-center justify-between gap-3 flex-wrap p-[18px_20px] border-b border-black/10 bg-cream">
              <h3 className="m-0 text-ink font-serif font-normal" style={{ fontSize: 'clamp(1.2rem,2.8vw,1.55rem)', letterSpacing: '-0.035em' }}>
                Distribution
              </h3>
              <span className="inline-flex items-center justify-center gap-[7px] px-[13px] py-2 rounded-pill bg-ink border border-ink text-bg font-mono text-[12px] font-semibold">
                {config.label} · {formatNumber(data.totalEntries)} bucketed entries
              </span>
            </div>

            <div className="overflow-x-auto overflow-y-visible py-[22px]" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div
                role="img"
                aria-label={`Score distribution chart for ${config.label}`}
                className="relative w-full items-end"
                style={{
                  minWidth: '720px',
                  height: '540px',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${data.chartBuckets.length || 1}, minmax(0, 1fr))`,
                  alignItems: 'end',
                  gap: 'clamp(2px,.45vw,5px)',
                  padding: '100px clamp(24px,2.7vw,38px) 62px',
                  backgroundImage: 'linear-gradient(to top, rgba(15,14,11,0.08) 1px, transparent 1px)',
                  backgroundSize: '100% 56px',
                  backgroundPosition: '0 100px',
                }}
              >
                {data.chartBuckets.map((b, i) => {
                  const height    = Math.max(b.count > 0 ? 2 : 0, Math.round((b.count / maxCount) * 100));
                  const label     = i % 2 === 0 ? String(b.start) : '';
                  const isCompare = compareScore !== null && compareScore >= b.start && compareScore <= b.end;

                  return (
                    <div key={b.start} className="relative h-full flex items-end justify-center min-w-0">
                      <div
                        tabIndex={0}
                        role="button"
                        aria-label={`Score ${b.start}–${b.end}: ${b.count} entries, cumulative ${b.cumulative}`}
                        className="relative w-full min-h-[3px] rounded-[5px_5px_2px_2px] cursor-pointer outline-none"
                        style={{
                          height: `${height}%`,
                          background: isCompare
                            ? 'linear-gradient(180deg, #0f0e0b, #3d3b34)'
                            : 'linear-gradient(180deg, #3d3b34, #21201c)',
                          border: isCompare ? '1px solid rgba(15,14,11,0.6)' : '1px solid rgba(15,14,11,0.2)',
                        }}
                        onFocus={(e) => {
                          const tt = e.currentTarget.querySelector<HTMLElement>('.tt');
                          if (tt) tt.style.display = 'block';
                        }}
                        onBlur={(e) => {
                          const tt = e.currentTarget.querySelector<HTMLElement>('.tt');
                          if (tt) tt.style.display = 'none';
                        }}
                        onMouseEnter={(e) => {
                          const tt = e.currentTarget.querySelector<HTMLElement>('.tt');
                          if (tt) tt.style.display = 'block';
                        }}
                        onMouseLeave={(e) => {
                          const tt = e.currentTarget.querySelector<HTMLElement>('.tt');
                          if (tt) tt.style.display = 'none';
                        }}
                      >
                        {/* Tooltip */}
                        <div
                          className="tt hidden absolute left-1/2 -translate-x-1/2 w-max max-w-[240px] p-[10px_12px] rounded-[10px] bg-ink border border-bg/15 shadow-[0_12px_32px_rgba(0,0,0,0.28)] text-bg font-mono text-[12px] leading-[1.45] pointer-events-none z-20"
                          style={{ bottom: 'calc(100% + 10px)' }}
                        >
                          <strong className="block text-mint text-[13px] mb-[5px]">
                            Score {b.start}–{b.end}
                          </strong>
                          <span className="block whitespace-nowrap">Entries: {formatNumber(b.count)}</span>
                          <span className="block whitespace-nowrap">Cumulative: {formatNumber(b.cumulative)}</span>
                        </div>
                      </div>

                      {/* X-axis label */}
                      {label && (
                        <span
                          className="absolute text-tan font-mono font-semibold whitespace-nowrap leading-[1]"
                          style={{
                            left: i === 0 ? '0' : i === data.chartBuckets.length - 1 ? 'auto' : '50%',
                            right: i === data.chartBuckets.length - 1 ? '0' : 'auto',
                            bottom: '-36px',
                            transform: i === 0 || i === data.chartBuckets.length - 1 ? 'none' : 'translateX(-50%)',
                            fontSize: 'clamp(.58rem,.9vw,.68rem)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
