export type LaprasEvent = {
  title: string
  url: string
  date: string
  is_presenter: boolean
  is_organizer: boolean
}

export type LaprasData = {
  name: string
  description: string
  e_score: number
  b_score: number
  i_score: number
  events: LaprasEvent[]
}

export async function fetchLaprasData(): Promise<LaprasData | null> {
  try {
    const res = await fetch(
      'https://lapras.com/public/kazuhito_nakayama.json',
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
