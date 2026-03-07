import { type LaprasGitHubRepository } from '../lib/lapras'

export default function GitHubRepositories({ repositories }: { repositories: LaprasGitHubRepository[] }) {
  const filtered = repositories
    .filter((repo) => repo.is_owner && !repo.is_fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)

  if (filtered.length === 0) return null

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">GitHub Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((repo) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors bg-white dark:bg-neutral-900 hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50 px-5 py-4"
          >
            <p className="font-semibold text-sm group-hover:underline truncate">
              {repo.title}
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                →
              </span>
            </p>
            {repo.description && (
              <p className="mt-2 text-xs opacity-60 line-clamp-2">{repo.description}</p>
            )}
            <div className="mt-3 flex items-center gap-3 text-xs opacity-50">
              {repo.language && <span>{repo.language}</span>}
              {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
              {repo.forks > 0 && <span>🍴 {repo.forks}</span>}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
