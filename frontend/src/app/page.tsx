'use client'
import { type ReactElement } from 'react'
import './home.css'

export default function Home (): ReactElement {
  return (
    <main className='main'>
      <a className='button full-width' href="/championships">Campionati</a>
      <a className='button full-width' href="/teams">Team</a>
      <a className='button full-width' href="/players">Players</a>
      <a className='button full-width' href="/games/cricket">Kdu je šempolajc</a>
    </main>
  )
}
