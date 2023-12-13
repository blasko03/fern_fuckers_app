'use client'
import { type Player } from '@/interfaces/Player'
import { serverRequest } from '@/utils/serverData'
import { useEffect, type ReactElement, useState } from 'react'

export default function Home (): ReactElement {
  const [players, setPlayers] = useState<Player[]>([])
  const getData = async (): Promise<void> => {
    setPlayers(await serverRequest<Player[]>('/api/players'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <main>
      { players.map(player => <div key={player.id}>{player.name} {player.surname}</div>) }
      <div>
        <a href='/players/create'>Crea</a>
      </div>
    </main>
  )
}
