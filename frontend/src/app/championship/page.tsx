import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  return (
    <main className='box'>
        <div>
          <a href='/match'>Squadra 1 vs Squadra 2</a>
        </div>
        <hr></hr>
        <div>
          <a href='/match'>Squadra 2 vs Squadra 3</a>
        </div>
    </main>
  )
}
