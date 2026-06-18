/* Pure CSS draw animation — no JS getTotalLength needed */
export default function BitsSketchHero() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Floating decorative squares */}
      {[
        { top: '8%',  left: '4%',  size: 9,  del: '0.2s', dur: '5s' },
        { top: '20%', left: '16%', size: 7,  del: '0.8s', dur: '4s' },
        { top: '72%', left: '6%',  size: 9,  del: '0.4s', dur: '6s' },
        { top: '84%', left: '20%', size: 6,  del: '1.0s', dur: '5s' },
        { top: '6%',  right: '5%', size: 9,  del: '0.6s', dur: '4.5s' },
        { top: '18%', right: '14%',size: 7,  del: '0.3s', dur: '5.5s' },
        { top: '74%', right: '6%', size: 9,  del: '0.9s', dur: '4s' },
        { top: '86%', right: '18%',size: 6,  del: '0.1s', dur: '6s' },
      ].map((s, i) => (
        <span
          key={i}
          className="float-slow"
          style={{
            position: 'absolute',
            top: s.top,
            left: (s as any).left,
            right: (s as any).right,
            width: s.size,
            height: s.size,
            border: '1px solid rgba(15,14,11,0.35)',
            animationDelay: s.del,
            animationDuration: s.dur,
          }}
        />
      ))}

      {/* BITS Pilani architectural sketch */}
      <svg
        viewBox="0 0 560 370"
        fill="none"
        stroke="#21201c"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: '100%', maxWidth: '560px', height: 'auto' }}
        aria-label="Animated architectural sketch of BITS Pilani"
        role="img"
      >
        {/* Ground */}
        <line className="draw draw-d2" x1="28" y1="312" x2="532" y2="312" strokeWidth="1.4" />

        {/* Steps */}
        <rect className="draw draw-d3" x="258" y="306" width="64" height="6" strokeWidth="0.9" />
        <rect className="draw draw-d3" x="249" y="300" width="82" height="6" strokeWidth="0.9" />

        {/* ── MAIN CENTRAL BLOCK ── */}
        <rect className="draw draw-d3" x="238" y="185" width="104" height="127" />

        {/* Central tower shaft */}
        <rect className="draw draw-d4" x="262" y="132" width="56" height="53" />

        {/* Tower upper section */}
        <rect className="draw draw-d5" x="272" y="92" width="36" height="40" />

        {/* Arched top of upper section */}
        <path className="draw draw-d5" d="M272,92 Q290,76 308,92" />

        {/* Clock circle */}
        <circle className="draw draw-d6" cx="290" cy="110" r="13" strokeWidth="1.1" />
        {/* Clock hands */}
        <line className="draw-short draw-d7" x1="290" y1="110" x2="290" y2="100" strokeWidth="1.5" />
        <line className="draw-short draw-d7" x1="290" y1="110" x2="298" y2="110" strokeWidth="1.5" />

        {/* Tower finial / spire */}
        <polyline className="draw draw-d6" points="278,92 290,68 302,92" />
        <line className="draw draw-d7" x1="290" y1="68" x2="290" y2="56" strokeWidth="1.3" />
        <line className="draw-short draw-d8" x1="286" y1="60" x2="294" y2="60" strokeWidth="1.3" />

        {/* Central entrance arch */}
        <rect className="draw draw-d5" x="268" y="240" width="44" height="72" />
        <path className="draw draw-d5" d="M268,240 Q290,220 312,240" />

        {/* Horizontal cornice line */}
        <line className="draw draw-d4" x1="238" y1="205" x2="342" y2="205" strokeWidth="0.8" />

        {/* ── LEFT WING ── */}
        <rect className="draw draw-d3" x="112" y="218" width="126" height="94" />
        {/* Left wing parapet / top */}
        <rect className="draw draw-d4" x="118" y="206" width="114" height="12" />
        {/* Left wing columns */}
        {[132, 151, 170, 189, 208].map((x, i) => (
          <line key={i} className="draw draw-d5" x1={x} y1="218" x2={x} y2="284" strokeWidth="0.8" />
        ))}
        {/* Left wing arch windows */}
        {[135, 163].map((x, i) => (
          <g key={i}>
            <rect className="draw draw-d6" x={x} y="236" width="20" height="32" strokeWidth="0.85" />
            <path className="draw draw-d6" d={`M${x},236 Q${x + 10},225 ${x + 20},236`} strokeWidth="0.85" />
          </g>
        ))}
        {/* Left turret */}
        <rect className="draw draw-d4" x="110" y="192" width="18" height="26" />
        <polyline className="draw draw-d4" points="110,192 119,178 128,192" />

        {/* ── RIGHT WING ── */}
        <rect className="draw draw-d3" x="342" y="218" width="126" height="94" />
        {/* Right wing parapet */}
        <rect className="draw draw-d4" x="342" y="206" width="114" height="12" />
        {/* Right wing columns */}
        {[360, 379, 398, 417, 436].map((x, i) => (
          <line key={i} className="draw draw-d5" x1={x} y1="218" x2={x} y2="284" strokeWidth="0.8" />
        ))}
        {/* Right wing arch windows */}
        {[363, 391].map((x, i) => (
          <g key={i}>
            <rect className="draw draw-d6" x={x} y="236" width="20" height="32" strokeWidth="0.85" />
            <path className="draw draw-d6" d={`M${x},236 Q${x + 10},225 ${x + 20},236`} strokeWidth="0.85" />
          </g>
        ))}
        {/* Right turret */}
        <rect className="draw draw-d4" x="452" y="192" width="18" height="26" />
        <polyline className="draw draw-d4" points="452,192 461,178 470,192" />

        {/* ── FAR LEFT BUILDING ── */}
        <rect className="draw draw-d3" x="44" y="248" width="68" height="64" />
        <line className="draw draw-d4" x1="44" y1="266" x2="112" y2="266" strokeWidth="0.75" />
        {[[52,252],[70,252],[52,272],[70,272]].map(([x,y],i)=>(
          <rect key={i} className="draw draw-d5" x={x} y={y} width="11" height="9" strokeWidth="0.7" />
        ))}

        {/* ── FAR RIGHT BUILDING ── */}
        <rect className="draw draw-d3" x="448" y="248" width="68" height="64" />
        <line className="draw draw-d4" x1="448" y1="266" x2="516" y2="266" strokeWidth="0.75" />
        {[[456,252],[474,252],[456,272],[474,272]].map(([x,y],i)=>(
          <rect key={i} className="draw draw-d5" x={x} y={y} width="11" height="9" strokeWidth="0.7" />
        ))}

        {/* ── TREES (left) ── */}
        <line className="draw draw-d8" x1="74" y1="312" x2="74" y2="290" strokeWidth="1.1" />
        <ellipse className="draw draw-d9" cx="74" cy="280" rx="11" ry="15" strokeWidth="0.9" />
        <line className="draw draw-d8" x1="97" y1="312" x2="97" y2="295" strokeWidth="1.1" />
        <ellipse className="draw draw-d9" cx="97" cy="286" rx="9" ry="13" strokeWidth="0.9" />

        {/* ── TREES (right) ── */}
        <line className="draw draw-d8" x1="476" y1="312" x2="476" y2="290" strokeWidth="1.1" />
        <ellipse className="draw draw-d9" cx="476" cy="280" rx="11" ry="15" strokeWidth="0.9" />
        <line className="draw draw-d8" x1="499" y1="312" x2="499" y2="295" strokeWidth="1.1" />
        <ellipse className="draw draw-d9" cx="499" cy="286" rx="9" ry="13" strokeWidth="0.9" />

        {/* Dashed baseline decoration */}
        <line className="draw draw-d12" x1="180" y1="174" x2="380" y2="174" strokeWidth="0.7" strokeDasharray="4 4" />

        {/* Caption text */}
        <text
          x="290"
          y="340"
          textAnchor="middle"
          fill="#9d937c"
          stroke="none"
          style={{ fontFamily: 'Akkurat Mono, monospace', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          BITS PILANI · MAIN CAMPUS
        </text>

        {/* Geodesic decoration (top right, faint) */}
        <g opacity="0.18" transform="translate(494, 72)">
          <circle cx="0" cy="0" r="36" strokeWidth="0.7" />
          {[0,1,2,3,4,5].map(i => {
            const a = (i * Math.PI * 2) / 6;
            return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 36} y2={Math.sin(a) * 36} strokeWidth="0.55" />;
          })}
          <circle cx="0" cy="0" r="18" strokeWidth="0.55" />
        </g>

        {/* Dot grid accent (top left, faint) */}
        <g opacity="0.13">
          {[0,1,2,3,4].map(col =>
            [0,1,2,3].map(row => (
              <circle
                key={`${col}-${row}`}
                cx={58 + col * 14}
                cy={80 + row * 14}
                r="1.5"
                fill="#0f0e0b"
                stroke="none"
              />
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
