'use client'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { type Player } from '@/interfaces/Player'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement } from 'react'

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<Player>({ id: '', name: '', surname: '' })
  const handleSubmit = async (event: any): Promise<void> => {
    await serverRequest('/api/players', FETCH_METHODS.POST, formState)
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
            Surname
           <TextField state={formState} setState={setFormState} name='surname' />
        </div>

        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}
