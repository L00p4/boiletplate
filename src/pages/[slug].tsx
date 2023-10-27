import { GetStaticPaths, GetStaticProps } from 'next'
import client from 'graphql/client'
import { GET_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries'
import { useRouter } from 'next/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages/Index'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  //retorna um loading ou qqr coisa enquanto está sendo criado
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true }
  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}

//Métodos importantes do NEXT
//getStaticPaths => serve para gerar urls em build time e.g. /about, /trip, /ubatuba
//getStaticProps => serve para buscar dados da página (props) - build time - estático
//getServerSideProps => serve para buscar dados da página (props) - runtime - toda requisição (bundle fica no server)
//getInitialProps=> serve para buscar dados da página (props) - runtime - toda requisição (bundle também bem para o client) - hydrate
