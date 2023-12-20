'use client'
import { CheckboxGroup } from '@/components/form/checkbox_group'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { type Championship } from '@/interfaces/Championship'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

interface ChampionshipParams extends Partial<Championship> {
  id?: string
}

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<ChampionshipParams>({ name: undefined, teams: [] })
  const [teams, setTeams] = useState<Team[]>([])
  const getData = async (): Promise<void> => {
    setTeams(await serverRequest<Team[]>('/api/teams'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const handleSubmit = async (event: any): Promise<void> => {
    await serverRequest('/api/championships', FETCH_METHODS.POST, formState)
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
          <CheckboxGroup elements={teams.map(p => ({ id: p.id, value: p.name }))} name='teams' state={formState} setState={setFormState} />
        </div>
        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}
