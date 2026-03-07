import { fetchLaprasData, LaprasGithubRepository } from '../lib/lapras'

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Ruby: 'bg-red-500',
  Go: 'bg-cyan-500',
  Python: 'bg-green-500',
  Rust: 'bg-orange-600',
  Java: 'bg-orange-400',
  Shell: 'bg-emerald-600',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
}

function RepoCard({ repo }: { repo: LaprasGithubRepository }) {
  const langColor = languageColors[repo.language] ?? 'bg-neutral-400'

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors bg-white dark:bg-neutral-900 hover:border-gray-400 hover:bg-gray-50 hover:dark:border-neutral-500 hover:dark:bg-neutral-800/50 px-5 py-4"
    >
      <p className="font-semibold text-sm group-hover:underline truncate">
        {repo.title}
        <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
      </p>
      <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${langColor}`} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-0.5">⭐ {repo.stargazers_count}</span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-0.5">🍴 {repo.forks}</span>
        )}
      </div>
    </a>
  )
}

export default async function GithubRepositories() {
  const data = await fetchLaprasData()

  if (!data || data.github_repositories.length === 0) return null

  const repos = data.github_repositories
    .filter((r) => r.is_owner && !r.is_fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)

  if (repos.length === 0) return null

  return (
    <section className="w-full max-w-5xl">
      <h2 className="text-2xl font-bold tracking-widest mb-6">GitHub Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.url} repo={repo} />
        ))}
      </div>
    </section>
  )
}
