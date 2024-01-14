import { FETCH_METHODS, serverRequest } from '../../utils/serverData'
import { type HandleSubmitParams } from './form'
import { isFormValid } from './is_form_valid'

export async function handleSubmit<T> ({ isSubmtting, formState, setIsSubmtting, formValidations, serverUrl }: HandleSubmitParams<T>): Promise<void> {
  if (isSubmtting) { return }
  if (formValidations !== undefined && !isFormValid(formValidations)) { return }
  try {
    setIsSubmtting(true)
    await serverRequest(serverUrl,
      FETCH_METHODS.POST,
      Object.keys(formState).reduce((acc, x) => ({ ...acc, [x]: formState[x as keyof T]?.value }), {}))
  } catch (error) {
    console.error(error)
  } finally {
    setIsSubmtting(false)
  }
}
