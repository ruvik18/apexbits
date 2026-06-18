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
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: Number.isInteger(rounded) ? 0 : 1 }).format(rounded);
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
  const scoreMax = Math.max(bucketSize, Math.round(Number(payload.scoreMax) || SCORE_MAX));
  const buckets = normalizeAllBuckets(payload.buckets, bucketSize, scoreMax);
  const countedEntries = buckets.reduce((s, b) => s + b.count, 0);
  const totalEntries = Math.max(0, Math.round(Number(payload.totalEntries) || countedEntries));
  addCumulative(buckets);
  return {
    ok: true,
    totalEntries,
    bucketSize,
    scoreMax,
    meanScore: estimateMean(buckets, totalEntries),
    medianRange: findMedianRange(buckets, totalEntries),
    buckets,
    chartBuckets: buckets.filter((b) => b.start >= SCORE_CHART_MIN_START && b.start <= SCORE_CHART_MAX_START),
  };
}

function estimateHigherRange(data: ScoreData, score: number) {
  let min = 0, max = 0;
  for (const b of data.buckets) {
    if (b.start > score) min += b.count;
    if (b.end > score) max += b.count;
  }
  return { min, max };
}

const dataCache = new Map<string, ScoreData>();

export default function ScoreDataClient() {
  const [activeDataset, setActiveDataset] = useState('phodu');
  const [data, setData] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [compareScore, setCompareScore] = useState<number | null>(295);
  const reqIdRef = useRef(0);

  const loadDataset = useCallback(async (key: string) => {
    const config = DATASETS[key] || DATASETS['phodu'];
    const reqId = ++reqIdRef.current;
    setActiveDataset(key);
    setLoading(true);
    setError('');
    setData(null);

    try {
      let result: ScoreData | null = dataCache.get(key) || null;
      if (!result) {
        const res = await fetch(`${config.path}?v=${DATA_VERSION}`);
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

  useEffect(() => {
    loadDataset('phodu');
  }, [loadDataset]);

  const config = DATASETS[activeDataset] || DATASETS['phodu'];

  const higherRange = data && compareScore !== null ? estimateHigherRange(data, compareScore) : null;
  const percentileRange = data && higherRange && data.totalEntries > 0 ? {
    min: (Math.max(0, data.totalEntries - higherRange.max) / data.totalEntries) * 100,
    max: (Math.max(0, data.totalEntries - higherRange.min) / data.totalEntries) * 100,
  } : null;

  const above300 = data ? estimateHigherRange(data, 300) : null;
  const above270 = data ? estimateHigherRange(data, 270) : null;

  const maxCount = data ? Math.max(1, ...data.chartBuckets.map((b) => b.count)) : 1;

  const sliderStyle = (v: number) => ({
    background: `linear-gradient(90deg, #0f0e0b ${(v / SCORE_MAX) * 100}%, rgba(15,14,11,0.14) ${(v / SCORE_MAX) * 100}%)`,
  });

  return (
    <main style={{ paddingBottom: '72px' }}>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden mb-6"
        style={{
          background: '#badbee',
          border: '1px solid rgba(15,14,11,0.12)',
          padding: 'clamp(76px,10vw,128px) clamp(22px,5vw,72px) clamp(44px,7vw,76px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          minHeight: 'clamp(280px,42vw,380px)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(15,14,11,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(15,14,11,0.14) 1px,transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.14,
          }}
        />
        <p
          className="relative"
          style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, color: '#3d3b34', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}
        >
          <span className="inline-block rounded-full bg-[#0f0e0b] mr-[9px]" style={{ width: '7px', height: '7px', verticalAlign: '1px' }} />
          BITSAT · Score data · 1500+ datapoints
        </p>
        <h1
          className="relative"
          style={{ fontFamily: 'Dopis, system-ui, sans-serif', fontSize: 'clamp(52px,8vw,108px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.03em', color: '#0f0e0b', margin: 0 }}
        >
          BITSAT Score
          <br />
          <em style={{ fontFamily: 'Season Serif, Georgia, serif', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.02em' }}>
            Analysis.
          </em>
        </h1>
      </section>

      {/* Dataset tabs */}
      <section
        style={{
          padding: 'clamp(20px,3vw,34px)',
          border: '1px solid rgba(15,14,11,0.1)',
          borderRadius: '12px',
          background: '#f0efe6',
          marginBottom: '18px',
        }}
      >
        <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, color: '#3d3b34', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
          Score data source
        </p>
        <div
          role="tablist"
          aria-label="Score data source"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '10px' }}
          className="max-sm:!grid-cols-1"
        >
          {Object.entries(DATASETS).map(([key, cfg]) => {
            const active = activeDataset === key;
            const dotColor = key === 'phodu' ? '#e39ff6' : '#4da3ff';
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => loadDataset(key)}
                style={{
                  appearance: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  display: 'grid',
                  alignContent: 'center',
                  gap: '6px',
                  minHeight: '82px',
                  padding: '16px 18px',
                  borderRadius: '10px',
                  border: active ? '1px solid #0f0e0b' : '1px solid rgba(15,14,11,0.16)',
                  background: active ? '#0f0e0b' : 'rgba(249,249,240,0.58)',
                  transition: 'all 0.18s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontFamily: 'Akkurat Mono, monospace', fontWeight: 700, fontSize: '14px', color: active ? '#f9f9f0' : '#0f0e0b' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                  {cfg.label}
                </div>
                <div style={{ fontSize: '12px', color: active ? 'rgba(249,249,240,0.68)' : '#9d937c', fontFamily: 'Akkurat Mono, monospace' }}>
                  Dataset · 10-mark buckets
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Percentile checker */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.18fr) minmax(280px,.82fr)',
          gap: '18px',
          padding: 'clamp(20px,3vw,34px)',
          border: '1px solid rgba(15,14,11,0.1)',
          borderRadius: '12px',
          background: '#f0efe6',
          marginBottom: '18px',
          alignItems: 'stretch',
        }}
        className="max-md:!grid-cols-1"
        aria-label="Compare your score with the selected dataset"
      >
        {/* Input side */}
        <div
          style={{
            border: '1px solid rgba(15,14,11,0.12)',
            borderRadius: '12px',
            background: '#f9f9f0',
            padding: '18px',
            display: 'grid',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
            <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, color: '#3d3b34', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              Your BITSAT score
            </p>
            <span style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: '13px', color: '#9d937c' }}>enter total marks</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '14px',
              minHeight: '92px',
              padding: '16px 18px',
              border: '1px solid rgba(15,14,11,0.1)',
              borderRadius: '12px',
              background: '#f9f9f0',
            }}
          >
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
              style={{
                width: 'min(100%, 360px)',
                minWidth: 0,
                border: 0,
                background: 'transparent',
                color: '#0f0e0b',
                fontFamily: 'Season Serif, Georgia, serif',
                fontSize: 'clamp(2.75rem, 7vw, 4.45rem)',
                fontWeight: 400,
                lineHeight: 0.94,
                letterSpacing: '-0.07em',
                outline: 'none',
              }}
            />
            <span style={{ flexShrink: 0, paddingBottom: '8px', color: '#9d937c', fontFamily: 'Season Serif, Georgia, serif', fontSize: 'clamp(1.15rem,2.6vw,1.7rem)', fontWeight: 400, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>
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
            style={{ ...sliderStyle(compareScore ?? 0), width: '100%', cursor: 'pointer' }}
          />
          <p style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: '14px', color: '#9d937c', margin: 0 }}>
            Compare your score against the selected bucketed public dataset.
          </p>
        </div>

        {/* Result side */}
        <div
          aria-live="polite"
          style={{
            border: '1px solid rgba(15,14,11,0.12)',
            borderRadius: '12px',
            background: '#0f0e0b',
            color: '#f9f9f0',
            padding: '18px',
            display: 'grid',
            alignContent: 'center',
            gap: '10px',
          }}
        >
          <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, color: 'rgba(249,249,240,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            Estimated higher range
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(12px,2.5vw,22px)', flexWrap: 'wrap' }}>
            <strong style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: 'clamp(3rem,7.5vw,5.25rem)', fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.075em', color: '#f9f9f0' }}>
              {loading ? '—' : higherRange ? formatRange(higherRange) : '—'}
            </strong>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '40px',
                marginBottom: '0.22em',
                padding: '8px 13px',
                borderRadius: '9999px',
                border: '1px solid rgba(249,249,240,0.25)',
                background: 'rgba(249,249,240,0.08)',
                color: '#f9f9f0',
                fontFamily: 'Akkurat Mono, monospace',
                fontSize: 'clamp(1.05rem,2.4vw,1.55rem)',
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: '-0.045em',
                whiteSpace: 'nowrap',
              }}
            >
              {loading ? '— %ile' : formatPercentileRange(percentileRange)}
            </span>
          </div>
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(249,249,240,0.2)',
              background: 'rgba(249,249,240,0.08)',
              color: 'rgba(249,249,240,0.68)',
              fontFamily: 'Akkurat Mono, monospace',
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: 1.15,
              width: 'fit-content',
            }}
          >
            {config.label} · {data ? `${formatNumber(data.totalEntries)} bucketed entries` : 'loading...'}
          </div>
          <p style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: '13px', color: 'rgba(249,249,240,0.6)', lineHeight: 1.5, margin: 0 }}>
            {compareScore !== null && data
              ? `Exact marks are hidden in ${data.bucketSize}-mark buckets. ${formatRange(higherRange)} of ${formatNumber(data.totalEntries)} entries may be above a score in the ${Math.floor(compareScore / data.bucketSize) * data.bucketSize}–${Math.min(Math.floor(compareScore / data.bucketSize) * data.bucketSize + data.bucketSize - 1, data.scoreMax)} bucket. Percentile estimate: ${formatPercentileRange(percentileRange)}.`
              : 'Enter your score to compare it with the selected data source.'}
          </p>
        </div>
      </section>

      {/* Data panel */}
      <section
        aria-live="polite"
        style={{
          padding: 'clamp(20px,3vw,34px)',
          border: '1px solid rgba(15,14,11,0.1)',
          borderRadius: '12px',
          background: '#f0efe6',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap', marginBottom: '22px' }}>
          <div style={{ minWidth: 'min(100%, 520px)', maxWidth: '760px' }}>
            <p style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '11px', fontWeight: 500, color: '#3d3b34', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>
              {loading ? 'Loading...' : config.eyebrow}
            </p>
            <h2 style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: 'clamp(2rem,4.2vw,3.35rem)', fontWeight: 400, lineHeight: 0.98, letterSpacing: '-0.06em', color: '#0f0e0b', margin: '8px 0 0' }}>
              {loading ? 'Loading...' : config.heading}
            </h2>
            <p style={{ fontFamily: 'Season Serif, Georgia, serif', fontSize: 'clamp(.96rem,1.3vw,1.08rem)', color: '#3d3b34', lineHeight: 1.58, margin: '12px 0 0', maxWidth: '66ch' }}>
              {loading ? '' : config.copy}
            </p>
          </div>
        </div>

        {/* Metric cards */}
        {data && !loading && (
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '12px', margin: '18px 0 22px' }}
            className="max-md:!grid-cols-2 max-sm:!grid-cols-1"
          >
            {[
              { label: 'Above 300 est.', value: above300 ? formatRange(above300) : '--' },
              { label: 'Above 270 est.', value: above270 ? formatRange(above270) : '--' },
              { label: 'Mean est.', value: `~ ${formatScoreStat(data.meanScore)}` },
              { label: 'Median bucket', value: data.medianRange || '--' },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  border: '1px solid rgba(15,14,11,0.12)',
                  borderRadius: '12px',
                  background: '#f9f9f0',
                  padding: '16px',
                  minWidth: 0,
                }}
              >
                <span style={{ display: 'block', color: '#9d937c', fontFamily: 'Akkurat Mono, monospace', fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  {m.label}
                </span>
                <strong style={{ display: 'block', marginTop: '8px', color: '#0f0e0b', fontFamily: 'Season Serif, Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.75rem,4vw,2.6rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
                  {m.value}
                </strong>
              </div>
            ))}
          </div>
        )}

        {/* Loading / error state */}
        {loading && (
          <div style={{ padding: '20px', border: '1px solid rgba(15,14,11,0.1)', borderRadius: '12px', background: '#f9f9f0', color: '#9d937c', textAlign: 'center', fontFamily: 'Akkurat Mono, monospace', fontSize: '13px' }}>
            {config.loading}
          </div>
        )}
        {error && (
          <div style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.09)', color: '#854d0e', fontFamily: 'Akkurat Mono, monospace', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {/* Chart */}
        {data && !loading && (
          <article
            style={{
              border: '1px solid rgba(15,14,11,0.12)',
              borderRadius: '12px',
              background: '#f9f9f0',
              overflow: 'hidden',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap',
                padding: '18px 20px',
                borderBottom: '1px solid rgba(15,14,11,0.1)',
                background: '#efecca',
              }}
            >
              <h3 style={{ margin: 0, color: '#0f0e0b', fontFamily: 'Season Serif, Georgia, serif', letterSpacing: '-0.035em', fontSize: 'clamp(1.2rem,2.8vw,1.55rem)', fontWeight: 400 }}>
                Distribution
              </h3>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
                  padding: '8px 13px',
                  borderRadius: '9999px',
                  background: '#0f0e0b',
                  border: '1px solid #0f0e0b',
                  color: '#f9f9f0',
                  fontFamily: 'Akkurat Mono, monospace',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {config.label} · {formatNumber(data.totalEntries)} bucketed entries
              </span>
            </div>
            <div style={{ overflowX: 'auto', overflowY: 'visible', padding: '22px 0', WebkitOverflowScrolling: 'touch' }}>
              <div
                role="img"
                aria-label={`Score distribution chart for ${config.label}`}
                style={{
                  position: 'relative',
                  width: '100%',
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
                  const height = Math.max(b.count > 0 ? 2 : 0, Math.round((b.count / maxCount) * 100));
                  const label = i % 2 === 0 ? String(b.start) : '';
                  const isCompare = compareScore !== null && compareScore >= b.start && compareScore <= b.end;

                  return (
                    <div
                      key={b.start}
                      className="relative h-full flex items-end justify-center"
                      style={{ minWidth: 0 }}
                    >
                      <div
                        tabIndex={0}
                        role="button"
                        aria-label={`Score ${b.start}–${b.end}: ${b.count} entries, cumulative ${b.cumulative}`}
                        style={{
                          position: 'relative',
                          width: '100%',
                          minHeight: '3px',
                          height: `${height}%`,
                          borderRadius: '5px 5px 2px 2px',
                          background: isCompare
                            ? 'linear-gradient(180deg, #0f0e0b, #3d3b34)'
                            : 'linear-gradient(180deg, #3d3b34, #21201c)',
                          border: isCompare
                            ? '1px solid rgba(15,14,11,0.6)'
                            : '1px solid rgba(15,14,11,0.2)',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                        onFocus={(e) => {
                          const tt = e.currentTarget.querySelector('.tt') as HTMLElement;
                          if (tt) tt.style.display = 'block';
                        }}
                        onBlur={(e) => {
                          const tt = e.currentTarget.querySelector('.tt') as HTMLElement;
                          if (tt) tt.style.display = 'none';
                        }}
                        onMouseEnter={(e) => {
                          const tt = e.currentTarget.querySelector('.tt') as HTMLElement;
                          if (tt) tt.style.display = 'block';
                        }}
                        onMouseLeave={(e) => {
                          const tt = e.currentTarget.querySelector('.tt') as HTMLElement;
                          if (tt) tt.style.display = 'none';
                        }}
                      >
                        {/* Tooltip */}
                        <div
                          className="tt"
                          style={{
                            display: 'none',
                            position: 'absolute',
                            left: '50%',
                            bottom: 'calc(100% + 10px)',
                            transform: 'translateX(-50%)',
                            width: 'max-content',
                            maxWidth: '240px',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: '#0f0e0b',
                            border: '1px solid rgba(249,249,240,0.15)',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.28)',
                            color: '#f9f9f0',
                            lineHeight: 1.45,
                            fontSize: '12px',
                            fontFamily: 'Akkurat Mono, monospace',
                            pointerEvents: 'none',
                            zIndex: 20,
                          }}
                        >
                          <strong style={{ display: 'block', color: '#d5fad3', fontSize: '13px', marginBottom: '5px' }}>
                            Score {b.start}–{b.end}
                          </strong>
                          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Entries: {formatNumber(b.count)}</span>
                          <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Cumulative: {formatNumber(b.cumulative)}</span>
                        </div>
                      </div>
                      {/* Label */}
                      <span
                        style={{
                          position: 'absolute',
                          left: i === 0 ? '0' : i === data.chartBuckets.length - 1 ? 'auto' : '50%',
                          right: i === data.chartBuckets.length - 1 ? '0' : 'auto',
                          bottom: '-36px',
                          transform: i === 0 || i === data.chartBuckets.length - 1 ? 'none' : 'translateX(-50%)',
                          color: '#9d937c',
                          fontFamily: 'Akkurat Mono, monospace',
                          fontSize: 'clamp(.58rem,.9vw,.68rem)',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          letterSpacing: '-0.02em',
                          lineHeight: 1,
                        }}
                      >
                        {label}
                      </span>
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
