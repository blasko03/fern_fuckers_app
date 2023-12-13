'use client'
import Checkbox from '@/components/form/checkbox'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { type Player } from '@/interfaces/Player'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

interface TeamParas extends Partial<Team> {
  id?: string
}

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<TeamParas>({ name: undefined, players: [] })
  const [players, setPlayers] = useState<Player[]>([])
  const getData = async (): Promise<void> => {
    setPlayers(await serverRequest<Player[]>('/api/players'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const handleSubmit = async (event: any): Promise<void> => {
    console.log(formState)
    await serverRequest('/api/teams', FETCH_METHODS.POST, formState)
  }

  return (
    <main>
      <Form onSubmit={ (e) => {
        void handleSubmit(e)
      }}>
        <div className="box">
            Name
           <TextField state={formState} setState={setFormState} name='name' />
        </div>
        <div className="box">
          {players.map(player => <div key={player.id}>
            <Checkbox value={player.id} state={formState} setState={setFormState} name={'players'} /> {player.name}
          </div>)}
        </div>
        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}
