'use client'
import { useState, type ReactElement, useEffect, useRef } from 'react'
import Set from '../../../components/match/Set'
import { type Match } from '@/interfaces/Match'
import { serverRequest } from '@/utils/serverData'
import { type Leg } from '@/interfaces/Leg'
import { filteredData } from '@/utils/array'
import { EventSourceListner } from '@/utils/EventSourceListner'

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
  const matchEventSource = useRef<EventSourceListner>()
  const getData = async (): Promise<void> => {
    const matchRes = await serverRequest<Match>(`/api/match/${id}`)
    setMatch(matchRes)
  }
  function addEventsToMatch (events: Leg[]): void {
    setMatch(match => {
      if (match !== undefined) {
        return {
          ...match,
          sets: match.sets.map(set => ({
            ...set,
            playedLegs: filteredData([...set.playedLegs, ...events.filter(e => e.setId === set.id)])
          }))
        }
      }
    })
  }

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])

  useEffect(() => {
    if (match != null && matchEventSource.current === undefined) {
      matchEventSource.current = new EventSourceListner(id,
        match.sets.flatMap(set => set.playedLegs).map(x => x.createdDate).sort().reverse()[0],
        addEventsToMatch)
    }
  }, [match])

  useEffect(() => {
    if (match != null && matchEventSource.current !== undefined) {
      matchEventSource.current?.updateLastEvent(match.sets.flatMap(set => set.playedLegs).map(x => x.createdDate).sort().reverse()[0])
    }
  }, [match])

  return (
    <main>
      {match?.sets.flatMap(set => set.playedLegs).length}
      {match?.sets.map(set => <Set key={set.id} id={set.id} matchId={match.id} playedLegs={set.playedLegs} numberOfPlayers={set.numberPlayers} teams={match.teams} scoring={ wins3Legs } />)}
    </main>
  )
}
