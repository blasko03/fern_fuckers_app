'use client'
import { useState, type ReactElement, useEffect } from 'react'
import Set from '../../../components/match/Set'
import { type Match } from '@/interfaces/Match'
import { serverData } from '@/utils/server_data'

interface Props {
  params: {
    id: string
  }
}
function wins3Legs (p1: number, p2: number): number {
  if (p1 < 3 && p2 < 3) {
    return 0
  }
  return p1 > p2 ? 1 : 0
}
/*
function whoWins (p1: number, p2: number): number {
  if (p1 === 0 && p2 === 0) {
    return 0
  }
  return p1 >= p2 ? 1 : 0
}
*/
export default function Home ({ params: { id } }: Props): ReactElement {
  const [match, setMatch] = useState<Match>()
  const getData = async (): Promise<void> => {
    setMatch(((await serverData<Match>(`api/match/${id}`))))
  }
  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  console.log(match)
  return (
    <main>
      {match?.sets.map(set => <Set key={set.id} numberOfPlayers={set.numberPlayers} teams={match.teams} scoring={ wins3Legs } />)}
    </main>
  )
}
