import { useState, type ReactElement, useEffect } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { type Championship } from '../../interfaces/Championship'
import { type Team } from '../../interfaces/Team'
import { serverRequest } from '../../utils/serverData'
import { CheckboxGroup } from '../form/checkbox_group'
import { CreateForm } from '../form/form'
import { handleSubmit } from '../form/handle_submit'
import TextField from '../form/text_field'
import { StdLayout } from '../layouts/std_layout'
import { championshipValidations } from './championship_validations'

export interface ChampionshipFields extends Omit<Championship, 'id' | 'matches' | 'teams'> {
  teams: string[]
}

export default function ChampionshipForm (): ReactElement {
  const [teams, setTeams] = useState<Team[]>([])
  const getData = async (): Promise<void> => {
    setTeams(await serverRequest<Team[]>('/api/teams'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const { isSubmtting, setIsSubmtting, formValidations, formState, field } = CreateForm<ChampionshipFields>({ validations: championshipValidations })
  const navigate = useNavigate()
  const submit = async (): Promise<void> => {
    await handleSubmit({
      isSubmtting,
      formState,
      setIsSubmtting,
      formValidations,
      serverUrl: '/api/championships',
      succesUrl: '/championships',
      navigate
    })
  }
  return (
    <StdLayout title = {'Create Championship'}
               bottom = {<button className={['full-width', isSubmtting ? 'pulse' : ''].join(' ')} onClick={() => { void submit() }}>Crea</button>}>
      <Form onSubmit={ () => {
        void submit()
      }}>
        <div className="box">
            Name
            <TextField { ...field<string>('name')} />
        </div>
        <div className="box">
          Select Teams
          <CheckboxGroup elements={teams.map(p => ({ id: p.id, value: p.name }))}
                         { ...field<string[]>('teams')} />
        </div>
      </Form>
    </StdLayout>
  )
}
