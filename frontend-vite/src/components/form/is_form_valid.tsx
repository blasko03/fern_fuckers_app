import { type ValidatedFields } from './validation'

export function isFormValid<T> (formValidations: ValidatedFields<T>): boolean {
  return Object.keys(formValidations)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .flatMap((key) => (formValidations[key as keyof ValidatedFields<T>]!))
    .length === 0
}
