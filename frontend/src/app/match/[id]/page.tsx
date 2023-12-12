'use client'
import { useState, type ReactElement, useEffect, useRef } from 'react'
import Set from '../../../components/match/Set'
import { type Match } from '@/interfaces/Match'
import { SERVER_ADDRESS, serverData } from '@/utils/server_data'
import { type Leg } from '@/interfaces/Leg'

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
  const [legEvents, setLegEvents] = useState<Leg[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const getData = async (): Promise<void> => {
    const matchRes = await serverData<Match>(`api/match/${id}`)
    setMatch(matchRes)
    setLegEvents(matchRes.sets.flatMap(set => set.playedLegs))
  }
  /*
  useEffect(() => {
    setLastEvent(match?.sets.flatMap(set => set.playedLegs).map(x => x.createdDate).sort().reverse()[0])
  }, [match])
*/

  useEffect(() => {
    getData().catch(error => { console.log(error) })
  }, [])
  useEffect(() => {
    if (match !== undefined && !isConnected) {
      const lastEvent = legEvents.map(x => x.createdDate).sort().reverse()[0]
      console.log('changed')
      const source = new EventSource(`${SERVER_ADDRESS}/api/match/${id}/matchEvents?lastEvent=${lastEvent}`)
      const onMessage = (event: MessageEvent<any>): void => {
        console.log('aaaa')
        const data = event.data
        console.log(data)
        if (data !== '') {
          setLegEvents(e => [...e, ...JSON.parse(event.data)])
        }
      }
      source.onmessage = onMessage

      source.onerror = (error: any) => {
        if (isConnected) {
          console.log(error)
          console.log(lastEvent)
          setIsConnected(false)
          source.removeEventListener('onmessage', onMessage)
          source.removeEventListener('onerror', onMessage)
          source.close()
        }
      }
      source.onopen = () => {
        setIsConnected(true)
      }
      /* return function cleanupListener () {
        source.removeEventListener('onmessage', onMessage)
        source.close()
      } */
    }
  }, [isConnected, match])

  console.log(legEvents)
  return (
    <main>
      {legEvents.length}
      {match?.sets.map(set => <Set key={set.id} id={set.id} numberOfPlayers={set.numberPlayers} teams={match.teams} scoring={ wins3Legs } />)}
    </main>
  )
}
