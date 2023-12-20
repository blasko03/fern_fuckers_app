import { championshipValidations } from '@/components/championships/championship_validations'
import { CheckboxGroup } from '@/components/form/checkbox_group'
import Form, { CreateForm, handleSubmit } from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { StdLayout } from '@/components/layouts/std_layout'
import { type Championship } from '@/interfaces/Championship'
import { type Team } from '@/interfaces/Team'
import { serverRequest } from '@/utils/serverData'
import { useRouter } from 'next/navigation'
import { useState, type ReactElement, useEffect } from 'react'

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
  const router = useRouter()
  const submit = async (): Promise<void> => {
    await handleSubmit({
      isSubmtting,
      formState,
      router,
      setIsSubmtting,
      formValidations,
      serverUrl: '/api/championships',
      succesUrl: '/championships'
    })
  }

  return (
    <StdLayout title = {'Create Championship'}
               bottom = {<button className="full-width" onClick={() => { void submit() }}>Crea</button>}>
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
