"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
} from "@/lib/predictorData";

const CAMPUS_PINS: Record<string, string> = {
  Pilani: "📍",
  Goa: "🌊",
  Hyderabad: "🏙",
};
const TIER_LABELS: Record<Tier, string> = {
  safe: "Safe",
  target: "Target",
  unlikely: "Unlikely",
};
const TIER_STYLES: Record<Tier, React.CSSProperties> = {
  safe: {
    color: "#166534",
    background: "rgba(22,163,74,0.09)",
    border: "1px solid rgba(22,163,74,0.25)",
  },
  target: {
    color: "#854d0e",
    background: "rgba(234,179,8,0.09)",
    border: "1px solid rgba(234,179,8,0.25)",
  },
  unlikely: {
    color: "#991b1b",
    background: "rgba(220,38,38,0.09)",
    border: "1px solid rgba(220,38,38,0.25)",
  },
};
const TIER_ROW_BG: Record<Tier, string> = {
  safe: "linear-gradient(90deg, rgba(213,250,211,0.6) 0%, #f0efe6 35%)",
  target: "linear-gradient(90deg, rgba(239,236,202,0.8) 0%, #f0efe6 35%)",
  unlikely: "linear-gradient(90deg, rgba(186,219,238,0.55) 0%, #f0efe6 35%)",
};

