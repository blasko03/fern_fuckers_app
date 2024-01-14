import { useEffect, type ReactElement, useState, useRef } from 'react'
import { EventSourceListner } from '../../../utils/EventSourceListner'
import { Team } from '../../../interfaces/Team'
import { serverRequest } from '../../../utils/serverData'
import { useParams } from 'react-router-dom'

interface TeamPoints {
  team: Team
  points: number
}

export default function ChampionshipStats (): ReactElement {
  const { id } = useParams()

  const [ranking, setRanking] = useState<TeamPoints[]>()
  const matchEventSource = useRef<EventSourceListner>()
  const getData = async (id: string): Promise<void> => {
    setRanking(((await serverRequest<TeamPoints[]>(`/api/championships/${id}/stats`))))
  }

  useEffect(() => {
    if (id === undefined) {
      return
    }
    if (matchEventSource.current !== undefined) {
      return
    }
    matchEventSource.current = new EventSourceListner(id,
      (new Date()).toISOString(),
      async () => { await getData(id) })
  }, [id])

  useEffect(() => {
    if (id === undefined) {
      return
    }
    getData(id).catch(error => { console.log(error) })
  }, [id])
  return (
    <main>
      {ranking?.map(tp => <div key={tp.team.id}>{tp.team.name}: {tp.points}</div>)}
    </main>
  )
}
