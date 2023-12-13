import { type ReactElement } from 'react'
import { type FormProps, onChange } from './utils'

interface Props extends FormProps {
  value: string
}

function checkboxType (target: HTMLInputElement, elements: string[]): string[] {
  const value = target.defaultValue
  const checked = target.checked
  const newElements = checked ? [...elements, value] : elements.filter(item => item !== value)
  return Array.from(new Set(newElements))
}

export default function Checkbox ({ state, setState, value, name }: Props): ReactElement {
  return <input type='checkbox'
                name={name}
                value={value}
                onChange={(event) => { onChange({ event, valueUpdate: checkboxType, setState }) }}
                checked={state[name].includes(value)} />
}
