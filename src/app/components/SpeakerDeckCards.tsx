type Deck = {
  title: string
  url: string
}

const decks: Deck[] = [
  {
    title: "output",
    url: "https://speakerdeck.com/kazuhitonakayama/output",
  },
  {
    title: "Claude Code Actionsの運用と活用について",
    url: "https://speakerdeck.com/kazuhitonakayama/claude-code-actionsnoyun-yong-tohuo-yong-nituite",
  },
  {
    title: "minneはなぜGraphQLを推進しているか",
    url: "https://speakerdeck.com/kazuhitonakayama/minnehanasegraphqlwotui-jin-siteiruka",
  },
  {
    title: "SentryとCloudWatchを活用した より安心なプログレッシブデリバリー",
    url: "https://speakerdeck.com/kazuhitonakayama/sentreytocloudwatchwohuo-yong-sita-yorian-xin-napuroguretusibuderibari",
  },
]

type OEmbedResponse = {
  title: string
  html: string
}

async function fetchOEmbed(deckUrl: string): Promise<OEmbedResponse | null> {
  try {
    const res = await fetch(
      `https://speakerdeck.com/oembed.json?url=${encodeURIComponent(deckUrl)}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function SpeakerDeckCards() {
  const results = await Promise.all(
    decks.map(async (deck) => {
      const oembed = await fetchOEmbed(deck.url)
      return { ...deck, oembed }
    })
  )

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">🎤 Presentations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((deck) => (
          <a
            key={deck.url}
            href={deck.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors bg-white dark:bg-neutral-900 hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50"
          >
            {deck.oembed?.html ? (
              <div
                className="aspect-[16/9] w-full pointer-events-none"
                dangerouslySetInnerHTML={{
                  __html: deck.oembed.html
                    .replace(/width="\d+"/, 'width="100%"')
                    .replace(/height="\d+"/, 'height="100%"')
                    .replace('<iframe', '<iframe style="aspect-ratio:16/9;width:100%;height:100%"'),
                }}
              />
            ) : (
              <div className="aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
            )}
            <div className="px-4 py-3">
              <p className="font-semibold text-sm group-hover:underline">
                {deck.oembed?.title ?? deck.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                  →
                </span>
              </p>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://speakerdeck.com/kazuhitonakayama"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border border-neutral-300 dark:border-neutral-600 px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800"
        >
          View more presentations →
        </a>
      </div>
    </section>
  )
}
