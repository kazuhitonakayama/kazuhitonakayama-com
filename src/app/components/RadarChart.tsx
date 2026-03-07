'use client'

import { useEffect, useState } from 'react'

export default function RadarChart({ e, b, i }: { e: number; b: number; i: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1200
    let raf: number

    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(eased)
      if (t < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const cx = 120
  const cy = 110
  const maxR = 80
  const levels = [1, 2, 3, 4]

  // 3 axes: top (Technical), bottom-left (Business), bottom-right (Influence)
  const angles = [-90, 150, 30].map((d) => (d * Math.PI) / 180)

  const point = (angle: number, r: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  })

  const gridPolygons = levels.map((lvl) => {
    const r = (lvl / 4) * maxR
    return angles.map((a) => point(a, r)).map((p) => `${p.x},${p.y}`).join(' ')
  })

  const scores = [e, b, i]
  const animatedScores = scores.map((s) => s * progress)
  const dataPoints = animatedScores.map((s, idx) => {
    const r = (Math.min(s, 4) / 4) * maxR
    return point(angles[idx], r)
  })
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')

  const labelData = [
    { label: 'Technical', score: e, angle: angles[0], offset: { x: 0, y: -14 } },
    { label: 'Business', score: b, angle: angles[1], offset: { x: -10, y: 16 } },
    { label: 'Influence', score: i, angle: angles[2], offset: { x: 10, y: 16 } },
  ]

  // Score level labels along the top axis
  const levelLabels = levels.map((lvl) => {
    const r = (lvl / 4) * maxR
    const p = point(angles[0], r)
    return { lvl, x: p.x + 10, y: p.y + 3 }
  })

  return (
    <svg viewBox="0 0 240 230" className="w-52 h-52 sm:w-60 sm:h-60">
      {/* Grid polygons */}
      {gridPolygons.map((pts, idx) => (
        <polygon
          key={idx}
          points={pts}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={0.5}
        />
      ))}

      {/* Level labels */}
      {levelLabels.map(({ lvl, x, y }) => (
        <text
          key={lvl}
          x={x}
          y={y}
          className="fill-current text-[7px] opacity-30"
        >
          {lvl.toFixed(1)}
        </text>
      ))}

      {/* Axes */}
      {angles.map((a, idx) => {
        const end = point(a, maxR)
        return (
          <line
            key={idx}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={0.5}
          />
        )
      })}

      {/* Data area with animation */}
      <polygon
        points={dataPolygon}
        fill="url(#radarGrad)"
        fillOpacity={0.3 * progress}
        stroke="url(#radarStroke)"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeOpacity={progress}
      />

      {/* Glow effect */}
      <polygon
        points={dataPolygon}
        fill="none"
        stroke="url(#radarStroke)"
        strokeWidth={4}
        strokeLinejoin="round"
        strokeOpacity={0.15 * progress}
        filter="url(#glow)"
      />

      {/* Data points */}
      {dataPoints.map((p, idx) => (
        <circle
          key={idx}
          cx={p.x}
          cy={p.y}
          r={3.5 * progress}
          fill={['#3b82f6', '#22c55e', '#a855f7'][idx]}
          stroke="white"
          strokeWidth={1.5}
          opacity={progress}
        />
      ))}

      {/* Labels */}
      {labelData.map(({ label, score, angle, offset }) => {
        const anchor = point(angle, maxR + 16)
        return (
          <g key={label} opacity={0.4 + 0.6 * progress}>
            <text
              x={anchor.x + offset.x}
              y={anchor.y + offset.y}
              textAnchor="middle"
              className="fill-current text-[8px] font-semibold opacity-60"
            >
              {label}
            </text>
            <text
              x={anchor.x + offset.x}
              y={anchor.y + offset.y + 11}
              textAnchor="middle"
              className="fill-current text-[10px] font-bold"
            >
              {(score * progress).toFixed(2)}
            </text>
          </g>
        )
      })}

      {/* Defs */}
      <defs>
        <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
