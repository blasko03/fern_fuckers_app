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
export type InputSetState<T> = (elements: FormValue<T> | undefined, value: string) => FormValue<T>

const updateSelectectd: InputSetState<string[]> = (elements, value) => {
  const elementsValue = elements?.value ?? []
  if (elementsValue.includes(value)) {
    return { value: elementsValue.filter(x => x !== value), touched: true }
  }

  return { value: [...elementsValue, value], touched: true }
}

export function CheckboxGroup ({ elements, state, setState, name }: Props): ReactElement {
  const value = state?.value ?? []
  return <div className='check_box_group'>
      {
        elements.map(element => <div key={element.id}
                                     className={value.includes(element.id) ? 'checked' : 'unchecked'}
                                     onClick={() => { setState(updateSelectectd(state, element.id), name) }}>
          <Checkbox value={element.id} state={state} setState={setState} name={name} /> {element.value}
        </div>)
      }
      </div>
}
