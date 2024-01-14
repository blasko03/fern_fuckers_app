import { type ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface Element {
  id: string
  text: string
  link?: string
}

interface Props {
  elements: Element[]
}

export function LinkList ({ elements }: Props): ReactElement {
  return <div className='linkList'>
    {
      elements.map(element => element.link != null ? <Link key={element.id} to={element.link}>{element.text}</Link> : <div key={element.id}>{element.text}</div>)
    }
  </div>
}
