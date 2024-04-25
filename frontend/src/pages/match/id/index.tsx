import { useState, type ReactElement, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import Set from '../../../components/match/Set'
import { type Leg } from '../../../interfaces/Leg'
import { type MatchSet, type UpdatedPlayersEvent, type SetPlayers } from '../../../interfaces/Set'
import { type Match } from '../../../interfaces/Match'
import { type EventTypes, type MatchEvents } from '../../../interfaces/MatchEvents'

import { EventSourceListner } from '../../../utils/EventSourceListner'
import { filteredData } from '../../../utils/array'
import { serverRequest } from '../../../utils/serverData'
import { useParams } from 'react-router-dom'

type EventTypesActions<T> = (event: T, setMatch: Dispatch<SetStateAction<Match | undefined>>) => void

const EventHandlers: Record<EventTypes, EventTypesActions<Leg | UpdatedPlayersEvent>> = {
  WON_LEG: (event, setMatch) => {
    setMatch(match => {
      if (match !== undefined && 'setId' in event && 'id' in event) {
        return {
          ...match,
          sets: match.sets.map(set => ({
            ...set,
            playedLegs: filteredData(event.setId === set.id ? [...set.playedLegs, event] : set.playedLegs)
          }))
        }
      }
    })
  },
  CHANGED_PLAYERS: (event, setMatch) => {
    setMatch(match => {
      if (match !== undefined && 'players' in event) {
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

export default function MatchGet (): ReactElement {
  const { id } = useParams()
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
    if (id === undefined) {
      return
    }
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
    return () => {
      matchEventSource.current?.close()
    }
  }, [])

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
