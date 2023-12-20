import { type ReactElement } from 'react'
import { type FormProps, type FormValue } from './utils'

export enum INPUT_FIELS_TYPES {
  TEXT = 'text',
  NUMBER = 'number'
}
interface Props extends FormProps<string> {
  type?: INPUT_FIELS_TYPES
}

function textType (target: HTMLInputElement): FormValue<string> {
  return { value: target.value, touched: true }
}

export default function TextField ({ state, setState, name, type = INPUT_FIELS_TYPES.TEXT, isValid = true }: Props): ReactElement {
  return <input type={type}
                name={name}
                className={isValid ? 'valid' : 'invalid'}
                value={state.value ?? ''}
                onChange={(event) => { setState(textType(event.target), name) }} />
}
