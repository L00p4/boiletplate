import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Main from '.'

describe('<Main />', () => {
  it('shoud render heading', () => {
    const { container } = render(<Main />)

    expect(
      screen.getByRole('heading', { name: /react avançado/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
