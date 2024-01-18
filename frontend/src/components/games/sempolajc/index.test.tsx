import { render } from '@testing-library/react'
import Cricket from '.'

test('adds 1 + 2 to equal 3', () => {
  const game = render(<Cricket />)
  expect(game).toBeDefined()
})
