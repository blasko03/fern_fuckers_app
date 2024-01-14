import { type ChangeEventHandler, type ReactElement } from 'react'

interface Option {
  title: string
  name: string
}

interface Props {
  options: Option[]
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined
  selected?: string
}

export default function Select ({ options, onChange, selected }: Props): ReactElement {
  return (
        <select onChange={onChange} value={selected}>
            <option>Seleziona</option>
            { options.map(x => <option key={x.name} value={x.name}>{x.title}</option>) }
        </select>
  )
}
