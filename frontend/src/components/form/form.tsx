import { type Dispatch, type SetStateAction, type FormEventHandler, type ReactElement, useState, useEffect } from 'react'
import { type ValidatedFields, type Validators, validate } from './validation'
import { type FormProps, type FormValues } from './utils'
import { fieldInputParams } from './parameters'
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { FETCH_METHODS, serverRequest } from '@/utils/serverData'

export default function Form ({ onSubmit, children }: { onSubmit: FormEventHandler<HTMLFormElement>, children: ReactElement | ReactElement[] }): ReactElement {
  const handleSubmit = (event: any): void => {
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

interface HandleSubmitParams<T> {
  isSubmtting: boolean
  formState: FormValues<T>
  router: AppRouterInstance
  setIsSubmtting: Dispatch<SetStateAction<boolean>>
  formValidations?: ValidatedFields<T>
  serverUrl: string
  succesUrl: string
}

function isFormValid<T> (formValidations: ValidatedFields<T>): boolean {
  return Object.keys(formValidations)
    .flatMap((key) => (formValidations[key as keyof ValidatedFields<T>] as string[]))
    .length === 0
}

export async function handleSubmit<T> ({ isSubmtting, formState, router, setIsSubmtting, formValidations, serverUrl, succesUrl }: HandleSubmitParams<T>): Promise<void> {
  if (isSubmtting) { return }
  if (formValidations !== undefined && !isFormValid(formValidations)) { return }
  try {
    setIsSubmtting(true)
    await serverRequest(serverUrl,
      FETCH_METHODS.POST,
      Object.keys(formState).reduce((acc, x) => ({ ...acc, [x]: formState[x as keyof T]?.value }), {}))
    router.push(succesUrl)
  } catch (error) {
    console.error(error)
  } finally {
    setIsSubmtting(false)
  }
}
