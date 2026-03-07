import Image from 'next/image'

type BlogPost = {
  title: string
  url: string
  date: string
}

const posts: BlogPost[] = [
  {
    title: "Claude Code Actionsのワークフローを一新した話",
    url: "https://kazuhito-nakayama.hateblo.jp/entry/2026/02/27/143616",
    date: "2026-02-27",
  },
  {
    title: "Claude Codeの運用についての知見共有",
    url: "https://kazuhito-nakayama.hateblo.jp/entry/2026/02/14/230112",
    date: "2026-02-14",
  },
]

async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bot)',
      },
    })
    if (!res.ok) return null
    const html = await res.text()
    const match = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)
      || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/)
    return match?.[1] ?? null
  } catch {
    return null
  }
}

async function fetchOgTitle(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bot)',
      },
    })
    if (!res.ok) return null
    const html = await res.text()
    const match = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/)
      || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/)
    return match?.[1] ?? null
  } catch {
    return null
  }
}

export default async function HatenaBlogPosts() {
  const results = await Promise.all(
    posts.map(async (post) => {
      const [ogImage, ogTitle] = await Promise.all([
        fetchOgImage(post.url),
        fetchOgTitle(post.url),
      ])
      return { ...post, ogImage, title: ogTitle ?? post.title }
    })
  )

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">
        <div className="flex items-center gap-2">
          📝 Hatena Blog
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((post) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors bg-white dark:bg-neutral-900 hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50"
          >
            {post.ogImage ? (
              <div className="aspect-[16/9] w-full relative">
                <Image
                  src={post.ogImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900 flex items-center justify-center">
                <span className="text-5xl">📝</span>
              </div>
            )}
            <div className="px-4 py-3 flex items-center justify-between">
              <p className="font-semibold text-sm group-hover:underline line-clamp-1 flex-1">
                {post.title}
                <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                  →
                </span>
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 ml-3 shrink-0">
                {new Date(post.date).toLocaleDateString('ja-JP')}
              </p>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="https://kazuhito-nakayama.hateblo.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border border-neutral-300 dark:border-neutral-600 px-6 py-3 text-sm font-semibold tracking-wide transition-colors hover:bg-gray-100 hover:dark:bg-neutral-800"
        >
          View more posts →
        </a>
      </div>
    </section>
  )
}
