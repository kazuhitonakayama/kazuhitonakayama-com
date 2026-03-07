import { fetchLaprasData } from './lib/lapras'
import LaprasPortfolio from './components/LaprasPortfolio'
import Events from './components/Events'
import SpeakerDeckCards from './components/SpeakerDeckCards'
import ZennArticles from './components/ZennArticles'
import HatenaBlogPosts from './components/HatenaBlogPosts'

export default async function Home() {
  const laprasData = await fetchLaprasData()

  return (
    <main className="min-h-screen p-7">
      <div className="flex flex-col items-center justify-between gap-y-9 container mx-auto">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <a href="/">Kazuhito Nakayama</a>
        </div>

        <div className="text-normal tracking-widest font-bold sm:text-center">
          <p>🔨 I am Software Engineer for Social Good.</p>
          <p className="text-sm font-normal">Ruby / Go / Typescript / Rails / Next.js</p>
        </div>

        <div className="text-normal tracking-widest font-bold">
          <p>❤️‍🔥 I create a society where everyone can live with laughter.</p>
        </div>

        <div className="text-2xl font-bold tracking-widest mb-8">
          <p className="mb-4"><span className="sm:hidden">&ldquo;</span><span className="sm:text-9xl">We</span>&apos;re all <span className="sm:text-9xl">traveling</span> through time together every day of our lives.</p>
          <p className="mb-4">All we can do is do our best to <span className="sm:text-9xl">relish</span> this remarkable ride.<span className="sm:hidden">&rdquo;</span></p>
          <p className="text-sm sm:hidden">
            &ldquo;僕らはみんなでこの人生をタイムトラベルしているんだ。<br />
            ただ、この素晴らしい旅を楽しもう。&rdquo;
          </p>
        </div>

        <LaprasPortfolio />

        <HatenaBlogPosts />

<SpeakerDeckCards />

        <ZennArticles />

        {laprasData?.events && (
          <Events events={laprasData.events} />
        )}
      </div>
    </main>
  )
}
