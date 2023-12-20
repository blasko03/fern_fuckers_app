import { type ReactElement } from 'react'
import Checkbox from './checkbox'
import { type FormValue, type FormProps } from './utils'

interface CheckboxType {
  id: string
  value: string
}

interface Props extends FormProps<string[]> {
  elements: CheckboxType[]
  name: string
}
export type InputSetState<T> = (elements: FormValue<T>, value: string) => FormValue<T>

const updateSelectectd: InputSetState<string[]> = (elements, value) => {
  if (elements.value.includes(value)) {
    return { value: elements.value.filter(x => x !== value), touched: true }
  }

  return { value: [...elements.value, value], touched: true }
}

export function CheckboxGroup ({ elements, state, setState, name }: Props): ReactElement {
  return <div className='check_box_group'>
      {
        elements.map(element => <div key={element.id}
                                     className={state?.value?.includes(element.id) ? 'checked' : 'unchecked'}
                                     onClick={(event) => { setState(updateSelectectd(state, element.id), name) }}>
          <Checkbox value={element.id} state={state} setState={setState} name={name} /> {element.value}
        </div>)
      }
      </div>
}