export default function PredictorClient() {
  const [rows, setRows] = useState<CutoffRow[]>([]);
  const [score, setScore] = useState(295);
  const [model, setModel] = useState<ModelKey>("phodu");
  const [outlook, setOutlook] = useState(50);
  const [branchFilter, setBranchFilter] = useState<string[]>([]);
  const [results, setResults] = useState<PredictedRow[]>([]);
  const [activeTier, setActiveTier] = useState<Tier>("safe");
  const [showResults, setShowResults] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);
  const scoreInputRef = useRef<HTMLInputElement>(null);

  // Load CSV
  useEffect(() => {
    fetch("/assets/data/predictor-cutoffs.csv?v=3")
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

  // Sync slider fill
  const sliderStyle = (value: number, min: number, max: number) => ({
    background: `linear-gradient(90deg, #0f0e0b ${((value - min) / (max - min)) * 100}%, rgba(15,14,11,0.14) ${((value - min) / (max - min)) * 100}%)`,
  });

  const outlookLabel =
    outlook < 25
      ? "Doomer"
      : outlook < 45
        ? "Pessimistic"
        : outlook < 55
          ? "Neutral"
          : outlook < 75
            ? "Optimistic"
            : "Hopium";

  const handlePredict = useCallback(() => {
    const predicted = computePredictions(
      rows,
      score,
      model,
      outlook,
      branchFilter,
    );
    setResults(predicted);
    setShowResults(true);
    const hasSafe = predicted.some((r) => r.tier === "safe");
    setActiveTier(
      hasSafe
        ? "safe"
        : predicted.some((r) => r.tier === "target")
          ? "target"
          : "unlikely",
    );
  }, [rows, score, model, outlook, branchFilter]);

  const tierCounts = { safe: 0, target: 0, unlikely: 0 };
  results.forEach((r) => {
    tierCounts[r.tier]++;
  });
  const visibleResults = results.filter((r) => r.tier === activeTier);

  const toggleBranch = (branch: string) => {
    setBranchFilter((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch],
    );
  };

  return (
    <main
      className="w-full"
      style={{ maxWidth: "1180px", margin: "0 auto", padding: "86px 0 88px" }}
    >
      {/* Hero */}
      <section
        className="relative w-full mb-6 overflow-hidden"
        style={{
          background: "#d5fad3",
          border: "1px solid rgba(15,14,11,0.12)",
          padding:
            "clamp(76px,10vw,128px) clamp(22px,5vw,72px) clamp(44px,7vw,76px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          minHeight: "clamp(280px,42vw,440px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,14,11,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(15,14,11,0.14) 1px,transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.14,
          }}
        />
        <p
          className="relative"
          style={{
            fontFamily: "Akkurat Mono, monospace",
            fontSize: "11px",
            fontWeight: 500,
            color: "#3d3b34",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "14px",
          }}
        >
          <span
            className="inline-block rounded-full bg-[#0f0e0b] mr-[9px]"
            style={{ width: "7px", height: "7px", verticalAlign: "1px" }}
          />
          BITSAT · BITS 2026 · 3 Campuses
        </p>
        <h1
          className="relative"
          style={{
            fontFamily: "Dopis, system-ui, sans-serif",
            fontSize: "clamp(52px,8vw,108px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#0f0e0b",
            margin: 0,
          }}
        >
          BITS College
          <br />
          <em
            style={{
              fontFamily: "Dopis, system-ui, sans-serif",
              fontStyle: "normal",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            Predictor.
          </em>
        </h1>
      </section>

      {/* Controls */}
      <section
        className="px-0"
        style={{ display: "grid", gap: "18px", padding: "0 0 18px" }}
      >
        {/* Disclaimer */}
        <div
          className="flex items-start gap-3"
          style={{
            padding: "16px 20px",
            border: "1px solid rgba(15,14,11,0.14)",
            borderRadius: "12px",
            background: "#efecca",
            color: "#3d3b34",
            fontFamily: "Season Serif, Georgia, serif",
          }}
        >
          <span
            className="flex-shrink-0 inline-flex items-center justify-center text-[#f9f9f0] bg-[#0f0e0b] rounded-full text-sm font-bold"
            style={{
              width: "28px",
              height: "28px",
              marginTop: "1px",
              fontFamily: "Akkurat Mono, monospace",
            }}
          >
            !
          </span>
          <span style={{ fontSize: "15px", lineHeight: 1.6 }}>
            No one can predict cutoffs with complete accuracy, however these are
            the predictions from the top BITSAT Teachers — Phodu Club, MathonGo,
            and Canvas Classes.
          </span>
        </div>

        {/* Model picker */}
        <div
          style={{
            padding: "clamp(20px,3vw,34px)",
            border: "1px solid rgba(15,14,11,0.1)",
            borderRadius: "12px",
            background: "#f0efe6",
          }}
        >
          <p
            style={{
              fontFamily: "Akkurat Mono, monospace",
              fontSize: "11px",
              fontWeight: 500,
              color: "#3d3b34",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "14px",
            }}
          >
            Prediction model
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,minmax(0,1fr))",
              gap: "10px",
            }}
            className="max-sm:!grid-cols-1"
          >
            {MODEL_ORDER.map((key) => {
              const m = MODELS[key];
              const active = model === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setModel(key)}
                  style={{
                    appearance: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    display: "grid",
                    gap: "6px",
                    padding: "16px 18px",
                    borderRadius: "10px",
                    border: active
                      ? "1px solid #0f0e0b"
                      : "1px solid rgba(15,14,11,0.16)",
                    background: active ? "#0f0e0b" : "rgba(249,249,240,0.58)",
                    color: active ? "#f9f9f0" : "#3d3b34",
                    transition: "all 0.18s ease",
                    minHeight: "74px",
                    alignContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      fontWeight: 700,
                      fontSize: "15px",
                      fontFamily: "Akkurat Mono, monospace",
                      color: active ? "#f9f9f0" : "#0f0e0b",
                    }}
                  >
                    <span
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: "10px",
                        height: "10px",
                        background: active ? m.color : "#9d937c",
                      }}
                    />
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: active ? "rgba(249,249,240,0.68)" : "#9d937c",
                      lineHeight: 1.45,
                    }}
                  >
                    {m.rule}
                  </div>
                  <a
                    href={m.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: "11px",
                      color: active ? "rgba(249,249,240,0.5)" : "#9d937c",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "Akkurat Mono, monospace",
                    }}
                  >
                    ↗ {m.srcLabel}
                  </a>
                </button>
              );
            })}
          </div>
        </div>

        {/* Score + Branch */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.25fr) minmax(300px,0.85fr)",
            gap: "18px",
          }}
          className="max-md:!grid-cols-1"
        >
          {/* Score input */}
          <div
            style={{
              padding: "clamp(20px,3vw,34px)",
              border: "1px solid rgba(15,14,11,0.1)",
              borderRadius: "12px",
              background: "#f0efe6",
            }}
          >
            <p
              style={{
                fontFamily: "Akkurat Mono, monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "#3d3b34",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}
            >
              Your BITSAT score
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                padding: "14px 20px",
                border: "1px solid rgba(15,14,11,0.1)",
                borderRadius: "12px",
                background: "#f9f9f0",
              }}
            >
              <input
                ref={scoreInputRef}
                aria-label="BITSAT total score"
                type="number"
                min={0}
                max={390}
                value={score}
                onChange={(e) => {
                  const v = Math.max(0, Math.min(390, Number(e.target.value)));
                  setScore(v);
                }}
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: 0,
                  background: "transparent",
                  color: "#0f0e0b",
                  fontFamily: "Season Serif, Georgia, serif",
                  fontSize: "clamp(40px,6vw,62px)",
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  outline: "none",
                  padding: 0,
                }}
              />
              <span
                style={{
                  color: "#9d937c",
                  fontWeight: 400,
                  fontSize: "clamp(18px,2.4vw,24px)",
                  whiteSpace: "nowrap",
                  fontFamily: "Season Serif, Georgia, serif",
                }}
              >
                / 390
              </span>
            </div>
            <div style={{ margin: "18px 2px 4px" }}>
              <input
                aria-label="BITSAT score slider"
                type="range"
                min={0}
                max={390}
                step={1}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                style={sliderStyle(score, 0, 390)}
              />
            </div>
          </div>

          {/* Branch filter */}
          <div
            style={{
              padding: "clamp(20px,3vw,34px)",
              border: "1px solid rgba(15,14,11,0.1)",
              borderRadius: "12px",
              background: "#f0efe6",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <p
              style={{
                fontFamily: "Akkurat Mono, monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "#3d3b34",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              Filter by branch
            </p>
            <p
              style={{
                fontFamily: "Season Serif, Georgia, serif",
                fontSize: "13px",
                color: "#9d937c",
                marginBottom: "16px",
              }}
            >
              Leave empty to see all branches
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {branches.map((b) => {
                const active = branchFilter.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBranch(b)}
                    style={{
                      appearance: "none",
                      cursor: "pointer",
                      fontFamily: "Akkurat Mono, monospace",
                      fontWeight: 500,
                      fontSize: "11px",
                      color: active ? "#f9f9f0" : "#3d3b34",
                      padding: "7px 12px",
                      border: active
                        ? "1px solid #0f0e0b"
                        : "1px solid rgba(15,14,11,0.16)",
                      borderRadius: "9999px",
                      background: active ? "#0f0e0b" : "rgba(249,249,240,0.58)",
                      transition: "all 0.18s ease",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Outlook slider */}
        <div
          style={{
            padding: "22px 24px",
            border: "1px solid rgba(15,14,11,0.1)",
            borderRadius: "12px",
            background: "#badbee",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "14px",
              marginBottom: "6px",
            }}
          >
            <p
              style={{
                fontFamily: "Akkurat Mono, monospace",
                fontSize: "11px",
                fontWeight: 500,
                color: "#3d3b34",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: 0,
              }}
            >
              Cutoff outlook
            </p>
            <span
              style={{
                fontFamily: "Season Serif, Georgia, serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "#0f0e0b",
              }}
            >
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
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              color: "#9d937c",
              fontFamily: "Akkurat Mono, monospace",
              fontSize: "10px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <span>Doomer · closes high</span>
            <span style={{ color: "#3d3b34" }}>Neutral</span>
            <span>Hopium · closes low</span>
          </div>
        </div>

        {/* Predict button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={handlePredict}
            disabled={rows.length === 0}
            style={{
              appearance: "none",
              cursor: rows.length === 0 ? "not-allowed" : "pointer",
              fontFamily: "Akkurat Mono, monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              minHeight: "48px",
              padding: "0 30px",
              borderRadius: "9999px",
              border: "1px solid #0f0e0b",
              background: "#0f0e0b",
              color: "#f9f9f0",
              opacity: rows.length === 0 ? 0.5 : 1,
              transition: "all 0.18s ease",
            }}
            onMouseEnter={(e) => {
              if (rows.length > 0)
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#3d3b34";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#0f0e0b";
            }}
          >
            Predict my BITS programmes →
          </button>
        </div>
      </section>

      {/* Results */}
      {showResults && (
        <section
          aria-label="Predicted programmes"
          style={{ paddingBottom: "8px" }}
        >
          {/* Results header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "8px 16px",
              margin: "34px 0 14px",
            }}
          >
            <h2
              style={{
                fontFamily: "Season Serif, Georgia, serif",
                fontSize: "clamp(32px,4vw,54px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "#0f0e0b",
                margin: 0,
              }}
            >
              Your <em style={{ fontStyle: "italic" }}>predicted</em> programmes
            </h2>
            <span
              style={{
                fontFamily: "Akkurat Mono, monospace",
                fontSize: "13px",
                color: "#9d937c",
                fontWeight: 500,
              }}
            >
              Score <b style={{ color: "#0f0e0b", fontWeight: 700 }}>{score}</b>{" "}
              · {MODELS[model].name} · {outlookLabel}
            </span>
          </div>

          {/* Tier pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {(["safe", "target", "unlikely"] as Tier[]).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setActiveTier(tier)}
                style={{
                  appearance: "none",
                  cursor: "pointer",
                  fontFamily: "Akkurat Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "8px 14px",
                  borderRadius: "9999px",
                  border:
                    activeTier === tier
                      ? "1px solid #0f0e0b"
                      : "1px solid rgba(15,14,11,0.16)",
                  background:
                    activeTier === tier ? "#0f0e0b" : "rgba(249,249,240,0.58)",
                  color: activeTier === tier ? "#f9f9f0" : "#3d3b34",
                  opacity: tierCounts[tier] === 0 ? 0.4 : 1,
                  transition: "all 0.18s ease",
                }}
              >
                {TIER_LABELS[tier]} · {tierCounts[tier]}
              </button>
            ))}
          </div>

          {/* Result rows */}
          <div style={{ display: "grid", gap: "12px", marginBottom: "18px" }}>
            {visibleResults.length === 0 ? (
              <div
                style={{
                  padding: "20px",
                  border: "1px solid rgba(15,14,11,0.1)",
                  borderRadius: "12px",
                  background: "#f0efe6",
                  color: "#9d937c",
                  fontFamily: "Akkurat Mono, monospace",
                  fontSize: "13px",
                }}
              >
                No programmes in this tier with the current filters.
              </div>
            ) : (
              visibleResults.map((r) => (
                <div
                  key={`${r.campus}-${r.programme}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) auto",
                    alignItems: "center",
                    gap: "16px 24px",
                    padding: "22px 24px",
                    borderRadius: "12px",
                    border: "1px solid rgba(15,14,11,0.12)",
                    background: TIER_ROW_BG[r.tier],
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: "Season Serif, Georgia, serif",
                          fontSize: "clamp(19px,2.2vw,25px)",
                          fontWeight: 400,
                          letterSpacing: "-0.03em",
                          lineHeight: 1.12,
                          color: "#0f0e0b",
                        }}
                      >
                        {r.programme}
                      </h3>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontFamily: "Akkurat Mono, monospace",
                          fontSize: "10px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          padding: "5px 9px",
                          borderRadius: "9999px",
                          ...TIER_STYLES[r.tier],
                        }}
                      >
                        {TIER_LABELS[r.tier]}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "5px 14px",
                        fontFamily: "Season Serif, Georgia, serif",
                        fontSize: "14px",
                        color: "#3d3b34",
                        lineHeight: 1.55,
                      }}
                    >
                      <span>
                        <span style={{ color: "#9d937c" }}>
                          {CAMPUS_PINS[r.campus] || "📌"}{" "}
                        </span>
                        <b style={{ color: "#0f0e0b", fontWeight: 600 }}>
                          {r.campus}
                        </b>
                      </span>
                      <span style={{ color: "#9d937c" }}>·</span>
                      <span>
                        <span style={{ color: "#9d937c" }}>2025 close </span>
                        <b style={{ color: "#0f0e0b", fontWeight: 700 }}>
                          {r.close2025}
                        </b>
                      </span>
                      <span style={{ color: "#9d937c" }}>·</span>
                      <span>
                        <span style={{ color: "#9d937c" }}>predicted </span>
                        <b style={{ color: "#0f0e0b", fontWeight: 700 }}>
                          {r.predictedCutoff}
                        </b>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      justifyItems: "end",
                      gap: "2px",
                      minWidth: "78px",
                      textAlign: "right",
                    }}
                  >
                    <strong
                      style={{
                        fontFamily: "Season Serif, Georgia, serif",
                        fontSize: "clamp(22px,2.3vw,30px)",
                        lineHeight: 1,
                        fontWeight: 400,
                        letterSpacing: "-0.04em",
                        color:
                          r.margin > 0
                            ? "#166534"
                            : r.margin < 0
                              ? "#991b1b"
                              : "#0f0e0b",
                      }}
                    >
                      {r.margin > 0 ? "+" : ""}
                      {r.margin}
                    </strong>
                    <span
                      style={{
                        fontFamily: "Akkurat Mono, monospace",
                        color: "#9d937c",
                        fontSize: "11px",
                        fontWeight: 500,
                        textTransform: "lowercase",
                        letterSpacing: "0.02em",
                      }}
                    >
                      marks margin
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Note */}
          <div
            style={{
              padding: "18px 20px",
              border: "1px solid rgba(15,14,11,0.1)",
              borderRadius: "12px",
              background: "#f0efe6",
              color: "#3d3b34",
              fontFamily: "Season Serif, Georgia, serif",
              fontSize: "14px",
              lineHeight: 1.65,
            }}
          >
            Ranked using <b>score − predicted</b>. Safe means more than 7 marks
            above the predicted cutoff, Target means within ±7 marks of it, and
            Unlikely means more than 7 marks below it. The predicted cutoff
            moves with the outlook slider. This is a statistical estimate, not a
            guarantee.
          </div>
        </section>
      )}
    </main>
  );
}
