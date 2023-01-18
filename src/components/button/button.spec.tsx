import { Button } from '.'
import { render, screen } from '@testing-library/react'

describe('<Button />', () => {
  it('should render with the text "MyButton"', () => {
    render(<Button />)

    const button = screen.getByText('MyButton')
    expect(button).toBeInTheDocument()
  })
})
