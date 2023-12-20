'use client'
import { CheckboxGroup } from '@/components/form/checkbox_group'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { updateFormState, type FormValues } from '@/components/form/utils'
import { StdLayout } from '@/components/layouts/std_layout'
import { type Player } from '@/interfaces/Player'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

interface ChampionshipForm extends Omit<Team, 'id' | 'players'> {
  players: string[]
}

type StateType = FormValues<ChampionshipForm>

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<StateType>({
    name: { value: '', touched: false },
    players: { value: [], touched: false }
  })

  const [players, setPlayers] = useState<Player[]>([])
  const getData = async (): Promise<void> => {
    setPlayers(await serverRequest<Player[]>('/api/players'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const handleSubmit = async (): Promise<void> => {
    console.log(formState)
    await serverRequest('/api/teams', FETCH_METHODS.POST, formState)
  }

  return (
    <StdLayout title = {'Create Team'}
               bottom = {<button className="full-width" onClick={() => { void handleSubmit() }}>Crea</button>}>
      <Form onSubmit={ () => {
        void handleSubmit()
      }}>
        <div className="box">
            Name
           <TextField state={formState.name}
                      setState={(newValue, name) => { updateFormState(setFormState, name, newValue) }}
                      name='name' />
        </div>
        <div className="box">
          Select players
          <CheckboxGroup elements={players.map(p => ({ id: p.id, value: p.name }))}
                         name='players'
                         state={formState.players}
                         setState={(newValue, name) => { updateFormState(setFormState, name, newValue) }} />
        </div>
      </Form>
    </StdLayout>
  )
}
