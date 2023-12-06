'use client'
import Checkbox from '@/components/form/checkbox'
import Form from '@/components/form/form'
import Text from '@/components/form/text'
import { useState, type ReactElement } from 'react'

interface Team {
  name: string
  members: string[]
}

const teams = ['team1', 'team2', 'team3']

export default function Home (): ReactElement {
  const handleSubmit = (event: any): void => {
    console.log(formState)
  }
  const [formState, setFormState] = useState<Team>({ members: [], name: '' })
  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <div>
            Championship name
        </div>
        <div>
           <Text state={formState} setState={setFormState} name='name' />
        </div>

        <div>
            Members
        </div>
        <div>
          { teams.map(x =>
           <div key={x}>
            <Checkbox state={formState} setState={setFormState} value={x} name='members' /> {x}</div>
          )}
        </div>
        <div>
           <button>Crea</button>
        </div>
      </Form>
    </main>
  )
}
