import { useEffect, type ReactElement, useState } from 'react'
import { serverRequest } from '../../utils/serverData'
import { type Player } from '../../interfaces/Player'
import { StdLayout } from '../../components/layouts/std_layout'
import { LinkList } from '../../components/link_list'
import { Link } from 'react-router-dom'

export default function Players (): ReactElement {
  const [players, setPlayers] = useState<Player[]>([])
  const getData = async (): Promise<void> => {
    setPlayers(await serverRequest<Player[]>('/api/players'))
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  return (
    <StdLayout title = {'Players'}
               bottom = {<Link className='button full-width' to='/players/create'>Add players</Link>}>
      <LinkList elements={players.map(player => ({ id: player.id, text: `${player.name} ${player.surname}` }))}/>
    </StdLayout>
  )
}
