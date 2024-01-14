import { useState, type ReactElement, useEffect } from 'react'
import { teamValidations } from './team_validations'
import { Player } from '../../interfaces/Player'
import { serverRequest } from '../../utils/serverData'
import { Team } from '../../interfaces/Team'
import Form, { CreateForm } from '../form/form'
import { handleSubmit } from '../form/handle_submit'
import { StdLayout } from '../layouts/std_layout'
import TextField from '../form/text_field'
import { CheckboxGroup } from '../form/checkbox_group'

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
  const submit = async (): Promise<void> => {
    await handleSubmit({
      isSubmtting,
      formState,
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
