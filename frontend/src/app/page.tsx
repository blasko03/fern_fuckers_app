'use client'
import { type ReactElement } from 'react'

export default function Home (): ReactElement {
/*  const source = new EventSource('http://localhost:5093/api/championships/events')

  source.onmessage = function (event) {
    console.log('onmessage: ' + event.data)
  }

  source.onopen = function (event) {
    console.log('onopen')
  }

  source.onerror = function (event) {
    console.log('onerror')
  } */

  return (
    <main>
      <a className='box' href="/championships">Campionati</a>
      <a className='box' href="/teams">Team</a>
      <a className='box' href="/players">Players</a>
    </main>
  )
}
