import Image from 'next/image'

type BlogPost = {
  title: string
  url: string
  date: string
  image?: string
}

const posts: BlogPost[] = [
  {
    title: "minne のミッション報酬アーキテクチャ",
    url: "https://tech.pepabo.com/2026/04/10/minne-mission-reward-architecture/",
    date: "2026-04-10",
    image: "https://tech.pepabo.com/blog/2026/04/10/minne-mission-reward-architecture/images/eyecatch.png",
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

export default async function CompanyTechBlog() {
  const results = await Promise.all(
    posts.map(async (post) => {
      const [ogImage, ogTitle] = await Promise.all([
        fetchOgImage(post.url),
        fetchOgTitle(post.url),
      ])
      return { ...post, ogImage: ogImage ?? post.image ?? null, title: ogTitle ?? post.title }
    })
  )

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">
        <div className="flex items-center gap-2">
          🏢 Company Tech Blog
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
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 flex items-center justify-center">
                <span className="text-5xl">🏢</span>
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
    </section>
  )
}
