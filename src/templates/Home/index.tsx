import { InfoOutline } from '@styled-icons/evaicons-outline'
import LinkWrapper from 'components/LinkWrapper'
import { MapProps } from 'components/Map'

import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function HomeTemplate({ places }: MapProps) {
  return (
    <>
      <NextSeo
        title="Meus rolês"
        description="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        canonical="https://www.nome-do-site.com"
        openGraph={{
          url: 'https://www.nome-do-site.com',
          title: 'Meus rolês',
          description:
            'A simple project starter to work with TypeScript, React, NextJS and Styled Components',
          images: [
            {
              url: 'localhost:3000/img/fine.png',
              width: 1280,
              height: 720
            }
          ],
          siteName: 'Meus rolês'
        }}
      />
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
