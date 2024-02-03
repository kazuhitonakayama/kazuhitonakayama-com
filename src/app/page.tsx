import Image from 'next/image'

export default function Home() {
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

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://scrapbox.io/kazuhitonakayama/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <div className="flex">
                <Image
                  src="https://nota.github.io/press-kit/Scrapbox-circle.svg"
                  width={30}
                  height={30}
                  alt="scrapbox logo"
                /> Scrapbox{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </div>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Notes on my brain. <br />
              All my thiking is here.
            </p>
          </a>

          <a
            href="https://zenn.dev/be_the_light"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <div className="flex">
                <Image
                  src="/zenn.svg"
                  width={30}
                  height={30}
                  alt="zenn logo"
                /> Zenn{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </div>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              My articles about technology is here.
            </p>
          </a>

          <a
            href="https://qiita.com/kazuhito_nakayama"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <div className="flex">
                <Image
                  src="/qiita.png"
                  width={30}
                  height={30}
                  alt="qiita logo"
                /> Qiita{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </div>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            My articles about technology is here.
            </p>
          </a>

          <a
            href="https://speakerdeck.com/kazuhitonakayama"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              <div className="flex">
                <Image
                  src="/speakerdeck.svg"
                  width={30}
                  height={30}
                  alt="qiita logo"
                /> SpeakerDeck{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </div>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              My outputs is here.
            </p>
          </a>
        </div>
      </div>
    </main>
  )
}
