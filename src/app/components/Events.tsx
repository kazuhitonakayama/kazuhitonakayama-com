import { type LaprasEvent } from '../lib/lapras'

export default function Events({ events }: { events: LaprasEvent[] }) {
  const sorted = [...events]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  if (sorted.length === 0) return null

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sorted.map((event) => (
          <a
            key={event.url}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors bg-white dark:bg-neutral-900 hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50 px-5 py-4"
          >
            <div className="flex items-start gap-2">
              <p className="font-semibold text-sm group-hover:underline line-clamp-2 flex-1">
                {event.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                  →
                </span>
              </p>
              <div className="flex gap-1 shrink-0">
                {event.is_presenter && (
                  <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    Speaker
                  </span>
                )}
                {event.is_organizer && (
                  <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                    Organizer
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs opacity-50">
              {new Date(event.date).toLocaleDateString('ja-JP')}
            </p>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://lapras.com/public/kazuhito_nakayama"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border border-neutral-300 dark:border-neutral-600 px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800"
        >
          View more events →
        </a>
      </div>
    </section>
  )
}
