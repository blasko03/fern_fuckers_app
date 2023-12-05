'use client'
import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  const handleSubmit = (event: any): void => {
    console.log(event.target.value)
    event.preventDefault()
  }
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
            Championship name
        </div>
        <div>
           <input type='text' />
        </div>

        <div>
            Members
        </div>
        <div>
           <div><input type='checkbox' name='teams[]' value='team1' /> Team1</div>
           <div><input type='checkbox' name='teams[]' value='team2' /> Team2</div>
           <div><input type='checkbox' name='teams[]' value='team3' /> Team3</div>
        </div>
        <div>
           <button>Crea</button>
        </div>
      </form>
    </main>
  )
}
