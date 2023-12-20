import { type ReactElement } from 'react'

interface Element {
  id: string
  text: string
  link: string
}

interface Props {
  elements: Element[]
}

export function LinkList ({ elements }: Props): ReactElement {
  return <div className='linkList'>
    {
      elements.map(element => <a key={element.id} href={element.link}>{element.text}</a>)
    }
  </div>
}
