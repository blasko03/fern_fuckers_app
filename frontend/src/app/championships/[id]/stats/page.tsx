'use client'

import { type Team } from '@/interfaces/Team'
import { EventSourceListner } from '@/utils/EventSourceListner'
import { serverRequest } from '@/utils/serverData'
import { useEffect, type ReactElement, useState, useRef } from 'react'

interface Props {
  params: {
    id: string
  }
}

interface TeamPoints {
  team: Team
  points: number
}

export default function Stats ({ params: { id } }: Props): ReactElement {
  const [ranking, setRanking] = useState<TeamPoints[]>()
  const matchEventSource = useRef<EventSourceListner>()
  const getData = async (id: string): Promise<void> => {
    setRanking(((await serverRequest<TeamPoints[]>(`/api/championships/${id}/stats`))))
  }

  useEffect(() => {
    if (matchEventSource.current === undefined) {
      matchEventSource.current = new EventSourceListner(id,
        (new Date()).toISOString(),
        async () => { await getData(id) })
    }
  }, [id])

  useEffect(() => {
    getData(id).catch(error => { console.log(error) })
  }, [id])
  return (
    <main>
      {ranking?.map(tp => <div key={tp.team.id}>{tp.team.name}: {tp.points}</div>)}
    </main>
  )
}
