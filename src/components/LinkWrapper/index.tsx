import Link from 'next/link'
import { Wrapper } from './styles'

type LinkWrapperProps = {
  href: string
  children: React.ReactNode
}

const LinkWrapper = ({ href, children }: LinkWrapperProps) => (
  <Wrapper>
    <Link href={href}>{children}</Link>
  </Wrapper>
)

export default LinkWrapper
