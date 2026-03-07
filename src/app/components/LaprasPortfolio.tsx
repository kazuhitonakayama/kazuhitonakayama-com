import { fetchLaprasData } from '../lib/lapras'

function RadarChart({ e, b, i }: { e: number; b: number; i: number }) {
  const cx = 100
  const cy = 100
  const maxR = 75
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
  const dataPoints = scores.map((s, idx) => {
    const r = (Math.min(s, 4) / 4) * maxR
    return point(angles[idx], r)
  })
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')

  const labelData = [
    { label: 'Technical', score: e, angle: angles[0], offset: { x: 0, y: -12 } },
    { label: 'Business', score: b, angle: angles[1], offset: { x: -8, y: 14 } },
    { label: 'Influence', score: i, angle: angles[2], offset: { x: 8, y: 14 } },
  ]

  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56">
      {/* Grid */}
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

      {/* Data area */}
      <polygon
        points={dataPolygon}
        fill="url(#radarGrad)"
        fillOpacity={0.35}
        stroke="url(#radarStroke)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((p, idx) => (
        <circle
          key={idx}
          cx={p.x}
          cy={p.y}
          r={3}
          fill={['#3b82f6', '#22c55e', '#a855f7'][idx]}
          stroke="white"
          strokeWidth={1}
        />
      ))}

      {/* Labels */}
      {labelData.map(({ label, score, angle, offset }) => {
        const anchor = point(angle, maxR + 14)
        return (
          <g key={label}>
            <text
              x={anchor.x + offset.x}
              y={anchor.y + offset.y}
              textAnchor="middle"
              className="fill-current text-[7px] font-semibold opacity-60"
            >
              {label}
            </text>
            <text
              x={anchor.x + offset.x}
              y={anchor.y + offset.y + 9}
              textAnchor="middle"
              className="fill-current text-[9px] font-bold"
            >
              {score.toFixed(2)}
            </text>
          </g>
        )
      })}

      {/* Gradient defs */}
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
      </defs>
    </svg>
  )
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const percentage = Math.round(score * 100) / 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(percentage * 25, 100)}%` }}
        />
      </div>
      <span className="text-sm font-bold w-10 text-right tabular-nums">{score.toFixed(2)}</span>
    </div>
  )
}

export default async function LaprasPortfolio() {
  const data = await fetchLaprasData()

  const totalScore = data ? ((data.e_score + data.b_score + data.i_score) / 3) : 0

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">LAPRAS Portfolio</h2>
      <a
        href="https://lapras.com/public/kazuhito_nakayama"
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors bg-white dark:bg-neutral-900 hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50 px-6 py-5"
      >
        <p className="font-semibold text-lg group-hover:underline">
          LAPRAS
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
            →
          </span>
        </p>
        {data ? (
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <RadarChart e={data.e_score} b={data.b_score} i={data.i_score} />
              <div className="text-center">
                <span className="text-xs font-semibold opacity-50 tracking-wider">TOTAL</span>
                <p className="text-2xl font-black tabular-nums bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 bg-clip-text text-transparent">
                  {totalScore.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-3">
              <ScoreBar label="Technical" score={data.e_score} color="bg-blue-500" />
              <ScoreBar label="Business" score={data.b_score} color="bg-green-500" />
              <ScoreBar label="Influence" score={data.i_score} color="bg-purple-500" />
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm opacity-50">
            My technical portfolio and skill scores on LAPRAS.
          </p>
        )}
      </a>
    </section>
  )
}
