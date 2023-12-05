import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  return (
    <main>
        <div>
            <a href='/championship'>Campionato 1</a>
        </div>
        <div>
            <a href='/championship'>Campionato 2</a>
        </div>
        <div>
            <a href='/championship/create'>Crea</a>
        </div>
    </main>
  )
}
