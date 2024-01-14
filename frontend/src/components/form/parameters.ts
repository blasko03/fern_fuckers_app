import { type Dispatch, type SetStateAction } from 'react'
import { updateFormState, type FormValues, type FormProps, type FormValue } from './utils'
import { type ValidatedFields } from './validation'

export interface FieldState<T> {
  formState: FormValues<T>
  setFormState: Dispatch<SetStateAction<FormValues<T>>>
  formValidations?: ValidatedFields<T>
}

interface IsValidType<T> extends Omit<FieldState<T>, 'setFormState'> {
  name: keyof T
}

function isValid<T> ({ name, formValidations, formState }: IsValidType<T>): boolean {
  const length = formValidations?.[name]?.length
  const field = formState?.[name]
  if (field?.touched === false || field?.touched === undefined) { return true }
  if (length === undefined) { return true }
  if (length > 0) { return false }
  return true
}

export function fieldInputParams<T> ({ formState, setFormState, formValidations }: FieldState<T>) {
  return <T2>(name: keyof T): FormProps<T2> => ({
    state: formState[name] as FormValue<T2>,
    setState: (newValue, name) => {
      updateFormState(setFormState, name, newValue)
    },
    name: name as string,
    isValid: isValid({ formState, formValidations, name })
  })
}
