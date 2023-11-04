import { GetStaticPaths, GetStaticProps } from 'next'
import client from 'graphql/client'
import { GET_PLACES, GET_PLACE_BY_SLUG } from 'graphql/queries'
import { useRouter } from 'next/router'

import PlacesTemplate, { PlacesTemplateProps } from 'templates/Places/Index'
import { GetPlaceBySlugQuery, GetPlacesQuery } from 'graphql/generated/graphql'

export default function Place({ place }: PlacesTemplateProps) {
  const router = useRouter()

  //retorna um loading ou qqr coisa enquanto está sendo criado
  if (router.isFallback) return null

  return <PlacesTemplate place={place} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })

  const paths = places.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) return { notFound: true }
  return {
    revalidate: 5,
    props: {
      place
    }
  }
}

//Métodos importantes do NEXT
//getStaticPaths => serve para gerar urls em build time e.g. /about, /trip, /ubatuba
//getStaticProps => serve para buscar dados da página (props) - build time - estático
//getServerSideProps => serve para buscar dados da página (props) - runtime - toda requisição (bundle fica no server)
//getInitialProps=> serve para buscar dados da página (props) - runtime - toda requisição (bundle também bem para o client) - hydrate
