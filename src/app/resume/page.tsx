import fs from 'node:fs/promises'
import path from 'node:path'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata: Metadata = {
  title: 'Resume | Kazuhito Nakayama',
  description: 'Kazuhito Nakayama の職務経歴書',
}

export default async function ResumePage() {
  const filePath = path.join(process.cwd(), 'src/app/resume/career.md')
  const markdown = await fs.readFile(filePath, 'utf-8')

  return (
    <main className="min-h-screen p-7">
      <div className="container mx-auto max-w-3xl">
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-table:text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </div>
    </main>
  )
}
