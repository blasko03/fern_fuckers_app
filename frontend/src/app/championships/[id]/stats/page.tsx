'use client'

import { type Team } from '@/interfaces/Team'
import { serverRequest } from '@/utils/serverData'
import { useEffect, type ReactElement, useState } from 'react'

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
  const getData = async (id: string): Promise<void> => {
    setRanking(((await serverRequest<TeamPoints[]>(`/api/championships/${id}/stats`))))
  }

  useEffect(() => {
    getData(id).catch(error => { console.log(error) })
  }, [id])
  return (
    <main>
      {ranking?.map(tp => <div key={tp.team.id}>{tp.team.name}: {tp.points}</div>)}
    </main>
  )
}
