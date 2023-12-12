import { type ReactElement } from 'react'

interface Option {
  title: string
  name: string
}

interface Props {
  options: Option[]
  onChange: any
}

export default function Select ({ options, onChange }: Props): ReactElement {
  return (
        <select onChange={onChange}>
            <option>Seleziona</option>
            { options.map(x => <option key={x.name} value={x.name}>{x.title}</option>) }
        </select>
  )
}
