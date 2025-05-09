import type { AppProps } from 'next/app'
import Head from 'next/head'

import NextNProgress from 'nextjs-progressbar'
import SEO from '../../next-seo.config'

import GlobalStyles from '../../styles/global'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <meta name="theme-color" content="#06092b" />
      </Head>
      <DefaultSeo {...SEO} />
      <GlobalStyles />
      {/* se não passar props para o NextNProgress, esses valores são assumidos
      por padrão */}
      <NextNProgress
        color="var(--highligh)"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  )
}
