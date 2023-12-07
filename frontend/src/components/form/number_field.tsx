import { type ReactElement } from 'react'
import { type FormProps } from './utils'
import TextField, { INPUT_FIELS_TYPES } from './text_field'

export default function NumberField (props: FormProps): ReactElement {
  return <TextField {...props} type={INPUT_FIELS_TYPES.NUMBER} />
}
