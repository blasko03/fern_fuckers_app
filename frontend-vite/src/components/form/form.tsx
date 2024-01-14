import { type Dispatch, type SetStateAction, type FormEventHandler, type ReactElement, useState, useEffect } from 'react'
import { type ValidatedFields, type Validators, validate } from './validation'
import { type FormProps, type FormValues } from './utils'
import { fieldInputParams } from './parameters'
import { type NavigateFunction } from 'react-router-dom'

export default function Form ({ onSubmit, children }: { onSubmit: FormEventHandler<HTMLFormElement>, children: ReactElement | ReactElement[] }): ReactElement {
  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (event): void => {
    onSubmit(event)
    event.preventDefault()
  }
  return <form onSubmit={handleSubmit}>
    {children}
  </form>
}

interface CreateFormType<T> {
  isSubmtting: boolean
  setIsSubmtting: Dispatch<SetStateAction<boolean>>
  formValidations: ValidatedFields<T>
  setFormValidations: Dispatch<SetStateAction<ValidatedFields<T>>>
  formState: FormValues<T>
  setFormState: Dispatch<SetStateAction<FormValues<T>>>
  field: <T2>(name: keyof T) => FormProps<T2>
}

interface CreateFormParams<T> {
  initialFormState?: FormValues<T>
  validations?: Validators<T>
}

export function CreateForm<T> ({ initialFormState = {}, validations }: CreateFormParams<T>): CreateFormType<T> {
  const [isSubmtting, setIsSubmtting] = useState(false)
  const [formValidations, setFormValidations] = useState<ValidatedFields<T>>({ })
  const [formState, setFormState] = useState<FormValues<T>>(initialFormState)
  const field = fieldInputParams({ formState, setFormState, formValidations })

  useEffect(() => {
    if (validations != null) {
      setFormValidations(x => (validate(x, formState, validations)))
    }
  }, [formState, validations])

  return {
    isSubmtting, setIsSubmtting, formValidations, setFormValidations, formState, setFormState, field
  }
}

export interface HandleSubmitParams<T> {
  isSubmtting: boolean
  formState: FormValues<T>
  setIsSubmtting: Dispatch<SetStateAction<boolean>>
  formValidations?: ValidatedFields<T>
  serverUrl: string
  succesUrl: string
  navigate: NavigateFunction
}
