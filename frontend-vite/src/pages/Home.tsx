import { type ReactElement } from 'react'
import './home.css'
import { Link } from 'react-router-dom'

export default function Home (): ReactElement {
  return (
    <main className='main'>
      <Link className='button full-width' to="/championships">Campionati</Link>
      <Link className='button full-width' to="/teams">Team</Link>
      <Link className='button full-width' to="/players">Players</Link>
      <Link className='button full-width' to="/games/sempolajc">Kdu je šempolajc</Link>
    </main>
  )
}
