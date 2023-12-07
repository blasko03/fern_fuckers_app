import { type FormEventHandler, type ReactElement } from 'react'

export default function Form ({ onSubmit, children }: { onSubmit: FormEventHandler<HTMLFormElement>, children: ReactElement | ReactElement[] }): ReactElement {
  const handleSubmit = (event: any): void => {
    onSubmit(event)
    event.preventDefault()
  }
  return <form onSubmit={handleSubmit}>
    {children}
  </form>
}
