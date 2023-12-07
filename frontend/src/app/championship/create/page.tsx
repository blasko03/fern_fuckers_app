'use client'
import Checkbox from '@/components/form/checkbox'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { useState, type ReactElement } from 'react'

interface Team {
  name: string
  members: string[]
}

const teams = ['team1', 'team2', 'team3']

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<Team>({ members: [], name: '' })
  const handleSubmit = (event: any): void => {
    console.log(formState)
  }
  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <div className="box">
            Championship name
           <TextField state={formState} setState={setFormState} name='name' />
        </div>

        <div className="box">
          Members
          { teams.map(x =>
           <div key={x}>
            <Checkbox state={formState} setState={setFormState} value={x} name='members' /> {x}</div>
          )}
        </div>
        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}
