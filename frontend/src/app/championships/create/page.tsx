'use client'
import { CheckboxGroup } from '@/components/form/checkbox_group'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { updateFormState, type FormValues } from '@/components/form/utils'
import { StdLayout } from '@/components/layouts/std_layout'
import { type Championship } from '@/interfaces/Championship'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

interface ChampionshipForm extends Omit<Championship, 'id' | 'matches' | 'teams'> {
  teams: string[]
}

type StateType = FormValues<ChampionshipForm>

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<StateType>({
    name: { value: '', touched: false },
    teams: { value: [], touched: false }
  })
  const [teams, setTeams] = useState<Team[]>([])
  const getData = async (): Promise<void> => {
    setTeams(await serverRequest<Team[]>('/api/teams'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const handleSubmit = async (): Promise<void> => {
    await serverRequest('/api/championships', FETCH_METHODS.POST, Object.keys(formState).reduce((acc, x) => ({ ...acc, [x]: formState[x as keyof StateType].value }), {}))
  }

  return (
    <StdLayout title = {'Create Championship'}
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
          Select Teams
          <CheckboxGroup elements={teams.map(p => ({ id: p.id, value: p.name }))}
                         name='teams'
                         state={formState.teams}
                         setState={(newValue, name) => { updateFormState(setFormState, name, newValue) }} />
        </div>
      </Form>
    </StdLayout>
  )
}
