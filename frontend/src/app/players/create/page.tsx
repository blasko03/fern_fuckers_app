'use client'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { type Player } from '@/interfaces/Player'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect } from 'react'

type FormValidations = {
  [Property in keyof Omit<Player, 'id'>]: Array<string | undefined>;
}

function validatePresence (value: string): string | undefined {
  if (value == null || value === '') { return 'Not present' }
}

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<Omit<Player, 'id'>>({ name: '', surname: '' })
  const [formValidations, setFormValidations] = useState<FormValidations>({ name: [], surname: [] })
  const handleSubmit = async (event: any): Promise<void> => {
    await serverRequest('/api/players', FETCH_METHODS.POST, formState)
  }

  useEffect(() => { setFormValidations(x => ({ ...x, ...{ name: [validatePresence(formState.name)].filter(x => x) } })) }, [formState])
  return (
    <main>
      <div className='heading_secton'>
        <div>aa</div>
        <h1>Crea Player</h1>
      </div>
      <Form onSubmit={ (e) => {
        void handleSubmit(e)
      }}>
        <div className="box">
            <div>Name</div>
            <TextField state={formState} setState={setFormState} name='name' isValid={formValidations.name.length === 0} />
        </div>
        <div className="box">
            <div>Surname</div>
            <TextField state={formState} setState={setFormState} name='surname' />
        </div>
        <div>
           <button className="full-width">Crea</button>
        </div>
      </Form>
    </main>
  )
}
