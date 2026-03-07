import { fetchLaprasData } from '../lib/lapras'
import RadarChart from './RadarChart'

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
          <>
            {data.description && (
              <p className="mt-3 text-sm font-medium opacity-70 tracking-wide">{data.description}</p>
            )}
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
          </>
        ) : (
          <p className="mt-2 text-sm opacity-50">
            My technical portfolio and skill scores on LAPRAS.
          </p>
        )}
      </a>
    </section>
  )
}
