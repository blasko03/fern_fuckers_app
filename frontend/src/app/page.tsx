'use client'
import { type ReactElement } from 'react'

export default function Home (): ReactElement {
  return (
    <main>
      <a className='box' href="/championships">Campionati</a>
      <a className='box' href="/teams">Team</a>
      <a className='box' href="/players">Players</a>
    </main>
  )
}
