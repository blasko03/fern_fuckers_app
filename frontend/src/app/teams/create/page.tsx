'use client'
import Checkbox from '@/components/form/checkbox'
import Form from '@/components/form/form'
import TextField from '@/components/form/text_field'
import { type HashMap } from '@/components/form/utils'
import { type Player } from '@/interfaces/Player'
import { type Team } from '@/interfaces/Team'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'
import { useState, type ReactElement, useEffect, type SetStateAction, type Dispatch } from 'react'

interface TeamParas extends Partial<Team> {
  id?: string
}

export default function Home (): ReactElement {
  const [formState, setFormState] = useState<TeamParas>({ name: undefined, players: [] })
  const [players, setPlayers] = useState<Player[]>([])
  const getData = async (): Promise<void> => {
    setPlayers(await serverRequest<Player[]>('/api/players'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  const handleSubmit = async (event: any): Promise<void> => {
    console.log(formState)
    await serverRequest('/api/teams', FETCH_METHODS.POST, formState)
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
          <CheckboxGroup elements={players.map(p => ({ id: p.id, value: p.name }))} name='players' state={formState} setState={setFormState} />
        </div>
        <div>
           <button className="box">Crea</button>
        </div>
      </Form>
    </main>
  )
}

interface CheckboxType {
  id: string
  value: string
}

interface Props {
  elements: CheckboxType[]
  state: HashMap
  setState: Dispatch<SetStateAction<HashMap>>
  name: string
}

function updateSelectectd<T> (elements: T[], id: T): T[] {
  if (elements.includes(id)) {
    return elements.filter(x => x !== id)
  }

  return [...elements, id]
}

function CheckboxGroup ({ elements, state, setState, name }: Props): ReactElement {
  console.log(state[name])
  return <div className='check_box_group'>
    {
      elements.map(element => <div key={element.id}
                                   className={(state[name] as string).includes(element.id) ? 'checked' : 'unchecked'}
                                   onClick={(event) => { setState(x => ({ ...x, ...{ [name]: updateSelectectd(x[name], element.id) } })) }}>
        <Checkbox value={element.id} state={state} setState={setState} name={name} /> {element.value}
      </div>)
    }
    </div>
}
