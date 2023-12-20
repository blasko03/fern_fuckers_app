'use client'
import { StdLayout } from '@/components/layouts/std_layout'
import { LinkList } from '@/components/link_list'
import { type Player } from '@/interfaces/Player'
import { serverRequest } from '@/utils/serverData'
import Link from 'next/link'
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
    <StdLayout title = {'Players'}
               bottom = {<Link className='button full-width' href='/players/create'>Add players</Link>}>
      <LinkList elements={players.map(player => ({ id: player.id, text: `${player.name} ${player.surname}` }))}/>
    </StdLayout>
  )
}
