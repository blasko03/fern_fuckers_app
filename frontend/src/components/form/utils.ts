import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

export type HashMap = Record<string, any>

interface Params {
  event: ChangeEvent<HTMLInputElement>
  valueUpdate: (target: HTMLInputElement, elements: any) => any
  setState: Dispatch<SetStateAction<HashMap>>
}

export function onChange ({ event, valueUpdate, setState }: Params): void {
  const name: keyof HashMap = event.target.name

  setState(f => ({ ...f, [name]: valueUpdate(event.target, f[name] as string) }))
}

export interface FormProps {
  state: any
  setState: Dispatch<SetStateAction<any>>
  name: string
  isValid?: boolean
}
