'use client'
import { CheckboxGroup } from '@/components/form/checkbox_group'
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
          Select players
          <CheckboxGroup elements={players.map(p => ({ id: p.id, value: p.name }))} name='players' state={formState} setState={setFormState} />
        </div>
        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}
