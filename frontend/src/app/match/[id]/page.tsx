'use client'
import { useState, type ReactElement, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import Set from '../../../components/match/Set'
import { type UpdatedPlayersEvent, type Set as MatchSet, type SetPlayers } from '@/interfaces/Set'
import { type Match } from '@/interfaces/Match'
import { serverRequest } from '@/utils/serverData'
import { type Leg } from '@/interfaces/Leg'
import { filteredData } from '@/utils/array'
import { EventSourceListner } from '@/utils/EventSourceListner'
import { type EventTypes, type MatchEvents } from '@/interfaces/MatchEvents'

interface Props {
  params: {
    id: string
  }
}

const EventHandlers: Record<EventTypes, any> = {
  WON_LEG: (wonLeg: Leg, setMatch: Dispatch<SetStateAction<Match | undefined>>) => {
    setMatch(match => {
      if (match !== undefined) {
        return {
          ...match,
          sets: match.sets.map(set => ({
            ...set,
            playedLegs: filteredData(wonLeg.setId === set.id ? [...set.playedLegs, wonLeg] : set.playedLegs)
          }))
        }
      }
    })
  },
  CHANGED_PLAYERS: (event: UpdatedPlayersEvent, setMatch: Dispatch<SetStateAction<Match | undefined>>) => {
    setMatch(match => {
      if (match !== undefined) {
        return {
          ...match,
          sets: match.sets.map(set => ({
            ...set,
            players: event.setId === set.id ? event.players : set.players
          }))
        }
      }
    })
  }
}

export default function Home ({ params: { id } }: Props): ReactElement {
  const [match, setMatch] = useState<Match>()
  const matchEventSource = useRef<EventSourceListner>()
  const getData = async (id: string): Promise<void> => {
    const matchRes = await serverRequest<Match>(`/api/match/${id}`)
    setMatch(matchRes)
  }
  function addEventsToMatch (events: MatchEvents): void {
    EventHandlers[events.type](events.message, setMatch)
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
