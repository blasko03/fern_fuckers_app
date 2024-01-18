import { type ReactElement } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { type Championship } from '../../interfaces/Championship'
import { CheckboxGroup } from '../form/checkbox_group'
import { CreateForm } from '../form/form'
import { handleSubmit } from '../form/handle_submit'
import TextField from '../form/text_field'
import { StdLayout } from '../layouts/std_layout'
import { championshipValidations } from './championship_validations'
import { useFetchTeams } from '../teams/useFetchTeams'

export interface ChampionshipFields extends Omit<Championship, 'id' | 'matches' | 'teams'> {
  teams: string[]
}

export default function ChampionshipForm (): ReactElement {
  const teams = useFetchTeams()

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
