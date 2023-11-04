import { CloseOutline } from '@styled-icons/evaicons-outline'
import LinkWrapper from 'components/LinkWrapper'
import { Body, Container, Gallery, Heading, Wrapper } from './styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

type ImageProps = {
  url: string
  height: number
  width: number
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description?: {
      html: string
      text: string
    }
    gallery: ImageProps[]
  }
}

export default function PlacesTemplate({ place }: PlacesTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <>
      <NextSeo
        title={`${place.name} - Meus rolês`}
        description={
          place.description?.text ||
          'Descrição alternativa caso dê algum problema nos dados vindos do CMS'
        }
        canonical="https://nome-do-site.com"
        openGraph={{
          url: 'https://nome-do-site.com',
          title: `${place.name} - Meus rolês`,
          description:
            place.description?.text ||
            'Descrição alternativa caso dê algum problema nos dados vindos do CMS',
          images: [
            {
              url: place.gallery[0].url,
              width: place.gallery[0].width,
              height: place.gallery[0].height,
              alt: `${place.name}`
            }
          ]
        }}
      />
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <Wrapper>
        <Container>
          <Heading>{place.name}</Heading>

          <Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />

          <Gallery>
            {place.gallery.map((image, index) => (
              <Image
                width={600}
                height={300}
                quality={75}
                key={`photo-${index}`}
                src={image.url}
                alt={place.name}
              />
            ))}
          </Gallery>
        </Container>
      </Wrapper>
    </>
  )
}
