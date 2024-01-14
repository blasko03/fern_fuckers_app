import { type ValidatedFields } from './validation';


export function isFormValid<T>(formValidations: ValidatedFields<T>): boolean {
  return Object.keys(formValidations)
    .flatMap((key) => (formValidations[key as keyof ValidatedFields<T>] as string[]))
    .length === 0;
}
