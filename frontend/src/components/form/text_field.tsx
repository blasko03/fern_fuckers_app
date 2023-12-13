import { type ReactElement } from 'react'
import { type FormProps, onChange } from './utils'

export enum INPUT_FIELS_TYPES {
  TEXT = 'text',
  NUMBER = 'number'
}

interface Props extends FormProps {
  type?: INPUT_FIELS_TYPES
}

function textType (target: HTMLInputElement): string {
  return target.value
}

export default function TextField ({ state, setState, name, type = INPUT_FIELS_TYPES.TEXT }: Props): ReactElement {
  return <input type={type}
                name={name}
                value={state[name] !== undefined ? state[name] : ''}
                onChange={(event) => { onChange({ event, valueUpdate: textType, setState }) }} />
}
