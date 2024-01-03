import { CheckboxGroup } from '@/components/form/checkbox_group'
import Form, { CreateForm, handleSubmit } from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { StdLayout } from '@/components/layouts/std_layout'
import { type Team } from '@/interfaces/Team'
import { serverRequest } from '@/utils/serverData'
import { useRouter } from 'next/navigation'
import { useState, type ReactElement, useEffect } from 'react'
import { type Player } from '@/interfaces/Player'
import { teamValidations } from './team_validations'

export interface TeamsFields extends Omit<Team, 'id' | 'players'> {
  players: string[]
}

export default function TeamsForm (): ReactElement {
  const [players, setPlayers] = useState<Player[]>([])
  const getData = async (): Promise<void> => {
    setPlayers(await serverRequest<Player[]>('/api/players'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const { isSubmtting, setIsSubmtting, formValidations, formState, field } = CreateForm<TeamsFields>({ validations: teamValidations })
  const router = useRouter()
  const submit = async (): Promise<void> => {
    await handleSubmit({
      isSubmtting,
      formState,
      router,
      setIsSubmtting,
      formValidations,
      serverUrl: '/api/teams',
      succesUrl: '/teams'
    })
  }

  return (
    <StdLayout title = {'Create team'}
               bottom = {<button className={['full-width', isSubmtting ? 'pulse' : ''].join(' ')}
                                 onClick={() => { void submit() }}>Crea</button>}>
      <Form onSubmit={ () => {
        void submit()
      }}>
        <div>
            Name
            <TextField { ...field<string>('name')} />
        </div>
        <div>
          Select Teams
          <CheckboxGroup elements={players.map(p => ({ id: p.id, value: `${p.name} ${p.surname}` }))}
                         { ...field<string[]>('players')} />
        </div>
      </Form>
    </StdLayout>
  )
}
