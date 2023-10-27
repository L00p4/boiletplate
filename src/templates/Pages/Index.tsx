import { CloseOutline } from '@styled-icons/evaicons-outline'
import LinkWrapper from 'components/LinkWrapper'
import { Body, Content, Heading } from './styles'

export type PageTemplateProps = {
  heading: string
  body: string
}

const PageTemplate = ({ heading, body }: PageTemplateProps) => (
  <Content>
    <LinkWrapper href="/">
      <CloseOutline size={32} />
    </LinkWrapper>

    <Heading>{heading}</Heading>

    <Body>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Body>
  </Content>
)

export default PageTemplate
