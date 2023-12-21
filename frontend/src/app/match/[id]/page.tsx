'use client'
import { useState, type ReactElement, useEffect, useRef } from 'react'
import Set from '../../../components/match/Set'
import { type Set as MatchSet, type SetPlayers } from '@/interfaces/Set'
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

export default function Home ({ params: { id } }: Props): ReactElement {
  const [match, setMatch] = useState<Match>()
  const matchEventSource = useRef<EventSourceListner>()
  const getData = async (id: string): Promise<void> => {
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

  type PlayerOrUndefined = string | undefined

  function newPlayers ({ setId, set, players, teamId }: { setId: string, set: MatchSet, players: PlayerOrUndefined[], teamId: string }): SetPlayers[] {
    if (setId === set.id) {
      return [...set.players.filter(p => p).filter(x => x.teamId !== teamId), ...players.map(p => ({ playerId: p, teamId }))]
    }
    return set.players
  }

  function updateSetPlayers (setId: string, teamId: string, players: PlayerOrUndefined[]): void {
    setMatch(match => {
      if (match !== undefined) {
        return {
          ...match,
          sets: match.sets.map(set => ({
            ...set,
            players: newPlayers({ setId, set, players, teamId })
          }))
        }
      }
    })
  }

  useEffect(() => {
    getData(id).catch(error => { console.log(error) })
  }, [id])

  useEffect(() => {
    if (match != null && matchEventSource.current === undefined) {
      matchEventSource.current = new EventSourceListner(match.id,
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
      {match?.sets.map((set, index) => <Set key={set.id}
                                            updateSetPlayers={updateSetPlayers}
                                            set={set}
                                            matchId={match.id}
                                            teams={match.teams}
                                            matchNumber={index + 1} />)}
    </main>
  )
}
