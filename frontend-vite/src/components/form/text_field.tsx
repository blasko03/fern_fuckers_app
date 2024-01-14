import { type ReactElement } from 'react'
import { type FormProps, type FormValue } from './utils'
import { INPUT_FIELS_TYPES } from './input_files_types'

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
                value={state?.value ?? ''}
                onChange={(event) => { setState(textType(event.target), name) }} />
}
