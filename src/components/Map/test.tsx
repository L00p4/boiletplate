import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)

    screen.logTestingPlaygroundURL()
  })

  it('should render with the marker in correct place', () => {})
})
