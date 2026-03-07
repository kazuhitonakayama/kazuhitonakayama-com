export default function LaprasPortfolio() {
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
        <p className="mt-2 text-sm opacity-50">
          My technical portfolio and skill scores on LAPRAS.
        </p>
      </a>
    </section>
  )
}
