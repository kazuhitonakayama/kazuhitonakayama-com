import Image from 'next/image'

type ZennArticle = {
  id: number
  title: string
  slug: string
  emoji: string
  published_at: string
  path: string
  article_type: string
}

type ZennResponse = {
  articles: ZennArticle[]
}

async function fetchZennArticles(): Promise<ZennArticle[]> {
  try {
    const res = await fetch(
      'https://zenn.dev/api/articles?username=be_the_light&order=latest',
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return []
    const data: ZennResponse = await res.json()
    return data.articles.slice(0, 6)
  } catch {
    return []
  }
}

export default async function ZennArticles() {
  const articles = await fetchZennArticles()

  if (articles.length === 0) return null

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">
        <div className="flex items-center gap-2">
          <Image src="/zenn.svg" width={28} height={28} alt="Zenn logo" />
          Zenn Articles
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={`https://zenn.dev${article.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50"
          >
            <div className="text-3xl mb-2">{article.emoji}</div>
            <p className="font-semibold text-sm line-clamp-2 group-hover:underline">
              {article.title}
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                →
              </span>
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              {new Date(article.published_at).toLocaleDateString('ja-JP')}
            </p>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://zenn.dev/be_the_light"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border border-neutral-300 dark:border-neutral-600 px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800"
        >
          View more articles →
        </a>
      </div>
    </section>
  )
}
