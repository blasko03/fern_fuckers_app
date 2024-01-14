import { type Dispatch, type SetStateAction } from 'react'

export type HashMap = Record<string, string>

export function updateFormState<T1, T2> (setState: Dispatch<SetStateAction<FormValues<T1>>>, name: string, newValue: FormValue<T2>): void {
  setState(f => ({ ...f, [name]: newValue }))
}

export interface FormValue<T> {
  value: T
  touched: boolean
}

export type FormValues<T> = {
  [Property in keyof T]?: FormValue<T[Property]>;
}

export interface FormProps<T> {
  state?: FormValue<T>
  setState: (newValue: FormValue<T>, name: string) => void
  name: string
  isValid?: boolean
}

export type FormValidations<T> = {
  [Property in keyof T]: Array<string | undefined>;
}
