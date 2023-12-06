'use client'
import { useState, type ReactElement, type ChangeEventHandler } from 'react'

interface Team {
  name?: string
  players: string[]
}

export default function Home (): ReactElement {
  const handleSubmit = (event: any): void => {
    console.log(event.target.value)
    event.preventDefault()
  }

  const checkobxSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.defaultValue)
    setFormState(f => ({ ...f, players: f.players }))
  }

  const [formState, setFormState] = useState<Team>({ players: [] })

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
            Championship name
        </div>
        <div>
           <input type='text' value={formState.name} />
        </div>

        <div>
            Members
        </div>
        <div>
           <div><input type='checkbox' name='teams[]' value='team1' onChange={checkobxSelect} /> Team1</div>
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
