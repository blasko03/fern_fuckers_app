import { type ReactElement } from 'react'

interface Option {
  title: string
  name: string
}

interface Props {
  options: Option[]
}

export default function Select ({ options }: Props): ReactElement {
  return (
        <select>
            <option>Seleziona</option>
            { options.map(x => <option key={x.name}>{x.title}</option>) }
        </select>
  )
}
