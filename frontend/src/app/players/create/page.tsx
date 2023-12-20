'use client'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { updateFormState, type FormValues } from '@/components/form/utils'
import { StdLayout } from '@/components/layouts/std_layout'
import { type Player } from '@/interfaces/Player'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

type FormValidations = {
  [Property in keyof Omit<Player, 'id'>]: Array<string | undefined>;
}

function validatePresence (value: string): string | undefined {
  if (value == null || value === '') { return 'Not present' }
}

type StateType = FormValues<Omit<Player, 'id'>>

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<StateType>({
    name: { value: '', touched: false },
    surname: { value: '', touched: false }
  })
  const [formValidations, setFormValidations] = useState<FormValidations>({ name: [], surname: [] })
  const handleSubmit = async (): Promise<void> => {
    await serverRequest('/api/players',
      FETCH_METHODS.POST,
      Object.keys(formState).reduce((acc, x) => ({ ...acc, [x]: formState[x as keyof StateType].value }), {}))
  }

  useEffect(() => {
    setFormValidations(x => ({ ...x, ...{ name: [validatePresence(formState.name.value)].filter(x => x) } }))
  }, [formState])

  return (
    <StdLayout title = {'Create Player'}
               bottom = {<button className="full-width" onClick={() => { void handleSubmit() }}>Crea</button>}>
      <Form onSubmit={ () => {
        console.log('aaaaaa')
        void handleSubmit()
      }}>
        <div className="box">
            <div>Name</div>
            <TextField state={formState.name}
                       setState={(newValue, name) => { updateFormState(setFormState, name, newValue) }}
                       name='name'
                       isValid={!formState.name.touched || formValidations.name.length === 0} />
        </div>
        <div className="box">
            <div>Surname</div>
            <TextField state={formState.surname}
                       setState={(newValue, name) => { updateFormState(setFormState, name, newValue) }}
                       name='surname' />
        </div>
      </Form>
    </StdLayout>
  )
}
