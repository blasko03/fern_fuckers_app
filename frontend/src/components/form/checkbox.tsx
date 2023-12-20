import { type ReactElement } from 'react'
import { type FormProps, type FormValue } from './utils'

interface Props extends FormProps<string[]> {
  value: string
}

function checkboxType<T> (checked: boolean, defaultValue: T, state: FormValue<T[]>): FormValue<T[]> {
  const newElements = checked ? [...state.value, defaultValue] : state.value.filter(item => item !== defaultValue)
  return { value: Array.from(new Set(newElements)), touched: true }
}

export default function Checkbox ({ state, setState, value, name }: Props): ReactElement {
  return <input type='checkbox'
                name={name}
                value={value}
                onChange={(event) => { setState(checkboxType(event.target.checked, event.target.defaultValue, state), name) }}
                checked={state.value?.includes(value)} />
}
