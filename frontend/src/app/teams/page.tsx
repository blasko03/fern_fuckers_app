import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  return (
    <main>
        <div>
            Team 1
        </div>
        <div>
            Team 2
        </div>
        <div>
            <a href='/teams/create'>Crea</a>
        </div>
    </main>
  )
}
