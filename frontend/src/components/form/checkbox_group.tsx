import { type SetStateAction, type ReactElement, type Dispatch } from 'react'
import Checkbox from './checkbox'
import { type HashMap } from './utils'

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

export function CheckboxGroup ({ elements, state, setState, name }: Props): ReactElement {
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
