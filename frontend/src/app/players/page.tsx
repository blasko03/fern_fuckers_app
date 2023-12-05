import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  return (
    <main>
        <div>
            Player 1
        </div>
        <div>
            Player 2
        </div>
        <div>
            <a href='/player/create'>Crea</a>
        </div>
    </main>
  )
}
