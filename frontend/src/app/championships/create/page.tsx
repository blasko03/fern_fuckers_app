'use client'
import Checkbox from '@/components/form/checkbox'
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
          {teams.map(team => <div key={team.id}>
            <Checkbox value={team.id} state={formState} setState={setFormState} name={'teams'} /> {team.name}
          </div>)}
        </div>
        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}
