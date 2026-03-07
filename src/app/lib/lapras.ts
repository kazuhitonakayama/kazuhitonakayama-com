export type LaprasGithubRepository = {
  title: string
  url: string
  stargazers_count: number
  forks: number
  contributors_count: number
  language: string
  languages: { name: string; bytes: number }[]
  is_oss: boolean
  is_fork: boolean
  is_owner: boolean
}

export type LaprasData = {
  name: string
  description: string
  e_score: number
  b_score: number
  i_score: number
  github_repositories: LaprasGithubRepository[]
}

const LAPRAS_API_URL = 'https://lapras.com/public/kazuhito_nakayama.json'

export async function fetchLaprasData(): Promise<LaprasData | null> {
  try {
    const res = await fetch(LAPRAS_API_URL, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
