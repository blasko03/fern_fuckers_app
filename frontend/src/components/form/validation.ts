import { type FormValues } from './utils'

export type ValidatedFields<T> = {
  [Property in keyof T]?: string[];
}

export type Validators<T> = {
  [Property in keyof T]: Array<(value: T[Property]) => string | undefined>
}

export function validate<T> (oldValidation: ValidatedFields<T>, formState: FormValues<T>, validations: Validators<T>): ValidatedFields<T> {
  return Object.keys(validations).reduce((acc, key) => ({
    ...acc,
    [key]: validations[key as keyof T].map(validator => {
      const value = formState?.[key as keyof FormValues<T>]?.value
      if (value !== undefined) { return validator(value) }
      return 'undefined'
    }).filter(x => x != null)
  }), oldValidation)
}

export function validatePresence (value: string | undefined | string[]): string | undefined {
  if (value == null || value === '') { return 'Not present' }
}

export function validateLenhth ({ min, max }: { min?: number, max?: number }) {
  return (value: string): string | undefined => {
    if (value === undefined) { return 'Not present' }
    if ((min != null) && value.length < min) { return 'Too short' }
    if ((max != null) && value.length > max) { return 'Too long' }
  }
}

export function validateNumberOfSelectedElements ({ min, max }: { min?: number, max?: number }) {
  return (elements: string[] | undefined): string | undefined => {
    if (elements === undefined) { return 'Not present' }
    if ((min != null) && elements.length < min) { return 'Too short' }
    if ((max != null) && elements.length > max) { return 'Too long' }
  }
}
