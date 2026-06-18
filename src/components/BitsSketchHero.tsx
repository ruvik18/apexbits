'use client';

import { useEffect, useRef } from 'react';

export default function BitsSketchHero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.draw-line');
    if (!paths) return;
    paths.forEach((path, i) => {
      const len = (path as SVGPathElement).getTotalLength?.() ?? 600;
      (path as SVGPathElement).style.strokeDasharray = `${len}`;
      (path as SVGPathElement).style.strokeDashoffset = `${len}`;
      (path as SVGPathElement).style.animation = `draw-path ${1.2 + i * 0.08}s ${0.1 + i * 0.04}s ease forwards`;
    });
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '420px' }}>
      {/* Floating squares (Aptos-style decorative) */}
      {[
        { top: '12%', left: '6%', size: 10, delay: '0s' },
        { top: '8%', left: '22%', size: 8, delay: '0.3s' },
        { top: '78%', left: '10%', size: 10, delay: '0.5s' },
        { top: '85%', left: '28%', size: 8, delay: '0.2s' },
        { top: '10%', right: '8%', size: 10, delay: '0.4s' },
        { top: '18%', right: '22%', size: 8, delay: '0.1s' },
        { top: '76%', right: '10%', size: 10, delay: '0.6s' },
        { top: '82%', right: '26%', size: 8, delay: '0.3s' },
      ].map((sq, i) => (
        <span
          key={i}
          className="absolute border border-[#0f0e0b] opacity-30"
          style={{
            top: sq.top,
            left: (sq as any).left,
            right: (sq as any).right,
            width: sq.size,
            height: sq.size,
            animationDelay: sq.delay,
            animation: `float 4s ${sq.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Main SVG sketch of BITS Pilani architecture */}
      <svg
        ref={svgRef}
        viewBox="0 0 600 380"
        fill="none"
        stroke="#0f0e0b"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full max-w-[600px]"
        aria-label="Animated sketch of BITS Pilani architecture"
        role="img"
      >
        {/* Ground line */}
        <line className="draw-line" x1="30" y1="320" x2="570" y2="320" strokeWidth="1.5" />

        {/* Main central building - iconic clock tower base */}
        <rect className="draw-line" x="240" y="180" width="120" height="140" />
        {/* Central tower */}
        <rect className="draw-line" x="265" y="130" width="70" height="50" />
        {/* Clock tower upper */}
        <rect className="draw-line" x="275" y="90" width="50" height="40" />
        {/* Clock face */}
        <circle className="draw-line" cx="300" cy="108" r="14" strokeWidth="1.2" />
        {/* Clock hands */}
        <line className="draw-line" x1="300" y1="108" x2="300" y2="97" strokeWidth="1.5" />
        <line className="draw-line" x1="300" y1="108" x2="309" y2="108" strokeWidth="1.5" />
        {/* Tower spire */}
        <polyline className="draw-line" points="280,90 300,65 320,90" />
        {/* Tower finial */}
        <line className="draw-line" x1="300" y1="65" x2="300" y2="52" strokeWidth="1.5" />
        <line className="draw-line" x1="296" y1="55" x2="304" y2="55" strokeWidth="1.5" />

        {/* Left wing */}
        <rect className="draw-line" x="110" y="220" width="130" height="100" />
        <rect className="draw-line" x="125" y="200" width="100" height="20" />
        {/* Left wing columns */}
        {[140, 160, 180, 200].map((x, i) => (
          <line key={i} className="draw-line" x1={x} y1="220" x2={x} y2="290" strokeWidth="0.9" />
        ))}
        {/* Left wing arch windows */}
        {[145, 175].map((x, i) => (
          <g key={i}>
            <rect className="draw-line" x={x} y="240" width="22" height="35" strokeWidth="0.9" />
            <path className="draw-line" d={`M${x},240 Q${x + 11},228 ${x + 22},240`} strokeWidth="0.9" />
          </g>
        ))}

        {/* Right wing */}
        <rect className="draw-line" x="360" y="220" width="130" height="100" />
        <rect className="draw-line" x="375" y="200" width="100" height="20" />
        {/* Right wing columns */}
        {[390, 410, 430, 450].map((x, i) => (
          <line key={i} className="draw-line" x1={x} y1="220" x2={x} y2="290" strokeWidth="0.9" />
        ))}
        {/* Right wing arch windows */}
        {[393, 423].map((x, i) => (
          <g key={i}>
            <rect className="draw-line" x={x} y="240" width="22" height="35" strokeWidth="0.9" />
            <path className="draw-line" d={`M${x},240 Q${x + 11},228 ${x + 22},240`} strokeWidth="0.9" />
          </g>
        ))}

        {/* Central entrance arch */}
        <rect className="draw-line" x="272" y="245" width="56" height="75" />
        <path className="draw-line" d="M272,245 Q300,222 328,245" />

        {/* Steps */}
        <rect className="draw-line" x="265" y="315" width="70" height="5" strokeWidth="0.9" />
        <rect className="draw-line" x="255" y="310" width="90" height="5" strokeWidth="0.9" />

        {/* Left side small tower */}
        <rect className="draw-line" x="108" y="195" width="20" height="25" />
        <polyline className="draw-line" points="108,195 118,180 128,195" />

        {/* Right side small tower */}
        <rect className="draw-line" x="472" y="195" width="20" height="25" />
        <polyline className="draw-line" points="472,195 482,180 492,195" />

        {/* Far left building */}
        <rect className="draw-line" x="50" y="250" width="60" height="70" />
        <line className="draw-line" x1="50" y1="270" x2="110" y2="270" strokeWidth="0.8" />
        {/* Window grid */}
        {[60, 80].map((x, i) =>
          [255, 275].map((y, j) => (
            <rect key={`${i}-${j}`} className="draw-line" x={x} y={y} width="12" height="10" strokeWidth="0.7" />
          ))
        )}

        {/* Far right building */}
        <rect className="draw-line" x="490" y="250" width="60" height="70" />
        <line className="draw-line" x1="490" y1="270" x2="550" y2="270" strokeWidth="0.8" />
        {[500, 520].map((x, i) =>
          [255, 275].map((y, j) => (
            <rect key={`${i}-${j}`} className="draw-line" x={x} y={y} width="12" height="10" strokeWidth="0.7" />
          ))
        )}

        {/* Trees (left) */}
        <line className="draw-line" x1="75" y1="320" x2="75" y2="295" strokeWidth="1.2" />
        <ellipse className="draw-line" cx="75" cy="285" rx="12" ry="16" strokeWidth="0.9" />
        <line className="draw-line" x1="100" y1="320" x2="100" y2="300" strokeWidth="1.2" />
        <ellipse className="draw-line" cx="100" cy="290" rx="10" ry="14" strokeWidth="0.9" />

        {/* Trees (right) */}
        <line className="draw-line" x1="510" y1="320" x2="510" y2="295" strokeWidth="1.2" />
        <ellipse className="draw-line" cx="510" cy="285" rx="12" ry="16" strokeWidth="0.9" />
        <line className="draw-line" x1="535" y1="320" x2="535" y2="300" strokeWidth="1.2" />
        <ellipse className="draw-line" cx="535" cy="290" rx="10" ry="14" strokeWidth="0.9" />

        {/* Decorative horizontal rule */}
        <line className="draw-line" x1="200" y1="175" x2="400" y2="175" strokeWidth="0.8" strokeDasharray="4 3" />

        {/* Aptos-style geodesic circle accent (top right) */}
        <g opacity="0.25" transform="translate(520, 80)">
          <circle className="draw-line" cx="0" cy="0" r="42" strokeWidth="0.8" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 8;
            const x = Math.cos(a) * 42;
            const y = Math.sin(a) * 42;
            return <line key={i} className="draw-line" x1="0" y1="0" x2={x} y2={y} strokeWidth="0.6" />;
          })}
        </g>

        {/* Aptos code text (right side) */}
        <g opacity="0.12" transform="translate(570, 50)" fontFamily="monospace" fontSize="7">
          {[
            '// BITS PILANI', 'module bits {', '  fun predict(', '    score: u64', '  ): Result {', '    // calc', '  }', '}',
            '// BITSAT 2026', 'public fun', '  rank(s:u64)', '  : u64 {', '  return s', '}',
          ].map((line, i) => (
            <text key={i} x="0" y={i * 12} fill="#0f0e0b" stroke="none">{line}</text>
          ))}
        </g>
      </svg>
    </div>
  );
}
