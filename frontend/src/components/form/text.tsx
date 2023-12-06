import { type ReactElement } from 'react'
import { type FormProps, onChange } from './utils'

function textType (target: HTMLInputElement): string {
  return target.value
}

export default function Text ({ state, setState, name }: FormProps): ReactElement {
  return <input type='text'
                name='name'
                value={state.name}
                onChange={(event) => { onChange({ event, valueUpdate: textType, setState }) }} />
}
